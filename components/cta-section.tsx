import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-orange-600 to-orange-700">
      <div className="container text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Start Your Manufacturing Journey?</h2>
        <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
          Get in touch with us today for a free consultation and quote. Let's discuss how we can help bring your product
          ideas to life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
            <Link href="/contact">
              Get Free Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
          >
            <Link href="https://wa.me/919876543210" target="_blank">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Us
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-orange-100">
          <p>📞 +91-9876543210 | ✉️ info@indiamanufacture.com</p>
        </div>
      </div>
    </section>
  )
}
