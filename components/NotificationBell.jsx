"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/toast"

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications?limit=5")
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.notifications || [])
        setUnreadCount(data.unreadCount || 0)
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark-read", notificationId }),
      })

      if (res.ok) {
        setNotifications(prev => 
          prev.map(n => 
            n._id === notificationId ? { ...n, read: true } : n
          )
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err)
    }
  }

  const markAllAsRead = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark-all-read" }),
      })

      if (res.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
        setUnreadCount(0)
        addToast("All notifications marked as read", "success")
      }
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err)
      addToast("Failed to mark notifications as read", "error")
    } finally {
      setLoading(false)
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking":
        return "📅"
      case "message":
        return "💬"
      case "case":
        return "📋"
      case "payment":
        return "💰"
      case "system":
        return "🔔"
      default:
        return "📢"
    }
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now - time) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              disabled={loading}
            >
              Mark all read
            </Button>
          )}
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification._id}
                className={`p-3 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                onClick={() => !notification.read && markAsRead(notification._id)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                      <span className="text-xs text-gray-500">
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-blue-600 hover:text-blue-700">
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 