import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"

export async function GET() {
  try {
    await connectToDB()

    const lawyers = await User.find({ userType: "lawyer" }).select("-password")

    return NextResponse.json({ lawyers })
  } catch (err) {
    console.error("Error fetching lawyers:", err)
    return NextResponse.json({ error: "Failed to fetch lawyers" }, { status: 500 })
  }
}
