"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCookie } from "@/hooks/use-cookies"
import Pagination from "@/components/pagination"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import StockManagementPage from "@/components/addProduct"
import { getUserFromToken } from "@/hooks/use-token"
import { toast } from "sonner"

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // For Edit Dialog
  const [open, setOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const [file, setFile] = useState<File | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [excelFile, setExcelFile] = useState<File | null>(null)
  const [showBlockedDialog, setShowBlockedDialog] = useState(false);
  const user = getUserFromToken();
  const userRole = user?.user_role
  const isApproved = Number(user?.approved) === 1;

  const token = getCookie("token")
  const fetchProducts = async (pageNumber: number) => {
    try {
      setLoading(true)
      if (!token) throw new Error("No token in cookies")

      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/stocks/get-products?user_type=seller&page=${pageNumber}&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      )

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || "Failed to fetch products")
      }

      const data = await res.json()
      setProducts(data.data || [])
      setTotalPages(data.totalPages || 0)   // <-- FIXED
      setPage(data.page || 1)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(page)
  }, [page])

  const handleExcelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setExcelFile(e.target.files[0])
    }
  }

  const handleExcelUpload = async () => {
    if (!excelFile) return alert("Please select an Excel file first")


    try {
      const form = new FormData()
      form.append("file", excelFile)

      const res = await fetch("https://paper-deal-server.onrender.com/api/stocks/upload-excel", {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to upload Excel file")

      toast.success("Excel uploaded successfully")

      fetchProducts(page)
      // Reset the input
      setExcelFile(null);
    } catch (error) {
      console.error(error)
      toast.error("Error uploading Excel file")
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Stocks</h2>

      </div>


      <div>
        <div>
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-auto rounded-md border">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Seller Name</th>
                    <th className="px-4 py-2 border">Product Name</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Sub Product</th>
                    <th className="px-4 py-2 border">Category</th>
                    <th className="px-4 py-2 border">Shade</th>
                    <th className="px-4 py-2 border">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id} className="border-t">
                        <td className="px-4 py-2 border">{product.id}</td>
                        <td className="px-4 py-2 border">{product.seller?.name || "Seller not found"}</td>
                        <td className="px-4 py-2 border">{product.product_name || "-"}</td>
                        <td className="px-4 py-2 border">{product.price_per_kg || "-"}</td>
                        <td className="px-4 py-2 border">{product.sub_product || "-"}</td>
                        <td className="px-4 py-2 border">{product.category_id || "-"}</td>
                        <td className="px-4 py-2 border">{product.shade || "-"}</td>
                        <td className="px-4 py-2 border">
                          {new Date(product.created_at).toLocaleString()}
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="px-4 py-6 text-center">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Upload Stock (Excel)</h2>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleExcelChange}
            disabled={!isApproved}
          />

          <Button
            onClick={() => {
              if (!isApproved) {
                setShowBlockedDialog(true);
                return;
              }
              handleExcelUpload();
            }}
            className={
              isApproved
                ? ""
                : "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
            }
          >
            Upload Excel
          </Button>

        </div>
      </div>

      <Dialog open={showBlockedDialog} onOpenChange={setShowBlockedDialog}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Account Deactivated
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-600 mt-2">
            Your account has been deactivated by the admin.
            <br />
            Please contact your admin to enable this feature.
          </p>

          <div className="mt-4 flex justify-center">
            <Button onClick={() => setShowBlockedDialog(false)}>
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}
