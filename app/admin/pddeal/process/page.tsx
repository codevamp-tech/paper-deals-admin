"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ProcessPaperDealPage() {
  const [search, setSearch] = useState("");

  const deals = [
    {
      srNo: 1,
      dealId: "000101",
      pdExecutive: "ANUBHAV TOMER",
      buyer: "DEMO BUYER",
      contactPerson: "DEMO BUYER",
      mobile: "8445549289",
      email: "demobuyer@gmail.com",
      price: 2,
      quantity: 2000,
      totalAmount: 4000,
    },
    {
      srNo: 2,
      dealId: "000100",
      pdExecutive: "ANUBHAV TOMER",
      buyer: "DEMO BUYER",
      contactPerson: "DEMO BUYER",
      mobile: "8445549289",
      email: "demobuyer@gmail.com",
      price: 50,
      quantity: 100,
      totalAmount: 5000,
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
        <CardTitle>Process PD Deals</CardTitle>
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
              <th className="p-2 border">SR NO.</th>
              <th className="p-2 border">Deal Id</th>
              <th className="p-2 border">PD Executive</th>
              <th className="p-2 border">Buyer</th>
              <th className="p-2 border">Contact Person</th>
              <th className="p-2 border">Mobile No.</th>
              <th className="p-2 border">Email Id</th>
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
                <td className="p-2 border">{d.buyer}</td>
                <td className="p-2 border">{d.contactPerson}</td>
                <td className="p-2 border">{d.mobile}</td>
                <td className="p-2 border">{d.email}</td>
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
