"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PDDealBillingPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const billingData = [
    { id: 1, dealId: "PD201", amount: "$950", status: "Paid" },
    { id: 2, dealId: "PD202", amount: "$1,500", status: "Pending" },
  ]

  const filteredData = billingData.filter(item =>
    item.dealId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>PD Deal Billing</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Billing
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input
              placeholder="Search billing..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {filteredData.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">Deal ID: {item.dealId}</p>
                  <p className="text-sm text-gray-500">Amount: {item.amount}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{item.status}</Badge>
                  <Button size="icon" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
