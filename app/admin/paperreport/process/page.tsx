"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCookie } from "@/hooks/use-cookies";
import Pagination from "@/components/pagination";

export default function PdProcessReport() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = getCookie("token");
      if (!token) throw new Error("No token in cookies");

      const res = await fetch(
        `http://localhost:5000/api/pd-deals/pdProcessReport?page=${page}&limit=${limit}&search=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const json = await res.json();
      setData(json.data || []);
      setTotalPages(json.totalPages || 1);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-x-2">
          <Button variant="outline">Copy</Button>
          <Button variant="outline">CSV</Button>
          <Button variant="outline">Excel</Button>
          <Button variant="outline">PDF</Button>
          <Button variant="outline">Print</Button>
        </div>
        <Input
          placeholder="Search..."
          className="w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Buyer</th>
              <th className="border px-2 py-1">Seller</th>
              <th className="border px-2 py-1">Contact Person</th>
              <th className="border px-2 py-1">Mobile No.</th>
              <th className="border px-2 py-1">Email Id</th>
              <th className="border px-2 py-1">Product Description</th>
              <th className="border px-2 py-1">Deal Size</th>
              <th className="border px-2 py-1">Commission</th>
              <th className="border px-2 py-1">Buyer Commission</th>
              <th className="border px-2 py-1">Seller Commission</th>
              <th className="border px-2 py-1">Remarks</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={15} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item: any) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1">{item.id}</td>
                  <td className="border px-2 py-1">
                    {item.buyerUser?.name || "N/A"}
                  </td>
                  <td className="border px-2 py-1">
                    {item.sellerUser?.name || "N/A"}
                  </td>
                  <td className="border px-2 py-1">{item.contact_person || "—"}</td>
                  <td className="border px-2 py-1">{item.mobile_no}</td>
                  <td className="border px-2 py-1">{item.email_id}</td>
                  <td className="border px-2 py-1">
                    {item.product_description}
                  </td>
                  <td className="border px-2 py-1">{item.deal_size || "-"}</td>
                  <td className="border px-2 py-1">{item.commission}</td>
                  <td className="border px-2 py-1">{item.buyer_commission}</td>
                  <td className="border px-2 py-1">{item.seller_commission}</td>
                  <td className="border px-2 py-1">{item.remarks}</td>
                  <td className="border px-2 py-1">
                    {new Date(item.created_on).toLocaleDateString()}
                  </td>
                  <td className="border px-2 py-1">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="border px-2 py-1">
                    <Button size="sm" variant="link">
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={15} className="text-center py-4">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(newPage: number) => setPage(newPage)}
      />
    </div>
  );
}
