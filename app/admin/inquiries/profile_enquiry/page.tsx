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
import { getCookie } from "@/hooks/use-cookies"

export default function EnquiryPage() {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<any | null>(null)
  const [status, setStatus] = useState<number>(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10
  const token = getCookie("token");

  // fetch enquiries
  useEffect(() => {
    fetch(`http://localhost:5000/api/enquiry/enquiries?page=${page}&limit=${limit}&role=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
      .then((res) => res.json())
      .then((d) => {
        setData(d.enquiries || [])
        setTotalPages(d.totalPages || 1)
      })
      .catch((err) => console.error(err))
  }, [page])

  // update enquiry
  const handleUpdate = async () => {
    if (!selected) return
    try {
      await fetch(`http://localhost:5000/api/enquiry/enquiries/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      setData((prev) =>
        prev.map((item) =>
          item.id === selected.id ? { ...item, status } : item
        )
      )
      setSelected(null)
    } catch (err) {
      console.error(err)
    }
  }

  // filtered
  const filtered = data.filter(
    (row) =>
      row.buyer?.name?.toLowerCase().includes(search.toLowerCase()) || // ✅ check buyer name
      (row.phone && row.phone.toString().includes(search)) ||
      row.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="m-6">
      <div className="flex flex-row items-center justify-between">
        <div>Enquiry Show</div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">ID</th>
                <th className="border px-3 py-2">Seller Id</th>
                <th className="border px-3 py-2">Buyer</th>
                <th className="border px-3 py-2">Phone</th>
                <th className="border px-3 py-2">City</th>
                <th className="border px-3 py-2">Category</th>
                <th className="border px-3 py-2">Product</th>
                <th className="border px-3 py-2">Gsm</th>
                <th className="border px-3 py-2">Shade</th>
                <th className="border px-3 py-2">Quantity (Kg)</th>
                <th className="border px-3 py-2">Remarks</th>
                <th className="border px-3 py-2">Created At</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{row.id}</td>
                  <td className="border px-3 py-2">KPDS_{row.user_id}</td>
                  <td className="border px-3 py-2">
                    {row.buyer?.name || "N/A"}
                  </td>
                  <td className="border px-3 py-2">{row.phone}</td>
                  <td className="border px-3 py-2">{row.city}</td>
                  <td className="border px-3 py-2">{row.category?.name}</td>
                  <td className="border px-3 py-2">{row.product}</td>
                  <td className="border px-3 py-2">{row.gsm}</td>
                  <td className="border px-3 py-2">{row.shade}</td>
                  <td className="border px-3 py-2">{row.weight}</td>
                  <td className="border px-3 py-2">{row.remarks}</td>
                  <td className="border px-3 py-2">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  <td className="border px-3 py-2">
                    {row.status === 1 && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        Completed
                      </span>
                    )}
                    {row.status === 0 && (
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                        Pending
                      </span>
                    )}
                    {row.status === 2 && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td
                    className="border px-3 py-2 text-blue-600 cursor-pointer"
                    onClick={() => {
                      setSelected(row)
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

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      {/* Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Enquiry</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <p><b>Buyer:</b> {selected.buyer?.name || "N/A"}</p>
              <p><b>Email:</b> {selected.buyer?.email_address || "N/A"}</p>
              <p><b>Phone:</b> {selected.phone}</p>
              <p><b>City:</b> {selected.city}</p>
              <p><b>Category:</b> {selected.category_id}</p>
              <p><b>Product:</b> {selected.product}</p>
              <p><b>GSM:</b> {selected.gsm}</p>
              <p><b>Shade:</b> {selected.shade}</p>
              <p><b>Quantity:</b> {selected.weight}</p>
              <p><b>Remarks:</b> {selected.remarks}</p>
              <p><b>Created At:</b> {new Date(selected.created_at).toLocaleString()}</p>

              <div>
                <label className="block text-sm font-medium">Update Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value={1}> Completed</option>
                  <option value={0}> Pending</option>
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
