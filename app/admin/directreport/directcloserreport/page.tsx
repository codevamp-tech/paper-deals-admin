"use client"

export default function DirectCloseReportPage() {
  const data = [
    { id: 1, orderId: "DCR-2001", status: "Closed", date: "2025-08-08" },
    { id: 2, orderId: "DCR-2002", status: "Closed", date: "2025-08-09" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Direct Close Report</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Close Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="px-4 py-2">{row.orderId}</td>
                <td className="px-4 py-2">{row.status}</td>
                <td className="px-4 py-2">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
