"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, MessageCircle, Bot, Star, Shield, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <Scale className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LegalAdvisor</span>
          </motion.div>
          <div className="flex space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Legal
            <span className="text-blue-600"> Property Advisor</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get free AI property legal guidance instantly, then connect with verified property lawyers for professional
            consultation with complete chat and video access.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/client/ai-chat">
              <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                Try Free AI Assistant
              </Button>
            </Link>
            <Link href="/auth/register?type=client">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Sign Up to Find Lawyers
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Legal Solution</h2>
          <p className="text-xl text-gray-600">From free AI guidance to professional legal services</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Bot,
              title: "Free AI Property Assistant",
              description: "Get instant property legal guidance powered by Groq AI - completely free",
              badge: "FREE",
              badgeColor: "bg-green-500",
            },
            {
              icon: MessageCircle,
              title: "Complete Chat & Video Access",
              description: "One payment unlocks both unlimited chat and video calls with property lawyers",
              badge: "COMPLETE ACCESS",
              badgeColor: "bg-blue-500",
            },
            {
              icon: Star,
              title: "Top Property Lawyers",
              description: "Find top-rated property lawyers based on client reviews and expertise",
              badge: "VERIFIED",
              badgeColor: "bg-purple-500",
            },
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow relative">
                <div
                  className={`absolute top-4 right-4 ${feature.badgeColor} text-white text-xs px-2 py-1 rounded-full`}
                >
                  {feature.badge}
                </div>
                <CardHeader className="text-center pt-8">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get legal help in three simple steps</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                step: "1",
                title: "Start with Free AI",
                description:
                  "Describe your legal issue to our AI assistant and get instant guidance - no signup required",
                icon: Bot,
              },
              {
                step: "2",
                title: "Create Your Account",
                description: "Sign up to access our network of verified property lawyers with transparent rates",
                icon: Users,
              },
              {
                step: "3",
                title: "Get Complete Access",
                description: "Choose a lawyer and get 48-hour access to both chat and video consultation",
                icon: Scale,
              },
            ].map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <step.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Lawyer Pricing</h3>
                  <p className="text-gray-600">
                    Each lawyer sets their own rates. Sign up to browse profiles and find the right fit for your budget
                    and needs.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Bot className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Free AI Assistant</h4>
                    <p className="text-3xl font-bold text-green-600 mb-2">$0</p>
                    <p className="text-gray-600">Always free, unlimited use</p>
                    <ul className="text-sm text-gray-600 mt-4 space-y-1">
                      <li>• Instant property legal guidance</li>
                      <li>• Case analysis and advice</li>
                      <li>• Document templates</li>
                      <li>• 24/7 availability</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Scale className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Property Lawyers</h4>
                    <p className="text-3xl font-bold text-blue-600 mb-2">$65-$125</p>
                    <p className="text-gray-600">Per 48-hour access period</p>
                    <ul className="text-sm text-gray-600 mt-4 space-y-1">
                      <li>• Unlimited chat messaging</li>
                      <li>• Video consultations included</li>
                      <li>• Document review</li>
                      <li>• Professional legal advice</li>
                    </ul>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <Link href="/auth/register?type=client">
                    <Button size="lg">
                      <Users className="h-4 w-4 mr-2" />
                      Sign Up to Browse Lawyers
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Property Lawyers</h2>
          <p className="text-xl text-gray-600">Preview of our verified property law specialists</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              name: "Sarah Johnson",
              specialization: "Property Disputes",
              experience: "12 years",
              rating: 4.9,
              rate: "$89",
              image: "/placeholder.svg?height=80&width=80",
            },
            {
              name: "Michael Chen",
              specialization: "Real Estate Transactions",
              experience: "10 years",
              rating: 4.8,
              rate: "$95",
              image: "/placeholder.svg?height=80&width=80",
            },
            {
              name: "Emily Davis",
              specialization: "Landlord-Tenant Law",
              experience: "8 years",
              rating: 4.7,
              rate: "$75",
              image: "/placeholder.svg?height=80&width=80",
            },
          ].map((lawyer, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
                <div className="relative z-10">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{lawyer.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{lawyer.specialization}</p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{lawyer.rating}</span>
                      <span>•</span>
                      <span>{lawyer.experience}</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{lawyer.rate}</p>
                    <p className="text-sm text-gray-600">per 48-hour access</p>
                  </CardContent>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold">
                  Sign up to view full profiles
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/auth/register?type=client">
            <Button size="lg" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Create Account to See All Lawyers
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-4 gap-8 text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { number: "50,000+", label: "AI Consultations" },
              { number: "10,000+", label: "Cases Resolved" },
              { number: "500+", label: "Verified Lawyers" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose LegalAdvisor?</h2>
          <p className="text-xl text-gray-600">The complete property legal solution</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Bot,
              title: "Start Free",
              description: "Always begin with our free AI assistant - no commitment required",
            },
            {
              icon: Shield,
              title: "Verified Lawyers",
              description: "All property lawyers are verified and specialize in real estate law",
            },
            {
              icon: CheckCircle,
              title: "Complete Access",
              description: "One payment includes both chat and video - no hidden fees",
            },
            {
              icon: Star,
              title: "Top Rated",
              description: "Choose from highly-rated lawyers with proven track records",
            },
          ].map((benefit, index) => (
            <motion.div key={index} variants={fadeInUp} className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">LegalAdvisor</span>
              </div>
              <p className="text-gray-400">
                Your trusted AI-powered legal platform for property disputes and legal guidance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Free AI Assistant</li>
                <li>Find Lawyers</li>
                <li>Case Management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Lawyers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Join Platform</li>
                <li>Manage Cases</li>
                <li>Client Communication</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LegalAdvisor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
