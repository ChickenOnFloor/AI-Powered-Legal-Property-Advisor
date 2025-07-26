// app/api/register/route.js
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { emailService } from "@/lib/email"

export async function POST(req) {
  try {
    await connectToDB()
    const body = await req.json()
    const { firstName, lastName, email, password, userType } = body

    if (!firstName || !lastName || !email || !password || !userType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
      verified: userType === "client" // Clients are auto-verified, lawyers need admin approval
    })

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail(user)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't fail registration if email fails
    }

    // Set cookie
    const response = NextResponse.json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        verified: user.verified
      }
    })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
