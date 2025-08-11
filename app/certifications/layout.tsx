import React from "react"
import AdminSidebar from "../../../components/AdminSidebar"

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700">
        <AdminSidebar />
      </aside>

      {/* Certificates Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-gray-900 border-b border-gray-700 px-6 flex items-center">
          <h1 className="text-lg font-semibold">Certificates</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
