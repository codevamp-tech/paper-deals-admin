"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PaperDealsBusinessReportPage() {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [search, setSearch] = useState("")

  const tableData = [
    {
      id: 1,
      date: "29/11/2024",
      buyer: "M/s DEMO BUYER",
      seller: "M/spawan Singh",
      amount: "10 /-",
      weight: "",
      commission: 0,
    },
    {
      id: 2,
      date: "30/11/2024",
      buyer: "M/s DEMO BUYER",
      seller: "M/s DEMO SELLER",
      amount: "50 /-",
      weight: "",
      commission: 0,
    },
  ]

  const filteredData = tableData.filter(
    (item) =>
      item.buyer.toLowerCase().includes(search.toLowerCase()) ||
      item.seller.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
      {/* Date Filters */}
      <div className="flex gap-2 items-center bg-blue-700 p-2 rounded">
        <Input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-40"
        />
        <Input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-40"
        />
        <Button className="bg-orange-500 hover:bg-orange-600">Filter</Button>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Preview</Button>
      </div>

      {/* Date Range Info */}
      <div className="border p-2 mt-2 inline-block">
        Date from {fromDate || "----"} to {toDate || "----"}
      </div>

      {/* Logo & Header */}
      <div className="mt-4">
        <img src="/logo.png" alt="Paper Deals Logo" className="h-8" />
      </div>
      <div className="bg-brown-700 text-white text-center text-xl font-bold p-2 mt-2">
        BUSINESS REPORT
      </div>
      <h2 className="text-center font-semibold mt-2">
        Business Report Date: {new Date().toLocaleDateString()}
      </h2>

      {/* Table */}
      <Card className="mt-4">
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Buyer</th>
                  <th className="p-2 border">Seller</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Weight</th>
                  <th className="p-2 border">Commission</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{row.date}</td>
                      <td className="p-2 border">{row.buyer}</td>
                      <td className="p-2 border">{row.seller}</td>
                      <td className="p-2 border">{row.amount}</td>
                      <td className="p-2 border">
                        {row.weight || "0"}
                      </td>
                      <td className="p-2 border">{row.commission}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
