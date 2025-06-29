"use client"

import { useEffect, useRef } from "react"
import { useUser } from "./user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

export function MessageList() {
  const { messages, currentUser, selectedFriend } = useUser()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Filter messages for current conversation
  const conversationMessages = messages.filter(
    (message) => (message.senderId === currentUser.id && selectedFriend) || message.senderId === selectedFriend?.id,
  )

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {conversationMessages.map((message) => {
        const isCurrentUser = message.senderId === currentUser.id
        const sender = isCurrentUser ? currentUser : selectedFriend

        return (
          <div key={message.id} className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={sender?.avatar || "/placeholder.svg"} />
              <AvatarFallback>{sender?.name.charAt(0) || "?"}</AvatarFallback>
            </Avatar>

            <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-600">{message.senderName}</span>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                </span>
              </div>

              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  isCurrentUser ? "bg-blue-500 text-white rounded-br-md" : "bg-gray-100 text-gray-900 rounded-bl-md"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
