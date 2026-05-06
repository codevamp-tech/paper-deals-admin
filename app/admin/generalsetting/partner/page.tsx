"use client"

import { useEffect, useState } from "react"
import Pagination from "@/components/pagination"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Partner = {
  id: number
  logo_name: string
  logo_picture: string
  status: number
  logo_type: 'b2c' | 'b2b'
  created_at: string
}

export default function AssociationPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Partner | null>(null)
  const [editName, setEditName] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [logoType, setLogoType] = useState<'b2c' | 'b2b'>('b2c')

  // ✅ pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  const fetchPartners = async (page = 1) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/bottom-logo?page=${page}&limit=${limit}`
      )
      const data = await res.json()

      setPartners(data.data || [])
      if (data.total) setTotalPages(Math.ceil(data.total / limit))
    } catch (err) {
      console.error("Error fetching partners:", err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPartners(currentPage)
  }, [currentPage])

  // ✅ Create new partner
  const handleCreate = async (formData: FormData) => {
    try {
      await fetch("https://paper-deal-server.onrender.com/api/bottom-logo/create", {
        method: "POST",
        body: formData,
      })
      fetchPartners(currentPage)
    } catch (err) {
      console.error("Error creating partner:", err)
    }
  }

  // ✅ Edit
  const handleEdit = (partner: Partner) => {
    setSelected(partner)
    setEditName(partner.logo_name)
    setLogoType(partner.logo_type || 'b2c')
    setOpen(true)
  }

  // ✅ Save edit
  const handleSave = async () => {
    if (!selected) return
    try {
      const formData = new FormData()
      formData.append("logo_name", editName)
      formData.append("status", "1")
      formData.append("logo_type", logoType)
      if (file) formData.append("logo_picture", file)

      await fetch(`https://paper-deal-server.onrender.com/api/bottom-logo/update/${selected.id}`, {
        method: "PUT",
        body: formData,
      })

      fetchPartners(currentPage)
    } catch (err) {
      console.error("Error updating partner:", err)
    }
    setOpen(false)
    setFile(null)
    setLogoType('b2c')
  }

  // ✅ Delete
  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://paper-deal-server.onrender.com/api/bottom-logo/${id}`, {
        method: "DELETE",
      })
      fetchPartners(currentPage)
    } catch (err) {
      console.error("Error deleting partner:", err)
    }
  }

  // ✅ Handle new form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      alert("Please upload a logo image")
      return
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("logo_name", editName)
    formData.append("status", "1")
    formData.append("logo_type", logoType)

    handleCreate(formData)
    setEditName("")
    setFile(null)
    setLogoType('b2c')
  }


  return (
    <div className="p-6 space-y-8">
      {/* Add Association Partner Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Add ASSOCIATION PARTNER</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-4 flex items-center gap-4"
        >
          <div>
            <label className="block text-sm mb-1">Bottom Logo</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">Logo Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Logo Name"
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Logo Type</label>
            <select
              value={logoType}
              onChange={(e) => setLogoType(e.target.value as 'b2c' | 'b2b')}
              className="border rounded px-2 py-1"
            >
              <option value="b2c">B2C (Website)</option>
              <option value="b2b">B2B (Admin)</option>
            </select>
          </div>
          <div className="self-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Association Partner Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">ASSOCIATION PARTNER</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Logo</th>
                  <th className="px-4 py-2 border">Logo Name</th>
                  <th className="px-4 py-2 border">Logo Type</th>
                  <th className="px-4 py-2 border">Created At</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr key={partner.id} className="border-t">
                    <td className="px-4 py-2 border">{partner.id}</td>
                    <td className="px-4 py-2 border">
                      {partner.logo_picture ? (
                        <img
                          src={partner.logo_picture}
                          alt={partner.logo_name}
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="px-4 py-2 border">{partner.logo_name}</td>
                    <td className="px-4 py-2 border">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${partner.logo_type === 'b2c'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                        }`}>
                        {partner.logo_type === 'b2c' ? 'B2C (Website)' : 'B2B (Admin)'}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(partner.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEdit(partner)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(partner.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ✅ Pagination Component */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Partner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <label className="block text-sm">Logo Name</label>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <label className="block text-sm">Upload New Logo</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border rounded px-2 py-1"
            />

            <label className="block text-sm">Logo Type</label>
            <select
              value={logoType}
              onChange={(e) => setLogoType(e.target.value as 'b2c' | 'b2b')}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="b2c">B2C (Website)</option>
              <option value="b2b">B2B (Admin)</option>
            </select>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
