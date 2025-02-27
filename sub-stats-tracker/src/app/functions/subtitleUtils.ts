import { Dispatch } from "react"
import { SubtitleHolderState } from "../types/SubtitleTypes"
import { SubtitleHolderAction } from "./reducers/subtitleReducer"

async function readInSubtitleLine(state : SubtitleHolderState, dispatch : Dispatch<SubtitleHolderAction> ) {
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