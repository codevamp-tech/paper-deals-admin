"use client"

export default function CategoriesPage() {
  const categories = [
    { id: 24, name: "yash bhardwaj", status: "Active" },
    { id: 23, name: "ajay gupta", status: "Active" },
    { id: 22, name: "vishal singh", status: "Inactive" },
    { id: 21, name: "", status: "Inactive" },
    { id: 20, name: "Test Category", status: "Active" },
    { id: 19, name: "Suryenahs iiffuy", status: "Active" },
    { id: 18, name: "HELLO", status: "Active" },
    { id: 17, name: "PEn Paper co.", status: "Inactive" },
    { id: 16, name: "DEMO SELLER", status: "Inactive" },
    { id: 15, name: "waste paper", status: "Active" },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Category
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
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

        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Category Name</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="px-4 py-2 border">{cat.id}</td>
                <td className="px-4 py-2 border">{cat.name}</td>
                <td className="px-4 py-2 border">
                  {cat.status === "Active" ? (
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                      Active 🌐
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm">
                      Inactive ❌
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border text-blue-600 cursor-pointer">
                  Action ▼
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
