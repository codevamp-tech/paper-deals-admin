import { Award, Users, Globe, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const milestones = [
  { year: "2009", event: "Company Founded in Noida" },
  { year: "2012", event: "ISO 9001:2015 Certification" },
  { year: "2015", event: "Started Export Operations" },
  { year: "2018", event: "Expanded to Bareilly & Delhi" },
  { year: "2021", event: "MSME Excellence Award" },
  { year: "2024", event: "500+ Happy Clients Milestone" },
]

const team = [
  {
    name: "Rajesh Kumar",
    position: "Founder & CEO",
    image: "/placeholder.svg?height=200&width=200",
    description: "15+ years in manufacturing and export business",
  },
  {
    name: "Priya Sharma",
    position: "Head of Operations",
    image: "/placeholder.svg?height=200&width=200",
    description: "Expert in quality control and production management",
  },
  {
    name: "Amit Singh",
    position: "Export Manager",
    image: "/placeholder.svg?height=200&width=200",
    description: "Specialist in international trade and logistics",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About IndiaManufacture</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                With over 15 years of manufacturing excellence, we are a leading manufacturer and exporter from India,
                specializing in wood handicrafts, electronics, and textiles. Our commitment to quality and innovation
                has made us a trusted partner for businesses worldwide.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">15+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">500+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Our Manufacturing Team"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To provide world-class manufacturing solutions that combine traditional Indian craftsmanship with
                  modern technology, delivering exceptional value to our global clients while supporting local artisans
                  and communities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To become the most trusted manufacturing partner from India, known for quality, innovation, and
                  reliability. We aim to showcase the best of Indian manufacturing capabilities to the world while
                  maintaining sustainable and ethical business practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small manufacturing unit to a globally recognized brand, here's our story of growth and success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-600 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {milestone.year}
                  </div>
                  <p className="text-gray-700 font-medium">{milestone.event}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced leadership team brings together decades of expertise in manufacturing, quality control,
              and international business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Certified</h3>
              <p className="text-gray-600">ISO 9001:2015 certified manufacturing processes</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Skilled Workforce</h3>
              <p className="text-gray-600">200+ experienced craftsmen and technicians</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">Exporting to 25+ countries worldwide</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">On-Time Delivery</h3>
              <p className="text-gray-600">98% on-time delivery track record</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
