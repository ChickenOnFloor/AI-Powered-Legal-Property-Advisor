"use client"

import { useUser } from "./user-context"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Video, MessageSquare } from "lucide-react"

export function UserList() {
  const { users, currentUser, startVideoCall } = useUser()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Users</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {users
          .filter((user) => user.id !== currentUser.id)
          .map((user) => (
            <div key={user.id} className="flex items-center justify-between p-2 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                      user.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <div className="flex gap-1">
                    {user.permissions.canChat && (
                      <Badge variant="secondary" className="text-xs">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Chat
                      </Badge>
                    )}
                    {user.permissions.canVideo && (
                      <Badge variant="secondary" className="text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Video
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {user.isOnline && user.permissions.canVideo && currentUser.permissions.canVideo && (
                <Button size="sm" variant="outline" onClick={() => startVideoCall(user.id)} className="h-8 w-8 p-0">
                  <Video className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
      </CardContent>
    </Card>
  )
}
