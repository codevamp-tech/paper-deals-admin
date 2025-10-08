"use client";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getCookie } from "@/hooks/use-cookies";
import { getUserFromToken } from "@/hooks/use-token";

const COLORS = ["#f76c5e", "#f4a300", "#6a5acd", "#20b2aa"]; // Added extra colors if needed

export default function TotalBusinessCard() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const token = getCookie("token");
  const user = getUserFromToken();
  const userRole = user?.user_role;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [directRes, paperRes, directRevenue, paperRevenue] = await Promise.all([
          fetch("https://paper-deal-server.onrender.com/api/dashboard/summary", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }),
          fetch("https://paper-deal-server.onrender.com/api/pd-deals/stats", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }),
          fetch("https://paper-deal-server.onrender.com/api/dashboard/getDirectOrderRevenue", {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            credentials: "include",
          }),
          fetch("https://paper-deal-server.onrender.com/api/pd-deals-master/getPdDealRevenue", {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            credentials: "include",
          }),
        ]);

        const directData = await directRes.json();
        const paperData = await paperRes.json();
        const directRevenueData = await directRevenue.json();
        const paperRevenueData = await paperRevenue.json();

        // Base data (always shown)
        const formattedData = [
          { name: "Paper Deals", value: Number(paperData.sum || paperData.data?.sum) || 0 },
          { name: "Direct Order", value: Number(directData.sum || directData.data?.sum) || 0 },
        ];

        // Conditionally add revenue data only for userRole === 4
        if (userRole === 4) {
          formattedData.push(
            { name: "Direct Order Revenue", value: Number(directRevenueData.directOrderSum) || 0 },
            { name: "PD Deals Revenue", value: Number(paperRevenueData.netRevenue) || 0 }
          );
        }

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userRole]);

  const total = data.reduce((acc, item) => acc + item.value, 0);

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-3xl flex items-center justify-center p-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-3xl">
      {/* Header */}
      <div className="bg-red-600 p-3">
        <h2 className="text-white font-semibold text-lg">Total Business</h2>
      </div>

      {/* Chart & Legend */}
      <div className="p-4 flex flex-col items-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip formatter={(value: number) => `${value}`} />
            <Legend verticalAlign="top" height={36} />
          </PieChart>
        </ResponsiveContainer>

        {/* Total Amount */}
        <p className="mt-2 font-semibold text-lg">
          Total – {total}
        </p>
      </div>
    </div>
  );
}
