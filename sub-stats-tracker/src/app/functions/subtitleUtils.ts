/**
 * sub-stats-tracker/src/app/functions/subtitleUtils.ts
 * 
 * holds the util functions to be used by subtitle components
 * 
 */

import { Dispatch, useLayoutEffect, useState } from "react"
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

//todo maybe pass the subtraction as an arg if multiple of these functions are used
export function useWindowDimentions() {
  const [dimentions, setDimentions] = useState({ width: 300, height: 300 }); 
  useLayoutEffect(() => {
    function updateSize() {
      setDimentions({ width: window.innerWidth / 3, height: window.innerHeight - 60 });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return dimentions;
}