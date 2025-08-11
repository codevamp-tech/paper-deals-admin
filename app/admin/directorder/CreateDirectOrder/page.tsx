"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function CreateDirectOrderPage() {
  const [formData, setFormData] = useState({
    buyerName: "",
    productName: "",
    quantity: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log("Order Created:", formData)
  }

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create Direct Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Buyer Name"
          name="buyerName"
          value={formData.buyerName}
          onChange={handleChange}
        />
        <Input
          placeholder="Product Name"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
        />
        <Input
          placeholder="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Create Order</Button>
      </CardContent>
    </Card>
  )
}
