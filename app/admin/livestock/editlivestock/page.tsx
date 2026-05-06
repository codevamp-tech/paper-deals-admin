"use client"

import React, { useEffect, useState } from "react"
import { Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Pagination from "@/components/pagination"

type Seller = {
  id: number
  name: string
  email_address: string
}

type Stock = {
  id: number
  product_name: string
  seller: Seller
  shade: string
  gsm: string
  size: string
  weight: string
  stock_in_kg: string
  price_per_kg: string
}

const LiveStockTable = () => {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState<Stock | null>(null)

  const [searchTerm, setSearchTerm] = useState("")

  // ✅ Fetch data with pagination
  const fetchStocks = async (pageNum = 1) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/live-stocks/getEdit-stocks?page=${pageNum}&limit=10`
      )
      const data = await res.json()

      setStocks(data.data || [])
      setFilteredStocks(data.data || [])
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error("Error fetching stocks:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStocks(page)
  }, [page])

  // ✅ Handle search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStocks(stocks)
    } else {
      const lower = searchTerm.toLowerCase()
      setFilteredStocks(
        stocks.filter(
          (s) =>
            s.product_name.toLowerCase().includes(lower) ||
            s.seller.name.toLowerCase().includes(lower) ||
            s.shade.toLowerCase().includes(lower) ||
            s.gsm.toLowerCase().includes(lower) ||
            s.size.toLowerCase().includes(lower) ||
            s.weight.toLowerCase().includes(lower) ||
            s.stock_in_kg.toLowerCase().includes(lower) ||
            s.price_per_kg.toLowerCase().includes(lower)
        )
      )
    }
  }, [searchTerm, stocks])

  // ✅ Open edit modal
  const handleEdit = (stock: Stock) => {
    setEditData(stock)
    setEditOpen(true)
  }

  // ✅ Save edited stock
  const handleSave = async () => {
    if (!editData) return
    try {
      // 🚨 Strip out seller before sending
      const { seller, ...rest } = editData

      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/live-stocks/edit-stocks/${editData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...rest,
            seller_id: seller.id, // only send seller_id
          }),
        }
      )

      if (!res.ok) throw new Error("Failed to update stock")

      await fetchStocks(page) // reload list
      setEditOpen(false)
    } catch (error) {
      console.error("Error updating stock:", error)
    }
  }

  return (
    <div className="p-6">
      {/* 🔍 Search input */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold">Live Stocks</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-gray-300 border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">Product Name</th>
              <th className="p-2 border border-gray-300">Seller</th>
              <th className="p-2 border border-gray-300">Shade</th>
              <th className="p-2 border border-gray-300">Gsm</th>
              <th className="p-2 border border-gray-300">Size</th>
              <th className="p-2 border border-gray-300">Weight</th>
              <th className="p-2 border border-gray-300">Stock in Kg</th>
              <th className="p-2 border border-gray-300">Price Per Kg</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <tr key={stock.id} className="hover:bg-gray-50">
                  <td className="p-2 border border-gray-300">{stock.id}</td>
                  <td className="p-2 border border-gray-300">{stock.product_name}</td>
                  <td className="p-2 border border-gray-300">{stock.seller?.name}</td>
                  <td className="p-2 border border-gray-300">{stock.shade}</td>
                  <td className="p-2 border border-gray-300">{stock.gsm}</td>
                  <td className="p-2 border border-gray-300">{stock.size}</td>
                  <td className="p-2 border border-gray-300">{stock.weight}</td>
                  <td className="p-2 border border-gray-300">{stock.stock_in_kg}</td>
                  <td className="p-2 border border-gray-300">{stock.price_per_kg}</td>
                  <td className="p-2 border border-gray-300">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(stock)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="text-center p-4 text-gray-500 border border-gray-300"
                >
                  No stocks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* ✅ Pagination */}
      <div className="mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>

      {/* ✅ Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Stock</DialogTitle>
          </DialogHeader>

          {editData && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <Input
                  value={editData.product_name}
                  onChange={(e) =>
                    setEditData({ ...editData, product_name: e.target.value })
                  }
                />
              </div>

              {/* 🔒 Seller (read-only) */}
              <div>
                <label className="block text-sm font-medium mb-1">Seller</label>
                <Input value={editData.seller.name} readOnly />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Shade</label>
                <Input
                  value={editData.shade}
                  onChange={(e) =>
                    setEditData({ ...editData, shade: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GSM</label>
                <Input
                  value={editData.gsm}
                  onChange={(e) =>
                    setEditData({ ...editData, gsm: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Size</label>
                <Input
                  value={editData.size}
                  onChange={(e) =>
                    setEditData({ ...editData, size: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Weight</label>
                <Input
                  value={editData.weight}
                  onChange={(e) =>
                    setEditData({ ...editData, weight: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stock in Kg</label>
                <Input
                  value={editData.stock_in_kg}
                  onChange={(e) =>
                    setEditData({ ...editData, stock_in_kg: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price per Kg</label>
                <Input
                  value={editData.price_per_kg}
                  onChange={(e) =>
                    setEditData({ ...editData, price_per_kg: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LiveStockTable
