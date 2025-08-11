"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: "Basic Plan", price: "₹499", duration: "1 Month", status: "Active" },
    { id: 2, name: "Pro Plan", price: "₹1499", duration: "3 Months", status: "Inactive" },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [newSubscription, setNewSubscription] = useState({ name: "", price: "", duration: "", status: "Active" })

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addSubscription = () => {
    if (!newSubscription.name || !newSubscription.price || !newSubscription.duration) return
    setSubscriptions([
      ...subscriptions,
      { id: Date.now(), ...newSubscription },
    ])
    setNewSubscription({ name: "", price: "", duration: "", status: "Active" })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Subscription</CardTitle>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8"
          />
          <Search className="h-4 w-4 text-gray-500" />
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Subscription</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2">
                <Input
                  placeholder="Name"
                  value={newSubscription.name}
                  onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
                />
                <Input
                  placeholder="Price"
                  value={newSubscription.price}
                  onChange={(e) => setNewSubscription({ ...newSubscription, price: e.target.value })}
                />
                <Input
                  placeholder="Duration"
                  value={newSubscription.duration}
                  onChange={(e) => setNewSubscription({ ...newSubscription, duration: e.target.value })}
                />
                <Button onClick={addSubscription}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Duration</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.map((sub) => (
              <tr key={sub.id} className="border-b">
                <td className="py-2">{sub.name}</td>
                <td className="py-2">{sub.price}</td>
                <td className="py-2">{sub.duration}</td>
                <td className="py-2">
                  <Badge variant={sub.status === "Active" ? "default" : "secondary"}>
                    {sub.status}
                  </Badge>
                </td>
                <td className="py-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
