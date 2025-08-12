"use client"

export default function AddTestimonialPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ADD Testimonial</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Writer</label>
              <input
                type="text"
                placeholder="Writer"
                className="w-full border rounded px-3 py-2"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                placeholder="Company"
                className="w-full border rounded px-3 py-2"
                defaultValue="Acme Corp"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Post</label>
              <input
                type="text"
                placeholder="Post"
                className="w-full border rounded px-3 py-2"
                defaultValue="CEO"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Paragraph</label>
            <textarea
              placeholder="Enter Paragraph"
              className="w-full border rounded px-3 py-2"
              rows="5"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
