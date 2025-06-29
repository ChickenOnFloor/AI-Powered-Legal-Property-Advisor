"use client"

import { useState } from "react"
import { useUser } from "./user-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PhoneOff, Mic, MicOff, Video, VideoOff, Maximize2, Minimize2 } from "lucide-react"

export function VideoCall() {
  const { activeCall, endCall, currentUser } = useUser()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!activeCall) return null

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white relative">
      {/* Video Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Remote Video */}
        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
          {isVideoOff ? (
            <div className="text-center">
              <Avatar className="h-32 w-32 mx-auto mb-6">
                <AvatarImage src={activeCall.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-4xl bg-gray-700">{activeCall.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold mb-2">{activeCall.name}</h2>
              <p className="text-gray-300">Video call in progress</p>
            </div>
          ) : (
            <div className="w-full h-full relative">
              {/* Simulated remote video */}
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={activeCall.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">{activeCall.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-medium">{activeCall.name}</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Local Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-40 h-28 bg-gray-800 rounded-lg border-2 border-white overflow-hidden shadow-lg">
          {isVideoOff ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <VideoOff className="h-8 w-8 text-gray-400" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
              <Avatar className="h-12 w-12">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-sm">{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        {/* Call Info */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg px-3 py-2">
          <p className="text-sm font-medium">Call with {activeCall.name}</p>
          <p className="text-xs text-gray-300">Connected</p>
        </div>

        {/* Fullscreen Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white h-8 w-8 p-0"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Call Controls */}
      <div className="p-6 bg-gray-800 bg-opacity-90">
        <div className="flex justify-center items-center gap-4">
          {/* Mute Button */}
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full h-14 w-14 p-0"
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>

          {/* Video Toggle Button */}
          <Button
            variant={isVideoOff ? "destructive" : "secondary"}
            size="lg"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className="rounded-full h-14 w-14 p-0"
          >
            {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
          </Button>

          {/* End Call Button */}
          <Button
            variant="destructive"
            size="lg"
            onClick={endCall}
            className="rounded-full h-14 w-14 p-0 bg-red-500 hover:bg-red-600"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>

        {/* Call Status */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            {isMuted && "Microphone muted"} {isVideoOff && "Camera off"}
          </p>
        </div>
      </div>
    </div>
  )
}
