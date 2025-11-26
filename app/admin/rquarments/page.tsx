"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner"; // optional if you use toast notifications
import Pagination from "@/components/pagination";

type Rquarment = {
  Category: any;
  id: number;
  pincode: string;
  phone_no: string;
  product_name: string;
  quantity: number;
  email: string;
  category_id: number;
  status: number;
  created_at: string;
};

export default function RquarmentList() {
  const [data, setData] = useState<Rquarment[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Dialog state
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Rquarment | null>(null);
  const [newStatus, setNewStatus] = useState<number>(0);

  const fetchData = async (pageNum?: number) => {
    const safePage = pageNum && pageNum > 0 ? pageNum : 1;

    const res = await fetch(
      `https://paper-deal-server.onrender.com/api/rquarment?page=${safePage}&limit=10`
    );

    const json = await res.json();

    if (json.success) {
      setData(json.data);
      setTotalPages(json.pagination.totalPages);
      setPage(json.pagination.currentPage);
    }
  };


  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Handle edit click
  const handleEditClick = (item: Rquarment) => {
    setSelectedItem(item);
    setNewStatus(item.status);
    setOpen(true);
  };

  // Handle status update
  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/rquarment/status/${selectedItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json();

      if (json.success) {
        // Update UI instantly
        setData((prev) =>
          prev.map((r) =>
            r.id === selectedItem.id ? { ...r, status: newStatus } : r
          )
        );
        toast?.success("Status updated successfully!");
        setOpen(false);
      } else {
        toast?.error("Failed to update status");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast?.error("Something went wrong");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Requirement </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Created At</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="p-2 border">{item.id}</td>
                  <td className="p-2 border">{item.product_name}</td>
                  <td className="p-2 border">{item.Category?.name || "—"}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">{item.phone_no}</td>
                  <td className="p-2 border">{item.email}</td>
                  <td className="p-2 border">
                    {item.status === 1 ? (
                      <span className="text-green-600 font-medium">Accepted</span>
                    ) : (
                      <span className="text-red-600 font-medium">Rejected</span>
                    )}
                  </td>
                  <td className="p-2 border">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="mt-4">
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dialog for Editing */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <p>
                <strong>Product:</strong> {selectedItem.product_name}
              </p>

              <Select
                value={newStatus.toString()}
                onValueChange={(value) => setNewStatus(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Accepted</SelectItem>
                  <SelectItem value="0">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
