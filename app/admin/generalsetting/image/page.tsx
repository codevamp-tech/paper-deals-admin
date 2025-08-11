"use client"

export default function ImagePage() {
  const data = [
    { id: 1, title: "Banner 1", url: "/placeholder.svg" },
    { id: 2, title: "Banner 2", url: "/placeholder.svg" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Image</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Preview</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="px-4 py-2">{row.title}</td>
                <td className="px-4 py-2"><img src={row.url} alt={row.title} className="h-10" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
