import { EventsHome } from "../components/Events"
import { ExecHome } from "../components/Executives";
import { ContactHome } from "../components/ContactUs";
import { AboutHome } from "../components/About"
import { ProjectHome } from "../components/Projects";
import {CollegeEnvironment, Hero} from "../components/Home"

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutHome />
      <CollegeEnvironment />
      <EventsHome />
      <ProjectHome />
      <ExecHome />
      <ContactHome />
    </div>
  );
}
export default Home