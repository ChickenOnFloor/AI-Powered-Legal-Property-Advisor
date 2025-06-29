"use client"

import { useUser } from "./user-context"
import { FriendsList } from "./friends-list"
import { ChatArea } from "./chat-area"
import { VideoCall } from "./video-call"

export function ChatApp() {
  const { activeCall } = useUser()

  return (
    <div className="h-screen flex">
      {/* Friends List - Left Side */}
      <div className="w-80 bg-white border-r border-gray-200">
        <FriendsList />
      </div>

      {/* Chat Area - Right Side */}
      <div className="flex-1 flex flex-col">{activeCall ? <VideoCall /> : <ChatArea />}</div>
    </div>
  )
}
