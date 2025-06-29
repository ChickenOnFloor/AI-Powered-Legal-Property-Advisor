"use client"

import { useUser } from "./user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, Video, MoreVertical } from "lucide-react"

export function ChatHeader() {
  const { selectedFriend, startCall } = useUser()

  if (!selectedFriend) return null

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={selectedFriend.avatar || "/placeholder.svg"} />
            <AvatarFallback>{selectedFriend.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div
            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
              selectedFriend.isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">{selectedFriend.name}</h2>
          <p className="text-sm text-gray-500">
            {selectedFriend.isOnline ? "Online" : `Last seen ${selectedFriend.lastSeen}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Phone className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" className="h-9 w-9 p-0" onClick={startCall}>
          <Video className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
