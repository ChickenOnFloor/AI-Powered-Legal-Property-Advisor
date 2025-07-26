import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import { Review } from "@/models/Review"

export async function GET() {
  try {
    await connectToDB()

    const lawyers = await User.find({ userType: "lawyer" }).select("-password")

    // Fetch ratings for all lawyers
    const lawyersWithRatings = await Promise.all(
      lawyers.map(async (lawyer) => {
        const reviews = await Review.find({ lawyerId: lawyer._id })
        const avgRating = reviews.length > 0 
          ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
          : null
        
        return {
          ...lawyer.toObject(),
          avgRating: avgRating ? parseFloat(avgRating) : null,
          reviewCount: reviews.length
        }
      })
    )

    return NextResponse.json({ lawyers: lawyersWithRatings })
  } catch (err) {
    console.error("Error fetching lawyers:", err)
    return NextResponse.json({ error: "Failed to fetch lawyers" }, { status: 500 })
  }
}
