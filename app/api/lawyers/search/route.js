import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import { Review } from "@/models/Review"

export async function GET(req) {
  try {
    await connectToDB()
    const { searchParams } = new URL(req.url)
    
    const query = searchParams.get("q") || ""
    const specialization = searchParams.get("specialization") || ""
    const location = searchParams.get("location") || ""
    const minRating = searchParams.get("minRating") || ""
    const sortBy = searchParams.get("sortBy") || "rating"
    const limit = parseInt(searchParams.get("limit")) || 20

    // Build search query
    const searchQuery = { userType: "lawyer", verified: true }
    
    if (query) {
      searchQuery.$or = [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
        { bio: { $regex: query, $options: "i" } }
      ]
    }
    
    if (specialization) {
      searchQuery.specialization = { $regex: specialization, $options: "i" }
    }
    
    if (location) {
      searchQuery.location = { $regex: location, $options: "i" }
    }

    // Get lawyers with basic info
    let lawyers = await User.find(searchQuery)
      .select("-password")
      .limit(limit)

    // Get ratings for all lawyers
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

    // Filter by minimum rating if specified
    let filteredLawyers = lawyersWithRatings
    if (minRating) {
      filteredLawyers = filteredLawyers.filter(lawyer => 
        lawyer.avgRating && lawyer.avgRating >= parseFloat(minRating)
      )
    }

    // Sort results
    switch (sortBy) {
      case "rating":
        filteredLawyers.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
        break
      case "name":
        filteredLawyers.sort((a, b) => 
          `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
        )
        break
      case "price":
        filteredLawyers.sort((a, b) => (a.sessionRate || 0) - (b.sessionRate || 0))
        break
      case "reviews":
        filteredLawyers.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        break
      default:
        filteredLawyers.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
    }

    return NextResponse.json({
      success: true,
      lawyers: filteredLawyers,
      total: filteredLawyers.length,
      query: { q: query, specialization, location, minRating, sortBy }
    })
  } catch (err) {
    console.error("Error searching lawyers:", err)
    return NextResponse.json({ error: "Failed to search lawyers" }, { status: 500 })
  }
} 