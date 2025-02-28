/**
 * sub-stats-tracker/src/app/types/subtitleTypes.ts
 * 
 * Holds all the data types for components that need subititle data use
 * 
 */
import { SubtitleHolderAction } from "../functions/reducers/subtitleReducer"

export interface SubtitleHolderState {
    subtitles: string[]
}

export const SubtitleHolderInitalData : SubtitleHolderState = {
    subtitles: []
}

export interface SubtitleContextData {
  state: SubtitleHolderState,
  dispatch: React.Dispatch<SubtitleHolderAction>
}