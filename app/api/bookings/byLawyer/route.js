import { connectToDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { User } from "@/models/User";
import { getAuthUser } from "@/lib/getAuthUser";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const lawyerId = searchParams.get("lawyerId");
    if (!lawyerId) {
      return NextResponse.json({ message: "Missing lawyerId" }, { status: 400 });
    }
    const user = await getAuthUser();
    if (!user || user.id !== lawyerId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const bookings = await Booking.find({ lawyerId })
      .sort({ createdAt: -1 })
      .populate("userId", "firstName lastName email");
    // Format for dashboard
    const result = bookings.map((b) => ({
      _id: b._id,
      userName: b.userId ? `${b.userId.firstName} ${b.userId.lastName}` : "Unknown",
      userEmail: b.userId ? b.userId.email : "",
      status: b.status,
      time: b.createdAt.toLocaleTimeString(),
      date: b.createdAt.toLocaleDateString(),
    }));
    return NextResponse.json(result);
  } catch (err) {
    console.error("Error in /api/bookings/byLawyer:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
} 