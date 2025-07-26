"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Video, Calendar, ArrowLeft, Star, FileText, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/toast"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch("/api/client/sessions")
        if (res.ok) {
          const data = await res.json()
          setSessions(data.sessions || [])
        } else {
          addToast("Failed to load sessions", "error")
        }
      } catch (err) {
        console.error("Failed to fetch sessions:", err)
        addToast("Failed to load sessions", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [addToast])

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "chat":
        return <MessageCircle className="h-4 w-4" />
      case "case_management":
        return <FileText className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading sessions...</p>
        </div>
      </div>
    )
  }

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
            <span className="text-xl font-bold">Session History</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Sessions</h1>
          <p className="text-gray-600">View all your legal consultations and case history</p>
        </motion.div>

        <div className="space-y-6">
          {sessions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions yet</h3>
              <p className="text-gray-600 mb-6">Start by booking a session with a lawyer or creating a case</p>
              <div className="flex justify-center space-x-4">
                <Link href="/client/lawyers">
                  <Button>
                    <Video className="h-4 w-4 mr-2" />
                    Find Lawyers
                  </Button>
                </Link>
                <Link href="/client/ai-chat">
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Free AI Chat
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={session.lawyer.image} />
                          <AvatarFallback>
                            {session.lawyer.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{session.lawyer.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{session.lawyer.rating}</span>
                            </div>
                          </div>
                          <p className="text-blue-600 font-medium mb-2">{session.lawyer.specialization}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              {getTypeIcon(session.type)}
                              <span className="capitalize">{session.type.replace('_', ' ')}</span>
                            </div>
                            <span>{session.date}</span>
                            <span>{session.time}</span>
                            <span>{session.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-3">
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{session.price}</div>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          {session.type === "booking" && session.accessStatus === "enabled" && (
                            <Link href="/chat">
                              <Button size="sm">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Chat
                              </Button>
                            </Link>
                          )}
                          {session.type === "case" && (
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4 mr-2" />
                              View Case
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="font-medium mb-1">{session.case}</h4>
                      <p className="text-sm text-gray-600">{session.summary}</p>
                      {session.expiresAt && (
                        <p className="text-xs text-gray-500 mt-2">
                          Access expires: {new Date(session.expiresAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
