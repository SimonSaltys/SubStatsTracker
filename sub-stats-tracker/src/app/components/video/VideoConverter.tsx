"use client"
import {useEffect, useContext} from 'react';
import { handleConversion, loadffmpeg } from '@/app/functions/videoUtils';
import { VideoPlayerContextData, VideoSource } from '@/app/types/videoTypes';
import { VideoPlayerContext } from '../ClientWrapper';


export default function VideoConverter() {
        const context = useContext(VideoPlayerContext) as VideoPlayerContextData
        const state = context.state;
        const dispatch = context.dispatch;

    useEffect(() => {
        loadffmpeg(dispatch);
    }, []);

    const handleConvertClick = async () => {
        if (state.loaded && state.ffmpeg !== null && !state.isConverting) {
            dispatch({
                type: "SET_IS_CONVERTING",
                payload: true
            })

            try {

                if(state.videoSegments.length === 0) 
                    await handleConversion(state, dispatch)
            } catch (error) {
                console.error('Conversion failed', error);
            } finally {
               dispatch({
                type: "SET_IS_CONVERTING",
                payload: false
            })
            }
        }
    };

    return (
        <button 
            onClick={handleConvertClick} 
            disabled={!state.loaded || state.isConverting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
            {state.isConverting ? 'Converting...' : 'Convert Video'}
        </button>
    );
}