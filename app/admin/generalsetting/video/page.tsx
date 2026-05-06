"use client"

import Pagination from "@/components/pagination"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Video = {
  id: number
  video_title: string
  video: string
  created_at: string
}

export default function VideoPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const [newUrl, setNewUrl] = useState("")
  const [newTitle, setNewTitle] = useState("")

  // Edit Dialog states
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editUrl, setEditUrl] = useState("")

  // Fetch videos
  const fetchVideos = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `http://localhost:5000/api/videos?page=${page}&limit=${limit}`
      )
      const data = await res.json()
      setVideos(data.data) // backend sends {success,total,page,totalPages,data}
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error("Error fetching videos", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [page])

  // Create video
  const handleCreate = async () => {
    if (!newUrl || !newTitle) return alert("Fill all fields")
    try {
      await fetch("http://localhost:5000/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video: newUrl, video_title: newTitle }),
      })
      setNewUrl("")
      setNewTitle("")
      fetchVideos()
    } catch (err) {
      console.error("Error creating video", err)
    }
  }

  // Delete video
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this video?")) return
    try {
      await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "DELETE",
      })
      fetchVideos()
    } catch (err) {
      console.error("Error deleting video", err)
    }
  }

  // Open edit dialog
  const openEditDialog = (video: Video) => {
    setEditId(video.id)
    setEditTitle(video.video_title)
    setEditUrl(video.video)
    setIsEditOpen(true)
  }

  // Save edit
  const handleEditSave = async () => {
    if (!editId || !editTitle || !editUrl) return alert("Fill all fields")
    try {
      await fetch(`http://localhost:5000/api/videos/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video: editUrl, video_title: editTitle }),
      })
      setIsEditOpen(false)
      fetchVideos()
    } catch (err) {
      console.error("Error updating video", err)
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Upload Video Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upload Video</h2>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">Video URL</label>
            <input
              type="text"
              placeholder="Enter Video URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">Video Title</label>
            <input
              type="text"
              placeholder="Video Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="self-end">
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Videos Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Videos</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
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
                    <td className="px-4 py-2 border">{video.video_title}</td>
                    <td className="px-4 py-2 border">
                      <iframe
                        width="120"
                        height="70"
                        src={video.video}
                        title={video.video_title}
                        frameBorder="0"
                        allowFullScreen
                      />
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(video.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border ">
                      <button
                        onClick={() => openEditDialog(video)}
                        className="  px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={(newPage: number) => setPage(newPage)}
            />
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Video Title</label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Video URL</label>
              <Input
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
