"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function PaperDealsstatusreportPage() {
  const [search, setSearch] = useState("")

  const tableData = [
    { id: 1, dealId: "PD-1001", buyer: "ABC Pvt Ltd", seller: "XYZ Traders", amount: "₹50,000", date: "2025-08-11" },
    { id: 2, dealId: "PD-1002", buyer: "Global Impex", seller: "Metro Papers", amount: "₹75,000", date: "2025-08-10" },
    { id: 3, dealId: "PD-1003", buyer: "Prime Papers", seller: "City Traders", amount: "₹30,000", date: "2025-08-09" },
  ]

  const filteredData = tableData.filter(
    (item) =>
      item.dealId.toLowerCase().includes(search.toLowerCase()) ||
      item.buyer.toLowerCase().includes(search.toLowerCase()) ||
      item.seller.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Paper Deals status report</CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            <Button>
              <Search className="w-4 h-4 mr-2" /> Search
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Deal ID</th>
                  <th className="p-2 border">Buyer</th>
                  <th className="p-2 border">Seller</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{index + 1}</td>
                      <td className="p-2 border">{row.dealId}</td>
                      <td className="p-2 border">{row.buyer}</td>
                      <td className="p-2 border">{row.seller}</td>
                      <td className="p-2 border">{row.amount}</td>
                      <td className="p-2 border">{row.date}</td>
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
