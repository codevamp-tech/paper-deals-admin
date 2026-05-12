"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserFromToken } from "@/hooks/use-token";
import { toast } from "sonner";

// ✅ Match actual JWT token structure from backend
interface TokenPayload {
  user_id: string;     // backend user id
  user_name: string;   // executive name
  user_role: number;
  phone_no: string;    // phone number
  approved: number;
}

function CreatePaperDealForm() {
  const [buyers, setBuyers] = useState<any[]>([]);
  const today = new Date().toISOString().split("T")[0];
  const user = getUserFromToken();
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Read pre-filled data from query params (from accepted seller enquiry)
  const enquiryIdFromQuery = searchParams.get("enquiryId") || "";
  const productFromQuery = searchParams.get("product") || "";
  const buyerIdFromQuery = searchParams.get("buyer_id") || "";
  const buyerNameFromQuery = searchParams.get("buyer_name") || "";
  const quantityFromQuery = searchParams.get("quantity") || "";
  const companyFromQuery = searchParams.get("company") || "";

  const [form, setForm] = useState({
    enquiryId: enquiryIdFromQuery,
    creationDate: today,
    pdExecutive: "",  // executive name
    userId: "",       // backend user id
    mobile: "",       // phone number
    buyer: buyerIdFromQuery,
    product: productFromQuery,
    price: "",
    quantity: quantityFromQuery,
    dealAmount: "",
  });

  // ✅ Sync user token data on mount
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        pdExecutive: user?.user_name || "",
        userId: user?.user_id || "",
        mobile: user?.phone_no || "",
      }));
    }
  }, []);

  // ✅ Fetch buyers for dropdown
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
      user_id: form.userId,                                  // ✅ PD Executive user id from token
      buyer_id: form.buyer,
      total_deal_amount: parseFloat(form.dealAmount || "0"),
      enquiry_id: form.enquiryId,                            // ✅ linked enquiry id
      creation_date: form.creationDate,
      product_description: form.product,
      price_per_kg: parseFloat(form.price || "0"),
      deal_size: parseFloat(form.quantity || "0"),
      balanced_deal_size: parseFloat(form.quantity || "0"),  // initially same as deal_size
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
        router.push("/admin/pddeal/process");
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
        <div>
          <CardTitle>Create PD Bulk Deal</CardTitle>
          {enquiryIdFromQuery && (
            <p className="text-sm text-blue-600 mt-1">
              📋 Pre-filled from Enquiry #{enquiryIdFromQuery}
              {companyFromQuery && ` — ${companyFromQuery}`}
              {buyerNameFromQuery && ` (${buyerNameFromQuery})`}
            </p>
          )}
        </div>
        <div className="text-sm">
          <span className="font-semibold">Creation Date:</span> {form.creationDate}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Enquiry ID (auto-filled from accepted enquiry, read-only if pre-filled) */}
          <div>
            <Label>Enquiry ID</Label>
            <Input
              name="enquiryId"
              placeholder="Enquiry ID (optional)"
              value={form.enquiryId}
              onChange={handleChange}
              readOnly={!!enquiryIdFromQuery}
              className={enquiryIdFromQuery ? "bg-blue-50 border-blue-300" : ""}
            />
          </div>

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
              <SelectTrigger className={buyerIdFromQuery ? "bg-blue-50 border-blue-300" : ""}>
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
            {buyerNameFromQuery && (
              <p className="text-xs text-blue-500 mt-1">From enquiry: {buyerNameFromQuery}</p>
            )}
          </div>

          {/* Product Description */}
          <div>
            <Label>Product Description</Label>
            <Input
              placeholder="Product Description"
              name="product"
              value={form.product}
              onChange={handleChange}
              className={productFromQuery ? "bg-blue-50 border-blue-300" : ""}
            />
          </div>

          {/* Price */}
          <div>
            <Label>Price (per Kg)</Label>
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
              className={quantityFromQuery ? "bg-blue-50 border-blue-300" : ""}
            />
          </div>

          {/* Deal Amount */}
          <div>
            <Label>Deal Amount</Label>
            <Input name="dealAmount" value={form.dealAmount} readOnly />
          </div>

          {/* Submit */}
          <div className="md:col-span-3 flex justify-center mt-4 gap-3">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 px-8">
              Submit PD Deal
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function CreatePaperDealPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading...</div>}>
      <CreatePaperDealForm />
    </Suspense>
  );
}
