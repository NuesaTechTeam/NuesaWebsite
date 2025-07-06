import { EventsHome } from "../components/Events"
import { ExecHome } from "../components/Executives";
import { ContactHome } from "../components/ContactUs";
import { AboutHome } from "../components/About"
import { ProjectHome } from "../components/Projects";
import { AcademicsHome } from "../components/Academics";
import { BlogHome } from "../components/Blog";
import {CollegeEnvironment, Hero} from "../components/Home"

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutHome />
      <CollegeEnvironment />
      <EventsHome />
      <AcademicsHome />
      <BlogHome />
      <ProjectHome />
      <ExecHome />
      <ContactHome />
    </div>
  );
}
export default Home