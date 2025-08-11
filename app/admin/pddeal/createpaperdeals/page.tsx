"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreatePaperDealPage() {
  const [form, setForm] = useState({
    buyer: "",
    seller: "",
    product: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("New Paper Deal:", form);
    // API call yaha karein
  };

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Create Paper Deal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Buyer Name"
            name="buyer"
            value={form.buyer}
            onChange={handleChange}
          />
          <Input
            placeholder="Seller Name"
            name="seller"
            value={form.seller}
            onChange={handleChange}
          />
          <Input
            placeholder="Product"
            name="product"
            value={form.product}
            onChange={handleChange}
          />
          <Input
            placeholder="Quantity"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />
          <Input
            placeholder="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
          <Button type="submit">Create</Button>
        </form>
      </CardContent>
    </Card>
  );
}
