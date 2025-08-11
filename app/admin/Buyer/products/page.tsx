"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const productData = [
  {
    id: 1,
    name: "Wooden Chair",
    category: "Furniture",
    price: "₹1,200",
    stock: 50,
    status: "Available",
  },
  {
    id: 2,
    name: "LED Bulb",
    category: "Electronics",
    price: "₹120",
    stock: 200,
    status: "Available",
  },
  {
    id: 3,
    name: "Cotton Bedsheet",
    category: "Textile",
    price: "₹550",
    stock: 75,
    status: "Out of Stock",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(productData);

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Products</CardTitle>
          <Button className="flex items-center gap-2">
            <Plus size={16} /> Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2 text-left">#</th>
                  <th className="border border-gray-200 p-2 text-left">Name</th>
                  <th className="border border-gray-200 p-2 text-left">Category</th>
                  <th className="border border-gray-200 p-2 text-left">Price</th>
                  <th className="border border-gray-200 p-2 text-left">Stock</th>
                  <th className="border border-gray-200 p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 p-2">{index + 1}</td>
                    <td className="border border-gray-200 p-2">{product.name}</td>
                    <td className="border border-gray-200 p-2">{product.category}</td>
                    <td className="border border-gray-200 p-2">{product.price}</td>
                    <td className="border border-gray-200 p-2">{product.stock}</td>
                    <td className="border border-gray-200 p-2">
                      <Badge
                        variant={
                          product.status === "Available" ? "default" : "destructive"
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
  );
}
