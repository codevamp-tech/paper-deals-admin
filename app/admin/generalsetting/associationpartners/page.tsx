"use client"

export default function AssociationPartnersPage() {
  const data = [
    { id: 1, name: "Partner 1", logo: "/placeholder.svg", joined: "2024-02-15" },
    { id: 2, name: "Partner 2", logo: "/placeholder.svg", joined: "2024-05-20" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Association Partners</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Logo</th>
              <th className="px-4 py-2 text-left">Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2"><img src={row.logo} alt={row.name} className="h-8" /></td>
                <td className="px-4 py-2">{row.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
