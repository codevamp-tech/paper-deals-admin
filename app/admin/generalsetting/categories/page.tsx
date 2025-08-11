"use client"

export default function CategoriesPage() {
  const data = [
    { id: 1, category: "Electronics", created: "2024-01-12" },
    { id: 2, category: "Furniture", created: "2024-03-08" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="px-4 py-2">{row.category}</td>
                <td className="px-4 py-2">{row.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
