"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  HelpCircle,
  Headset,
  UserCircle,
  PhoneCall,
  MessageSquare,
  IndianRupee,
  Megaphone,
  Store,
  Users,
  ClipboardList,
  PlusCircle,
  CheckCircle,
  Handshake,
  Settings,
  FileText,
  BarChart2,
  ListChecks,
  FileCheck,
  Workflow,
  Radio,
  Eye,
  FileBadge,
  History,
  CreditCard,
  Pi,
  MessageSquareText,
  ChevronDown,
  ChevronRight,
  MessageSquareQuote,
  ListTree,
  Image,
  Handshake as Partner,
  Video,
  ImagePlus,
  Newspaper,
  BarChart3,
  Activity,
  Package,
  User,
  Star,
  Book,
  Notebook,
  UserPlus,
  Layers,
} from "lucide-react"
import { getUserFromToken } from "@/hooks/use-token";
import { Button } from "@/components/ui/button"

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
                ? "bg-blue-600 text-white"
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
  const user = getUserFromToken();
  // ✅ State for dropdowns
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [sellerOpen, setSellerOpen] = useState(false)
  const [buyerOpen, setBuyerOpen] = useState(false)
  const [directOrderOpen, setDirectOrderOpen] = useState(false)
  const [pddealOpen, setPdDealOpen] = useState(false)
  const [directreportOpen, setdirectreportOpen] = useState(false)
  const [paperreportOpen, setpaperreportOpen] = useState(false)
  const [billinghistoryOpen, setbillinghistoryOpen] = useState(false)
  const [subscriptionOpen, setsubscriptionsOpen] = useState(false)
  const [generalsettingOpen, setgeneralsettingOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const isActive = (href) => pathname === href

  const isUserRole2 = user?.user_role === 2;
  const isUserRole5 = user?.user_role === 5;
  const isUserRole4 = user?.user_role === 4;


  return (
    <div className="h-full flex flex-col p-4 text-white">
      {/* Logo */}
      <div className="hidden md:flex items-center space-x-2 mb-8">
        <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl">PD</div>
        <div>
          <div className="font-bold text-lg">Admin Panel</div>
          <div className="text-sm text-gray-400">Paper Deals</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">

        {/* Dashboard */}
        <Link
          href="/admin/dashboard"
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/dashboard")
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
        >
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </Link>

        {isUserRole5 ? (
          <>
            {/* Profile */}
            {/* <Link
              href="/admin/profile"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/profile")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </Link> */}
            <Link
              href="/admin/consultantSlot"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/consultantSlot")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Book className="mr-3 h-5 w-5" />
              Create Consultant Slot
            </Link>
            <Link
              href="/admin/bookedUser"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/bookedUser")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Notebook className="mr-3 h-5 w-5" />
              Booked Users
            </Link>
            {/* <Link
              href="/admin/chat"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/chat")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <MessageSquareText className="mr-3 h-5 w-5" />
              Chat
            </Link> */}

            {/* Chat History */}
            <Link
              href="/admin/chatHistory"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/chatHistory")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <MessageSquareText className="mr-3 h-5 w-5" />
              Chat History
            </Link>

          </>
        ) : isUserRole2 ? (
          <>
            {/* Conditional links for user_role === 2 */}


            <Link
              href="/admin/inquiries/profile_enquiry"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/inquiries/profile_enquiry")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <UserCircle className="mr-3 h-5 w-5" />
              Enquiry
            </Link>



            <Link
              href="/admin/seller-page/products"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/seller-page/products")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Package className="mr-3 h-5 w-5" />
              Products
            </Link>
            {/* Direct Order */}
            <Link
              href="/admin/directorder"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/directorder")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <ClipboardList className="mr-3 h-5 w-5" />
              B2C
            </Link>

            {/* <Link
              href="/admin/profile"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/profile")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </Link> */}

            <Link
              href="/admin/stocks"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/stocks")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Package className="mr-3 h-5 w-5" />
              Stocks
            </Link>

            {/* PD/Bulk Deals */}
            <Link
              href="/admin/pddeal/current"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/pddeal/current")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <FileText className="mr-3 h-5 w-5" />
              PD/Bulk Deals
            </Link>

            {/* Subscriptions */}
            {/* <Link
              href="/admin/subscriptions"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/subscriptions")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <CreditCard className="mr-3 h-5 w-5" />
              Subscriptions
            </Link> */}



            {/* Chat History */}
            {/* <Link
              href="/admin/chat"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/chat")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <MessageSquareText className="mr-3 h-5 w-5" />
              Chat
            </Link> */}
            {/* <Link
              href="/admin/password"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/password")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Star className="mr-3 h-5 w-5" />
              Change Password
            </Link> */}
          </>
        ) : isUserRole4 ? (
          <>
            {/* Conditional links for user_role === 4 */}


            <Link
              href="/admin/seller-page/seller"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/seller-page/seller")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <UserCircle className="mr-3 h-5 w-5" />
              Seller
            </Link>

            <Link
              href="/admin/Buyer/buyerPage"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/Buyer/buyerPage")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <UserCircle className="mr-3 h-5 w-5" />
              Buyer
            </Link>

            {/* Direct Order */}
            <Link
              href="/admin/directorder"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/directorder")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <ClipboardList className="mr-3 h-5 w-5" />
              B2C
            </Link>

            {/* PD/Bulk Deals */}
            <Link
              href="/admin/pddeal/current"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/pddeal/current")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <FileText className="mr-3 h-5 w-5" />
              PD/Bulk Deals
            </Link>
            <Link
              href="/admin/billinghistory"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/billinghistory")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <History className="mr-3 h-5 w-5" />
              Billing History
            </Link>

            {/* Subscriptions */}
            <DropdownMenu
              title="Subscriptions"
              icon={CreditCard}
              isOpen={subscriptionOpen}
              toggle={() => setsubscriptionsOpen(!subscriptionOpen)}
              links={[
                { name: "Subscriptions", href: "/admin/subscriptions", icon: Star },
                { name: "Subscription Plan", href: "/admin/subscriptions/subscriptionPlan", icon: Layers },
              ]}

            />

            <Link
              href="/admin/password"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/password")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Star className="mr-3 h-5 w-5" />
              Change Password
            </Link>
            <Link
              href="/admin/Add-admin"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/Add-admin")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <UserPlus className="mr-3 h-5 w-5" />
              Add Admin
            </Link>

          </>
        ) : (
          <>
            {/* Original links for other roles (e.g., admin) */}
            {/* Enquiry */}
            <DropdownMenu
              title="Enquiry"
              icon={HelpCircle}
              isOpen={inquiryOpen}
              toggle={() => setInquiryOpen(!inquiryOpen)}
              links={[
                { name: "Support", href: "/admin/inquiries/support", icon: Headset },
                { name: "Profile Enquiry", href: "/admin/inquiries/profile_enquiry", icon: UserCircle },
                { name: "Request Call", href: "/admin/inquiries/request_call", icon: PhoneCall },
                { name: "Contact Us", href: "/admin/inquiries/contact_us", icon: MessageSquare },
                { name: "Spot Price Enquiry", href: "/admin/inquiries/spot_price", icon: IndianRupee },
              ]}
            />

            <Link
              href="/admin/rquarments"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/rquarments")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <HelpCircle className="mr-3 h-5 w-5" />
              Requarement
            </Link>

            {/* Advertisement */}
            <Link
              href="/admin/advertisement"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/advertisement")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Megaphone className="mr-3 h-5 w-5" />
              Advertisement
            </Link>

            {/* Seller */}
            <DropdownMenu
              title="Seller"
              icon={Store}
              isOpen={sellerOpen}
              toggle={() => setSellerOpen(!sellerOpen)}
              links={[
                { name: "Products", href: "/admin/seller-page/products", icon: Package },
                { name: "Seller", href: "/admin/seller-page/seller", icon: UserCircle },
              ]}
            />

            {/* Buyer */}
            <DropdownMenu
              title="Buyer"
              icon={Users}
              isOpen={buyerOpen}
              toggle={() => setBuyerOpen(!buyerOpen)}
              links={[
                { name: "Buyer", href: "/admin/Buyer/buyerPage", icon: UserCircle },
                { name: "Products", href: "/admin/Buyer/products", icon: Package },
              ]}
            />

            {/* Direct Order */}
            <Link
              href="/admin/directorder"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/livePrice")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <ClipboardList className="mr-3 h-5 w-5" />
              B2C
            </Link>

            {/* PD/Bulk Deals */}
            <DropdownMenu
              title="PD/Bulk Deals"
              icon={Handshake}
              isOpen={pddealOpen}
              toggle={() => setPdDealOpen(!pddealOpen)}
              links={[
                { name: "Create Paper Deals", href: "/admin/pddeal/create", icon: PlusCircle },
                { name: "Process Paper Deals", href: "/admin/pddeal/process", icon: Settings },
                { name: "Paper Deals", href: "/admin/pddeal/current", icon: FileText },
              ]}
            />


            {/* Live Stock */}
            <Link
              href="/admin/livestock"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/livePrice")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Eye className="mr-3 h-5 w-5" />
              Live Stock
            </Link>

            {/* Live Price */}
            <Link
              href="/admin/livePrice"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/livePrice")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <FileBadge className="mr-3 h-5 w-5" />
              Live Price
            </Link>



            {/* Direct Report */}
            <Link
              href="/admin/directreport"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/directreport")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              B2C
            </Link>


            {/* Paper Deals Report */}
            <Link
              href="/admin/paperreport"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/paperreport")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <FileText className="mr-3 h-5 w-5" />
              Paper Deals Report
            </Link>

            {/* Billing History */}
            <Link
              href="/admin/billinghistory"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/billinghistory")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <History className="mr-3 h-5 w-5" />
              Billing History
            </Link>

            {/* Consultant */}
            <Link
              href="/admin/consultant"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/consultant")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Pi className="mr-3 h-5 w-5" />
              Consultant
            </Link>


            <Link
              href="/admin/subscriptions"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/consultant")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <CreditCard className="mr-3 h-5 w-5" />
              Subscriptions
            </Link>

            {/* General Settings */}
            <DropdownMenu
              title="General Settings"
              icon={Settings}
              isOpen={generalsettingOpen}
              toggle={() => setgeneralsettingOpen(!generalsettingOpen)}
              links={[
                { name: "Testimonial", href: "/admin/generalsetting/testimonial", icon: MessageSquareQuote },
                { name: "Categories", href: "/admin/generalsetting/categories", icon: ListTree },
                { name: "Logo", href: "/admin/generalsetting/logo", icon: Image },
                { name: "Partner", href: "/admin/generalsetting/partner", icon: Partner },
                { name: "Videos", href: "/admin/generalsetting/video", icon: Video },
                { name: "Image", href: "/admin/generalsetting/image", icon: ImagePlus },
                { name: "News", href: "/admin/generalsetting/news", icon: Newspaper },
              ]}
            />

            {/* Chat History */}
            <Link
              href="/admin/chatHistory"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/chatHistory")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <MessageSquareText className="mr-3 h-5 w-5" />
              Chat History
            </Link>

            {/* Users */}
            <Link
              href="/admin/user"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive("/admin/user")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Users className="mr-3 h-5 w-5" />
              Users
            </Link>
          </>
        )}
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