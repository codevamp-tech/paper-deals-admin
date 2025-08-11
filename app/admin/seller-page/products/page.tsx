"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

const productData = [
  {
    id: 1,
    productId: "PROD_001",
    name: "P66 Kraft Paper",
    category: "Kraft",
    gsm: 120,
    size: "36 inch",
    color: "Brown",
    status: "Active",
  },
  {
    id: 2,
    productId: "PROD_002",
    name: "Duplex Board",
    category: "Board",
    gsm: 230,
    size: "30 inch",
    color: "White",
    status: "Inactive",
  },
]

export default function ProductPage() {
  const [products, setProducts] = useState(productData)

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-md border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Product ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">GSM</th>
                  <th className="px-4 py-2 border">Size</th>
                  <th className="px-4 py-2 border">Color</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-2 border">{product.id}</td>
                    <td className="px-4 py-2 border">{product.productId}</td>
                    <td className="px-4 py-2 border">{product.name}</td>
                    <td className="px-4 py-2 border">{product.category}</td>
                    <td className="px-4 py-2 border">{product.gsm}</td>
                    <td className="px-4 py-2 border">{product.size}</td>
                    <td className="px-4 py-2 border">{product.color}</td>
                    <td className="px-4 py-2 border">
                      <Badge
                        className={
                          product.status === "Active"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }
                      >
                        {product.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
