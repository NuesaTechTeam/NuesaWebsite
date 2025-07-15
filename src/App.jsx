import { Layout } from "./components";
import { About, Blog, Error, Events, Executives, Home, ContactUs, Projects, Academics } from "./pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/events' element={<Events />} />
        <Route path='/executives' element={<Executives />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/academics' element={<Academics />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Layout>
  );
}

export default App;
