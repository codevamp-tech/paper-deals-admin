"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const dummyData = [
  { id: 51, name: "yash bhardwaj", phone: "6395019000", createdAt: "2025-07-29 11:18:20", status: "Completed" },
  { id: 50, name: "tanish singh", phone: "9897969999", createdAt: "2025-07-25 10:44:08", status: "Completed" },
  { id: 49, name: "ajay gupta", phone: "9719305555", createdAt: "2025-07-10 09:33:07", status: "Completed" },
  { id: 48, name: "hello test", phone: "9658741230", createdAt: "2025-07-09 06:02:29", status: "Completed" },
  { id: 47, name: "vishal singh", phone: "9875641230", createdAt: "2025-07-09 05:57:01", status: "Completed" },
  { id: 46, name: "pawan kumar srivastava", phone: "6677892579", createdAt: "2025-07-09 04:24:32", status: "Pending" },
  { id: 45, name: "fjhkhjghjbkk", phone: "6785685747", createdAt: "2025-07-09 04:24:10", status: "Pending" },
  { id: 44, name: "gahgssg", phone: "9865786567", createdAt: "2025-07-09 04:23:56", status: "Pending" },
  { id: 43, name: "abhishek ty", phone: "5683268253", createdAt: "2025-07-09 04:23:07", status: "Rejected" },
  { id: 42, name: "Saakshi Dhaka", phone: "9696969506", createdAt: "2025-07-08 14:08:15", status: "Pending" },
]

export default function RequestCallPage() {
  const [search, setSearch] = useState("")

  const filtered = dummyData.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase()) ||
    row.phone.includes(search)
  )

  return (
    <Card className="m-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Request Call</CardTitle>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
      </CardHeader>
      <CardContent>
        {/* Export Buttons */}
        <div className="flex gap-2 mb-4">
          <Button variant="secondary">Copy</Button>
          <Button variant="secondary">CSV</Button>
          <Button variant="secondary">Excel</Button>
          <Button variant="secondary">PDF</Button>
          <Button variant="secondary">Print</Button>
        </div>

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
                  <td className="border px-3 py-2">{row.createdAt}</td>
                  <td className="border px-3 py-2">
                    {row.status === "Completed" && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Completed ✔</span>
                    )}
                    {row.status === "Pending" && (
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">Pending ⏳</span>
                    )}
                    {row.status === "Rejected" && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Rejected ❌</span>
                    )}
                  </td>
                  <td className="border px-3 py-2 text-blue-600 cursor-pointer">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (dummy) */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <p>Showing 1 to {filtered.length} of {dummyData.length} entries</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Previous</Button>
            <Button size="sm" variant="default">1</Button>
            <Button size="sm" variant="outline">2</Button>
            <Button size="sm" variant="outline">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
