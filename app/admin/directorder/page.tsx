"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CloseDealsPage from "@/components/directDeal/closedeal"
import DealsTable from "@/components/directDeal/currentdeal"

type DealType = "current" | "closed"

export default function DealsPage() {
  const [selectedDealType, setSelectedDealType] = useState<DealType>("current")

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-4 px-2">
        <div className="w-full">
          <div>
            {/* Deal Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-muted rounded-lg p-1 gap-1">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedDealType("current")}
                  className={`transition-all duration-200 ease-in-out
    ${selectedDealType === "current" ? "bg-blue-500 text-white" : "text-gray-700"}
  `}
                >
                  Current Direct Deals
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setSelectedDealType("closed")}
                  className={`transition-all duration-200 ease-in-out
    ${selectedDealType === "closed" ? "bg-blue-500 text-white" : "text-gray-700"} 
  `}
                >
                  Closed Direct Deals
                </Button>
              </div>
            </div>

            {/* Deal Content with Smooth Transition */}
            <div className="transition-all duration-300 ease-in-out">
              {selectedDealType === "current" ? (
                <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
                  <DealsTable />
                </div>
              ) : (
                <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300">
                  <CloseDealsPage />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
