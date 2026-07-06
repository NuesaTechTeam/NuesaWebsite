import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const GallerySlider = ({ category }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused && category.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % category.images.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, category.images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % category.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + category.images.length) % category.images.length
    );
  };

  let IconComponent = category.icon;

  return (
    <div
      className='flex flex-col gap-3 mb-2'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h3 className='flex items-center text-green font-bold text-xl'>
        <IconComponent className='mr-2 h-5 w-5' /> {category.title}
      </h3>

      <p className='text-gray-700'>{category.description}</p>
      <div className='relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-100'>
        <div className='relative h-55'>
          {category.images.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-[opacity,filter,transform] duration-300 ${
                index === currentSlide
                  ? "opacity-100 scale-100 blur-0"
                  : "opacity-0 scale-[0.99] blur-[1px]"
              }`}
            >
              <img
                src={photo}
                alt={category.title}
                className='w-full h-full object-cover'
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {category.images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/85 hover:bg-white text-green p-2 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white'
              aria-label='Previous image'
            >
              <ChevronLeft className='size-4' />
            </button>
            <button
              onClick={nextSlide}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/85 hover:bg-white text-green p-2 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white'
              aria-label='Next image'
            >
              <ChevronRight className='size-4' />
            </button>
            <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
              {category.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition duration-300 ${
                    index === currentSlide
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GallerySlider;
