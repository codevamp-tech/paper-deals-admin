// app/admin/consultants/page.tsx
"use client";

import { useState } from "react";

export default function ConsultantsPage() {
  const [search, setSearch] = useState("");

  const consultants = [
    { id: 14, name: "DEMO CONSULTANT", email: "democonsultant@gmail.com", phone: "9458613002", price: 1, whatsapp: "9458613002", date: "2024-08-03 00:00:00", status: "Active" },
    { id: 13, name: "S.C JAIN", email: "papierengineers@gmail.com", phone: "9868104303", price: 5000, whatsapp: "9868104303", date: "2024-08-09 13:39:27", status: "Active" },
    { id: 12, name: "Prince Sharma Vashishtha", email: "prince@gmail.com", phone: "9897123456", price: 1233, whatsapp: "9897123456", date: "2024-11-13 11:22:29", status: "Active" },
    { id: 11, name: "ratan", email: "ratan@gmail.com", phone: "9911942600", price: 1, whatsapp: "1234567890", date: "2024-12-11 15:29:25", status: "Active" },
    { id: 10, name: "Saakshi Dhaka", email: "vinu@gmail.com", phone: "9897123456", price: 12, whatsapp: "1234567890", date: "2025-06-28 11:18:04", status: "Active" },
    { id: 9, name: "Saakshi Dhaka", email: "shaurya.vashistha@oakvweb.com", phone: "9897123456", price: 1234, whatsapp: "1234567890", date: "2025-06-28 12:31:24", status: "Active" },
    { id: 8, name: "Saakshi Dhaka", email: "abc@gmail.com", phone: "8976767067", price: 1234, whatsapp: "9868104303", date: "2025-06-28 12:32:20", status: "Active" },
    { id: 7, name: "Suryansh Singh", email: "suryansh272208@gmail.com", phone: "9116859737", price: 1, whatsapp: "9116859737", date: "2025-06-28 00:00:00", status: "Active" },
    { id: 6, name: "arvind kumar", email: "arvindkumar@gmail.com", phone: "9874563210", price: 1, whatsapp: "9874563210", date: "2025-07-01 00:00:00", status: "Active" },
    { id: 5, name: "Shivam Bhargava", email: "qwqe@gmail.com", phone: "9897123456", price: 1234, whatsapp: "1234567890", date: "2025-07-04 12:11:02", status: "Active" },
  ];

  const filtered = consultants.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Add Consultant Form */}
      <h1 className="text-lg font-semibold mb-3">Add Consultant</h1>
      <form className="bg-white border rounded p-4 grid grid-cols-3 gap-4 mb-6">
        <input type="text" placeholder="Enter Consultant Name" className="border p-2 rounded w-full" />
        <input type="email" defaultValue="mznanubhav@gmail.com" className="border p-2 rounded w-full" />
        <input type="password" placeholder="Password" defaultValue="***" className="border p-2 rounded w-full" />
        <input type="number" placeholder="Enter Price" className="border p-2 rounded w-full" />
        <input type="text" placeholder="Enter Phone" className="border p-2 rounded w-full" />
        <input type="text" placeholder="Enter Years of Experience" className="border p-2 rounded w-full" />
        <input type="text" placeholder="Mills Supported" className="border p-2 rounded w-full" />
        <input type="text" placeholder="Enter WhatsApp Number" className="border p-2 rounded w-full" />
        <input type="file" className="border p-2 rounded w-full" />
        <textarea placeholder="Enter Description" className="border p-2 rounded col-span-3 h-20"></textarea>
        <div className="col-span-3 flex justify-center">
          <button type="button" className="bg-blue-500 text-white px-6 py-2 rounded">Save</button>
        </div>
      </form>

      {/* View Consultant Table */}
      <h2 className="text-lg font-semibold mb-3">View Consultant</h2>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          {["Copy", "CSV", "Excel", "PDF", "Print"].map((btn) => (
            <button key={btn} className="px-3 py-1 bg-gray-600 text-white rounded">{btn}</button>
          ))}
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

      <table className="w-full border border-gray-300 bg-white rounded shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Consultant Name</th>
            <th className="p-2 border">Email ID</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">WhatsApp Number</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-2 border">{c.id}</td>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.phone}</td>
              <td className="p-2 border">{c.price}</td>
              <td className="p-2 border">{c.whatsapp}</td>
              <td className="p-2 border">{c.date}</td>
              <td className="p-2 border">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">{c.status}</span>
              </td>
              <td className="p-2 border text-blue-500 cursor-pointer">Action ▼</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing 1 to {filtered.length} of {consultants.length} entries
        </p>
        <div className="flex gap-1">
          <button className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed">Previous</button>
          <button className="px-3 py-1 border rounded bg-blue-500 text-white">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
