"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ProcessDealByIdPage() {
  const { id } = useParams();
  const router = useRouter();

  const [deal, setDeal] = useState<any>(null);
  const [sellers, setSellers] = useState<any[]>([]);

  const [sellerId, setSellerId] = useState("");
  const [allotted, setAllotted] = useState("");
  const [buyerCommission, setBuyerCommission] = useState("");
  const [sellerCommission, setSellerCommission] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const fetchDeal = async () => {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/pd-deals-master/pddealbyid/${id}`
      );
      const json = await res.json();
      setDeal(json);

      // prefill
      setAllotted(json.balanced_deal_size || "");
    };

    const fetchSellers = async () => {
      const res = await fetch(
        "https://paper-deal-server.onrender.com/api/users/getallsellers?user_type=2"
      );
      const json = await res.json();
      setSellers(json.data);
    };

    fetchDeal();
    fetchSellers();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const payload = {
        deal_id: deal.id,
        user_id: deal.user_id,
        buyer_id: deal.buyer_id,
        seller_id: Number(sellerId),
        contact_person: deal.buyerUser?.organization?.contact_person || "",
        mobile_no: deal.mobile_no || deal.buyerUser?.phone_no || "",
        email: deal.email_id || deal.buyerUser?.email_address || "",
        product_desc: deal.product_description,
        Allotted_deal_size: Number(allotted),
        balanced_deal_size: Number(deal.balanced_deal_size),
        deal_size: Number(deal.deal_size),
        price_per_kg: Number(deal.price_per_kg),
        deal_amount: Number(deal.total_deal_amount),
        buyer_commission: Number(buyerCommission) || 0,
        seller_commission: Number(sellerCommission) || 0,
        remarks: remarks || "",
      };

      const response = await fetch(`https://paper-deal-server.onrender.com/api/pd-deals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("PD Deal created successfully!");
        router.push("/admin/pddeal/process");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error creating PD Deal:", error);
    }
  };

  if (!deal?.id) return <p>Loading...</p>;

  return (
    <div className="m-6">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-2 flex justify-between rounded">
        <span>Deal Id : {String(deal.id).padStart(5, "0")}</span>
        <span>
          Creation Date : {new Date().toLocaleDateString("en-IN")}
        </span>

      </div>

      {/* Top Details */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label>Buyer</Label>
          <Input value={deal.buyerUser?.name || "—"} disabled />
        </div>

        <div>
          <Label>Contact Person</Label>
          <Input value={deal.buyerUser?.organization?.contact_person || "—"} disabled />
        </div>

        <div>
          <Label>Mobile No.</Label>
          <Input value={deal.buyerUser?.phone_no || "—"} disabled />
        </div>

        <div>
          <Label>PD Executive</Label>
          <Input value={deal.user?.name || "—"} disabled />
        </div>

        <div>
          <Label>Mobile Number</Label>
          <Input value={deal.user?.phone_no || "—"} disabled />
        </div>

        <div>
          <Label>Email</Label>
          <Input value={deal.user?.email_address || "—"} disabled />
        </div>
      </div>

      {/* Seller */}
      <div className="mt-4">
        <Label>Seller</Label>
        <Select onValueChange={setSellerId}>
          <SelectTrigger>
            <SelectValue placeholder="-- Select Seller --" />
          </SelectTrigger>
          <SelectContent>
            {sellers.map((s) => (
              <SelectItem key={s.id} value={s.id.toString()}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label>Product Description</Label>
          <Input value={deal.product_description} disabled />
        </div>

        <div>
          <Label>Quantity (in Kg)</Label>
          <Input value={deal.deal_size} disabled />
        </div>

        <div>
          <Label>Price Per Kg</Label>
          <Input value={deal.price_per_kg} disabled />
        </div>

        <div>
          <Label>Balanced Quantity (in Kg)</Label>
          <Input value={deal.balanced_deal_size} disabled />
        </div>

        <div>
          <Label>Allotted Quantity (in Kg)</Label>
          <Input value={allotted} onChange={(e) => setAllotted(e.target.value)} />
        </div>

        <div>
          <Label>Total Deal Amount</Label>
          <Input value={deal.total_deal_amount} disabled />
        </div>
      </div>

      {/* Commission */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <Label>Deal Amount</Label>
          <Input value={deal.total_deal_amount} disabled />
        </div>

        <div>
          <Label>Buyer Commission (₹)</Label>
          <Input
            value={buyerCommission}
            onChange={(e) => setBuyerCommission(e.target.value)}
          />
        </div>

        <div>
          <Label>Seller Commission (₹)</Label>
          <Input
            value={sellerCommission}
            onChange={(e) => setSellerCommission(e.target.value)}
          />
        </div>
      </div>

      {/* Remarks */}
      <div className="mt-4">
        <Label>Remarks</Label>
        <Input
          placeholder="Enter Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>

      {/* Submit */}
      <div className="mt-6">
        <Button className="bg-blue-600" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}