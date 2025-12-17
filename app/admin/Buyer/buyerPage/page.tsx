"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import Pagination from "@/components/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { MoreVertical } from "lucide-react"

type Organization = {
  id: number
  organizations: string
  contact_person: string
  email: string
  phone: string
  city: string
  materials_used_names: string[]
}

type Buyer = {
  id: number
  name: string
  email_address: string
  phone_no: string
  active_status: number
  approved: number | string
  organization: Organization
}

export default function BuyerTable() {
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    password: "",
    phone_no: "",
    join_date: "",
    whatsapp_no: "",
  })

  const fetchBuyers = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/users/getBuyer?page=${page}&limit=10`
      )
      const data = await res.json()
      setBuyers(data.data || [])
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error("Error fetching buyers:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBuyers()
  }, [page])

  const handleAddBuyer = async () => {
    try {
      await fetch("https://paper-deal-server.onrender.com/api/users/create-buyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email_address: formData.email_address,
          password: formData.password,
          phone_no: formData.phone_no,
          join_date: formData.join_date,
          whatsapp_no: formData.whatsapp_no,
        }),
      })
      setOpenDialog(false)
      setFormData({
        name: "",
        email_address: "",
        password: "",
        phone_no: "",
        join_date: "",
        whatsapp_no: "",
      })
      fetchBuyers()
    } catch (error) {
      console.error("Error adding buyer:", error)
    }
  }

  const handleEdit = (buyer: Buyer) => {
    alert(`Edit Buyer: ${buyer.name}`)
  }

  const handleDelete = async (buyer: Buyer) => {
    {
      try {
        const res = await fetch(
          `https://paper-deal-server.onrender.com/api/users/deletebuyer/${buyer.id}`,
          { method: "DELETE" }
        )
        const data = await res.json()
        if (res.ok) {
          toast.success("Buyer deleted successfully")
          fetchBuyers()
        } else {
          toast.error("Failed to delete buyer")
        }
      } catch (error) {
        console.error("Error deleting buyer:", error)
        toast.error("Error deleting buyer")
      }
    }
  }

  const handleToggleStatus = async (buyer: Buyer) => {
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/users/toggle-buyer-status/${buyer.id}`,
        { method: "PATCH" }
      )
      const data = await res.json()
      if (res.ok) {
        toast.success("Buyer status updated")
        fetchBuyers()
      } else {
        toast.error(data.error || "Failed to update buyer status")
      }
    } catch (error) {
      toast.error("Error toggling buyer status")
    }
  }

  const handleToggleProductStatus = async (id: number) => {
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/users/product-buyer-status/${id}`,
        { method: "PUT" }
      )
      if (res.ok) {
        fetchBuyers()
      }
    } catch (error) {
      console.error("Error toggling seller status:", error)
    }
  }

  const filteredBuyers = buyers.filter(
    (buyer) =>
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.email_address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Buyers</h2>
        <div className="flex gap-2">
          <Button onClick={() => setOpenDialog(true)}>+ Add Buyer</Button>
        </div>
      </div>
      <Input
        placeholder="Search buyers..."
        className="w-52 mb-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">ID</th>
              {/* <th className="p-2 border">Company Id</th> */}
              <th className="p-2 border">Company Name</th>
              <th className="p-2 border">Buyer Name</th>
              <th className="p-2 border">Buyer Email</th>
              <th className="p-2 border">Buyer Phone</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Deals In</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredBuyers.length > 0 ? (
              filteredBuyers.map((buyer) => (
                <tr key={buyer.id}>
                  <td className="p-2 border">KPDB_{buyer.id}</td>
                  {/* <td className="p-2 border">{buyer.organization?.id}</td> */}
                  <td className="p-2 border">{buyer.organization?.organizations || "-"}</td>
                  <td className="p-2 border">{buyer.name}</td>
                  <td className="p-2 border">{buyer.email_address}</td>
                  <td className="p-2 border">{buyer.phone_no}</td>
                  <td className="p-2 border">{buyer.organization?.city || "-"} </td>
                  <td className="p-2 border">
                    {buyer.organization?.materials_used_names?.join(", ") || "-"}
                  </td>

                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${buyer.active_status === 1 ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                      {buyer.active_status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-2 border">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm"><MoreVertical className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(buyer)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(buyer)}>
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleProductStatus(buyer.id)}
                          className="cursor-pointer"
                        >
                          {Number(buyer.approved) === 1
                            ? "Disable Product Upload"
                            : "Enable Product Upload"}
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleToggleStatus(buyer)}>
                          {buyer.active_status === 1 ? "Deactivate Account" : "Activate Account"}
                        </DropdownMenuItem>

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="p-4 text-center">
                  No buyers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      </div>

      {/* Add Buyer Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Buyer</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={formData.email_address}
              onChange={(e) =>
                setFormData({ ...formData, email_address: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Input
              placeholder="Mobile (to be verified)"
              value={formData.phone_no}
              onChange={(e) =>
                setFormData({ ...formData, phone_no: e.target.value })
              }
            />
            <Input
              type="date"
              placeholder="Join Date"
              value={formData.join_date}
              onChange={(e) =>
                setFormData({ ...formData, join_date: e.target.value })
              }
            />
            <Input
              placeholder="WhatsApp No."
              value={formData.whatsapp_no}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp_no: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBuyer}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
