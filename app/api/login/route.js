
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json({ message: "Email and password are required" }, { status: 400 })
    }

    await connectToDB()
    const user = await User.findOne({ email })

    // Same response for unknown email and wrong password, so emails can't be enumerated
    const isMatch = user ? await bcrypt.compare(password, user.password) : false
    if (!isMatch) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 })
    }

    const token = jwt.sign(
      { id: user._id, firstName: user.firstName, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    const cookieStore = await cookies()
    cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
    })

    return Response.json({ message: "Login successful", user: {
      id: user._id,
      firstName: user.firstName,
      userType: user.userType,
    }})
  } catch (err) {
    console.error(err)
    return Response.json({ message: "Server error" }, { status: 500 })
  }
}
