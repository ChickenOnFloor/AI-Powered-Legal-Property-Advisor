"use client"
import { useUser } from "./user-context"
import { VideoCall } from "./video-call"
import { UserList } from "./user-list"
import { MessageList } from "./message-list"
import { MessageInput } from "./message-input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ChatInterface() {
  const { currentUser, setCurrentUser, users, activeCall } = useUser()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* User Selection & Info */}
      <div className="lg:col-span-1">
        <Card className="p-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground">Current User</p>
            </div>
          </div>

          <Select value={currentUser.id} onValueChange={setCurrentUser}>
            <SelectTrigger>
              <SelectValue placeholder="Switch user" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        <UserList />
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-3">
        <Card className="h-full flex flex-col">
          {activeCall ? (
            <VideoCall />
          ) : (
            <>
              <div className="flex-1 overflow-hidden">
                <MessageList />
              </div>
              <div className="border-t p-4">
                <MessageInput />
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
