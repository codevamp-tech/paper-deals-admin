"use client";

import { useState } from "react";
import LivePriceEnquiryPage from "./enquiry/page";
import RquarmentList from "./requirements/page";


type TabType = "requirement" | "livePrice";

export default function LeadsTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("requirement");

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("requirement")}
          className={`px-5 py-2 rounded-md text-sm font-medium border transition
            ${activeTab === "requirement"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
        >
          Requirement
        </button>

        <button
          onClick={() => setActiveTab("livePrice")}
          className={`px-5 py-2 rounded-md text-sm font-medium border transition
            ${activeTab === "livePrice"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
        >
          Live Price Enquiry
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === "requirement" && <RquarmentList />}
        {activeTab === "livePrice" && <LivePriceEnquiryPage />}
      </div>
    </div>
  );
}
