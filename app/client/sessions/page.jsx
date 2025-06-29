"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Video, Calendar, ArrowLeft, Star, FileText } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function SessionsPage() {
  const sessions = [
  {
    id: 1,
    lawyer: {
      name: "Ayesha Khan",
      specialization: "Property Disputes & Inheritance",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    type: "video",
    date: "2024-01-15",
    time: "14:00",
    duration: "45 minutes",
    price: "PKR 12,000",
    status: "completed",
    case: "Land Boundary Dispute",
    summary: "Discussed property demarcation and next legal steps under Punjab Land Revenue Act.",
  },
  {
    id: 2,
    lawyer: {
      name: "Usman Ahmed",
      specialization: "Real Estate Transactions",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    type: "chat",
    date: "2024-01-12",
    time: "10:30",
    duration: "30 minutes",
    price: "PKR 6,500",
    status: "completed",
    case: "Property Sale Agreement Review",
    summary: "Reviewed the sale deed for urban residential property and identified legal gaps.",
  },
  {
    id: 3,
    lawyer: {
      name: "Fatima Siddiqui",
      specialization: "Tenant-Landlord Law",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    type: "video",
    date: "2024-01-18",
    time: "15:30",
    duration: "45 minutes",
    price: "PKR 12,000",
    status: "upcoming",
    case: "Tenant Eviction Advice",
    summary: null,
  }
]

  const upcomingSessions = sessions.filter((s) => s.status === "upcoming")
  const completedSessions = sessions.filter((s) => s.status === "completed")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link href="/client/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">My Sessions</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Sessions</h1>
          <p className="text-gray-600">View your upcoming and completed lawyer consultations</p>
        </motion.div>

        <motion.div className="mb-8" variants={fadeInUp} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Upcoming Sessions
                <Link href="/client/lawyers">
                  <Button size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book New Session
                  </Button>
                </Link>
              </CardTitle>
              <CardDescription>Your scheduled consultations</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No upcoming sessions</p>
                  <Link href="/client/lawyers">
                    <Button>Book Your First Session</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={session.lawyer.image || "/placeholder.svg"} />
                            <AvatarFallback>
                              {session.lawyer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{session.lawyer.name}</h4>
                            <p className="text-sm text-gray-600">{session.lawyer.specialization}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{session.lawyer.rating}</span>
                              <span>•</span>
                              <span>{session.case}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            {session.type === "video" ? (
                              <Video className="h-4 w-4 text-blue-600" />
                            ) : (
                              <MessageCircle className="h-4 w-4 text-blue-600" />
                            )}
                            <Badge variant="outline">{session.type === "video" ? "Video Call" : "Chat Session"}</Badge>
                          </div>
                          <p className="text-sm font-medium">
                            {new Date(session.date).toLocaleDateString()} at {session.time}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.duration} • ${session.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="flex-1">
                          {session.type === "video" ? "Join Video Call" : "Start Chat"}
                        </Button>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>Your completed consultations</CardDescription>
            </CardHeader>
            <CardContent>
              {completedSessions.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No completed sessions yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedSessions.map((session) => (
                    <div key={session.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={session.lawyer.image || "/placeholder.svg"} />
                            <AvatarFallback>
                              {session.lawyer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{session.lawyer.name}</h4>
                            <p className="text-sm text-gray-600">{session.lawyer.specialization}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{session.lawyer.rating}</span>
                              <span>•</span>
                              <span>{session.case}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            {session.type === "video" ? (
                              <Video className="h-4 w-4 text-green-600" />
                            ) : (
                              <MessageCircle className="h-4 w-4 text-green-600" />
                            )}
                            <Badge variant="secondary">Completed</Badge>
                          </div>
                          <p className="text-sm font-medium">
                            {new Date(session.date).toLocaleDateString()} at {session.time}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.duration} • ${session.price}
                          </p>
                        </div>
                      </div>
                      {session.summary && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Summary:</strong> {session.summary}
                          </p>
                        </div>
                      )}
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Download Receipt
                        </Button>
                        <Link href={`/client/booking/${session.lawyer.name.replace(" ", "-").toLowerCase()}`}>
                          <Button size="sm" variant="outline">
                            Book Again
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
