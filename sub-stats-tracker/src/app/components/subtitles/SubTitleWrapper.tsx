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
import {useCallback, useContext, useEffect, useRef} from "react"
import SubTitleText from "@/app/components/subtitles/SubTitleText"
import { readInSubtitleLine, useWindowDimensions  } from "@/app/functions/subtitleUtils"
import { SubtitleContext } from "../ClientWrapper"
import { SubtitleContextData } from "@/app/types/subtitleTypes"
import { ResizableBox } from "react-resizable"
import { ChevronRight } from "lucide-react";

export default function SubTitleWrapper() {
      const context = useContext(SubtitleContext) as SubtitleContextData
      const dimensions = useWindowDimensions()
      const state = context.state
      const dispatch = context.dispatch
      const scrollRef = useRef<HTMLDivElement>(null)


    //get the text from the clipboard (todo, remove when able to read from video itself)
   const fetchCopiedText = useCallback(async () => {

      readInSubtitleLine(state,dispatch)

   },[state.subtitles])

   //repeatedly check the clipboard (todo, remove when able to read from video itself)
   useEffect(() => {
    const interval = setInterval(fetchCopiedText,300)
    return () => clearInterval(interval)
   }, [fetchCopiedText])

   useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.subtitles]);

  return (
    <div className="">

    
      <ResizableBox className="w-1/3 overflow-y-auto" 
                    width={dimensions.width} height={dimensions.height}
                    minConstraints={[dimensions.width,dimensions.height]}
                    maxConstraints={[dimensions.width*2, dimensions.height*2]}
                    axis="x"
                    resizeHandles={["e"]}
                    handle={(h, ref) => {
                      console.log("Rendering handle for:", h); // Debugging
                      return <span className={`flex items-center custom-handle custom-handle-${h}`} ref={ref}>
                                    <ChevronRight size={20}/>
                      </span>
                    }}>

            <div ref={scrollRef} className="h-full overflow-y-auto pb-5 font-noto-sans-jp">
            
              {
              state.subtitles.map((text, index) => (
                <SubTitleText text={text} id={index} key={index}/>
              ))}
            </div>
          
      </ResizableBox>
      </div>
  )
}

