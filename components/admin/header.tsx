"use client";

import { getUserFromToken } from "@/hooks/use-token";
import { Menu, User, LogOut } from "lucide-react";
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

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const user = getUserFromToken();

  const roleName =
    user?.user_role === 2
      ? "Seller"
      : user?.user_role === 4
        ? "Super Admin"
        : user?.user_role === 1 || user?.user_role === 5
          ? "Admin"
          : "Consultant";

  const handleLogout = () => {
    Cookies.remove("token"); // remove the cookie
    window.location.href = "/"; // redirect to login
  };

  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow md:px-6 sticky top-0 z-20">
      {/* Mobile menu button */}
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dashboard title */}
      <div className="text-lg font-semibold text-gray-700">
        {roleName} Dashboard
      </div>

      {/* Profile dropdown */}
      <div className="relative">
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
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
