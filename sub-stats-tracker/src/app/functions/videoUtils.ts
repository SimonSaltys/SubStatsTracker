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

export async function handleConversion(ffmpeg : FFmpeg | null, setVideoSrc : Dispatch<string>) {
    try {
          if (!ffmpeg) {
            console.error('FFmpeg is not loaded');
            return;
        }

        const inputFileName = "BlueBox24JP.mkv"
        const outputFileName = "output.mkv"

        const inputFile = await fetchFile('/BlueBox24JP.mkv');

        console.log('Writing input file...');

        await ffmpeg.writeFile(inputFileName, inputFile);

        const result = await ffmpeg.exec([
          '-i', inputFileName,      // Input file
          '-c:v', 'libx264',        // Video codec
          '-preset', 'medium',      // Encoding preset
          '-crf', '23',             // Constant Rate Factor
          '-c:a', 'aac',            // Audio codec
          '-b:a', '192k',           // Audio bitrate
          outputFileName            // Output file
      ]);

        console.log('FFmpeg exec result:', result);

        console.log('Reading output file...');
        // Read the converted file
        const data = await ffmpeg.readFile(outputFileName);

        console.log('Creating blob...');
        // Create a blob and object URL
        const blob = new Blob([data], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);

        console.log('Setting video source...');
        // Set the video source
        setVideoSrc(url);
    } catch(error) {
      console.error('Detailed Conversion Error:', error);
        
      // More detailed error logging
      if (error instanceof Error) {
          console.error('Error Name:', error.name);
          console.error('Error Message:', error.message);
          console.error('Error Stack:', error.stack);
      }
    }
  
}
    

      