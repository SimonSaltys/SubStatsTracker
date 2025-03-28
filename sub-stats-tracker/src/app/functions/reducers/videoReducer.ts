import { VideoPlayerState, VideoSource } from "@/app/types/videoTypes";
import { FFmpeg } from "@ffmpeg/ffmpeg";

export type VideoPlayerAction = 
| {type: "SET_IS_CONVERTING"; payload: boolean}
| {type: "SET_LOADED"; payload: boolean}
| {type: "SET_IS_PLAYING"; payload : boolean}
| {type: "SET_FFMPEG"; payload: FFmpeg | null}
| {type: "SET_VOLUME"; payload: number}
| {type: "SET_VIDEO_LENGTH"; payload: number}
| {type: "ADD_VIDEO_SEGMENT"; payload: VideoSource}
| {type: "INITIALIZE_VIDEO_SEGMENTS"; payload: string[]}
| {type: "SET_SEEKED_TIME"; payload: number}
| {type: "UPDATE_CURRENT_SEGMENT"; payload: VideoSource}





export default function VideoPlayerStateReducer(
    state: VideoPlayerState,
    action: VideoPlayerAction) : VideoPlayerState {

    switch(action.type){ 
        case "SET_IS_CONVERTING":
            return {
                ...state, 
                isConverting: action.payload, 
              };
        case "SET_LOADED":
            return {
                ...state, 
                loaded: action.payload,
              };
        case "SET_IS_PLAYING":
           return {
                ...state, 
                playing: action.payload,
              };
        case "SET_FFMPEG":
            return {
                ...state, 
                ffmpeg: action.payload,
              };
        case "SET_VOLUME":
            return {
                ...state, 
                volume: action.payload,
              };
        case "SET_VIDEO_LENGTH":
            return {
                ...state, 
                videoLength: action.payload,
              };
     
        case "ADD_VIDEO_SEGMENT":
            const videoSrcToAdd = action.payload;
            const updatedSegments = [
                ...state.videoSegments.slice(0, videoSrcToAdd.segmentIndex),
                videoSrcToAdd.videoURL, 
                ...state.videoSegments.slice(videoSrcToAdd.segmentIndex + 1),
            ];
            return {
                ...state,
                videoSegments: updatedSegments,
            };
        case "INITIALIZE_VIDEO_SEGMENTS":
            return {
                ...state,
                videoSegments: action.payload
            }
        case "SET_SEEKED_TIME":
            return{
                ...state,
                seekedTime: action.payload
            }
        case "UPDATE_CURRENT_SEGMENT":
            return {
             ...state,
             nextSegment: action.payload   
            }

        
    }






}