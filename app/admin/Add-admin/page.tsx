"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function AddAdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    password: "",
    phone_no: "",
    whatsapp_no: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [admins, setAdmins] = useState<any[]>([]);

  // Fetch Admins
  const fetchAdmins = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/getAdmins");
      const data = await res.json();
      if (res.ok) {
        setAdmins(data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/CreateAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Admin created successfully!");
        setFormData({
          name: "",
          email_address: "",
          password: "",
          phone_no: "",
          whatsapp_no: "",
        });
        fetchAdmins(); // refresh admin list
      } else {
        setMessage(data.message || "❌ Something went wrong");
      }
    } catch (error) {
      setMessage("⚠️ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Add Admin Form */}
      <div className="w-full  p-6 mb-8 ">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Admin</h2>
        {message && (
          <p
            className={`mb-4 text-center text-sm font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-150"
            />
            <input
              type="email"
              name="email_address"
              placeholder="Email Address"
              value={formData.email_address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-150"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-150"
            />
            <input
              type="text"
              name="phone_no"
              placeholder="Phone Number"
              value={formData.phone_no}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-150"
            />
            <input
              type="text"
              name="whatsapp_no"
              placeholder="WhatsApp Number"
              value={formData.whatsapp_no}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-150"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Add Admin"}
          </Button>
        </form>
      </div>

      <div className="w-full  p-6 ">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Admin List</h2>
        {admins.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {admin.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin.email_address || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin.phone_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {admin.active_status === 1 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No admins found.</p>
        )}
      </div>
    </div>
  );
}