"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import Pagination from "@/components/pagination"
import { getUserFromToken } from "@/hooks/use-token"
import { useRouter } from "next/navigation"
import { getCookie } from "@/hooks/use-cookies";


export default function SellerB2BEnquiryPage() {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter();
  const limit = 10
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user = getUserFromToken();
  const userId = user?.user_id
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // fetch B2B enquiries where seller_id === user_id
  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(
      `${API_URL}/api/enquiry/b2b-seller/${userId}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("B2B Seller Enquiries API DATA:", res);
        setData(res.enquiries || []);
        setTotalPages(res.totalPages || 1);
      })
      .catch((err) => {
        console.error("Error fetching B2B enquiries:", err);
      })
      .finally(() => setLoading(false));
  }, [page, userId]);

  // filtered search
  const filtered = data.filter((row) =>
    row.product?.toLowerCase().includes(search.toLowerCase()) ||
    row.buyer?.name?.toLowerCase().includes(search.toLowerCase()) ||
    row.category?.name?.toLowerCase().includes(search.toLowerCase()) ||
    row.company_name?.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="m-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 p-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">B2B Seller Enquiries</h2>
          <p className="text-sm text-gray-500 mt-1">
            Showing enquiries raised by B2B buyers directly to you (Seller ID: {userId})
          </p>
        </div>
        <input
          type="text"
          placeholder="Search product, buyer, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2 md:mt-0 w-full md:w-72 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
      </div>

      <div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading B2B enquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No B2B enquiries found for your account.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border px-3 py-2 text-left">ID</th>
                  <th className="border px-3 py-2 text-left">Buyer</th>
                  <th className="border px-3 py-2 text-left">Company</th>
                  <th className="border px-3 py-2 text-left">Product</th>
                  <th className="border px-3 py-2 text-left">Category</th>
                  <th className="border px-3 py-2 text-left">City</th>
                  <th className="border px-3 py-2 text-left">Shade</th>
                  <th className="border px-3 py-2 text-left">GSM</th>
                  <th className="border px-3 py-2 text-left">Qty (kg)</th>
                  <th className="border px-3 py-2 text-left">Remarks</th>
                  <th className="border px-3 py-2 text-left">Created At</th>
                  <th className="border px-3 py-2 text-left">Status</th>
                  <th className="border px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {/* ID */}
                    <td className="border px-3 py-2 font-mono text-xs text-gray-600">{row.id}</td>

                    {/* Buyer */}
                    <td className="border px-3 py-2">
                      <div className="font-medium">{row.buyer?.name || row.name || "—"}</div>
                      <div className="text-xs text-gray-400">{row.buyer?.phone_no || row.phone || ""}</div>
                    </td>

                    {/* Company */}
                    <td className="border px-3 py-2">
                      {row.company_name || "—"}
                    </td>

                    {/* Product */}
                    <td className="border px-3 py-2">
                      {row.productDetails?.product_name || row.product || "—"}
                    </td>

                    {/* Category */}
                    <td className="border px-3 py-2">
                      {row.category?.name || "—"}
                    </td>

                    {/* City */}
                    <td className="border px-3 py-2">
                      {row.city || "—"}
                    </td>

                    {/* Shade */}
                    <td className="border px-3 py-2">
                      {row.shade || "—"}
                    </td>

                    {/* GSM */}
                    <td className="border px-3 py-2">
                      {row.gsm || "—"}
                    </td>

                    {/* Qty */}
                    <td className="border px-3 py-2">
                      {row.quantity_in_kg || "—"}
                    </td>

                    {/* Remarks */}
                    <td className="border px-3 py-2 max-w-[150px] truncate" title={row.remarks || ""}>
                      {row.remarks || "—"}
                    </td>

                    {/* Created At */}
                    <td className="border px-3 py-2 text-xs text-gray-500">
                      {row.created_at ? new Date(row.created_at).toLocaleString() : "—"}
                    </td>

                    {/* Status */}
                    <td className="border px-3 py-2">
                      {row.status === 0 && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                          Pending
                        </span>
                      )}
                      {row.status === 1 && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          Accepted
                        </span>
                      )}
                      {row.status === 2 && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                          Rejected
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td
                      className="border px-3 py-2 text-blue-600 cursor-pointer hover:underline"
                      onClick={() =>
                        router.push(`/admin/inquiries/sellerenquiry/${row.id}`)
                      }
                    >
                      View
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  )
}
