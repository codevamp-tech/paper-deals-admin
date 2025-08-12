// app/admin/chat-users/page.tsx
"use client";

import { useState } from "react";

export default function ChatUsersPage() {
  const [search, setSearch] = useState("");

  const chatUsers = [
    { id: 8, buyer: "abhishek ty", consultant: "ratan", message: "Read" },
    { id: 6, buyer: "DEMO BUYER", consultant: "DEMO CONSULTANT", message: "Read" },
    { id: 4, buyer: "abhishek ty", consultant: "DEMO CONSULTANT", message: "Read" },
    { id: 2, buyer: "DEMO SELLER", consultant: "DEMO CONSULTANT", message: "Read" },
  ];

  const filtered = chatUsers.filter(
    (u) =>
      u.buyer.toLowerCase().includes(search.toLowerCase()) ||
      u.consultant.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Chat Users</h1>

      {/* Top Bar */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-600 text-white rounded">Copy</button>
          <button className="px-3 py-1 bg-gray-600 text-white rounded">CSV</button>
          <button className="px-3 py-1 bg-gray-600 text-white rounded">Excel</button>
          <button className="px-3 py-1 bg-gray-600 text-white rounded">PDF</button>
          <button className="px-3 py-1 bg-gray-600 text-white rounded">Print</button>
        </div>
        <div>
          <label className="mr-2">Search:</label>
          <input
            type="text"
            className="border p-1 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full border border-gray-300 bg-white rounded shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Buyer/Seller/Guest</th>
            <th className="p-2 border">Consultant</th>
            <th className="p-2 border">Message</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.buyer}</td>
              <td className="p-2 border">{u.consultant}</td>
              <td className="p-2 border text-blue-500 cursor-pointer">{u.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing 1 to {filtered.length} of {chatUsers.length} entries
        </p>
        <div className="flex gap-1">
          <button className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1 border rounded bg-blue-500 text-white">1</button>
          <button className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
