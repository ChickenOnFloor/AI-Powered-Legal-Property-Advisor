import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import { getAuthUser } from "@/lib/getAuthUser"
import bcrypt from "bcryptjs"

export async function POST(req) {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters long" }, { status: 400 })
    }

    // Get user with password for verification
    const userDoc = await User.findById(user.id)
    if (!userDoc) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userDoc.password)
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    // Check if new password is same as current
    const isNewPasswordSame = await bcrypt.compare(newPassword, userDoc.password)
    if (isNewPasswordSame) {
      return NextResponse.json({ error: "New password must be different from current password" }, { status: 400 })
    }

    // Hash new password
    const saltRounds = 12
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    // Update password
    await User.findByIdAndUpdate(user.id, {
      password: hashedNewPassword
    })

    return NextResponse.json({
      success: true,
      message: "Password changed successfully"
    })
  } catch (err) {
    console.error("Error changing password:", err)
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 })
  }
} 