import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Global Imports Ltd, USA",
    message: "Outstanding quality and timely delivery. Their wooden handicrafts are exactly what our customers love.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Ahmed Al-Rashid",
    company: "Middle East Electronics, UAE",
    message: "Excellent electronic components with proper certifications. Great communication throughout the process.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Maria Rodriguez",
    company: "European Textiles, Spain",
    message: "High-quality textiles at competitive prices. Their attention to detail is remarkable.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients from around the world have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 italic">"{testimonial.message}"</p>

                <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
