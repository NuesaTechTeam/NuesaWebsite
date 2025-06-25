import { Event, Gallery, News } from "../components/Events"

const Events = () => {
  return (
    <div className="min-h-screen">
      <Event />
      <News />
      <Gallery />
    </div>
  );
}
export default Events