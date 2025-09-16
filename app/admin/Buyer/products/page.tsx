"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCookie } from "@/hooks/use-cookies";

export default function ProductsTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // For Edit Dialog
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      if (!token) throw new Error("No token in cookies");

      const res = await fetch(
        `http://localhost:5000/api/stocks/get-products?user_type=buyer&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      setProducts(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData(product);
    setFile(null);
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();

      // append all fields
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key] ?? "");
      });

      // append file if selected
      if (file) {
        form.append("image", file);
      }

      const res = await fetch(
        `http://localhost:5000/api/stocks/${editingProduct.id}`,
        {
          method: "PUT",
          body: form,
        }
      );

      if (!res.ok) throw new Error("Failed to update product");

      setOpen(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/stocks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        {/* <Button className="flex items-center gap-2">Add Product</Button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Buyer Name</th>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Price/KG</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">GSM</th>
              <th className="p-2 border">Shade</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Edit</th>
              <th className="p-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.id}</td>
                  <td className="p-2 border">{item.buyerName}</td>
                  <td className="p-2 border">{item.product_name}</td>
                  <td className="p-2 border">{item.price_per_kg}</td>
                  <td className="p-2 border">{item.category_id}</td>
                  <td className="p-2 border">{item.gsm}</td>
                  <td className="p-2 border">{item.shade}</td>
                  <td className="p-2 border">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    <Button size="sm" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                  </td>
                  <td className="p-2 border">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {formData && (
            <div className="grid grid-cols-2 gap-4">
              {[
                "product_name",
                "sub_product",
                "category_id",
                "gsm",
                "shade",
                "bf",
                "size",
                "sheet",
                "w_l",
                "no_of_bundle",
                "no_of_rim",
                "rim_weight",
                "stock_in_kg",
                "quantity_in_kg",
                "price_per_kg",
                "hsn_no",
                "grain",
                "weight",
                "other",
              ].map((field) => (
                <div key={field}>
                  <Label className="capitalize">
                    {field.replace(/_/g, " ")}
                  </Label>
                  <Input
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}

              {/* Image Upload */}
              <div>
                <Label>Product Image</Label>
                <Input type="file" onChange={handleFileChange} />
                {editingProduct?.image && !file && (
                  <img
                    src={editingProduct.image}
                    alt="Product"
                    className="w-24 h-24 mt-2 rounded object-cover"
                  />
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
