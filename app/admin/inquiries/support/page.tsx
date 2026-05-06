"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronUp, ChevronDown, X, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ExportActions from "@/components/exportAction"

type Support = {
  id: number
  subject: string
  name: string
  phone: string
  email: string
  message: string
  fullMessage: string
  createdAt: string
  status: string
}

type SortField = keyof Support
type SortDirection = "asc" | "desc" | null

export default function SupportPage() {
  const [supports, setSupports] = useState<Support[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [selectedTicket, setSelectedTicket] = useState<Support | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState("")
  // Pagination
  const [page, setPage] = useState(1)
  const [limit] = useState(10) // per page
  const [totalPages, setTotalPages] = useState(1)

  // Fetch support tickets
  const fetchSupports = async () => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:5000/api/support?page=${page}&limit=${limit}`)
      const data = await res.json()
      setSupports(data.supports || [])  // <- only the array
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      console.error("Error fetching supports:", err)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchSupports()
  }, [page])   // 👈 refetch when page changes


  // Sort handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortField(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  let filteredData = supports.filter((item) =>
    Object.values(item).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (sortField && sortDirection) {
    filteredData = [...filteredData].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      const aStr = aValue?.toString().toLowerCase()
      const bStr = bValue?.toString().toLowerCase()

      return sortDirection === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr)
    })
  }

  // Modal open/close
  const openModal = (ticket: Support) => {
    setSelectedTicket(ticket)
    setStatus(ticket.status)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }

  // Update status
  const handleUpdate = async () => {
    if (!selectedTicket) return
    try {
      await fetch(`http://localhost:5000/api/support/${selectedTicket.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      fetchSupports()
      closeModal()
    } catch (err) {
      console.error("Error updating:", err)
    }
  }

  // Delete support
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/support/${id}`, {
        method: "DELETE",
      })
      fetchSupports()
    } catch (err) {
      console.error("Error deleting:", err)
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="text-gray-400">↕</span>
    if (sortDirection === "asc") return <ChevronUp className="w-4 h-4 inline ml-1" />
    if (sortDirection === "desc") return <ChevronDown className="w-4 h-4 inline ml-1" />
    return <span className="text-gray-400">↕</span>
  }

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <Check className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case 1:
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        )
      case 2:
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200">
            Unknown
          </Badge>
        )
    }
  }


  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="p-6 border-b flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Support</h1>
          <div className="flex items-center gap-2">
            <ExportActions data={filteredData} fileName="support-tickets" />
            <label htmlFor="search" className="text-sm font-medium text-gray-700">
              Search:
            </label>
            <Input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th onClick={() => handleSort("id")} className="px-6 py-3 cursor-pointer">
                  ID <SortIcon field="id" />
                </th>
                <th onClick={() => handleSort("subject")} className="px-6 py-3 cursor-pointer">
                  Subject <SortIcon field="subject" />
                </th>
                <th onClick={() => handleSort("name")} className="px-6 py-3 cursor-pointer">
                  Name <SortIcon field="name" />
                </th>
                <th>Phone</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.subject}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">
                    {new Date(item.created_at).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(Number(item.status))}
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openModal(item)}>
                      View
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center p-4 border-t">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>

          <span>
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTicket && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader className="flex justify-between items-center">
              <DialogTitle>View Support</DialogTitle>
              <Button variant="ghost" size="sm" onClick={closeModal}>
                <X className="w-5 h-5" />
              </Button>
            </DialogHeader>

            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {selectedTicket.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedTicket.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedTicket.phone}
              </p>
              <p>
                <strong>Message:</strong> {selectedTicket.fullMessage}
              </p>

              <div className="mt-4">
                <label className="block mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value={0}>Completed</option>
                  <option value={1}>Pending</option>
                  <option value={2}>Rejected</option>
                </select>
              </div>
            </div>

            <DialogFooter className="mt-6 flex justify-end gap-3">
              <Button variant="default" onClick={handleUpdate}>
                Update
              </Button>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  )
}
