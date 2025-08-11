"use client"

import { Menu } from "lucide-react"

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow md:px-6 sticky top-0 z-20">
      {/* Hamburger for mobile */}
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      <div className="text-lg font-semibold text-gray-700">Admin Dashboard</div>

      {/* Placeholder for user/account */}
      <div className="hidden md:block">Welcome, Admin</div>
    </header>
  )
}
