import { connectToDB } from "@/lib/db"
import { Booking } from "@/models/Booking"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const lawyerId = searchParams.get("lawyerId")
    if (!lawyerId) {
      return Response.json({ message: "Missing lawyerId" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) {
      return Response.json({ booked: false }) // Not logged in
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id

    await connectToDB()

    const existingBooking = await Booking.findOne({
      lawyerId,
      userId,
      accessStatus: "enabled",
      expiresAt: { $gt: new Date() }
    })

    return Response.json({ booked: !!existingBooking })
  } catch (err) {
    console.error("Booking check error:", err)
    return Response.json({ message: "Server error" }, { status: 500 })
  }
}
