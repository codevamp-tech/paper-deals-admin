"use client";

import Pagination from "@/components/pagination";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ConsultantsPage() {
  const [consultants, setConsultants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    price: "",
    phone: "",
    experience: "",
    mills_supported: "",
    whatsapp: "",
    description: "",
    file: null as File | null,
    category_id: "",
  });


  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://paper-deal-server.onrender.com/api/consultant-category/list");
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch consultants
  const fetchConsultants = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/users/getallconsultants?user_type=5&page=${page}&limit=10`
      );
      const data = await res.json();

      setConsultants(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching consultants", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConsultants();
  }, [page, search]);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) body.append(key, value as any);
      });

      const res = await fetch("https://paper-deal-server.onrender.com/api/users/consultants", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (res.status === 409) {
        toast({
          title: "Email already exists",
          description: data.message || "Please use a different email",
          variant: "destructive",
        });
        return;
      }

      // ❌ Other errors
      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Failed to add consultant",
          variant: "destructive",
        });
        return;
      }

      // ✅ Success
      toast({
        title: "Success",
        description: "Consultant added successfully",
      });


      if (res.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
          price: "",
          phone: "",
          experience: "",
          mills_supported: "",
          whatsapp: "",
          description: "",
          file: null,
          category_id: "",
        });
        fetchConsultants();
      } else {
        toast({
          title: "Error",
          description: "Failed to add consultant",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  const handleEdit = (consultant: any) => {
    setEditData(consultant);
    setFormData({
      name: consultant.name || "",
      email: consultant.email_address || "",
      password: "",
      price: consultant.price || "",
      phone: consultant.phone_no || "",
      experience: consultant.experience || "",
      mills_supported: consultant.mills_supported || "",
      whatsapp: consultant.whatsapp || "",
      description: consultant.description || "",
      file: null,
      category_id: "",
    });
    setOpenDialog(true);
  };
  console.log("Updating consultant:", editData);

  // Submit update
  const handleUpdate = async () => {
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) body.append(key, value as any);
      });

      const res = await fetch(`https://paper-deal-server.onrender.com/api/users/updateconsultant/${editData.id}?user_type=5`, {
        method: "PUT",
        body,
      });

      if (res.ok) {
        setOpenDialog(false);
        fetchConsultants();
      } else {
        console.error("Failed to update consultant");
      }
    } catch (err) {
      console.error("Error updating consultant", err);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/users/deactivateconsulatant/${id}`, {
        method: "PUT",
      });

      if (res.ok) {
        fetchConsultants(); // refresh the table
      } else {
        console.error("Failed to toggle consultant status");
      }
    } catch (err) {
      console.error("Error toggling consultant status", err);
    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-3">View Consultant</h2>


        </div>
        <div>
          <Button onClick={() => setOpenAddForm(!openAddForm)}>
            {openAddForm ? "Close Form" : "Add Consultant"}
          </Button>
        </div>
      </div>
      {openAddForm && (
        <div>
          <h1 className="text-lg font-semibold mb-3">Add Consultant</h1>
          <form onSubmit={handleSubmit} className="p-4 grid grid-cols-3 gap-4 mb-6">
            {/* Consultant Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Consultant Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Consultant Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter Price"
                value={formData.price}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category_id"
                value={formData.category_id || ""}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-1">Years of Experience</label>
              <input
                type="text"
                name="experience"
                placeholder="Enter Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Mills Supported */}
            <div>
              <label className="block text-sm font-medium mb-1">Mills Supported</label>
              <input
                type="text"
                name="mills_supported"
                placeholder="Mills Supported"
                value={formData.mills_supported}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
              <input
                type="text"
                name="whatsapp"
                placeholder="Enter WhatsApp Number"
                value={formData.whatsapp}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Profile Image / File</label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
              />

            </div>

            {/* Description */}
            <div className="col-span-3">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded w-full h-20"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-3 flex justify-center">
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      {/* View Consultant Table */}
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search consultants..."
          className="w-72"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <table className="w-full border border-gray-300 bg-white rounded shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Consultant Name</th>
            <th className="p-2 border">Email ID</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Catgory</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={9} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : consultants.length > 0 ? (
            consultants.map((c: any) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-2 border">{c.id}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.email_address}</td>
                <td className="p-2 border">{c.phone_no}</td>
                <td className="p-2 border">{c.consultant_price || "-"}</td>
                <td className="p-2 border">{c.consultantPic?.category?.name || "-"}</td>
                <td className="px-4 py-2 border">
                  {c.created_on
                    ? new Date(c.created_on).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      // timeStyle: "short",
                    })
                    : "—"}
                </td>
                <td className="p-2 border">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    {c.active_status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-2 border">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded hover:bg-gray-100">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(c)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleStatus(c.id)}
                      >
                        {c.active_status ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center p-4">
                No consultants found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />


      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Consultant</DialogTitle>
          </DialogHeader>

          {editData && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Consultant Name</label>
                <Input name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Email ID</label>
                <Input name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <Input name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Price</label>
                <Input name="price" value={formData.price} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">WhatsApp Number</label>
                <Input name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Years of Experience</label>
                <Input name="experience" value={formData.experience} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Mills Supported</label>
                <Input name="mills_supported" value={formData.mills_supported} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Upload Image</label>
                <Input type="file" name="file" onChange={handleChange} />
                {editData.file_url && (
                  <div className="text-sm text-blue-600 mt-1">
                    <a href={editData.file_url} target="_blank" rel="noreferrer">View Document</a>
                  </div>
                )}
              </div>
              <div className="col-span-3">
                <label className="block text-sm mb-1">Description</label>
                <Textarea name="description" value={formData.description} onChange={handleChange} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="default" onClick={handleUpdate}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
