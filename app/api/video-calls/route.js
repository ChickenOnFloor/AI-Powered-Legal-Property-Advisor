import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { getAuthUser } from "@/lib/getAuthUser"

// Mock video call model (in a real app, you'd create a proper model)
const videoCallSchema = {
  id: String,
  bookingId: String,
  callerId: String,
  recipientId: String,
  startTime: Date,
  endTime: Date,
  duration: Number,
  status: String, // 'initiated', 'connected', 'ended', 'missed', 'rejected'
  quality: String, // 'excellent', 'good', 'poor'
  recordingUrl: String,
  notes: String
}

export async function GET(req) {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const bookingId = searchParams.get("bookingId")
    const limit = parseInt(searchParams.get("limit")) || 20

    // In a real implementation, you'd query the database
    // For now, return mock data
    const mockCalls = [
      {
        id: "call_1",
        bookingId: bookingId || "booking_1",
        callerId: user.id,
        recipientId: "recipient_1",
        startTime: new Date(Date.now() - 3600000), // 1 hour ago
        endTime: new Date(Date.now() - 3300000), // 30 minutes ago
        duration: 300, // 5 minutes
        status: "ended",
        quality: "good",
        recordingUrl: null,
        notes: "Successful consultation"
      }
    ]

    return NextResponse.json({
      success: true,
      calls: mockCalls,
      total: mockCalls.length
    })
  } catch (error) {
    console.error("Error fetching video calls:", error)
    return NextResponse.json({ error: "Failed to fetch video calls" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { 
      bookingId, 
      recipientId, 
      action, // 'start', 'end', 'record'
      quality,
      notes 
    } = body

    if (!bookingId || !recipientId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real implementation, you'd save to database
    const callRecord = {
      id: `call_${Date.now()}`,
      bookingId,
      callerId: user.id,
      recipientId,
      startTime: action === 'start' ? new Date() : null,
      endTime: action === 'end' ? new Date() : null,
      duration: 0,
      status: action === 'start' ? 'initiated' : action === 'end' ? 'ended' : 'connected',
      quality: quality || 'good',
      recordingUrl: null,
      notes: notes || ""
    }

    return NextResponse.json({
      success: true,
      call: callRecord,
      message: `Call ${action}ed successfully`
    })
  } catch (error) {
    console.error("Error handling video call:", error)
    return NextResponse.json({ error: "Failed to handle video call" }, { status: 500 })
  }
} 