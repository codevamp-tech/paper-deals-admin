"use client";
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const sampleData = [
  { day: 1, direct: 0, paper: 0 },
  { day: 2, direct: 0, paper: 0 },
  { day: 3, direct: 1, paper: 0 },
  { day: 4, direct: 2, paper: 1 },
  { day: 5, direct: 4, paper: 0 },
  { day: 6, direct: 0, paper: 0 },
  { day: 7, direct: 2, paper: 0 },
  { day: 8, direct: 5, paper: 4 },
  { day: 9, direct: 3, paper: 2 },
  { day: 10, direct: 1, paper: 0 },
  { day: 11, direct: 0, paper: 1 },
  { day: 12, direct: 0, paper: 0 },
  { day: 13, direct: 0, paper: 0 },
  // Continue for full 30 days as needed...
];

export default function TotalDealsCard() {
  const [filter, setFilter] = useState('Daily');

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-3xl">
      {/* Header */}
      <div className="bg-cyan-700 px-4 py-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-red-600">Total Deals</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-1 rounded border border-gray-300 text-sm"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {/* Chart */}
      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={sampleData}
            margin={{ top: 10, right: 20, bottom: 0, left: -10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="direct"
              name="Direct Order"
              stroke="#f4a300"
              strokeWidth={3}
              dot={{ fill: '#f4a300', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="paper"
              name="Paper Deals"
              stroke="#f76c5e"
              strokeWidth={3}
              dot={{ fill: '#f76c5e', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
