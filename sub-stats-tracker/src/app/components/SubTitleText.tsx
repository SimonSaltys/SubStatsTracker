/**
 * sub-stats-tracker\src\app\components\SubTitleText.tsx
 * 
 * Displays the current line of text that the media player 
 * has copied to the clipboard.
 * 
 * todo: 
 *    css styling (on hover effect)
 */


"use client";

import { useContext } from "react";
import { SubtitleContext, SubtitleContextData } from "./SubTitleWrapper";
import { Delete } from "lucide-react";

export default function SubTitleText(props : {text : String, id: number }) {
    const context = useContext(SubtitleContext) as SubtitleContextData
    
    function removeSubtitle() {
        console.log("CLICKEd")
        context.dispatch({
            type: "REMOVE_SUBTITLE",
            payload: props.id
          })

    }

    return(
            <div className="my-5 ml-5 text-[1.2rem] font-medium leading-7 flex items-center justify-between">
                <p className="mr-2">{props.text}</p>
                
                <button 
                    className="mr-5 text-gray-600 hover:text-red-600 transition"
                    onClick={removeSubtitle}>

                    <Delete size={25} className="align-middle" />
                </button>
            </div>
    )
}

