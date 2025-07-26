import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import { Booking } from "@/models/Booking"
import { Case } from "@/models/Case"
import { Review } from "@/models/Review"
import { getAuthUser } from "@/lib/getAuthUser"

export async function GET() {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user || user.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get total counts
    const totalUsers = await User.countDocuments()
    const totalLawyers = await User.countDocuments({ userType: "lawyer" })
    const totalClients = await User.countDocuments({ userType: "client" })
    const totalBookings = await Booking.countDocuments()
    const totalCases = await Case.countDocuments()
    const totalReviews = await Review.countDocuments()

    // Get pending verifications
    const pendingLawyers = await User.find({ 
      userType: "lawyer", 
      verified: false 
    }).select("firstName lastName email specialization createdAt")

    // Get recent activity
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "firstName lastName email")
      .populate("lawyerId", "firstName lastName email")

    const recentCases = await Case.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "firstName lastName email")

    // Calculate revenue (assuming each booking is $50)
    const totalRevenue = totalBookings * 50

    // Get monthly stats
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthlyBookings = await Booking.countDocuments({
      createdAt: { $gte: startOfMonth }
    })
    const monthlyRevenue = monthlyBookings * 50

    const stats = {
      overview: {
        totalUsers,
        totalLawyers,
        totalClients,
        totalBookings,
        totalCases,
        totalReviews,
        totalRevenue,
        monthlyRevenue
      },
      pendingApprovals: pendingLawyers.map(lawyer => ({
        id: lawyer._id,
        type: "Lawyer Verification",
        name: `${lawyer.firstName} ${lawyer.lastName}`,
        specialization: lawyer.specialization,
        submitted: new Date(lawyer.createdAt).toLocaleDateString()
      })),
      recentActivity: [
        ...recentBookings.map(booking => ({
          id: booking._id,
          type: "payment",
          user: `${booking.userId?.firstName} ${booking.userId?.lastName}`,
          action: `Booked session with ${booking.lawyerId?.firstName} ${booking.lawyerId?.lastName}`,
          time: new Date(booking.createdAt).toLocaleString(),
          status: "success"
        })),
        ...recentCases.map(case_ => ({
          id: case_._id,
          type: "case_created",
          user: `${case_.userId?.firstName} ${case_.userId?.lastName}`,
          action: `Created case: ${case_.title}`,
          time: new Date(case_.createdAt).toLocaleString(),
          status: "info"
        }))
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10)
    }

    return NextResponse.json(stats)
  } catch (err) {
    console.error("Error fetching admin stats:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 