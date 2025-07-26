import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { Case } from "@/models/Case"
import { Notification } from "@/models/Notification"
import { getAuthUser } from "@/lib/getAuthUser"

export async function GET() {
  try {
    await connectToDB()
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const cases = await Case.find({ userId: user.id }).sort({ createdAt: -1 }).limit(5)
    return NextResponse.json({ success: true, cases })
  } catch (error) {
    console.error("Error fetching cases:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch cases" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await connectToDB()
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description } = body

    if (!title) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 })
    }

    const newCase = await Case.create({
      title,
      description: description || "",
      userId: user.id,
      status: "Pending",
      lawyer: "Unassigned",
    })

    // Create notification for case creation
    await Notification.create({
      userId: user.id,
      type: "case",
      title: "Case Created",
      message: `Your case "${title}" has been created successfully. It is currently pending assignment to a lawyer.`,
      data: { caseId: newCase._id, caseTitle: title },
      priority: "medium"
    })

    return NextResponse.json({
      success: true,
      case: {
        _id: newCase._id,
        title: newCase.title,
        description: newCase.description,
        status: newCase.status,
        lawyer: newCase.lawyer,
        date: newCase.createdAt,
      }
    })
  } catch (error) {
    console.error("Case creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create case" }, { status: 500 })
  }
}
