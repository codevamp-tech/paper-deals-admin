"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus } from "lucide-react"
import Pagination from "@/components/pagination"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type Seller = {
  id: number
  name: string
  email_address: string
  phone_no: string
  active_status: number
  approved: string
  organization?: {
    organizations: string
    contact_person: string
    city: string
    materials_used: string
  } | null
}

export default function SellerPage() {
  const [sellers, setSellers] = useState<Seller[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false) // track mode
  const [editId, setEditId] = useState<number | null>(null) // track seller id

  // form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    joinDate: "",
    whatsapp: "",
  })

  const fetchSellers = async (page: number) => {
    setLoading(true)
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/getallsellers?user_type=2&page=${page}`
      )
      const data = await res.json()
      setSellers(data.data || [])
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error("Error fetching sellers:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSellers(currentPage)
  }, [currentPage])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      const url = isEdit
        ? `http://localhost:5000/api/users/updateseller/${editId}`
        : "http://localhost:5000/api/users/addseller"

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setOpen(false)
        setIsEdit(false)
        setEditId(null)
        fetchSellers(currentPage) // refresh list
      }
    } catch (error) {
      console.error("Error saving seller:", error)
    }
  }

  // open dialog in edit mode
  const handleEdit = (seller: Seller) => {
    setFormData({
      name: seller.name,
      email: seller.email_address,
      password: "", // don’t prefill password
      mobile: seller.phone_no,
      joinDate: "",
      whatsapp: seller.phone_no,
    })
    setEditId(seller.id)
    setIsEdit(true)
    setOpen(true)
  }

  // open dialog in add mode
  const handleAdd = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      mobile: "",
      joinDate: "",
      whatsapp: "",
    })
    setIsEdit(false)
    setEditId(null)
    setOpen(true)
  }

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Sellers</h2>
        <Button className="flex items-center gap-2" onClick={handleAdd}>
          <Plus size={16} />
          Add Seller
        </Button>
      </div>

      {/* Sellers Table */}
      {loading ? (
        <p>Loading sellers...</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Company Name</th>
                <th className="px-4 py-2 border">Seller Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Mobile</th>
                <th className="px-4 py-2 border">City</th>
                <th className="px-4 py-2 border">Deals In</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller.id} className="border-t">
                  <td className="px-4 py-2 border">{seller.id}</td>
                  <td className="px-4 py-2 border">
                    {seller.organization?.organizations || "-"}
                  </td>
                  <td className="px-4 py-2 border">{seller.name}</td>
                  <td className="px-4 py-2 border">{seller.email_address}</td>
                  <td className="px-4 py-2 border">{seller.phone_no}</td>
                  <td className="px-4 py-2 border">
                    {seller.organization?.city || "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {seller.organization?.materials_used || "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    <Badge
                      className={
                        seller.active_status === 1
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }
                    >
                      {seller.active_status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(seller)}
                      className="flex items-center gap-1"
                    >
                      <Edit size={14} /> Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>

      {/* Add/Edit Seller Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Seller" : "Add Seller"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            <Input
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            {!isEdit && (
              <Input
                name="password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
            )}
            <Input
              name="mobile"
              placeholder="Enter Mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <Input
              name="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={handleChange}
            />
            <Input
              name="whatsapp"
              placeholder="WhatsApp No."
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>{isEdit ? "Update" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
