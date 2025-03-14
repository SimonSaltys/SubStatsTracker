/**
 * sub-stats-tracker/src/app/components/ClientWrapper.tsx
 * 
 * Wraps all components (Video, Navbar, Subtitle, Config) into one component
 * 
 */
"use client"
import SubTitleWrapper from "@/app/components/subtitles/SubTitleWrapper"
import { createContext, useReducer} from "react"
import { SubtitleHolderInitalData, SubtitleContextData  } from "@/app/types/subtitleTypes"
import SubTitleStateReducer from "@/app/functions/reducers/subtitleReducer"
import NavBar from "@/app/components/navbar/NavBar"
import { ThemeProvider } from "next-themes"
import { useMounted } from "@/app/functions/subtitleUtils"


export const SubtitleContext = createContext<SubtitleContextData | ''>('')

export default function ClientWrapper() {
    const [state, dispatch] = useReducer(SubTitleStateReducer, SubtitleHolderInitalData)
    const mounted = useMounted()

      if (!mounted) 
        return null
      
    return(
        <ThemeProvider attribute="class" defaultTheme="light">

            <NavBar/>
            <SubtitleContext.Provider value={{state, dispatch}}>
                <div id="subtitles">
                    <SubTitleWrapper/>
                </div>
            </SubtitleContext.Provider>
        </ThemeProvider>
       
    )
}