"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getCookie } from "@/hooks/use-cookies"
import Pagination from "@/components/pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, Package, User, Calendar, Weight, Ruler, Palette, Edit, Trash2 } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { sellerId } = useParams()

  // For Edit Dialog
  const [open, setOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const [file, setFile] = useState<File | null>(null)

  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [viewingProduct, setViewingProduct] = useState<any>(null)

  const fetchProducts = async (pageNumber: number) => {
    try {
      setLoading(true)
      const token = getCookie("token")
      if (!token) throw new Error("No token in cookies")

      const res = await fetch(`https://paper-deal-server.onrender.com/api/stocks/seller/${sellerId}?page=${page}&limit=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || "Failed to fetch products")
      }

      const data = await res.json()
      setProducts(data.data || [])
      setTotalPages(data.totalPages || 0)
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

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setFormData(product)
    setFile(null)
    setOpen(true)
  }

  const handleViewProduct = (product: any) => {
    setViewingProduct(product)
    setViewDialogOpen(true)
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

      const res = await fetch(`https://paper-deal-server.onrender.com/api/stocks/${editingProduct.id}`, {
        method: "PUT",
        body: form,
      })

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
                    <th className="px-4 py-2 border">View</th>
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
                        <td className="px-4 py-2 border">{new Date(product.created_at).toLocaleString()}</td>
                        <td className="px-4 py-2 border">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1 bg-transparent"
                            onClick={() => handleViewProduct(product)}
                          >
                            <Eye />
                          </Button>
                        </td>
                        <td className="px-4 py-2 border">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit />
                          </Button>
                        </td>
                        <td className="px-4 py-2 ">
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="px-4 py-6 text-center">
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
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={(newPage) => setPage(newPage)} />

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Package className="w-6 h-6" />
              Product Details
            </DialogTitle>
          </DialogHeader>

          {viewingProduct && (
            <div className="space-y-6">
              {/* Product Header */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  {viewingProduct.image ? (
                    <img
                      src={viewingProduct.image || "/placeholder.svg"}
                      alt={viewingProduct.product_name}
                      className="w-48 h-48 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="w-48 h-48 rounded-lg bg-gray-100 flex items-center justify-center border">
                      <Package className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold text-primary">{viewingProduct.product_name}</h3>
                    <p className="text-lg text-muted-foreground">{viewingProduct.sub_product}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {viewingProduct.seller?.name}
                    </Badge>
                    <Badge variant="outline">ID: {viewingProduct.id}</Badge>
                    <Badge variant="outline">HSN: {viewingProduct.hsn_no || "N/A"}</Badge>
                  </div>

                  <div className="text-4xl font-bold text-green-600">₹{viewingProduct.price_per_kg}/kg</div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Created: {new Date(viewingProduct.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Product Specifications */}
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  Specifications
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Palette className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Category & Shade</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Category: {viewingProduct.category_id}</p>
                      <p className="text-sm text-muted-foreground">Shade: {viewingProduct.shade}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Weight className="w-4 h-4 text-green-500" />
                        <span className="font-medium">Weight & Stock</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Stock: {viewingProduct.stock_in_kg} kg</p>
                      <p className="text-sm text-muted-foreground">Quantity: {viewingProduct.quantity_in_kg} kg</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">Dimensions</span>
                      </div>
                      <p className="text-sm text-muted-foreground">GSM: {viewingProduct.gsm}</p>
                      <p className="text-sm text-muted-foreground">BF: {viewingProduct.bf}</p>
                      <p className="text-sm text-muted-foreground">Size: {viewingProduct.size || "N/A"}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Detailed Information */}
              <div>
                <h4 className="text-xl font-semibold mb-4">Detailed Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Weight:</span>
                      <span>{viewingProduct.weight || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sheet:</span>
                      <span>{viewingProduct.sheet || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Grain:</span>
                      <span>{viewingProduct.grain || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Brightness:</span>
                      <span>{viewingProduct.brightness || "N/A"}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Rim Weight:</span>
                      <span>{viewingProduct.rim_weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">W/L Ratio:</span>
                      <span>{viewingProduct.w_l}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">No. of Bundles:</span>
                      <span>{viewingProduct.no_of_bundle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">No. of Rims:</span>
                      <span>{viewingProduct.no_of_rim}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {viewingProduct.other && (
                <div>
                  <h4 className="text-xl font-semibold mb-2">Additional Notes</h4>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-muted-foreground">{viewingProduct.other}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Status Information */}
              <div className="flex flex-wrap gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  <Badge variant={viewingProduct.status === 1 ? "default" : "secondary"}>
                    {viewingProduct.status === 1 ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Approved:</span>
                  <Badge variant={viewingProduct.approved === 1 ? "default" : "destructive"}>
                    {viewingProduct.approved === 1 ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">User Type:</span>
                  <Badge variant="outline">{viewingProduct.user_type}</Badge>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

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
                  <Label className="capitalize">{field.replace(/_/g, " ")}</Label>
                  <Input name={field} value={formData[field] || ""} onChange={handleChange} />
                </div>
              ))}

              {/* Image Upload */}
              <div>
                <Label>Product Image</Label>
                <Input type="file" onChange={handleFileChange} />
                {editingProduct?.image && !file && (
                  <img
                    src={editingProduct.image || "/placeholder.svg"}
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
