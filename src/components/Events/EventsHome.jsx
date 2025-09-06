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
    ? eventsData.filter((event) => event.featured === true)
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
    <div className='bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-8 text-center'>
      <div className='mb-6'>
        <Calendar className='w-16 h-16 text-gray-400 mx-auto mb-4' />
        <h3 className='text-2xl font-bold text-gray-900 mb-3'>
          No Events Scheduled
        </h3>
        <p className='text-gray-600 leading-relaxed'>
          We're currently planning exciting new events for our engineering
          community. Stay tuned for updates and be the first to know when we
          announce our next activities!
        </p>
      </div>
      <button className='bg-green hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'>
        Get Notified
      </button>
    </div>
  );

  if (featuredEvents.length === 0) {
    return (
      <section className='py-8 bg-white border-t-1 border-green-200'>
        <div className='max-w-7xl mx-auto'>
          {/* header */}
          <div className='text-center mb-16'>
            <div className='flex items-center justify-center mb-4'>
              <Calendar className='w-5 h-5 text-green mr-2' />
              <span className='text-sm font-semibold text-green uppercase tracking-wide'>
                What's Happening
              </span>
            </div>
            <div className='flex items-center justify-center mb-4'>
              <Sparkles className='size-8 text-green mr-3' />
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
                Stay <span className='text-green'>Connected</span>
              </h2>
              <Sparkles className='size-8 text-green ml-3' />
            </div>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto '>
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
                <div className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200'>
                  <div className='text-3xl font-bold text-green-600 mb-2'>
                    {pastEvents.length}+
                  </div>
                  <div className='text-sm font-medium text-green-700'>
                    Past Events
                  </div>
                </div>
                <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200'>
                  <div className='text-3xl font-bold text-blue-600 mb-2'>
                    1k+
                  </div>
                  <div className='text-sm font-medium text-blue-700'>
                    Students Participated
                  </div>
                </div>
              </div>

              <div className='mb-8'>
                <h3 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                  More Events
                  <span className='text-green block'>Coming Soon</span>
                </h3>
                <p className='text-lg text-gray-700 leading-relaxed mb-6'>
                  We're planning exciting new events, workshops, and
                  competitions. Follow our updates to be the first to know about
                  upcoming activities!
                </p>
              </div>

              <div className='space-y-4'>
                <button
                  onClick={handleEventButton}
                  className='w-full lg:w-auto bg-gradient-to-r to-green from-green-700 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center group cursor-pointer'
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
    <section className='py-8 bg-white border-t-1 border-green-200'>
      <div className='max-w-7xl mx-auto'>
        {/* header */}
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center mb-4'>
            <Calendar className='w-5 h-5 text-green mr-2' />
            <span className='text-sm font-semibold text-green uppercase tracking-wide'>
              What's Happening
            </span>
          </div>
          <div className='flex items-center justify-center mb-4'>
            <Sparkles className='size-8 text-green mr-3' />
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
              {hasUpcomingEvents ? (
                <>
                  Upcoming <span className='text-green'>Events</span>
                </>
              ) : (
                <>
                  Recent <span className='text-green'>Events</span>
                </>
              )}
            </h2>
            <Sparkles className='size-8 text-green ml-3' />
          </div>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto '>
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
              <div className='bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform hover:scale-105 transition-all duration-500'>
                <div className='relative overflow-hidden'>
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    className='w-full h-64 object-cover'
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
                      <span className='px-3 py-1 rounded-full text-xs font-bold border bg-gray-100 text-gray-800 border-gray-200'>
                        Past Event
                      </span>
                    )}
                  </div>
                  <div className='absolute bottom-4 left-4 bg-white rounded-xl p-3 shadow-lg'>
                    <div className='text-center'>
                      <div className='text-xs font-bold text-gray-700'>
                        {dateInfo.month}
                      </div>
                      <div className='text-2xl font-bold text-gray-900'>
                        {dateInfo.day}
                      </div>
                      <div className='text-xs font-bold text-gray-500'>
                        {dateInfo.weekday}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-6'>
                  <h3 className='text-2xl font-bold text-gary-900 mb-3 hover:text-green-600 transition-colors'>
                    {currentEvent.title}
                  </h3>
                  <p className='text-gray-700 mb-4 leading-relaxed'>
                    {currentEvent.description}
                  </p>

                  <div className='space-y-2 mb-6'>
                    <div className='flex items-center text-gray-500'>
                      <Calendar className='size-5 mr-3 text-green-500' />
                      <span className='text-sm font-medium'>
                        {currentEvent.date}
                      </span>
                    </div>
                    <div className='flex items-center text-gray-500'>
                      <Clock className='size-5 mr-3 text-blue-500' />
                      <span className='text-sm font-medium'>
                        {currentEvent.time}
                      </span>
                    </div>
                    <div className='flex items-center text-gray-500'>
                      <MapPin className='size-5 mr-3 text-red-500' />
                      <span className='text-sm font-medium'>
                        {currentEvent.venue}
                      </span>
                    </div>
                  </div>
                  {hasUpcomingEvents ? (
                    <button className='w-full bg-green hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'>
                      Register Now
                    </button>
                  ) : (
                    <button className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300 cursor-not-allowed'>
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
              <div className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200'>
                <div className='text-3xl font-bold text-green-600 mb-2'>
                  {hasUpcomingEvents
                    ? `${upcomingEvents.length}+`
                    : `${pastEvents.length}+`}
                </div>
                <div className='text-sm font-medium text-green-700'>
                  {hasUpcomingEvents ? "Upcoming Events" : "Past Events"}
                </div>
              </div>
              <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200'>
                <div className='text-3xl font-bold text-blue-600 mb-2'>1k+</div>
                <div className='text-sm font-medium text-blue-700'>
                  Students{" "}
                  {hasUpcomingEvents ? "Participating" : "Participated"}
                </div>
              </div>
            </div>

            <div className='mb-8'>
              <h3 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                {hasUpcomingEvents ? (
                  <>
                    Be Part of Something
                    <span className='text-green block'>Amazing</span>
                  </>
                ) : (
                  <>
                    Stay Tuned for
                    <span className='text-green block'>New Events</span>
                  </>
                )}
                <span className='text-green block'>Amazing</span>
              </h3>
              <p className='text-lg text-gray-700 leading-relaxed mb-6'>
                {hasUpcomingEvents
                  ? "Stay connected with the latest events, workshops, and competitions organized by NUESA ABUAD Chapter to enhance your engineering journey"
                  : "We're planning exciting new events, workshops, and competitions. Follow our updates to be the first to know about upcoming activities!"}
              </p>
            </div>

            <div className='mb-8'>
              <h4 className='text-lg font-semibold text-green mb-4'>
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
                    className='px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-green-100 hover:text-green-700 transition-colors cursor-pointer'
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className='space-y-4'>
              <button
                onClick={handleEventButton}
                className='w-full lg:w-auto bg-gradient-to-r to-green from-green-700 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center group cursor-pointer'
              >
                {hasUpcomingEvents ? "View All Events" : "View All Past Events"}
                <ArrowRight className='size-7 ml-2 group-hover:translate-x-1 transition-transform' />
              </button>
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <h3 className='text-2xl font-bold text-green text-center mb-12'>
            {hasUpcomingEvents ? "Also Coming Up" : "More Past Events"}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {featuredEvents
              .filter((_, index) => index !== currentEventIndex)
              .slice(0, 2)
              .map((event) => (
                <div
                  key={event.id}
                  className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2'
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className='w-full h-32 object-cover'
                  />
                  <div className='p-4'>
                    <h4 className='font-bold text-gray-900 mb-2 line-clamp-1'>
                      {event.title}
                    </h4>
                    <div className='flex items-center text-gray-500 text-sm'>
                      <Calendar className='w-3 h-3 mr-1' />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              ))}

            <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-dashed border-green-300 p-6 flex flex-col items-center justify-center text-center hover:from-green-100 hover:to-green-200 transition-all duration-300 cursor-pointer'>
              {hasUpcomingEvents ? (
                upcomingEvents.length - 3 > 0 && (
                  <div className='text-green mb-2'>
                    <Sparkles className='size-7 mx-auto mb-2' />
                    <div className='text-lg font-bold'>
                      {upcomingEvents.length - 3}+ More
                    </div>
                    <div className='text-sm'>Exciting Events</div>
                  </div>
                )
              ) : (
                <div className='text-green mb-2'>
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
