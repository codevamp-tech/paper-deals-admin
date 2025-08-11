import Link from "next/link";
import { ArrowRight, Play, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>

      {/* 🔐 Admin Login Button */}
    <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
  <Button asChild variant="outline" size="sm" className="bg-white/80 hover:bg-white text-orange-600 shadow-md">
    <Link href="/admin/login" className="flex items-center gap-2">
      <LogIn className="h-4 w-4" />
      Admin Login
    </Link>
  </Button>

  <Button asChild variant="outline" size="sm" className="bg-white/80 hover:bg-white text-orange-600 shadow-md">
    <Link href="/admin/signup" className="flex items-center gap-2">
      <UserPlus className="h-4 w-4" />
      Signup
    </Link>
  </Button>
</div>

      <div className="container section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🇮🇳 Proudly Made in India • ISO Certified
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Premium Manufacturing
              <span className="text-orange-600 block">Solutions from India</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Leading manufacturer and exporter specializing in wood handicrafts from Bareilly, electronics from Noida,
              and textiles from Delhi. Quality products with competitive MOQ and global shipping.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild className="btn-primary group">
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="btn-secondary group bg-transparent">
                <Link href="/contact">
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Global Export</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Indian Manufacturing Facility"
                className="rounded-2xl shadow-2xl w-full"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/90 hover:bg-white text-orange-600 rounded-full p-4 shadow-lg transition-all hover:scale-110">
                  <Play className="h-8 w-8 ml-1" />
                </button>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="text-2xl font-bold text-orange-600">ISO</div>
              <div className="text-sm text-gray-600">9001:2015</div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="text-2xl font-bold text-green-600">MSME</div>
              <div className="text-sm text-gray-600">Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
