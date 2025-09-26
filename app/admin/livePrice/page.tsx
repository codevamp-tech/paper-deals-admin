// app/admin/live-price/page.tsx
"use client";

import Pagination from "@/components/pagination";
import { Edit, Edit2, Trash, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface LivePrice {
  id: number;
  name: string;
  price: number;
  location: string;
}
interface Category {
  id: number;
  name: string;
}

export default function LivePricePage() {
  const [form, setForm] = useState({
    category: "",
    price: "",
    location: "",
  });
  const [data, setData] = useState<LivePrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  // fetch all live prices
  const fetchData = async (pageNum: number = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/live-price?page=${pageNum}&limit=10`
      );
      const json = await res.json();
      setData(json.data);
      setTotalPages(json.totalPages);
      setPage(json.currentPage);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://paper-deal-server.onrender.com/api/categiry");
      const json = await res.json();
      // support both paginated + non-paginated API
      setCategories(json.categories || json);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: form.category,  // ✅ map category to DB field "name"
        price: parseFloat(form.price),
        location: form.location,
      };

      if (editingId) {
        // update
        await fetch(`https://paper-deal-server.onrender.com/api/live-price/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // create
        await fetch("https://paper-deal-server.onrender.com/api/live-price", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setForm({ category: "", price: "", location: "" });
      setEditingId(null);
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Save error:", err);
    }
  };


  const handleEdit = (item: LivePrice) => {
    setForm({
      category: item.name,     // ✅ map DB field back to category select
      price: String(item.price),
      location: item.location,
    });
    setEditingId(item.id);
    setShowModal(true);
  };


  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://paper-deal-server.onrender.com/api/live-price/${id}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
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
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
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

      {/* Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg mb-4">Live Price</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
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
                      <button
                        onClick={() => handleEdit(item)}
                        className="  px-2 py-1 rounded"
                      >
                        <Edit />
                      </button>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className=" text-red-400 px-2 py-1 rounded"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={(newPage: number) => {
                fetchData(newPage);
              }}
            />

          </>
        )}
      </div>

      {/* Modal for Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/2 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Subscription Plan</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="border rounded w-full p-2"
                >
                  <option value="">--Select Category--</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
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
              <div className="col-span-2">
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
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
