import { SubtitleHolderState } from "@/app/types/SubtitleTypes";

export type SubtitleHolderAction = 
 | { type: "ADD_SUBTITLE"; payload: string }
 | {type: "REMOVE_SUBTITLE"; payload: number}

 export default function SubTitleStateReducer(
    state: SubtitleHolderState,
    action: SubtitleHolderAction) : SubtitleHolderState {

        switch(action.type) {
            case "ADD_SUBTITLE":
                return {...state, subtitles: [...state.subtitles, action.payload]}
            case "REMOVE_SUBTITLE":
                let removedArray = state.subtitles
                removedArray.splice(action.payload)

                return {...state, subtitles: removedArray}
            default:
                return state        
        }
 }