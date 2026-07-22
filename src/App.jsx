import { lazy, Suspense } from "react";
import { Layout, ScrollToTop } from "./components";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Executives = lazy(() => import("./pages/Executives"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const Academics = lazy(() => import("./pages/Academics"));
const Library = lazy(() => import("./pages/Library"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Dinner = lazy(() => import("./pages/Dinner"));
const Videos = lazy(() => import("./pages/Videos"));
const HeartPage = lazy(() => import("./pages/Heart"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Complaints = lazy(() => import("./pages/Complaints"));
const Suggestions = lazy(() => import("./pages/Suggestions"));
const ErrorPage = lazy(() => import("./pages/Error"));

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green"></div>
  </div>
);

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
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
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
