"use client"

import type React from "react"
import Cookies from "js-cookie"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield } from "lucide-react"
import Link from "next/link"

const Apilocalurl = process.env.NEXT_PUBLIC_API_URL || "https://paper-deal-server.onrender.com"

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: 1,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`https://paper-deal-server.onrender.com/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })

      const data = await response.json()
      // save token in the cookies

      if (response.ok) {
        Cookies.set("token", data.token, { expires: 7 })
        localStorage.setItem("token", data.token);
        router.push("/admin/dashboard")
      } else {
        setError(data.message || "Login failed")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="flex flex-col items-center text-center space-y-4 pb-6">
          <div className="w-full flex justify-center">
            <img
              className="h-12 w-auto"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iqQ8i8AeGTX6s8TUIw84zuo7SWs3uS.png"
              alt="Paper Deals Logo"
            />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Admin Panel
            </CardTitle>
            <p className="text-gray-500 text-sm">Sign in to manage your Paper Deals</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="type">Login as</Label>
              <select
                id="type"
                className="w-full mt-1 p-2 border rounded-md bg-white text-gray-900"
                value={formData.type}
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                required
              >
                <option value={1}>Admin</option>
                <option value={4}>Super Admin</option>
                <option value={2}>Seller</option>
                <option value={5}>Consultant</option>
              </select>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="test@gmail.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  )
}
