/**
 * sub-stats-tracker/src/app/components/navbar/NavBar.tsx
 * 
 * Holds the navagation for the site including the stats page and config dropdown
 * 
 */

"use client"

import { ChartNoAxesCombined, NotebookText, Settings, Upload } from "lucide-react"
import { BigButton } from "@/app/components/baseui/BigButton"
import { SmallButton } from "@/app/components/baseui/SmallButton"

export default function Footer() {

    return(
        <div className="flex justify-between items-center py-2 px-4 min-h-[60px] border border-b-gray-300">
      {/* Left Side: Logo & Text */}
      <span className="flex items-center gap-2">
        <NotebookText size={25} />
        <p className="text-lg font-semibold">SubsTracker</p>
      </span>
    </div>
        
    )

}