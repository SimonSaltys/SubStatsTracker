"use client"

import { useRef, useState, useEffect } from 'react'
import VideoConverter from './VideoConverter'
import NoSSRWrapper from '../utility/NoSSRWrapper'

export default function VideoPlayer() {
    const segmentLength = 300
    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoSegments, setVideoSegments] = useState<string[]>([])
    const [videoSrc, setVideoSrc] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1.0)


    useEffect(() => {
        // Set up event listeners when the component mounts
        const video = videoRef.current
        if (!video) return

        video.volume = 1.0
        video.muted = false
        
        const updateTime = () => setCurrentTime(video.currentTime)
        const updateDuration = () => setDuration(video.duration)
        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)

        video.addEventListener('timeupdate', updateTime)
        video.addEventListener('loadedmetadata', updateDuration)
        video.addEventListener('play', handlePlay)
        video.addEventListener('pause', handlePause)

        const durationInMinutes = duration / 60
        const segmentLengthInMinutes = segmentLength / 60

        setVideoSegments(Array(durationInMinutes/segmentLengthInMinutes))
        return () => {
            video.removeEventListener('timeupdate', updateTime)
            video.removeEventListener('loadedmetadata', updateDuration)
            video.removeEventListener('play', handlePlay)
            video.removeEventListener('pause', handlePause)
        }
    })

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
        setVolume(newVolume)
        if (videoRef.current) {
            videoRef.current.volume = newVolume
        }
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTime = parseFloat(e.target.value)
        setCurrentTime(seekTime)
        if (videoRef.current) {
            videoRef.current.currentTime = seekTime
        }
    }

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <>
        <VideoConverter setVideoSrc={setVideoSrc} 
                        currentTime={videoRef.current ? videoRef.current.currentTime : 0}
                        videoLength={duration}
                        videoSegments={videoSegments}
                        setVideoSegments={setVideoSegments}
                        />
        {
            videoSrc === '' ? <div></div> :  <div className="relative w-4/5 h-4/5 flex flex-col justify-center items-center text-xl border border-red-600">
            <div className="relative w-full h-full flex justify-center items-center">
                <video 
                    ref={videoRef}
                    src={videoSrc}
                    className="max-w-full max-h-full"
                    onClick={togglePlayPause}
                    controls={false}
                    muted={false}
                >
                </video>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={togglePlayPause}
                        className="px-2 py-1 bg-blue-500 rounded"
                    >
                        {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    
                    <span className="text-sm">{formatTime(currentTime)}</span>
                    
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="flex-grow h-2"
                    />
                    
                    <span className="text-sm">{formatTime(duration)}</span>
                    
                    <div className="flex items-center space-x-1">
                        <span className="text-sm">🔊</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
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