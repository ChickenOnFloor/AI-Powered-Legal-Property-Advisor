import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import { getAuthUser } from "@/lib/getAuthUser"

export async function POST(req) {
  try {
    await connectToDB()
    const admin = await getAuthUser()
    
    if (!admin || admin.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { lawyerId, action } = body

    if (!lawyerId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    const lawyer = await User.findById(lawyerId)
    if (!lawyer || lawyer.userType !== "lawyer") {
      return NextResponse.json({ error: "Lawyer not found" }, { status: 404 })
    }

    if (action === "approve") {
      lawyer.verified = true
      await lawyer.save()
      
      return NextResponse.json({ 
        success: true, 
        message: "Lawyer verified successfully" 
      })
    } else {
      // For reject, we could either delete the account or mark as rejected
      // For now, we'll just delete the account
      await User.findByIdAndDelete(lawyerId)
      
      return NextResponse.json({ 
        success: true, 
        message: "Lawyer account rejected and removed" 
      })
    }

  } catch (err) {
    console.error("Error in lawyer verification:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 