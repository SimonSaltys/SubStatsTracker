"use client"

import { useRef, useEffect, useContext, useState} from 'react'
import VideoConverter from './VideoConverter'
import { findSegmentIndex, loadSegment, segmentLength } from '@/app/functions/videoUtils'
import { VideoPlayerContextData, VideoSource} from '@/app/types/videoTypes'
import { VideoPlayerContext } from '../ClientWrapper'


export default function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [videoSrc, setVideoSrc] = useState<VideoSource>({videoURL : '', segmentIndex: 0})
    const context = useContext(VideoPlayerContext) as VideoPlayerContextData
    const state = context.state;
    const dispatch = context.dispatch;

 
    useEffect(() => {
        async function handleConversion() {           
            console.log("Current Segments", state.videoSegments) 
            if(state.videoSegments[0] && !state.loaded) {
                setVideoSrc({videoURL: state.videoSegments[0], segmentIndex: 0})
                setCurrentTime(() => 0)
                dispatch({
                    type:"SET_LOADED",
                    payload: true
                })
                console.log("Initializing") 
                return
            }
        }

        handleConversion()
   },[state.videoSegments, state.loaded])

   useEffect(() => {
       // Calculate the seek offset within the current segment
       const handleSeekSafely = async () => { 
            const currentSegmentIndex = findSegmentIndex(state.seekedTime, state.videoSegments)
            const seekOffset = state.seekedTime - (currentSegmentIndex * segmentLength)
    
            if(currentSegmentIndex != videoSrc.segmentIndex) {
                if(!state.videoSegments[currentSegmentIndex]) 
                    await loadSegment(state, dispatch, currentSegmentIndex)

                // Update video source after potential segment loading
                setVideoSrc(prev => ({
                    videoURL: state.videoSegments[currentSegmentIndex] || prev.videoURL, 
                    segmentIndex: currentSegmentIndex
                }))
                return 
            }

            // Safely set current time
            if (videoRef.current) {
                try {
                        videoRef.current!.currentTime = seekOffset
                        videoRef.current!.play()
                } catch (error) {
                    console.error("Seek error:", error)
                }
            }
       }

       handleSeekSafely()
   },[state.seekedTime, state.videoSegments, videoSrc.segmentIndex])

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
            videoSrc.videoURL === '' ? <div></div> :  <div className="relative w-4/5 h-4/5 flex flex-col justify-center items-center text-xl border border-red-600">
            <div className="relative w-full h-full flex justify-center items-center">
                <video 
                    ref={videoRef}
                    src={videoSrc.videoURL}
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
                    onTimeUpdate={() => setCurrentTime(videoRef.current ? videoRef.current.currentTime : 0)}
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
                    
                    <span className="text-sm">{formatTime((videoRef.current ? videoRef.current.currentTime : 0) + (videoSrc.segmentIndex * segmentLength))}</span>
                    
                    <input
                        type="range"
                        min="0"
                        max={state.videoLength || 0}
                        value={(videoRef.current ? videoRef.current.currentTime : 0) + (videoSrc.segmentIndex * segmentLength)}
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