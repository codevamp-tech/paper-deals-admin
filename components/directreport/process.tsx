"use client"

import { useEffect, useState } from "react"

export default function DealProcessReportPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch("http://localhost:5000/api/dashboard/get-process-report", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error("Failed to fetch process report")
        }

        const result = await res.json()
        setData(result?.data || [])
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Deal Process Report</h1>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-left">ID</th>
                <th className="px-4 py-2 border text-left">Buyer</th>
                <th className="px-4 py-2 border text-left">Seller</th>
                <th className="px-4 py-2 border text-left">Contact Person</th>
                <th className="px-4 py-2 border text-left">Mobile No.</th>
                <th className="px-4 py-2 border text-left">Email Id</th>
                <th className="px-4 py-2 border text-left">Product Description</th>
                <th className="px-4 py-2 border text-left">Deal Size</th>
                <th className="px-4 py-2 border text-left">Commission</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row: any) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 border">{row.id}</td>
                    <td className="px-4 py-2 border">{row.buyerUser?.name || row.buyer || "-"}</td>
                    <td className="px-4 py-2 border">{row.sellerUser?.name || "-"}</td>
                    <td className="px-4 py-2 border">{row.contact_person || "-"}</td>
                    <td className="px-4 py-2 border">{row.mobile_no || "-"}</td>
                    <td className="px-4 py-2 border">{row.email_id || "-"}</td>
                    <td className="px-4 py-2 border">{row.product_description || "-"}</td>
                    <td className="px-4 py-2 border">{row.deal_size || 0}</td>
                    <td className="px-4 py-2 border">{row.commission || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
