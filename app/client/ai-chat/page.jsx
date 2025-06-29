"use client"

import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  User,
  Send,
  ArrowLeft,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function AIChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef(null)

  const getCurrentTime = () =>
    typeof window !== "undefined" ? new Date().toLocaleTimeString() : ""

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: getCurrentTime(),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await res.json()

      const assistantReply = {
        ...data,
        timestamp: getCurrentTime(),
      }

      setMessages((prev) => [...prev, assistantReply])
    } catch (error) {
      console.error("Fetch error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "❌ Error occurred. Please try again later.",
          timestamp: getCurrentTime(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* NAV */}
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

      {/* MAIN CONTAINER */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-green-600" />
              <span>Legal Consultation Chat</span>
              <Badge className="bg-green-100 text-green-800">FREE</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
              {messages.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-lg p-4 bg-gray-100 text-sm">
                      <p>
                        Hello! I'm your AI Property Legal Assistant powered by Groq.
                        <br /><br />
                        <strong>I can help with:</strong>
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Property disputes and boundary issues</li>
                        <li>Real estate transactions and contracts</li>
                        <li>Landlord-tenant rights and disputes</li>
                        <li>Property ownership and title issues</li>
                        <li>Land grabbing and forced occupation</li>
                      </ul>
                      <div className="text-xs mt-2 text-gray-500">{getCurrentTime()}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Chat messages */}
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === "user" ? "bg-blue-600" : "bg-green-600"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-4 ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
                      }`}
                    >
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                      <div
                        className={`text-xs mt-2 ${
                          message.role === "user" ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        <Bot className="h-4 w-4 text-white" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="bg-gray-100 rounded-lg p-4"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="flex space-x-1">
                        <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity }} />
                        <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, delay: 0.2 }} />
                        <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, delay: 0.4 }} />
                      </div>
                      <motion.p className="text-xs text-gray-500 mt-2">AI is thinking...</motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
      </div>
    </div>
  )
}
