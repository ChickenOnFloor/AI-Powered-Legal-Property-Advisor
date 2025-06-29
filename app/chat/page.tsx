"use client"
import { ChatApp } from "@/components/chat-app"
import { UserProvider } from "@/components/user-context"

export default function Home() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100">
        <ChatApp />
      </div>
    </UserProvider>
  )
}
