"use client"

export default function DirectProcessReportPage() {
  const data = [
    { id: 1, orderId: "DPR-3001", buyer: "Tech Solutions", stage: "Processing", date: "2025-08-10" },
    { id: 2, orderId: "DPR-3002", buyer: "Smart Supplies", stage: "Packaging", date: "2025-08-11" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Direct Process Report</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Buyer</th>
              <th className="px-4 py-2 text-left">Stage</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="px-4 py-2">{row.orderId}</td>
                <td className="px-4 py-2">{row.buyer}</td>
                <td className="px-4 py-2">{row.stage}</td>
                <td className="px-4 py-2">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
