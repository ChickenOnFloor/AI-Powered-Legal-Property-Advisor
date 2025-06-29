"use client"

import type React from "react"
import { useState } from "react"
import { useUser } from "./user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Smile } from "lucide-react"

export function MessageInput() {
  const [message, setMessage] = useState("")
  const { sendMessage } = useUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      sendMessage(message.trim())
      setMessage("")
    }
  }

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Paperclip className="h-4 w-4" />
        </Button>

        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="pr-10 rounded-full"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <Button type="submit" size="sm" disabled={!message.trim()} className="h-9 w-9 p-0 rounded-full">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
