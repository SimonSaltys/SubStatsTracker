
  /**
   * 
   * @param props the label and what to do on button click
   * @returns a JSX component of a button for the MapNavbar
   */
  export function BigButton({ label, onClick }: NavButtonProps) {
    return (
      <button className="bg-purple-600 text-white rounded-full px-5 py-2 text-center"
              onClick={onClick}>
        {label}
      </button>
    )
  }