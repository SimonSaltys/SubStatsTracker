"use client"
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { handleConversion, loadffmpeg } from '@/app/functions/videoUtils';

export interface VideoConverterProps {
    setVideoSrc: (src: string) => void,
    setVideoSegments : Dispatch<SetStateAction<string[]>>,
    videoSegments : string[],
    segmentLength : number,
    currentTime : number,
    videoLength : number
}

export default function VideoConverter(props : VideoConverterProps) {
    const {currentTime, videoLength, videoSegments, setVideoSegments, setVideoSrc} = props
    const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [isConverting, setIsConverting] = useState(false);

    useEffect(() => {
        loadffmpeg(setFfmpeg, setLoaded);
    }, []);

    const handleConvertClick = async () => {
        if (loaded && ffmpeg && !isConverting) {
            setIsConverting(true);
            try {

                const currentMinute = currentTime / 60






                for(let i = 0; i < videoSegments.length; i++) {
                  if(videoSegments[i] === null) {
                    const nextSegment = await handleConversion(ffmpeg,props)
                    setVideoSegments(
                        [
                            ...videoSegments.slice(0,i),
                            nextSegment,
                            ...videoSegments.slice(i)
                        ]
                    )
                  }
        
        
        
                }
            } catch (error) {
                console.error('Conversion failed', error);
            } finally {
                setIsConverting(false);
            }
        }
    };

    return (
        <button 
            onClick={handleConvertClick} 
            disabled={!loaded || isConverting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
            {isConverting ? 'Converting...' : 'Convert Video'}
        </button>
    );
}