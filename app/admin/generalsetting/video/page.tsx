"use client"

export default function VideoPage() {
  const videos = [
    {
      id: 7,
      title: "Indore Paper Traders Association Celebrating Paper Day at School",
      url: "https://www.youtube.com/embed/example1",
      createdAt: "2024-07-30 11:30:48"
    },
    {
      id: 6,
      title: "kishkindha",
      url: "https://www.youtube.com/embed/example2",
      createdAt: "2024-11-21 16:08:06"
    },
    {
      id: 5,
      title: "TEst",
      url: "https://www.youtube.com/embed/example3",
      createdAt: "2025-07-04 16:16:02"
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Upload Video Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upload Video</h2>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">Video</label>
            <input
              type="text"
              placeholder="Enter Video URL"
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">Video Title</label>
            <input
              type="text"
              placeholder="Video Title"
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

      {/* Videos Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Videos</h2>
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
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Video</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Edit</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id} className="border-t">
                  <td className="px-4 py-2 border">{video.id}</td>
                  <td className="px-4 py-2 border">{video.title}</td>
                  <td className="px-4 py-2 border">
                    <iframe
                      width="120"
                      height="70"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </td>
                  <td className="px-4 py-2 border">{video.createdAt}</td>
                  <td className="px-4 py-2 border">
                    <button className="bg-green-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
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
