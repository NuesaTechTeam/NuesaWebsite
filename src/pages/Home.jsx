import { EventsHome } from "../components/Events"
import { ExecHome } from "../components/Executives";
import { ContactHome } from "../components/ContactUs";

const Home = () => {
  return (
    <div>
      <EventsHome />
      <ExecHome />
      <ContactHome />
    </div>
  );
}
export default Home