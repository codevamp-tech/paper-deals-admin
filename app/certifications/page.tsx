import { Download, Award, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const certifications = [
  {
    title: "ISO 9001:2015",
    description: "Quality Management System Certification",
    issuer: "Bureau Veritas",
    validUntil: "March 2026",
    image: "/placeholder.svg?height=300&width=400",
    downloadUrl: "#",
  },
  {
    title: "MSME Registration",
    description: "Micro, Small & Medium Enterprises Registration",
    issuer: "Government of India",
    validUntil: "Permanent",
    image: "/placeholder.svg?height=300&width=400",
    downloadUrl: "#",
  },
  {
    title: "Export License",
    description: "Import Export Code (IEC) License",
    issuer: "DGFT, Ministry of Commerce",
    validUntil: "Permanent",
    image: "/placeholder.svg?height=300&width=400",
    downloadUrl: "#",
  },
  {
    title: "CE Marking",
    description: "European Conformity for Electronics",
    issuer: "Notified Body",
    validUntil: "December 2025",
    image: "/placeholder.svg?height=300&width=400",
    downloadUrl: "#",
  },
]

const awards = [
  {
    title: "MSME Excellence Award 2021",
    description: "Recognition for outstanding contribution to manufacturing sector",
    year: "2021",
  },
  {
    title: "Export Excellence Award",
    description: "Outstanding performance in international trade",
    year: "2020",
  },
  {
    title: "Quality Champion Award",
    description: "Consistent quality delivery and customer satisfaction",
    year: "2019",
  },
]

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Certifications & Awards</h1>
          <p className="text-xl text-gray-600">
            Our commitment to quality and excellence is validated by industry-recognized certifications and awards
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* Certifications Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Certifications</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards of quality and compliance through internationally recognized
              certifications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" className="bg-white/90 text-gray-700 hover:bg-white">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.title}</h3>
                      <p className="text-gray-600 mb-2">{cert.description}</p>
                    </div>
                    <Shield className="h-8 w-8 text-green-600 flex-shrink-0" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Issued by:</span>
                      <span className="font-medium">{cert.issuer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Valid until:</span>
                      <span className="font-medium">{cert.validUntil}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Awards Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our dedication to excellence has been recognized by various industry bodies and government organizations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{award.title}</h3>
                  <p className="text-gray-600 mb-3">{award.description}</p>
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {award.year}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Compliance Section */}
        <section>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Quality Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Quality Control</h4>
                  <p className="text-sm text-gray-600">Rigorous quality checks at every stage</p>
                </div>

                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Environmental</h4>
                  <p className="text-sm text-gray-600">Eco-friendly manufacturing processes</p>
                </div>

                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Safety Standards</h4>
                  <p className="text-sm text-gray-600">Workplace safety and product safety compliance</p>
                </div>

                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Export Compliance</h4>
                  <p className="text-sm text-gray-600">International trade regulations adherence</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
