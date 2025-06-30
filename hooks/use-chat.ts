"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Message, Contact, Conversation } from "@/types/chat"

const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "That sounds exciting! I'd love to hear more about it.",
    unreadCount: 0,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastMessage: "Let's catch up tomorrow!",
    unreadCount: 2,
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Thanks for the help earlier 😊",
    unreadCount: 1,
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "2 hours ago",
    lastMessage: "See you at the meeting",
    unreadCount: 0,
  },
  {
    id: "5",
    name: "Lisa Park",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Perfect! I'll send the files over",
    unreadCount: 3,
  },
]

const initialConversations: Conversation = {
  "1": [
    {
      id: "1",
      content: "Hey! How are you doing?",
      sender: "contact",
      timestamp: new Date(Date.now() - 3600000),
      status: "read",
    },
    {
      id: "2",
      content: "I'm doing great! Just working on some new projects. How about you?",
      sender: "user",
      timestamp: new Date(Date.now() - 3500000),
      status: "read",
    },
    {
      id: "3",
      content: "That sounds exciting! I'd love to hear more about it.",
      sender: "contact",
      timestamp: new Date(Date.now() - 3400000),
      status: "read",
    },
  ],
  "2": [
    {
      id: "4",
      content: "Are we still on for the project review?",
      sender: "contact",
      timestamp: new Date(Date.now() - 7200000),
      status: "read",
    },
    {
      id: "5",
      content: "Yes, absolutely! I'll have everything ready by then.",
      sender: "user",
      timestamp: new Date(Date.now() - 7100000),
      status: "read",
    },
    {
      id: "6",
      content: "Let's catch up tomorrow!",
      sender: "contact",
      timestamp: new Date(Date.now() - 1800000),
      status: "delivered",
    },
  ],
  "3": [
    {
      id: "7",
      content: "Could you help me with the presentation slides?",
      sender: "contact",
      timestamp: new Date(Date.now() - 5400000),
      status: "read",
    },
    {
      id: "8",
      content: "Of course! I'll send you some templates.",
      sender: "user",
      timestamp: new Date(Date.now() - 5300000),
      status: "read",
    },
    {
      id: "9",
      content: "Thanks for the help earlier 😊",
      sender: "contact",
      timestamp: new Date(Date.now() - 900000),
      status: "delivered",
    },
  ],
  "4": [
    {
      id: "10",
      content: "Don't forget about tomorrow's meeting at 10 AM",
      sender: "contact",
      timestamp: new Date(Date.now() - 10800000),
      status: "read",
    },
    {
      id: "11",
      content: "Got it! I'll be there.",
      sender: "user",
      timestamp: new Date(Date.now() - 10700000),
      status: "read",
    },
    {
      id: "12",
      content: "See you at the meeting",
      sender: "contact",
      timestamp: new Date(Date.now() - 7200000),
      status: "read",
    },
  ],
  "5": [
    {
      id: "13",
      content: "Can you send me the latest design files?",
      sender: "contact",
      timestamp: new Date(Date.now() - 3600000),
      status: "read",
    },
    {
      id: "14",
      content: "Let me gather them for you.",
      sender: "user",
      timestamp: new Date(Date.now() - 3500000),
      status: "read",
    },
    {
      id: "15",
      content: "Perfect! I'll send the files over",
      sender: "contact",
      timestamp: new Date(Date.now() - 600000),
      status: "delivered",
    },
  ],
}

export function useChat() {
  const [contacts] = useState<Contact[]>(initialContacts)
  const [conversations, setConversations] = useState<Conversation>(initialConversations)
  const [selectedContactId, setSelectedContactId] = useState<string>("1")
  const [newMessage, setNewMessage] = useState("")
  const [isCallActive, setIsCallActive] = useState(false)
  const [isIncomingCall, setIsIncomingCall] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isCallMinimized, setIsCallMinimized] = useState(false)
  const [incomingCallType, setIncomingCallType] = useState<"video" | "audio">("video")
  const [incomingCallContactId, setIncomingCallContactId] = useState<string>("2")
  const [searchQuery, setSearchQuery] = useState("")
  const [showContactList, setShowContactList] = useState(false)

  const selectedContact = contacts.find((c) => c.id === selectedContactId) || contacts[0]
  const currentMessages = conversations[selectedContactId] || []
  const incomingCallContact = contacts.find((c) => c.id === incomingCallContactId)
  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Simulate incoming call
  useEffect(() => {
    const timer = setTimeout(() => {
      const callTypes: ("video" | "audio")[] = ["video", "audio"]
      const randomType = callTypes[Math.floor(Math.random() * callTypes.length)]
      const availableContacts = contacts.filter((c) => c.id !== selectedContactId)
      const randomContact = availableContacts[Math.floor(Math.random() * availableContacts.length)]

      setIncomingCallType(randomType)
      setIncomingCallContactId(randomContact.id)
      setIsIncomingCall(true)
    }, 15000)

    return () => clearTimeout(timer)
  }, [selectedContactId, contacts])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    }

    setConversations((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), message],
    }))
    setNewMessage("")

    // Simulate contact response
    setTimeout(() => {
      const responses = [
        "Thanks for your message! I'll get back to you soon.",
        "That's interesting! Tell me more.",
        "I agree with you on that.",
        "Let me think about it and get back to you.",
        "Sounds good to me!",
        "I'll check on that for you.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "contact",
        timestamp: new Date(),
        status: "delivered",
      }

      setConversations((prev) => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), response],
      }))
    }, 2000)
  }

  const handleVoiceCall = () => {
    setIsVideoEnabled(false)
    setIsCallActive(true)
    setIsIncomingCall(false)
  }

  const handleVideoCall = () => {
    setIsVideoEnabled(true)
    setIsCallActive(true)
    setIsIncomingCall(false)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    setIsIncomingCall(false)
    setIsVideoEnabled(false)
    setIsAudioMuted(false)
    setIsCallMinimized(false)
  }

  const handleAcceptCall = (asVideo = false) => {
    setIsIncomingCall(false)
    setIsCallActive(true)
    setIsVideoEnabled(asVideo)
    setSelectedContactId(incomingCallContactId)
  }

  const handleDeclineCall = () => {
    setIsIncomingCall(false)
  }

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled)
  }

  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId)
  }

  return {
    contacts,
    conversations,
    selectedContactId,
    newMessage,
    isCallActive,
    isIncomingCall,
    isVideoEnabled,
    isAudioMuted,
    isCallMinimized,
    incomingCallType,
    incomingCallContactId,
    searchQuery,
    showContactList,
    selectedContact,
    currentMessages,
    incomingCallContact,
    filteredContacts,
    setNewMessage,
    setShowContactList,
    setSearchQuery,
    handleSendMessage,
    handleVoiceCall,
    handleVideoCall,
    handleEndCall,
    handleAcceptCall,
    handleDeclineCall,
    toggleVideo,
    handleContactSelect,
    setIsAudioMuted,
    setIsCallMinimized,
  }
}
