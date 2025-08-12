// app/admin/live-price/page.tsx
"use client";

import { useState } from "react";

interface LivePrice {
  id: number;
  name: string;
  price: number;
  location: string;
}

export default function LivePricePage() {
  const [form, setForm] = useState({
    category: "",
    price: "",
    location: "",
  });

  const [data] = useState<LivePrice[]>([
    { id: 39, name: "Duplex Board", price: 9, location: "EX-MILL MUZAFFARNAGAR (120 NS)" },
    { id: 38, name: "Cromo Paper", price: 25000, location: "muzaffarnagar" },
    { id: 37, name: "Writing & Printing papers", price: 12345, location: "sitapur" },
    { id: 36, name: "Copier Paper - A4", price: 5000, location: "chandauli" },
    { id: 35, name: "Art Paper", price: 151, location: "muzaffarnagar" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert(`Saved: ${JSON.stringify(form)}`);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Add Live Price */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h2 className="font-semibold text-lg">Add Live Price</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded w-full p-2"
            >
              <option value="">--Select Category--</option>
              <option value="Duplex Board">Duplex Board</option>
              <option value="Cromo Paper">Cromo Paper</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="border rounded w-full p-2"
              placeholder="Enter Price"
            />
          </div>
          <div>
            <label className="block text-sm">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="border rounded w-full p-2"
              placeholder="Enter Location"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>

      {/* Live Price Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg mb-4">Live Price</h2>
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Edit</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.location}</td>
                <td className="border px-4 py-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
