import GallerySlider from "./GallerySlider";
import { collegeGallery } from "../../lib/constants";

const CollegeEnvironment = () => {
  return (
    <section className='bg-white px-4 py-10 dark:bg-gray-900 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Our <span className='text-green dark:text-green-400'>College</span>
          </h2>
          <p className='text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed'>
            Explore the facilities and environment that make ABUAD the perfect
            place for engineering education and innovation.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          {Object.entries(collegeGallery).map(([key, category]) => (
            <GallerySlider key={key} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default CollegeEnvironment;
