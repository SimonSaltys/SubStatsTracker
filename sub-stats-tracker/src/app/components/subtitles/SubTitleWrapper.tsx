/**
 * sub-stats-tracker/src/app/components/subtitles/SubTitleWrapper.tsx
 * 
 * The main wrapper of this project. Shows the subtitle texts that have been displayed 
 * so far and holds the configuration component the user can modify 
 * which affects the displaying of text/stats.
 * 
 * todo: 
 *    have the text lines stay persistent. 
 *    add the configuration component.
 *    break out logic into smaller components
 *    css styling
 */

"use client"
import "react-resizable/css/styles.css";
import {useCallback, useContext, useEffect, useState} from "react"
import SubTitleText from "@/app/components/subtitles/SubTitleText"
import { readInSubtitleLine, useWindowDimentions  } from "@/app/functions/subtitleUtils"
import { SubtitleContext } from "../ClientWrapper"
import { SubtitleContextData } from "@/app/types/subtitleTypes"
import { ResizableBox } from "react-resizable"
import { ChevronRight } from "lucide-react";

export default function SubTitleWrapper() {
      const context = useContext(SubtitleContext) as SubtitleContextData
      const dimentions = useWindowDimentions()
      const state = context.state
      const dispatch = context.dispatch


    //get the text from the clipboard (todo, remove when able to read from video itself)
   const fetchCopiedText = useCallback(async () => {

      readInSubtitleLine(state,dispatch)

   },[state.subtitles])

   //repeatedly check the clipboard (todo, remove when able to read from video itself)
   useEffect(() => {
    const interval = setInterval(fetchCopiedText,300)
    return () => clearInterval(interval)
   }, [fetchCopiedText])

  return (
    <div className="">

    
      <ResizableBox className="w-1/3 overflow-y-auto" 
                    width={dimentions.width} height={dimentions.height}
                    minConstraints={[dimentions.width,dimentions.height]}
                    maxConstraints={[dimentions.width*2, dimentions.height*2]}
                    axis="x"
                    resizeHandles={["e"]}
                    handle={(h, ref) => {
                      console.log("Rendering handle for:", h); // Debugging
                      return <span className={`flex items-center custom-handle custom-handle-${h}`} ref={ref}>
                                    <ChevronRight size={20}/>
                      </span>
                    }}>
            {
          state.subtitles.map((text, index) => (
            <SubTitleText text={text} id={index} key={index}/>
          ))}
      </ResizableBox>
      </div>
  )
}

