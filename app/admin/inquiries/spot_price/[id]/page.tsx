"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function EditSpotPriceEnquiryPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [status, setStatus] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const res = await fetch(
          `https://paper-deal-server.onrender.com/api/spotPriceEnqiry/${id}`
        )
        const result = await res.json()

        setData(result)
        setStatus(result.status ?? 0) // ✅ FIX
        router.push(`/admin/inquiries/spot_price`)
      } catch (err) {
        console.error("Fetch failed", err)
      }
    }

    fetchEnquiry()
  }, [id])

  const updateStatus = async () => {
    try {
      setLoading(true)

      await fetch(
        `https://paper-deal-server.onrender.com/api/spotPriceEnqiry/${id}`, // ✅ FIX
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      )

      toast({
        title: "Success",
        description: "Status updated successfully",
      })
    } catch (err) {
      console.error("Failed to update status:", err)
      toast({
        title: "Error",
        description: "Update failed"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!data) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">
        Edit Spot Price Enquiry
      </h1>

      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            value={data.name}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Phone No.</label>
          <input
            value={data.phone}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email ID</label>
          <input
            value={data.email_id}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="text-sm font-medium">Message</label>
        <textarea
          value={data.message}
          disabled
          rows={4}
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>

      {/* Status Update */}
      <div className="flex items-center gap-4">
        <select
          className="border px-3 py-2 rounded w-48"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
        >
          <option value={0}>Pending</option>
          <option value={1}>Completed</option>
          <option value={2}>Rejected</option>
        </select>

        <button
          onClick={updateStatus}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  )
}
