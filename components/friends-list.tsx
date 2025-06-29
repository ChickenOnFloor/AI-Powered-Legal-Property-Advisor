"use client"

import { useUser } from "./user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "lucide-react"

export function FriendsList() {
  const { currentUser, users, selectedFriend, selectFriend, setCurrentUser } = useUser()

  const friends = users.filter((user) => user.id !== currentUser.id)

  return (
    <div className="h-full flex flex-col">
      {/* Current User Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{currentUser.name}</h2>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>

        <Select value={currentUser.id} onValueChange={setCurrentUser}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Switch user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">FRIENDS</h3>
          <div className="space-y-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                onClick={() => selectFriend(friend)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedFriend?.id === friend.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                      friend.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{friend.name}</p>
                  <p className="text-sm text-gray-500">
                    {friend.isOnline ? (
                      <Badge variant="secondary" className="text-xs">
                        Online
                      </Badge>
                    ) : (
                      `Last seen ${friend.lastSeen}`
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
