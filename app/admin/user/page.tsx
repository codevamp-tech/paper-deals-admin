"use client";

import Pagination from "@/components/pagination";
import { useEffect, useState } from "react";

type ApiUser = {
  id: number;
  name: string;
  email_address: string;
  phone_no: string;
  user_type: number;
  active_status: number;
  created_on: string;
};

type User = {
  id: number;
  name: string;
  email_address: string;
  phone_no: string;
  role: string;
  created_on: string;
  status: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // map user_type to role
  const mapRole = (type: number) => {
    switch (type) {
      case 1:
        return "Admin";
      case 2:
        return "Seller";
      case 3:
        return "Buyer";
      case 5:
        return "Consultant";
      default:
        return "Unknown";
    }
  };

  // map active_status to status
  const mapStatus = (status: number) => {
    return status === 1 ? "Active" : "Inactive";
  };

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/users/alluser?page=${page}&limit=10`
      );
      const data = await res.json();

      // transform API response into table-friendly data
      const formatted: User[] = (data.data || []).map((u: ApiUser) => ({
        id: u.id,
        name: u.name,
        email_address: u.email_address, // ✅ FIXED
        phone_no: u.phone_no,           // ✅ FIXED
        role: mapRole(u.user_type),
        created_on: u.created_on,
        status: mapStatus(u.active_status),
      }));

      setUsers(formatted);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const filtered = users.filter((u) => {
    const name = u.name ? u.name.toLowerCase() : "";
    const email = u.email_address ? u.email_address.toLowerCase() : "";
    return (
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      <div className="flex justify-between mb-4">
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
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User Name</th>
            <th className="p-2 border">Email Id</th>
            <th className="p-2 border">Phone No.</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Created Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="p-4 text-center">
                Loading...
              </td>
            </tr>
          ) : filtered.length > 0 ? (
            filtered.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email_address}</td>
                <td className="p-2 border">{u.phone_no}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white ${u.role === "Buyer"
                      ? "bg-yellow-500"
                      : u.role === "Consultant"
                        ? "bg-gray-700"
                        : u.role === "Seller"
                          ? "bg-blue-500"
                          : u.role === "Admin"
                            ? "bg-purple-500"
                            : "bg-red-500"
                      }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-2 border">
                  {new Date(u.created_on).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white ${u.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                  >
                    {u.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-4 text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(p: number) => setPage(p)}
      />
    </div>
  );
}
