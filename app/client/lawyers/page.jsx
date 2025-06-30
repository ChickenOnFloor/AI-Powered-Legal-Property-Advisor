"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Star, MessageCircle, Video, MapPin, Search, ArrowLeft, CreditCard, CheckCircle,
} from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function LawyersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRating, setSelectedRating] = useState("")
  const [lawyers, setLawyers] = useState([])
  const [bookedLawyerIds, setBookedLawyerIds] = useState([])

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch("/api/lawyers")
        const data = await res.json()
        setLawyers(data.lawyers || [])
      } catch (err) {
        console.error("Failed to fetch lawyers:", err)
      }
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/booking/active")
        const data = await res.json()
        if (Array.isArray(data.bookedLawyerIds)) {
          setBookedLawyerIds(data.bookedLawyerIds)
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err)
      }
    }

    fetchLawyers()
    fetchBookings()
  }, [])

  const filteredLawyers = lawyers
    .filter((lawyer) => {
      const search = searchTerm.toLowerCase()

      const matchesName =
        (lawyer.firstName?.toLowerCase() || "").includes(search) ||
        (lawyer.lastName?.toLowerCase() || "").includes(search) ||
        `${lawyer.firstName} ${lawyer.lastName}`.toLowerCase().includes(search)

      const matchesSpecialization =
        (lawyer.specialization?.toLowerCase() || "").includes(search)

      const matchesSearch = matchesName || matchesSpecialization

      const matchesRating =
        !selectedRating || selectedRating === "any" ||
        lawyer.rating >= parseFloat(selectedRating)

      return matchesSearch && matchesRating
    })
    .sort((a, b) => b.rating - a.rating)

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
            <Search className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Find Lawyers</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial="initial" animate="animate">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Property Lawyers</h1>
          <p className="text-gray-600">Browse our network of verified property law specialists</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                One payment = Full access to both chat and video with your chosen lawyer
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-2 text-sm text-blue-700">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3" />
                <span>48-hour access period</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-3 w-3" />
                <span>Unlimited chat messaging</span>
              </div>
              <div className="flex items-center space-x-1">
                <Video className="h-3 w-3" />
                <span>Video call scheduling</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="mb-8" variants={fadeInUp} initial="initial" animate="animate">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search lawyers or specializations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Rating</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="space-y-6" variants={fadeInUp} initial="initial" animate="animate">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">{filteredLawyers.length} lawyers found</p>
          </div>

          <div className="grid gap-6">
            {filteredLawyers.map((lawyer, index) => {
              const isBooked = bookedLawyerIds.includes(lawyer._id)
              return (
                <motion.div
                  key={lawyer._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={lawyer.image || "/placeholder.svg"} />
                            <AvatarFallback>
                              {lawyer.firstName?.[0]}{lawyer.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-semibold">
                                {lawyer.firstName} {lawyer.lastName}
                              </h3>
                              {lawyer.verified && (
                                <Badge className="bg-green-100 text-green-800">Verified</Badge>
                              )}
                            </div>
                            <p className="text-blue-600 font-medium mb-2">{lawyer.specialization}</p>
                            <p className="text-gray-600 text-sm mb-3">{lawyer.bio}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{lawyer.rating || "N/A"}</span>
                                <span>({lawyer.reviewsCount || 0} reviews)</span>
                              </div>
                              {lawyer.location && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{lawyer.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">${lawyer.sessionRate}</div>
                            <div className="text-sm text-gray-500">Complete access package</div>
                            <div className="text-xs text-green-600 font-medium">Chat + Video included</div>
                          </div>
                          {!isBooked ? (
                            <Link href={`/client/booking/${lawyer._id}`}>
                              <Button size="lg" className="w-full">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Book Full Access
                              </Button>
                            </Link>
                          ) : (
                            <Button size="lg" className="w-full" disabled>
                              Already Hired
                            </Button>
                          )}
                          <div className="text-xs text-gray-500 text-center">48-hour access to both chat & video</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}