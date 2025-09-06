import { useEffect, useRef, useState } from "react";
import EventCard from "./EventCard";
import { eventsData } from "../../lib/constants";
import { Calendar, ChevronDown, Clock, Filter } from "lucide-react";

const Event = () => {
  const [visibleEvents, setVisibleEvents] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const timelineRef = useRef(null);
  const eventRefs = useRef([]);

  const categoryColors = {
    Technical: "bg-blue-500",
    Academic: "bg-green-500",
    Competition: "bg-red-500",
    Cultural: "bg-purple-500",
    Professional: "bg-yellow-500",
    Exhibition: "bg-indigo-500",
    Mafia: "bg-red-500"
  };

  const categories = [
    "all",
    ...new Set(eventsData.map((event) => event.category)),
  ];

  // filter events based on filter and category chosen
  const filteredEvents = eventsData
    .filter((event) => {
      const matchesStatus = event.status === activeFilter;
      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;
      return matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      // sort events by date, upcoming ascending, past desencending
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return activeFilter === "upcoming" ? dateA - dateB : dateB - dateA;
    });

  useEffect(() => {
    setVisibleEvents(new Set());
    eventRefs.current = [];
  }, [activeFilter, selectedCategory]);

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
          weekday: "SOON",
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
    <section className='bg-white py-15 '>
      <div className='container mx-auto'>
        {/* header */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green to-teal-600 bg-clip-text text-transparent'>
            College Events and News
          </h1>
          <p className='text-xl text-green-900/80 max-w-2xl mx-auto'>
            Discover our exciting events that shape the future of engineering
            and our college
          </p>
        </div>
        {/* filters */}
        <div className='max-w-4xl mx-auto mb-16'>
          <div className='flex justify-center mb-8'>
            <div className='bg-green-400/10 backdrop-blur-lg rounded-2xl p-2 border border-green-400/10'>
              <div className='flex space-x-1'>
                <button
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeFilter === "upcoming"
                      ? "bg-gradient-to-r from-green-500 to-teal-500 text-gray-800 shadow-lg"
                      : "text-gray-500 hover:text-gray-700 hover:bg-green-400/20 cursor-pointer"
                  }`}
                  onClick={() => setActiveFilter("upcoming")}
                >
                  <Calendar className='size-6' />
                  <span>Upcoming ({stats.upcoming})</span>
                </button>
                <button
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-1 ${
                    activeFilter === "past"
                      ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg"
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

          <div className='justify-center hidden'>
            <div className='relative'>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='bg-green-400/10 backdrop-blur-lg border border-green-400/10 rounded-xl px-5 py-3 text-gray-700 font-semibold appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-green-500 min-w-48'
              >
                <option value='all' className='bg-gray-50 hover:bg-gray-400'>
                  All Categories
                </option>
                {categories.slice(1).map((category) => (
                  <option
                    value={category}
                    key={category}
                    className='bg-gray-50 hover:bg-gray-400'
                  >
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 size-7 text-gray-500 pointer-events-none' />
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
                  ? "bg-gradient-to-b from-green-500 via-teal-500 to-green-500"
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
                    className={`absolute left-0 md:left-1/2 w-6 h-6 rounded-full border-4 border-white transform md:-translate-x-3 z-10 transition-all duration-700 ${
                      isVisible
                        ? `${
                            isPast
                              ? "bg-gray-500"
                              : categoryColors[event.category]
                          } scale-100 shadow-lg ${
                            isPast
                              ? "shadow-gray-500/50"
                              : "shadow-green-500/50"
                          }`
                        : "bg-gray-600 scale-75"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 rounded-full ${
                        isPast ? "bg-gray-500" : categoryColors[event.category]
                      } animate-ping opacity-30 ${
                        isVisible ? "block" : "hidden"
                      } `}
                    ></div>
                  </div>
                  <div
                    className={`absolute left-2 -translate-x-1/2 translate-y-11  md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-12 ${
                      isPast ? "bg-gray-100" : "bg-white"
                    } rounded-lg p-3 shadow-lg transition-all duration-700 ${
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
            <div className='bg-green-400/10 backdrop-blur-lg rounded-2xl p-12 max-w-md mx-auto border border-green-400/20'>
              <Filter className='w-16 h-16 text-green mx-auto mb-4' />
              <h3 className='text-2xl font-bold text-green mb-2'>
                No Events Found
              </h3>
              <p className='text-gray-700'>
                No events match your current filter selection.
              </p>
            </div>
          </div>
        )}
        {activeFilter === "upcoming" && filteredEvents.length > 0 && (
          <div className='text-center mt-18'>
            <div className='bg-green-400/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto border border-green-400/20'>
              <h3 className='text-3xl font-bold text-gray-800 mb-4'>
                Don't Miss Out!
              </h3>
              <p className='text-gray-500 mb-6'>
                Stay updated with all our upcoming events and be part of the
                engineering community.
              </p>
              {/* <button className='bg-gradient-to-r from-teal-500 to-green-500 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-300 hover:from-teal-600 hover:to-green-600 hover:shadow-lg hover:shadow-purple-500/25'>
                Subscribe to Updates
              </button> */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Event;
