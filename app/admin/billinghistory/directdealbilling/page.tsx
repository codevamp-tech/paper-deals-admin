"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/pagination";

type Billing = {
  id: number;
  deal_id: number;
  buyer: string;
  seller: string;
  total_amount: string;
  pending_amount: string | number;
  quantity_kg: number;
  price_kg: number;
  date: string;
  status: string;
};

export default function DirectBillingTable() {
  const [data, setData] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/dashboard/getDirectBilling?page=${page}&search=${search}`)
      .then((res) => res.json())
      .then((res) => {
        // ✅ Map API response to table fields
        const mappedData: Billing[] = res.data.map((item: any) => ({
          id: item.id,
          deal_id: item.deal_id,
          buyer: item.buyer,
          seller: item.contact_person, // seller name from API
          total_amount: item.deal_amount,
          pending_amount: item.pending_amount ?? "-", // if available
          quantity_kg: item.quantity_in_kg,
          price_kg: item.price_per_kg,
          date: new Date(item.created_on).toLocaleString(),
          status: item.status === 1 ? "Active" : "Inactive",
        }));

        setData(mappedData);
        setTotalPages(res.totalPages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, search]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Direct Billing</h2>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Deal ID</th>
              <th className="p-2 border">Buyer</th>
              <th className="p-2 border">Seller</th>
              <th className="p-2 border">Total Amount</th>
              <th className="p-2 border">Pending Amount</th>
              <th className="p-2 border">Quantity (Kg)</th>
              <th className="p-2 border">Price (Kg)</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{row.id}</td>
                  <td className="p-2 border">{row.deal_id}</td>
                  <td className="p-2 border">{row.buyer}</td>
                  <td className="p-2 border">{row.seller}</td>
                  <td className="p-2 border">{row.total_amount}</td>
                  <td className="p-2 border">{row.pending_amount}</td>
                  <td className="p-2 border">{row.quantity_kg}</td>
                  <td className="p-2 border">{row.price_kg}</td>
                  <td className="p-2 border">{row.date}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded text-xs ${row.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
}
