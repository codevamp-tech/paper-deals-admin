"use client"

export default function MainLogoPage() {
  const data = [
    { id: 1, name: "Main Logo", url: "/placeholder.svg" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">testimonial</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">testimonial</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2"><img src={row.url} alt={row.name} className="h-12" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
