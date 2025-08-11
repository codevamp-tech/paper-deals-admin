"use client";
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Paper Deals', value: 2000000 },
  { name: 'Direct Order', value: 2196770 }
];

const COLORS = ['#f76c5e', '#f4a300']; // Paper Deals (coral), Direct Order (orange)

export default function TotalBusinessCard() {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full  max-w-3xl">
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
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend verticalAlign="top" height={36} />
          </PieChart>
        </ResponsiveContainer>

        {/* Total Amount */}
        <p className="mt-2 font-semibold text-lg">
          Total - {total.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
}
