"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const dummyProducts = [
  {
    id: 15,
    buyerName: "DEMO BUYER",
    productName: "kraft",
    price: 190,
    subProduct: "prime",
    category: "Kraft Paper",
    shade: "golden yellow",
    createdAt: "2025-07-10 16:02:51",
  },
  {
    id: 14,
    buyerName: "Sahil Vaish",
    productName: "duplex",
    price: 50,
    subProduct: "PRISMA",
    category: "Duplex Board",
    shade: "grey back",
    createdAt: "2025-07-08 18:18:18",
  },
  {
    id: 13,
    buyerName: "DEMO BUYER",
    productName: "duplex",
    price: 10000,
    subProduct: "PRISMA",
    category: "Duplex Board",
    shade: "grey back",
    createdAt: "2025-07-05 16:16:54",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(dummyProducts)
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState({})
  const [isEditing, setIsEditing] = useState(false)

  const handleOpenAdd = () => {
    setIsEditing(false)
    setFormData({})
    setOpenModal(true)
  }

  const handleOpenEdit = (product) => {
    setIsEditing(true)
    setFormData(product)
    setOpenModal(true)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    if (isEditing) {
      setProducts(products.map((p) => (p.id === formData.id ? formData : p)))
    } else {
      setProducts([{ ...formData, id: products.length + 1, createdAt: new Date().toISOString() }, ...products])
    }
    setOpenModal(false)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>
            <p className="mt-2 text-slate-600">Manage your product inventory and pricing</p>
          </div>
          <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 font-medium">
            Add Product
          </Button>
        </div>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Buyer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Sub Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Shade
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {products.map((p, index) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                            #{p.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{p.buyerName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900 capitalize">{p.productName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-green-600">{formatPrice(p.price)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {p.subProduct}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600">{p.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600 capitalize">{p.shade}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500">{formatDate(p.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenEdit(p)}
                            className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="max-w-4xl bg-white">
            <DialogHeader className="pb-6">
              <DialogTitle className="text-2xl font-bold text-slate-900">
                {isEditing ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Buyer Name</label>
                  <Input
                    name="buyerName"
                    placeholder="Enter buyer name"
                    value={formData.buyerName || ""}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Product Name</label>
                  <Input
                    name="productName"
                    placeholder="Enter product name"
                    value={formData.productName || ""}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Price</label>
                  <Input
                    name="price"
                    placeholder="0.00"
                    type="number"
                    value={formData.price || ""}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Sub Product</label>
                  <Input
                    name="subProduct"
                    placeholder="Enter sub product"
                    value={formData.subProduct || ""}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Category</label>
                  <Input
                    name="category"
                    placeholder="Enter category"
                    value={formData.category || ""}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Shade</label>
                  <Input
                    name="shade"
                    placeholder="Enter shade"
                    value={formData.shade || ""}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                <Button
                  variant="outline"
                  onClick={() => setOpenModal(false)}
                  className="px-6 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  {isEditing ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
