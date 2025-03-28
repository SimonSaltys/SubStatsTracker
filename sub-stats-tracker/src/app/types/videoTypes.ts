import { FFmpeg } from "@ffmpeg/ffmpeg"
import { VideoPlayerAction } from "../functions/reducers/videoReducer";


export interface VideoSource {
    videoURL : string,
    segmentIndex: number
}

export interface VideoPlayerState {
    ffmpeg : FFmpeg | null,
    videoSegments : string[],
    volume : number,
    videoLength: number,
    playing : boolean,
    loaded : boolean,
    isConverting: boolean,
    seekedTime : number,
    nextSegment : VideoSource
}

export const VideoPlayerInitialData : VideoPlayerState = {
    ffmpeg : null,
    videoSegments : [],
    volume : 1,
    videoLength: 0,
    playing: false,
    loaded : false,
    isConverting: false,
    seekedTime: 0,
    nextSegment: {videoURL : '', segmentIndex: 0}
}

export interface VideoPlayerContextData {
    state : VideoPlayerState
    dispatch: React.Dispatch<VideoPlayerAction>
}