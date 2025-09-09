"use client";

import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  writer: string;
  company: string;
  post: string;
  para: string; // match backend column
  profile?: string; // image url from s3
  created_at?: string;
}

export default function AddTestimonialPage() {
  const [form, setForm] = useState({
    writer: "",
    company: "",
    post: "",
    para: "",
    file: null as File | null,
    preview: "",
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://paper-deal-server.onrender.com/api/testimonial/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setForm({ ...form, file: files[0], preview: URL.createObjectURL(files[0]) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Create new testimonial
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("writer", form.writer);
      formData.append("company", form.company);
      formData.append("post", form.post);
      formData.append("para", form.para);
      if (form.file) formData.append("file", form.file);

      await fetch("https://paper-deal-server.onrender.com/api/testimonial/create", {
        method: "POST",
        body: formData,
      });

      setForm({ writer: "", company: "", post: "", para: "", file: null, preview: "" });
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  // Delete testimonial
  const handleDelete = async (id: number) => {


    await fetch(`https://paper-deal-server.onrender.com/api/testimonial/testimonials/${id}`, {
      method: "DELETE",
    });

    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Update testimonial
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("writer", e.target.writer.value);
    formData.append("company", e.target.company.value);
    formData.append("post", e.target.post.value);
    formData.append("para", e.target.para.value);

    // Append file only if user selected new one
    if (e.target.file.files.length > 0) {
      formData.append("file", e.target.file.files[0]);
    }


    await fetch(`https://paper-deal-server.onrender.com/api/testimonial/update/${editing.id}`, {
      method: "PUT",
      body: formData,
    });

    fetchTestimonials();
    setEditing(null);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Manage Testimonials</h1>

      {/* Add Testimonial Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Writer</label>
              <input
                type="text"
                name="writer"
                value={form.writer}
                onChange={handleChange}
                placeholder="Writer"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required   // ✅ now cannot submit without file
              />
              {form.preview && (
                <img src={form.preview} alt="preview" className="mt-2 w-20 h-20 object-cover rounded" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Post</label>
              <input
                type="text"
                name="post"
                value={form.post}
                onChange={handleChange}
                placeholder="Post"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Paragraph</label>
            <textarea
              name="para"
              value={form.para}
              onChange={handleChange}
              placeholder="Enter Paragraph"
              className="w-full border rounded px-3 py-2"
              rows={5}
              required
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Save
          </button>
        </form>
      </div>

      {/* Testimonials Listing */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">All Testimonials</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Paragraph</th>
                <th className="px-4 py-2 border">Writer</th>
                <th className="px-4 py-2 border">Company</th>
                <th className="px-4 py-2 border">Post</th>
                <th className="px-4 py-2 border">Profile</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Edit</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="text-center">
                  <td className="px-4 py-2 border">{t.id}</td>
                  <td className="px-4 py-2 border text-red-600">
                    {t.para?.slice(0, 30)}...{" "}
                    <button className="text-blue-600 underline">Read..</button>
                  </td>
                  <td className="px-4 py-2 border">{t.writer}</td>
                  <td className="px-4 py-2 border">{t.company}</td>
                  <td className="px-4 py-2 border">{t.post}</td>
                  <td className="px-4 py-2 border">
                    {t.profile && (
                      <img
                        src={t.profile}
                        alt={t.writer}
                        className="w-12 h-12 rounded-full object-cover mx-auto"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {t.created_at && new Date(t.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <button onClick={() => setEditing(t)} className="px-3 py-1 rounded">
                      <Edit />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-500 px-3 py-1 rounded"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full relative">
            <h2 className="text-xl font-semibold mb-4">Edit Testimonial</h2>
            <form onSubmit={handleUpdate} className="space-y-4" encType="multipart/form-data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Writer</label>
                  <input type="text" name="writer" defaultValue={editing.writer} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input type="text" name="company" defaultValue={editing.company} className="w-full border rounded px-3 py-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <input
                    type="file"
                    name="file"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  {editing.profile && (
                    <a href={editing.profile} target="_blank" className="text-blue-600 text-sm underline">
                      View Current
                    </a>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Post</label>
                  <input type="text" name="post" defaultValue={editing.post} className="w-full border rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Paragraph</label>
                <textarea name="para" rows={4} defaultValue={editing.para} className="w-full border rounded px-3 py-2" />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
