import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import { getAuthUser } from "@/lib/getAuthUser"

export async function GET() {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userDoc = await User.findById(user.id).select("settings")
    
    // Return default settings if none exist
    const defaultSettings = {
      notifications: {
        email: true,
        push: true,
        booking: true,
        messages: true,
        reviews: true,
        system: false
      },
      privacy: {
        profileVisibility: "public",
        showEmail: false,
        showPhone: false,
        allowMessages: true
      },
      preferences: {
        language: "en",
        timezone: "UTC",
        currency: "USD"
      }
    }

    return NextResponse.json({
      success: true,
      settings: userDoc.settings || defaultSettings
    })
  } catch (err) {
    console.error("Error fetching user settings:", err)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { notifications, privacy, preferences } = body

    // Validate settings structure
    const updateData = {}
    
    if (notifications && typeof notifications === "object") {
      updateData["settings.notifications"] = {
        email: Boolean(notifications.email),
        push: Boolean(notifications.push),
        booking: Boolean(notifications.booking),
        messages: Boolean(notifications.messages),
        reviews: Boolean(notifications.reviews),
        system: Boolean(notifications.system)
      }
    }

    if (privacy && typeof privacy === "object") {
      updateData["settings.privacy"] = {
        profileVisibility: ["public", "lawyers", "private"].includes(privacy.profileVisibility) 
          ? privacy.profileVisibility 
          : "public",
        showEmail: Boolean(privacy.showEmail),
        showPhone: Boolean(privacy.showPhone),
        allowMessages: Boolean(privacy.allowMessages)
      }
    }

    if (preferences && typeof preferences === "object") {
      updateData["settings.preferences"] = {
        language: ["en", "ur"].includes(preferences.language) ? preferences.language : "en",
        timezone: preferences.timezone || "UTC",
        currency: ["USD", "PKR"].includes(preferences.currency) ? preferences.currency : "USD"
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No valid settings to update" }, { status: 400 })
    }

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("settings")

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      settings: updatedUser.settings,
      message: "Settings updated successfully"
    })
  } catch (err) {
    console.error("Error updating user settings:", err)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
} 