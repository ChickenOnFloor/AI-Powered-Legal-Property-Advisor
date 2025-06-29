"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
    specialization: "property",
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") || ""

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userType = formData.userType || defaultType
    setLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userType }),
      })

      const data = await res.json()

      if (res.ok) {
        if (userType === "admin") {
          router.push("/admin/dashboard")
        } else if (userType === "lawyer") {
          router.push("/lawyer/dashboard")
        } else {
          router.push("/client/dashboard")
        }
      } else {
        alert(data.message || "Registration failed")
      }
    } catch (err) {
      console.error("Registration error:", err)
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <motion.div className="flex items-center justify-center space-x-2 mb-4" whileHover={{ scale: 1.05 }}>
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">LegalAdvisor</span>
            </motion.div>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Join our platform to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">Account Type</Label>
                <Select
                  value={formData.userType || defaultType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="lawyer">Lawyer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.userType === "lawyer" || defaultType === "lawyer") && (
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select
                    value="property"
                    onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                    disabled
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Property Law" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="property">Property Law</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Our platform specializes exclusively in property law</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
