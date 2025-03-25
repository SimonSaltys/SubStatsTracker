"use client"
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { useEffect, useState } from 'react';
import { handleConversion, loadffmpeg } from '@/app/functions/videoUtils';


interface VideoConverterProps {
    setVideoSrc: (src: string) => void;
}

export default function VideoConverter({ setVideoSrc }: VideoConverterProps) {
  const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
  const [loaded, setLoaded] = useState(false);

      useEffect(() => {
        loadffmpeg(setFfmpeg,setLoaded)
      },[])

      useEffect(() => {
        if (loaded && ffmpeg) {
            handleConversion(ffmpeg, setVideoSrc);
        }
    }, [loaded, ffmpeg, setVideoSrc]);

           
          return (
            <>
            </>
          )
}