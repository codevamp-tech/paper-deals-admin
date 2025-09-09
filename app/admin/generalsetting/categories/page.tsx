"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Power, Search } from "lucide-react"

type Category = {
  id: number
  name: string
  status: number // 0 = Active, 1 = Inactive
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]) // for search
  const [loading, setLoading] = useState(false)

  // Pagination states
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const limit = 10

  // Add/Edit states
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState<number | null>(null)
  const [categoryName, setCategoryName] = useState("")

  // Search state
  const [search, setSearch] = useState("")

  // Fetch categories with pagination
  const fetchCategories = async (pageNum = page) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://paper-deal-server.onrender.com/api/categiry?page=${pageNum}&limit=${limit}`
      )
      const data = await res.json()
      setCategories(data.categories)
      setFilteredCategories(data.categories) // reset filtered list
      setTotalPages(data.totalPages)
      setPage(data.page)
    } catch (err) {
      console.error("Error fetching categories", err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories(page)
  }, [page])

  // Handle search
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCategories(categories)
    } else {
      const filtered = categories.filter((cat) =>
        cat.name?.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredCategories(filtered)
    }
  }, [search, categories])

  // Add or Update category
  const handleSave = async () => {
    try {
      if (isEditing && currentId !== null) {
        await fetch(`https://paper-deal-server.onrender.com/api/categiry/${currentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: categoryName }),
        })
      } else {
        await fetch("https://paper-deal-server.onrender.com/api/categiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: categoryName }),
        })
      }
      setOpen(false)
      setCategoryName("")
      setIsEditing(false)
      setCurrentId(null)
      fetchCategories(page)
    } catch (err) {
      console.error("Error saving category", err)
    }
  }

  // Toggle Active / Inactive
  const handleToggleStatus = async (id: number, currentStatus: number) => {
    try {
      await fetch(`https://paper-deal-server.onrender.com/api/categiry/deactivate/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: currentStatus === 0 ? 1 : 0 }),
      })
      fetchCategories(page)
    } catch (err) {
      console.error("Error updating category status", err)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button
          onClick={() => {
            setOpen(true)
            setIsEditing(false)
            setCategoryName("")
          }}
        >
          Add Category
        </Button>
      </div>



      {/* Category table */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center mb-4 border rounded-lg px-3 py-2 w-1/3 ">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full outline-none"
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Category Name</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="border-t">
                  <td className="px-4 py-2 border">{cat.id}</td>
                  <td className="px-4 py-2 border">{cat.name}</td>
                  <td className="px-4 py-2 border">
                    {cat.status === 0 ? (
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded hover:bg-gray-100">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setOpen(true)
                            setIsEditing(true)
                            setCurrentId(cat.id)
                            setCategoryName(cat.name)
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(cat.id, cat.status)}
                          className={cat.status === 0 ? "text-red-600" : "text-green-600"}
                        >
                          <Power className="w-4 h-4 mr-2" />
                          {cat.status === 0 ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={(p: number) => setPage(p)}
          />
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            className="border px-2 py-2 rounded w-full"
          />
          <DialogFooter className="mt-4">
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
