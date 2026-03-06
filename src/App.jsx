import { Layout, ScrollToTop } from "./components";
import { About, Blog, Error, Events, Executives, Home, ContactUs, Projects, Academics, Dinner, Videos, HeartPage, Feedback, Complaints, Suggestions, Library } from "./pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/events' element={<Events />} />
        <Route path='/executives' element={<Executives />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/academics' element={<Academics />} />
        <Route path='/library' element={<Library />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/dinner' element={<Dinner />} />
        <Route path='/videos' element={<Videos />} />
        <Route path='/heart' element={<HeartPage />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/feedback/complaints' element={<Complaints />} />
        <Route path='/feedback/suggestions' element={<Suggestions />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Layout>
  );
}

export default App;
