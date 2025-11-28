"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

interface Advertisement {
  id: number
  title: string
  pageType: string
  image: string
  createdAt: string
}

export default function AdvertisementPage() {
  const [title, setTitle] = useState("")
  const [pageType, setPageType] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
  const [loading, setLoading] = useState(false)

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false)
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editPageType, setEditPageType] = useState("")
  const [editImage, setEditImage] = useState<File | null>(null)
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("https://paper-deal-server.onrender.com/api/advertisement")
        const data = await res.json()

        const mapped = data.map((ad: any) => ({
          id: ad.id,
          title: ad.advertisement_title,
          pageType: ad.page_type,
          image: ad.image,
          createdAt: new Date(ad.created_at).toLocaleString(),
        }))

        setAdvertisements(mapped)
      } catch (err) {
        console.error("Error fetching ads:", err)
      }
    }
    fetchAds()
  }, [])

  // Create new advertisement
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !pageType || !image) {
      alert("Please fill all fields")
      return
    }

    const formData = new FormData()
    formData.append("advertisement_title", title)
    formData.append("page_type", pageType)
    formData.append("image", image)

    setLoading(true)
    try {
      const res = await fetch("https://paper-deal-server.onrender.com/api/advertisement", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        const newAd = await res.json()
        const mappedAd = {
          id: newAd.id,
          title: newAd.advertisement_title,
          pageType: newAd.page_type,
          image: newAd.image,
          createdAt: new Date(newAd.created_at).toLocaleString(),
        }

        setAdvertisements((prev) => [mappedAd, ...prev])
        setTitle("")
        setPageType("")
        setImage(null)
      } else {
        console.error("Failed to save advertisement")
      }
    } catch (err) {
      console.error("Error saving ad:", err)
    } finally {
      setLoading(false)
    }
  }

  // Open edit dialog
  const openEditDialog = (ad: Advertisement) => {
    setEditingAd(ad)
    setEditTitle(ad.title)
    setEditPageType(ad.pageType)
    setEditImage(null)
    setEditOpen(true)
  }

  // Save edited advertisement
  const handleEditSave = async () => {
    if (!editingAd || !editTitle || !editPageType) {
      alert("Please fill all fields")
      return
    }

    const formData = new FormData()
    formData.append("advertisement_title", editTitle)
    formData.append("page_type", editPageType)
    if (editImage) formData.append("image", editImage)

    setEditLoading(true)
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/advertisement/${editingAd.id}`,
        {
          method: "PUT",
          body: formData,
        }
      )

      if (res.ok) {
        const updatedAd = await res.json()
        const mappedAd = {
          id: updatedAd.id,
          title: updatedAd.advertisement_title,
          pageType: updatedAd.page_type,
          image: updatedAd.image,
          createdAt: new Date(updatedAd.created_at).toLocaleString(),
        }

        setAdvertisements((prev) =>
          prev.map((ad) => (ad.id === mappedAd.id ? mappedAd : ad))
        )
        setEditOpen(false)
      } else {
        console.error("Failed to update advertisement")
      }
    } catch (err) {
      console.error("Error updating ad:", err)
    } finally {
      setEditLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Create Advertisement Form */}
      <Card>
        <CardHeader>
          <CardTitle>Advertisement</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>Page Type</Label>
              <Select
                onValueChange={(value) => setPageType(value)}
                value={pageType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Page Type" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="main">Main Page (1520×260)</SelectItem>
                  <SelectItem value="main2">Main Page 2 (756×117)</SelectItem> */}
                  <SelectItem value="buyer">B2C</SelectItem>
                  <SelectItem value="seller">B2B</SelectItem>
                  {/* <SelectItem value="consultant">Consultant Page (1520×300)</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Advertisement</Label>
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            <div>
              <Label>Advertisement Title</Label>
              <Input
                placeholder="Advertisement Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Advertisement List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Advertisement List</h2>
        <div className="border rounded-md overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Advertisement Title</th>
                <th className="px-4 py-2">Page Type</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {advertisements.map((ad) => (
                <tr key={ad.id} className="border-b">
                  <td className="px-4 py-2">{ad.id}</td>
                  <td className="px-4 py-2">{ad.title}</td>
                  <td className="px-4 py-2">{ad.pageType}</td>
                  <td className="px-4 py-2">
                    {ad.image ? (
                      <img src={ad.image} alt="Advertisement" className="h-10 w-auto" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-4 py-2">{ad.createdAt}</td>
                  <td className="px-4 py-2">
                    <Button className="bg-blue-500 hover:bg-blue-600" size="sm" onClick={() => openEditDialog(ad)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
              {advertisements.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No advertisements found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Advertisement Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Advertisement</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <Label>Page Type</Label>
              <Select
                onValueChange={(value) => setEditPageType(value)}
                value={editPageType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Page Type" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="main">Main Page (1520×260)</SelectItem> */}
                  {/* <SelectItem value="main2">Main Page 2 (756×117)</SelectItem> */}
                  <SelectItem value="buyer">B2C</SelectItem>
                  <SelectItem value="seller">B2B</SelectItem>
                  {/* <SelectItem value="consultant">Consultant Page (1520×300)</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Advertisement Title</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            <div>
              <Label>Image</Label>
              <Input
                type="file"
                onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                required
              />
            </div>

            <div className="flex gap-2 mt-4">
              <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleEditSave} disabled={editLoading}>
                {editLoading ? "Saving..." : "Save Changes"}
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
