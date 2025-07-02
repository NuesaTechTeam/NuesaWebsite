import { Layout } from "./components"
import { About, Blog, Error, Events, Executives, Home, ContactUs, Projects } from "./pages"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  

  return (
    <Router>
    <Layout>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/events' element={<Events />} />
        <Route path='/executives' element={<Executives />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Layout>
  </Router>
  )
}

export default App
