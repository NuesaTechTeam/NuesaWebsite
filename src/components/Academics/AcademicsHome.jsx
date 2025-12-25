import { ArrowRight, BookOpen, FileText, GraduationCap, Play, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";


const features = [
  {
    icon: BookOpen,
    title: "Study Notes",
    description: "Comprehensive notes across all engineering departments and courses",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: FileText,
    title: "Past Questions",
    description: "Access previous exam questions from different academic levels",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Play,
    title: "Video Tutorials",
    description: "Curated tutorial links covering various topics and courses",
    color: "bg-green-100 text-green-600"
  }
];

const stats = [
  { number: "50+", label: "Study Materials" },
  { number: "9+", label: "Departments" },
  { number: "100+", label: "Students Helped" },
];



const AcademicsHome = () => {

  const navigate = useNavigate();

  const handleAcademicsButton = () => {
    navigate("/academics");
  };
  return (
    <section className='bg-white py-8 lg:px-4 border-t-1 border-green-200'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-10'>
          <div className='flex items-center justify-center mb-4'>
            <GraduationCap className='w-5 h-5 text-green mr-2' />
            <span className='text-sm font-semibold text-green uppercase tracking-wide'>
              Academic Resources
            </span>
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Your Gateway to{" "}
            <span className='text-green'>Academic Excellence</span>
          </h2>
          <p className='text-xl text-gray-700 max-w-3xl mx-auto'>
            Unlock your potential with our comprehensive collection of study
            materials, past questions, and expert tutorials designed
            specifically for engineering students.
          </p>
        </div>

        {/* stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          {stats.map((stat, index) => (
            <div key={index} className='text-center'>
              <div className='text-3xl font-bold text-green mb-2'>
                {stat.number}
              </div>
              <div className='text-gray-700'>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* features */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          {features.map((feature, index) => (
            <div key={index} className='group relative'>
              <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100'>
                <div
                  className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className='w-5 h-5' />
                </div>
                <h3 className='text-xl font-semibold text-gray mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-700 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 text-center relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16'></div>
          <div className='absolute bottom-0 left-0 w-24 h-24 bg-green-300 rounded-full opacity-20 transform -translate-x-12 translate-y-12'></div>

          <div className='relative z-10'>
            <div className='flex items-center justify-center mb-4'>
              <Users className='w-6 h-6 text-green mr-2' />
              <Star className='w-6 h-6 text-green mr-2' />
              <Users className='w-6 h-6 text-green' />
            </div>

            <h3 className='text-2xl font-bold text-gray mb-4'>
              Ready to Boost Your Academic Performance?
            </h3>
            <p className='text-gray-600 mb-8 max-w-2xl mx-auto'>
              Join thousands of engineering students who have already
              transformed their study experience. Access premium resources,
              connect with peers, and achieve your academic goals.
            </p>

            <button
              onClick={handleAcademicsButton}
              className='group bg-green hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
              <span className='flex items-center'>
                Explore Academic Resources
                <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
              </span>
            </button>

            <div className='mt-4 text-sm text-gray-600'>
              Free access for all NUESA members
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AcademicsHome