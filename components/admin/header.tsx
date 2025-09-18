"use client"

import { getUserFromToken } from "@/hooks/use-token"
import { Menu } from "lucide-react"

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const user = getUserFromToken();

  // Determine role name
  const roleName =
    user?.user_role === 2
      ? "Seller"
      : user?.user_role === 1 || user?.user_role === 4
        ? "Admin"
        : "Consultant";

  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow md:px-6 sticky top-0 z-20">
      {/* Hamburger for mobile */}
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      <div className="text-lg font-semibold text-gray-700">  {roleName} Dashboard</div>

      {/* User info */}
      <div className="hidden md:block">
        {user?.user_name}
      </div>
    </header>
  )
}
