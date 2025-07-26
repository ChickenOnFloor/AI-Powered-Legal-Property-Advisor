"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Loader2,
  User,
  MessageCircle,
  PhoneOff
} from "lucide-react"
import { io } from "socket.io-client"
import { useToast } from "@/components/ui/toast"
import VideoCallButton from "./VideoCallButton"

export default function RealTimeChat({ bookingId, recipientId, recipientName, recipientImage, userType }) {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isTypingRecipient, setIsTypingRecipient] = useState(false)
  const [onlineStatus, setOnlineStatus] = useState("offline")
  const [loading, setLoading] = useState(true)
  const [isInCall, setIsInCall] = useState(false)
  const [incomingCall, setIncomingCall] = useState(null)
  const messagesEndRef = useRef(null)
  const typingTimeoutRef = useRef(null)
  const { addToast } = useToast()

  useEffect(() => {
    // Initialize socket connection
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      addToast("Authentication required", "error")
      return
    }

    const newSocket = io(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", {
      auth: { token }
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
      setLoading(false)
      console.log('Connected to chat server')
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
      console.log('Disconnected from chat server')
    })

    newSocket.on('receive_message', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        senderId: data.senderId,
        message: data.message,
        timestamp: data.timestamp,
        isOwn: false
      }])
    })

    newSocket.on('message_sent', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        senderId: data.recipientId,
        message: data.message,
        timestamp: data.timestamp,
        isOwn: true
      }])
    })

    newSocket.on('user_typing', (data) => {
      if (data.userId === recipientId) {
        setIsTypingRecipient(data.isTyping)
      }
    })

    newSocket.on('user_status_change', (data) => {
      if (data.userId === recipientId) {
        setOnlineStatus(data.status)
      }
    })

    // Handle incoming video calls
    newSocket.on('incoming_call', (data) => {
      if (data.callerId === recipientId) {
        setIncomingCall(data)
        addToast(`Incoming video call from ${recipientName}`, "info")
      }
    })

    // Handle call ended
    newSocket.on('call_ended', (data) => {
      setIsInCall(false)
      addToast("Video call ended", "info")
    })

    newSocket.on('error', (error) => {
      addToast(error.message || "Connection error", "error")
    })

    setSocket(newSocket)

    // Load existing messages
    loadMessages()

    return () => {
      newSocket.close()
    }
  }, [recipientId, addToast])

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/lawyerchat/messages?bookingId=${bookingId}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleTyping = () => {
    if (!socket) return

    setIsTyping(true)
    socket.emit('typing_start', { recipientId })

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      socket.emit('typing_stop', { recipientId })
    }, 1000)
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return

    socket.emit('send_message', {
      recipientId,
      message: newMessage.trim(),
      bookingId
    })

    setNewMessage("")
    setIsTyping(false)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    socket.emit('typing_stop', { recipientId })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const handleVideoCallStart = () => {
    setIsInCall(true)
  }

  const handleVideoCallEnd = () => {
    setIsInCall(false)
  }

  const handleAcceptIncomingCall = () => {
    setIncomingCall(null)
    setIsInCall(true)
  }

  const handleRejectIncomingCall = () => {
    setIncomingCall(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <>
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={recipientImage || "/placeholder.svg"} />
                <AvatarFallback>
                  {recipientName?.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{recipientName}</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    onlineStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <span className="text-sm text-gray-500">
                    {onlineStatus === 'online' ? 'Online' : 'Offline'}
                  </span>
                  {isTypingRecipient && (
                    <span className="text-sm text-blue-500">typing...</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <VideoCallButton
                bookingId={bookingId}
                recipientId={recipientId}
                recipientName={recipientName}
                recipientImage={recipientImage}
                userType={userType}
                disabled={!isConnected || onlineStatus !== 'online'}
                onCallStart={handleVideoCallStart}
                onCallEnd={handleVideoCallEnd}
              />
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 pb-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.isOwn 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    } rounded-lg px-4 py-2`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value)
                    handleTyping()
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="pr-10"
                  disabled={!isConnected}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || !isConnected}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {!isConnected && (
              <div className="mt-2 text-center">
                <Badge variant="destructive" className="text-xs">
                  Disconnected - Reconnecting...
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Incoming Call Notification */}
      {incomingCall && (
        <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-4 max-w-sm">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                Incoming Video Call
              </p>
              <p className="text-sm text-gray-500 truncate">
                {recipientName}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleAcceptIncomingCall}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleRejectIncomingCall}
                size="sm"
                variant="destructive"
              >
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 