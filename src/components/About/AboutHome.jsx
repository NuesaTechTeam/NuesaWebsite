import { Users, ArrowRight, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "../CountUp";

const AboutHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/images/executives/current/gregory.jpeg",
    "/images/executives/current/naimah.jpeg",
    "/images/executives/current/ojiji.jpeg",
    "/images/executives/current/Agboyinu Setin Gabriel.jpeg",
    "/images/executives/current/Angel.jpeg",
    "/images/executives/current/Joel.jpeg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const navigate = useNavigate();

  const handleAboutButton = () => {
    navigate("/about");
  };

  return (
    <section className='bg-white dark:bg-gray-900 py-12 lg:px-4 overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-10'>
          <div className='flex items-center justify-center mb-4'>
            <Info className='w-5 h-5 text-green dark:text-green-400 mr-2' />
            <span className='text-sm font-semibold text-green dark:text-green-400 uppercase tracking-wide'>
              Who We Are
            </span>
          </div>
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            About <span className='text-green dark:text-green-400'>NUESA</span>
          </h2>
          <p className='text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed '>
            The Nigerian Universities Engineering Students Association (NUESA)
            ABUAD Chapter is dedicated to promoting academic excellence,
            professional development, and innovation among engineering students.
          </p>
        </div>
        {/* who we are section */}
        <div className='mb-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-14 items-center'>
            <div className='relative mb-10 lg:mb-0'>
              <div className='order-2 lg:order-1 relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800'>
                <div className='relative aspect-[4/5]'>
                  {images.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt="NUESA executive member"
                      className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>
          

              <div className='mt-4 bg-green-50 dark:bg-green-900/30 p-6 py-4 rounded-xl border border-green-100 dark:border-gray-800 md:absolute md:-bottom-8 md:-right-6 md:max-w-xs'>
                <h4 className='text-xl font-medium text-green dark:text-green-400 mb-3'>
                  Our Mission
                </h4>
                <p className='text-gray-700 dark:text-gray-200 leading-relaxed'>
                  To create a vibrant community of future engineers who are
                  equipped with the knowledge and skills to solve real-world
                  problems.
                </p>
              </div>
            </div>
            <div className='order-1 lg:order-2 '>
              <h3 className='text-3xl font-bold text-green dark:text-green-400 mb-3'>Who We Are</h3>
              <p className='text-gray-700 dark:text-gray-200 mb-4 leading-relaxed'>
                NUESA ABUAD Chapter is a student-led organization that
                represents all engineering students at Afe Babalola University.
                We serve as a bridge between students, faculty, and industry
                professionals, creating opportunities for growth and
                development.
              </p>
              <p className='text-gray-700 dark:text-gray-200 mb-2 leading-relaxed'>
                Our association organizes technical workshops, industry tours,
                competitions, and social events that enhance the academic
                experience and prepare students for successful careers in
                engineering.
              </p>
            </div>
          </div>
        </div>

        {/* stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-16'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green dark:text-green-400 mb-2'>
              <CountUp end={1000} suffix='+' format={(v) => (v >= 1000 ? "1k" : Math.round(v))} />
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Members</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green dark:text-green-400 mb-2'>
              <CountUp end={9} />
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Departments</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green dark:text-green-400 mb-2'>
              <CountUp end={10} />
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Annual Events</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green dark:text-green-400 mb-2'>
              <CountUp end={14} />
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Years Active</div>
          </div>
        </div>

        {/* president message */}
        <div className='hidden bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 mb-12'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-6'>
              <div className='w-20 h-20 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <Users className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-green dark:text-green-400 mb-2'>
                A Message from Our President
              </h3>
            </div>
            <blockquote className='text-lg text-gray-700 dark:text-gray-200 italic text-center leading-relaxed'>
              Greetings fellow engineering students! It is a privilege to serve
              as the president of this dynamic body. Our mission is to uphold
              academic excellence, foster collaboration, and create a community
              where every engineer has the tools to succeed.
            </blockquote>
            <blockquote className='text-lg text-gray-700 dark:text-gray-200 italic text-center leading-relaxed'>
              NUESA is more than a union — it is a family, a force, and a
              future. I encourage every student to get involved, contribute, and
              grow with us. Together, we engineer greatness.
            </blockquote>
            <div className='text-center mt-4'>
              <div className='text-green dark:text-green-400 font-bold'>President, NUESA</div>
            </div>
          </div>
        </div>

        <div className='text-center'>
          <button
            onClick={handleAboutButton}
            className='btn-lively inline-flex items-center px-8 py-4 bg-green text-white font-semibold rounded-lg hover:bg-green-700 cursor-pointer'
          >
            Learn More About NUESA
            <ArrowRight className='ml-2' size={20} />
          </button>
          <p className='mt-4 text-gray-600 dark:text-gray-300'>
            Discover our complete story, leadership team, and how you can be
            part of our engineering community
          </p>
        </div>
      </div>
    </section>
  );
};
export default AboutHome;
