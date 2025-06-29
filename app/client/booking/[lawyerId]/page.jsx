// booking/page.jsx (fully dynamic with booking form and backend integration)
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  ArrowLeft,
  Star,
  MapPin,
} from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function BookingPage() {
  const params = useParams()
  const lawyerId = params?.lawyerId?.toString()

  const [lawyer, setLawyer] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [alreadyBooked, setAlreadyBooked] = useState(false)

  const availableSlots = {
    "2024-01-15": ["09:00", "10:30", "14:00", "15:30"],
    "2024-01-16": ["09:00", "11:00", "13:00", "16:00"],
    "2024-01-17": ["10:00", "14:30", "16:00"],
    "2024-01-18": ["09:30", "11:30", "15:00"],
    "2024-01-19": ["09:00", "10:00", "14:00", "15:30", "17:00"],
  }

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await fetch(`/api/lawyers/${lawyerId}`)
        if (!res.ok) throw new Error("Lawyer not found")
        const data = await res.json()
        setLawyer(data.lawyer)
      } catch (err) {
        console.error("Failed to fetch lawyer:", err)
      }
    }

    if (lawyerId) fetchLawyer()
  }, [lawyerId])

  useEffect(() => {
    const checkBooking = async () => {
      try {
        const res = await fetch(`/api/booking/check?lawyerId=${lawyerId}&userEmail=${userEmail}`)
        const data = await res.json()
        setAlreadyBooked(data.booked || false)
      } catch (err) {
        console.error("Booking check failed:", err)
      }
    }

    if (lawyerId && userEmail) {
      checkBooking()
    }
  }, [lawyerId, userEmail])

  if (!lawyer) return <div className="p-6 text-center text-gray-600 animate-pulse">Loading lawyer info...</div>

  const sessionPrice = lawyer.sessionRate || 50

  const dates = Object.keys(availableSlots).map((date) => ({
    value: date,
    label: new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }),
  }))

  const timeSlots = selectedDate ? availableSlots[selectedDate] || [] : []

  const handleBooking = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lawyerId,
          userName,
          userEmail,
          selectedDate,
          selectedTime,
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setUserName("")
        setUserEmail("")
        setSelectedDate("")
        setSelectedTime("")
        setAlreadyBooked(true)
      } else {
        const error = await res.json()
        alert(error.message || "Booking failed")
      }
    } catch (err) {
      console.error("Booking error:", err)
      alert("An error occurred")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link href="/client/lawyers">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lawyers
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Book Session</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Session</h1>
          <p className="text-gray-600">One payment gives you access to both chat and video with your lawyer</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-1" variants={fadeInUp} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle>Your Lawyer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={lawyer.image || "/placeholder.svg"} />
                    <AvatarFallback>
                      {lawyer.firstName[0]}{lawyer.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{lawyer.firstName} {lawyer.lastName}</h3>
                      {lawyer.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{lawyer.specialization}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{lawyer.rating || 4.8}</span>
                        <span>({lawyer.reviews || 120} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{lawyer.location || "Not specified"}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{lawyer.bio || "This lawyer has not provided a bio yet."}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="lg:col-span-2 space-y-6" variants={fadeInUp} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alreadyBooked ? (
                  <div className="text-red-600 font-medium">You have already booked this lawyer.</div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input placeholder="Your full name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input placeholder="you@example.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Select value={selectedDate} onValueChange={setSelectedDate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date" />
                        </SelectTrigger>
                        <SelectContent>
                          {dates.map((date) => (
                            <SelectItem key={date.value} value={date.value}>{date.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedDate && (
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    <Button onClick={handleBooking} disabled={loading || !userName || !userEmail || !selectedDate || !selectedTime}>
                      {loading ? "Booking..." : `Confirm Booking - $${sessionPrice}`}
                    </Button>
                    {success && <p className="text-green-600 font-medium">Booking successful!</p>}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
