import { Event, Gallery, News } from "../components/Events";
import useSEO from "../hooks/useSEO";

const Events = () => {
  useSEO({
    title: "Events & Gallery",
    description: "Check out upcoming NUESA chapter events, webinars, orientations, read the latest news, and browse the photo gallery."
  });

  return (
    <div className='min-h-screen'>
      <Event />
      <News />
      <Gallery />
    </div>
  );
};
export default Events;
