import { EventsHome } from "../components/Events"
import { ContactHome } from "../components/ContactUs";
import { AboutHome } from "../components/About"
import { ProjectHome } from "../components/Projects";
import { AcademicsHome } from "../components/Academics";
import { BlogHome } from "../components/Blog";
import {CollegeEnvironment, Hero} from "../components/Home"
import Marquee from "../components/Marquee";
import useSEO from "../hooks/useSEO";

const marqueeItems = [
  "NUESA ABUAD",
  "Civil Engineering",
  "Mechatronics Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Computer Engineering",
  "Chemical Engineering",
  "Petroleum Engineering",
  "Biomedical Engineering",
  "Aeronautical Engineering",
];

const Home = () => {
  useSEO({
    title: "Home",
    description: "Welcome to NUESA ABUAD, the official student portal of the Nigerian Universities Engineering Students Association (NUESA) at Afe Babalola University chapter."
  });

  return (
    <div>
      <Hero />
      <Marquee
        items={marqueeItems}
        className='border-y border-green-100 bg-green-50/60 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-700 dark:border-gray-800 dark:bg-green-950/20 dark:text-green-400'
      />
      <AboutHome />
      <CollegeEnvironment />
      <EventsHome />
      <AcademicsHome />
      <BlogHome />
      <ProjectHome />
      <ContactHome />
    </div>
  );
}
export default Home