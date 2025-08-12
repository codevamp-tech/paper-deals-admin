"use client"

export default function AssociationPartnersPage() {
  const partners = [
    { id: 6, name: "Mam", createdAt: "2024-06-17 05:39:52" },
    { id: 5, name: "Testing", createdAt: "2024-11-21 15:27:05" },
    { id: 4, name: "MACHINE", createdAt: "2025-07-01 14:39:53" },
    { id: 3, name: "Testing", createdAt: "2025-07-07 12:06:38" },
    { id: 2, name: "machine", createdAt: "2025-07-09 12:18:32" },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Add Association Partner Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Add ASSOCIATION PARTNER</h2>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <div>
            <label className="block text-sm mb-1">Bottom Logo</label>
            <input type="file" className="border rounded px-2 py-1" />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">Logo Name</label>
            <input
              type="text"
              placeholder="Logo Name"
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="self-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Association Partner Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">ASSOCIATION PARTNER</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {/* Top Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              <button className="bg-gray-500 text-white px-3 py-1 rounded">Copy</button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded">CSV</button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded">Excel</button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded">PDF</button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded">Print</button>
            </div>
            <div>
              <label className="mr-2 text-sm">Search:</label>
              <input type="text" className="border px-2 py-1 rounded" />
            </div>
          </div>

          {/* Table */}
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Main Logo</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id} className="border-t">
                  <td className="px-4 py-2 border">{partner.id}</td>
                  <td className="px-4 py-2 border">{partner.name}</td>
                  <td className="px-4 py-2 border">{partner.createdAt}</td>
                  <td className="px-4 py-2 border text-blue-600 cursor-pointer">
                    Action ▼
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
