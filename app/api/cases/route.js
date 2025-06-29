import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import Case from "@/models/case"

export async function GET() {
  try {
    await connectToDB()
    const cases = await Case.find({}).sort({ createdAt: -1 }).limit(5)
    return NextResponse.json({ success: true, cases })
  } catch (error) {
    console.error("Error fetching cases:", error)  // 👈 LOG the exact error
    return NextResponse.json({ success: false, error: "Failed to fetch cases" }, { status: 500 })
  }
}
