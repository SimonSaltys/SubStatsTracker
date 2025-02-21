/**
 * sub-stats-tracker\src\app\components\SubTitleWrapper.tsx
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

import { useCallback, useEffect, useState } from "react"
import SubTitleText from "./SubTitleText"
export default function SubTitleWrapper() {
    const [subtitles, setSubtitles] = useState<string[]>([])
    
   const fetchCopiedText = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      if(text && (!subtitles.length || subtitles[subtitles.length - 1] !== text)) {
        setSubtitles(prev => [...prev, text])
      }

    } catch (error) { 
        //document is not focused ignore
    }
   },[subtitles])

   useEffect(() => {
    const interval = setInterval(fetchCopiedText,300)

    return () => clearInterval(interval)
   }, [fetchCopiedText])

  return (
    <div>
      {subtitles.map((text, index) => (
        <SubTitleText text={text} key={index}/>
      ))}
    </div>
  )
}