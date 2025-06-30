"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Maximize2, Minimize2 } from "lucide-react"
import type { Contact } from "@/types/chat"

interface CallModalProps {
  contact: Contact
  isVideoEnabled: boolean
  isAudioMuted: boolean
  isMinimized: boolean
  onToggleVideo: () => void
  onToggleAudio: () => void
  onEndCall: () => void
  onToggleMinimize: () => void
}

export default function CallModal({
  contact,
  isVideoEnabled,
  isAudioMuted,
  isMinimized,
  onToggleVideo,
  onToggleAudio,
  onEndCall,
  onToggleMinimize,
}: CallModalProps) {
  return (
    <div
      className={`fixed ${
        isMinimized ? "bottom-4 right-4 w-80 h-60" : "inset-0"
      } bg-black z-50 ${isMinimized ? "rounded-lg overflow-hidden" : ""}`}
    >
      <div className="relative w-full h-full">
        {/* Video/Audio Display */}
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          {isVideoEnabled ? (
            <Avatar className="h-32 w-32">
              <AvatarImage src={contact.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-4xl">
                {contact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-40 w-40">
                <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-5xl">
                  {contact.name
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
        {!isMinimized && isVideoEnabled && (
          <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
              <div className="text-white text-xs">You</div>
            </div>
          </div>
        )}

        {/* Call Info */}
        {!isMinimized && (
          <div className="absolute top-4 left-4 text-white">
            <h3 className="font-semibold">{contact.name}</h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm opacity-75">00:45</p>
              <Badge variant="secondary" className="text-xs">
                {isVideoEnabled ? "Video" : "Audio"}
              </Badge>
            </div>
          </div>
        )}

        {/* Call Type Indicator for minimized view */}
        {isMinimized && (
          <div className="absolute top-2 left-2 text-white">
            <Badge variant="secondary" className="text-xs">
              {isVideoEnabled ? "Video" : "Audio"}
            </Badge>
          </div>
        )}

        {/* Controls */}
        <div
          className={`absolute ${
            isMinimized
              ? "bottom-2 left-1/2 transform -translate-x-1/2"
              : "bottom-8 left-1/2 transform -translate-x-1/2"
          } flex items-center space-x-3`}
        >
          <Button
            onClick={onToggleAudio}
            variant={isAudioMuted ? "destructive" : "secondary"}
            size={isMinimized ? "sm" : "lg"}
            className={`rounded-full ${isMinimized ? "w-8 h-8" : "w-12 h-12"}`}
          >
            {isAudioMuted ? (
              <MicOff className={`${isMinimized ? "h-3 w-3" : "h-5 w-5"}`} />
            ) : (
              <Mic className={`${isMinimized ? "h-3 w-3" : "h-5 w-5"}`} />
            )}
          </Button>

          <Button
            onClick={onToggleVideo}
            variant={isVideoEnabled ? "default" : "secondary"}
            size={isMinimized ? "sm" : "lg"}
            className={`rounded-full ${isMinimized ? "w-8 h-8" : "w-12 h-12"} ${
              isVideoEnabled ? "bg-blue-500 hover:bg-blue-600" : ""
            }`}
          >
            {isVideoEnabled ? (
              <Video className={`${isMinimized ? "h-3 w-3" : "h-5 w-5"}`} />
            ) : (
              <VideoOff className={`${isMinimized ? "h-3 w-3" : "h-5 w-5"}`} />
            )}
          </Button>

          <Button
            onClick={onEndCall}
            variant="destructive"
            size={isMinimized ? "sm" : "lg"}
            className={`rounded-full ${isMinimized ? "w-8 h-8" : "w-12 h-12"}`}
          >
            <PhoneOff className={`${isMinimized ? "h-3 w-3" : "h-5 w-5"}`} />
          </Button>

          {!isMinimized && (
            <Button onClick={onToggleMinimize} variant="secondary" size="lg" className="rounded-full w-12 h-12">
              <Minimize2 className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Maximize button for minimized view */}
        {isMinimized && (
          <Button
            onClick={onToggleMinimize}
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 rounded-full w-6 h-6"
          >
            <Maximize2 className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}
