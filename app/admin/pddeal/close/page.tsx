"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function CurrentPaperDealPage() {
  const [search, setSearch] = useState("");

  const deals = [
    {
      srNo: 1,
      dealId: "000101",
      pdExecutive: "ANUBHAV TOMER",
      mobileNo: "9458613002",
      buyer: "DEMO BUYER",
      buyerNo: "8445549289",
      seller: "DEMO SELLER",
      sellerNo: "7253802003",
      productDescription: "duplex",
      category: "Duplex Board",
      price: 2,
      quantity: 1000,
      totalAmount: 2000,
    },
    {
      srNo: 2,
      dealId: "00097",
      pdExecutive: "ANUBHAV TOMER",
      mobileNo: "9458613002",
      buyer: "DEMO BUYER",
      buyerNo: "8445549289",
      seller: "Shivkant",
      sellerNo: "7017744886",
      productDescription: "duplex board",
      category: "Duplex Board",
      price: 100,
      quantity: 25000,
      totalAmount: 2500000,
    },
  ];

  const filteredDeals = deals.filter((d) =>
    Object.values(d).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Card className="m-6">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Close Deals</CardTitle>
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
      </CardHeader>

      <CardContent>
        <table className="w-full text-sm border">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 border">Sr. NO.</th>
              <th className="p-2 border">Deal Id</th>
              <th className="p-2 border">PD Executive</th>
              <th className="p-2 border">Mobile No</th>
              <th className="p-2 border">Buyer</th>
              <th className="p-2 border">Buyer No</th>
              <th className="p-2 border">Seller</th>
              <th className="p-2 border">Seller No</th>
              <th className="p-2 border">Product Description</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price in Kg</th>
              <th className="p-2 border">Quantity in Kg</th>
              <th className="p-2 border">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeals.map((d) => (
              <tr key={d.srNo} className="border-b hover:bg-gray-50">
                <td className="p-2 border">{d.srNo}</td>
                <td className="p-2 border">{d.dealId}</td>
                <td className="p-2 border">{d.pdExecutive}</td>
                <td className="p-2 border">{d.mobileNo}</td>
                <td className="p-2 border">{d.buyer}</td>
                <td className="p-2 border">{d.buyerNo}</td>
                <td className="p-2 border">{d.seller}</td>
                <td className="p-2 border">{d.sellerNo}</td>
                <td className="p-2 border">{d.productDescription}</td>
                <td className="p-2 border">{d.category}</td>
                <td className="p-2 border">{d.price}</td>
                <td className="p-2 border">{d.quantity}</td>
                <td className="p-2 border">{d.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
