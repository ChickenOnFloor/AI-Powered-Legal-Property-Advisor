import {getAuthUser} from "@/lib/getAuthUser"
import { connectToDB } from "@/lib/db"
import { Message } from "@/models/message"
import { Booking } from "@/models/Booking"

export async function POST(req) {
  try {
    await connectToDB()
    console.log("✅ Connected to DB")

    const user = await getAuthUser(req)
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    const { bookingId } = await req.json()
    if (!bookingId) {
      return new Response(JSON.stringify({ error: "Booking ID missing" }), { status: 400 })
    }

    const booking = await Booking.findById(bookingId)

    if (
      !booking ||
      booking.accessStatus !== "enabled" ||
      new Date() > new Date(booking.expiresAt) ||
      (booking.userId.toString() !== user.id && booking.lawyerId.toString() !== user.id)
    ) {
      return new Response(JSON.stringify({ error: "Access denied" }), { status: 403 })
    }

    const messages = await Message.find({ bookingId }).sort({ timestamp: 1 })

    return new Response(JSON.stringify({ messages }), { status: 200 })
  } catch (err) {
    console.error("❌ Internal server error in /api/chat/messages:", err)
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
  }
}
