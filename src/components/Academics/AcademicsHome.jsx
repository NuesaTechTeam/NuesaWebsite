import { ArrowRight, BookOpen, FileText, GraduationCap, Play, Star, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CountUp from "../CountUp";


const features = [
  {
    icon: BookOpen,
    title: "Study Notes",
    description: "Comprehensive notes across all engineering departments and courses",
    color: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
  },
  {
    icon: FileText,
    title: "Past Questions",
    description: "Access previous exam questions from different academic levels",
    color: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
  },
  {
    icon: Play,
    title: "Video Tutorials",
    description: "Curated tutorial links covering various topics and courses",
    color: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
  }
];

const stats = [
  { end: 50, suffix: "+", label: "Study Materials" },
  { end: 9, suffix: "+", label: "Departments" },
  { end: 100, suffix: "+", label: "Students Helped" },
];



const AcademicsHome = () => {

  const navigate = useNavigate();

  const handleAcademicsButton = () => {
    navigate("/academics");
  };
  return (
    <section className='bg-white dark:bg-gray-900 py-16 lg:px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Your Gateway to{" "}
            <span className='text-green dark:text-green-400'>Academic Excellence</span>
          </h2>
          <p className='text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto'>
            Unlock your potential with our comprehensive collection of study
            materials, past questions, and expert tutorials designed
            specifically for engineering students.
          </p>
        </div>

        {/* stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          {stats.map((stat, index) => (
            <div key={index} className='text-center'>
              <div className='text-3xl font-bold text-green dark:text-green-400 mb-2'>
                <CountUp end={stat.end} suffix={stat.suffix} />
              </div>
              <div className='text-gray-700 dark:text-gray-200'>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* features */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          {features.map((feature, index) => (
            <div key={index} className='group relative'>
              <div className='bg-white dark:bg-gray-900 rounded-xl p-6 transition-colors duration-200 border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700'>
                <div
                  className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon className='w-5 h-5' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-700 dark:text-gray-200 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='bg-green-50 dark:bg-green-900/30 rounded-2xl p-8 text-center relative overflow-hidden border border-green-100'>
          <div className='relative z-10'>
            <div className='flex items-center justify-center mb-4'>
              <Users className='w-6 h-6 text-green dark:text-green-400 mr-2' />
              <Star className='w-6 h-6 text-green dark:text-green-400 mr-2' />
              <Users className='w-6 h-6 text-green dark:text-green-400' />
            </div>

            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              Ready to Boost Your Academic Performance?
            </h3>
            <p className='text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
              Join thousands of engineering students who have already
              transformed their study experience. Access premium resources,
              connect with peers, and achieve your academic goals.
            </p>

            <button
              onClick={handleAcademicsButton}
              className='group bg-green hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200'>
              <span className='flex items-center'>
                Explore Academic Resources
                <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
              </span>
            </button>

            <div className='mt-4 text-sm text-gray-600 dark:text-gray-300'>
              Free access for all NUESA members
            </div>

            <div className='mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold'>
              <Link to='/library' className='text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-400 hover:underline'>
                NUESA ABUAD Digital Library
              </Link>
              <Link to='/apwen' className='text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 hover:underline'>
                APWEN ABUAD Collegiate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AcademicsHome
