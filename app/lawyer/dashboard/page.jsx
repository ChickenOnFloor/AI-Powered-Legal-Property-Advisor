"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Video, Calendar, FileText, Star, Users, DollarSign, TrendingUp } from "lucide-react"

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

export default function LawyerDashboard() {
  const stats = [
    { title: "Active Cases", value: "24", icon: FileText, color: "text-blue-600" },
    { title: "This Month's Earnings", value: "$12,450", icon: DollarSign, color: "text-green-600" },
    { title: "Client Rating", value: "4.9", icon: Star, color: "text-yellow-600" },
    { title: "Total Clients", value: "156", icon: Users, color: "text-purple-600" },
  ]

  const recentClients = [
    {
      id: 1,
      name: "John Smith",
      case: "Property Boundary Dispute",
      status: "Active",
      lastContact: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      sessionType: "Video - $89",
      paid: true,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      case: "Real Estate Contract Review",
      status: "Pending",
      lastContact: "1 day ago",
      avatar: "/placeholder.svg?height=40&width=40",
      sessionType: "Chat - $49",
      paid: true,
    },
    {
      id: 3,
      name: "Mike Johnson",
      case: "Landlord-Tenant Dispute",
      status: "Completed",
      lastContact: "3 days ago",
      avatar: "/placeholder.svg?height=40&width=40",
      sessionType: "Premium - $149",
      paid: true,
    },
  ]

  const upcomingAppointments = [
    { id: 1, client: "John Smith", type: "Video Call - $89", time: "2:00 PM", date: "Today", paid: true },
    { id: 2, client: "Sarah Wilson", type: "Chat Session - $49", time: "10:00 AM", date: "Tomorrow", paid: true },
    { id: 3, client: "Mike Johnson", type: "Premium - $149", time: "3:30 PM", date: "Dec 15", paid: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">LA</span>
            </div>
            <span className="text-xl font-bold">Lawyer Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Profile
            </Button>
            <Button variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah!</h1>
          <p className="text-gray-600">Manage your property law cases and paid consultation sessions.</p>
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
                <CardTitle>Recent Paid Clients</CardTitle>
                <CardDescription>Your latest client interactions with active subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={client.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{client.name}</h4>
                          <p className="text-sm text-gray-600">{client.case}</p>
                          <p className="text-xs text-gray-500">Last contact: {client.lastContact}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            client.status === "Active"
                              ? "default"
                              : client.status === "Completed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {client.status}
                        </Badge>
                        {client.paid && <Badge className="bg-green-100 text-green-800">Paid</Badge>}
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{appointment.client}</h4>
                        <div className="flex space-x-1">
                          <Badge variant="outline">{appointment.type}</Badge>
                          {appointment.paid ? (
                            <Badge className="bg-green-100 text-green-800">Paid</Badge>
                          ) : (
                            <Badge variant="destructive">Unpaid</Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1" disabled={!appointment.paid}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" className="flex-1" disabled={!appointment.paid}>
                          <Video className="h-4 w-4 mr-2" />
                          Join
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Meeting</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <FileText className="h-6 w-6" />
                  <span>Create Case</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <MessageCircle className="h-6 w-6" />
                  <span>Send Message</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>View Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
