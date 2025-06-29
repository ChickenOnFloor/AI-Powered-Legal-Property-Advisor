"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Scale, AlertTriangle, CheckCircle, DollarSign, CreditCard } from "lucide-react"

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

export default function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Property Cases", value: "1,234", change: "+8%", icon: Scale, color: "text-green-600" },
    { title: "Session Revenue", value: "$45,678", change: "+15%", icon: DollarSign, color: "text-purple-600" },
    { title: "Paid Sessions", value: "892", change: "+23%", icon: CreditCard, color: "text-yellow-600" },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "payment",
      user: "John Smith",
      action: "Booked Video Property Consultation - $89",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "case_created",
      user: "Sarah Johnson",
      action: "Started property boundary dispute case",
      time: "15 minutes ago",
      status: "info",
    },
    {
      id: 3,
      type: "payment",
      user: "Mike Wilson",
      action: "Chat session with property lawyer - $49",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: 4,
      type: "lawyer_verification",
      user: "Emily Davis",
      action: "Property lawyer verification completed",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 5,
      type: "ai_consultation",
      user: "Robert Chen",
      action: "Used free AI property consultation",
      time: "3 hours ago",
      status: "info",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: "Lawyer Verification",
      name: "Dr. Amanda Rodriguez",
      specialization: "Corporate Law",
      submitted: "2 days ago",
    },
    { id: 2, type: "Payment Dispute", name: "Invoice #5678", amount: "$275", submitted: "3 hours ago" },
    { id: 3, type: "Case Review", name: "Property Dispute #1234", client: "John Doe", submitted: "1 day ago" },
  ]

  const topLawyers = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 4.9,
      cases: 150,
      revenue: "$52,500",
      sessions: 45,
      specialization: "Property Disputes",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4.8,
      cases: 120,
      revenue: "$39,000",
      sessions: 38,
      specialization: "Real Estate Transactions",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 4.7,
      cases: 95,
      revenue: "$26,125",
      sessions: 29,
      specialization: "Landlord-Tenant Law",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">LA</span>
            </div>
            <span className="text-xl font-bold">Admin Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor platform performance, payments, and manage operations.</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2" variants={fadeInUp} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities and payment events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "warning"
                              ? "bg-yellow-500"
                              : activity.status === "error"
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <Badge
                        variant={
                          activity.status === "success"
                            ? "default"
                            : activity.status === "warning"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {activity.type === "payment" ? "Payment" : activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span>Pending Approvals</span>
                </CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{item.type}</Badge>
                        <span className="text-xs text-gray-500">{item.submitted}</span>
                      </div>
                      <h4 className="font-medium mb-1">{item.name}</h4>
                      {item.specialization && <p className="text-sm text-gray-600">{item.specialization}</p>}
                      {item.client && <p className="text-sm text-gray-600">Client: {item.client}</p>}
                      {item.amount && <p className="text-sm text-gray-600">Amount: {item.amount}</p>}
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div className="mt-8" variants={fadeInUp} initial="initial" animate="animate">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Lawyers</CardTitle>
              <CardDescription>Highest rated lawyers with most paid subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {topLawyers.map((lawyer, index) => (
                  <div key={lawyer.id} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar>
                        <AvatarImage src={lawyer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {lawyer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{lawyer.name}</h4>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <span className="text-yellow-500">★</span>
                          <span>{lawyer.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cases:</span>
                        <span className="font-medium">{lawyer.cases}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-medium text-green-600">{lawyer.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paid Sessions:</span>
                        <span className="font-medium text-blue-600">{lawyer.sessions}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{lawyer.specialization}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
