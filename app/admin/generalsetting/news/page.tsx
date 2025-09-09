"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Pagination from "@/components/pagination";

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "", // ✅ renamed to match textarea
    image: null as File | null,
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Modal state
  const [open, setOpen] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all news (with pagination)
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/news?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setNewsList(data.news || []);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as any;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add or Update news
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("data", formData.description); // ✅ backend expects `data`
    if (formData.image) form.append("image", formData.image);

    try {
      const res = await fetch(
        editId
          ? `http://localhost:5000/api/news/${editId}`
          : "http://localhost:5000/api/news",
        {
          method: editId ? "PUT" : "POST",
          body: form,
        }
      );

      if (res.ok) {
        fetchNews();
        setFormData({ title: "", description: "", image: null });
        setEditId(null);
        setOpen(false); // close modal
      }
    } catch (error) {
      console.error("Error saving news:", error);
    }
  };

  // Delete news
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  // Open modal for edit
  const handleEdit = (news: any) => {
    setEditId(news.id);
    setFormData({
      title: news.title,
      description: news.data, // ✅ keep consistency
      image: null,
    });
    setOpen(true);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Add News Form */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Add News</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Title"
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              News Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="News Description"
              className="border rounded px-3 py-2 w-full"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>

      {/* News Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">News</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table className="min-w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border">Created At</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList.map((news) => (
                    <tr key={news.id} className="border-t">
                      <td className="px-4 py-2 border">{news.id}</td>
                      <td className="px-4 py-2 border">{news.title}</td>
                      <td className="px-4 py-2 border">
                        {news.image && (
                          <img
                            src={news.image}
                            alt={news.title}
                            className="h-16 mx-auto"
                          />
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        {news.date
                          ? new Date(news.date).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                          : "—"}
                      </td>
                      <td className="px-4 py-2 border space-x-2 text-center">
                        <button
                          onClick={() => handleEdit(news)}
                          className="px-3 py-1 rounded"
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={() => handleDelete(news.id)}
                          className="text-red-500 px-3 py-1 rounded hover:bg-red-600"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ✅ Fixed Pagination */}
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit News</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                rows={4}
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
