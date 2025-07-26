"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  MoreVertical,
  Settings,
  Users,
  ScreenShare,
  StopScreenShare,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Clock,
  Signal,
  Wifi,
  WifiOff
} from "lucide-react"
import { io } from "socket.io-client"
import Peer from "simple-peer"
import { useToast } from "@/components/ui/toast"

export default function VideoCall({ 
  bookingId, 
  recipientId, 
  recipientName, 
  recipientImage, 
  userType,
  onClose 
}) {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [connectionQuality, setConnectionQuality] = useState("good")
  const [isIncomingCall, setIsIncomingCall] = useState(false)
  const [callerInfo, setCallerInfo] = useState(null)
  
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const screenShareRef = useRef(null)
  const socketRef = useRef(null)
  const peerRef = useRef(null)
  const localStreamRef = useRef(null)
  const screenStreamRef = useRef(null)
  const callTimerRef = useRef(null)
  const { addToast } = useToast()

  // Initialize socket connection
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      addToast("Authentication required", "error")
      return
    }

    const socket = io(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", {
      auth: { token }
    })

    socketRef.current = socket

    // Handle incoming call
    socket.on('incoming_call', (data) => {
      if (data.callerId === recipientId) {
        setIsIncomingCall(true)
        setCallerInfo(data)
        addToast(`Incoming call from ${recipientName}`, "info")
      }
    })

    // Handle call accepted
    socket.on('call_accepted', (data) => {
      setIsConnecting(false)
      setIsCallActive(true)
      addToast("Call connected!", "success")
      startCallTimer()
    })

    // Handle call rejected
    socket.on('call_rejected', (data) => {
      setIsConnecting(false)
      addToast("Call was rejected", "error")
    })

    // Handle call ended
    socket.on('call_ended', (data) => {
      endCall()
      addToast("Call ended", "info")
    })

    // Handle WebRTC signaling
    socket.on('video_call_offer', handleVideoOffer)
    socket.on('video_call_answer', handleVideoAnswer)
    socket.on('video_call_ice_candidate', handleIceCandidate)

    return () => {
      socket.disconnect()
    }
  }, [recipientId, recipientName, addToast])

  // Initialize local media stream
  const initializeLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      
      localStreamRef.current = stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
      
      return stream
    } catch (error) {
      console.error('Error accessing media devices:', error)
      addToast("Unable to access camera/microphone", "error")
      throw error
    }
  }, [addToast])

  // Start outgoing call
  const startCall = async () => {
    try {
      setIsConnecting(true)
      const stream = await initializeLocalStream()
      
      // Create peer connection
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream
      })

      peerRef.current = peer

      peer.on('signal', (data) => {
        socketRef.current.emit('video_call_offer', {
          recipientId,
          offer: data,
          bookingId
        })
      })

      peer.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream
        }
      })

      peer.on('error', (error) => {
        console.error('Peer connection error:', error)
        addToast("Connection error", "error")
        endCall()
      })

    } catch (error) {
      setIsConnecting(false)
      addToast("Failed to start call", "error")
    }
  }

  // Accept incoming call
  const acceptCall = async () => {
    try {
      setIsIncomingCall(false)
      setIsConnecting(true)
      
      const stream = await initializeLocalStream()
      
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream
      })

      peerRef.current = peer

      peer.on('signal', (data) => {
        socketRef.current.emit('video_call_answer', {
          recipientId: callerInfo.callerId,
          answer: data,
          bookingId
        })
      })

      peer.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream
        }
      })

      peer.on('error', (error) => {
        console.error('Peer connection error:', error)
        addToast("Connection error", "error")
        endCall()
      })

    } catch (error) {
      setIsConnecting(false)
      addToast("Failed to accept call", "error")
    }
  }

  // Reject incoming call
  const rejectCall = () => {
    socketRef.current.emit('reject_call', {
      recipientId: callerInfo.callerId,
      bookingId
    })
    setIsIncomingCall(false)
    setCallerInfo(null)
  }

  // Handle video offer
  const handleVideoOffer = (data) => {
    if (data.callerId === recipientId) {
      setIsIncomingCall(true)
      setCallerInfo(data)
    }
  }

  // Handle video answer
  const handleVideoAnswer = (data) => {
    if (peerRef.current) {
      peerRef.current.signal(data.answer)
    }
  }

  // Handle ICE candidate
  const handleIceCandidate = (data) => {
    if (peerRef.current) {
      peerRef.current.signal(data.candidate)
    }
  }

  // End call
  const endCall = () => {
    setIsCallActive(false)
    setIsConnecting(false)
    setIsIncomingCall(false)
    setCallDuration(0)
    
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current)
    }

    if (peerRef.current) {
      peerRef.current.destroy()
      peerRef.current = null
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop())
      localStreamRef.current = null
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop())
      screenStreamRef.current = null
    }

    socketRef.current.emit('end_call', {
      recipientId,
      bookingId
    })

    onClose?.()
  }

  // Toggle mute
  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsMuted(!audioTrack.enabled)
      }
    }
  }

  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoEnabled(videoTrack.enabled)
      }
    }
  }

  // Toggle screen sharing
  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        })
        
        screenStreamRef.current = screenStream
        
        if (peerRef.current) {
          const videoTrack = screenStream.getVideoTracks()[0]
          const sender = peerRef.current.getSenders().find(s => 
            s.track?.kind === 'video'
          )
          
          if (sender) {
            sender.replaceTrack(videoTrack)
          }
        }
        
        setIsScreenSharing(true)
        addToast("Screen sharing started", "success")
      } else {
        if (screenStreamRef.current) {
          screenStreamRef.current.getTracks().forEach(track => track.stop())
          screenStreamRef.current = null
        }
        
        if (peerRef.current && localStreamRef.current) {
          const videoTrack = localStreamRef.current.getVideoTracks()[0]
          const sender = peerRef.current.getSenders().find(s => 
            s.track?.kind === 'video'
          )
          
          if (sender && videoTrack) {
            sender.replaceTrack(videoTrack)
          }
        }
        
        setIsScreenSharing(false)
        addToast("Screen sharing stopped", "info")
      }
    } catch (error) {
      console.error('Screen sharing error:', error)
      addToast("Failed to toggle screen sharing", "error")
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  // Start call timer
  const startCallTimer = () => {
    callTimerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
  }

  // Format call duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Get connection quality indicator
  const getConnectionQualityIcon = () => {
    switch (connectionQuality) {
      case 'excellent':
        return <Signal className="h-4 w-4 text-green-500" />
      case 'good':
        return <Signal className="h-4 w-4 text-yellow-500" />
      case 'poor':
        return <Signal className="h-4 w-4 text-red-500" />
      default:
        return <WifiOff className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full h-full max-w-6xl max-h-[90vh] relative"
        >
          {/* Incoming Call Modal */}
          {isIncomingCall && (
            <Card className="absolute inset-0 m-4 bg-white/95 backdrop-blur-md">
              <CardContent className="flex flex-col items-center justify-center h-full p-8">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={recipientImage} />
                  <AvatarFallback>{recipientName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl mb-2">Incoming Call</CardTitle>
                <p className="text-gray-600 mb-8">{recipientName} is calling...</p>
                <div className="flex space-x-4">
                  <Button
                    onClick={acceptCall}
                    className="bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Accept
                  </Button>
                  <Button
                    onClick={rejectCall}
                    variant="destructive"
                    size="lg"
                  >
                    <PhoneOff className="h-5 w-5 mr-2" />
                    Decline
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Video Call Interface */}
          {!isIncomingCall && (
            <>
              {/* Main Video Area */}
              <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
                {/* Remote Video */}
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Local Video */}
                <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Connection Status */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  {getConnectionQualityIcon()}
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {formatDuration(callDuration)}
                  </Badge>
                </div>

                {/* Call Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <Button
                    onClick={toggleMute}
                    variant={isMuted ? "destructive" : "secondary"}
                    size="lg"
                    className="rounded-full w-12 h-12 p-0"
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    onClick={toggleVideo}
                    variant={!isVideoEnabled ? "destructive" : "secondary"}
                    size="lg"
                    className="rounded-full w-12 h-12 p-0"
                  >
                    {!isVideoEnabled ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    onClick={toggleScreenShare}
                    variant={isScreenSharing ? "destructive" : "secondary"}
                    size="lg"
                    className="rounded-full w-12 h-12 p-0"
                  >
                    {isScreenSharing ? <StopScreenShare className="h-5 w-5" /> : <ScreenShare className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    onClick={endCall}
                    variant="destructive"
                    size="lg"
                    className="rounded-full w-12 h-12 p-0"
                  >
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    onClick={toggleFullscreen}
                    variant="secondary"
                    size="lg"
                    className="rounded-full w-12 h-12 p-0"
                  >
                    {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                  </Button>
                </div>

                {/* Connecting State */}
                {isConnecting && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p>Connecting...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Call Info */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={recipientImage} />
                    <AvatarFallback>{recipientName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{recipientName}</span>
                  <span className="text-sm opacity-75">• {userType === 'lawyer' ? 'Lawyer' : 'Client'}</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 