// lib/getCurrentUser.js
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { User } from "@/models/User"
import { connectToDB } from "@/lib/db"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    await connectToDB()
    const user = await User.findById(decoded.id).select("_id firstName lastName email userType image verified")
    return user
  } catch {
    return null
  }
}
