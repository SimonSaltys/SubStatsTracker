import { FFmpeg } from "@ffmpeg/ffmpeg"
import { VideoPlayerAction } from "../functions/reducers/videoReducer";


export interface VideoSource {
    videoURL : string,
    segmentIndex: number
}

export interface VideoPlayerState {
    ffmpeg : FFmpeg | null,
    videoSrc : VideoSource
    videoRef : HTMLVideoElement | null
    videoSegments : string[],
    volume : number,
    videoLength: number,
    playing : boolean
    loaded : boolean,
    isConverting: boolean,
}

export const VideoPlayerInitialData : VideoPlayerState = {
    ffmpeg : null,
    videoSrc : {videoURL : '', segmentIndex: 0},
    videoRef : null,
    videoSegments : [],
    volume : 1,
    videoLength: 0,
    playing: false,
    loaded : false,
    isConverting: false,
}

export interface VideoPlayerContextData {
    state : VideoPlayerState
    dispatch: React.Dispatch<VideoPlayerAction>
}