"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Requirement = {
  id: number;
  product_name: string;
  quantity: number;
  email: string;
  phone_no: string;
  pincode: string;
  status: number;
  category_id: number;
  Category: {
    id: number;
    name: string;
  };
};

export default function EditRequirementPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Requirement | null>(null);
  const [status, setStatus] = useState<number>(0);

  // Fetch single requirement
  const fetchRequirement = async () => {
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/rquarment/${id}`);
      const json = await res.json();

      if (json.success) {
        setData(json.data);
        setStatus(json.data.status);
      } else {
        toast.error("Failed to load data");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirement();
  }, [id]);

  // Update status
  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/rquarment/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const json = await res.json();

      if (json.success) {
        toast.success("Status updated successfully");
        router.back(); // go back to list
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!data) return <p className="p-6">No data found</p>;

  return (
    <div className="p-6  mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Requirement</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p>
            <strong>Product Name:</strong> {data.product_name}
          </p>
          <p>
            <strong>Quantity:</strong> {data.quantity}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Phone No:</strong> {data.phone_no}
          </p>
          <p>
            <strong>Pincode:</strong> {data.pincode}
          </p>
          <p>
            <strong>Category:</strong> {data.Category.name}
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
              <SelectItem value="1">Accepted</SelectItem>
              <SelectItem value="2">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
