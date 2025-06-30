"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [alreadyBooked, setAlreadyBooked] = useState(false)

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
      const res = await fetch(`/api/booking/check?lawyerId=${lawyerId}`)
      const data = await res.json()
      setAlreadyBooked(data.booked) // true/false based on backend logic
    } catch (err) {
      console.error("Booking check failed:", err)
    }
  }

  if (lawyerId) checkBooking()
}, [lawyerId])


  const handleBooking = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lawyerId }), // userId handled from session on backend
      })

      if (res.ok) {
        setSuccess(true)
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

  if (!lawyer) return <div className="p-6 text-center text-gray-600 animate-pulse">Loading lawyer info...</div>

  const sessionPrice = lawyer.sessionRate || 50

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
          <p className="text-gray-600">Booking gives you access to chat/video for 2 days with your lawyer</p>
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
                <CardTitle>Booking Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alreadyBooked ? (
  <div className="text-green-600 font-medium">
    You have already booked this lawyer. Access is active.
  </div>
) : (
  <>
    <p className="text-sm text-gray-500">
      Upon booking, you will be granted access to message and video call this lawyer for the next <strong>2 days</strong>.
    </p>
    <Button onClick={handleBooking} disabled={loading}>
      {loading ? "Booking..." : `Confirm Booking - $${sessionPrice}`}
    </Button>
    {success && <p className="text-green-600 font-medium">Booking successful! Access is now active for 2 days.</p>}
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
