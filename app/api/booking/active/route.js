// /api/booking/active
import { connectToDB } from "@/lib/db"
import { Booking } from "@/models/Booking"
import { getCurrentUser } from "@/lib/getCurrentUser"

export async function GET() {
  try {
    await connectToDB()
    const user = await getCurrentUser()
    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
    }

    const now = new Date()

    const activeBookings = await Booking.find({
      userId: user._id,
      accessStatus: "enabled",
      expiresAt: { $gt: now },
    })

    const lawyerIds = activeBookings.map((b) => b.lawyerId.toString())

    return new Response(
      JSON.stringify({
        bookedLawyerIds: lawyerIds,
        bookings: activeBookings, // 👈 this was missing
      }),
      { status: 200 }
    )
  } catch (err) {
    console.error("Error in /api/booking/active:", err)
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 })
  }
}
