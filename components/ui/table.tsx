// components/RecentOrderTable.tsx

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

export default function RecentOrderTable2() {
  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Recent Order</h2>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">
          View All
        </button>
      </div>
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
    </div>
  );
}
