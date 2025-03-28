import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { Dispatch } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { VideoPlayerAction } from "./reducers/videoReducer";
import { VideoPlayerState } from "../types/videoTypes";

export const segmentLength = 300;

export async function loadffmpeg(dispatch : Dispatch<VideoPlayerAction>) {
    try{
        console.log("Attempting Load")
        const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd';
        
        const ffmpegInstance = new FFmpeg();
     
        await ffmpegInstance.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });
        
        dispatch({
          type:"SET_FFMPEG",
          payload: ffmpegInstance
        })
        dispatch({
          type: "SET_LOADED",
          payload: true
        })

      }  catch (error) {
        console.error("Failed to load FFmpeg:", error);
      }
}

export async function handleConversion(state : VideoPlayerState, dispatch : Dispatch<VideoPlayerAction>, seekedTime : number) {
  const {videoRef, videoSegments,videoLength, ffmpeg} = state

    try {
        const video = videoRef

        if (!ffmpeg) {
            console.error('FFmpeg is not loaded')
            return
        }

        if(seekedTime > videoLength) {
          console.error('Cannot load a segment over the video length')
          return
        }

        let videoTime = 0

        if(video) {
          videoTime = video.currentTime

          if(seekedTime !== -1){
            videoTime = seekedTime
            dispatch({
              type:"SET_SEEKED_TIME",
              payload:-1
            })
          }
        }
       

        const videoSegmentIndex = findSegmentIndex(videoTime, videoSegments)
        const videoSegmentURL = videoSegments[videoSegmentIndex]

        console.log("Checking Segment", videoSegmentIndex)


        if(videoSegmentURL) {
          console.log("In this bucket the url is", videoSegmentURL)

          if(state.videoSrc.videoURL === videoSegmentURL) {
              dispatch({
                type: "SET_SEEKED_TIME",
                payload: seekedTime
            })
            console.log("Setting seeked time", seekedTime)
          } else {
            dispatch({
              type:"SET_SOURCE",
              payload: {videoURL: videoSegmentURL, segmentIndex: videoSegmentIndex}
            })
          }
          return
        }
        const inputFileName = "S01E03.mkv"
        const outputFileName = "output" + videoSegmentIndex + ".mp4"

        //Getting the video length if it has not been set yet
        if (videoLength === 0) {
          const fullDuration = await getVideoDuration(ffmpeg, inputFileName)
          console.log('Full Video Duration:', fullDuration);

          dispatch({
            type:"SET_VIDEO_LENGTH",
            payload: fullDuration
          })
      }

        //Starting the conversion
        const inputFile = await fetchFile('/BlueBox24JP.mkv');
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

        dispatch({
          type:"SET_SOURCE",
          payload: {videoURL : url, segmentIndex : videoSegmentIndex}
        })

      } catch (error) {
        console.error('Detailed Conversion Error:', error);
    }
}

//private functions below

function loadSegment(state ) {

}


function findSegmentIndex(currentTime : number, videoSegments : string[]) {
  const index = Math.floor(currentTime/segmentLength);
  return index < videoSegments.length ? index : videoSegments.length;
}

async function getVideoDuration(ffmpeg : FFmpeg, inputFileName : string): Promise<number> {
  try{
        const inputFile = await fetchFile('/BlueBox24JP.mkv');
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

        return isNaN(duration) ? 0 : duration;

      } catch (error) {
        console.error('Error getting video duration:', error);
        return 0;
    }
}
    

      