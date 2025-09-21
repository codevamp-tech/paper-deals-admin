"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CloseDealsPage from "@/components/directDeal/closedeal"
import DealsTable from "@/components/directDeal/currentdeal"
import PdDealsBillingTable from "@/components/biiling/pdDealBilling"
import DirectBillingTable from "@/components/biiling/directBilling"

type DealType = "current" | "closed"

export default function BillingPage() {
  const [selectedDealType, setSelectedDealType] = useState<DealType>("current")

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-4 px-2">
        <div className="w-full">
          <div>
            {/* Deal Type Toggle */}
            <div className="flex justify-center mb-2">
              <div className="flex bg-muted rounded-lg p-1 gap-1">
                <Button
                  variant={selectedDealType === "current" ? "default" : "ghost"}
                  onClick={() => setSelectedDealType("current")}
                  className="transition-all duration-200 ease-in-out"
                >
                  Direct Deal Billing
                </Button>
                <Button
                  variant={selectedDealType === "closed" ? "default" : "ghost"}
                  onClick={() => setSelectedDealType("closed")}
                  className="transition-all duration-200 ease-in-out"
                >
                  PD Deal Billing
                </Button>
              </div>
            </div>

            {/* Deal Content with Smooth Transition */}
            <div className="transition-all duration-300 ease-in-out">
              {selectedDealType === "current" ? (
                <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
                  <DirectBillingTable />
                </div>
              ) : (
                <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300">
                  <PdDealsBillingTable />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
