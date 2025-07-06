import GallerySlider from "./GallerySlider";
import { collegeGallery } from "../../lib/constants";
import {
  Wrench,
  Building,
  Users,
  BookOpen,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const CollegeEnvironment = () => {
  return (
    <section className='bg-white py-8 lg:px-4 border-t-1 border-green-200'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Our <span className='text-green'>College</span>
          </h2>
          <p className='text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed'>
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
