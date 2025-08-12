"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"

const currentDeals = [
  {
    dealId: "00060",
    buyerId: "KPDB_3",
    sellerId: "KPDS_92",
    productDescription: "p66",
    priceInKg: 20,
    quantityInKg: 42,
    totalAmount: 840,
    remarks: "we",
    date: "2025-07-11 09:56:31",
    status: "Active"
  },
  {
    dealId: "00059",
    buyerId: "KPDB_81",
    sellerId: "KPDS_75",
    productDescription: "Maka",
    priceInKg: 20,
    quantityInKg: 50,
    totalAmount: 1000,
    remarks: "ggdkgd",
    date: "2025-07-09 17:02:32",
    status: "Active"
  },
  {
    dealId: "00058",
    buyerId: "KPDB_7",
    sellerId: "KPDS_8",
    productDescription: "duplex",
    priceInKg: 5,
    quantityInKg: 50000,
    totalAmount: 250000,
    remarks: "mix gsm",
    date: "2025-07-09 11:06:43",
    status: "Active"
  },
  {
    dealId: "00057",
    buyerId: "KPDB_7",
    sellerId: "KPDS_8",
    productDescription: "jk",
    priceInKg: 20,
    quantityInKg: 10000,
    totalAmount: 200000,
    remarks: "copier a4",
    date: "2025-07-09 10:14:24",
    status: "Active"
  },
  {
    dealId: "00056",
    buyerId: "KPDB_81",
    sellerId: "KPDS_50",
    productDescription: "test",
    priceInKg: 30,
    quantityInKg: 25,
    totalAmount: 750,
    remarks: "testtt",
    date: "2025-07-09 08:30:15",
    status: "Active"
  }
]

export default function CloseDealsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")

  const filteredDeals = currentDeals.filter(deal =>
    Object.values(deal).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (!sortField) return 0
    
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }
    
    const aStr = aValue.toString().toLowerCase()
    const bStr = bValue.toString().toLowerCase()
    
    if (sortDirection === "asc") {
      return aStr.localeCompare(bStr)
    } else {
      return bStr.localeCompare(aStr)
    }
  })

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return "↕"
    return sortDirection === "asc" ? "↑" : "↓"
  }

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`)
    // Export functionality would be implemented here
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Close Deals</h1>
  

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button 
                onClick={() => handleExport('copy')}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                Copy
              </button>
              <button 
                onClick={() => handleExport('csv')}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                CSV
              </button>
              <button 
                onClick={() => handleExport('excel')}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                Excel
              </button>
              <button 
                onClick={() => handleExport('pdf')}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                PDF
              </button>
              <button 
                onClick={() => handleExport('print')}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                Print
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Search:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Search deals..."
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th 
                    className="p-2 border border-gray-200 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('dealId')}
                  >
                    Deal ID {getSortIcon('dealId')}
                  </th>
                  <th 
                    className="p-2 border border-gray-200 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('buyerId')}
                  >
                    Buyer Id {getSortIcon('buyerId')}
                  </th>
                  <th 
                    className="p-2 border border-gray-200 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('sellerId')}
                  >
                    Seller Id {getSortIcon('sellerId')}
                  </th>
                  <th 
                    className="p-2 border border-gray-200 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('productDescription')}
                  >
                    Product Description {getSortIcon('productDescription')}
                  </th>
                  <th 
                    className="p-2 border border-gray-200 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('priceInKg')}
                  >
                    Price in Kg {getSortIcon('priceInKg')}
                  </th>
                  <th 
                    className="p-2 border border-gray-200 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('quantityInKg')}
                  >
                    Quantity in Kg {getSortIcon('quantityInKg')}
                  </th>
                  <th 
                    className="p-2 border border-gray-200 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('totalAmount')}
                  >
                    Total Amount {getSortIcon('totalAmount')}
                  </th>
                  <th 
                    className="p-2 border border-gray-200 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('remarks')}
                  >
                    Remarks {getSortIcon('remarks')}
                  </th>
                  <th 
                    className="p-2 border border-gray-200 text-left cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('date')}
                  >
                    Date {getSortIcon('date')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDeals.map((deal, index) => (
                  <tr key={deal.dealId} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-2 border border-gray-200">{deal.dealId}</td>
                    <td className="p-2 border border-gray-200">{deal.buyerId}</td>
                    <td className="p-2 border border-gray-200">{deal.sellerId}</td>
                    <td className="p-2 border border-gray-200">{deal.productDescription}</td>
                    <td className="p-2 border border-gray-200">{deal.priceInKg}</td>
                    <td className="p-2 border border-gray-200">{deal.quantityInKg.toLocaleString()}</td>
                    <td className="p-2 border border-gray-200">{deal.totalAmount.toLocaleString()}</td>
                    <td className="p-2 border border-gray-200">{deal.remarks}</td>
                    <td className="p-2 border border-gray-200 text-xs">{deal.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {sortedDeals.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No deals found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}