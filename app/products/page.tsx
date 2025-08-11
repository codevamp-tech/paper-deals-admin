"use client"

import { useState } from "react"
import { Search, Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// Dummy product data
const products = [
  {
    id: 1,
    name: "Handcrafted Wooden Dining Table",
    category: "wood",
    city: "Bareilly",
    image: "/placeholder.svg?height=300&width=400",
    price: "₹15,000 - ₹25,000",
    moq: "10 pieces",
    description: "Premium teak wood dining table with intricate carvings",
    specs: ["Material: Teak Wood", "Size: 6x4 feet", "Finish: Natural Polish"],
  },
  {
    id: 2,
    name: "LED PCB Assembly",
    category: "electronics",
    city: "Noida",
    image: "/placeholder.svg?height=300&width=400",
    price: "₹50 - ₹200",
    moq: "500 pieces",
    description: "High-quality LED PCB with SMD components",
    specs: ["Voltage: 12V DC", "Power: 5W-20W", "Certification: CE, RoHS"],
  },
  {
    id: 3,
    name: "Cotton Bed Sheets Set",
    category: "textiles",
    city: "Delhi",
    image: "/placeholder.svg?height=300&width=400",
    price: "₹800 - ₹1,500",
    moq: "100 sets",
    description: "100% cotton bed sheets with modern prints",
    specs: ["Material: 100% Cotton", "Thread Count: 200TC", "Size: King/Queen"],
  },
  {
    id: 4,
    name: "Decorative Wooden Mirror Frame",
    category: "wood",
    city: "Bareilly",
    image: "/placeholder.svg?height=300&width=400",
    price: "₹2,000 - ₹5,000",
    moq: "25 pieces",
    description: "Intricately carved wooden mirror frame",
    specs: ["Material: Mango Wood", "Size: 24x36 inches", "Finish: Antique"],
  },
  {
    id: 5,
    name: "IoT Sensor Module",
    category: "electronics",
    city: "Noida",
    image: "/placeholder.svg?height=300&width=400",
    price: "₹300 - ₹800",
    moq: "200 pieces",
    description: "Smart IoT sensor for temperature and humidity monitoring",
    specs: ["Connectivity: WiFi/Bluetooth", "Range: -40°C to 85°C", "Battery: 3.7V Li-ion"],
  },
  {
    id: 6,
    name: "Designer Kurta Set",
    category: "textiles",
    city: "Delhi",
    image: "/placeholder.svg?height=300&width=400",
    price: "₹1,200 - ₹2,500",
    moq: "50 pieces",
    description: "Traditional Indian kurta with modern designs",
    specs: ["Material: Cotton Silk", "Sizes: S to XXL", "Colors: Multiple"],
  },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "wood", label: "Wood & Handicrafts" },
  { value: "electronics", label: "Electronics" },
  { value: "textiles", label: "Textiles" },
]

const cities = [
  { value: "all", label: "All Cities" },
  { value: "Bareilly", label: "Bareilly" },
  { value: "Noida", label: "Noida" },
  { value: "Delhi", label: "Delhi" },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesCity = selectedCity === "all" || product.city === selectedCity

    return matchesSearch && matchesCategory && matchesCity
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600">
            Discover our comprehensive range of high-quality products manufactured across India
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {product.city}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Specifications:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.specs.map((spec, index) => (
                      <li key={index}>• {spec}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-lg font-bold text-orange-600">{product.price}</div>
                    <div className="text-sm text-gray-500">MOQ: {product.moq}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 btn-primary">Get Quote</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
