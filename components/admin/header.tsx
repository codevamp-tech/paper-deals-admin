"use client";

import { getUserFromToken } from "@/hooks/use-token";
import { Menu, User, LogOut, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import { useBusinessMode } from "@/context/BusinessModeContext";

interface AdminHeaderProps {
  onMenuClick: () => void;
  sidebarOpen?: boolean;
}
export default function AdminHeader({ onMenuClick, sidebarOpen }: AdminHeaderProps) {
  const user = getUserFromToken();
  const { mode, setMode } = useBusinessMode();

  const roleName =
    user?.user_role === 2
      ? "Seller"
      : user?.user_role === 4
        ? "Super Admin"
        : user?.user_role === 1 || user?.user_role === 5
          ? "Admin"
          : "Consultant";

  // Show toggle only for admin/super-admin roles (not sellers or consultants)
  const showToggle = !user?.user_role || user?.user_role === 1 || user?.user_role === 4;

  const handleLogout = () => {
    Cookies.remove("token"); // remove the cookie
    window.location.href = "/"; // redirect to login
  };


  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-green-600 px-4 py-3 shadow md:px-6 sticky top-0 z-20">

      <button
        className="md:hidden flex justify-end w-full"
        onClick={onMenuClick}
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-red-600" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Dashboard title */}
      <div className="text-lg font-semibold text-white pl-4">
        {roleName} Panel
      </div>

      {/* B2B / B2C Toggle */}
      {showToggle && (
        <div className="flex items-center">
          <div className="relative flex items-center bg-white/20 backdrop-blur-sm rounded-full p-0.5 border border-white/30">
            <button
              onClick={() => setMode("b2b")}
              className={`relative z-10 px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${mode === "b2b"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-white/80 hover:text-white"
                }`}
            >
              B2B
            </button>
            <button
              onClick={() => setMode("b2c")}
              className={`relative z-10 px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${mode === "b2c"
                  ? "bg-white text-green-600 shadow-md"
                  : "text-white/80 hover:text-white"
                }`}
            >
              B2C
            </button>
          </div>
        </div>
      )}

      {/* Profile dropdown */}
      <div className="relative flex gap-6 items-center">
        <Link
          href="https://paper-deals-website.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:u"
        >
          Go to  Website
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 border">
              {/* Optional profile image */}
              {user?.profile_pic ? (
                <Image
                  src={user.profile_pic}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 mt-2">
            <DropdownMenuLabel>
              <p className="font-medium text-gray-700">{user?.user_name}</p>
              <p className="text-sm text-gray-400">{roleName}</p>
            </DropdownMenuLabel>
            {user?.user_id !== 1 && user?.user_id !== 4 && (
              <>
                <DropdownMenuItem onClick={() => (window.location.href = "/admin/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => (window.location.href = "/admin/chat")}>
                  Chat
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => (window.location.href = "/admin/subscriptions")}>
                  Subscription
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem onClick={() => (window.location.href = "/admin/password")}>
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 hover:!text-red-600 " onClick={handleLogout}>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
