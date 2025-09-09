"use client";

import {
  Package,
  MessageSquare,
  Award,
  TrendingUp,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TotalBusinessCard from "@/components/ui/TotalBusinessCard";
import TotalDealsCard from "@/components/ui/TotalDealsCard"
import React, { useEffect, useState } from "react";
import { fromJSON } from "postcss";
import Pagination from "@/components/pagination";



const stats = [
  {
    title: "Total Products",
    value: "156",
    change: "+12%",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "New Inquiries",
    value: "23",
    change: "+5%",
    icon: MessageSquare,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Certificates",
    value: "8",
    change: "+2",
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Monthly Views",
    value: "12.5K",
    change: "+18%",
    icon: Eye,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const recentInquiries = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    category: "Electronics",
    date: "2024-01-15",
    status: "new",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    category: "Wood",
    date: "2024-01-14",
    status: "in-progress",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@example.com",
    category: "Textiles",
    date: "2024-01-13",
    status: "completed",
  },
];

export default function AdminDashboard() {

  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 10; // default rows per page
  const [paperDeals, setPaperDeals] = useState<any[]>([]);
  const [paperCurrentPage, setPaperCurrentPage] = useState(1);
  const [paperTotalPages, setPaperTotalPages] = useState(1);
  const paperRowsPerPage = 10;


  useEffect(() => {
    const fetchOrders = async (page = 1) => {
      try {
        const res = await fetch(`http://localhost:5000/api/dashboard?page=${page}&limit=${rowsPerPage}`);
        const data = await res.json();

        // Map API fields to table fields
        const mappedOrders = data.deals.map((item: any, index: number) => ({
          id: index + 1 + (page - 1) * rowsPerPage,
          dealId: item.deal_id,
          buyer: item.buyerUser?.name || item.buyer || "N/A",
          seller: item.sellerUser?.name || item.contact_person || "N/A",
          mobile: item.mobile_no,
          email: item.email_id || item.sellerUser?.email_address || "N/A",
          size: item.deal_size,
          product: item.product_description,
          remarks: item.remarks,
          date: new Date(item.created_on).toLocaleString(),
        }));

        setOrders(mappedOrders);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders(currentPage);
  }, [currentPage]);

  // Inside useEffect for paper deals
  useEffect(() => {
    const fetchPaperDeals = async (page = 1) => {
      try {
        const res = await fetch(`http://localhost:5000/api/pd-deals/filtered?page=${page}&limit=${paperRowsPerPage}`);
        const data = await res.json();

        const mappedDeals = data.deals.map((item: any, index: number) => ({
          id: index + 1 + (page - 1) * paperRowsPerPage,
          dealId: item.deal_id.padStart(6, "0"), // formatting like 000101
          pdName: item.user?.name || "N/A",
          buyer: item.buyerUser?.name || "N/A",
          contactPerson: item.contact_person || "-",
          mobile: item.mobile_no || item.user?.phone_no || "-",
          email: item.email_id || item.user?.email_address || "-",
          dealSize: item.deal_size || item.quantity_in_kg || "-", // fallback
          productDescription: item.product_description || item.sub_product || "-",
          date: new Date(item.updated_on || item.created_on).toLocaleString(),
        }));

        setPaperDeals(mappedDeals);
        setPaperTotalPages(data.totalPages || 1);
        setPaperCurrentPage(data.currentPage || 1);
      } catch (error) {
        console.error("Error fetching paper deals:", error);
      }
    };

    fetchPaperDeals(paperCurrentPage);
  }, [paperCurrentPage]);



  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="h-full">
          <TotalBusinessCard />
        </div>
        <div className="h-full">
          <TotalDealsCard />
        </div>
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}



      {/* 📦 Recent Orders Table at Bottom */}
      <Card className="mt-10">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Deal ID</th>
                <th className="border p-2">Buyer</th>
                <th className="border p-2">Seller</th>
                <th className="border p-2">Mobile No.</th>
                <th className="border p-2">Email Id</th>
                <th className="border p-2">Deal Size</th>
                <th className="border p-2">Product Description</th>
                <th className="border p-2">Remarks</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{order.id}</td>
                  <td className="border p-2 text-center">{order.dealId}</td>
                  <td className="border p-2">{order.buyer}</td>
                  <td className="border p-2">{order.seller}</td>
                  <td className="border p-2 text-center">{order.mobile}</td>
                  <td className="border p-2">{order.email}</td>
                  <td className="border p-2 text-center">{order.size}</td>
                  <td className="border p-2">{order.product}</td>
                  <td className="border p-2">{order.remarks}</td>
                  <td className="border p-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page: number) => setCurrentPage(page)}
          />

        </CardContent>
      </Card>


      {/* 📄 Recent Paper Deals Table */}
      <Card className="mt-10">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Recent Paper Deals</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Deal ID</th>
                <th className="border p-2">PD Name</th>
                <th className="border p-2">Buyer</th>
                {/* <th className="border p-2">Contact Person</th> */}
                <th className="border p-2">Mobile No.</th>
                <th className="border p-2">Email Id</th>
                <th className="border p-2">Deal Size</th>
                <th className="border p-2">Product Description</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {paperDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{deal.id}</td>
                  <td className="border p-2 text-center">{deal.dealId}</td>
                  <td className="border p-2">{deal.pdName}</td>
                  <td className="border p-2">{deal.buyer}</td>
                  {/* <td className="border p-2">{deal.contactPerson}</td> */}
                  <td className="border p-2 text-center">{deal.mobile}</td>
                  <td className="border p-2">{deal.email}</td>
                  <td className="border p-2 text-center">{deal.dealSize}</td>
                  <td className="border p-2">{deal.productDescription}</td>
                  <td className="border p-2">{deal.date}</td>
                </tr>
              ))}
            </tbody>

          </table>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page: number) => setCurrentPage(page)}
          />

        </CardContent>
      </Card>


    </div>
  );
}
