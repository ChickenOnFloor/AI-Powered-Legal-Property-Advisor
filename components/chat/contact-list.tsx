"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft } from "lucide-react"
import type { Contact } from "@/types/chat"

interface ContactListProps {
  contacts: Contact[]
  selectedContactId: string
  searchQuery: string
  onContactSelect: (contactId: string) => void
  onClose?: () => void
  onSearchChange: (query: string) => void
  isMobile: boolean
}

export default function ContactList({
  contacts,
  selectedContactId,
  searchQuery,
  onContactSelect,
  onClose,
  onSearchChange,
  isMobile,
}: ContactListProps) {
  const handleContactClick = (contactId: string) => {
    onContactSelect(contactId)
    if (isMobile && onClose) {
      onClose()
    }
  }

  const content = (
    <>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">{isMobile ? "Contacts" : "My Chats"}</h2>
          {isMobile && onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
        </div>
        {!isMobile && (
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">My Chats</h2>
            </div>
          </div>
        )}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleContactClick(contact.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selectedContactId === contact.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
              }`}
            >
              <div className="relative">
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
                      className="bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center"
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
    </>
  )

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
        <div className="bg-white w-80 h-full max-w-[85vw] overflow-hidden flex flex-col">{content}</div>
      </div>
    )
  }

  return <div className="flex flex-col h-full">{content}</div>
}
