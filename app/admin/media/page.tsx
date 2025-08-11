"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MediaFile {
  _id: string
  filename: string
  url: string
  type: string
  size: number
  createdAt: string
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchMediaFiles()
  }, [])

  const fetchMediaFiles = async () => {
    try {
      const response = await fetch("/api/media")
      const data = await response.json()
      setMediaFiles(data.files || [])
    } catch (error) {
      console.error("Error fetching media files:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMediaFiles(mediaFiles.filter((f) => f._id !== id))
      }
    } catch (error) {
      console.error("Error deleting file:", error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Gallery</h1>
          <p className="text-gray-600">Manage your images and media files</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Upload className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Media Files</DialogTitle>
            </DialogHeader>
            <MediaUploadForm
              onUpload={() => {
                fetchMediaFiles()
                setIsDialogOpen(false)
              }}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Media Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mediaFiles.map((file) => (
          <Card key={file._id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              {file.type.startsWith("image/") ? (
                <img
                  src={file.url || "/placeholder.svg"}
                  alt={file.filename}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{file.type}</p>
                  </div>
                </div>
              )}

              <div className="absolute top-2 right-2 flex space-x-1">
                <Button variant="secondary" size="sm" asChild>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-3 w-3" />
                  </a>
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleDelete(file._id)}>
                  <Trash2 className="h-3 w-3 text-red-600" />
                </Button>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900 truncate">{file.filename}</h3>
              <div className="text-sm text-gray-500 mt-1">
                <p>{formatFileSize(file.size)}</p>
                <p>{new Date(file.createdAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mediaFiles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No media files uploaded yet</p>
            <p className="text-gray-400">Upload your first media file to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function MediaUploadForm({ onUpload, onCancel }: { onUpload: () => void; onCancel: () => void }) {
  const [files, setFiles] = useState<FileList | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!files || files.length === 0) {
      alert("Please select files to upload")
      return
    }

    setIsLoading(true)

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData()
        formData.append("file", files[i])

        const response = await fetch("/api/media", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${files[i].name}`)
        }
      }

      onUpload()
    } catch (error) {
      console.error("Error uploading files:", error)
      alert("Error uploading files. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="files">Select Files</Label>
        <Input
          id="files"
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => setFiles(e.target.files)}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
        />
        <p className="text-sm text-gray-500 mt-1">Select multiple images or videos to upload</p>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload Files"}
        </Button>
      </div>
    </form>
  )
}
