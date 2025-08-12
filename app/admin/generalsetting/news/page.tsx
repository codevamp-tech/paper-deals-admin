"use client"

export default function NewsPage() {
  const newsList = [
    {
      id: 1,
      title: "Paper Recycling Awareness Drive",
      date: "2024-08-09",
      image: "/placeholder.svg",
      createdAt: "2024-08-10 10:15:00"
    },
    {
      id: 2,
      title: "Industry Meet at Delhi",
      date: "2024-08-07",
      image: "/placeholder.svg",
      createdAt: "2024-08-08 09:30:00"
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Add News Form */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Add News</h2>
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">News Description</label>
            <textarea
              placeholder="News Description"
              className="border rounded px-3 py-2 w-full"
              rows={4}
              required
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>

      {/* News Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">News</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {/* Top Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              {["Copy", "CSV", "Excel", "PDF", "Print"].map((btn) => (
                <button
                  key={btn}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                >
                  {btn}
                </button>
              ))}
            </div>
            <div className="flex items-center">
              <label className="mr-2 text-sm">Search:</label>
              <input
                type="text"
                className="border px-2 py-1 rounded"
                placeholder=""
              />
            </div>
          </div>

          {/* Table */}
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Data</th>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Edit</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((news) => (
                <tr key={news.id} className="border-t">
                  <td className="px-4 py-2 border">{news.id}</td>
                  <td className="px-4 py-2 border">{news.title}</td>
                  <td className="px-4 py-2 border">{news.date}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="h-12 mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border">{news.createdAt}</td>
                  <td className="px-4 py-2 border text-center">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
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
