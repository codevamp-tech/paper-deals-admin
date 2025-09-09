"use client"

import { useEffect, useState } from "react"
import Pagination from "@/components/pagination"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Image = {
  id: number
  title: string
  created_at: string
}

export default function ImagePage() {
  const [images, setImages] = useState<Image[]>([])
  const [title, setTitle] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editImage, setEditImage] = useState<Image | null>(null)

  const limit = 10

  // Fetch images
  const fetchImages = async (page = 1) => {
    try {
      const res = await fetch(`http://localhost:5000/api/images?page=${page}&limit=${limit}`)
      const data = await res.json()
      if (data.success) {
        setImages(data.data)
        setTotalPages(data.totalPages)
      }
    } catch (err) {
      console.error("Error fetching images:", err)
    }
  }

  useEffect(() => {
    fetchImages(page)
  }, [page])

  // Add Image
  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append("title", title)
      if (files) {
        Array.from(files).forEach((file) => {
          formData.append("images", file)
        })
      }

      await fetch("http://localhost:5000/api/images", {
        method: "POST",
        body: formData,
      })

      setTitle("")
      setFiles(null)
      fetchImages(page)
    } catch (err) {
      console.error("Error saving image:", err)
    }
  }

  // Delete Image
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return
    try {
      await fetch(`http://localhost:5000/api/images/${id}`, { method: "DELETE" })
      fetchImages(page)
    } catch (err) {
      console.error("Error deleting image:", err)
    }
  }

  // Open Edit Dialog
  const openEditDialog = (image: Image) => {
    setEditImage(image)
    setTitle(image.title)
    setEditDialogOpen(true)
  }

  // Update Image
  const handleUpdate = async () => {
    if (!editImage) return
    try {
      const formData = new FormData()
      formData.append("title", title)
      if (files) {
        Array.from(files).forEach((file) => {
          formData.append("images", file)
        })
      }

      await fetch(`http://localhost:5000/api/images/${editImage.id}`, {
        method: "PUT",
        body: formData,
      })

      setEditDialogOpen(false)
      setEditImage(null)
      setTitle("")
      setFiles(null)
      fetchImages(page)
    } catch (err) {
      console.error("Error updating image:", err)
    }
  }

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Event Name"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Images Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Images</h2>
        <div className="bg-white shadow rounded-lg p-4">
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
                  <td className="px-4 py-2 border">
                    {image.created_at
                      ? new Date(image.created_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                      : "—"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => openEditDialog(image)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4">
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={(p: number) => setPage(p)}
            />
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Replace Image</label>
              <Input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
