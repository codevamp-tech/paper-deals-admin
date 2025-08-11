"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClosePaperDealPage() {
  const deals = [
    { id: 1, buyer: "Star Ltd", seller: "Paper Co", product: "Brown Paper", status: "Closed" },
  ];

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>Closed Paper Deals</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2">Buyer</th>
              <th className="p-2">Seller</th>
              <th className="p-2">Product</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="p-2">{d.buyer}</td>
                <td className="p-2">{d.seller}</td>
                <td className="p-2">{d.product}</td>
                <td className="p-2">{d.status}</td>
                <td className="p-2">
                  <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
