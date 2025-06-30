import { connectToDB } from "@/lib/db"
import { Booking } from "@/models/Booking"
import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/getAuthUser"

export async function POST(req) {
  try {
    const user = getAuthUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectToDB()
    const body = await req.json()
    const { lawyerId } = body

    if (!lawyerId) {
      return NextResponse.json({ message: "Missing lawyer ID" }, { status: 400 })
    }

    const userId = user.id
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000) // 2 days

    const alreadyExists = await Booking.findOne({
      lawyerId,
      userId,
      accessStatus: "enabled",
      expiresAt: { $gt: now },
    })

    if (alreadyExists) {
      return NextResponse.json({ message: "You have already booked this lawyer." }, { status: 400 })
    }

    const newBooking = new Booking({
      lawyerId,
      userId,
      accessStatus: "enabled",
      expiresAt,
    })

    await newBooking.save()

    return NextResponse.json({ success: true, message: "Booking successful" })
  } catch (error) {
    console.error("Booking Error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
