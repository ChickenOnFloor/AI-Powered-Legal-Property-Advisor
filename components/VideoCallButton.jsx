"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video, Phone, PhoneOff } from "lucide-react"
import VideoCall from "./VideoCall"
import { useToast } from "@/components/ui/toast"

export default function VideoCallButton({ 
  bookingId, 
  recipientId, 
  recipientName, 
  recipientImage, 
  userType,
  disabled = false 
}) {
  const [showVideoCall, setShowVideoCall] = useState(false)
  const [isCalling, setIsCalling] = useState(false)
  const { addToast } = useToast()

  const handleStartCall = () => {
    if (disabled) {
      addToast("Video calling is not available for this booking", "error")
      return
    }
    
    setIsCalling(true)
    setShowVideoCall(true)
  }

  const handleCloseCall = () => {
    setShowVideoCall(false)
    setIsCalling(false)
  }

  return (
    <>
      <Button
        onClick={handleStartCall}
        disabled={disabled || isCalling}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
      >
        {isCalling ? (
          <>
            <PhoneOff className="h-4 w-4" />
            <span>End Call</span>
          </>
        ) : (
          <>
            <Video className="h-4 w-4" />
            <span>Video Call</span>
          </>
        )}
      </Button>

      {showVideoCall && (
        <VideoCall
          bookingId={bookingId}
          recipientId={recipientId}
          recipientName={recipientName}
          recipientImage={recipientImage}
          userType={userType}
          onClose={handleCloseCall}
        />
      )}
    </>
  )
}

// Incoming Call Notification Component
export function IncomingCallNotification({ 
  callerInfo, 
  onAccept, 
  onReject 
}) {
  return (
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
            {callerInfo?.callerName || "Unknown"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={onAccept}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            onClick={onReject}
            size="sm"
            variant="destructive"
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Call Status Indicator Component
export function CallStatusIndicator({ 
  isInCall, 
  callDuration, 
  connectionQuality 
}) {
  if (!isInCall) return null

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'excellent': return 'text-green-500'
      case 'good': return 'text-yellow-500'
      case 'poor': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      <span className="text-gray-600">Call in progress</span>
      <span className="text-gray-500">•</span>
      <span className="text-gray-600">{formatDuration(callDuration)}</span>
      <span className="text-gray-500">•</span>
      <span className={getQualityColor(connectionQuality)}>
        {connectionQuality} connection
      </span>
    </div>
  )
} 