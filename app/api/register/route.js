// app/api/register/route.js
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(req) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, password, userType, specialization } = body

    if (!firstName || !lastName || !email || !password || !userType) {
      return Response.json({ message: "Missing fields" }, { status: 400 })
    }

    await connectToDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ message: "Email already exists" }, { status: 409 })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
      specialization: specialization || "property",
    })
    const token = jwt.sign(
      {
        id: newUser._id,
        firstName: newUser.firstName,
        userType: newUser.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )
    const cookieStore = await cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return Response.json(
      {
        message: "User registered and logged in",
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          userType: newUser.userType,
        },
      },
      { status: 201 }
    )
  } catch (err) {
    console.error(err)
    return Response.json({ message: "Server error" }, { status: 500 })
  }
}
