"use client"

export function SmallButton({ label, onClick }: NavButtonProps) {

    return (
        <button className="flex border rounded-full border-gray-300 p-2"
                onClick={onClick}>
            {label}
        </button>


    )


}