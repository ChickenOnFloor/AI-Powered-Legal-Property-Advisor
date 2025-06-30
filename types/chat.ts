export interface Message {
  id: string
  content: string
  sender: "user" | "contact"
  timestamp: Date
  status: "sent" | "delivered" | "read"
}

export interface Contact {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  lastSeen?: string
  lastMessage?: string
  unreadCount?: number
}

export interface Conversation {
  [contactId: string]: Message[]
}
