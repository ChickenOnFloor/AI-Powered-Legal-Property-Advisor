// app/api/lawyers/[lawyerId]/route.js

import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    await connectToDB()
    const data = await params
    console.log(data.lawyerId)
    const lawyer = await User.findOne({
      _id: data.lawyerId,
      userType: "lawyer",
    }).select("-password")
    if (!lawyer) {
      return NextResponse.json({ error: "Lawyer not found" }, { status: 404 })
    }

    return NextResponse.json({ lawyer }, { status: 200 })
  } catch (err) {
    console.error("Error fetching lawyer by ID:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
