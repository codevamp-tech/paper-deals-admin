"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserFromToken } from "@/hooks/use-token";
import { toast } from "sonner";

// ✅ Match your actual token structure
interface TokenPayload {
  user_id: string;     // backend user id
  user_name: string;   // executive name
  phone_no: string;    // phone number
}

export default function CreatePaperDealPage() {
  const [buyers, setBuyers] = useState<any[]>([]);
  const today = new Date().toISOString().split("T")[0];
  const user = getUserFromToken();
  console.log("user????>>", user);

  const [form, setForm] = useState({
    enquiryId: "",
    creationDate: today,
    pdExecutive: "",  // executive name
    userId: "",       // backend user id
    mobile: "",       // phone number
    buyer: "",
    product: "",
    price: "",
    quantity: "",
    dealAmount: "",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        pdExecutive: user?.user_name,
        mobile: user?.phone_no,
      }));
    }
  }, []);


  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await fetch("https://paper-deal-server.onrender.com/api/users/getBuyer");
        const data = await res.json();
        setBuyers(data?.data || []);
      } catch (error) {
        console.error("Error fetching buyers:", error);
      }
    };
    fetchBuyers();
  }, []);

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    // Auto calculate deal amount
    if (name === "price" || name === "quantity") {
      const price = parseFloat(name === "price" ? value : updatedForm.price || "0");
      const quantity = parseFloat(name === "quantity" ? value : updatedForm.quantity || "0");
      updatedForm.dealAmount = (price * quantity).toString();
    }

    setForm(updatedForm);
  };

  // Handle buyer selection
  // Handle buyer selection safely
  const handleBuyerChange = (buyerId: string) => {
    if (buyerId !== form.buyer) {
      setForm((prev) => ({ ...prev, buyer: buyerId }));
    }
  };


  // Submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      user_id: form.userId, // ✅ send actual id, not name
      buyer_id: form.buyer,
      total_deal_amount: parseFloat(form.dealAmount || "0"),
      enquiry_id: form.enquiryId,
      creation_date: form.creationDate,
      product_description: form.product,
      price: parseFloat(form.price || "0"),
      quantity: parseFloat(form.quantity || "0"),
      mobile: form.mobile,
    };

    try {
      const res = await fetch("https://paper-deal-server.onrender.com/api/pd-deals-master/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("PD Deal created successfully!");

      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error creating deal:", error);
    }
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PD Executive (auto-filled from token, read-only) */}
          <div>
            <Label>PD Executive</Label>
            <Input name="pdExecutive" value={form.pdExecutive} readOnly />
          </div>

          {/* Mobile Number (auto-filled from token, read-only) */}
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
                {buyers.length > 0 ? (
                  buyers.map((b) => (
                    <SelectItem key={b.id} value={b.id.toString()}>
                      {b.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No buyers found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Product Description */}
          <div>
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
          <div>
            <Label>Deal Amount</Label>
            <Input name="dealAmount" value={form.dealAmount} readOnly />
          </div>

          {/* Submit */}
          <div className="md:col-span-3 flex justify-center mt-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
