// app/admin/user/page.tsx
"use client";

import { useState } from "react";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const users = [
    { srNo: 9, name: "Sahil Vaish", email: "om.duplex.paper@gmail.com", phone: "9999453678", role: "Buyer", date: "2024-08-05", status: "Active" },
    { srNo: 86, name: "Yash Bhardwaj", email: "yashbhardwaj@gmail.com", phone: "6395019000", role: "Consultant", date: "2025-07-31", status: "Active" },
    { srNo: 85, name: "Ajay Gupta", email: "ajaygupta@gmail.com", phone: "9719305555", role: "Consultant", date: "2025-07-10", status: "Active" },
    { srNo: 84, name: "Vishal Singh", email: "vishalsingh1@gmail.com", phone: "9874563201", role: "Buyer", date: "2025-07-09", status: "Active" },
    { srNo: 83, name: "Vishal Singh", email: "vishalsingh1@gmail.com", phone: "9874563210", role: "Seller", date: "2025-07-09", status: "Active" },
    { srNo: 82, name: "Rishab Gupta", email: "rishabgupta1@gmail.com", phone: "9632587410", role: "Admin", date: "2025-07-08", status: "Active" },
    { srNo: 81, name: "Mukesh Mittal", email: "mukeshmittal@gmail.com", phone: "9874563210", role: "Admin", date: "2025-07-08", status: "Active" },
    { srNo: 80, name: "Suryansh Singh", email: "suryanshsinwar@outlook.com", phone: "9116859737", role: "Buyer", date: "2025-07-07", status: "Inactive" },
    { srNo: 8, name: "Shivkant", email: "kaypaper@gmail.com", phone: "7017744886", role: "Seller", date: "2024-08-03", status: "Active" },
    { srNo: 79, name: "Saakshi Dhaka", email: "prince12334534534534@gmail.com", phone: "9897123456", role: "Seller", date: "2025-07-07", status: "Inactive" },
  ];

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      <div className="flex justify-between mb-4">
        <div className="text-sm text-red-600">
          Warning: Undefined variable $i in C:\xampp\htdocs\paper-deals\admin\users.php on line 181
        </div>
        <input
          className="border p-2 rounded w-64"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Sr. No.</th>
            <th className="p-2 border">User Name</th>
            <th className="p-2 border">Email Id</th>
            <th className="p-2 border">Phone No.</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Created Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.srNo}>
              <td className="p-2 border">{u.srNo}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.phone}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    u.role === "Buyer"
                      ? "bg-yellow-500"
                      : u.role === "Consultant"
                      ? "bg-gray-700"
                      : u.role === "Seller"
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                >
                  {u.role}
                </span>
              </td>
              <td className="p-2 border">{u.date}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    u.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {u.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing 1 to {filtered.length} of {users.length} entries
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              className={`px-3 py-1 border rounded ${
                p === 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
