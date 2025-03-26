import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { Dispatch } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { VideoConverterProps } from "../components/video/VideoConverter";

export const segmentLength = 300;

export async function loadffmpeg(setFfmpeg : Dispatch<any>, setLoaded : Dispatch<boolean>) {
    try{
        console.log("Attempting Load")
        const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd';
        
        const ffmpegInstance = new FFmpeg();
     
        // Load without using import.meta.url
        await ffmpegInstance.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });
    
        setFfmpeg(ffmpegInstance)
        setLoaded(true)
      }  catch (error) {
        console.error("Failed to load FFmpeg:", error);
      }
}

function findSegmentIndex(currentTime : number, videoSegments : string[]) {
      const index = Math.floor(currentTime/segmentLength);
      return index < videoSegments.length ? index : videoSegments.length;
}


export async function handleConversion(
    ffmpeg: FFmpeg | null, 
    props : VideoConverterProps
) {
  const {currentTime, videoLength, videoSegments, setVideoSegments, setVideoSrc} = props

    try {
      console.log("asdasd")

        if (!ffmpeg) {
            console.error('FFmpeg is not loaded')
            return
        }

        if(currentTime > videoLength) {
          console.error('Cannot load a segment over the video length')
          return
        }

        const videoSegmentIndex = findSegmentIndex(currentTime, videoSegments)
        const videoSegmentURL = videoSegments[videoSegmentIndex]

        //if the segment exists don't re convert it
        if(videoSegmentURL !== undefined)
          return

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
        const data : any = await ffmpeg.readFile(outputFileName);
        const blob = new Blob([data], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        videoSegments[videoSegmentIndex] = url
        setVideoSrc(url)
    } catch (error) {
        console.error('Detailed Conversion Error:', error);
        
        // More detailed error logging
        if (error instanceof Error) {
            console.error('Error Name:', error.name);
            console.error('Error Message:', error.message);
            console.error('Error Stack:', error.stack);
        }

        // Additional debug information
        console.log('Checking FFmpeg instance...');
        console.log('FFmpeg methods:', Object.keys(ffmpeg || {}));
    }
}
    

      