// app/api/lawyers/[lawyerId]/route.js

import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import { Review } from "@/models/Review"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    await connectToDB()
    const data = await params
    console.log(data.lawyerId)
    const lawyer = await User.findOne({
      _id: data.lawyerId,
      userType: "lawyer",
    }).select("-password")
    
    if (!lawyer) {
      return NextResponse.json({ error: "Lawyer not found" }, { status: 404 })
    }

    // Fetch reviews for this lawyer
    const reviews = await Review.find({ lawyerId: lawyer._id })
    const avgRating = reviews.length > 0 
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : null

    const lawyerWithRating = {
      ...lawyer.toObject(),
      avgRating: avgRating ? parseFloat(avgRating) : null,
      reviewCount: reviews.length
    }

    return NextResponse.json({ lawyer: lawyerWithRating }, { status: 200 })
  } catch (err) {
    console.error("Error fetching lawyer by ID:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
