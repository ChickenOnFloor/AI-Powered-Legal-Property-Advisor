import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { User } from "@/models/User"
import { connectToDB } from "@/lib/db"

export async function getCurrentUser() {
  const token = cookies().get("token")?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    await connectToDB()
    const user = await User.findById(decoded.id).select("_id firstName email userType")
    return user
  } catch {
    return null
  }
}
