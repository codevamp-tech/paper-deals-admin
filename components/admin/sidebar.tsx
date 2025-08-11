"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  HelpCircle,
  LifeBuoy,
  Award,
  ImageIcon,
  Settings,
  Megaphone,
  Tv,
  SquareArrowOutUpRight,
  MessageSquareWarning,
  Radio,
  FileBadge,
  History,
  Pi,
  CalendarCheck,
  Bolt,
  MessageSquareText,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ✅ Main Navigation Items (only single-link pages)
const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Media Gallery", href: "/admin/media", icon: ImageIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Advertisement", href: "/admin/advertisement", icon: Megaphone },
  { name: "Live Stock", href: "/admin/livestock", icon: Radio },
  { name: "Live Price", href: "/admin/liveprice", icon: FileBadge },
  { name: "Consultant", href: "/admin/consultant", icon: Pi },
  { name: "General Settings", href: "/admin/generalsettings", icon: Bolt },
  { name: "Chat History", href: "/admin/chathistory", icon: MessageSquareText },
  { name: "User", href: "/admin/user", icon: Users },
]

// ✅ Dropdown Menu Component
function DropdownMenu({ title, icon: Icon, isOpen, toggle, links }) {
  const pathname = usePathname()
  const isActive = (href) => pathname === href

  return (
    <div>
      <button
        onClick={toggle}
        className="flex items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        <Icon className="mr-3 h-5 w-5" />
        {title}
        <span className="ml-auto">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
      </button>

      {isOpen && (
        <div className="pl-10 mt-1 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-2 py-2 rounded-md text-sm font-medium ${
                isActive(link.href)
                  ? "bg-orange-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <link.icon className="inline-block mr-2 h-4 w-4" />
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AdminSidebar({ onClose }) {
  const pathname = usePathname()
  const router = useRouter()

  // ✅ Fixed: Added missing state for PD Deals
  const [buyerOpen, setBuyerOpen] = useState(false)
  const [sellerOpen, setSellerOpen] = useState(false)
  const [directOrderOpen, setDirectOrderOpen] = useState(false)
  const [pddealOpen, setPdDealOpen] = useState(false)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [directreportOpen, setdirectreportOpen] = useState(false)
  const [paperreportOpen, setpaperreportOpen] = useState(false)
   const [livestockOpen, setlivestockOpen] = useState(false)
   const [billinghistoryOpen, setbillinghistoryOpen] = useState(false)
   const [subscriptionOpen, setsubscriptionsOpen] = useState(false)
 const [generalsettingOpen, setgeneralsettingOpen] = useState(false);



  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const isActive = (href) => pathname === href

  return (
    <div className="h-full flex flex-col p-4 text-white">
      {/* Mobile Close Button */}
      <div className="flex justify-between items-center md:hidden mb-6">
        <div className="text-lg font-bold">Admin Panel</div>
        <button onClick={onClose}>
          <div className="w-6 h-6" />
        </button>
      </div>

      {/* Logo */}
      <div className="hidden md:flex items-center space-x-2 mb-8">
        <div className="bg-orange-600 text-white p-2 rounded-lg font-bold text-xl">IM</div>
        <div>
          <div className="font-bold text-lg">Admin Panel</div>
          <div className="text-sm text-gray-400">IndiaManufacture</div>
        </div>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {/* Static Single Links */}
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive(item.href)
                ? "bg-orange-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}

        {/* Dropdowns */}
        <DropdownMenu
          title="Buyer"
          icon={MessageSquare}
          isOpen={buyerOpen}
          toggle={() => setBuyerOpen(!buyerOpen)}
          links={[
            { name: "Buyer", href: "/admin/buyer/buyerPage", icon: HelpCircle },
            { name: "Products", href: "/admin/buyer/products", icon: LifeBuoy },
          ]}
        />

        <DropdownMenu
          title="Direct Order"
          icon={MessageSquare}
          isOpen={directOrderOpen}
          toggle={() => setDirectOrderOpen(!directOrderOpen)}
          links={[
            { name: "Create Direct Order", href: "/admin/directorder/create", icon: HelpCircle },
            { name: "Current Direct Order", href: "/admin/directorder/current", icon: LifeBuoy },
            { name: "Close Direct Order", href: "/admin/directorder/close", icon: LifeBuoy },
          ]}
        />

        
        <DropdownMenu
          title="Paper Report"
          icon={MessageSquare}
          isOpen={paperreportOpen}
          toggle={() => setpaperreportOpen(!paperreportOpen)}
          links={[
            { name: "paper deals business report", href: "/admin/paperreport/business", icon: HelpCircle },
            { name: "paper deals business report", href: "/admin/paperreport/status", icon: LifeBuoy },
            { name: "paper deals business report", href: "/admin/paperreport/closure", icon: LifeBuoy },
             { name: "paper deals business report", href: "/admin/paperreport/process", icon: LifeBuoy },
          ]}
        />

             
        <DropdownMenu
          title="General Setting"
          icon={MessageSquare}
          isOpen={generalsettingOpen}
          toggle={() => setgeneralsettingOpen(!generalsettingOpen)}
          links={[
            { name: "Testimonial", href: "/admin/generalsetting/testimonial", icon: HelpCircle },
            { name: "Categories", href: "/admin/generalsetting/categories", icon: LifeBuoy },
            { name: "Main Logo", href: "/admin/generalsetting/logo", icon: LifeBuoy },
             { name: "Association Partner", href: "/admin/generalsetting/partner", icon: LifeBuoy },
               { name: "Videos", href: "/admin/generalsetting/video", icon: HelpCircle },
            { name: "Image", href: "/admin/generalsetting/image", icon: LifeBuoy },
            { name: "News", href: "/admin/generalsetting/news", icon: LifeBuoy },
          
          ]}
        />




         <DropdownMenu
          title="Live Stock"
          icon={MessageSquare}
          isOpen={livestockOpen}
          toggle={() => setlivestockOpen(!livestockOpen)}
          links={[
            { name: "edit live stock", href: "/admin/livestock/stock", icon: HelpCircle },
            { name: "view live stock", href: "/admin/livestock/stock", icon: LifeBuoy },
          ]}
        />

        
         <DropdownMenu
          title="Billing History"
          icon={MessageSquare}
          isOpen={billinghistoryOpen}
          toggle={() => setbillinghistoryOpen(!billinghistoryOpen)}
          links={[
            { name: "Direct Deal Billing", href: "/admin/billinghistory/billing", icon: HelpCircle },
            { name: "PD Deal Billing", href: "/admin/billinghistory/billing", icon: LifeBuoy },
          ]}
        />

          <DropdownMenu
          title="Subscriptions"
          icon={MessageSquare}
          isOpen={subscriptionOpen}
          toggle={() => setsubscriptionsOpen(!subscriptionOpen)}
          links={[
            { name: "subscriptions", href: "/admin/subscriptions/subscribe", icon: HelpCircle },
          
          ]}
        />

        <DropdownMenu
          title="Seller"
          icon={MessageSquare}
          isOpen={sellerOpen}
          toggle={() => setSellerOpen(!sellerOpen)}
          links={[
            { name: "Products", href: "/admin/seller/products", icon: HelpCircle },
            { name: "Seller", href: "/admin/seller/seller", icon: LifeBuoy },
          ]}
        />

        <DropdownMenu
          title="PD Deals"
          icon={MessageSquare}
          isOpen={pddealOpen}
          toggle={() => setPdDealOpen(!pddealOpen)}
          links={[
            { name: "Create Paper Deals", href: "/admin/pddeal/create", icon: HelpCircle },
            { name: "Process Paper Deals", href: "/admin/pddeal/process", icon: LifeBuoy },
            { name: "Current Paper Deals", href: "/admin/pddeal/current", icon: HelpCircle },
            { name: "Close Paper Deals", href: "/admin/pddeal/close", icon: LifeBuoy },
          ]}
        />

         <DropdownMenu
                  title="Direct Report"
                  icon={MessageSquare}
                  isOpen={directreportOpen}
                  toggle={() => setdirectreportOpen(!directreportOpen)}
                  links={[
                    { name: "Direct Business Report", href: "/admin/directreport/business", icon: HelpCircle },
                    { name: "Direct Status Report", href: "/admin/directreport/status", icon: LifeBuoy },
                    { name: "Direct Process Report ", href: "/admin/directreport/process", icon: HelpCircle },
                    { name: "Direct Closer Report", href: "/admin/directreport/closer", icon: LifeBuoy },
                  ]}
                />

        <DropdownMenu
          title="Inquiries"
          icon={MessageSquare}
          isOpen={inquiryOpen}
          toggle={() => setInquiryOpen(!inquiryOpen)}
          links={[
            { name: "Help", href: "/admin/inquiries/help", icon: HelpCircle },
            { name: "Support", href: "/admin/inquiries/support", icon: LifeBuoy },
          ]}
        />
      </div>

      {/* Logout */}
      <div className="pt-6">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  )
}
