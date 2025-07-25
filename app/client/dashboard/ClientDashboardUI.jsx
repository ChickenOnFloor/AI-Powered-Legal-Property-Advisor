"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Star, Search, Plus, Lock, CreditCard, Clock, Loader2, User, Settings, FileText } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast"
import NotificationBell from "@/components/NotificationBell"

export default function ClientDashboardUI({ user }) {
  const [lawyers, setLawyers] = useState([])
  const [recentCases, setRecentCases] = useState([])
  const [newCase, setNewCase] = useState({ title: "", description: "" })
  const [loading, setLoading] = useState(true)
  const [lawyerRatings, setLawyerRatings] = useState({})
  const { addToast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch lawyers
        const lawyersRes = await fetch("/api/lawyers")
        const lawyersData = await lawyersRes.json()
        setLawyers(lawyersData.lawyers || [])

        // Fetch cases
        const casesRes = await fetch("/api/cases")
        const casesData = await casesRes.json()
        if (casesData.success) {
          setRecentCases(casesData.cases || [])
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err)
        addToast("Failed to load dashboard data", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [addToast])

  // Fetch ratings for lawyers
  useEffect(() => {
    const fetchRatings = async () => {
      const ratings = {}
      for (const lawyer of lawyers) {
        try {
          const res = await fetch(`/api/reviews?lawyerId=${lawyer._id}`)
          const data = await res.json()
          ratings[lawyer._id] = {
            avgRating: data.avgRating ? parseFloat(data.avgRating) : null,
            reviewCount: data.reviews ? data.reviews.length : 0
          }
        } catch (err) {
          console.error(`Failed to fetch ratings for lawyer ${lawyer._id}:`, err)
          ratings[lawyer._id] = { avgRating: null, reviewCount: 0 }
        }
      }
      setLawyerRatings(ratings)
    }

    if (lawyers.length > 0) {
      fetchRatings()
    }
  }, [lawyers])

  const handleCreateCase = async () => {
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCase),
      })
      const data = await res.json()
      if (data.success) {
        setRecentCases((prev) => [data.case, ...prev])
        setNewCase({ title: "", description: "" })
        document.getElementById("close-dialog")?.click()
        addToast("Case created successfully!", "success")
      } else {
        addToast(data.error || "Failed to create case", "error")
      }
    } catch (err) {
      console.error("Failed to create case:", err)
      addToast("Failed to create case", "error")
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">LA</span>
            </div>
            <span className="text-xl font-bold">Client Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationBell />
            <Link href="/profile">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <form action="/auth/logout" method="POST">
              <Button variant="ghost" size="sm" type="submit">Logout</Button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.firstName}!</h1>
          <p className="text-gray-600">Start with free AI guidance or connect with lawyers.</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[{
            icon: Bot, title: "AI Property Assistant", description: "Get instant property legal guidance", href: "/client/ai-chat", color: "bg-green-500", badge: "FREE", badgeColor: "bg-green-100 text-green-800",
          }, {
            icon: Search, title: "Find Property Lawyers", description: "Browse and book property law specialists", href: "/client/lawyers", color: "bg-blue-500", badge: "PAY PER SESSION", badgeColor: "bg-blue-100 text-blue-800",
          }, {
            icon: Clock, title: "Recent Activities", description: "View all your recent interactions", href: "/client/sessions", color: "bg-orange-500", badge: "SESSION HISTORY", badgeColor: "bg-orange-100 text-orange-800",
          }, {
            icon: FileText, title: "Document Management", description: "Upload and manage legal documents", href: "/documents", color: "bg-purple-500", badge: "SECURE", badgeColor: "bg-purple-100 text-purple-800",
          }].map((action, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Link href={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer relative">
                  <div className={`absolute top-3 right-3 ${action.badgeColor} text-xs px-2 py-1 rounded-full`}>
                    {action.badge}
                  </div>
                  <CardContent className="p-6 text-center">
                    <div className="relative">
                      <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      {action.locked && (
                        <div className="absolute -top-1 -right-1 bg-gray-800 rounded-full p-1">
                          <Lock className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Cases
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Case
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Case</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Case Title"
                          value={newCase.title}
                          onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                        />
                        <Textarea
                          placeholder="Case Description"
                          value={newCase.description}
                          onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                        />
                        <DialogClose asChild>
                          <button id="close-dialog" className="hidden"></button>
                        </DialogClose>
                        <Button onClick={handleCreateCase}>Submit</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCases.length === 0 ? (
                    <p className="text-sm text-gray-500">No recent cases found.</p>
                  ) : (
                    recentCases.map((case_) => (
                      <div key={case_._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{case_.title}</h4>
                          <p className="text-sm text-gray-600">Lawyer: {case_.lawyer}</p>
                          <p className="text-xs text-gray-500">{new Date(case_.date).toLocaleDateString()}</p>
                        </div>
                        <Badge
                          variant={
                            case_.status === "Active" ? "default" :
                            case_.status === "Completed" ? "secondary" :
                            "outline"
                          }
                        >
                          {case_.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle>Top Rated Lawyers</CardTitle>
                <CardDescription>Connect with our highest-rated legal professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lawyers.length === 0 ? (
                    <p className="text-sm text-gray-500">No lawyers found.</p>
                  ) : (
                    lawyers
                      .sort((a, b) => {
                        const ratingA = lawyerRatings[a._id]?.avgRating || 0
                        const ratingB = lawyerRatings[b._id]?.avgRating || 0
                        return ratingB - ratingA
                      })
                      .slice(0, 3)
                      .map((lawyer) => {
                        const rating = lawyerRatings[lawyer._id]?.avgRating
                        const reviewCount = lawyerRatings[lawyer._id]?.reviewCount || 0
                        return (
                          <div key={lawyer._id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>
                                  {lawyer.firstName[0]}{lawyer.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{lawyer.firstName} {lawyer.lastName}</h4>
                                <p className="text-sm text-gray-600">{lawyer.specialization}</p>
                                <div className="flex items-center space-x-1 text-xs text-gray-500">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{rating ? rating.toFixed(1) : "N/A"}</span>
                                  <span>({reviewCount} reviews)</span>
                                </div>
                              </div>
                            </div>
                            <Link href={`/client/booking/${lawyer._id}`}>
                              <Button size="sm">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Book Access
                              </Button>
                            </Link>
                          </div>
                        )
                      })
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
