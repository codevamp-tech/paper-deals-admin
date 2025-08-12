"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {

  BarChart2,
  ListChecks,
  UserCircle,
  PlusCircle,
  Eye,
  Edit,
  FileCheck,
  FileText,
  Workflow,
  LayoutDashboard,
  Activity,
  Headset,
  CheckCircle,
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
  MessageSquareQuote, ListTree, Image, Video, ImagePlus, Newspaper,
  Bolt,
  MessageSquareText,
  Users,
  ChevronDown,
  ChevronRight,
  ClipboardList,

  CreditCard,
  Store,
  Handshake,
  BarChart3
} from "lucide-react"

import { Button } from "@/components/ui/button"

// ✅ Main Navigation Items (only single-link pages)
const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Media Gallery", href: "/admin/media", icon: ImageIcon },
  { name: "Advertisement", href: "/admin/advertisement", icon: Megaphone },
  { name: "Live Price", href: "/admin/livePrice", icon: FileBadge },
  { name: "Consultant", href: "/admin/consultant", icon: Pi },
  { name: "Chat History", href: "/admin/chatHistory", icon: MessageSquareText },
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
              className={`block px-2 py-2 rounded-md text-sm font-medium ${isActive(link.href)
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
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(item.href)
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
          icon={Users}
          isOpen={buyerOpen}
          toggle={() => setBuyerOpen(!buyerOpen)}
          links={[
            { name: "Buyer", href: "/admin/buyer/buyerPage", icon: UserCircle },
            { name: "Products", href: "/admin/buyer/products", icon: Package },

          ]}
        />


        <DropdownMenu
          title="Direct Order"
          icon={ClipboardList}
          isOpen={directOrderOpen}
          toggle={() => setDirectOrderOpen(!directOrderOpen)}
          links={[
            { name: "Create Direct Order", href: "/admin/directorder/Create", icon: PlusCircle },
            { name: "Current Direct Order", href: "/admin/directorder/Current", icon: ClipboardList },
            { name: "Close Direct Order", href: "/admin/directorder/Close", icon: CheckCircle },

          ]}
        />

        <DropdownMenu
          title="Paper Report"
          icon={FileText}
          isOpen={paperreportOpen}
          toggle={() => setpaperreportOpen(!paperreportOpen)}
          links={[
            { name: "Business Report", href: "/admin/paperreport/business", icon: BarChart2 },
            { name: "Status Report", href: "/admin/paperreport/status", icon: ListChecks },
            { name: "Closure Report", href: "/admin/paperreport/closure", icon: FileCheck },
            { name: "Process Report", href: "/admin/paperreport/process", icon: Workflow },
          ]}
        />

        <DropdownMenu
          title="General Setting"
          icon={Settings}
          isOpen={generalsettingOpen}
          toggle={() => setgeneralsettingOpen(!generalsettingOpen)}
          links={[
            { name: "Testimonial", href: "/admin/generalsetting/testimonial", icon: MessageSquareQuote },
            { name: "Categories", href: "/admin/generalsetting/categories", icon: ListTree },
            { name: "logo", href: "/admin/generalsetting/logo", icon: Image },
            { name: "partner", href: "/admin/generalsetting/partner", icon: Handshake },
            { name: "Videos", href: "/admin/generalsetting/video", icon: Video },
            { name: "Image", href: "/admin/generalsetting/image", icon: ImagePlus },
            { name: "News", href: "/admin/generalsetting/news", icon: Newspaper },

          ]}
        />




        <DropdownMenu
          title="Live Stock"
          icon={Radio}
          isOpen={livestockOpen}
          toggle={() => setlivestockOpen(!livestockOpen)}
          links={[
            { name: "Edit Live Stock", href: "/admin/livestock/editlivestock", icon: FileText },
            { name: "View Live Stock", href: "/admin/livestock/viewlivestock", icon: Eye },

          ]}
        />


        <DropdownMenu
          title="Billing History"
          icon={History}
          isOpen={billinghistoryOpen}
          toggle={() => setbillinghistoryOpen(!billinghistoryOpen)}
          links={[
            { name: "Direct Deal Billing", href: "/admin/billinghistory/directdealbilling", icon: CreditCard },
            { name: "PD Deal Billing", href: "/admin/billinghistory/pddealbilling", icon: FileText },

          ]}
        />


        <DropdownMenu
          title="Subscriptions"
          icon={CreditCard}
          isOpen={subscriptionOpen}
          toggle={() => setsubscriptionsOpen(!subscriptionOpen)}
          links={[
            { name: "Subscriptions", href: "/admin/subscriptions/subscriptions", icon: CreditCard },
          ]}
        />

        <DropdownMenu
          title="seller-page"
          icon={Store}
          isOpen={sellerOpen}
          toggle={() => setSellerOpen(!sellerOpen)}
          links={[
            { name: "Products", href: "/admin/seller-page/products", icon: Package },
            { name: "Seller", href: "/admin/seller-page/seller", icon: UserCircle },
          ]}
        />

        <DropdownMenu
          title="PD Deals"
          icon={Handshake}
          isOpen={pddealOpen}
          toggle={() => setPdDealOpen(!pddealOpen)}
          links={[
            { name: "Create Paper Deals", href: "/admin/pddeal/create", icon: PlusCircle },
            { name: "Process Paper Deals", href: "/admin/pddeal/process", icon: Settings },
            { name: "Current Paper Deals", href: "/admin/pddeal/current", icon: FileText },
            { name: "Close Paper Deals", href: "/admin/pddeal/close", icon: CheckCircle },
          ]}
        />

        <DropdownMenu
          title="Direct Report"
          icon={BarChart3}
          isOpen={directreportOpen}
          toggle={() => setdirectreportOpen(!directreportOpen)}
          links={[
            { name: "Direct Business Report", href: "/admin/directreport/business", icon: BarChart2 },
            { name: "Direct Status Report", href: "/admin/directreport/status", icon: Activity },
            { name: "Direct Process Report", href: "/admin/directreport/process", icon: Settings },
            { name: "Direct Closer Report", href: "/admin/directreport/closer", icon: CheckCircle },
          ]}
        />

        <DropdownMenu
          title="Inquiries"
          icon={HelpCircle}
          isOpen={inquiryOpen}
          toggle={() => setInquiryOpen(!inquiryOpen)}
          links={[

            { name: "Help", href: "/admin/inquiries/help", icon: HelpCircle },
            { name: "Support", href: "/admin/inquiries/support", icon: Headset },
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
