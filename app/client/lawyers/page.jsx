"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MessageCircle, Video, MapPin, Search, Filter, ArrowLeft, CreditCard, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function LawyersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const [selectedRating, setSelectedRating] = useState("")

  const lawyers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialization: "Property Disputes",
      rating: 4.9,
      reviews: 127,
      cases: 150,
      experience: 12,
      location: "New York, NY",
      sessionRate: 89,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Specialized in property disputes, boundary issues, and real estate litigation.",
      availability: "Available today",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      specialization: "Real Estate Transactions",
      rating: 4.8,
      reviews: 98,
      cases: 120,
      experience: 10,
      location: "Los Angeles, CA",
      sessionRate: 95,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Expert in real estate transactions, property contracts, and commercial real estate.",
      availability: "Available tomorrow",
      verified: true,
    },
    {
      id: 3,
      name: "Emily Davis",
      specialization: "Landlord-Tenant Law",
      rating: 4.7,
      reviews: 85,
      cases: 95,
      experience: 8,
      location: "Chicago, IL",
      sessionRate: 75,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Dedicated to landlord-tenant disputes, rental agreements, and housing law.",
      availability: "Available today",
      verified: true,
    },
    {
      id: 4,
      name: "Robert Wilson",
      specialization: "Property Development",
      rating: 4.9,
      reviews: 156,
      cases: 200,
      experience: 15,
      location: "Houston, TX",
      sessionRate: 125,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Specialist in property development, zoning law, and construction disputes.",
      availability: "Available next week",
      verified: true,
    },
    {
      id: 5,
      name: "Lisa Thompson",
      specialization: "Property Title Issues",
      rating: 4.6,
      reviews: 72,
      cases: 80,
      experience: 7,
      location: "Miami, FL",
      sessionRate: 65,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Expert in property title disputes, ownership issues, and property transfers.",
      availability: "Available today",
      verified: true,
    },
    {
      id: 6,
      name: "David Martinez",
      specialization: "Commercial Property",
      rating: 4.8,
      reviews: 134,
      cases: 180,
      experience: 14,
      location: "San Francisco, CA",
      sessionRate: 110,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Commercial property attorney specializing in leases, acquisitions, and development.",
      availability: "Available tomorrow",
      verified: true,
    },
  ]

  const filteredLawyers = lawyers
    .filter((lawyer) => {
      const matchesSearch =
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialization = !selectedSpecialization || lawyer.specialization === selectedSpecialization
      const matchesRating = !selectedRating || lawyer.rating >= Number.parseFloat(selectedRating)

      return matchesSearch && matchesSpecialization && matchesRating
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
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search lawyers or specializations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    <SelectItem value="Property Disputes">Property Disputes</SelectItem>
                    <SelectItem value="Real Estate Transactions">Real Estate Transactions</SelectItem>
                    <SelectItem value="Landlord-Tenant Law">Landlord-Tenant Law</SelectItem>
                    <SelectItem value="Property Development">Property Development</SelectItem>
                    <SelectItem value="Property Title Issues">Property Title Issues</SelectItem>
                    <SelectItem value="Commercial Property">Commercial Property</SelectItem>
                  </SelectContent>
                </Select>
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
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="space-y-6" variants={fadeInUp} initial="initial" animate="animate">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">{filteredLawyers.length} lawyers found</p>
            <Select defaultValue="rating">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="price-low">Lowest Price</SelectItem>
                <SelectItem value="price-high">Highest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {filteredLawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
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
                            {lawyer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                            {lawyer.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
                            <Badge variant="secondary">{lawyer.availability}</Badge>
                          </div>
                          <p className="text-blue-600 font-medium mb-2">{lawyer.specialization}</p>
                          <p className="text-gray-600 text-sm mb-3">{lawyer.bio}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{lawyer.rating}</span>
                              <span>({lawyer.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{lawyer.location}</span>
                            </div>
                            <span>{lawyer.experience} years experience</span>
                            <span>{lawyer.cases} cases handled</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">${lawyer.sessionRate}</div>
                          <div className="text-sm text-gray-500">Complete access package</div>
                          <div className="text-xs text-green-600 font-medium">Chat + Video included</div>
                        </div>
                        <Link href={`/client/booking/${lawyer.id}`}>
                          <Button size="lg" className="w-full">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Book Full Access
                          </Button>
                        </Link>
                        <div className="text-xs text-gray-500 text-center">48-hour access to both chat & video</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
