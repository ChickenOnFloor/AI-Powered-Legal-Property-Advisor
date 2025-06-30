"use client"
import { useChat } from "@/hooks/use-chat"
import ContactList from "./contact-list"
import ChatHeader from "./chat-header"
import MessageList from "./message-list"
import MessageInput from "./message-input"
import IncomingCallModal from "./incoming-call-modal"
import CallModal from "./call-modal"

export default function ChatApp() {
  const {
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
  } = useChat()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Contact List Overlay */}
      {showContactList && (
        <ContactList
          contacts={filteredContacts}
          selectedContactId={selectedContactId}
          searchQuery={searchQuery}
          onContactSelect={handleContactSelect}
          onClose={() => setShowContactList(false)}
          onSearchChange={setSearchQuery}
          isMobile={true}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-80 bg-white border-r border-gray-200 flex-col">
        <ContactList
          contacts={filteredContacts}
          selectedContactId={selectedContactId}
          searchQuery={searchQuery}
          onContactSelect={handleContactSelect}
          onSearchChange={setSearchQuery}
          isMobile={false}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader
          contact={selectedContact}
          onShowContactList={() => setShowContactList(true)}
          onVoiceCall={handleVoiceCall}
          onVideoCall={handleVideoCall}
        />

        <MessageList messages={currentMessages} />

        <MessageInput
          value={newMessage}
          onChange={setNewMessage}
          onSubmit={handleSendMessage}
          contactName={selectedContact.name}
        />
      </div>

      {/* Incoming Call Modal */}
      {isIncomingCall && incomingCallContact && (
        <IncomingCallModal
          contact={incomingCallContact}
          callType={incomingCallType}
          onAccept={handleAcceptCall}
          onDecline={handleDeclineCall}
        />
      )}

      {/* Call Modal */}
      {isCallActive && (
        <CallModal
          contact={selectedContact}
          isVideoEnabled={isVideoEnabled}
          isAudioMuted={isAudioMuted}
          isMinimized={isCallMinimized}
          onToggleVideo={toggleVideo}
          onToggleAudio={() => setIsAudioMuted(!isAudioMuted)}
          onEndCall={handleEndCall}
          onToggleMinimize={() => setIsCallMinimized(!isCallMinimized)}
        />
      )}
    </div>
  )
}
