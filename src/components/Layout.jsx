import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {

  const location = useLocation();
  const fullWidthPages = ["/dinner", "/faji-lawa", "/heart", "/academics"];
  const isFullWidthPage = fullWidthPages.includes(location.pathname);

  return (
    <div>
      <Navbar />
      <main className={`bg-white dark:bg-gray-950 ${location.pathname === "/dinner" || location.pathname === "/faji-lawa" ? "mt-15" : location.pathname === "/heart" ? "mt-10" : "mt-17"} ${!isFullWidthPage ? "px-5" : ""}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default Layout