"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronUp, ChevronDown } from "lucide-react"
import { getUserFromToken } from "@/hooks/use-token"
import Pagination from "@/components/pagination"

interface UserData {
  id: number
  name: string
  email_address: string
  phone_no: string
}

interface SlotData {
  from_time: string
  to_time: string
  date: string
}

interface ConsultantData {
  id: number
  consultant_id: number
  book_id: number
  slot_id: string
  orderId: string
  payment_id: string | null
  signature: string | null
  consultant_price: number
  status: number
  created_on: string
  to_date: string | null
  created_at: string
  user: UserData
  slot: SlotData
}

type SortField = "id" | "consultant_price" | "status" | "created_on" | "user" | "slot"
type SortDirection = "asc" | "desc"

export default function BookedUserPage() {
  const [data, setData] = useState<ConsultantData[]>([])
  const [filteredData, setFilteredData] = useState<ConsultantData[]>([])
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
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/consultant/bookedUser/${userId}`)
        if (!response.ok) throw new Error("Failed to fetch consultant data")
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
        item.consultant_price,
        item.status,
        item.created_on,
        item.user?.name,
        item.user?.email_address,
        item.user?.phone_no,
        item.slot?.from_time,
        item.slot?.to_time,
        item.slot?.date,
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
      let aValue: any = a[field as keyof ConsultantData]
      let bValue: any = b[field as keyof ConsultantData]

      // special cases
      if (field === "user") {
        aValue = a.user?.name
        bValue = b.user?.name
      }
      if (field === "slot") {
        aValue = a.slot?.from_time
        bValue = b.slot?.from_time
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
    const headers = ["ID", "User Name", "Email", "Phone", "Slot", "Consultant Price", "Status", "Created On"]
    const csvContent = [
      headers.join(","),
      ...filteredData.map((row) =>
        [
          row.id,
          row.user?.name,
          row.user?.email_address,
          row.user?.phone_no,
          `${row.slot?.from_time} - ${row.slot?.to_time}`,
          row.consultant_price,
          row.status,
          row.created_on,
        ].join(",")
      ),
    ].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "booked-users.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    const text = filteredData
      .map(
        (row) =>
          `${row.id}\t${row.user?.name}\t${row.user?.email_address}\t${row.user?.phone_no}\t${row.slot?.from_time} - ${row.slot?.to_time}\t${row.consultant_price}\t${row.status}\t${row.created_on}`
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

  if (loading) return <Card className="py-8 text-center">Loading...</Card>
  if (error) return <Card className="py-8 text-center text-red-600">Error: {error}</Card>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booked Users</CardTitle>
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
                {["ID", "User Name", "Email", "Phone", "Slot", "Consultant Price", "Status", "Created On"].map(
                  (field, index) => (
                    <th
                      key={index}
                      onClick={() =>
                        handleSort(
                          field === "User Name" ? "user" : field === "Slot" ? "slot" : (field.replace(" ", "_").toLowerCase() as SortField)
                        )
                      }
                      className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                    >
                      <span className="flex items-center">
                        {field}
                        <SortIcon
                          field={field === "User Name" ? "user" : field === "Slot" ? "slot" : (field.replace(" ", "_").toLowerCase() as SortField)}
                        />
                      </span>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-2 font-medium">{row.id}</td>
                  <td className="px-4 py-2">{row.user?.name}</td>
                  <td className="px-4 py-2">{row.user?.email_address}</td>
                  <td className="px-4 py-2">{row.user?.phone_no}</td>
                  <td className="px-4 py-2">{`${row.slot?.from_time} - ${row.slot?.to_time}`}</td>
                  <td className="px-4 py-2">{row.consultant_price}</td>
                  <td className="px-4 py-2">
                    <Badge
                      variant={row.status === 1 ? "default" : "secondary"}
                      className={row.status === 1 ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}
                    >
                      {row.status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">{row.created_on}</td>
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
