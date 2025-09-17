"use client"

import { useEffect, useState } from "react"
import Pagination from "@/components/pagination"

type Deal = {
  id: number
  deal_id?: string
  contact_person: string
  buyer_id: number
  user_id: number
  total_deal_amount: string
  balanced_deal_size: string
  created_on: string
  status: number
  buyerUser?: { name: string }
  user?: { name: string }
}

export default function PdDealsBillingTable() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [filtered, setFiltered] = useState<Deal[]>([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchDeals = async (pageNumber: number = 1) => {
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/pd-deals-master/getPdDealBilling?page=${pageNumber}`)
      const data = await res.json()
      setDeals(data.data || [])
      setFiltered(data.data || [])
      setTotalPages(data.totalPages)
      setPage(data.page)
    } catch (err) {
      console.error("Error fetching deals:", err)
    }
  }

  useEffect(() => {
    fetchDeals()
  }, [])

  useEffect(() => {
    if (!search) {
      setFiltered(deals)
    } else {
      setFiltered(
        deals.filter(
          d =>
            (d.contact_person && d.contact_person.toLowerCase().includes(search.toLowerCase())) ||
            (d.id && d.id.toString().includes(search)) ||
            (d.buyerUser?.name && d.buyerUser.name.toLowerCase().includes(search.toLowerCase())) ||
            (d.user?.name && d.user?.name.toLowerCase().includes(search.toLowerCase()))
        )
      )
    }
  }, [search, deals])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">PD Deals Billing</h2>
        <input
          type="text"
          placeholder="Search by ID, Contact Person, Buyer or Seller"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-80"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Deal ID</th>
              <th className="border px-4 py-2 text-left">Buyer</th>
              <th className="border px-4 py-2 text-left">Seller</th>
              <th className="border px-4 py-2 text-left">Total Amount</th>
              <th className="border px-4 py-2 text-left">Pending Amount</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(deal => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{deal.id}</td>
                  <td className="border px-4 py-2">{deal.deal_id || "-"}</td>
                  <td className="border px-4 py-2">{deal.buyerUser?.name || "-"}</td>
                  <td className="border px-4 py-2">{deal.user?.name || "-"}</td>
                  <td className="border px-4 py-2">{deal.total_deal_amount}</td>
                  <td className="border px-4 py-2">{deal.balanced_deal_size}</td>
                  <td className="border px-4 py-2">{new Date(deal.created_on).toLocaleDateString()}</td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${deal.status === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {deal.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No deals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={fetchDeals}
        />
      </div>
    </div>
  )
}
