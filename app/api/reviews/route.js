import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { Review } from "@/models/Review"
import { User } from "@/models/User"
import { Notification } from "@/models/Notification"
import { getAuthUser } from "@/lib/getAuthUser"

export async function GET(req) {
  try {
    await connectToDB()
    const { searchParams } = new URL(req.url)
    const lawyerId = searchParams.get("lawyerId")
    
    if (!lawyerId) {
      return NextResponse.json({ message: "Missing lawyerId" }, { status: 400 })
    }
    
    const reviews = await Review.find({ lawyerId })
      .populate("clientId", "firstName lastName")
      .sort({ createdAt: -1 })
    
    const avgRating = reviews.length 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
      : null
    
    return NextResponse.json({ reviews, avgRating })
  } catch (err) {
    console.error("Error fetching reviews:", err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user || user.userType !== "client") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    
    const body = await req.json()
    const { lawyerId, rating, comment } = body
    
    if (!lawyerId || !rating) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }
    
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ message: "Invalid rating" }, { status: 400 })
    }
    
    // Check if user has already reviewed this lawyer
    const existingReview = await Review.findOne({ lawyerId, clientId: user.id })
    if (existingReview) {
      return NextResponse.json({ message: "You have already reviewed this lawyer" }, { status: 409 })
    }
    
    // Get lawyer details for notification
    const lawyer = await User.findById(lawyerId)
    if (!lawyer) {
      return NextResponse.json({ message: "Lawyer not found" }, { status: 404 })
    }
    
    const review = await Review.create({
      lawyerId,
      clientId: user.id,
      rating,
      comment,
    })
    
    // Create notification for lawyer about new review
    await Notification.create({
      userId: lawyerId,
      type: "review",
      title: "New Review Received",
      message: `${user.firstName} ${user.lastName} has left you a ${rating}-star review.`,
      data: { reviewId: review._id, rating, clientName: `${user.firstName} ${user.lastName}` },
      priority: "medium"
    })
    
    // Create notification for client confirming review submission
    await Notification.create({
      userId: user.id,
      type: "review",
      title: "Review Submitted",
      message: `Your review for ${lawyer.firstName} ${lawyer.lastName} has been submitted successfully.`,
      data: { reviewId: review._id, lawyerName: `${lawyer.firstName} ${lawyer.lastName}` },
      priority: "low"
    })
    
    return NextResponse.json({ success: true, review })
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ message: "You have already reviewed this lawyer" }, { status: 409 })
    }
    console.error("Error creating review:", err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
} 