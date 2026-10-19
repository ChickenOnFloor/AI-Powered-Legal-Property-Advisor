import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/getCurrentUser"

export const dynamic = "force-dynamic"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Keep `id` alongside `_id` for callers that used the decoded JWT shape
  return NextResponse.json({ user: { ...user.toObject(), id: user._id.toString() } })
}
