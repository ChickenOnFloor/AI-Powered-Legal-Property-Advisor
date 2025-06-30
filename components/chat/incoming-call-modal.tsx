"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Video, PhoneOff } from "lucide-react"
import type { Contact } from "@/types/chat"

interface IncomingCallModalProps {
  contact: Contact
  callType: "video" | "audio"
  onAccept: (asVideo?: boolean) => void
  onDecline: () => void
}

export default function IncomingCallModal({ contact, callType, onAccept, onDecline }: IncomingCallModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-80 mx-4">
        <CardHeader className="text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src={contact.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {contact.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{contact.name}</CardTitle>
          <p className="text-sm text-gray-500">Incoming {callType} call...</p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4 mb-4">
            <Button onClick={onDecline} variant="destructive" size="lg" className="rounded-full w-16 h-16">
              <PhoneOff className="h-6 w-6" />
            </Button>
            <Button
              onClick={() => onAccept(false)}
              variant="default"
              size="lg"
              className="rounded-full w-16 h-16 bg-green-500 hover:bg-green-600"
            >
              <Phone className="h-6 w-6" />
            </Button>
            {callType === "video" && (
              <Button
                onClick={() => onAccept(true)}
                variant="default"
                size="lg"
                className="rounded-full w-16 h-16 bg-blue-500 hover:bg-blue-600"
              >
                <Video className="h-6 w-6" />
              </Button>
            )}
          </div>
          <div className="text-center text-xs text-gray-500">
            {callType === "video" ? "Accept as audio or video" : "Accept call"}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
