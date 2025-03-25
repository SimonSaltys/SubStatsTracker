// import { NextRequest, NextResponse } from "next/server";
// import ffmpeg from 'fluent-ffmpeg'
// import path from 'path';



// export async function POST(req: NextRequest) {
//     const inputPath = path.join(process.cwd(), "public/BlueBox24JP.mkv");
//     const outputPath = path.join(process.cwd(), "public/BlueBox24JP.mp4");
    
//     try {
//       await convertToMp4(inputPath, outputPath);
//       return NextResponse.json({ success: true });
//     } catch(error) {
//       console.error("Conversion error details:", error);
//       return NextResponse.json({ error: "Conversion Failed" }, { status: 500 });
//     }
//   }

//   function convertToMp4(inputPath: string, outputPath: string): Promise<void> {
//     return new Promise((resolve, reject) => {
//       ffmpeg(inputPath)
//         .outputOptions([
//           '-c:v libx264',
//           '-crf 23',
//           '-c:a aac',
//           '-b:a 192k'
//         ])
//         .save(outputPath)
//         .on('end', () => {
//           console.log('Conversion complete:', outputPath);
//           resolve();
//         })
//         .on('error', (err: any) => {
//           console.error('FFmpeg error:', err);
//           reject(err);
//         });
//     });
//   }