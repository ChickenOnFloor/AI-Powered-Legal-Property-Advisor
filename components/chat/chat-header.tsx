"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Video, MoreVertical, Users } from "lucide-react"
import type { Contact } from "@/types/chat"

interface ChatHeaderProps {
  contact: Contact
  onShowContactList: () => void
  onVoiceCall: () => void
  onVideoCall: () => void
}

export default function ChatHeader({ contact, onShowContactList, onVoiceCall, onVideoCall }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="md:hidden" onClick={onShowContactList}>
            <Users className="h-5 w-5" />
          </Button>

          <Avatar className="h-10 w-10">
            <AvatarImage src={contact.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {contact.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  contact.status === "online"
                    ? "bg-green-500"
                    : contact.status === "away"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                }`}
              />
              <p className="text-sm text-gray-500 capitalize">
                {contact.status === "offline" && contact.lastSeen ? `Last seen ${contact.lastSeen}` : contact.status}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onVoiceCall}>
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onVideoCall}>
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
