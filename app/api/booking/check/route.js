import { connectToDB } from "@/lib/db"
import { Booking } from "@/models/Booking"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const lawyerId = searchParams.get("lawyerId")
    const userEmail = searchParams.get("userEmail")

    if (!lawyerId || !userEmail) {
      return Response.json({ message: "Missing lawyerId or userEmail" }, { status: 400 })
    }

    await connectToDB()

    const existingBooking = await Booking.findOne({ lawyerId, userEmail })

    return Response.json({ booked: !!existingBooking })
  } catch (err) {
    console.error("Booking check error:", err)
    return Response.json({ message: "Server error" }, { status: 500 })
  }
}
