import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    // Fetch both clients and lawyers by ID
    const users = await User.find({
      _id: { $in: ids },
    }).select("firstName lastName email avatar _id userType status");

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.error("Error in /api/users/by-ids:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
