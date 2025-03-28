import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { Dispatch } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { VideoPlayerAction } from "./reducers/videoReducer";
import { VideoPlayerState } from "../types/videoTypes";

export const segmentLength = 300;

export async function loadffmpeg() : Promise<FFmpeg | null> {
    try{
        console.log("Attempting Load")
        const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd';
        
        const ffmpegInstance = new FFmpeg();
     
        await ffmpegInstance.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });
        
        return ffmpegInstance

      }  catch (error) {
        console.error("Failed to load FFmpeg:", error);
        return null
      }
}


//private functions below
export async function loadSegment(
  state : VideoPlayerState, 
  dispatch : Dispatch<VideoPlayerAction>, 
  videoSegmentIndex: number ) {
    try {

      let ffmpeg = state.ffmpeg
      if(!ffmpeg) {
         ffmpeg = await loadffmpeg()
      }

      if(!ffmpeg)
        return

      dispatch({
        type:"SET_FFMPEG",
        payload: ffmpeg
      })

      if(state.videoLength === 0) {
        const videoDuration = await getVideoDuration(dispatch,ffmpeg,"S01E03.mkv")
        console.log("Set duration to ",videoDuration)

        dispatch({
          type: "SET_VIDEO_LENGTH",
          payload: videoDuration
        })
      }
     
      const inputFileName = "S01E03.mkv"
      const outputFileName = "output" + videoSegmentIndex + ".mp4"
      const inputFile = await fetchFile('/S01E03.mkv');
      await ffmpeg.writeFile(inputFileName, inputFile);
  
      console.log('Executing FFmpeg conversion...');
      await ffmpeg.exec([
        '-i', inputFileName,                              // Input file
        '-ss', `${videoSegmentIndex*segmentLength}`,      // Start of the segment
        '-to',  `${(videoSegmentIndex + 1) * segmentLength - 1}`, // End of the segment
        '-c:v', 'copy',                                   // Copy video stream without re-encoding
        '-c:a', 'aac',                                    // Re-encode audio to AAC (MP4-friendly)
        outputFileName                                    // Output file
      ]);
      console.log("Done")
  
      //Creating the url to play
      const data : any = await ffmpeg.readFile(outputFileName);
      const blob = new Blob([data], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      dispatch({
        type: "ADD_VIDEO_SEGMENT",
        payload: {videoURL : url, segmentIndex : videoSegmentIndex}
      })
    } catch (error) {
      console.error('Detailed Conversion Error:', error);
  }
   
}


export function findSegmentIndex(currentTime : number, videoSegments : string[]) {
  const index = Math.floor(currentTime/segmentLength);
  return index < videoSegments.length ? index : videoSegments.length;
}

export async function getVideoDuration(dispatch : Dispatch<VideoPlayerAction>, ffmpeg : FFmpeg, inputFileName : string) : Promise<number> {
  try{
        const inputFile = await fetchFile('/S01E03.mkv');
        await ffmpeg.writeFile(inputFileName, inputFile);
        await ffmpeg.ffprobe([
          "-v", "error", //print only errors
          "-show_entries", "format=duration", //get only the duration
          "-of", "default=noprint_wrappers=1:nokey=1", //only return the key
          inputFileName, 
          "-o", "duration.txt" 
      ]);

        const data: any = await ffmpeg.readFile("duration.txt");
        const durationString = new TextDecoder().decode(data).trim();
        
        const duration = parseFloat(durationString);
        console.log("Got video duration of",duration)
      
        return isNaN(duration) ? 0 : duration
      } catch (error) {
        console.error('Error getting video duration:', error);
        return 0
    }
}
    

      