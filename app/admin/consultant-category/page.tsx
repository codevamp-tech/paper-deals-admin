"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  status: number;
}

export default function ConsultantCategory() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");

  const API_URL = "https://paper-deal-server.onrender.com/api/consultant-category";

  // Fetch categories
  const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/list`);
    const data = await res.json();
    setCategories(data.data || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Category name required");

    setLoading(true);
    await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    setLoading(false);
    setShowAddForm(false);
    fetchCategories();
  };

  // Update status
  const toggleStatus = async (id: number, currentStatus: number) => {
    await fetch(`${API_URL}/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: currentStatus === 1 ? 0 : 1 }),
    });

    fetchCategories();
  };

  // Edit handlers
  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const updateCategory = async (id: number) => {
    if (!editName.trim()) return alert("Name required");

    await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });

    cancelEdit();
    fetchCategories();
  };

  // Filtered categories
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Consultant Categories</h1>

      {/* Top Bar */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        {showAddForm ? (
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Category List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            )}

            {filteredCategories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">{cat.id}</td>

                <td className="p-3">
                  {editingId === cat.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    cat.name
                  )}
                </td>

                <td className="p-3">
                  {cat.status === 1 ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </td>

                <td className="p-3 text-center space-x-2">
                  {editingId === cat.id ? (
                    <>
                      <button
                        onClick={() => updateCategory(cat.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(cat)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleStatus(cat.id, cat.status)}
                        className={`px-3 py-1 rounded text-white ${cat.status === 1 ? "bg-red-500" : "bg-green-500"
                          }`}
                      >
                        {cat.status === 1 ? "Deactivate" : "Activate"}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
