import { connectToDB } from "@/lib/db"
import { Booking } from "@/models/Booking"
import { getAuthUser } from "@/lib/getAuthUser"

export const dynamic = "force-dynamic"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const lawyerId = searchParams.get("lawyerId")
    if (!lawyerId) {
      return Response.json({ message: "Missing lawyerId" }, { status: 400 })
    }

    const authUser = await getAuthUser()
    if (!authUser) {
      return Response.json({ booked: false }) // Not logged in or expired token
    }
    const userId = authUser.id

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
