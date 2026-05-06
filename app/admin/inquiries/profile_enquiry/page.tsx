"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/pagination"
import { getCookie } from "@/hooks/use-cookies"
import { getUserFromToken } from "@/hooks/use-token"
import { useRouter } from "next/navigation"

type ModeTab = "all" | "B2B" | "B2C"

export default function EnquiryPage() {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<any | null>(null)
  const [status, setStatus] = useState<number>(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // Read saved admin mode from localStorage (default: "all")
  const [modeTab, setModeTab] = useState<ModeTab>("all")
  const router = useRouter()
  const limit = 10
  const token = getCookie("token")
  const user = getUserFromToken()
  const userRole = (user as any)?.user_role
  const isSellerView = userRole === 1 || userRole === 4

  // Auto-select tab from admin's stored business mode (key: "admin business mode", values: "b2b" / "b2c")
  useEffect(() => {
    const saved = localStorage.getItem("admin business mode")
    if (saved === "b2b") setModeTab("B2B")
    else if (saved === "b2c") setModeTab("B2C")
    // else keep "all"
  }, [])

  // fetch enquiries
  useEffect(() => {
    fetch(
      `https://paper-deal-server.onrender.com/api/enquiry/enquiries?page=${page}&limit=${limit}&role=1`,
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
      .then((d) => {
        setData(d.enquiries || [])
        setTotalPages(d.totalPages || 1)
      })
      .catch((err) => console.error(err))
  }, [page])

  // Resolve effective mode for a row (null/undefined → "B2C")
  const getMode = (row: any): "B2B" | "B2C" =>
    row.mode === "B2B" ? "B2B" : "B2C"

  // update enquiry status
  const handleUpdate = async () => {
    if (!selected) return
    try {
      await fetch(
        `https://paper-deal-server.onrender.com/api/enquiry/enquiries/${selected.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      )
      setData((prev) =>
        prev.map((item) =>
          item.id === selected.id ? { ...item, status } : item
        )
      )
      setSelected(null)
    } catch (err) {
      console.error(err)
    }
  }

  // Handle tab switch
  const handleTabChange = (tab: ModeTab) => {
    setModeTab(tab)
    setPage(1)
  }

  // Filter by search + mode tab
  const filtered = data.filter((row) => {
    const matchesSearch =
      row.buyer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      (row.phone && row.phone.toString().includes(search)) ||
      row.city?.toLowerCase().includes(search.toLowerCase())

    const matchesTab = modeTab === "all" || getMode(row) === modeTab
    return matchesSearch && matchesTab
  })

  const tabCount = (v: ModeTab) =>
    v === "all" ? data.length : data.filter((r) => getMode(r) === v).length

  const tabs: { label: string; value: ModeTab }[] = [
    { label: "All Enquiries", value: "all" },
    { label: "B2B Enquiries", value: "B2B" },
    { label: "B2C Enquiries", value: "B2C" },
  ]

  return (
    <div className="m-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 p-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Enquiry Show
        </h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2 md:mt-0 w-full md:w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-0 border-b border-gray-200 mb-4">
        {tabs.map((tab) => {
          const isActive = modeTab === tab.value
          const activeColor =
            tab.value === "B2B"
              ? "border-blue-600 text-blue-700 font-semibold"
              : tab.value === "B2C"
                ? "border-green-600 text-green-700 font-semibold"
                : "border-gray-700 text-gray-900 font-semibold"

          return (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`px-5 py-2.5 text-sm border-b-2 transition-all duration-150 ${isActive
                ? activeColor
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {tab.label}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${isActive
                  ? "bg-blue-50 text-blue-600"
                  : "bg-gray-100 text-gray-500"
                  }`}
              >
                {tabCount(tab.value)}
              </span>
            </button>
          )
        })}
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">ID</th>
                {isSellerView && (
                  <th className="border px-3 py-2">Seller Id</th>
                )}
                <th className="border px-3 py-2">Buyer</th>
                {isSellerView && (
                  <th className="border px-3 py-2">Phone</th>
                )}
                <th className="border px-3 py-2">City</th>
                <th className="border px-3 py-2">Category</th>
                <th className="border px-3 py-2">Product</th>
                <th className="border px-3 py-2">Gsm</th>
                <th className="border px-3 py-2">Shade</th>
                <th className="border px-3 py-2">Quantity</th>
                <th className="border px-3 py-2">Remarks</th>
                <th className="border px-3 py-2">Created At</th>
                <th className="border px-3 py-2">Mode</th>
                <th className="border px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={isSellerView ? 15 : 13}
                    className="text-center py-8 text-gray-400"
                  >
                    No enquiries found for{" "}
                    {modeTab === "all" ? "any mode" : `${modeTab} mode`}.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{row.id}</td>
                    {isSellerView && (
                      <td className="border px-3 py-2">KPDS_{row.user_id}</td>
                    )}
                    <td className="border px-3 py-2">
                      {isSellerView
                        ? row.buyer?.name || "N/A"
                        : `KPDB_${row.buyer_id}`}
                    </td>
                    {isSellerView && (
                      <td className="border px-3 py-2">{row.phone || "-"}</td>
                    )}
                    <td className="border px-3 py-2">{row.city || "-"}</td>
                    <td className="border px-3 py-2">
                      {row.category?.name || "-"}
                    </td>
                    <td className="border px-3 py-2">{row.product || "-"}</td>
                    <td className="border px-3 py-2">{row.gsm || "-"}</td>
                    <td className="border px-3 py-2">{row.shade || "-"}</td>
                    <td className="border px-3 py-2">
                      {row.quantity_in_kg || "-"} {row.quantity_unit || "kg"}
                    </td>
                    <td className="border px-3 py-2">{row.remarks || "-"}</td>
                    <td className="border px-3 py-2">
                      {new Date(row.created_at).toLocaleDateString("en-IN")}
                    </td>

                    {/* Mode badge */}
                    <td className="border px-3 py-2">
                      {getMode(row) === "B2B" ? (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                          B2B
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                          B2C
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="border px-3 py-2">
                      {row.status === 1 && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          Accepted
                        </span>
                      )}
                      {row.status === 0 && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                          Pending
                        </span>
                      )}
                      {row.status === 2 && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                          Rejected
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      {/* Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Enquiry</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <p><b>Buyer:</b> {selected.buyer?.name || "N/A"}</p>
              <p><b>Email:</b> {selected.buyer?.email_address || "N/A"}</p>
              <p><b>Phone:</b> {selected.phone}</p>
              <p><b>City:</b> {selected.city}</p>
              <p><b>Category:</b> {selected.category_id}</p>
              <p><b>Product:</b> {selected.product}</p>
              <p><b>GSM:</b> {selected.gsm}</p>
              <p><b>Shade:</b> {selected.shade}</p>
              <p><b>Quantity:</b> {selected.weight}</p>
              <p><b>Remarks:</b> {selected.remarks}</p>
              <p><b>Mode:</b>{" "}
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getMode(selected) === "B2B"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
                  }`}>
                  {getMode(selected)}
                </span>
              </p>
              <p><b>Created At:</b> {new Date(selected.created_at).toLocaleString()}</p>

              <div>
                <label className="block text-sm font-medium">Update Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value={1}>Accepted</option>
                  <option value={0}>Pending</option>
                  <option value={2}>Rejected</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
