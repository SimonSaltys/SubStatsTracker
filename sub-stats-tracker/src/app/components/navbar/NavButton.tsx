import { button } from "motion/react-client"

interface NavButtonProps {
    label: string
    onClick: () => void
  }
  
  /**
   * 
   * @param props the label and what to do on button click
   * @returns a JSX component of a button for the MapNavbar
   */
  export function NavButton({ label, onClick }: NavButtonProps) {
    return (
      <button className="bg-SageSmoke text-white active:ring-4 active:ring-chanterelle-gold focus:ring-0 focus:ring-sea-glass" onClick={onClick}>
        {label}
      </button>
    )
  }