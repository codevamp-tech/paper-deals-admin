"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreatePaperDealPage() {
  const [form, setForm] = useState({
    enquiryId: "000102",
    creationDate: "2025-08-12",
    pdExecutive: "ANUBHAV TOMER",
    mobile: "9458613002",
    buyer: "",
    product: "",
    price: "",
    quantity: "",
    dealAmount: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBuyerChange = (value: string) => {
    setForm({ ...form, buyer: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("New Paper Deal:", form);
    // API call here
  };

  return (
    <Card className="m-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Create PD Deal</CardTitle>
        <div className="text-sm">
          <span className="font-semibold">Creation Date:</span> {form.creationDate}
        </div>
      </CardHeader>

      <CardContent>
        {/* Enquiry ID */}
        <div className="mb-4 text-sm font-semibold">
          Enquiry Id: {form.enquiryId}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PD Executive */}
          <div>
            <Label>PD Executive</Label>
            <Input name="pdExecutive" value={form.pdExecutive} readOnly />
          </div>

          {/* Mobile Number */}
          <div>
            <Label>Mobile Number</Label>
            <Input name="mobile" value={form.mobile} readOnly />
          </div>

          {/* Buyer */}
          <div>
            <Label>Buyer</Label>
            <Select onValueChange={handleBuyerChange} value={form.buyer}>
              <SelectTrigger>
                <SelectValue placeholder="--Select Buyer--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyer1">Buyer 1</SelectItem>
                <SelectItem value="buyer2">Buyer 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Product Description */}
          <div className="md:col-span-1">
            <Label>Product Description</Label>
            <Input
              placeholder="Product Description"
              name="product"
              value={form.product}
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div>
            <Label>Price (in Kg)</Label>
            <Input
              placeholder="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          {/* Quantity */}
          <div>
            <Label>Quantity (in Kg)</Label>
            <Input
              placeholder="Quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

          {/* Deal Amount */}
          <div className="md:col-span-1">
            <Label>Deal Amount</Label>
            <Input name="dealAmount" value={form.dealAmount} readOnly />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3 flex justify-center mt-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
