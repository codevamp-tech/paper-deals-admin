import { Shield, Award, Globe, Clock, Users, Truck } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "ISO 9001:2015 Certified",
    description: "Quality management system ensuring consistent product quality and customer satisfaction.",
  },
  {
    icon: Award,
    title: "MSME Registered",
    description: "Government recognized small-scale industry with all necessary certifications and compliance.",
  },
  {
    icon: Globe,
    title: "Global Export Experience",
    description: "Successfully exporting to 25+ countries with proper documentation and logistics support.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "98% on-time delivery rate with efficient production planning and supply chain management.",
  },
  {
    icon: Users,
    title: "Skilled Workforce",
    description: "200+ skilled workers and artisans with decades of experience in their respective fields.",
  },
  {
    icon: Truck,
    title: "Flexible MOQ",
    description: "Competitive minimum order quantities to support both small and large-scale requirements.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose IndiaManufacture?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With over 15 years of manufacturing excellence, we combine traditional craftsmanship with modern technology
            to deliver world-class products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
