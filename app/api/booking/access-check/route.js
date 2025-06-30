import { connectToDB } from "@/lib/db"
import { Booking } from "@/models/Booking"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { NextResponse } from "next/server"

export async function POST(req) {
  console.log("🔍 access-check endpoint hit") // debug log

  try {
    await connectToDB()
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { lawyerId } = body

    if (!lawyerId) {
      return NextResponse.json({ message: "Lawyer ID is required" }, { status: 400 })
    }

    const now = new Date()

    const booking = await Booking.findOne({
      userId: user._id,
      lawyerId,
      accessStatus: "enabled",
      expiresAt: { $gt: now },
    })

    if (!booking) {
      return NextResponse.json({ message: "No active booking found" }, { status: 403 })
    }

    return NextResponse.json({
      accessGranted: true,
      bookingId: booking._id.toString(),
    })
  } catch (err) {
    console.error("Access Check Error:", err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
