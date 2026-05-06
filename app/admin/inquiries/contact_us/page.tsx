"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/pagination"

export default function ContactUsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [status, setStatus] = useState("")

  const statusMap: Record<number, string> = {
    0: "Pending",
    1: "Completed",
    2: "Rejected",
  }

  const fetchData = async (page = 1) => {
    setLoading(true)
    const res = await fetch(`https://paper-deal-server.onrender.com/api/contactUs/contact-us?page=${page}&limit=10`)
    const json = await res.json()
    setData(json.data)
    setTotalPages(json.totalPages)
    setLoading(false)
  }

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])

  const handleUpdate = async () => {
    if (!selectedRow) return
    await fetch(`https://paper-deal-server.onrender.com/api/contactUs/contact-us/${selectedRow.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    setSelectedRow(null)
    fetchData(currentPage)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Name", "Email Id", "Mobile No.", "Message", "Created At", "Status", "Action"].map((head) => (
                <th key={head} className="px-3 py-2 border-b text-left">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 border-b">{row.id}</td>
                <td className="px-3 py-2 border-b">{row.name}</td>
                <td className="px-3 py-2 border-b">{row.email_id}</td>
                <td className="px-3 py-2 border-b">{row.mobile_no}</td>
                <td className="px-3 py-2 border-b">{row.message}</td>
                <td className="px-4 py-2 border">
                  {row.created_at
                    ? new Date(row.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                    : "—"}
                </td>
                <td className="px-3 py-2 border-b">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${row.status === 1
                      ? "bg-green-100 text-green-600 border border-green-400"
                      : row.status === 0
                        ? "bg-orange-100 text-orange-600 border border-orange-400"
                        : "bg-red-100 text-red-600 border border-red-400"
                      }`}
                  >
                    {statusMap[row.status] ?? row.status}
                  </span>

                </td>
                <td
                  className="px-3 py-2 border-b text-blue-600 cursor-pointer"
                  onClick={() => {
                    setSelectedRow(row)
                    setStatus(row.status)
                  }}
                >
                  View
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      {/* Dialog */}
      <Dialog open={!!selectedRow} onOpenChange={() => setSelectedRow(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Contact Us Details</DialogTitle>
          </DialogHeader>
          {selectedRow && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <input className="border px-2 py-1 col-span-1" value={selectedRow.name} readOnly />
                <input className="border px-2 py-1 col-span-1" value={selectedRow.email_id} readOnly />
                <input className="border px-2 py-1 col-span-1" value={selectedRow.mobile_no} readOnly />
              </div>
              <textarea className="border w-full p-2" value={selectedRow.message} readOnly />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border px-2 py-1"
              >
                <option value={1}>Completed</option>
                <option value={0}>Pending</option>
                <option value={2}>Rejected</option>
              </select>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
