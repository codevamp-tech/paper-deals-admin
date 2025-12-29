"use client"

import { useState, useEffect } from "react"
import Pagination from "@/components/pagination"
import Link from "next/link"

export default function SpotPriceEnquiryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [messageContent, setMessageContent] = useState("")

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



  const STATUS_MAP = {
    0: {
      label: "Pending",
      className: "bg-orange-100 text-orange-600 border-orange-400",
    },
    1: {
      label: "Completed",
      className: "bg-green-100 text-green-600 border-green-400",
    },
    2: {
      label: "Rejected",
      className: "bg-red-100 text-red-600 border-red-400",
    },
  }


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">View Live Stock Enquiry</h1>

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
                <td className="px-3 py-2 border-b">
                  {row.productList?.map(p => p.product_name).join(", ") || "-"}
                </td>
                <td className="px-3 py-2 border-b">
                  {row.productList?.map(p => p.seller_id).join(", ") || "-"}
                </td>
                <td className="px-3 py-2 border-b">{row.name}</td>
                <td className="px-3 py-2 border-b">{row.phone}</td>
                <td className="px-3 py-2 border-b">{row.email_id}</td>
                <td className="px-3 py-2 border-b">
                  <button
                    onClick={() => {
                      setMessageContent(row.message)
                      setIsMessageOpen(true)
                    }}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Read
                  </button>
                </td>

                <td className="px-3 py-2 border-b">{new Date(row.created_at).toLocaleString()}</td>
                <td className="px-3 py-2 border-b">
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${STATUS_MAP[row.status]?.className
                      }`}
                  >
                    {STATUS_MAP[row.status]?.label}
                  </span>

                </td>
                <td className="px-3 py-2 border-b">
                  <Link
                    href={`/admin/inquiries/spot_price/${row.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
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


      {isMessageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-3">Message</h2>

            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {messageContent || "No message available"}
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsMessageOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}
