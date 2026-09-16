import { useEffect, useState } from "react";
import { eventsData } from "../../lib/constants";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventsHome = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const upcomingEvents = eventsData.filter(
    (event) => event.status === "upcoming"
  );
  const pastEvents = eventsData.filter((event) => event.status === "past");
  const hasUpcomingEvents = upcomingEvents.length > 0;
  const featuredEvents = hasUpcomingEvents
    ? upcomingEvents.filter((event) => event.featured === true)
    : pastEvents.slice(0, 3); 
  const navigate = useNavigate();

  const handleEventButton = () => {
    navigate("/events");
  };

  const categoryColors = {
    Technical: "bg-blue-100 text-blue-800 border-blue-200",
    Competition: "bg-red-100 text-red-800 border-red-200",
    Professional: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Cultural: "bg-purple-100 text-purple-800 border-purple-200",
    Mafia: "bg-red-100 text-red-800 border-red-200",
    Academic: "bg-green-100 text-green-800 border-green-200",
    Exhibition: "bg-slate-100 text-slate-800 border-slate-200",
    Sport: "bg-orange-100 text-orange-800 border-orange-200",
    Social: "bg-pink-100 text-pink-800 border-pink-200",
  };

  useEffect(() => {
    if (featuredEvents.length > 0) {
      const interval = setInterval(() => {
        setCurrentEventIndex((prev) => (prev + 1) % featuredEvents.length);
      }, 5000);

      return () => clearInterval(interval);
    }

  }, [featuredEvents.length]);

  const formatDate = (dateStr) => {
    if(dateStr === "Coming Soon") {
      return {
        month: "COMING",
        day: "SOON",
        weekday: "SOON",
      };
    }
    const date = new Date(dateStr);

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
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    };
  };

  const currentEvent = featuredEvents[currentEventIndex];
  const dateInfo = formatDate(currentEvent.date);

  const NoEventsCard = () => (
    <div className='bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 p-8 text-center'>
      <div className='mb-6'>
        <Calendar className='w-16 h-16 text-gray-400 mx-auto mb-4' />
        <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
          No Events Scheduled
        </h3>
        <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
          We're currently planning exciting new events for our engineering
          community. Stay tuned for updates and be the first to know when we
          announce our next activities!
        </p>
      </div>
      <button className='bg-green hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200'>
        Get Notified
      </button>
    </div>
  );

  if (featuredEvents.length === 0) {
    return (
      <section className='py-16 bg-white dark:bg-gray-900'>
        <div className='max-w-7xl mx-auto'>
          {/* header */}
          <div className='text-center mb-16'>
            <div className='flex items-center justify-center mb-4'>
              <Calendar className='w-5 h-5 text-green dark:text-green-400 mr-2' />
              <span className='text-sm font-semibold text-green dark:text-green-400 uppercase tracking-wide'>
                What's Happening
              </span>
            </div>
            <div className='flex items-center justify-center mb-4'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white'>
                Stay <span className='text-green dark:text-green-400'>Connected</span>
              </h2>
            </div>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto '>
              Be part of the exciting events that shape our engineering college
              and community
            </p>
            <div className='w-24 h-1 bg-green mx-auto mt-6'></div>
          </div>

          {/* content */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='order-2 lg:order-1'>
              <NoEventsCard />
            </div>

            <div className='order-1 lg:order-2 text-center lg:text-left'>
              <div className='grid grid-cols-2 gap-6 mb-12'>
                <div className='bg-green-50 dark:bg-green-900/30 p-6 rounded-2xl border border-green-200'>
                  <div className='text-3xl font-bold text-green-600 mb-2'>
                    {pastEvents.length}+
                  </div>
                  <div className='text-sm font-medium text-green-700 dark:text-green-400'>
                    Past Events
                  </div>
                </div>
                <div className='bg-blue-50 p-6 rounded-2xl border border-blue-200'>
                  <div className='text-3xl font-bold text-blue-600 mb-2'>
                    1k+
                  </div>
                  <div className='text-sm font-medium text-blue-700'>
                    Students Participated
                  </div>
                </div>
              </div>

              <div className='mb-8'>
                <h3 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                  More Events
                  <span className='text-green dark:text-green-400 block'>Coming Soon</span>
                </h3>
                <p className='text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6'>
                  We're planning exciting new events, workshops, and
                  competitions. Follow our updates to be the first to know about
                  upcoming activities!
                </p>
              </div>

              <div className='space-y-4'>
                <button
                  onClick={handleEventButton}
                  className='w-full lg:w-auto bg-green hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center group cursor-pointer'
                >
                  View Past Events
                  <ArrowRight className='size-7 ml-2 group-hover:translate-x-1 transition-transform' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto'>
        {/* header */}
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center mb-4'>
            <Calendar className='w-5 h-5 text-green dark:text-green-400 mr-2' />
            <span className='text-sm font-semibold text-green dark:text-green-400 uppercase tracking-wide'>
              What's Happening
            </span>
          </div>
          <div className='flex items-center justify-center mb-4'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white'>
              {hasUpcomingEvents ? (
                <>
                  Upcoming <span className='text-green dark:text-green-400'>Events</span>
                </>
              ) : (
                <>
                  Recent <span className='text-green dark:text-green-400'>Events</span>
                </>
              )}
            </h2>
          </div>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto '>
            {hasUpcomingEvents
              ? "Don't miss out on the exciting events that shape our engineering college and community"
              : "Check out our recent events while we plan new exciting activities for our engineering community"}
          </p>
          <div className='w-24 h-1 bg-green mx-auto mt-6'></div>
        </div>

        {/* content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='order-2 lg:order-1'>
            <div className='relative'>
              <div className='bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors duration-200 hover:border-green-300 dark:hover:border-green-700'>
                <div className='relative overflow-hidden'>
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    className={`w-full ${
                      currentEvent.imageFit === "contain"
                        ? "aspect-[4/5] object-contain bg-black"
                        : "h-64 object-cover"
                    }`}
                  />
                  <div className='absolute top-4 left-4 right-4 flex justify-between items-start'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        categoryColors[currentEvent.category]
                      }`}
                    >
                      {currentEvent.category}
                    </span>
                    {!hasUpcomingEvents && (
                      <span className='px-3 py-1 rounded-full text-xs font-bold border bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-800'>
                        Past Event
                      </span>
                    )}
                  </div>
                  <div className='absolute bottom-4 left-4 bg-white dark:bg-gray-900 rounded-xl p-3 shadow-lg'>
                    <div className='text-center'>
                      <div className='text-xs font-bold text-gray-700 dark:text-gray-200'>
                        {dateInfo.month}
                      </div>
                      <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                        {dateInfo.day}
                      </div>
                      <div className='text-xs font-bold text-gray-500 dark:text-gray-400'>
                        {dateInfo.weekday}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-6'>
                  <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-green-600 dark:hover:text-green-400 transition-colors'>
                    {currentEvent.title}
                  </h3>
                  <p className='text-gray-700 dark:text-gray-200 mb-4 leading-relaxed'>
                    {currentEvent.description}
                  </p>

                  <div className='space-y-2 mb-6'>
                    <div className='flex items-center text-gray-500 dark:text-gray-400'>
                      <Calendar className='size-5 mr-3 text-green-500' />
                      <span className='text-sm font-medium'>
                        {currentEvent.date}
                      </span>
                    </div>
                    <div className='flex items-center text-gray-500 dark:text-gray-400'>
                      <Clock className='size-5 mr-3 text-blue-500' />
                      <span className='text-sm font-medium'>
                        {currentEvent.time}
                      </span>
                    </div>
                    <div className='flex items-center text-gray-500 dark:text-gray-400'>
                      <MapPin className='size-5 mr-3 text-red-500' />
                      <span className='text-sm font-medium'>
                        {currentEvent.venue}
                      </span>
                    </div>
                  </div>
                  {hasUpcomingEvents ? (
                    <button
                      onClick={() => currentEvent.detailsUrl ? navigate(currentEvent.detailsUrl) : handleEventButton()}
                      className='w-full bg-green hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200'
                    >
                      Register Now
                    </button>
                  ) : (
                    <button className='w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 py-3 px-6 rounded-xl font-semibold transition duration-300 cursor-not-allowed'>
                      Event Completed
                    </button>
                  )}
                </div>
              </div>

              <div className='flex justify-center mt-6 space-x-2'>
                {featuredEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEventIndex(index)}
                    className={`w-3 h-3 rounded-full transition duration-300 ${
                      index === currentEventIndex
                        ? "bg-green scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          <div className='order-1 lg:order-2 text-center lg:text-left'>
            <div className='grid grid-cols-2 gap-6 mb-12'>
              <div className='bg-green-50 dark:bg-green-900/30 p-6 rounded-2xl border border-green-200'>
                <div className='text-3xl font-bold text-green-600 mb-2'>
                  {hasUpcomingEvents
                    ? `${upcomingEvents.length}+`
                    : `${pastEvents.length}+`}
                </div>
                <div className='text-sm font-medium text-green-700 dark:text-green-400'>
                  {hasUpcomingEvents ? "Upcoming Events" : "Past Events"}
                </div>
              </div>
              <div className='bg-blue-50 p-6 rounded-2xl border border-blue-200'>
                <div className='text-3xl font-bold text-blue-600 mb-2'>1k+</div>
                <div className='text-sm font-medium text-blue-700'>
                  Students{" "}
                  {hasUpcomingEvents ? "Participating" : "Participated"}
                </div>
              </div>
            </div>

            <div className='mb-8'>
              <h3 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                {hasUpcomingEvents ? (
                  <>
                    Be Part of Something
                    <span className='text-green dark:text-green-400 block'>Amazing</span>
                  </>
                ) : (
                  <>
                    Stay Tuned for
                    <span className='text-green dark:text-green-400 block'>New Events</span>
                  </>
                )}
              </h3>
              <p className='text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6'>
                {hasUpcomingEvents
                  ? "Stay connected with the latest events, workshops, and competitions organized by NUESA ABUAD Chapter to enhance your engineering journey"
                  : "We're planning exciting new events, workshops, and competitions. Follow our updates to be the first to know about upcoming activities!"}
              </p>
            </div>

            <div className='mb-8'>
              <h4 className='text-lg font-semibold text-green dark:text-green-400 mb-4'>
                Event Categories
              </h4>
              <div className='flex flex-wrap gap-3'>
                {[
                  "Technical",
                  "Cultural",
                  "Professional",
                  "Academic",
                  "Competition",
                ].map((category) => (
                  <span
                    key={category}
                    className='px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium hover:bg-green-100 dark:hover:bg-gray-800 hover:text-green-700 dark:hover:text-green-400 transition-colors cursor-pointer'
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className='space-y-4'>
              <button
                onClick={handleEventButton}
                className='w-full lg:w-auto bg-green hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center group cursor-pointer'
              >
                {hasUpcomingEvents ? "View All Events" : "View All Past Events"}
                <ArrowRight className='size-7 ml-2 group-hover:translate-x-1 transition-transform' />
              </button>
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <h3 className='text-2xl font-bold text-green dark:text-green-400 text-center mb-12'>
            {hasUpcomingEvents ? "Also Coming Up" : "More Past Events"}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {featuredEvents
              .filter((_, index) => index !== currentEventIndex)
              .slice(0, 2)
              .map((event) => (
                <div
                  key={event.id}
                  className='bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-green-300 dark:hover:border-green-700 transition-colors duration-200'
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className={`w-full ${
                      event.imageFit === "contain"
                        ? "h-40 object-contain bg-black"
                        : "h-32 object-cover"
                    }`}
                  />
                  <div className='p-4'>
                    <h4 className='font-bold text-gray-900 dark:text-white mb-2 line-clamp-1'>
                      {event.title}
                    </h4>
                    <div className='flex items-center text-gray-500 dark:text-gray-400 text-sm'>
                      <Calendar className='w-3 h-3 mr-1' />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              ))}

            <div className='bg-green-50 dark:bg-green-900/30 rounded-2xl border border-dashed border-green-300 p-6 flex flex-col items-center justify-center text-center hover:bg-green-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer'>
              {hasUpcomingEvents ? (
                upcomingEvents.length - 3 > 0 && (
                  <div className='text-green dark:text-green-400 mb-2'>
                    <Sparkles className='size-7 mx-auto mb-2' />
                    <div className='text-lg font-bold'>
                      {upcomingEvents.length - 3}+ More
                    </div>
                    <div className='text-sm'>Exciting Events</div>
                  </div>
                )
              ) : (
                <div className='text-green dark:text-green-400 mb-2'>
                  <Sparkles className='size-7 mx-auto mb-2' />
                  <div className='text-lg font-bold'>New Events</div>
                  <div className='text-sm'>Coming Soon</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default EventsHome;
