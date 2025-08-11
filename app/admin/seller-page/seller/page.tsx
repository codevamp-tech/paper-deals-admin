"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

const sellerData = [
  {
    id: 1,
    sellerId: "SEL_001",
    name: "Gupta Paper Mills",
    email: "gupta@gmail.com",
    mobile: "9876543210",
    address: "Bareilly",
    status: "Active",
  },
  {
    id: 2,
    sellerId: "SEL_002",
    name: "Verma Boards Pvt Ltd",
    email: "verma@gmail.com",
    mobile: "9811122233",
    address: "Delhi",
    status: "Inactive",
  },
]

export default function SellerPage() {
  const [sellers, setSellers] = useState(sellerData)

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Sellers</h2>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Seller
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seller List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-md border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Seller ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr key={seller.id} className="border-t">
                    <td className="px-4 py-2 border">{seller.id}</td>
                    <td className="px-4 py-2 border">{seller.sellerId}</td>
                    <td className="px-4 py-2 border">{seller.name}</td>
                    <td className="px-4 py-2 border">{seller.email}</td>
                    <td className="px-4 py-2 border">{seller.mobile}</td>
                    <td className="px-4 py-2 border">{seller.address}</td>
                    <td className="px-4 py-2 border">
                      <Badge
                        className={
                          seller.status === "Active"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }
                      >
                        {seller.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
