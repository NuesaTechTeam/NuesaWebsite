import { useEffect, useRef, useState } from "react";
import EventCard from "./EventCard";
import { eventsData } from "../../lib/constants";
import { Calendar, Clock, Filter } from "lucide-react";

const Event = () => {
  const [visibleEvents, setVisibleEvents] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const timelineRef = useRef(null);
  const eventRefs = useRef([]);

  // filter events based on status only
  const filteredEvents = eventsData
    .filter((event) => event.status === activeFilter)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return activeFilter === "upcoming" ? dateA - dateB : dateB - dateA;
    });

  useEffect(() => {
    setVisibleEvents(new Set());
    eventRefs.current = [];
  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = parseInt(entry.target.dataset.eventId);
            setVisibleEvents((prev) => new Set([...prev, eventId]));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px",
      }
    );

    eventRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [filteredEvents]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return {
          month: "COMING",
          day: "SOON",
          year: "",
        };
      }
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: date.getDate(),
      year: date.getFullYear(),
    };
  };

  const getEventStats = () => {
    const upcoming = eventsData.filter((e) => e.status === "upcoming").length;
    const past = eventsData.filter((e) => e.status === "past").length;
    return { upcoming, past };
  };

  const stats = getEventStats();

  return (
    <section className='bg-white px-4 py-24 sm:px-6 lg:px-8'>
      <div className='container mx-auto'>
        {/* header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 text-gray-950'>
            College Events and News
          </h1>
          <p className='text-xl text-green-900/80 max-w-2xl mx-auto'>
            Discover our exciting events that shape the future of engineering
            and our college
          </p>
        </div>
        {/* filters */}
        <div className='max-w-4xl mx-auto mb-16'>
          <div className='flex justify-center'>
            <div className='bg-gray-50 rounded-lg p-1.5 border border-gray-200'>
              <div className='flex space-x-1'>
                <button
                  className={`px-4 py-3 rounded-md font-semibold transition-colors duration-200 flex items-center space-x-2 ${
                    activeFilter === "upcoming"
                      ? "bg-green text-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-green-400/20 cursor-pointer"
                  }`}
                  onClick={() => setActiveFilter("upcoming")}
                >
                  <Calendar className='size-6' />
                  <span>Upcoming ({stats.upcoming})</span>
                </button>
                <button
                  className={`px-4 py-3 rounded-md font-semibold transition-colors duration-200 flex items-center space-x-1 ${
                    activeFilter === "past"
                      ? "bg-gray-800 text-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-300/20 cursor-pointer"
                  }`}
                  onClick={() => setActiveFilter("past")}
                >
                  <Clock className='size-6' />
                  <span>Past</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* timeline */}
        {filteredEvents.length > 0 ? (
          <div className='relative max-w-6xl mx-auto' ref={timelineRef}>
            {/* timeline line */}
            <div
              className={`absolute left-2 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-0.5 opacity-30 ${
                activeFilter === "upcoming"
                  ? "bg-green"
                  : "bg-gradient-to-b from-gray-500 via-gray-600 to-gray-500"
              }`}
            ></div>
            {filteredEvents.map((event, index) => {
              const isVisible = visibleEvents.has(event.id);
              const isEven = index % 2 === 0;
              const dateInfo = formatDate(event.date);
              const isPast = event.status === "past";

              return (
                <div
                  key={event.id}
                  ref={(el) => (eventRefs.current[index] = el)}
                  data-event-id={event.id}
                  className={`relative flex items-center mb-20 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`absolute left-0 md:left-1/2 w-6 h-6 rounded-full border-4 border-white transform md:-translate-x-3 z-10 transition duration-700 ${
                      isVisible
                        ? isPast
                          ? "bg-gray-500 scale-100"
                          : "bg-green scale-100"
                        : "bg-gray-600 scale-75"
                    }`}
                  >
                  </div>
                  <div
                    className={`absolute left-2 -translate-x-1/2 translate-y-11  md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-12 ${
                      isPast ? "bg-gray-100" : "bg-white"
                    } rounded-lg p-3 border border-gray-100 transition duration-200 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className='text-center'>
                      <div
                        className={`text-xs font-bold ${
                          isPast ? "text-gray-600" : "text-gray-800"
                        }`}
                      >
                        {dateInfo.month}
                      </div>
                      <div
                        className={`text-xl font-bold ${
                          isPast ? "text-gray-700" : "text-gray-900"
                        }`}
                      >
                        {dateInfo.day}
                      </div>
                      <div
                        className={`text-xs font-medium ${
                          isPast ? "text-gray-500" : "text-gray-600"
                        }`}
                      >
                        {dateInfo.year}
                      </div>
                    </div>
                  </div>

                  {/* event card */}
                  <EventCard
                    event={event}
                    isEven={isEven}
                    isPast={isPast}
                    isVisible={isVisible}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className='text-center py-20'>
            <div className='rounded-lg border border-green-200 bg-green-50 p-12 max-w-md mx-auto'>
              <Filter className='w-16 h-16 text-green mx-auto mb-4' />
              <h3 className='text-2xl font-bold text-green mb-2'>
                No Events Found
              </h3>
              <p className='text-gray-700'>
                No events are currently available in this category.
              </p>
            </div>
          </div>
        )}
        {activeFilter === "upcoming" && filteredEvents.length > 0 && (
          <div className='text-center mt-18'>
            <div className='rounded-lg border border-green-200 bg-green-50 p-8 max-w-2xl mx-auto'>
              <h3 className='text-3xl font-bold text-gray-800 mb-4'>
                Don't Miss Out!
              </h3>
              <p className='text-gray-500 mb-6'>
                Stay updated with all our upcoming events and be part of the
                engineering community.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Event;
