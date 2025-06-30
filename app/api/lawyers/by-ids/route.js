// app/api/lawyers/by-ids/route.js

import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    await connectToDB()
    const { ids } = await req.json()

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 })
    }

    const lawyers = await User.find({
      _id: { $in: ids },
      userType: "lawyer",
    }).select("firstName lastName email image _id")

    return NextResponse.json({ lawyers })
  } catch (err) {
    console.error("Error in /api/lawyers/by-ids:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
