// booking/route.js
import { connectToDB } from "@/lib/db";
import { Booking } from "@/models/booking";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const {
      lawyerId,
      userId, // optional
      userName,
      userEmail,
      selectedDate,
      selectedTime,
    } = body;

    if (!lawyerId || !userName || !userEmail || !selectedDate || !selectedTime) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newBooking = new Booking({
      lawyerId,
      userId: userId || null,
      userName,
      userEmail,
      date: selectedDate,
      time: selectedTime,
    });

    await newBooking.save();

    return NextResponse.json({ success: true, message: "Booking successful" });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
