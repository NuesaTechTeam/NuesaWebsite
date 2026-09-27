import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {

  const location = useLocation();

  return (
    <div>
      <ScrollProgress />
      <Navbar />
      <main className={`bg-white dark:bg-gray-950 ${location.pathname === "/faji-lawa" ? "mt-15" : location.pathname === "/apwen" ? "mt-10" : "mt-17"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default Layout