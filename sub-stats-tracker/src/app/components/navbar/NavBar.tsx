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

export default function NavBar() {

    return(
        <div className="flex justify-between items-center py-2 px-4 min-h-[60px] border border-b-gray-300">
      {/* Left Side: Logo & Text */}
      <span className="flex items-center gap-2">
        <NotebookText size={25} />
        <p className="text-lg font-semibold">SubsTracker</p>
      </span>

      {/* Right Side: Buttons */}
      <div className="flex items-center gap-4">
        <BigButton
          label={
            <span className="flex items-center gap-2">
              <Upload />
              <span>Upload</span>
            </span>
          }
          onClick={() => {
            
          }}
        />
        <SmallButton label={<Settings size={20} color="gray" />} onClick={() => {}} />
        <SmallButton label={<ChartNoAxesCombined size={20} color="gray" />} onClick={() => {}} />
      </div>
    </div>
        
    )

}