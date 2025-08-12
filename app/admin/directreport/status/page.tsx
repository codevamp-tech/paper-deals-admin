"use client"

export default function DirectStatusReportPage() {
  const data = [
    { id: 1, orderId: "DSR-4001", status: "Pending", lastUpdate: "2025-08-09" },
    { id: 2, orderId: "DSR-4002", status: "Shipped", lastUpdate: "2025-08-10" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Direct Status Report</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="px-4 py-2">{row.orderId}</td>
                <td className="px-4 py-2">{row.status}</td>
                <td className="px-4 py-2">{row.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
