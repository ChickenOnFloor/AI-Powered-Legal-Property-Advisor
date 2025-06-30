import { getAuthUser } from "@/lib/getAuthUser"
import {connectToDB} from "@/lib/db"
import { Booking } from "@/models/booking"

export async function POST(req) {
  await connectToDB()
  const user = getAuthUser()
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { lawyerId } = await req.json()
  console.log(lawyerId)
  const booking = await Booking.findOne({
    lawyerId,
    userId: user.id,
    accessStatus: "enabled",
    status: "confirmed",
    expiresAt: { $gt: new Date() },
  })

  if (!booking) {
    return Response.json({ allowed: false, message: "No active access" })
  }

  return Response.json({ allowed: true })
}
