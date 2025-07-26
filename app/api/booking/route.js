import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { Booking } from "@/models/Booking"
import { User } from "@/models/User"
import { Notification } from "@/models/Notification"
import { getAuthUser } from "@/lib/getAuthUser"

export async function POST(req) {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { lawyerId } = body

    if (!lawyerId) {
      return NextResponse.json({ error: "Lawyer ID is required" }, { status: 400 })
    }

    // Check if lawyer exists and is verified
    const lawyer = await User.findById(lawyerId)
    if (!lawyer || lawyer.userType !== "lawyer") {
      return NextResponse.json({ error: "Lawyer not found" }, { status: 404 })
    }

    if (!lawyer.verified) {
      return NextResponse.json({ error: "This lawyer is not yet verified" }, { status: 400 })
    }

    // Check if user already has an active booking with this lawyer
    const existingBooking = await Booking.findOne({
      userId: user.id,
      lawyerId: lawyerId,
      accessStatus: "enabled",
      expiresAt: { $gt: new Date() }
    })

    if (existingBooking) {
      return NextResponse.json({ error: "You already have an active booking with this lawyer" }, { status: 400 })
    }

    // Create booking with 48-hour access
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 48)

    const booking = await Booking.create({
      userId: user.id,
      lawyerId: lawyerId,
      accessStatus: "enabled",
      expiresAt: expiresAt,
      status: "confirmed"
    })

    // Create notification for client
    await Notification.create({
      userId: user.id,
      type: "booking",
      title: "Booking Confirmed",
      message: `Your booking with ${lawyer.firstName} ${lawyer.lastName} has been confirmed. You now have 48-hour access to chat and video calls.`,
      data: { bookingId: booking._id, lawyerId: lawyerId },
      priority: "high"
    })

    // Create notification for lawyer
    await Notification.create({
      userId: lawyerId,
      type: "booking",
      title: "New Client Booking",
      message: `${user.firstName} ${user.lastName} has booked a session with you. Access granted for 48 hours.`,
      data: { bookingId: booking._id, clientId: user.id },
      priority: "medium"
    })

    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
      booking: {
        id: booking._id,
        expiresAt: booking.expiresAt,
        lawyerName: `${lawyer.firstName} ${lawyer.lastName}`
      }
    })
  } catch (err) {
    console.error("Booking creation error:", err)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
