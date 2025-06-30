"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Smile } from "lucide-react"

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  contactName: string
}

export default function MessageInput({ value, onChange, onSubmit, contactName }: MessageInputProps) {
  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <form onSubmit={onSubmit} className="flex items-center space-x-2">
        <Button type="button" variant="ghost" size="sm">
          <Paperclip className="h-5 w-5" />
        </Button>
        <div className="flex-1 relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Message ${contactName}...`}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>
        <Button type="submit" disabled={!value.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
