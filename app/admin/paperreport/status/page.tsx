"use client";
import { getCookie } from "@/hooks/use-cookies";
import { useEffect, useState } from "react";

export default function StatusReport() {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      if (!token) throw new Error("No token in cookies");

      const query = new URLSearchParams();
      if (fromDate) query.append("fromDate", fromDate);
      if (toDate) query.append("toDate", toDate);

      const res = await fetch(
        `http://localhost:5000/api/pd-deals/get-status-report?${query.toString()}`,
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
      if (json.success) {
        setData(json.data || []); // ✅ FIXED
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching business report:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="p-6">
      {/* 🔎 Top Filter Section */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={fetchReport}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => window.print()}
        >
          Preview
        </button>
      </div>

      {/* 📝 Header */}
      <div className="text-center mb-6">
        <h1 className="bg-brown-700 py-2 text-xl font-bold">
          BUSINESS REPORT
        </h1>
        <p className="mt-2 font-semibold">
          Business Report Date: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Buyer</th>
              <th className="border px-4 py-2">Seller</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Weight (kg)</th>
              <th className="border px-4 py-2">Commission</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((deal, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {deal.created_on
                      ? new Date(deal.created_on).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="border px-4 py-2">
                    {deal.buyerUser?.name || "-"}
                  </td>
                  <td className="border px-4 py-2">
                    {deal.sellerUser?.name || "-"}
                  </td>
                  <td className="border px-4 py-2">
                    {deal.deal_amount || "-"}
                  </td>
                  <td className="border px-4 py-2">
                    {deal.quantity_in_kg || "-"}
                  </td>
                  <td className="border px-4 py-2">
                    {deal.commission || "0"}
                  </td>
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
