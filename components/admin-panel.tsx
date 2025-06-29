"use client"

import { useUser } from "./user-context"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Video, Shield } from "lucide-react"

export function AdminPanel() {
  const { users, updateUserPermissions } = useUser()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            User Permissions Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                        user.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={user.isOnline ? "default" : "secondary"} className="text-xs">
                        {user.isOnline ? "Online" : "Offline"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Chat Permission */}
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="font-medium">Chat</div>
                      <div className="text-xs text-muted-foreground">
                        {user.permissions.canChat ? "Enabled" : "Disabled"}
                      </div>
                    </div>
                    <Switch
                      checked={user.permissions.canChat}
                      onCheckedChange={(checked) => updateUserPermissions(user.id, { canChat: checked })}
                    />
                  </div>

                  {/* Video Permission */}
                  <div className="flex items-center gap-3">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="font-medium">Video</div>
                      <div className="text-xs text-muted-foreground">
                        {user.permissions.canVideo ? "Enabled" : "Disabled"}
                      </div>
                    </div>
                    <Switch
                      checked={user.permissions.canVideo}
                      onCheckedChange={(checked) => updateUserPermissions(user.id, { canVideo: checked })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permission Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {users.filter((u) => u.permissions.canChat).length}
              </div>
              <div className="text-sm text-green-700">Users with Chat Access</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {users.filter((u) => u.permissions.canVideo).length}
              </div>
              <div className="text-sm text-blue-700">Users with Video Access</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
