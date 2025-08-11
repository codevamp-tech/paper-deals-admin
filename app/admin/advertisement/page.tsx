"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const advertisements = [
  {
    id: 1,
    title: "Main Page",
    pageType: "main",
    image: "/ads/sample1.jpg",
    createdAt: "2024-11-06 09:10:59",
  },
  {
    id: 2,
    title: "Main Page 2",
    pageType: "main2",
    image: "/ads/sample2.jpg",
    createdAt: "2024-11-06 09:12:15",
  },
]

export default function AdvertisementPage() {
  const [title, setTitle] = useState("")
  const [pageType, setPageType] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, pageType, image })
    // API call code yahan aayega
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
              <Select onValueChange={(value) => setPageType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Page Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Page (1520*260)</SelectItem>
                  <SelectItem value="main2">Main Page 2</SelectItem>
                  <SelectItem value="buyer">Buyer Page</SelectItem>
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
              <Button type="submit">Save</Button>
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
                    <img src={ad.image} alt="Advertisement Image" className="h-10 w-auto" />
                  </td>
                  <td className="px-4 py-2">{ad.createdAt}</td>
                  <td className="px-4 py-2">
                    <Button size="sm">Edit</Button>
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
