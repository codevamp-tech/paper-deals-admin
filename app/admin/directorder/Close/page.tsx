"use client"

import Pagination from "@/components/pagination"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Edit } from "lucide-react"
import { useState, useEffect } from "react"


type Deal = {
  id: number
  deal_id: string
  buyer_id: string
  seller_id: string
  product_description: string
  price_per_kg: number
  quantity_in_kg: number
  deal_amount: number
  remarks: string
  created_on: string
}

export default function CloseDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  // Fetch deals API
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://paper-deal-server.onrender.com/api/dashboard/closed?page=${page}`)
        const data = await res.json()

        if (data.success) {
          setDeals(data.deals || [])
          setTotalPages(data.pagination?.pages || 1)
        }
      } catch (err) {
        console.error("Error fetching deals:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [page])

  // Search filter
  const filteredDeals = deals.filter(deal =>
    Object.values(deal).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Sorting
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    const aStr = aValue?.toString().toLowerCase() || ""
    const bStr = bValue?.toString().toLowerCase() || ""

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
    // TODO: Implement export feature
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Close Deals</h1>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
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
          {loading ? (
            <div className="text-center py-6 text-gray-500">Loading...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      {[
                        { key: "deal_id", label: "Deal ID" },
                        { key: "buyer_id", label: "Buyer ID" },
                        { key: "seller_id", label: "Seller ID" },
                        { key: "product_description", label: "Product Description" },
                        { key: "price_per_kg", label: "Price in Kg" },
                        { key: "quantity_in_kg", label: "Quantity in Kg" },
                        { key: "deal_amount", label: "Total Amount" },
                        { key: "remarks", label: "Remarks" },
                        { key: "created_on", label: "Date" },
                        { key: "action", label: "Action" },
                      ].map(col => (
                        <th
                          key={col.key}
                          className="p-2 border border-gray-200 text-left cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort(col.key)}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDeals.map((deal, index) => (
                      <tr key={deal.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-2 border border-gray-200">{deal.deal_id}</td>
                        <td className="p-2 border border-gray-200">  {deal.buyerUser?.name || "Unknown"}</td>
                        <td className="p-2 border border-gray-200">{deal.sellerUser?.name}  </td>
                        <td className="p-2 border border-gray-200">{deal.product_description}</td>
                        <td className="p-2 border border-gray-200">{deal.price_per_kg}</td>
                        <td className="p-2 border border-gray-200">{deal.quantity_in_kg?.toLocaleString()}</td>
                        <td className="p-2 border border-gray-200">{deal.deal_amount?.toLocaleString()}</td>
                        <td className="p-2 border border-gray-200">{deal.remarks}</td>
                        <td className="p-2 border border-gray-200 text-xs">
                          {new Date(deal.created_on).toLocaleString()}
                        </td>
                        {/* ✅ Action column */}
                        <td className="p-2 border border-gray-200">
                          <button
                            onClick={() => console.log("Edit deal:", deal.id)} // replace with real action
                            className="p-1 rounded hover:bg-gray-200"
                            title="Edit deal"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                        </td>
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

              {/* Pagination */}
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={(newPage: number) => setPage(newPage)}
              />

            </>
          )}
        </CardContent>
      </Card >
    </div >
  )
}
