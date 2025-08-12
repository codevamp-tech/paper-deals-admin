"use client"

export default function MainLogoPage() {
  const logos = [
    { id: 6, name: "Flipka", createdAt: "2024-02-29 15:34:10" },
    { id: 5, name: "Hate", createdAt: "2024-02-29 16:43:41" },
    { id: 4, name: "PD", createdAt: "2024-05-17 06:41:05" },
    { id: 3, name: "duplexmachine", createdAt: "2025-07-05 13:00:12" },
    { id: 2, name: "Kraft", createdAt: "2025-07-05 13:01:59" },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Add Main Logo Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Add Main Logo</h2>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <input type="file" className="border rounded px-2 py-1" />
          <input
            type="text"
            placeholder="Logo Name"
            className="border rounded px-2 py-1 flex-1"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>

      {/* Logo Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Logo</h2>
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
              {logos.map((logo) => (
                <tr key={logo.id} className="border-t">
                  <td className="px-4 py-2 border">{logo.id}</td>
                  <td className="px-4 py-2 border">{logo.name}</td>
                  <td className="px-4 py-2 border">{logo.createdAt}</td>
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
