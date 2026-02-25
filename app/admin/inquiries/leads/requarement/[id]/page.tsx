"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Package, Hash, Mail, Phone, MapPin, Tag, MessageSquare, ArrowLeft, Calendar } from "lucide-react";

type Requirement = {
  id: number;
  product_name: string;
  quantity: number;
  email: string;
  phone_no: string;
  pincode: string;
  status: number;
  msg: string;
  category_id: number;
  created_at: string;
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
  const [updating, setUpdating] = useState(false);

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
    setUpdating(true);
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
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No requirement data found.</p>
        <Button variant="link" onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Requirement Details</h1>
          <p className="text-sm text-gray-500">
            Requirement #{data.id}
          </p>
        </div>
      </div>

      <Card className="shadow-sm mb-6">
        <CardHeader className="bg-gray-50/50 border-b pb-4">
          <CardTitle className="text-lg">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex border-b pb-3">
            <span className="w-1/3 text-gray-500 font-medium">Product Name:</span>
            <span className="w-2/3 text-gray-900 font-medium">{data.product_name}</span>
          </div>
          <div className="flex border-b pb-3">
            <span className="w-1/3 text-gray-500 font-medium">Category:</span>
            <span className="w-2/3 text-gray-900">{data.Category?.name || "N/A"}</span>
          </div>
          <div className="flex border-b pb-3">
            <span className="w-1/3 text-gray-500 font-medium">Quantity:</span>
            <span className="w-2/3 text-gray-900">{data.quantity}</span>
          </div>
          <div className="flex border-b pb-3">
            <span className="w-1/3 text-gray-500 font-medium">Date:</span>
            <span className="w-2/3 text-gray-900">
              {data.created_at ? new Date(data.created_at).toLocaleDateString() : "N/A"}
            </span>
          </div>
          <div className="flex border-b pb-3">
            <span className="w-1/3 text-gray-500 font-medium">Email Address:</span>
            <span className="w-2/3 text-gray-900">{data.email}</span>
          </div>
          <div className="flex border-b pb-3">
            <span className="w-1/3 text-gray-500 font-medium">Phone Number:</span>
            <span className="w-2/3 text-gray-900">{data.phone_no}</span>
          </div>
          <div className="flex border-b pb-3">
            <span className="w-1/3 text-gray-500 font-medium">Pincode:</span>
            <span className="w-2/3 text-gray-900">{data.pincode}</span>
          </div>

          <div className="pt-2 flex flex-col pt-4">
            <span className="text-gray-500 font-medium mb-2">Additional Message:</span>
            <div className="bg-gray-50 p-4 rounded-md text-gray-700 text-sm whitespace-pre-wrap border border-gray-100 min-h-[80px]">
              {data.msg ? data.msg : <span className="text-gray-400 italic">No message provided</span>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b pb-4">
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2 flex-grow">
              <label className="text-sm font-medium text-gray-700">Update Status</label>
              <Select
                value={status.toString()}
                onValueChange={(value) => setStatus(Number(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">
                    <div className="flex items-center text-orange-600 font-medium">
                      <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                      Pending
                    </div>
                  </SelectItem>
                  <SelectItem value="1">
                    <div className="flex items-center text-green-600 font-medium">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Accepted
                    </div>
                  </SelectItem>
                  <SelectItem value="2">
                    <div className="flex items-center text-red-600 font-medium">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                      Rejected
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full sm:w-auto"
              onClick={handleUpdate}
              disabled={updating}
            >
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
