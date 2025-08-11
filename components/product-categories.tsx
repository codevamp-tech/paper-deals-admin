import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: "wood",
    title: "Wood & Handicrafts",
    location: "Bareilly, UP",
    description: "Premium wooden furniture, handicrafts, and decorative items crafted by skilled artisans.",
    image: "/placeholder.svg?height=300&width=400",
    products: ["Furniture", "Decorative Items", "Wooden Toys", "Handicrafts"],
    moq: "50 pieces",
    href: "/products/wood",
  },
  {
    id: "electronics",
    title: "Electronics & Components",
    location: "Noida, UP",
    description: "High-quality electronic components, PCBs, and assembled products for global markets.",
    image: "/placeholder.svg?height=300&width=400",
    products: ["PCB Assembly", "Electronic Components", "LED Products", "IoT Devices"],
    moq: "100 pieces",
    href: "/products/electronics",
  },
  {
    id: "textiles",
    title: "Textiles & Garments",
    location: "Delhi, NCR",
    description: "Premium textiles, garments, and fabric products with modern designs and quality.",
    image: "/placeholder.svg?height=300&width=400",
    products: ["Cotton Fabrics", "Garments", "Home Textiles", "Industrial Textiles"],
    moq: "200 pieces",
    href: "/products/textiles",
  },
]

export default function ProductCategories() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Product Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our diverse range of high-quality products manufactured across different cities in India, each
            specializing in their traditional expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {category.location}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Products:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.products.map((product) => (
                      <span key={product} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500">MOQ:</span>
                    <span className="font-semibold text-gray-900 ml-1">{category.moq}</span>
                  </div>
                </div>

                <Button asChild className="w-full btn-primary group">
                  <Link href={category.href}>
                    View Products
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="btn-primary">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
