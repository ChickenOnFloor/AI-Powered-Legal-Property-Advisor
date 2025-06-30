import { getAuthUser } from "@/lib/getAuthUser"
import { connectToDB } from "@/lib/db"
import { Message } from "@/models/message"
import { Booking } from "@/models/Booking"

export async function POST(req) {
  await connectToDB()

  const user = await getAuthUser(req)
  console.log("👤 User:", user)

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // ✅ Only ONE call to req.json()
  const body = await req.json()
  console.log("📥 Request Body:", body)
console.log(body)
  const { bookingId, content } = body
  console.log("📦 Booking ID:", bookingId)

  if (!bookingId || !content) {
    return Response.json({ error: "Missing bookingId or content" }, { status: 400 })
  }

  const booking = await Booking.findById(bookingId)

  if (!booking) {
    console.log("❌ Booking not found")
    return Response.json({ error: "Booking not found" }, { status: 404 })
  }

  if (booking.accessStatus !== "enabled") {
    console.log("❌ Booking access disabled:", booking.accessStatus)
    return Response.json({ error: "Access disabled" }, { status: 403 })
  }

  if (new Date() > new Date(booking.expiresAt)) {
    console.log("❌ Booking expired:", booking.expiresAt)
    return Response.json({ error: "Booking expired" }, { status: 403 })
  }

  if (
    booking.userId.toString() !== user.id &&
    booking.lawyerId.toString() !== user.id
  ) {
    console.log("❌ Unauthorized user:", user.id)
    return Response.json({ error: "Unauthorized user" }, { status: 403 })
  }

  const message = await Message.create({
    bookingId,
    senderId: user.id,
    content,
    timestamp: new Date(),
    status: "sent",
  })

  return Response.json({ success: true, message })
}
