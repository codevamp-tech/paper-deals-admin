"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Ban, MoreVertical, Pencil, Search, Trash } from "lucide-react";
import Pagination from "@/components/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Product = {
  id: number;
  product_name: string;
  sub_product: string;
  shade: string;
  gsm: string;
  size: string;
  stock_in_kg: string;
  price_per_kg: number;
  quantity_in_kg: string;
};

type LiveStock = {
  id: number;
  product_id: number;
  spot_price: number;
  created_at: string;
  status: number;
  ProductNew: Product;
};

export default function LiveStockList() {
  const [stocks, setStocks] = useState<LiveStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [editStock, setEditStock] = useState<LiveStock | null>(null);

  useEffect(() => {
    fetchStocks();
  }, [page, search]);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/live-stocks/view-live-stockes?page=${page}&search=${search}`
      );
      const data = await res.json();
      setStocks(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editStock) return;

    try {
      await fetch(`http://localhost:5000/api/live-stocks/update/${editStock.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spot_price: editStock.spot_price }),
      });

      setEditStock(null);
      fetchStocks();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">View Live Stock</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline" onClick={() => fetchStocks()}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Product</th>
              <th className="p-2">Sub Product</th>
              <th className="p-2">Shade</th>
              <th className="p-2">GSM</th>
              <th className="p-2">Size</th>
              <th className="p-2">Stock (Kg)</th>
              <th className="p-2">Spot Price</th>
              <th className="p-2">Price/Kg</th>
              <th className="p-2">Quantity (Kg)</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={13} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : stocks.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center p-4">
                  No data found
                </td>
              </tr>
            ) : (
              stocks.map((stock) => (
                <tr key={stock.id} className="border-t">
                  <td className="p-2">{stock.id}</td>
                  <td className="p-2">{stock.ProductNew?.product_name}</td>
                  <td className="p-2">{stock.ProductNew?.sub_product}</td>
                  <td className="p-2">{stock.ProductNew?.shade}</td>
                  <td className="p-2">{stock.ProductNew?.gsm}</td>
                  <td className="p-2">{stock.ProductNew?.size}</td>
                  <td className="p-2">{stock.ProductNew?.stock_in_kg}</td>
                  <td className="p-2">{stock.spot_price}</td>
                  <td className="p-2">{stock.ProductNew?.price_per_kg}</td>
                  <td className="p-2">{stock.ProductNew?.quantity_in_kg}</td>
                  <td className="p-2">
                    {new Date(stock.created_at).toLocaleString()}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${stock.status === 1
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                        }`}
                    >
                      {stock.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setEditStock(stock)}>
                          <Pencil className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            await fetch(`http://localhost:5000/api/live-stocks/delete/${stock.id}`, {
                              method: "DELETE",
                            });
                            fetchStocks();
                          }}
                        >
                          <Trash className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            await fetch(`http://localhost:5000/api/live-stocks/deactivate/${stock.id}`, {
                              method: "PUT",
                            });
                            fetchStocks();
                          }}
                        >
                          <Ban className="h-4 w-4 mr-2" /> Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editStock} onOpenChange={() => setEditStock(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Spot Price</DialogTitle>
          </DialogHeader>
          {editStock && (
            <div className="flex flex-col gap-4 mt-4">
              <Input
                type="number"
                value={editStock.spot_price}
                onChange={(e) =>
                  setEditStock({
                    ...editStock,
                    spot_price: parseFloat(e.target.value),
                  })
                }
                placeholder="Spot Price"
              />
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setEditStock(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update Spot Price</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
