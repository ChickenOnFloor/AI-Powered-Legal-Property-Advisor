import { connectToDB } from "@/lib/db";
import { Appointment } from "@/models/appointment";
import { getAuthUser } from "@/lib/getAuthUser";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { lawyerId, clientName, clientEmail, type, date, time } = body;
    if (!lawyerId || !clientName || !clientEmail || !type || !date || !time) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    const appointment = await Appointment.create({
      lawyerId,
      clientName,
      clientEmail,
      type,
      date,
      time,
      paid: false,
    });
    return NextResponse.json({ success: true, appointment });
  } catch (err) {
    console.error("Error creating appointment:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
} 