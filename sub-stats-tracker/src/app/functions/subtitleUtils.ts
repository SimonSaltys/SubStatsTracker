/**
 * sub-stats-tracker/src/app/functions/subtitleUtils.ts
 * 
 * holds the util functions to be used by subtitle components
 * 
 */

import { Dispatch, useLayoutEffect, useState, useEffect } from "react"
import { SubtitleHolderState } from "@/app/types/SubtitleTypes"
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

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

//todo maybe pass the subtraction as an arg if multiple of these functions are used
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 }); 
  useLayoutEffect(() => {
    function updateSize() {
      setDimensions({ width: window.innerWidth / 3, height: window.innerHeight - 60 });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return dimensions;
}