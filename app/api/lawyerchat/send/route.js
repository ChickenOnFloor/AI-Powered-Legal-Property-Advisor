import { getAuthUser } from "@/lib/getAuthUser"
import { connectToDB } from "@/lib/db"
import { Message } from "@/models/message"
import { Booking } from "@/models/Booking"

export async function POST(req) {
  await connectToDB()

  const user = await getAuthUser(req)
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { bookingId, content } = body

  if (!bookingId || !content) {
    return Response.json({ error: "Missing bookingId or content" }, { status: 400 })
  }

  const booking = await Booking.findById(bookingId)

  if (!booking) {
    return Response.json({ error: "Booking not found" }, { status: 404 })
  }

  if (booking.accessStatus !== "enabled") {
    return Response.json({ error: "Access disabled" }, { status: 403 })
  }

  if (new Date() > new Date(booking.expiresAt)) {
    return Response.json({ error: "Booking expired" }, { status: 403 })
  }

  if (
    booking.userId.toString() !== user.id &&
    booking.lawyerId.toString() !== user.id
  ) {
    return Response.json({ error: "Unauthorized user" }, { status: 403 })
  }

  const senderType = booking.lawyerId.toString() === user.id ? "lawyer" : "client"

  const message = await Message.create({
    bookingId,
    senderId: user.id,
    senderType, // ✅ added field
    content,
    timestamp: new Date(),
    status: "sent",
  })

  return Response.json({ success: true, message })
}
