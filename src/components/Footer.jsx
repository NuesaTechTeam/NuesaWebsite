import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className="w-full px-4 pt-6  bg-white z-10 border-t-1 border-gray-200">
      <div>
        <Link to='/' className="flex gap-2 items-center mb-4">
          <img src={logo} alt='Nuesa Abuad' height={40} width={20} />
          <h1 className="font-semibold text-black">NUESA ABUAD</h1>
        </Link>
      </div>
        <p className="font-sm text-black">
          NUESA ABUAD is the Afe Babalola University Ado-Ekiti chapter for
          NUESA. NUESA ABUAD
      </p>
      <div className="border-t-1 border-green my-4"></div>
      <div className="mb-2">
        <p className="text-center">
          &copy; {new Date().getFullYear()} NUESA ABUAD 25/26. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer