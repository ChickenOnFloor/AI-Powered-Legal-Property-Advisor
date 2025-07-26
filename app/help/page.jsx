"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  ArrowLeft,
  Search,
  BookOpen,
  Shield,
  CreditCard,
  Users,
  FileText,
  Bot,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/toast"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const { addToast } = useToast()

  const faqs = {
    general: [
      {
        question: "How does the AI Property Assistant work?",
        answer: "Our AI assistant uses advanced language models to provide instant legal guidance on property-related matters. Simply ask your question in natural language, and receive comprehensive, accurate responses based on legal principles and best practices."
      },
      {
        question: "Is the AI advice legally binding?",
        answer: "No, AI-generated advice is for informational purposes only and should not be considered as legal counsel. For specific legal matters, we recommend consulting with a qualified lawyer through our platform."
      },
      {
        question: "How do I book a session with a lawyer?",
        answer: "Browse our verified lawyers, select one that matches your needs, and click 'Book Access'. You'll get 48-hour access to chat and video consultations with your chosen lawyer."
      },
      {
        question: "What types of property law do you cover?",
        answer: "We cover all major areas of property law including real estate transactions, property disputes, landlord-tenant issues, property development, and regulatory compliance."
      }
    ],
    technical: [
      {
        question: "How do I upload documents?",
        answer: "Go to the Documents section, click 'Upload Document', and select your file. We support PDF, DOC, DOCX, JPG, PNG, and TXT files up to 10MB."
      },
      {
        question: "Can I share documents with my lawyer?",
        answer: "Yes, you can share documents with lawyers through our secure document management system. Upload documents and use the share feature to grant access to specific lawyers."
      },
      {
        question: "How do I change my password?",
        answer: "Go to Settings > Change Password, enter your current password and new password, then click 'Change Password' to update your credentials."
      },
      {
        question: "How do I manage my notifications?",
        answer: "Visit Settings > Notifications to customize which notifications you receive via email and push notifications."
      }
    ],
    billing: [
      {
        question: "How much does it cost to book a lawyer?",
        answer: "Lawyer session rates vary by individual lawyer and are displayed on their profiles. Most sessions cost between $50-$200 depending on the lawyer's experience and specialization."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, debit cards, and digital wallets. All payments are processed securely through our payment partners."
      },
      {
        question: "Can I get a refund if I'm not satisfied?",
        answer: "We offer a satisfaction guarantee. If you're not satisfied with your session, contact our support team within 24 hours for a full refund."
      },
      {
        question: "Do you offer subscription plans?",
        answer: "Currently, we operate on a pay-per-session model. We're working on subscription plans for regular users and will announce them soon."
      }
    ]
  }

  const helpCategories = [
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Learn how to use our AI property legal assistant",
      color: "bg-blue-500",
      href: "#ai-assistant"
    },
    {
      icon: Users,
      title: "Lawyer Booking",
      description: "How to find and book sessions with lawyers",
      color: "bg-green-500",
      href: "#lawyer-booking"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Upload, organize, and share legal documents",
      color: "bg-purple-500",
      href: "#documents"
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      description: "Payment methods and billing information",
      color: "bg-orange-500",
      href: "#billing"
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "How we protect your data and privacy",
      color: "bg-red-500",
      href: "#security"
    },
    {
      icon: MessageCircle,
      title: "Communication",
      description: "Chat and messaging with lawyers",
      color: "bg-indigo-500",
      href: "#communication"
    }
  ]

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      addToast("Please fill in all fields", "error")
      return
    }

    setSubmitting(true)
    try {
      // In a real app, you'd send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      addToast("Message sent successfully! We'll get back to you within 24 hours.", "success")
      setContactForm({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      addToast("Failed to send message. Please try again.", "error")
    } finally {
      setSubmitting(false)
    }
  }

  const filteredFAQs = Object.entries(faqs).reduce((acc, [category, questions]) => {
    const filtered = questions.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (filtered.length > 0) {
      acc[category] = filtered
    }
    return acc
  }, {})

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
            <HelpCircle className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Help & Support</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">How can we help you?</h1>
            <p className="text-gray-600 mb-6">Find answers to common questions or get in touch with our support team</p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {helpCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent>
                  {Object.keys(filteredFAQs).length === 0 ? (
                    <div className="text-center py-8">
                      <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No questions found matching your search.</p>
                    </div>
                  ) : (
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="technical">Technical</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                      </TabsList>
                      
                      {Object.entries(filteredFAQs).map(([category, questions]) => (
                        <TabsContent key={category} value={category} className="mt-6">
                          <Accordion type="single" collapsible className="w-full">
                            {questions.map((faq, index) => (
                              <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                  {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                  {faq.answer}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </TabsContent>
                      ))}
                    </Tabs>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get in touch with our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="What can we help with?"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Describe your issue or question..."
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-3">Other ways to reach us:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>support@legaladvisor.com</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MessageCircle className="h-4 w-4 text-gray-500" />
                        <span>Live chat available 24/7</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link href="/client/ai-chat" className="block text-blue-600 hover:text-blue-700 text-sm">
                      → Try AI Assistant
                    </Link>
                    <Link href="/client/lawyers" className="block text-blue-600 hover:text-blue-700 text-sm">
                      → Browse Lawyers
                    </Link>
                    <Link href="/documents" className="block text-blue-600 hover:text-blue-700 text-sm">
                      → Document Management
                    </Link>
                    <Link href="/settings" className="block text-blue-600 hover:text-blue-700 text-sm">
                      → Account Settings
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 