import Link from "next/link"
import { MapPin, ArrowRight, Factory, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const cities = [
  {
    name: "Bareilly",
    state: "Uttar Pradesh",
    specialty: "Wood & Handicrafts",
    description:
      "Known for its rich tradition of woodworking and handicrafts, Bareilly is our center for premium wooden furniture and decorative items.",
    image: "/placeholder.svg?height=300&width=500",
    industries: ["Furniture Manufacturing", "Wood Carving", "Handicrafts", "Decorative Items"],
    workforce: "150+ Artisans",
    established: "2012",
    keyProducts: ["Dining Tables", "Wooden Sculptures", "Decorative Frames", "Traditional Furniture"],
    href: "/cities/bareilly",
  },
  {
    name: "Noida",
    state: "Uttar Pradesh",
    specialty: "Electronics & Components",
    description:
      "Our main manufacturing hub in the NCR region, specializing in electronic components, PCB assembly, and IoT devices.",
    image: "/placeholder.svg?height=300&width=500",
    industries: ["Electronics Manufacturing", "PCB Assembly", "IoT Devices", "LED Products"],
    workforce: "200+ Technicians",
    established: "2009",
    keyProducts: ["PCB Assemblies", "LED Modules", "IoT Sensors", "Electronic Components"],
    href: "/cities/noida",
  },
  {
    name: "Delhi",
    state: "National Capital Territory",
    specialty: "Textiles & Garments",
    description:
      "Our textile division in Delhi focuses on premium fabrics, garments, and home textiles with modern designs and quality.",
    image: "/placeholder.svg?height=300&width=500",
    industries: ["Textile Manufacturing", "Garment Production", "Fabric Dyeing", "Home Textiles"],
    workforce: "180+ Workers",
    established: "2015",
    keyProducts: ["Cotton Fabrics", "Designer Garments", "Home Textiles", "Industrial Textiles"],
    href: "/cities/delhi",
  },
]

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Manufacturing Cities</h1>
          <p className="text-xl text-gray-600">
            Discover our specialized manufacturing centers across India, each leveraging local expertise and traditions
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* Cities Grid */}
        <div className="space-y-12">
          {cities.map((city, index) => (
            <Card key={index} className="border-0 shadow-xl overflow-hidden">
              <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <img
                    src={city.image || "/placeholder.svg"}
                    alt={`${city.name} Manufacturing`}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-2 rounded-full font-semibold">
                    {city.specialty}
                  </div>
                </div>

                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-orange-600 mr-2" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      {city.name}, {city.state}
                    </h2>
                  </div>

                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{city.description}</p>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Factory className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Established</div>
                      <div className="text-sm text-gray-600">{city.established}</div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Workforce</div>
                      <div className="text-sm text-gray-600">{city.workforce}</div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Industries</div>
                      <div className="text-sm text-gray-600">{city.industries.length}+ Types</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Key Industries:</h3>
                    <div className="flex flex-wrap gap-2">
                      {city.industries.map((industry, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3">Key Products:</h3>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      {city.keyProducts.map((product, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="btn-primary group w-fit">
                    <Link href={city.href}>
                      Learn More About {city.name}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-600 to-orange-700 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Partner with Us?</h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Connect with our city-specific teams to discuss your manufacturing requirements and get customized
                solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <Link href="/contact">
                    Get Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
                >
                  <Link href="/products">View Products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
