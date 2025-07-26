import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'

let io

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })

  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token
    if (!token) {
      return next(new Error('Authentication error'))
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      socket.userId = decoded.id
      socket.userType = decoded.userType
      next()
    } catch (err) {
      next(new Error('Authentication error'))
    }
  })

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`)

    // Join user to their personal room
    socket.join(`user:${socket.userId}`)

    // Join lawyer to their lawyer room if they're a lawyer
    if (socket.userType === 'lawyer') {
      socket.join('lawyers')
    }

    // Handle chat messages
    socket.on('send_message', async (data) => {
      try {
        const { recipientId, message, bookingId } = data
        
        // Emit to recipient
        socket.to(`user:${recipientId}`).emit('receive_message', {
          senderId: socket.userId,
          message,
          bookingId,
          timestamp: new Date()
        })

        // Emit back to sender for confirmation
        socket.emit('message_sent', {
          recipientId,
          message,
          bookingId,
          timestamp: new Date()
        })
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' })
      }
    })

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      const { recipientId } = data
      socket.to(`user:${recipientId}`).emit('user_typing', {
        userId: socket.userId,
        isTyping: true
      })
    })

    socket.on('typing_stop', (data) => {
      const { recipientId } = data
      socket.to(`user:${recipientId}`).emit('user_typing', {
        userId: socket.userId,
        isTyping: false
      })
    })

    // Handle online status
    socket.on('set_online_status', (status) => {
      socket.broadcast.emit('user_status_change', {
        userId: socket.userId,
        status
      })
    })

    // Handle video call signaling
    socket.on('video_call_offer', (data) => {
      const { recipientId, offer, bookingId } = data
      
      // Check if recipient is online
      const recipientSocket = io.sockets.sockets.get(recipientId)
      if (recipientSocket) {
        socket.to(`user:${recipientId}`).emit('video_call_offer', {
          callerId: socket.userId,
          offer,
          bookingId,
          timestamp: new Date()
        })
      } else {
        // Recipient is offline, send offline notification
        socket.emit('call_failed', {
          reason: 'recipient_offline',
          message: 'User is currently offline'
        })
      }
    })

    socket.on('video_call_answer', (data) => {
      const { recipientId, answer, bookingId } = data
      socket.to(`user:${recipientId}`).emit('video_call_answer', {
        answererId: socket.userId,
        answer,
        bookingId,
        timestamp: new Date()
      })
    })

    socket.on('video_call_ice_candidate', (data) => {
      const { recipientId, candidate, bookingId } = data
      socket.to(`user:${recipientId}`).emit('video_call_ice_candidate', {
        senderId: socket.userId,
        candidate,
        bookingId,
        timestamp: new Date()
      })
    })

    // Handle incoming call notifications
    socket.on('incoming_call', (data) => {
      const { recipientId, bookingId } = data
      socket.to(`user:${recipientId}`).emit('incoming_call', {
        callerId: socket.userId,
        bookingId,
        timestamp: new Date()
      })
    })

    // Handle call acceptance
    socket.on('accept_call', (data) => {
      const { recipientId, bookingId } = data
      socket.to(`user:${recipientId}`).emit('call_accepted', {
        answererId: socket.userId,
        bookingId,
        timestamp: new Date()
      })
    })

    // Handle call rejection
    socket.on('reject_call', (data) => {
      const { recipientId, bookingId } = data
      socket.to(`user:${recipientId}`).emit('call_rejected', {
        rejecterId: socket.userId,
        bookingId,
        timestamp: new Date()
      })
    })

    // Handle call ending
    socket.on('end_call', (data) => {
      const { recipientId, bookingId } = data
      socket.to(`user:${recipientId}`).emit('call_ended', {
        enderId: socket.userId,
        bookingId,
        timestamp: new Date()
      })
    })

    // Handle call busy
    socket.on('call_busy', (data) => {
      const { recipientId, bookingId } = data
      socket.to(`user:${recipientId}`).emit('call_busy', {
        busyUserId: socket.userId,
        bookingId,
        timestamp: new Date()
      })
    })

    // Handle document sharing
    socket.on('share_document', (data) => {
      const { recipientId, documentId, documentUrl } = data
      socket.to(`user:${recipientId}`).emit('document_shared', {
        senderId: socket.userId,
        documentId,
        documentUrl,
        timestamp: new Date()
      })
    })

    // Handle notifications
    socket.on('send_notification', (data) => {
      const { recipientId, notification } = data
      socket.to(`user:${recipientId}`).emit('receive_notification', {
        ...notification,
        timestamp: new Date()
      })
    })

    // Handle room joining for group calls (future feature)
    socket.on('join_room', (data) => {
      const { roomId } = data
      socket.join(`room:${roomId}`)
      socket.to(`room:${roomId}`).emit('user_joined_room', {
        userId: socket.userId,
        roomId,
        timestamp: new Date()
      })
    })

    socket.on('leave_room', (data) => {
      const { roomId } = data
      socket.leave(`room:${roomId}`)
      socket.to(`room:${roomId}`).emit('user_left_room', {
        userId: socket.userId,
        roomId,
        timestamp: new Date()
      })
    })

    // Handle connection quality updates
    socket.on('connection_quality', (data) => {
      const { recipientId, quality } = data
      socket.to(`user:${recipientId}`).emit('connection_quality_update', {
        userId: socket.userId,
        quality,
        timestamp: new Date()
      })
    })

    // Handle call recording (future feature)
    socket.on('start_recording', (data) => {
      const { recipientId, bookingId } = data
      socket.to(`user:${recipientId}`).emit('recording_started', {
        initiatorId: socket.userId,
        bookingId,
        timestamp: new Date()
      })
    })

    socket.on('stop_recording', (data) => {
      const { recipientId, bookingId } = data
      socket.to(`user:${recipientId}`).emit('recording_stopped', {
        initiatorId: socket.userId,
        bookingId,
        timestamp: new Date()
      })
    })

    // Handle call statistics
    socket.on('call_stats', (data) => {
      const { recipientId, stats } = data
      socket.to(`user:${recipientId}`).emit('call_stats_update', {
        userId: socket.userId,
        stats,
        timestamp: new Date()
      })
    })

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`)
      
      // Notify all users that this user is offline
      socket.broadcast.emit('user_status_change', {
        userId: socket.userId,
        status: 'offline',
        timestamp: new Date()
      })

      // Notify any active calls that the user disconnected
      socket.broadcast.emit('user_disconnected', {
        userId: socket.userId,
        timestamp: new Date()
      })
    })
  })

  return io
}

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!')
  }
  return io
}

// Helper function to send notifications to specific users
export const sendNotification = (userId, notification) => {
  if (io) {
    io.to(`user:${userId}`).emit('receive_notification', {
      ...notification,
      timestamp: new Date()
    })
  }
}

// Helper function to send notifications to all lawyers
export const sendNotificationToLawyers = (notification) => {
  if (io) {
    io.to('lawyers').emit('receive_notification', {
      ...notification,
      timestamp: new Date()
    })
  }
}

// Helper function to check if user is online
export const isUserOnline = (userId) => {
  if (io) {
    const userSocket = io.sockets.sockets.get(userId)
    return !!userSocket
  }
  return false
}

// Helper function to get online users
export const getOnlineUsers = () => {
  if (io) {
    const onlineUsers = []
    io.sockets.sockets.forEach((socket, userId) => {
      onlineUsers.push({
        userId,
        userType: socket.userType,
        connectedAt: socket.handshake.time
      })
    })
    return onlineUsers
  }
  return []
} 