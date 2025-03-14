/**
 * sub-stats-tracker/src/app/functions/reducers/subtitleReducer.ts
 * 
 * Holds the reducers for subtitle componenents
 * 
 */
import { SubtitleHolderState } from "@/app/types/subtitleTypes";

export type SubtitleHolderAction = 
 | { type: "ADD_SUBTITLE"; payload: string }
 | {type: "REMOVE_SUBTITLE"; payload: number}

 export default function SubTitleStateReducer(
    state: SubtitleHolderState,
    action: SubtitleHolderAction) : SubtitleHolderState {

        switch(action.type) {
            case "ADD_SUBTITLE":
                return {subtitles: [...state.subtitles, action.payload]}
            case "REMOVE_SUBTITLE":
                let removedArray = [...state.subtitles]; 
                removedArray.splice(action.payload, 1); 
                
                return {subtitles: removedArray}
            default:
                return state        
        }
 }