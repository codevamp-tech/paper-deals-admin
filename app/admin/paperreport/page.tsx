"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BusinessReport from "@/components/pdreport/business"
import StatusReport from "@/components/pdreport/status"
import ClosureReport from "@/components/pdreport/closer"
import PdProcessReport from "@/components/pdreport/process"



type ReportType = "Business" | "Status" | "Closure" | "Process"

export default function PdReport() {
  const [selectedDealType, setSelectedDealType] = useState<ReportType>("Business")

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-4 px-2">
        <div className="w-full">
          {/* Dropdown Filter */}
          <div className="flex justify-center mb-4">
            <Select
              value={selectedDealType}
              onValueChange={(value: ReportType) => setSelectedDealType(value)}
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select Deal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Status">Status</SelectItem>
                <SelectItem value="Closure">Closure</SelectItem>
                <SelectItem value="Process">Process</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deal Content */}
          <div className="transition-all duration-300 ease-in-out">
            {selectedDealType === "Business" && (
              <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
                <BusinessReport />
              </div>
            )}

            {selectedDealType === "Status" && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300">
                <StatusReport />
              </div>
            )}

            {selectedDealType === "Closure" && (
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                <ClosureReport />
              </div>
            )}

            {selectedDealType === "Process" && (
              <div className="animate-in fade-in-0 slide-in-from-top-4 duration-300">
                <PdProcessReport />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
