"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getUserFromToken } from "@/hooks/use-token"
import Pagination from "@/components/pagination"

interface User {
  id: string
  name: string
  avatar?: string
  organization?: {
    image_banner?: string
  }
}

type UserType = "buyer" | "seller" | "consultant"

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<UserType>("buyer")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const user = getUserFromToken();
  const userRole = user?.user_role

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      setError(null)
      try {
        let url = ""
        if (activeTab === "buyer") {
          url = `https://paper-deal-server.onrender.com/api/users/getBuyer?page=${currentPage}&limit=9`
        } else if (activeTab === "seller") {
          url = `https://paper-deal-server.onrender.com/api/users/getallsellers?user_type=2?page=${currentPage}&limit=9`
        } else if (activeTab === "consultant") {
          url = `https://paper-deal-server.onrender.com/api/users/getallsellers?user_type=5?page=${currentPage}&limit=9`
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setUsers(data.data || [])
        setTotalPages(data.totalPages || 1)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [activeTab, currentPage])

  return (
    <div className="w-full space-y-6">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4">

        {userRole !== 2 && (
          <Button
            variant={activeTab === "seller" ? "default" : "outline"}
            onClick={() => setActiveTab("seller")}
          >
            Seller
          </Button>
        )}
        {userRole !== 5 && (
          <>
            <Button
              variant={activeTab === "buyer" ? "default" : "outline"}
              onClick={() => setActiveTab("buyer")}
            >
              Buyer
            </Button>
            <Button
              variant={activeTab === "consultant" ? "default" : "outline"}
              onClick={() => setActiveTab("consultant")}
            >
              Consultant
            </Button>
          </>
        )}
      </div>

      {/* Loading / Error States */}
      {loading && <div className="text-center">Loading {activeTab}s...</div>}


      {/* User Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {users.map((user) => (
            <Link key={user.id} href={`/admin/chat/${user.id}`} passHref>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        user.organization?.image_banner ||
                        `/placeholder.svg?height=40&width=40&query=${user.name}`
                      }
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Click to chat</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}
