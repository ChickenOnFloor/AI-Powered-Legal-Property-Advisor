"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Video,
  Send,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Maximize2,
  Minimize2,
  MoreVertical,
  Search,
  Paperclip,
  Smile,
  ChevronLeft,
  Users,
} from "lucide-react"

export default function ChatPage() {
  const [contacts, setContacts] = useState([])
  const [conversations, setConversations] = useState({})
  const [bookingMap, setBookingMap] = useState({})

  const [selectedContactId, setSelectedContactId] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const [isCallActive, setIsCallActive] = useState(false)
  const [isIncomingCall, setIsIncomingCall] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isCallMinimized, setIsCallMinimized] = useState(false)
  const [incomingCallType, setIncomingCallType] = useState("video")
  const [incomingCallContactId, setIncomingCallContactId] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showContactList, setShowContactList] = useState(false)

  const messagesEndRef = useRef(null)

  const selectedContact = contacts.find((c) => c.id === selectedContactId) || {}
  const currentMessages = conversations[selectedContactId] || []
  const incomingCallContact = contacts.find((c) => c.id === incomingCallContactId)

  const filteredContacts = contacts.filter(
  (contact) =>
    contact.name &&
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
)


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentMessages])


  useEffect(() => {
  const fetchChatData = async () => {
  try {
    const res = await fetch("/api/booking/active")
    const { bookedLawyerIds, bookings } = await res.json()
    console.log(bookedLawyerIds)
    if (!bookedLawyerIds || !Array.isArray(bookedLawyerIds)) {
      console.warn("❌ No booked lawyer IDs found.")
      return
    }

    if (!bookings || !Array.isArray(bookings)) {
      console.warn("❌ No bookings array found.")
      return
    }

    const lawyerRes = await fetch("/api/lawyers/by-ids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: bookedLawyerIds }),
    })
    const { lawyers } = await lawyerRes.json()

    if (!lawyers || lawyers.length === 0) {
      console.warn("❌ No lawyer data returned.")
      return
    }

    const lawyerList = lawyers.map((l) => ({
      id: l._id,
      name: l.firstName + " " + l.lastName,
      avatar: l.avatar || "/placeholder.svg",
      status: l.status || "offline",
      userType: l.userType,
      lastMessage: "",
      unreadCount: 0,
    }))

    setContacts(lawyerList)
    setSelectedContactId(lawyerList[0]?.id)

    const convoMap = {}
    const bookingIdMap = {}

    for (const lawyer of lawyers) {
      const booking = bookings.find((b) => b.lawyerId === lawyer._id)
      if (booking) {
        bookingIdMap[lawyer._id] = booking._id

        const msgRes = await fetch("/api/lawyerchat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId: booking._id }),
        })

        const msgData = await msgRes.json()
        convoMap[lawyer._id] = msgData.messages || []
      }
    }

    setConversations(convoMap)
    setBookingMap(bookingIdMap)
  } catch (err) {
    console.error("❌ Failed to fetch chat data:", err)
  }
}



  fetchChatData()
}, [])




  const getBookingIdFor = (lawyerId) => bookingMap[lawyerId]

  const handleContactSelect = async (contactId) => {
    setSelectedContactId(contactId)
    if (!conversations[contactId]) {
      const bookingId = getBookingIdFor(contactId)
      const res = await fetch("/api/lawyerchat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      })
      const data = await res.json()
      setConversations((prev) => ({ ...prev, [contactId]: data.messages || [] }))
    }
  }
  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    if (!selectedContactId) {
      alert("No contact selected.")
      return
    }

    const bookingId = getBookingIdFor(selectedContactId)

    if (!bookingId) {
      alert("No valid booking ID.")
      return
    }

    const messagePayload = {
      content: newMessage.trim(),
      bookingId,
    }

    const res = await fetch("/api/lawyerchat/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messagePayload),
    })

    const data = await res.json()

    if (data.success) {
      setConversations((prev) => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), data.message],
      }))
      setNewMessage("")
    } else {
      console.error("❌ Message send failed:", data.error)
    }
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

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Full working JSX and UI should be included here
  return (
    <div className="min-h-screen">
      <div className="flex h-screen bg-gray-50 w-full">
        {showContactList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
            <div className="bg-white w-80 h-full max-w-[85vw] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Contacts</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowContactList(false)}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-2 space-y-1">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => {
                        handleContactSelect(contact.id)
                        setShowContactList(false)
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedContactId === contact.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            contact.status === "online"
                              ? "bg-green-500"
                              : contact.status === "away"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                          {contact.unreadCount && contact.unreadCount > 0 && (
                            <Badge
                              variant="default"
                              className="bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center flex-shrink-0"
                            >
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {contact.lastMessage ||
                            (contact.status === "offline" && contact.lastSeen
                              ? `Last seen ${contact.lastSeen}`
                              : contact.status)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-80 bg-white border-r border-gray-200 flex-col min-h-0">
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">My Chats</h2>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-2 space-y-1">
      
              {filteredContacts.map((contact) => (
                
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedContactId === contact.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        contact.status === "online"
                          ? "bg-green-500"
                          : contact.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                      {contact.unreadCount && contact.unreadCount > 0 && (
                        <Badge
                          variant="default"
                          className="bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center flex-shrink-0"
                        >
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {contact.lastMessage ||
                        (contact.status === "offline" && contact.lastSeen
                          ? `Last seen ${contact.lastSeen}`
                          : contact.status)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden flex-shrink-0"
                  onClick={() => setShowContactList(true)}
                >
                  <Users className="h-5 w-5" />
                </Button>

                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedContact?.name
  ? selectedContact.name
      .split(" ")
      .map((n) => n[0])
      .join("")
  : "?"}

                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{selectedContact.name}</h3>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        selectedContact.status === "online"
                          ? "bg-green-500"
                          : selectedContact.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                      }`}
                    />
                    <p className="text-sm text-gray-500 capitalize truncate">
                      {selectedContact.status === "offline" && selectedContact.lastSeen
                        ? `Last seen ${selectedContact.lastSeen}`
                        : selectedContact.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button variant="ghost" size="sm" onClick={handleVoiceCall}>
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleVideoCall}>
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {currentMessages.map((message, index) => {
  if (!message || !message.senderId) return null;
              //console.log(message)
  return (
    <div key={message._id || index} className={`flex ${message.senderType === "client" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          message.senderId === "user"
            ? "bg-blue-500 text-white"
            : "bg-white border border-gray-200 text-gray-900"
        }`}
      >
        <p className="text-sm break-words">{message.content}</p>
        <div
          className={`flex items-center justify-between mt-1 ${
            message.senderId === "user" ? "text-blue-100" : "text-gray-500"
          }`}
        >
          <span className="text-xs">{formatTime(message.timestamp)}</span>
          {message.senderId === "user" && (
            <Badge variant={message.status === "read" ? "default" : "secondary"} className="text-xs ml-2">
              {message.status}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
})}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Button type="button" variant="ghost" size="sm" className="flex-shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative min-w-0">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Message ${selectedContact.name}...`}
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
              <Button type="submit" disabled={!newMessage.trim()} className="flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Incoming Call Modal */}
        {isIncomingCall && incomingCallContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm mx-auto">
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={incomingCallContact.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {incomingCallContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="truncate">{incomingCallContact.name}</CardTitle>
                <p className="text-sm text-gray-500">Incoming {incomingCallType} call...</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    onClick={handleDeclineCall}
                    variant="destructive"
                    size="lg"
                    className="rounded-full w-16 h-16"
                  >
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                  <Button
                    onClick={() => handleAcceptCall(false)}
                    variant="default"
                    size="lg"
                    className="rounded-full w-16 h-16 bg-green-500 hover:bg-green-600"
                  >
                    <Phone className="h-6 w-6" />
                  </Button>
                  {incomingCallType === "video" && (
                    <Button
                      onClick={() => handleAcceptCall(true)}
                      variant="default"
                      size="lg"
                      className="rounded-full w-16 h-16 bg-blue-500 hover:bg-blue-600"
                    >
                      <Video className="h-6 w-6" />
                    </Button>
                  )}
                </div>
                <div className="text-center text-xs text-gray-500">
                  {incomingCallType === "video" ? "Accept as audio or video" : "Accept call"}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Call Modal */}
        {isCallActive && (
          <div
            className={`fixed ${
              isCallMinimized ? "bottom-4 right-4 w-80 h-60" : "inset-0"
            } bg-black z-50 ${isCallMinimized ? "rounded-lg overflow-hidden" : ""}`}
          >
            <div className="relative w-full h-full">
              {/* Video/Audio Display */}
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                {isVideoEnabled ? (
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-4xl">
                      {selectedContact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-40 w-40">
                      <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-5xl">
                        {selectedContact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-2 text-white">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-lg">Audio Call</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Local Video (Picture in Picture) - Only show in video mode */}
              {!isCallMinimized && isVideoEnabled && (
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                    <div className="text-white text-xs">You</div>
                  </div>
                </div>
              )}

              {/* Call Info */}
              {!isCallMinimized && (
                <div className="absolute top-4 left-4 text-white">
                  <h3 className="font-semibold truncate max-w-[200px]">{selectedContact.name}</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm opacity-75">00:45</p>
                    <Badge variant="secondary" className="text-xs">
                      {isVideoEnabled ? "Video" : "Audio"}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Call Type Indicator for minimized view */}
              {isCallMinimized && (
                <div className="absolute top-2 left-2 text-white">
                  <Badge variant="secondary" className="text-xs">
                    {isVideoEnabled ? "Video" : "Audio"}
                  </Badge>
                </div>
              )}

              {/* Controls */}
              <div
                className={`absolute ${
                  isCallMinimized
                    ? "bottom-2 left-1/2 transform -translate-x-1/2"
                    : "bottom-8 left-1/2 transform -translate-x-1/2"
                } flex items-center space-x-3`}
              >
                <Button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  variant={isAudioMuted ? "destructive" : "secondary"}
                  size={isCallMinimized ? "sm" : "lg"}
                  className={`rounded-full ${isCallMinimized ? "w-8 h-8" : "w-12 h-12"}`}
                >
                  {isAudioMuted ? (
                    <MicOff className={`${isCallMinimized ? "h-3 w-3" : "h-5 w-5"}`} />
                  ) : (
                    <Mic className={`${isCallMinimized ? "h-3 w-3" : "h-5 w-5"}`} />
                  )}
                </Button>

                <Button
                  onClick={toggleVideo}
                  variant={isVideoEnabled ? "default" : "secondary"}
                  size={isCallMinimized ? "sm" : "lg"}
                  className={`rounded-full ${isCallMinimized ? "w-8 h-8" : "w-12 h-12"} ${
                    isVideoEnabled ? "bg-blue-500 hover:bg-blue-600" : ""
                  }`}
                >
                  {isVideoEnabled ? (
                    <Video className={`${isCallMinimized ? "h-3 w-3" : "h-5 w-5"}`} />
                  ) : (
                    <VideoOff className={`${isCallMinimized ? "h-3 w-3" : "h-5 w-5"}`} />
                  )}
                </Button>

                <Button
                  onClick={handleEndCall}
                  variant="destructive"
                  size={isCallMinimized ? "sm" : "lg"}
                  className={`rounded-full ${isCallMinimized ? "w-8 h-8" : "w-12 h-12"}`}
                >
                  <PhoneOff className={`${isCallMinimized ? "h-3 w-3" : "h-5 w-5"}`} />
                </Button>

                {!isCallMinimized && (
                  <Button
                    onClick={() => setIsCallMinimized(true)}
                    variant="secondary"
                    size="lg"
                    className="rounded-full w-12 h-12"
                  >
                    <Minimize2 className="h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Maximize button for minimized view */}
              {isCallMinimized && (
                <Button
                  onClick={() => setIsCallMinimized(false)}
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2 rounded-full w-6 h-6"
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
