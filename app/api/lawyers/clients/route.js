import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Case from "@/models/case";
import { User } from "@/models/User";  // Uppercase 'User'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lawyerEmail = searchParams.get("lawyerEmail");

    if (!lawyerEmail) {
      return NextResponse.json({ message: "Missing lawyerEmail" }, { status: 400 });
    }

    await connectToDB();

    const lawyer = await User.findOne({ email: lawyerEmail });
    if (!lawyer) {
      return NextResponse.json({ message: "Lawyer not found" }, { status: 404 });
    }

    const cases = await Case.find({ lawyer: lawyer.email })
      .sort({ date: -1 })
      .limit(10);

    return NextResponse.json({ success: true, cases });
  } catch (error) {
    console.error("Error fetching lawyer's cases:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch cases" }, { status: 500 });
  }
}
