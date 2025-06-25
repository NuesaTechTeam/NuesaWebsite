import Navbar  from './Navbar.jsx'
import Footer  from './Footer.jsx'

const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      <main className=" px-5 mt-15 bg-white">
        {children}
      </main>
      <Footer />
    </div>
  )
}
export default Layout