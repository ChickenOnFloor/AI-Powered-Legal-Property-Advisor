"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  lastSeen?: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  type: "text" | "system"
}

interface UserContextType {
  currentUser: User
  users: User[]
  messages: Message[]
  selectedFriend: User | null
  activeCall: User | null
  sendMessage: (content: string) => void
  selectFriend: (user: User) => void
  startCall: () => void
  endCall: () => void
  setCurrentUser: (userId: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const initialUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  {
    id: "3",
    name: "Carol Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastSeen: "2 hours ago",
  },
  {
    id: "4",
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  {
    id: "5",
    name: "Emma Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastSeen: "1 day ago",
  },
]

const initialMessages: Message[] = [
  {
    id: "1",
    senderId: "2",
    senderName: "Bob Smith",
    content: "Hey! How are you doing today?",
    timestamp: new Date(Date.now() - 300000),
    type: "text",
  },
  {
    id: "2",
    senderId: "1",
    senderName: "Alice Johnson",
    content: "I'm doing great! Just finished my morning workout. How about you?",
    timestamp: new Date(Date.now() - 240000),
    type: "text",
  },
  {
    id: "3",
    senderId: "2",
    senderName: "Bob Smith",
    content: "That's awesome! I'm just getting ready for work. Want to catch up later?",
    timestamp: new Date(Date.now() - 180000),
    type: "text",
  },
]

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [currentUser, setCurrentUserState] = useState<User>(initialUsers[0])
  const [selectedFriend, setSelectedFriend] = useState<User | null>(initialUsers[1])
  const [activeCall, setActiveCall] = useState<User | null>(null)

  const sendMessage = (content: string) => {
    if (!selectedFriend) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content,
      timestamp: new Date(),
      type: "text",
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const selectFriend = (user: User) => {
    setSelectedFriend(user)
    setActiveCall(null) // End any active call when switching friends
  }

  const startCall = () => {
    if (selectedFriend) {
      setActiveCall(selectedFriend)
    }
  }

  const endCall = () => {
    setActiveCall(null)
  }

  const setCurrentUser = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (user) {
      setCurrentUserState(user)
    }
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        messages,
        selectedFriend,
        activeCall,
        sendMessage,
        selectFriend,
        startCall,
        endCall,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
