"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function BuyerProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: 500, status: "Active" },
    { id: 2, name: "Product B", price: 1200, status: "Inactive" },
  ])

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Buyer Products</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <Input placeholder="Product Name" />
              <Input type="number" placeholder="Price" />
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-muted-foreground">₹{product.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    product.status === "Active" ? "default" : "secondary"
                  }
                >
                  {product.status}
                </Badge>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
