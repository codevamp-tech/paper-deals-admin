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
import TotalDealsCard from "@/components/ui/TotalDealsCard";
import React from "react";

const orders = [
  {
    id: 1,
    dealId: "00060",
    buyer: "No organization found.",
    seller: "abc pvt ltd",
    mobile: "9876543210",
    email: "adityaseller12@gmail.com",
    size: 840,
    product: "p66",
    remarks: "we",
    date: "2025-07-11 09:56:31",
  },
  {
    id: 2,
    dealId: "00059",
    buyer: "Abhi Papper",
    seller: "Pawan Seller vnvhmgh",
    mobile: "9953334665",
    email: "pawan@gmail.com",
    size: 1000,
    product: "Maka",
    remarks: "ggdkgd",
    date: "2025-07-09 17:02:32",
  },
  {
    id: 3,
    dealId: "00058",
    buyer: "demo buyer",
    seller: "kailashi devi kashipur",
    mobile: "7253802003",
    email: "mznanubhav@gmail.com",
    size: 250000,
    product: "duplex",
    remarks: "mix gsm",
    date: "2025-07-09 11:06:43",
  },
  {
    id: 4,
    dealId: "00057",
    buyer: "demo buyer",
    seller: "kailashi devi kashipur",
    mobile: "7253802003",
    email: "mznanubhav@gmail.com",
    size: 200000,
    product: "jk",
    remarks: "copier a4",
    date: "2025-07-09 10:14:24",
  },
  {
    id: 5,
    dealId: "00056",
    buyer: "Abhi Papper",
    seller: "DEV PRIYA PAPERS PVT LTD",
    mobile: "7088006640",
    email: "",
    size: 750,
    product: "test",
    remarks: "testtt",
    date: "2025-07-08 18:31:12",
  },
];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
      </div>

      {/* Inquiries + Actions */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{inquiry.name}</p>
                    <p className="text-sm text-gray-600">{inquiry.email}</p>
                    <p className="text-sm text-gray-500">
                      {inquiry.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{inquiry.date}</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        inquiry.status === "new"
                          ? "bg-blue-100 text-blue-800"
                          : inquiry.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors">
                <Package className="h-8 w-8 text-orange-600 mb-2" />
                <p className="font-medium text-gray-900">Add Product</p>
                <p className="text-sm text-gray-600">
                  Create new product listing
                </p>
              </button>
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                <Award className="h-8 w-8 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Upload Certificate</p>
                <p className="text-sm text-gray-600">
                  Add new certification
                </p>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
                <MessageSquare className="h-8 w-8 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">View Inquiries</p>
                <p className="text-sm text-gray-600">Check new messages</p>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Analytics</p>
                <p className="text-sm text-gray-600">View performance</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 📦 Recent Orders Table at Bottom */}
      <Card className="mt-10">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Recent Orders</CardTitle>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm">
            View All
          </button>
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
                  <td className="border p-2 text-nowrap">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
