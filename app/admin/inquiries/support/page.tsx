"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronUp, ChevronDown, X } from "lucide-react"

const supportData = [
  {
    id: 56,
    subject: "Complaint",
    name: "yash bhardwaj",
    phone: "6395019000",
    email: "yashbhardwaj@gmail.com",
    message: "Read",
    fullMessage:
      "Zaproxy dolore alias impedit expedita quisquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "16:47:58 29-07-2025",
    status: "Completed",
  },
  {
    id: 55,
    subject: "Complaint",
    name: "tanish singh",
    phone: "9897969999",
    email: "tanishsingh@gmail.com",
    message: "Read",
    fullMessage:
      "Tanish alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos.",
    createdAt: "14:27:06 25-07-2025",
    status: "Completed",
  },
  {
    id: 54,
    subject: "Enquiry about Services",
    name: "ajay gupta",
    phone: "9719305555",
    email: "ajaygupta@gmail.com",
    message: "Read",
    fullMessage:
      "Ajay alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos.",
    createdAt: "15:02:20 10-07-2025",
    status: "Completed",
  },
  {
    id: 53,
    subject: "Enquiry about Services",
    name: "vishal singh",
    phone: "9854763210",
    email: "vishalsingh@gmail.com",
    message: "Read",
    fullMessage:
      "Vishal alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos.",
    createdAt: "11:31:57 09-07-2025",
    status: "Completed",
  },
  {
    id: 56,
    subject: "Complaint",
    name: "yash bhardwaj",
    phone: "6395019000",
    email: "yashbhardwaj@gmail.com",
    message: "Read",
    fullMessage:
      "Zaproxy dolore alias impedit expedita quisquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "16:47:58 29-07-2025",
    status: "Completed",
  },
  {
    id: 55,
    subject: "Complaint",
    name: "tanish singh",
    phone: "9897969999",
    email: "tanishsingh@gmail.com",
    message: "Read",
    fullMessage:
      "Tanish alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos.",
    createdAt: "14:27:06 25-07-2025",
    status: "Completed",
  },
  {
    id: 54,
    subject: "Enquiry about Services",
    name: "ajay gupta",
    phone: "9719305555",
    email: "ajaygupta@gmail.com",
    message: "Read",
    fullMessage:
      "Ajay alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos.",
    createdAt: "15:02:20 10-07-2025",
    status: "Completed",
  },
  {
    id: 53,
    subject: "Enquiry about Services",
    name: "vishal singh",
    phone: "9854763210",
    email: "vishalsingh@gmail.com",
    message: "Read",
    fullMessage:
      "Vishal alias impedit expedita quisquam pariatur exercitationem. Nemo rerum eveniet dolores rem quia dignissimos.",
    createdAt: "11:31:57 09-07-2025",
    status: "Completed",
  },
]

type SortField = keyof (typeof supportData)[0]
type SortDirection = "asc" | "desc" | null

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [selectedTicket, setSelectedTicket] = useState<(typeof supportData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortField(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  let filteredData = supportData.filter((item) =>
    Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (sortField && sortDirection) {
    filteredData = [...filteredData].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      const aStr = aValue.toString().toLowerCase()
      const bStr = bValue.toString().toLowerCase()

      if (sortDirection === "asc") {
        return aStr.localeCompare(bStr)
      } else {
        return bStr.localeCompare(aStr)
      }
    })
  }

  const openModal = (ticket: (typeof supportData)[0]) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span className="text-gray-400">↕</span>
    }
    if (sortDirection === "asc") {
      return <ChevronUp className="w-4 h-4 inline ml-1" />
    }
    if (sortDirection === "desc") {
      return <ChevronDown className="w-4 h-4 inline ml-1" />
    }
    return <span className="text-gray-400">↕</span>
  }

  return (
    <div className=" ">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Support</h1>

          {/* Controls Row */}
          <div className="flex justify-between items-center">
            {/* Export Buttons */}
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="bg-gray-600 hover:bg-gray-700 text-white">
                Copy
              </Button>
              <Button variant="secondary" size="sm" className="bg-gray-600 hover:bg-gray-700 text-white">
                CSV
              </Button>
              <Button variant="secondary" size="sm" className="bg-gray-600 hover:bg-gray-700 text-white">
                Excel
              </Button>
              <Button variant="secondary" size="sm" className="bg-gray-600 hover:bg-gray-700 text-white">
                PDF
              </Button>
              <Button variant="secondary" size="sm" className="bg-gray-600 hover:bg-gray-700 text-white">
                Print
              </Button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2">
              <label htmlFor="search" className="text-sm font-medium text-gray-700">
                Search:
              </label>
              <Input
                id="search"
                type="text"
                placeholder=""
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("id")}
                >
                  ID <SortIcon field="id" />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("subject")}
                >
                  Subject <SortIcon field="subject" />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("name")}
                >
                  Name <SortIcon field="name" />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("phone")}
                >
                  Phone <SortIcon field="phone" />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("email")}
                >
                  Email <SortIcon field="email" />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("message")}
                >
                  Message <SortIcon field="message" />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("createdAt")}
                >
                  Created At <SortIcon field="createdAt" />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("status")}
                >
                  Status <SortIcon field="status" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{item.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      <Check className="w-3 h-3 mr-1" />
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                      onClick={() => openModal(item)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">View Support</h2>
              <Button variant="ghost" size="sm" onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 resize-none"
                    rows={2}
                    value={selectedTicket.subject}
                    readOnly
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                    value={selectedTicket.name.toUpperCase()}
                    readOnly
                  />
                </div>

                {/* Email Id */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Id</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                    value={selectedTicket.email}
                    readOnly
                  />
                </div>

                {/* Registered Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registered Mobile Number</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                    value={selectedTicket.phone}
                    readOnly
                  />
                </div>

                {/* Select Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700">
                    <option value="Pending">Pending</option>
                    <option value="Completed" selected={selectedTicket.status === "Completed"}>
                      Completed
                    </option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 resize-none"
                    rows={6}
                    value={selectedTicket.fullMessage}
                    readOnly
                  />
                </div>
              </div>

              {/* Update Button */}
              <div className="mt-6 flex justify-start">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Update</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
