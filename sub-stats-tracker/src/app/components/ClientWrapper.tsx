/**
 * sub-stats-tracker/src/app/components/ClientWrapper.tsx
 * 
 * Wraps all components (Video, Navbar, Subtitle, Config) into one component
 * 
 */
"use client"
import SubTitleWrapper from "@/app/components/subtitles/SubTitleWrapper"
import { createContext, useReducer} from "react"
import { SubtitleHolderInitalData, SubtitleContextData  } from "@/app/types/SubtitleTypes"
import SubTitleStateReducer from "@/app/functions/reducers/subtitleReducer"
import NavBar from "@/app/components/navbar/NavBar"
import { ThemeProvider } from "next-themes"
import { useMounted } from "@/app/functions/subtitleUtils"
import VideoPlayer from "@/app/components/video/VideoPlayer"
import { VideoPlayerContextData, VideoPlayerInitialData } from "../types/videoTypes"
import VideoPlayerStateReducer from "../functions/reducers/videoReducer"


export const SubtitleContext = createContext<SubtitleContextData | ''>('')
export const VideoPlayerContext = createContext<VideoPlayerContextData | ''>('')


export default function ClientWrapper() {
    const [state, dispatch] = useReducer(SubTitleStateReducer, SubtitleHolderInitalData)
    const [videoState, videoDispatch] = useReducer(VideoPlayerStateReducer, VideoPlayerInitialData )

    const mounted = useMounted()

      if (!mounted) 
        return null
      
    return(
    <ThemeProvider attribute="class" defaultTheme="light">
        <NavBar/>
        <div className="flex flex-row h-[calc(100vh-64px)]">
            <SubtitleContext.Provider value={{state, dispatch}}>
                <div className="flex-grow relative flex items-center justify-center border border-red-600">

                <VideoPlayerContext.Provider value={{ state: videoState, dispatch: videoDispatch }}>
                        <VideoPlayer/>
                </VideoPlayerContext.Provider>

                </div>
                <SubTitleWrapper/>
            </SubtitleContext.Provider>
        </div>
    </ThemeProvider>
       
    )
}