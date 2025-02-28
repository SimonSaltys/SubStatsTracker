/**
 * sub-stats-tracker/src/app/functions/subtitleUtils.ts
 * 
 * holds the util functions to be used by subtitle components
 * 
 */

import { Dispatch } from "react"
import { SubtitleHolderState } from "@/app/types/subtitleTypes"
import { SubtitleHolderAction } from "./reducers/subtitleReducer"

export async function readInSubtitleLine(state : SubtitleHolderState, dispatch : Dispatch<SubtitleHolderAction> ) {
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
}