"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getCookie } from "@/hooks/use-cookies"
import { Button } from "@/components/ui/button"
import { getUserFromToken } from "@/hooks/use-token"

// Modal Component
const MessagePopup = ({ isOpen, onClose, sentSellerIds, enquiryProduct }: {
  isOpen: boolean
  onClose: () => void
  sentSellerIds: number[]
  enquiryProduct: string
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Messages Sent Successfully!
          </h3>
          <p className="text-gray-600 mb-4">
            Enquiry has been sent to the following sellers
          </p>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function EnquiryDetailPage() {
  const params = useParams()
  const { id } = params
  const [enquiry, setEnquiry] = useState<any>(null)
  const [status, setStatus] = useState<number>(0)
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [sentSellerIds, setSentSellerIds] = useState<number[]>([])
  const token = getCookie("token")
  const user = getUserFromToken();
  const userRole = user?.user_role

  useEffect(() => {
    fetch(`https://paper-deal-server.onrender.com/api/enquiry/getbyId/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setEnquiry(data)
        setStatus(data.status)
        // Once enquiry is loaded, fetch related seller enquiries
        if (data?.category_id) {
          fetch(
            `https://paper-deal-server.onrender.com/api/product/by-category/${data.category_id}`,
            {
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          )
            .then(res => res.json())
            .then(resp => {
              setEnquiries(resp.sellers || [])
            })
            .catch(err => console.error(err))
        }
      })
      .catch(err => console.error(err))

    // Fetch messages for enquiryShow
    fetch(`https://paper-deal-server.onrender.com/api/enquiry/enquiryShow/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then(resp => setMessages(resp || []))
      .catch(err => console.error(err))
  }, [id])

  // Update status
  const handleUpdate = () => {
    fetch(`https://paper-deal-server.onrender.com/api/enquiry/enquiries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    })
      .then(res => res.json())
      .then(() => {
        setEnquiry((prev: any) => ({ ...prev, status }))
        alert("Status updated successfully!")
      })
      .catch(err => console.error(err))
  }

  const handleCheckboxChange = (seller_id: number | null | undefined) => {
    if (seller_id === null || seller_id === undefined) return;

    setSelectedIds((prev) =>
      prev.includes(seller_id)
        ? prev.filter((id) => id !== seller_id)
        : [...prev, seller_id]
    );
  };



  const handleSendMessages = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one seller.")
      return
    }

    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/enquiry/send-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          id: selectedIds,
          product: enquiry.product,
          enq_id: enquiry.id,
        }),
      })

      const data = await res.json()

      if (data.success) {
        // Show popup instead of alert
        setSentSellerIds(selectedIds)
        setShowPopup(true)
        setSelectedIds([]) // clear selection
        // Optionally append new messages to the table
        if (data.messages) setMessages(prev => [...prev, ...data.messages])
      } else {
        alert("Failed to send messages")
      }
    } catch (err) {
      console.error(err)
      alert("An error occurred while sending messages")
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setSentSellerIds([])
  }

  if (!enquiry) return <p className="m-6">Loading...</p>

  return (
    <div className="m-6 space-y-8">
      {/* Message Popup */}
      <MessagePopup
        isOpen={showPopup}
        onClose={handleClosePopup}
        sentSellerIds={sentSellerIds}
        enquiryProduct={enquiry.product || ""}
      />

      {/* Enquiry Detail Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Enquiry Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {userRole !== 2 && (
            <>
              <div>
                <label className="block font-medium">Buyer</label>
                <input
                  value={enquiry.buyer?.name || ""}
                  disabled
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  value={enquiry.buyer?.email_address || ""}
                  disabled
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Phone</label>
                <input
                  value={enquiry.phone || ""}
                  disabled
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </>
          )}
          <div>
            <label className="block font-medium">City</label>
            <input
              value={enquiry.city || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Category</label>
            <input
              value={enquiry.category?.name || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Product</label>
            <input
              value={enquiry.product || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">GSM</label>
            <input
              value={enquiry.gsm || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Shade</label>
            <input
              value={enquiry.shade || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Quantity</label>
            <input
              value={enquiry.quantity_in_kg || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Remarks</label>
            <textarea
              value={enquiry.remarks || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          {userRole !== 2 && (
            <div>
              <label className="block font-medium">Created At</label>
              <input
                value={new Date(enquiry.created_at).toLocaleString()}
                disabled
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          )}
          <div>
            <label className="block font-medium">Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value={1}>Accepted</option>
              <option value={0}>Pending</option>
              <option value={2}>Rejected</option>
            </select>
          </div>
        </div>
        <div className="pt-4">
          <Button onClick={handleUpdate}>Update Status</Button>
        </div>
      </div>
      {userRole !== 2 && (
        <>
          {/* Seller Enquiries List */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              Seller Enquiries List
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="border p-3 text-left">ID</th>
                    <th className="border p-3 text-left">Company Name</th>
                    <th className="border p-3 text-left">City</th>
                    <th className="border p-3 text-center">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((item: any, idx) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/70"
                        }`}
                    >
                      <td className="border p-3">{item.organization?.id}</td>
                      <td className="border p-3">{item.organization?.organizations}</td>
                      <td className="border p-3">{item.organization?.city}</td>
                      <td className="border p-3 text-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          disabled={item.id === null || item.id === undefined}
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                        />

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedIds.length > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <Button variant="default" onClick={handleSendMessages}>
                  Proceed
                </Button>
              </div>
            )}
          </div>

          {/* Enquiry Messages */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              Enquiry Messages
            </h2>

            {messages.length === 0 ? (
              <p className="text-gray-500">No messages found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="border p-3 text-left">ID</th>
                      <th className="border p-3 text-left">Contact Person</th>
                      <th className="border p-3 text-left">Buyer Name</th>
                      <th className="border p-3 text-left">Buyer Phone</th>
                      <th className="border p-3 text-left">Seller Id</th>
                      <th className="border p-3 text-left">Seller Phone</th>
                      <th className="border p-3 text-left">Category</th>
                      <th className="border p-3 text-left">Product</th>
                      <th className="border p-3 text-left">City</th>
                      <th className="border p-3 text-left">Shade</th>
                      <th className="border p-3 text-left">GSM</th>
                      <th className="border p-3 text-left">Remarks</th>
                      <th className="border p-3 text-left">Created At</th>
                      <th className="border p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg: any, idx) => (
                      <tr
                        key={msg.id}
                        className={`hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/70"
                          }`}
                      ><td className="border p-3">
                          {msg.id}
                        </td>
                        <td className="border p-3">
                          {msg.enquiry?.name || ''}
                        </td>
                        <td className="border p-3">
                          {msg.enquiry?.buyer?.name || ''}
                        </td>
                        <td className="border p-3">
                          {msg.enquiry?.buyer?.phone_no || ''}
                        </td>
                        <td className="border p-3">KPDS_{msg.seller_id || ''}</td>
                        <td className="border p-3">{msg.seller?.phone_no || ''}</td>
                        <td className="border p-3">
                          {msg.enquiry?.category?.name || msg.enquiry?.category_id || ''}
                        </td>
                        <td className="border p-3">{msg.product || msg.enquiry?.product || ''}</td>
                        <td className="border p-3">{msg.enquiry?.city || ''}</td>
                        <td className="border p-3">{msg.enquiry?.shade || ''}</td>
                        <td className="border p-3">{msg.enquiry?.gsm || ''}</td>
                        <td className="border p-3">{msg.enquiry?.remarks || ''}</td>
                        <td className="border p-3">
                          {msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}
                        </td>
                        <td className="border p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${msg.status === 1
                            ? "bg-green-100 text-green-800"
                            : msg.status === 2
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {msg.status === 1
                              ? "Accepted"
                              : msg.status === 2
                                ? "Rejected"
                                : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}