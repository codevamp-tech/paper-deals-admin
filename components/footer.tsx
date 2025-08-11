import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-orange-600 text-white p-2 rounded-lg font-bold text-xl">IM</div>
              <div>
                <div className="font-bold text-xl">IndiaManufacture</div>
                <div className="text-sm text-gray-400">Quality • Export • Innovation</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Leading manufacturer and exporter from India, specializing in wood handicrafts, electronics, and textiles
              with over 15 years of experience.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-orange-600 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-orange-600 cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-orange-600 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-orange-600 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-orange-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-gray-400 hover:text-orange-600">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-orange-600">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-400 hover:text-orange-600">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Cities */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cities/bareilly" className="text-gray-400 hover:text-orange-600">
                  Bareilly (Wood & Handicrafts)
                </Link>
              </li>
              <li>
                <Link href="/cities/noida" className="text-gray-400 hover:text-orange-600">
                  Noida (Electronics)
                </Link>
              </li>
              <li>
                <Link href="/cities/delhi" className="text-gray-400 hover:text-orange-600">
                  Delhi (Textiles)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-600" />
                <span className="text-gray-400">+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-600" />
                <span className="text-gray-400">info@indiamanufacture.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-orange-600 mt-1" />
                <span className="text-gray-400">
                  Industrial Area, Sector 63,
                  <br />
                  Noida, Uttar Pradesh 201301
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">🇮🇳 Make in India</div>
              <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">ISO 9001:2015</div>
              <div className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-semibold">MSME Certified</div>
            </div>
            <p className="text-gray-400 text-sm">© 2024 IndiaManufacture. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
