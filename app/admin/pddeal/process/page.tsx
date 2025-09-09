"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Edit2, Search } from "lucide-react";
import Pagination from "@/components/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ProcessPaperDealPage() {
  const [search, setSearch] = useState("");
  type Deal = {
    id: number;
    user?: { name?: string; phone_no?: string; email_address?: string };
    buyerUser?: { name?: string; phone_no?: string; email_address?: string };
    contact_person?: string;
    mobile_no?: string;
    email_id?: string;
    product_description?: string;
    price_per_kg?: number;
    deal_size?: number;
    total_deal_amount?: number;
    balanced_deal_size?: number;
    created_on?: string | Date;
    status?: number;
  };
  const [openDeal, setOpenDeal] = useState<Deal | null>(null);
  const [sellers, setSellers] = useState<any[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // form state
  const [sellerId, setSellerId] = useState("");
  const [allotted, setAllotted] = useState("");
  const [buyerCommission, setBuyerCommission] = useState("");
  const [sellerCommission, setSellerCommission] = useState("");
  const [remarks, setRemarks] = useState("");

  const fetchDeals = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/pd-deals-master?limit=${limit}&page=${page}`
      );
      const data = await res.json();
      setDeals(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching deals:", err);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, [page]);

  // fetch sellers for dropdown
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/users/getallsellers?user_type=2"
        );
        const json = await res.json();
        setSellers(json.data);
      } catch (err) {
        console.error("Error fetching sellers:", err);
      }
    };
    fetchSellers();
  }, []);

  const handleSubmit = async () => {
    if (!openDeal) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/pd-deals-master/${openDeal.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            seller_id: sellerId,
            Allotted_deal_size: allotted,
            buyer_commission: buyerCommission,
            seller_commission: sellerCommission,
            remarks,
          }),
        }
      );

      if (res.ok) {
        await fetchDeals(); // refresh table
        setOpenDeal(null); // close dialog
        setSellerId("");
        setAllotted("");
        setBuyerCommission("");
        setSellerCommission("");
        setRemarks("");
      } else {
        console.error("Failed to update deal");
      }
    } catch (err) {
      console.error("Error updating deal:", err);
    }
  };

  const filteredDeals = deals.filter((d) =>
    Object.values(d)
      .concat(d.user ? Object.values(d.user) : [])
      .some((val) => String(val).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="m-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Process PD Deals</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 border">Deal Id</th>
              <th className="p-2 border">PD Executive</th>
              <th className="p-2 border">Buyer</th>
              <th className="p-2 border">Contact Person</th>
              <th className="p-2 border">Mobile No.</th>
              <th className="p-2 border">Email Id</th>
              <th className="p-2 border">Product Description</th>
              <th className="p-2 border">Price in Kg</th>
              <th className="p-2 border">Quantity in Kg</th>
              <th className="p-2 border">Total Amount</th>
              <th className="p-2 border">Balanced Deal Size</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeals.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="p-2 border">{d.id}</td>
                <td className="p-2 border">{d.user?.name || "-"}</td>
                <td className="p-2 border">{d.buyerUser?.name || "DEMO BUYER"}</td>
                <td className="p-2 border">{d.contact_person || "-"}</td>
                <td className="p-2 border">
                  {d.mobile_no || d.buyerUser?.phone_no || "-"}
                </td>
                <td className="p-2 border">
                  {d.email_id || d.buyerUser?.email_address || "-"}
                </td>
                <td className="p-2 border">{d.product_description}</td>
                <td className="p-2 border">{d.price_per_kg}</td>
                <td className="p-2 border">{d.deal_size}</td>
                <td className="p-2 border">{d.total_deal_amount}</td>
                <td className="p-2 border">{d.balanced_deal_size}</td>
                <td className="p-2 border">
                  {new Date(d.created_on).toLocaleString()}
                </td>
                <td className="p-2 border">
                  {d.status === 1 ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="p-2 border">
                  <Dialog
                    open={openDeal?.id === d.id}
                    onOpenChange={(isOpen) =>
                      setOpenDeal(isOpen ? d : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Edit />
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Process Deal #{d.id}</DialogTitle>
                      </DialogHeader>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Seller</Label>
                          <Select onValueChange={(v) => setSellerId(v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Seller" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.isArray(sellers) &&
                                sellers.map((s) => (
                                  <SelectItem key={s.id} value={s.id.toString()}>
                                    {s.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Allotted Deal Size</Label>
                          <Input
                            value={allotted}
                            onChange={(e) => setAllotted(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Buyer Commission</Label>
                          <Input
                            value={buyerCommission}
                            onChange={(e) => setBuyerCommission(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Seller Commission</Label>
                          <Input
                            value={sellerCommission}
                            onChange={(e) => setSellerCommission(e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Remarks</Label>
                          <Input
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button onClick={handleSubmit}>Submit</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}
