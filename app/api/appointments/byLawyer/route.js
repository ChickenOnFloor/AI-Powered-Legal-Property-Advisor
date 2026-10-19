import { connectToDB } from "@/lib/db";
import { Appointment } from "@/models/appointment";
import { getAuthUser } from "@/lib/getAuthUser";

export const dynamic = "force-dynamic"

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lawyerId = searchParams.get("lawyerId");

  if (!lawyerId) {
    return new Response(JSON.stringify({ message: "lawyerId required" }), { status: 400 });
  }

  const user = await getAuthUser();
  if (!user || (user.id !== lawyerId && user.userType !== "admin")) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  await connectToDB();

  const appointments = await Appointment.find({ lawyerId }).sort({ date: 1 });
  return new Response(JSON.stringify(appointments), { status: 200 });
}
