"use client"

import "react-resizable/css/styles.css";
import {useCallback, useContext, useEffect, useRef, useState} from "react"
import SubTitleText from "@/app/components/subtitles/SubTitleText"
import { readInSubtitleLine, useWindowDimensions } from "@/app/functions/subtitleUtils"
import { SubtitleContext } from "../ClientWrapper"
import { SubtitleContextData } from "@/app/types/SubtitleTypes"
import { ResizableBox } from "react-resizable"
import { ChevronLeft } from "lucide-react";

export default function SubTitleWrapper() {
    const context = useContext(SubtitleContext) as SubtitleContextData
    const dimensions = useWindowDimensions()
    const state = context.state
    const dispatch = context.dispatch
    const scrollRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(300) // Default width for subtitle panel
    
    // Get the text from the clipboard
    const fetchCopiedText = useCallback(async () => {
        readInSubtitleLine(state, dispatch)
    }, [state.subtitles, dispatch, state])
    
    // Repeatedly check the clipboard
    useEffect(() => {
        const interval = setInterval(fetchCopiedText, 300)
        return () => clearInterval(interval)
    }, [fetchCopiedText])
    
    // Auto-scroll to the latest subtitle
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [state.subtitles]);

    // Handle width changes
    const onResize = (e: any, {size}: {size: {width: number, height: number}}) => {
        setWidth(size.width);
    };
    
    return (
        <ResizableBox 
            className="h-full overflow-y-auto border-l"
            width={width} 
            height={dimensions.height} 
            minConstraints={[200, dimensions.height]}
            maxConstraints={[500, dimensions.height]}
            axis="x"
            resizeHandles={["w"]}
            onResize={onResize}
            handle={(h, ref) => (
                <span className={`flex items-center custom-handle custom-handle-${h}`} ref={ref}>
                    <ChevronLeft size={20} />
                </span>
            )}
        >
            <div ref={scrollRef} className="h-full pl-2 pb-2 overflow-y-auto font-noto-sans-jp">
                {state.subtitles.map((text, index) => (
                    <SubTitleText text={text} id={index} key={index}/>
                ))}
            </div>
        </ResizableBox>
    )
}