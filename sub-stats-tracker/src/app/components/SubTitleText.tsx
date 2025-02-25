/**
 * sub-stats-tracker\src\app\components\SubTitleText.tsx
 * 
 * Displays the current line of text that the media player 
 * has copied to the clipboard.
 * 
 * todo: 
 *    add a button to remove the line from displaying
 *    css styling (on hover effect)
 */


"use client";

export default function SubTitleText(props : {text : String}) {
    return(
        <>
            <div className="my-5 ml-5 text-[1.2rem] font-medium leading-7 shadow-md">
                <p id="subtitle-text">{props.text}</p>
            </div>
        </>
    )
}

