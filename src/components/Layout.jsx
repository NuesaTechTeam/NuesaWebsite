import Navbar  from './Navbar.jsx'
import Footer  from './Footer.jsx'
import { useLocation } from 'react-router-dom';

const Layout = ({children}) => {

  const location = useLocation();
  const isDinnerPage = location.pathname === "/dinner";
  const isHeartPage = location.pathname === "/heart"
  return (
    <div>
      <Navbar />
      <main className={`bg-white ${isDinnerPage ? "mt-15" : isHeartPage ? "mt-10" : "px-5 mt-17"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default Layout