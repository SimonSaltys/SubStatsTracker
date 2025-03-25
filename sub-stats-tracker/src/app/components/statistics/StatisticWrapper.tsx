/**
 * sub-stats-tracker/src/app/components/statistics/StatisticWrapper.tsx
 * 
 * Wraps the 
 * 
 */
"use client"

import { useContext, useEffect, useState } from "react"
import { SubtitleContext } from "../ClientWrapper"
import { SubtitleContextData, Time } from "@/app/types/subtitleTypes"


export default function StatisticWrapper() {
    const context = useContext(SubtitleContext) as SubtitleContextData
    const state = context.state 

    const inactivityThreshold = 10000
    const [session, setSession] = useState<Time>({startTime: 0, currentTime: 0})

    const [lastSubtitleTime, setLastSubtitleTime] = useState<number>(Date.now())
    const [pauseTime, setPauseTime] = useState<Time>({startTime: 0, currentTime: 0})
    const [paused, setPaused] = useState<boolean>(false)

    //todo fix the pausing caclulation, gets stuck when in pause state
    useEffect(()=> {
        const now = Date.now()

        if(state.subtitles.length > 0 && session.startTime === 0) {
            setSession((prevSession) => ({
                ...prevSession,
                startTime: now
            }))
            console.log("Initalizing")

        }

        if(now - lastSubtitleTime > inactivityThreshold) {
            if(!paused) {
                setPaused(true)
                setPauseTime((prevPause) => ({
                    ...prevPause,
                    startTime: now
                }))

                setLastSubtitleTime(now)
                console.log("Pausing")
            }
        } else if(paused) {
            const pauseDuration = now - pauseTime.startTime;
            setPaused(false)
            setPauseTime((prevPause) => ({
                ...prevPause,
                currentTime: pauseDuration
            }))
            console.log("Unpausing")
        }
        
        if(!paused && session.startTime !== 0) {
            const timeElapsed = now - session.startTime - pauseTime.currentTime
        

            console.log("Updating Time (adding) " 
                + timeElapsed / 1000 + " to " 
                + session.currentTime / 1000 )


            setSession((prevSession) => ({
                ...prevSession,
                currentTime: timeElapsed  
            }))
        }

        console.log("Subtitle Added")

    },[state.subtitles,session.startTime])

    const secondsWatched = session.currentTime / 1000

    return (
        <div className="flex justify-center items-center w-full text-2xl">
            <p>{paused ? "PAUSED waiting at " : "Time Elapsed"} {secondsWatched.toFixed(2)}</p>
        </div>
    )
}