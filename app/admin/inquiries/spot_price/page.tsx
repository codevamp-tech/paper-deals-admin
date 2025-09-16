"use client"

import { useState, useEffect } from "react"
import Pagination from "@/components/pagination"

export default function SpotPriceEnquiryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [enquiries, setEnquiries] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [status, setStatus] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const perPage = 10

  // Fetch enquiries from API
  const fetchEnquiries = async (page = currentPage) => {
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/spotPriceEnqiry/get-spotenquiries?page=${page}&limit=${perPage}`
      )
      const data = await res.json()
      setEnquiries(data.data || [])
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      console.error("Failed to fetch enquiries:", err)
    }
  }

  useEffect(() => {
    fetchEnquiries(currentPage)
  }, [currentPage])

  const openDialog = (enquiry) => {
    setSelectedEnquiry(enquiry)
    setStatus(enquiry.status) // 0 = Pending, 1 = Completed, 2 = Rejected
    setIsDialogOpen(true)
  }

  const updateStatus = async () => {
    try {
      await fetch(`https://paper-deal-server.onrender.com/api/spotPriceEnqiry/${selectedEnquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      setIsDialogOpen(false)
      fetchEnquiries(currentPage) // refresh current page
    } catch (err) {
      console.error("Failed to update status:", err)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">View Spot Price Enquiry</h1>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Product Name", "Seller Name", "Name", "Phone", "Email ID", "Message", "Created At", "Status", "Action"].map(
                (head) => (
                  <th key={head} className="px-3 py-2 border-b text-left">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {enquiries.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 border-b">{row.id}</td>
                <td className="px-3 py-2 border-b">{row.ProductNew?.product_name || "-"}</td>
                <td className="px-3 py-2 border-b">{row.ProductNew?.seller_id || "-"}</td>
                <td className="px-3 py-2 border-b">{row.name}</td>
                <td className="px-3 py-2 border-b">{row.phone}</td>
                <td className="px-3 py-2 border-b">{row.email_id}</td>
                <td className="px-3 py-2 border-b text-blue-600 cursor-pointer">{row.message}</td>
                <td className="px-3 py-2 border-b">{new Date(row.created_at).toLocaleString()}</td>
                <td className="px-3 py-2 border-b">
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${row.status === 1
                      ? "bg-green-100 text-green-600 border-green-400"
                      : row.status === 2
                        ? "bg-red-100 text-red-600 border-red-400"
                        : "bg-orange-100 text-orange-600 border-orange-400"
                      }`}
                  >
                    {row.status === 1 ? "Completed" : row.status === 2 ? "Rejected" : "Pending"}
                  </span>
                </td>
                <td className="px-3 py-2 border-b text-blue-600 cursor-pointer" onClick={() => openDialog(row)}>
                  View
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      {/* Update Dialog */}
      {isDialogOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Update Status</h2>
            <p className="mb-2">Name: {selectedEnquiry.name}</p>
            <p className="mb-2">Product: {selectedEnquiry.ProductNew?.product_name || "-"}</p>

            <select
              className="w-full border px-2 py-1 rounded mb-4"
              value={status}
              onChange={(e) => setStatus(parseInt(e.target.value))}
            >
              <option value={0}>Pending</option>
              <option value={1}>Completed</option>
              <option value={2}>Rejected</option>
            </select>

            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 border rounded hover:bg-gray-100" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={updateStatus}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
