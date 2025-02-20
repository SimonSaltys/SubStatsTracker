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
            <div>
                <p>{props.text}</p>
            </div>
        </>
    )
}