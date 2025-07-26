"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  Bell, 
  Shield, 
  User, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Save, 
  Loader2,
  Eye,
  EyeOff
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/toast"

export default function SettingsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      booking: true,
      messages: true,
      reviews: true,
      system: false
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      allowMessages: true
    },
    preferences: {
      language: "en",
      timezone: "UTC",
      currency: "USD"
    }
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const { addToast } = useToast()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/profile")
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          addToast("Failed to load user profile", "error")
        }
      } catch (err) {
        console.error("Failed to fetch user:", err)
        addToast("Failed to load user profile", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [addToast])

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const handleSaveSettings = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        addToast("Settings saved successfully!", "success")
      } else {
        addToast("Failed to save settings", "error")
      }
    } catch (err) {
      console.error("Failed to save settings:", err)
      addToast("Failed to save settings", "error")
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast("New passwords don't match", "error")
      return
    }

    if (passwordData.newPassword.length < 6) {
      addToast("Password must be at least 6 characters", "error")
      return
    }

    setSaving(true)
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
      })

      if (res.ok) {
        addToast("Password changed successfully!", "success")
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
      } else {
        const data = await res.json()
        addToast(data.error || "Failed to change password", "error")
      }
    } catch (err) {
      console.error("Failed to change password:", err)
      addToast("Failed to change password", "error")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link href={user?.userType === "lawyer" ? "/lawyer/dashboard" : "/client/dashboard"}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Settings</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Notifications Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>
                Manage how you receive notifications and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications in browser</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "push", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Booking Updates</Label>
                    <p className="text-sm text-gray-500">Notifications about your bookings</p>
                  </div>
                  <Switch
                    checked={settings.notifications.booking}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "booking", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Messages</Label>
                    <p className="text-sm text-gray-500">Notifications for new messages</p>
                  </div>
                  <Switch
                    checked={settings.notifications.messages}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "messages", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Review Updates</Label>
                    <p className="text-sm text-gray-500">Notifications about reviews</p>
                  </div>
                  <Switch
                    checked={settings.notifications.reviews}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "reviews", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Updates</Label>
                    <p className="text-sm text-gray-500">Important system announcements</p>
                  </div>
                  <Switch
                    checked={settings.notifications.system}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "system", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Privacy & Security</span>
              </CardTitle>
              <CardDescription>
                Control your privacy and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label>Profile Visibility</Label>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value) => handleSettingChange("privacy", "profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="lawyers">Lawyers Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Email Address</Label>
                    <p className="text-sm text-gray-500">Allow others to see your email</p>
                  </div>
                  <Switch
                    checked={settings.privacy.showEmail}
                    onCheckedChange={(checked) => handleSettingChange("privacy", "showEmail", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Direct Messages</Label>
                    <p className="text-sm text-gray-500">Allow other users to message you</p>
                  </div>
                  <Switch
                    checked={settings.privacy.allowMessages}
                    onCheckedChange={(checked) => handleSettingChange("privacy", "allowMessages", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Preferences</span>
              </CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label>Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => handleSettingChange("preferences", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ur">اردو</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Currency</Label>
                  <Select
                    value={settings.preferences.currency}
                    onValueChange={(value) => handleSettingChange("preferences", "currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="PKR">PKR (₨)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Change Password</span>
              </CardTitle>
              <CardDescription>
                Update your account password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label>Current Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>New Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
                <Button onClick={handlePasswordChange} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Changing Password...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Settings */}
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={saving} size="lg">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 