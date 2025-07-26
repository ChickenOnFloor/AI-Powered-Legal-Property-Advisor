import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { Notification } from "@/models/Notification"
import { getAuthUser } from "@/lib/getAuthUser"

export async function GET(req) {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit")) || 20
    const unreadOnly = searchParams.get("unread") === "true"

    const query = { userId: user.id }
    if (unreadOnly) {
      query.read = false
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)

    const unreadCount = await Notification.countDocuments({
      userId: user.id,
      read: false
    })

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount
    })
  } catch (err) {
    console.error("Error fetching notifications:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
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
    const { action, notificationId } = body

    if (action === "mark-read" && notificationId) {
      // Mark specific notification as read
      await Notification.findOneAndUpdate(
        { _id: notificationId, userId: user.id },
        { read: true }
      )
    } else if (action === "mark-all-read") {
      // Mark all notifications as read
      await Notification.updateMany(
        { userId: user.id, read: false },
        { read: true }
      )
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Error updating notifications:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 