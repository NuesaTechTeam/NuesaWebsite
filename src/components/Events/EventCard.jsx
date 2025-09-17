import { MapPin, Clock, Calendar } from "lucide-react";

const EventCard = ({ event, isPast, isVisible, isEven }) => {
    
    const categoryColors = {
      Technical: "bg-blue-500",
      Academic: "bg-green-500",
      Competition: "bg-red-500",
      Cultural: "bg-purple-500",
      Professional: "bg-yellow-500",
      Exhibition: "bg-indigo-500",
      Mafia: "bg-red-500"
    };
  return (
    <div
      className={`ml-12 md:ml-0 md:w-5/12 ${isEven ? "md:pr-12" : "md:pl-12"}`}
    >
      <div
        className={`${
          isPast ? "bg-green-300/5" : "bg-green-300/10"
        } backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border ${
          isPast ? "border-green-400/10" : "border-green-400/20"
        } transition-all duration-700 hover:scale-105 ${
          isPast ? "hover:shadow-gray-500/20" : "hover:shadow-green-500/20"
        } ${
          isVisible
            ? "opacity-100 translate-y-0 translate-x-0"
            : `opacity-0 ${
                isEven ? "translate-x-8" : "translate-x-8 md:-translate-x-8"
              } translate-y-8`
        }`}
      >
        {/* poster */}
        <div className='relative overflow-hidden'>
          <img
            src={event.image}
            alt={event.title}
            className={`w-full h-50 object-cover transition-transform duration-500 hover:scale-110 ${
              isPast ? "grayscale opacity-80" : ""
            }`}
          />
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
              isPast ? "bg-gray-500" : categoryColors[event.category]
            }`}
          >
            {event.category}
          </div>
          {isPast && (
            <div className='absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gray-700'>
              COMPLETED
            </div>
          )}
        </div>
        {/* content */}
        <div className='p-6'>
          <h3
            className={`text-2xl font-bold mb-3 transition-colors ${
              isPast
                ? "text-gray-300 hover:text-gray-200"
                : "text-gray-800 hover:text-green-400"
            }`}
          >
            {event.title}
          </h3>

          <p
            className={`mb-4 leading-relaxed ${
              isPast ? "text-gray-600" : "text-gray-500"
            }`}
          >
            {event.description}
          </p>
          <div className='space-y-2'>
            <div
              className={`flex items-center ${
                isPast ? "text-gray-600" : "text-gray-500"
              }`}
            >
              <Calendar
                className={`w-4 h-4 mr-2 ${
                  isPast ? "text-gray-400" : "text-blue-400"
                }`}
              />
              <span className='text-sm'>{event.date}</span>
            </div>
            <div
              className={`flex items-center ${
                isPast ? "text-gray-600" : "text-gray-500"
              }`}
            >
              <Clock
                className={`w-4 h-4 mr-2 ${
                  isPast ? "text-gray-400" : "text-green-400"
                }`}
              />
              <span className='text-sm'>{event.time}</span>
            </div>
            <div
              className={`flex items-center ${
                isPast ? "text-gray-600" : "text-gray-500"
              }`}
            >
              <MapPin
                className={`w-4 h-4 mr-2 ${
                  isPast ? "text-gray-400" : "text-red-400"
                }`}
              />
              <span className='text-sm'>{event.venue}</span>
            </div>
          </div>
          <button
            className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              isPast
                ? "bg-gray-600 text-gray-300 cursor-default"
                : "bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-green-600 hover:to-teal-700 hover:shadow-md hover:shadow-green-500/25 transform hover:-translate-y-1"
            }`}
          >
            {isPast ? "Event Completed" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default EventCard