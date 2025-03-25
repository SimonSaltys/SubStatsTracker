import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { Dispatch } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";

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


export async function handleConversion(
    ffmpeg: FFmpeg | null, 
    setVideoSrc: Dispatch<string>
) {
    try {
        if (!ffmpeg) {
            console.error('FFmpeg is not loaded');
            return;
        }

        const inputFileName = "soloLeveling24.mkv"
        const outputFileName = "output.mp4"

        const inputFile = await fetchFile('/soloLeveling24.mkv');
        await ffmpeg.writeFile(inputFileName, inputFile);

        console.log('Executing FFmpeg conversion...');

        /**
         * todo split the video into segments and only convert that amount so it does not take over a minute to convert the whole video.
         * todo (if a movie would be converted it would take over 10 minutes to convert)
         */
        await ffmpeg.exec([
          '-i', inputFileName,      // Input file
          // '-t', '180',           // Limit to first 60 seconds
          '-c:v', 'copy',           // Copy video stream without re-encoding
          '-c:a', 'aac',            // Re-encode audio to AAC (MP4-friendly)
          outputFileName            // Output file
        ]);
        const data : any = await ffmpeg.readFile(outputFileName);
        const blob = new Blob([data], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
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
    

      