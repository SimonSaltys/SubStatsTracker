/**
 * sub-stats-tracker/src/app/components/NavBar.jsx
 * 
 * Holds the navagation for the site including the stats page and config dropdown
 * 
 * todo: 
 * add the configuration component and stats component
 */

"use client"

import { NavButton } from "./NavButton"

export default function NavBar() {

    return(
        <div className="flex bg-Obsidian justify-around items-center py-2 px-4 min-h-[60px]">
            <NavButton label={"Test"} onClick={() => {}}/>
        </div>
    )

}