import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/getAuthUser"

export async function GET() {
  const user = getAuthUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ user })
}
