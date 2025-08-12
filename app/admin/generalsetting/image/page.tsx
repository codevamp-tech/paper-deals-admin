"use client"

export default function ImagePage() {
  const images = [
    {
      id: 10,
      title: "DELHI NCR RECYCLING PAPER SUPPLIERS - MEETING - LEELA HOTEL DELHI",
      createdAt: "2024-08-09 19:23:01"
    },
    {
      id: 9,
      title: "IRPTA - PANNEL DISUSSION - Domestic & Influence of imports -11th May 2022",
      createdAt: "2024-08-09 20:11:50"
    },
    {
      id: 8,
      title: 'IPPTA meet "vision 2030"',
      createdAt: "2024-08-09 20:17:32"
    },
    {
      id: 7,
      title: "IRPTA Panel Discussion: OUT LOOK RECOVER PAPER INDIA ( DATE- 7th DEC 23)",
      createdAt: "2024-08-09 20:19:39"
    },
    {
      id: 6,
      title: "Germany visit organized by FPTA to the Drupa trip",
      createdAt: "2024-08-12 17:26:49"
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Add Image Form */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Add Image</h2>
        <div className="bg-white shadow rounded-lg p-4 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter Event Name"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              multiple
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Images Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Images</h2>
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
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Edit</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image.id} className="border-t">
                  <td className="px-4 py-2 border">{image.id}</td>
                  <td className="px-4 py-2 border">{image.title}</td>
                  <td className="px-4 py-2 border">{image.createdAt}</td>
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
