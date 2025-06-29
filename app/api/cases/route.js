import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import Case from "@/models/case"
import { User } from "@/models/user";

export async function GET() {
  try {
    await connectToDB()
    const cases = await Case.find({}).sort({ createdAt: -1 }).limit(5)
    return NextResponse.json({ success: true, cases })
  } catch (error) {
    console.error("Error fetching cases:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch cases" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, lawyerEmail, clientEmail } = body;

    if (!title || !lawyerEmail || !clientEmail) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await connectToDB();

    const lawyerUser = await User.findOne({ email: lawyerEmail });
    const clientUser = await User.findOne({ email: clientEmail });

    if (!lawyerUser || !clientUser) {
      return NextResponse.json({ message: "Lawyer or client not found" }, { status: 404 });
    }

    const newCase = new Case({
      title,
      lawyer: lawyerUser.firstName + " " + lawyerUser.lastName,
      userId: clientUser._id,
    });

    await newCase.save();

    return NextResponse.json({ success: true, message: "Case created successfully" });
  } catch (error) {
    console.error("Case creation error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
