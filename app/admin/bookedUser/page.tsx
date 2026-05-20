"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronUp, ChevronDown, MessageSquare } from "lucide-react"
import { getUserFromToken } from "@/hooks/use-token"
import Pagination from "@/components/pagination"
import { useRouter } from "next/navigation"

interface UserData {
  id: number
  name: string
  email_address: string
  phone_no: string
}

interface AvailabilityData {
  date: string
  from_time: string
  to_time: string
}

interface BookingData {
  id: number
  availability_id: number
  consultant_id: number
  buyer_id: number
  amount: number
  order_id: string
  payment_id: string | null
  signature: string | null
  status: number
  created_at: string
  buyer: UserData
  availability: AvailabilityData
}

type SortField = "id" | "amount" | "status" | "buyer" | "availability"
type SortDirection = "asc" | "desc"

export default function BookedUserPage() {
  const router = useRouter()
  const [data, setData] = useState<BookingData[]>([])
  const [filteredData, setFilteredData] = useState<BookingData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("id")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const user = getUserFromToken()
  const userId = user?.user_id

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`https://paper-deal-server.onrender.com/api/consultant-booking/${userId}`)
        if (response.status === 404) {
          setData([])
          setFilteredData([])
          return
        }
        if (!response.ok) throw new Error("Failed to fetch consultant bookings")
        const result = await response.json()
        setData(result)
        setFilteredData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId])

  // Search
  useEffect(() => {
    const filtered = data.filter((item) =>
      [
        item.id,
        item.amount,
        item.status,
        item.buyer?.name,
        item.buyer?.email_address,
        item.buyer?.phone_no,
        item.availability?.from_time,
        item.availability?.to_time,
        item.availability?.date,
      ]
        .filter(Boolean)
        .some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredData(filtered)
    setCurrentPage(1)
  }, [searchTerm, data])

  // Sort
  const handleSort = (field: SortField) => {
    const direction = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(direction)

    const sorted = [...filteredData].sort((a, b) => {
      let aValue: any = a[field as keyof BookingData]
      let bValue: any = b[field as keyof BookingData]

      if (field === "buyer") {
        aValue = a.buyer?.name || ""
        bValue = b.buyer?.name || ""
      }
      if (field === "availability") {
        aValue = `${a.availability?.date} ${a.availability?.from_time}`
        bValue = `${b.availability?.date} ${b.availability?.from_time}`
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue
      }
      return 0
    })

    setFilteredData(sorted)
  }

  // Export functions
  const exportToCSV = () => {
    const headers = ["ID", "Buyer Name", "Email", "Phone", "Date & Time", "Amount Paid", "Status"]
    const csvContent = [
      headers.join(","),
      ...filteredData.map((row) =>
        [
          row.id,
          row.buyer?.name,
          row.buyer?.email_address,
          row.buyer?.phone_no,
          `${row.availability?.date || ''} ${row.availability?.from_time || ''} - ${row.availability?.to_time || ''}`,
          row.amount,
          row.status === 1 ? "Confirmed" : "Pending",
        ].join(",")
      ),
    ].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "consultant-bookings.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    const text = filteredData
      .map(
        (row) =>
          `${row.id}\t${row.buyer?.name || ''}\t${row.buyer?.email_address || ''}\t${row.buyer?.phone_no || ''}\t${row.availability?.date || ''} ${row.availability?.from_time || ''} - ${row.availability?.to_time || ''}\t${row.amount}\t${row.status === 1 ? 'Confirmed' : 'Pending'}`
      )
      .join("\n")
    navigator.clipboard.writeText(text)
  }

  const printTable = () => window.print()

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline-block ml-1" />
    )
  }

  if (loading) return <Card className="py-8 text-center">Loading Bookings...</Card>
  if (error) return <Card className="py-8 text-center text-red-600">Error: {error}</Card>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booked Users (Consultations)</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Export & Search */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={copyToClipboard}>
              Copy
            </Button>
            <Button variant="secondary" size="sm" onClick={exportToCSV}>
              CSV
            </Button>
            <Button variant="secondary" size="sm" onClick={printTable}>
              Print
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="text-sm font-medium">
              Search:
            </label>
            <Input id="search" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-48" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["ID", "Buyer Name", "Email", "Phone", "Date & Time", "Amount Paid", "Status", "Action"].map(
                  (field, index) => {
                    const sortKey =
                      field === "Buyer Name" ? "buyer" :
                        field === "Date & Time" ? "availability" :
                          field === "Amount Paid" ? "amount" :
                            field === "Status" ? "status" : "id";

                    return (
                      <th
                        key={index}
                        onClick={() =>
                          field !== "Action" && handleSort(sortKey as SortField)
                        }
                        className={`px-4 py-2 text-left ${field !== "Action" ? "cursor-pointer hover:bg-gray-100" : ""}`}
                      >
                        <span className="flex items-center">
                          {field}
                          {field !== "Action" && (
                            <SortIcon field={sortKey as SortField} />
                          )}
                        </span>
                      </th>
                    );
                  }
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-2 font-medium">{row.id}</td>
                  <td className="px-4 py-2">{row.buyer?.name || "N/A"}</td>
                  <td className="px-4 py-2">{row.buyer?.email_address || "N/A"}</td>
                  <td className="px-4 py-2">{row.buyer?.phone_no || "N/A"}</td>
                  <td className="px-4 py-2">
                    {row.availability
                      ? `${new Date(row.availability.date).toLocaleDateString()} ${row.availability.from_time} - ${row.availability.to_time}`
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">Rs. {row.amount}</td>
                  <td className="px-4 py-2">
                    <Badge
                      variant={row.status === 1 ? "default" : "secondary"}
                      className={row.status === 1 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {row.status === 1 ? "Confirmed" : "Pending"}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/chat/${row.buyer?.id}`)}
                      className="flex items-center gap-1"
                      disabled={!row.buyer?.id}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  )
}
