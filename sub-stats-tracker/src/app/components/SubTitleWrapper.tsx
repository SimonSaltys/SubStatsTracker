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

import { createContext, useCallback, useEffect, useReducer, useState } from "react"
import SubTitleText from "./SubTitleText"
import { SubTitleHolderInitalData, SubtitleHolderState } from "../types/SubtitleTypes"
import SubTitleStateReducer, { SubtitleHolderAction } from "../functions/reducers/subtitleReducer"

export interface SubtitleContextData {
  state: SubtitleHolderState,
  dispatch: React.Dispatch<SubtitleHolderAction>
}

export const SubtitleContext = createContext<SubtitleContextData | ''>('')

export default function SubTitleWrapper() {
  const [state, dispatch] = useReducer(SubTitleStateReducer, SubTitleHolderInitalData)

   const fetchCopiedText = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      if(text && (!state.subtitles.length || state.subtitles[state.subtitles.length - 1] !== text)) {
        dispatch({
          type: "ADD_SUBTITLE",
          payload: text
        })
      }

    } catch (error) { 
        //document is not focused ignore
    }
   },[state.subtitles])

   useEffect(() => {
    const interval = setInterval(fetchCopiedText,300)

    return () => clearInterval(interval)
   }, [fetchCopiedText])

  return (
    <SubtitleContext.Provider value={{state, dispatch}}>

    <div className="flex-col">
      {
      <SubTitleText text={"Hello World"} key={0} />
      /* {subtitles.map((text, index) => (
        <SubTitleText text={text} key={index}/>
      ))} */}

      {
       <SubTitleText text={"Hello World Part 2"} key={1} />
      }
    </div>

    </SubtitleContext.Provider>
  )
}