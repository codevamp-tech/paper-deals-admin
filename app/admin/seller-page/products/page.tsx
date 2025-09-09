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

  const fetchProducts = async (pageNumber: number) => {
    try {
      setLoading(true)
      const token = getCookie("token")
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
      setTotalPages(data.pagination?.totalPages || 0)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(page)
  }, [page])

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setFormData(product)
    setFile(null)
    setOpen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpdate = async () => {
    try {
      const form = new FormData()

      // append all fields
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key] ?? "")
      })

      // append file if selected
      if (file) {
        form.append("image", file)
      }

      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/stocks/${editingProduct.id}`,
        {
          method: "PUT",
          body: form,
        }
      )

      if (!res.ok) throw new Error("Failed to update product")

      setOpen(false)
      fetchProducts(page)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/stocks/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete product")
      fetchProducts(page)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        {/* <Button className="flex items-center gap-2">Add Product</Button> */}
      </div>

      <Card>
        <CardHeader>
          {/* <CardTitle>Product List</CardTitle> */}
        </CardHeader>
        <CardContent>
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
                    <th className="px-4 py-2 border">Edit</th>
                    <th className="px-4 py-2 border">Delete</th>
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
                        <td className="px-4 py-2 border">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </Button>
                        </td>
                        <td className="px-4 py-2 border flex gap-2">
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
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
        </CardContent>
      </Card>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {formData && (
            <div className="grid grid-cols-2 gap-4">
              {[
                "product_name",
                "sub_product",
                "category_id",
                "gsm",
                "shade",
                "bf",
                "size",
                "sheet",
                "w_l",
                "no_of_bundle",
                "no_of_rim",
                "rim_weight",
                "stock_in_kg",
                "quantity_in_kg",
                "price_per_kg",
                "hsn_no",
                "grain",
                "weight",
                "other",
              ].map((field) => (
                <div key={field}>
                  <Label className="capitalize">
                    {field.replace(/_/g, " ")}
                  </Label>
                  <Input
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}

              {/* Image Upload */}
              <div>
                <Label>Product Image</Label>
                <Input type="file" onChange={handleFileChange} />
                {editingProduct?.image && !file && (
                  <img
                    src={editingProduct.image}
                    alt="Product"
                    className="w-24 h-24 mt-2 rounded object-cover"
                  />
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
