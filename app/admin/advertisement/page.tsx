"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  // ✅ Fetch advertisements on mount
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/advertisement")
        const data = await res.json()

        // 🔑 Map API fields to UI-friendly fields
        const mapped = data.map((ad: any) => ({
          id: ad.id,
          title: ad.advertisement_title,
          pageType: ad.page_type,
          image: `http://localhost:5000/${ad.image}`, // absolute path for images
          createdAt: new Date(ad.created_at).toLocaleString(), // formatted date
        }))

        setAdvertisements(mapped)
      } catch (err) {
        console.error("Error fetching ads:", err)
      }
    }
    fetchAds()
  }, [])

  // ✅ Submit handler (POST API)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !pageType || !image) {
      alert("Please fill all fields")
      return
    }

    const formData = new FormData()
    formData.append("advertisement_title", title) // backend field name
    formData.append("page_type", pageType) // backend field name
    formData.append("image", image)

    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/advertisement", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        const newAd = await res.json()

        // map new ad also
        const mappedAd = {
          id: newAd.id,
          title: newAd.advertisement_title,
          pageType: newAd.page_type,
          image: `http://localhost:5000/${newAd.image}`,
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Advertisement</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>Page Type</Label>
              <Select onValueChange={(value) => setPageType(value)} value={pageType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Page Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Page (1520×260)</SelectItem>
                  <SelectItem value="main2">Main Page 2 (756×117)</SelectItem>
                  <SelectItem value="buyer">Buyer Page (1520×300)</SelectItem>
                  <SelectItem value="seller">Seller Page (1520×300)</SelectItem>
                  <SelectItem value="consultant">Consultant Page (1520×300)</SelectItem>
                </SelectContent>
              </Select>
            </div>


            <div>
              <Label>Advertisement</Label>
              <Input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
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
                    <img
                      src={`http://localhost:5000/${ad.image}`}
                      alt="Advertisement"
                      className="h-10 w-auto"
                    />
                  </td>
                  <td className="px-4 py-2">{ad.createdAt}</td>
                  <td className="px-4 py-2">
                    <Button size="sm">Edit</Button>
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
    </div>
  )
}
