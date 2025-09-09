"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/pagination";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical } from "lucide-react";

type Logo = {
  id: number;
  logo_name: string;
  created_at: string;
};

export default function MainLogoPage() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [selectedLogo, setSelectedLogo] = useState<Logo | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Add new logo form state
  const [newLogoName, setNewLogoName] = useState("");
  const [newLogoFile, setNewLogoFile] = useState<File | null>(null);

  // ✅ Fetch logos dynamically
  const fetchLogos = async (pageNum = 1) => {
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/site-logos/getall-logo?page=${pageNum}&limit=10`);
      const data = await res.json();
      setLogos(data.data);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      console.error("Failed to fetch logos:", err);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  // ✅ Add new logo
  const handleAddLogo = async () => {
    if (!newLogoFile || !newLogoName) {
      alert("Please select a file and enter a name");
      return;
    }

    const formData = new FormData();
    formData.append("file", newLogoFile);
    formData.append("logo_name", newLogoName);

    try {
      await fetch("https://paper-deal-server.onrender.com/api/site-logos/create", {
        method: "POST",
        body: formData,
      });

      setNewLogoName("");
      setNewLogoFile(null);
      fetchLogos(page);
    } catch (err) {
      console.error("Add logo failed:", err);
    }
  };

  // ✅ Edit existing
  const handleEdit = (logo: Logo) => {
    setSelectedLogo(logo);
    setDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedLogo) return;
    try {
      const formData = new FormData();
      formData.append("logo_name", selectedLogo.logo_name);
      if (selectedLogo.logo_picture instanceof File) {
        formData.append("file", selectedLogo.logo_picture);
      }
      formData.append("status", String(selectedLogo.status ?? 1));

      await fetch(`https://paper-deal-server.onrender.com/api/site-logos/update/${selectedLogo.id}`, {
        method: "PUT",
        body: formData,
      });

      fetchLogos(page);
      setDialogOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };


  // ✅ Delete
  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://paper-deal-server.onrender.com/api/site-logos/delete/${id}`, { method: "DELETE" });
      fetchLogos(page);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Add Main Logo Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Add Main Logo</h2>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <input
            type="file"
            onChange={(e) => setNewLogoFile(e.target.files?.[0] || null)}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            placeholder="Logo Name"
            value={newLogoName}
            onChange={(e) => setNewLogoName(e.target.value)}
            className="border rounded px-2 py-1 flex-1"
          />
          <button
            onClick={handleAddLogo}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* Logo Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Logo</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Main Logo</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {logos.map((logo) => (
                <tr key={logo.id} className="border-t">
                  <td className="px-4 py-2 border">{logo.id}</td>
                  <td className="px-4 py-2 border">{logo.logo_name}</td>
                  <td className="px-4 py-2 border">
                    {logo.created_at
                      ? new Date(logo.created_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                      : "—"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(logo)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(logo.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(p) => fetchLogos(p)}
        />
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Logo</DialogTitle>
          </DialogHeader>

          {/* Edit Logo Name */}
          <Input
            value={selectedLogo?.logo_name || ""}
            onChange={(e) =>
              setSelectedLogo((prev) =>
                prev ? { ...prev, logo_name: e.target.value } : null
              )
            }
            placeholder="Logo Name"
            className="mb-3"
          />

          {/* Edit Logo File */}
          <input
            type="file"
            onChange={(e) =>
              setSelectedLogo((prev) =>
                prev ? { ...prev, logo_picture: e.target.files?.[0]?.name || prev.logo_picture } : null
              )
            }
            className="mb-3 border rounded px-2 py-1"
          />

          {/* Optional Status Field */}
          <select
            value={selectedLogo?.status ?? 1}
            onChange={(e) =>
              setSelectedLogo((prev) =>
                prev ? { ...prev, status: Number(e.target.value) } : null
              )
            }
            className="mb-3 border rounded px-2 py-1"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>

          <DialogFooter>
            <Button onClick={handleUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
