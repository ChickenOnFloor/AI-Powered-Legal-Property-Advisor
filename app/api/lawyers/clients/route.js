import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Case from "@/models/Case";
import { getAuthUser } from "@/lib/getAuthUser";
import { User } from "@/models/User";  // Uppercase 'User'

export const dynamic = "force-dynamic"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lawyerEmail = searchParams.get("lawyerEmail");

    if (!lawyerEmail) {
      return NextResponse.json({ message: "Missing lawyerEmail" }, { status: 400 });
    }

    // Only the lawyer themselves (or an admin) may see their case list
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const lawyer = await User.findOne({ email: lawyerEmail });
    if (!lawyer) {
      return NextResponse.json({ message: "Lawyer not found" }, { status: 404 });
    }

    if (authUser.userType !== "admin" && authUser.id !== lawyer._id.toString()) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
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
