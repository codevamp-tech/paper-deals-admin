"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

/* ================= TYPES ================= */

type Buyer = {
  id: number;
  name: string;
  email_address: string;
  phone_no: string;
};

type Product = {
  id: number;
  name: string;
};

type Enquiry = {
  id: number;
  buyer_id: number;
  product_id: number;
  msg: string;
  quantity: string;
  status: number;
  created_at: string;
  buyer?: Buyer;
  product?: Product;
};

/* ================= COMPONENT ================= */

export default function EditLivePriceEnquiry() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [status, setStatus] = useState<number>(0);

  /* ================= FETCH ENQUIRY ================= */

  const fetchEnquiry = async () => {
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/live-price-lead/${id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch enquiry");
      }

      const data: Enquiry = await res.json();

      setEnquiry(data);
      setStatus(data.status);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load enquiry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchEnquiry();
  }, [id]);

  /* ================= UPDATE STATUS ================= */

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/live-price-lead/status/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.success("Status updated successfully");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  /* ================= UI STATES ================= */

  if (loading) return <p className="p-6">Loading...</p>;
  if (!enquiry) return <p className="p-6">No enquiry found</p>;

  /* ================= UI ================= */

  return (
    <div className="p-6  mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Live Price Enquiry</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p>
            <strong>Buyer:</strong> {enquiry.buyer?.name || "—"}
          </p>

          <p>
            <strong>Buyer:</strong> {enquiry.buyer?.phone_no || "—"}
          </p>
          <p>
            <strong>Product:</strong> {enquiry.product?.name || "—"}
          </p>

          <p>
            <strong>Quantity:</strong> {enquiry.quantity}
          </p>

          <p>
            <strong>Message:</strong> {enquiry.msg}
          </p>

          <Select
            value={status.toString()}
            onValueChange={(value) => setStatus(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="0">Pending</SelectItem>
              <SelectItem value="1">Approved</SelectItem>
              <SelectItem value="2">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update Status</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
