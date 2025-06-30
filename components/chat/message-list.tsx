"use client"

import { useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import type { Message } from "@/types/chat"

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.sender === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-900"
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <div
              className={`flex items-center justify-between mt-1 ${
                message.sender === "user" ? "text-blue-100" : "text-gray-500"
              }`}
            >
              <span className="text-xs">{formatTime(message.timestamp)}</span>
              {message.sender === "user" && (
                <Badge variant={message.status === "read" ? "default" : "secondary"} className="text-xs ml-2">
                  {message.status}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
