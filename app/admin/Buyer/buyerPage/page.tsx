"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function BuyerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [buyers, setBuyers] = useState([
    {
      id: 37,
      companyId: "KPDB_120",
      companyName: "procare",
      buyerName: "vishal singh",
      email: "vishalsingh1@gmail.com",
      phone: "9874563201",
      city: "ghaziabad",
      dealsIn: "kraft paper",
    },
    {
      id: 36,
      companyId: "KPDB_116",
      companyName: "Abc",
      buyerName: "Suryansh Singh",
      email: "suryanshsinsinwar@outlook.com",
      phone: "9116859737",
      city: "Bharatpur",
      dealsIn: "Used Tissues",
    },
  ])

  const filteredBuyers = buyers.filter(
    (b) =>
      b.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddBuyer = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save buyer to backend
  }

  return (
    <div className="p-4">
      {/* Header and Add Buyer Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Buyer</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Buyer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Buyer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddBuyer} className="grid grid-cols-2 gap-4">
              <Input placeholder="Name" required />
              <Input placeholder="Email" type="email" required />
              <Input placeholder="Password" type="password" required />
              <Input placeholder="Mobile (to be verified)" required />
              <Input placeholder="Join Date" type="date" />
              <Input placeholder="WhatsApp No." />
              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Search buyers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Company ID</th>
              <th className="border p-2">Company Name</th>
              <th className="border p-2">Buyer Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">City</th>
              <th className="border p-2">Deals In</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuyers.map((buyer) => (
              <tr key={buyer.id}>
                <td className="border p-2">{buyer.id}</td>
                <td className="border p-2">{buyer.companyId}</td>
                <td className="border p-2">{buyer.companyName}</td>
                <td className="border p-2">{buyer.buyerName}</td>
                <td className="border p-2">{buyer.email}</td>
                <td className="border p-2">{buyer.phone}</td>
                <td className="border p-2">{buyer.city}</td>
                <td className="border p-2">{buyer.dealsIn}</td>
                <td className="border p-2 flex space-x-2">
                  <Button size="icon" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
