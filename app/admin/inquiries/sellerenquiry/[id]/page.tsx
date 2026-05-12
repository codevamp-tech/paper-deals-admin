"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ViewEnquiryPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [row, setRow] = useState<any>(null);
  const [status, setStatus] = useState<number>(0);
  const router = useRouter();

  // 🔹 Fetch enquiry (EnquiryMessage or direct B2B Enquiry)
  useEffect(() => {
    if (!id) return;

    const fetchEnquiry = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/enquiry/enquiry-seller/${id}`,
          { cache: "no-store" }
        );

        const data = await res.json();
        console.log("ENQUIRY RESPONSE 👉", data);

        // ✅ CASE 1: API returns array
        if (Array.isArray(data) && data.length > 0) {
          setRow(data[0]);
          setStatus(data[0].status);
          return;
        }

        // ✅ CASE 2: API returns object directly
        if (data && data.id) {
          setRow(data);
          setStatus(data.status);
          return;
        }

        setRow(null);
      } catch (err) {
        console.error("Failed to fetch enquiry", err);
        setRow(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiry();
  }, [id]);

  // ✅ NEW: Accept enquiry + auto-create PD Bulk Deal via single endpoint
  const handleAcceptAndCreateDeal = async () => {
    if (!row?.enquiry?.id) {
      toast.error("Cannot determine enquiry ID");
      return;
    }

    setAccepting(true);
    try {
      const token = localStorage.getItem("token");

      // 🔑 Call the NEW endpoint: POST /api/pd-deals-master/accept-enquiry/:enquiry_id
      const res = await fetch(
        `${API_URL}/api/pd-deals-master/accept-enquiry/${row.enquiry.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Deal accepted & PD Bulk Deal created!");
        setStatus(1);

        // ✅ Redirect to seller's PD deal table (current deals)
        setTimeout(() => {
          router.push("/admin/pddeal/current");
        }, 1800);
      } else {
        toast.error(data.message || "Failed to accept deal");
      }
    } catch (error) {
      console.error("Accept & create deal failed", error);
      toast.error("An error occurred while processing the deal");
    } finally {
      setAccepting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!row) return <p className="p-6">No enquiry found</p>;

  const enquiry = row.enquiry;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">View Enquiry</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">Buyer</label>
            <Input value={`KPDB_${enquiry?.buyer?.id || "N/A"}`} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <Input value={enquiry?.company_name || "N/A"} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <Input value={enquiry?.city || "N/A"} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Input value={enquiry?.category?.name || "N/A"} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product</label>
            <Input value={row.product || "N/A"} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shade</label>
            <Input value={enquiry?.shade || "-"} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">GSM</label>
            <Input value={enquiry?.gsm || "-"} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <Input value={enquiry?.size || "-"} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity (kg)</label>
            <Input value={enquiry?.quantity_in_kg || "-"} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <Input value={enquiry?.remarks || "-"} disabled />
          </div>
        </div>

        {/* Status + Actions */}
        <div className="mt-6 flex items-center gap-4 flex-wrap">
          <div className="w-64">
            <label className="block text-sm font-medium mb-1">Status</label>
            <Input
              value={
                status === 0
                  ? "Pending"
                  : status === 1
                  ? "Accepted"
                  : "Rejected / Lost"
              }
              disabled
              className={`font-semibold ${
                status === 0
                  ? "bg-orange-50 border-orange-300"
                  : status === 1
                  ? "bg-green-50 border-green-300"
                  : "bg-red-50 border-red-300"
              }`}
            />
          </div>

          {/* 🔵 Pending → Accept & Create PD Bulk Deal */}
          {status === 0 && (
            <button
              onClick={handleAcceptAndCreateDeal}
              disabled={accepting}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-medium disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {accepting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Processing...
                </>
              ) : (
                "Accept & Create PD Bulk Deal"
              )}
            </button>
          )}

          {/* 🟢 Already Accepted */}
          {status === 1 && (
            <div className="mt-6 flex gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm font-medium">
                ✅ Deal Accepted — PD Bulk Deal Created
              </span>
              <button
                onClick={() => router.push("/admin/pddeal/current")}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition font-medium"
              >
                View PD Deals
              </button>
              <button
                onClick={() => router.push("/admin/inquiries/sellerenquiry")}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Go Back
              </button>
            </div>
          )}

          {/* 🔴 Rejected / Lost */}
          {status === 2 && (
            <button
              onClick={() => router.push("/admin/inquiries/sellerenquiry")}
              className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
