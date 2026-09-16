import { Sling as HamburgerMain } from "hamburger-react"
import { useGlobalContext } from "../context"

const Hamburger = ({mobileMenu, setMobileMenu}) => {
  const { theme } = useGlobalContext();
  return (
   <div className="md:hidden ">
       <HamburgerMain toggled={mobileMenu} toggle={setMobileMenu} size={24} color={theme === "dark" ? "#ffffff" : "#000000"} />      
   </div>
  )
}
export default Hamburger