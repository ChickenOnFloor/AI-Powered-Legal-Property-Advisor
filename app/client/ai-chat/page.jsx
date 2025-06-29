"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, ArrowLeft, Scale, AlertTriangle, CheckCircle, Sparkles, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useChat } from "ai/react"

export default function AIChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

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
            <Bot className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">Free AI Property Legal Assistant</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Groq
            </Badge>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Scale className="h-8 w-8" />
                <div>
                  <h1 className="text-2xl font-bold">Free AI Property Legal Assistant</h1>
                  <p className="text-green-100">
                    Get instant property legal guidance powered by advanced AI - completely free!
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Case Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Risk Assessment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Scale className="h-4 w-4" />
                  <span>Legal Solutions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-green-600" />
              <span>Legal Consultation Chat</span>
              <Badge className="bg-green-100 text-green-800">FREE</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-lg p-4 bg-gray-100">
                      <div className="text-sm">
                        Hello! I'm your AI Property Legal Assistant powered by Groq. I specialize in property law and
                        can help you understand your property-related legal situation, potential consequences, and
                        suggest solutions. Please describe your property legal issue in detail.
                        <br />
                        <br />
                        <strong>I can help with:</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Property disputes and boundary issues</li>
                          <li>Real estate transactions and contracts</li>
                          <li>Landlord-tenant rights and disputes</li>
                          <li>Property ownership and title issues</li>
                          <li>Zoning and land use problems</li>
                        </ul>
                      </div>
                      <div className="text-xs mt-2 text-gray-500">{new Date().toLocaleTimeString()}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${message.role === "user" ? "bg-blue-600" : "bg-green-600"}`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Bot className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`rounded-lg p-4 ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="whitespace-pre-wrap text-sm"
                      >
                        {message.content}
                      </motion.div>
                      <div className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {new Date().toLocaleTimeString()}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Bot className="h-4 w-4 text-white" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="bg-gray-100 rounded-lg p-4"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                        />
                      </div>
                      <motion.p
                        className="text-xs text-gray-500 mt-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        AI is analyzing your property legal issue...
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Describe your legal issue in detail..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Important Disclaimer</p>
                  <p>
                    This AI assistant provides general legal information only and does not constitute legal advice. For
                    specific legal matters, please consult with a qualified attorney. The AI's responses are based on
                    general legal principles and may not apply to your specific situation or jurisdiction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-6">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Need Professional Property Legal Help?</h3>
              <p className="mb-4">
                Book a session with verified property lawyers. Pay per consultation - no subscriptions needed.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/client/lawyers">
                  <Button variant="secondary">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Find Lawyers
                  </Button>
                </Link>
                <Link href="/client/lawyers">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                    Book Session
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
