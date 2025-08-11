const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "500+", label: "Happy Clients" },
  { number: "25+", label: "Export Countries" },
  { number: "10,000+", label: "Products Delivered" },
]

export default function CompanyStats() {
  return (
    <section className="section-padding bg-orange-600">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
