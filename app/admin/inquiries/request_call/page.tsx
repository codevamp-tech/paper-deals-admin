"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import Pagination from "@/components/pagination"

export default function RequestCallPage() {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<any | null>(null) // selected row for dialog
  const [status, setStatus] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Fetch all request calls
  useEffect(() => {
    fetch(`https://paper-deal-server.onrender.com/api/reqcall?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((d) => {
        setData(d.data)
        setTotalPages(d.totalPages)
      })
      .catch((err) => console.error(err))
  }, [page])

  console.log("data request", data);
  // Filtered list
  const filtered = Array.isArray(data)
    ? data.filter(
      (row) =>
        row.name?.toLowerCase().includes(search.toLowerCase()) ||
        row.phone?.includes(search)
    )
    : [];


  // Handle update
  const handleUpdate = async () => {
    if (!selected) return
    try {
      await fetch(`https://paper-deal-server.onrender.com/api/reqcall/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      // Update UI after saving
      setData((prev) =>
        prev.map((item) =>
          item.id === selected.id ? { ...item, status } : item
        )
      )
      setSelected(null) // close dialog
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="m-6">
      <div className="flex flex-row items-center justify-between">
        <div>Request Call</div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
      </div>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">ID</th>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Phone</th>
                <th className="border px-3 py-2">Created At</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{row.id}</td>
                  <td className="border px-3 py-2">{row.name}</td>
                  <td className="border px-3 py-2">{row.phone}</td>
                  <td className="border px-3 py-2">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  <td className="border px-3 py-2">
                    {row.status === 1 && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Completed </span>
                    )}
                    {row.status === 0 && (
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">Pending </span>
                    )}
                    {row.status === 2 && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Rejected </span>
                    )}
                  </td>
                  <td
                    className="border px-3 py-2 text-blue-600 cursor-pointer"
                    onClick={() => {
                      setSelected(row)
                      setStatus(row.status) // preload current status
                    }}
                  >
                    View
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      </div>

      {/* Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Request Call</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={selected.name}
                  disabled
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mobile No.</label>
                <input
                  type="text"
                  value={selected.phone}
                  disabled
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Select Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value={1}>Completed </option>
                  <option value={0}>Pending</option>
                  <option value={2}>Rejected </option>
                </select>
              </div>
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
