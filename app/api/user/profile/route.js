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

    const userProfile = await User.findById(user.id).select("-password")
    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: userProfile })
  } catch (err) {
    console.error("Error fetching user profile:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
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
    const { firstName, lastName, bio, location, image } = body

    // Validate input
    const updateData = {}
    if (firstName && firstName.trim()) updateData.firstName = firstName.trim()
    if (lastName && lastName.trim()) updateData.lastName = lastName.trim()
    if (bio !== undefined) updateData.bio = bio
    if (location !== undefined) updateData.location = location
    if (image !== undefined) updateData.image = image

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
    }

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password")

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      user: updatedUser,
      message: "Profile updated successfully" 
    })
  } catch (err) {
    console.error("Error updating user profile:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 