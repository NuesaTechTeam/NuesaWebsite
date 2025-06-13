import Navbar  from './Navbar.jsx'
import Footer  from './Footer.jsx'

const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      <main className="container px-3 mt-18">
        {children}
      </main>
      <Footer />
    </div>
  )
}
export default Layout