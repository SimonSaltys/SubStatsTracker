"use client"

import { useRef, useEffect, useContext} from 'react'
import VideoConverter from './VideoConverter'
import { findSegmentIndex, handleConversion, segmentLength } from '@/app/functions/videoUtils'
import { VideoPlayerContextData} from '@/app/types/videoTypes'
import { VideoPlayerContext } from '../ClientWrapper'


export default function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const context = useContext(VideoPlayerContext) as VideoPlayerContextData
    const state = context.state;
    const dispatch = context.dispatch;

    useEffect(() => {
        // Set up event listeners when the component mounts
        const video = videoRef.current
        if (!video) return
        video.volume = 1.0
        video.muted = false
    },[videoRef.current])

    useEffect(() => {
            dispatch({
                type:"INITIALIZE_VIDEO_SEGMENTS",
                payload: new Array(Math.floor(state.videoLength / segmentLength)).fill(null)
            })
    }, [state.videoLength]);

    const togglePlayPause = () => {
        const video = videoRef.current
        if (!video) return

        if (video.paused) {
            video.play()
        } else {
            video.pause()
        }
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)

        dispatch({
            type:"SET_VOLUME",
            payload: newVolume
        })

        if (videoRef.current) {
            videoRef.current.volume = newVolume
        }
    }

    useEffect(() => {
        if(!state.ffmpeg)
            return

        console.log("changing")
        console.log("Setting time", state.seekedTime)

    //todo some wierd stuff going on here
    //     async function onSeek() {
    //         //If the seek time is greater than the segment lets run the convert
    //            console.log("Handeling conversion")
    //            await handleConversion(state, dispatch)
    //    }

    //    if(state.seekedTime > (state.videoSrc.segmentIndex + 1) * segmentLength ||
    //       state.seekedTime > (state.videoSrc.segmentIndex - 1) * segmentLength) {
    //        onSeek()
    //    }
    },[state.seekedTime])

    async function handleSeek (e: React.ChangeEvent<HTMLInputElement>) {
        const seekTime = parseFloat(e.target.value)
        dispatch({
            type: "SET_SEEKED_TIME",
            payload: seekTime
        })
    }

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <>
        <VideoConverter/>
        {
            state.videoSrc.videoURL === '' ? <div></div> :  <div className="relative w-4/5 h-4/5 flex flex-col justify-center items-center text-xl border border-red-600">
            <div className="relative w-full h-full flex justify-center items-center">
                <video 
                    ref={videoRef}
                    src={state.videoSrc.videoURL}
                    className="max-w-full max-h-full"
                    onClick={togglePlayPause}
                    controls={false}
                    muted={false}
                    onPause={() => dispatch({
                        type:"SET_IS_PLAYING",
                        payload: false
                    })}
                    onPlay={() => dispatch({
                        type:"SET_IS_PLAYING",
                        payload: true
                    })}
                    onTimeUpdate={() => dispatch({
                        type:"SET_CURRENT_TIME",
                        payload: videoRef.current ? videoRef.current.currentTime : 0
                    })}
                >
                </video>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={togglePlayPause}
                        className="px-2 py-1 bg-blue-500 rounded"
                    >
                        {state.playing ? '⏸️' : '▶️'}
                    </button>
                    
                    <span className="text-sm">{formatTime(state.currentTime + (state.videoSrc.segmentIndex * segmentLength))}</span>
                    
                    <input
                        type="range"
                        min="0"
                        max={state.videoLength || 0}
                        value={state.currentTime + (state.videoSrc.segmentIndex * segmentLength)}
                        onChange={handleSeek}
                        className="flex-grow h-2"
                    />
                    
                    <span className="text-sm">{formatTime(state.videoLength)}</span>
                    
                    <div className="flex items-center space-x-1">
                        <span className="text-sm">🔊</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={state.volume}
                            onChange={handleVolumeChange}
                            className="w-20 h-2"
                        />
                    </div>
                </div>
            </div>
        </div>
        }
       
    </>
    )
}