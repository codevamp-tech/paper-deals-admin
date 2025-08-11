"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface Product {
  _id?: string
  name: string
  description: string
  category: string
  city: string
  price: { min: number; max: number }
  moq: string
  image: string
  specifications: string[]
  isActive: boolean
}

interface ProductFormProps {
  product?: Product | null
  onSave: () => void
  onCancel: () => void
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    city: "",
    priceMin: "",
    priceMax: "",
    moq: "",
    specifications: "",
    isActive: true,
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        city: product.city,
        priceMin: product.price?.min?.toString() || "",
        priceMax: product.price?.max?.toString() || "",
        moq: product.moq,
        specifications: product.specifications?.join(", ") || "",
        isActive: product.isActive,
      })
      setImagePreview(product.image)
    }
  }, [product])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const submitData = new FormData()
      submitData.append("name", formData.name)
      submitData.append("description", formData.description)
      submitData.append("category", formData.category)
      submitData.append("city", formData.city)
      submitData.append("priceMin", formData.priceMin)
      submitData.append("priceMax", formData.priceMax)
      submitData.append("moq", formData.moq)
      submitData.append("specifications", formData.specifications)
      submitData.append("isActive", formData.isActive.toString())

      if (image) {
        submitData.append("image", image)
      }

      const url = product ? `/api/products/${product._id}` : "/api/products"
      const method = product ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: submitData,
      })

      if (response.ok) {
        onSave()
      } else {
        throw new Error("Failed to save product")
      }
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Error saving product. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wood">Wood & Handicrafts</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="textiles">Textiles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          required
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">Manufacturing City *</Label>
          <Select value={formData.city} onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bareilly">Bareilly</SelectItem>
              <SelectItem value="Noida">Noida</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priceMin">Min Price (₹)</Label>
          <Input
            id="priceMin"
            type="number"
            value={formData.priceMin}
            onChange={(e) => setFormData((prev) => ({ ...prev, priceMin: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="priceMax">Max Price (₹)</Label>
          <Input
            id="priceMax"
            type="number"
            value={formData.priceMax}
            onChange={(e) => setFormData((prev) => ({ ...prev, priceMax: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="moq">MOQ *</Label>
          <Input
            id="moq"
            required
            value={formData.moq}
            onChange={(e) => setFormData((prev) => ({ ...prev, moq: e.target.value }))}
            placeholder="e.g., 100 pieces"
          />
        </div>

        <div>
          <Label htmlFor="specifications">Specifications</Label>
          <Input
            id="specifications"
            value={formData.specifications}
            onChange={(e) => setFormData((prev) => ({ ...prev, specifications: e.target.value }))}
            placeholder="Comma separated values"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="image">Product Image</Label>
        <div className="mt-1">
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
        />
        <Label htmlFor="isActive">Active Product</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Product"
          )}
        </Button>
      </div>
    </form>
  )
}
