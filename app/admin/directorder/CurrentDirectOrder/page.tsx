"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const currentOrders = [
  { id: 1, buyer: "John Doe", product: "Wooden Chair", quantity: 10 },
  { id: 2, buyer: "Amit Sharma", product: "Steel Table", quantity: 5 },
]

export default function CurrentDirectOrdersPage() {
  return (
    <Card className="max-w-3xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Current Direct Orders</CardTitle>
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
            {currentOrders.map((order) => (
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
