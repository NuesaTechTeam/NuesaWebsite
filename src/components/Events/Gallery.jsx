import { useEffect, useState } from "react"
import { galleryPhotos } from "../../lib/constants"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"


const Gallery = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if(!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % galleryPhotos.length)
        }, 5000);

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % galleryPhotos.length)
    }
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length)
    }

    const goToSlide = (index) => {
     setCurrentSlide(index)
    }

    
    
  return (
    <section className='py-10 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-green mb-4'>
            Event Photo Gallery
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Relive the memorable moments from our college events through this
            curated collection of photographs
          </p>
          <div className='w-24 h-1 bg-green mx-auto mt-8'></div>
        </div>

        {/* gallery container */}
        <div className='relative max-w-5xl mx-auto'>
          <div className='relative rounded-2xl overflow-hidden shadow-2xl bg-white'>
            <div className='relative h-96 md:h-[500px]'>
              {galleryPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img src={photo.src} alt={photo.title} />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8'>
                    <h3 className='text-green-400'>{photo.title}</h3>
                    <p className='text-green-300 font-medium'>
                      {photo.eventDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-gray-300 p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer'
            >
              <ChevronLeft className='size-8' />
            </button>
            <button
              onClick={nextSlide}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-gray-300 p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer'
            >
              <ChevronRight className='size-8' />
            </button>
            <button
              className='absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-gray-300 p-3 rounded-full transition-all duration-300 cursor-pointer'
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? (
                <Pause className='size-7' />
              ) : (
                <Play className='size-7' />
              )}
            </button>
          </div>

          {/* thumbnail */}
          <div className='flex justify-center mt-8 space-x-3 px-4 overflow-x-auto scrollbar-hidden'>
            {galleryPhotos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentSlide
                    ? "ring-1 ring-green-500 ring-offset-2 scale-110"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
          {/* indicators */}
          <div className='flex justify-center mt-6 space-x-2'>
            {galleryPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-green-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <div className='text-center mt-12'>
          <button className='bg-green hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'>
            View Full Gallery
          </button>
        </div>
      </div>
    </section>
  );
}
export default Gallery