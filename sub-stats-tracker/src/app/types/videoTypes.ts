import { FFmpeg } from "@ffmpeg/ffmpeg"
import { VideoPlayerAction } from "../functions/reducers/videoReducer";


export interface VideoSource {
    videoURL : string,
    segmentIndex: number
}

export interface VideoPlayerState {
    ffmpeg : FFmpeg | null,
    videoSrc : VideoSource
    videoSegments : string[],
    volume : number,
    currentTime : number,
    videoLength: number,
    playing : boolean
    loaded : boolean,
    isConverting: boolean,
    seekedTime : number
}

export const VideoPlayerInitialData : VideoPlayerState = {
    ffmpeg : null,
    videoSrc : {videoURL : '', segmentIndex: 0},
    videoSegments : [],
    volume : 1,
    currentTime : 0,
    videoLength: 0,
    playing: false,
    loaded : false,
    isConverting: false,
    seekedTime: -1
}

export interface VideoPlayerContextData {
    state : VideoPlayerState
    dispatch: React.Dispatch<VideoPlayerAction>
}