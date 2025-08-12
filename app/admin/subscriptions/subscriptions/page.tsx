"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubscriptionPage() {
  // Dummy data
  const subscriptions = [
    { id: 13, type: "VERIFIED", price: 100 },
    { id: 18, type: "VIP", price: 1 },
  ]

  const detailedSubscriptions = [
    {
      id: 1,
      buyer: "Abhi Papper (Buyer)",
      plan: "VERIFIED",
      amount: 1,
      invoice: "#INV001",
      start: "2024-11-23 11:17:32",
      end: "2025-11-23",
      status: "subscribed",
    },
  ]

  const chatPayments = [
    { id: 22, buyer: "abhishek ty", consultant: "DEMO CONSULTANT", amount: 1, status: "paid" },
    { id: 23, buyer: "DEMO BUYER", consultant: "DEMO CONSULTANT", amount: 1, status: "paid" },
    { id: 25, buyer: "abhishek ty", consultant: "ratan", amount: 1, status: "paid" },
    { id: 28, buyer: "abhishek ty", consultant: "ratan", amount: 1, status: "paid" },
  ]

  return (
    <div className="space-y-8">
      {/* Subscriptions table */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Subscriptions</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Subscriptions Type</th>
              <th className="p-2 border">Subscriptions Price</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td className="p-2 border">{sub.id}</td>
                <td className="p-2 border">{sub.type}</td>
                <td className="p-2 border">{sub.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Detailed Subscriptions table */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Subscriptions</h2>
        <div className="mb-2 flex gap-2">
          <Button size="sm" variant="outline">Copy</Button>
          <Button size="sm" variant="outline">CSV</Button>
          <Button size="sm" variant="outline">Excel</Button>
          <Button size="sm" variant="outline">PDF</Button>
          <Button size="sm" variant="outline">Print</Button>
          <div className="ml-auto">
            <Input placeholder="Search" className="h-8 w-48" />
          </div>
        </div>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Buyer/seller</th>
              <th className="p-2 border">Subscription Plan</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Invoice</th>
              <th className="p-2 border">Start date</th>
              <th className="p-2 border">End date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {detailedSubscriptions.map((sub) => (
              <tr key={sub.id}>
                <td className="p-2 border">{sub.id}</td>
                <td className="p-2 border">{sub.buyer}</td>
                <td className="p-2 border">{sub.plan}</td>
                <td className="p-2 border">{sub.amount}</td>
                <td className="p-2 border">
                  <Button size="sm">Download</Button>
                </td>
                <td className="p-2 border">{sub.start}</td>
                <td className="p-2 border">{sub.end}</td>
                <td className="p-2 border">
                  <Badge className="bg-teal-500">{sub.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Chat Payment History table */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Chat Payment History</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Buyer/seller</th>
              <th className="p-2 border">Consultant</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Invoice</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {chatPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="p-2 border">{payment.id}</td>
                <td className="p-2 border">{payment.buyer}</td>
                <td className="p-2 border">{payment.consultant}</td>
                <td className="p-2 border">{payment.amount}</td>
                <td className="p-2 border">
                  <Button size="sm">Download</Button>
                </td>
                <td className="p-2 border">
                  <Badge className="bg-green-500">{payment.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
