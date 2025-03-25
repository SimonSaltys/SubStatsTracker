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
    const [isConverting, setIsConverting] = useState(false);

    useEffect(() => {
        loadffmpeg(setFfmpeg, setLoaded);
    }, []);

    const handleConvertClick = async () => {
        if (loaded && ffmpeg && !isConverting) {
            setIsConverting(true);
            try {
                await handleConversion(ffmpeg, setVideoSrc);
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