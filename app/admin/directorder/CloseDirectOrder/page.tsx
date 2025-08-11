"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const closedOrders = [
  { id: 1, buyer: "Rahul Mehta", product: "Glass Lamp", quantity: 20 },
  { id: 2, buyer: "Sarah Lee", product: "Cotton Bedsheet", quantity: 15 },
]

export default function CloseDirectOrdersPage() {
  return (
    <Card className="max-w-3xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Closed Direct Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Buyer</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {closedOrders.map((order) => (
              <tr key={order.id}>
                <td className="p-2 border">{order.buyer}</td>
                <td className="p-2 border">{order.product}</td>
                <td className="p-2 border">{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
