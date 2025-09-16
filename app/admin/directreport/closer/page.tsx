"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCookie } from "@/hooks/use-cookies";

export default function ClosedReport() {
  const [deals, setDeals] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchDeals = async () => {
    setLoading(true);
    try {
      const token = getCookie("token");
      if (!token) throw new Error("No token in cookies");
      const res = await fetch(
        `http://localhost:5000/api/dashboard/get-closed-report?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      setDeals(data?.deals || []);
    } catch (err) {
      console.error("Error fetching deals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, [page]);

  return (
    <div className="p-6">
      {/* Filter Section */}
      <div className="flex gap-2 mb-4">
        <Input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <Input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <Button onClick={fetchDeals} className="bg-orange-500">
          Filter
        </Button>
        <Button className="bg-yellow-500">Preview</Button>
      </div>

      {/* Header */}
      <div className="text-center my-4">
        <h1 className="text-2xl font-bold text-brown-800">BUSINESS REPORT</h1>
        <p className="mt-2 text-sm text-gray-600">
          Business Report Date: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Buyer</th>
              <th className="border px-3 py-2">Seller</th>
              <th className="border px-3 py-2">Amount</th>
              <th className="border px-3 py-2">Weight</th>
              <th className="border px-3 py-2">Commission</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : deals.length > 0 ? (
              deals.map((deal, i) => (
                <tr key={i} className="text-center">
                  <td className="border px-3 py-2">
                    {new Date(deal.created_on).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2">
                    {deal.buyerUser?.name || "N/A"}
                  </td>
                  <td className="border px-3 py-2">
                    {deal.sellerUser?.name || "N/A"}
                  </td>
                  <td className="border px-3 py-2">{deal.deal_amount}</td>
                  <td className="border px-3 py-2">{deal.weight || 0}</td>
                  <td className="border px-3 py-2">{deal.commission || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
