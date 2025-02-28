/**
 * sub-stats-tracker/src/app/components/ClientWrapper.tsx
 * 
 * Wraps all components (Video, Navbar, Subtitle, Config) into one component
 * 
 */
"use client"
import SubTitleWrapper from "@/app/components/subtitles/SubTitleWrapper"
import { createContext, useReducer } from "react"
import { SubtitleHolderInitalData, SubtitleContextData  } from "@/app/types/subtitleTypes"
import SubTitleStateReducer from "@/app/functions/reducers/subtitleReducer"
import NavBar from "@/app/components/navbar/NavBar"
import { ResizableBox } from "react-resizable"

export const SubtitleContext = createContext<SubtitleContextData | ''>('')

export default function ClientWrapper() {
    const [state, dispatch] = useReducer(SubTitleStateReducer, SubtitleHolderInitalData)

    return(
        <>
            <NavBar/>

            <SubtitleContext.Provider value={{state, dispatch}}>
                <div>
                    <SubTitleWrapper/>
                </div>
            </SubtitleContext.Provider>
        </>
       
    )
}