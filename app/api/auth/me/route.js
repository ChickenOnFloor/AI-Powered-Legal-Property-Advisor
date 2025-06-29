// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";  // Import jwt to decode the token
// import { connectToDB } from "@/lib/db";
// import { User } from "@/models/User";

// const secret = process.env.JWT_SECRET;  // Use your JWT secret for verification

// export async function GET(req) {
//   try {
//     await connectToDB();

//     // Get the token from cookies
//     const cookieStore = req.cookies;
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Decode and verify the JWT token
//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, secret);  // Verify token with secret
//     } catch (err) {
//       console.error("Invalid or expired token", err);
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // If token is valid, fetch user from the database
//     const user = await User.findOne({ email: decodedToken.email }).lean();

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Return the user data
//     return NextResponse.json({ user });
//   } catch (err) {
//     console.error("/api/auth/me error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
