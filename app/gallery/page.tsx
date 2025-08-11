"use client"

import { useState } from "react"
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const galleryItems = [
  {
    id: 1,
    type: "image",
    category: "factory",
    title: "Main Manufacturing Facility - Noida",
    image: "/placeholder.svg?height=400&width=600",
    description: "Our state-of-the-art manufacturing facility in Noida",
  },
  {
    id: 2,
    type: "image",
    category: "products",
    title: "Handcrafted Wooden Furniture",
    image: "/placeholder.svg?height=400&width=600",
    description: "Premium wooden furniture crafted by skilled artisans",
  },
  {
    id: 3,
    type: "video",
    category: "factory",
    title: "Electronics Production Line",
    image: "/placeholder.svg?height=400&width=600",
    videoUrl: "#",
    description: "Inside our electronics manufacturing process",
  },
  {
    id: 4,
    type: "image",
    category: "team",
    title: "Our Skilled Workforce",
    image: "/placeholder.svg?height=400&width=600",
    description: "Dedicated team of craftsmen and technicians",
  },
  {
    id: 5,
    type: "image",
    category: "products",
    title: "Textile Collection",
    image: "/placeholder.svg?height=400&width=600",
    description: "Premium textiles and fabrics from our Delhi facility",
  },
  {
    id: 6,
    type: "image",
    category: "factory",
    title: "Quality Control Lab",
    image: "/placeholder.svg?height=400&width=600",
    description: "Advanced quality testing and control facility",
  },
  {
    id: 7,
    type: "video",
    category: "products",
    title: "Wood Carving Process",
    image: "/placeholder.svg?height=400&width=600",
    videoUrl: "#",
    description: "Traditional wood carving techniques in action",
  },
  {
    id: 8,
    type: "image",
    category: "factory",
    title: "Packaging & Shipping",
    image: "/placeholder.svg?height=400&width=600",
    description: "Professional packaging for international shipping",
  },
]

const categories = [
  { value: "all", label: "All" },
  { value: "factory", label: "Factory" },
  { value: "products", label: "Products" },
  { value: "team", label: "Team" },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredItems = galleryItems.filter((item) => selectedCategory === "all" || item.category === selectedCategory)

  const openLightbox = (item: (typeof galleryItems)[0]) => {
    setSelectedItem(item)
    setCurrentIndex(filteredItems.findIndex((i) => i.id === item.id))
  }

  const closeLightbox = () => {
    setSelectedItem(null)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1
    setCurrentIndex(newIndex)
    setSelectedItem(filteredItems[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedItem(filteredItems[newIndex])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-xl text-gray-600">
            Take a visual journey through our manufacturing facilities, products, and team
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              className={selectedCategory === category.value ? "btn-primary" : ""}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => openLightbox(item)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  {item.type === "video" ? (
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  ) : (
                    <div className="h-12 w-12 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium capitalize">
                  {item.category}
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Content */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.title}
                  className="w-full h-96 object-cover"
                />
                {selectedItem.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/90 hover:bg-white text-orange-600 rounded-full p-4 shadow-lg transition-all hover:scale-110">
                      <Play className="h-8 w-8 ml-1" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.title}</h3>
                <p className="text-gray-600">{selectedItem.description}</p>

                <div className="mt-4 text-sm text-gray-500">
                  {currentIndex + 1} of {filteredItems.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
