import { MapPin, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const EventCard = ({ event, isPast, isVisible, isEven }) => {
  const categoryColors = {
    Technical: "bg-blue-500",
    Academic: "bg-green-600",
    Competition: "bg-red-500",
    Cultural: "bg-purple-500",
    Professional: "bg-yellow-600",
    Exhibition: "bg-indigo-500",
    Mafia: "bg-red-600",
    Sport: "bg-emerald-600",
    Social: "bg-pink-500",
  };

  const categoryColor = categoryColors[event.category] ?? "bg-green-700";
  const hasAction = !isPast && (event.registrationUrl || event.detailsUrl);

  return (
    <div
      className={`ml-12 md:ml-0 md:w-5/12 ${isEven ? "md:pr-12" : "md:pl-12"}`}
    >
      <div
        className={`${
          isPast ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-900"
        } rounded-lg overflow-hidden border ${
          isPast ? "border-gray-200 dark:border-gray-800" : "border-green-200"
        } transition-[border-color,box-shadow,transform] duration-200 hover:border-green-300 dark:hover:border-green-700 ${
          isVisible
            ? "opacity-100 translate-y-0 translate-x-0"
            : "opacity-100 translate-y-0 translate-x-0"
        }`}
      >
        {/* poster */}
        <div className='relative overflow-hidden'>
          <img
            src={event.image}
            alt={event.title}
            className={`w-full transition-transform duration-200 hover:scale-[1.02] ${
              event.imageFit === "contain"
                ? "aspect-[4/5] object-contain bg-black"
                : "h-50 object-cover"
            } ${isPast ? "grayscale opacity-80" : ""}`}
          />
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
              isPast ? "bg-gray-500" : categoryColor
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
                ? "text-gray-700 dark:text-gray-200"
                : "text-gray-900 dark:text-white hover:text-green dark:hover:text-green-400"
            }`}
          >
            {event.title}
          </h3>

          <p
            className={`mb-4 leading-relaxed ${
              isPast ? "text-gray-600 dark:text-gray-300" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {event.description}
          </p>
          <div className='space-y-2'>
            <div
              className={`flex items-center ${
                isPast ? "text-gray-600 dark:text-gray-300" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Calendar
                className={`w-4 h-4 mr-2 ${
                  isPast ? "text-gray-400" : "text-blue-400"
                }`}
              />
              <span className='text-sm'>{event.date}</span>
            </div>
            {event.time && (
              <div
                className={`flex items-center ${
                  isPast ? "text-gray-600 dark:text-gray-300" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <Clock
                  className={`w-4 h-4 mr-2 ${
                    isPast ? "text-gray-400" : "text-green-400"
                  }`}
                />
                <span className='text-sm'>{event.time}</span>
              </div>
            )}
            {event.venue && (
              <div
                className={`flex items-center ${
                  isPast ? "text-gray-600 dark:text-gray-300" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <MapPin
                  className={`w-4 h-4 mr-2 ${
                    isPast ? "text-gray-400" : "text-red-400"
                  }`}
                />
                <span className='text-sm'>{event.venue}</span>
              </div>
            )}
          </div>
          {hasAction ? (
            event.registrationUrl ? (
              <a
                href={event.registrationUrl}
                className='mt-6 inline-flex w-full items-center justify-center rounded-lg bg-green px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-dark'
              >
                Register Now
              </a>
            ) : (
              <Link
                to={event.detailsUrl}
                className='mt-6 inline-flex w-full items-center justify-center rounded-lg bg-green px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-dark'
              >
                View Details
              </Link>
            )
          ) : (
            <div
              className={`mt-6 w-full rounded-lg px-6 py-3 text-center font-semibold ${
                isPast
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  : "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400"
              }`}
            >
              {isPast ? "Event completed" : "Registration opening soon"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default EventCard
