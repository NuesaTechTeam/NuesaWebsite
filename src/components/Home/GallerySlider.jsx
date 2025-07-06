import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Wrench, Building, Users, BookOpen } from "lucide-react"; //dont remove

const GallerySlider = ({ category }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % category.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [category.images.length]);

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
    <div className='flex flex-col gap-3 mb-2'>
      <h3 className='text-green font-bold text-xl'>
        {" "}
        <IconComponent className='inline mr-1' /> {category.title}
      </h3>

      <p className='text-gray-700'>{category.description}</p>
      <div className='relative rounded-2xl overflow-hidden shadow-2xl bg-white'>
        <div className='relative h-55'>
          {category.images.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={photo}
                alt={photo}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-gray-200 p-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer'
        >
          <ChevronLeft className='size-4' />
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-gray-200 p-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer'
        >
          <ChevronRight className='size-4' />
        </button>
      </div>
    </div>
  );
};

export default GallerySlider;
