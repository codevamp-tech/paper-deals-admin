"use client"

import { useState } from "react"

export default function MediaGalleryPage() {
  const [images, setImages] = useState<string[]>([
    "/media/sample1.jpg",
    "/media/sample2.jpg",
    "/media/sample3.jpg",
  ])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newUrls = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newUrls])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Media Gallery</h2>
        <p className="text-gray-400">Upload and manage your images or videos for use on product pages, banners, or galleries.</p>
      </div>

      {/* Upload section */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium mb-3 text-white">Upload Media</h3>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          className="block w-full text-white bg-gray-700 p-2 rounded"
        />
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded overflow-hidden shadow hover:shadow-lg transition"
          >
            <img src={src} alt={`media-${index}`} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
