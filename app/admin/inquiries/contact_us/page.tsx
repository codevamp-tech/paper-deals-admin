"use client"

import { useState } from "react"

export default function ContactUsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  // Dummy data
  const contactData = Array.from({ length: 66 }, (_, i) => ({
    id: 66 - i,
    name: ["Mukesh Mittal", "Mayank Singh", "Suraj Kumar", "Sachet Chaku", "Saakshi Dhaka", "Abhishek Tyagi"][i % 6],
    email: `user${i}@gmail.com`,
    mobile: "9876543210",
    message: "Read",
    createdAt: `2025-07-${String((i % 30) + 1).padStart(2, "0")} 11:33:22`,
    status: i % 2 === 0 ? "Completed" : "Pending",
  }))

  const totalPages = Math.ceil(contactData.length / perPage)
  const currentData = contactData.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        {["Copy", "CSV", "Excel", "PDF", "Print"].map((btn) => (
          <button
            key={btn}
            className="px-3 py-1 bg-gray-200 text-sm font-medium rounded hover:bg-gray-300"
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="flex justify-end mb-2">
        <label className="text-sm mr-2">Search:</label>
        <input
          type="text"
          className="border px-2 py-1 rounded text-sm"
          placeholder="Search..."
        />
      </div>

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
            {currentData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 border-b">{row.id}</td>
                <td className="px-3 py-2 border-b">{row.name}</td>
                <td className="px-3 py-2 border-b">{row.email}</td>
                <td className="px-3 py-2 border-b">{row.mobile}</td>
                <td className="px-3 py-2 border-b text-blue-600 cursor-pointer">Read</td>
                <td className="px-3 py-2 border-b">{row.createdAt}</td>
                <td className="px-3 py-2 border-b">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      row.status === "Completed"
                        ? "bg-green-100 text-green-600 border border-green-400"
                        : "bg-orange-100 text-orange-600 border border-orange-400"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-2 border-b text-blue-600 cursor-pointer">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * perPage + 1} to{" "}
          {Math.min(currentPage * perPage, contactData.length)} of {contactData.length} entries
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm border rounded ${currentPage === 1 ? "bg-gray-200 text-gray-400" : "hover:bg-gray-100"}`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 6).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 text-sm border rounded ${currentPage === num ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm border rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-400" : "hover:bg-gray-100"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
