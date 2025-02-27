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

import { createContext, useCallback, useEffect, useReducer} from "react"
import SubTitleText from "@/app/components/subtitles/SubTitleText"
import { SubtitleHolderState, SubtitleHolderInitalData } from "@/app/types/SubtitleTypes"
import SubTitleStateReducer, {SubtitleHolderAction} from "@/app/functions/reducers/subtitleReducer"
import NavBar from "@/app/components/navbar/NavBar"

export interface SubtitleContextData {
  state: SubtitleHolderState,
  dispatch: React.Dispatch<SubtitleHolderAction>
}

export const SubtitleContext = createContext<SubtitleContextData | ''>('')

export default function SubTitleWrapper() {
  const [state, dispatch] = useReducer(SubTitleStateReducer, SubtitleHolderInitalData)

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

    <NavBar/>


    <div className="flex-col">
      {
       state.subtitles.map((text, index) => (
        <SubTitleText text={text} id={index} key={index}/>
      ))}
    </div>

    </SubtitleContext.Provider>
  )
}