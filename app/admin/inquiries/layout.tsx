// app/admin/inquiries/help/layout.tsx

import React from "react"
import AdminSidebar from "@/components/admin/sidebar"

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-gray-800 border-r border-gray-700">
        <AdminSidebar />
      </aside> */}

      {/* Main Help Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-gray-900 border-b border-gray-700 px-6 flex items-center">
          <h1 className="text-lg font-semibold">Help Center</h1>
        </header>

        {/* Help Pages */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
