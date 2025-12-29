"use client";

import { Edit, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Enquiry = {
  id: number;
  buyer_id: number;
  product_id: number;
  msg: string;
  quantity: string;
  status: number;
  created_at: string;
  buyer?: {
    id: number;
    name: string;
  };
  product?: {
    id: number;
    product_name: string;
  };
};

export default function LivePriceEnquiryPage() {
  const [data, setData] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("https://paper-deal-server.onrender.com/api/live-price-lead")
      .then((res) => res.json())
      .then((result) => {
        setData(result.data || result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Live Price Enquiries
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Buyer</th>
              <th className="border px-3 py-2">Product</th>
              <th className="border px-3 py-2">Quantity(Kg) </th>
              <th className="border px-3 py-2">Message</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Edit</th>

            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No enquiries found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{item.id}</td>
                  <td className="border px-3 py-2">
                    {item.buyer?.name || "—"}
                  </td>
                  <td className="border px-3 py-2">
                    {item.product?.name || "—"}
                  </td>
                  <td className="border px-3 py-2">{item.quantity}</td>
                  <td className="border px-3 py-2">{item.msg}</td>
                  <td className="p-2 border">
                    {item.status === 1 ? (
                      <span className="text-green-600 font-medium">Accepted</span>
                    ) : item.status === 2 ? (
                      <span className="text-red-600 font-medium">Rejected</span>
                    ) : item.status === 0 ? (
                      <span className="text-orange-500 font-medium">Pending</span>
                    ) : null}
                  </td>
                  <td className="border px-3 py-2">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <button
                      onClick={() =>
                        router.push(`/admin/inquiries/leads/enquiry/${item.id}`)
                      }
                    >
                      <Edit size={18} />
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
