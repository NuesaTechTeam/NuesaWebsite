import { Target, Sparkles, Users, GraduationCap, ArrowRight } from "lucide-react";

const AboutHome = () => {

const pillars = [
  {
    title: "Mission",
    text: "Empowering students to lead in engineering through excellence, leadership, and vision.",
    icon: <Target className='w-6 h-6 text-green-600' />,
  },
  {
    title: "Innovation",
    text: "Encouraging creativity and problem-solving to build practical solutions for society.",
    icon: <Sparkles className='w-6 h-6 text-green-600' />,
  },
  {
    title: "Community",
    text: "Fostering a sense of belonging and collaboration across all engineering disciplines.",
    icon: <Users className='w-6 h-6 text-green-600' />,
  },
  {
    title: "Learning",
    text: "Promoting continuous academic growth and professional development opportunities.",
    icon: <GraduationCap className='w-6 h-6 text-green-600' />,
  },
];
    
    const disciplines = [
      "Civil Engineering",
      "Mechatronics Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Computer Engineering",
      "Chemical Engineering",
      "Petroleum Engineering",
      "Biomedical Engineering",
      "Aeronautical Engineering",
    ];

    return (
      <section className='bg-white py-8 lg:px-4 border-t-1 border-green-200 overflow-hidden'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-10'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              About <span className='text-green'>NUESA</span>
            </h2>
            <p className='text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed '>
              The Nigerian Universities Engineering Students Association (NUESA)
              ABUAD Chapter is dedicated to promoting academic excellence,
              professional development, and innovation among engineering
              students.
            </p>
          </div>
          {/* who we are section */}
          <div className='mb-16'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-14 items-center'>
                        <div className="relative">
                            
              <div className='order-2 lg:order-1 relative overflow-hidden'>
                <img
                  src='/images/executives/past/Official.jpg'
                  alt='nuesa team photo'
                  className='rounded-lg shadow-lg w-full h-90 object-cover'
                            />
              </div>
                            

                <div className='absolute -bottom-10 -right-6 bg-white p-6 py-4 rounded-lg shadow-lg max-w-xs overflow-x-hidden'>
                  <h4 className='text-xl font-medium text-green mb-3'>
                    Our Mission
                  </h4>
                  <p className='text-gray-700 leading-relaxed'>
                    To create a vibrant community of future engineers who are
                    equipped with the knowledge and skills to solve real-world
                    problems.
                  </p>
                </div>
                </div>
              <div className='order-1 lg:order-2 '>
                <h3 className='text-3xl font-bold text-green mb-3'>
                  Who We Are
                </h3>
                <p className='text-gray-700 mb-4 leading-relaxed'>
                  NUESA ABUAD Chapter is a student-led organization that
                  represents all engineering students at Afe Babalola
                  University. We serve as a bridge between students, faculty,
                  and industry professionals, creating opportunities for growth
                  and development.
                </p>
                <p className='text-gray-700 mb-2 leading-relaxed'>
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
              <div className='text-3xl font-bold text-green mb-2'>1k+</div>
              <div className='text-gray-600'>Members</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-green mb-2'>9</div>
              <div className='text-gray-600'>Departments</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-green mb-2'>10</div>
              <div className='text-gray-600'>Annual Events</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-green mb-2'>13</div>
              <div className='text-gray-600'>Years Active</div>
            </div>
          </div>

          {/* pillars */}
          <div className='mb-16'>
            <h3 className='text-2xl font-bold text-green text-center mb-8'>
              Our Foundation
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {pillars.map((pillar, index) => {
                return (
                  <div
                    key={index}
                    className='bg-green-50 rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-300'
                  >
                    <div className='inline-flex items-center justify-center w-10 h-10 bg-green-200 rounded-lg mb-4'>
                      {pillar.icon}
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                      {pillar.title}
                    </h4>
                    <p className='text-gray-700 text-sm'>
                      {pillar.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* disciplines */}
          <div className='mb-16'>
            <h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
              Engineering Disciplines
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
              {disciplines.map((discipline, index) => (
                <div
                  key={index}
                  className='bg-green-50 rounded-lg p-4 text-center hover:bg-green-100 transition-colors duration-200'
                >
                  <div className='text-sm font-medium text-green-800'>
                    {discipline}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* president message */}
          <div className='hidden bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 mb-12'>
            <div className='max-w-4xl mx-auto'>
              <div className='text-center mb-6'>
                <div className='w-20 h-20 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <Users className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-green mb-2'>
                  A Message from Our President
                </h3>
              </div>
              <blockquote className='text-lg text-gray-700 italic text-center leading-relaxed'>
                Greetings fellow engineering students! It is a privilege to
                serve as the president of this dynamic body. Our mission is to
                uphold academic excellence, foster collaboration, and create a
                community where every engineer has the tools to succeed.
              </blockquote>
              <blockquote className='text-lg text-gray-700 italic text-center leading-relaxed'>
                NUESA is more than a union — it is a family, a force, and a
                future. I encourage every student to get involved, contribute,
                and grow with us. Together, we engineer greatness.
              </blockquote>
              <div className='text-center mt-4'>
                <div className='text-green font-bold'>
                  President, NUESA
                </div>
              </div>
            </div>
          </div>

          <div className='text-center'>
            <button className='inline-flex items-center px-8 py-4 bg-green text-white font-semibold rounded-lg hover:bg-green-700 duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer'>
              Learn More About NUESA
              <ArrowRight className='ml-2' size={20} />
            </button>
            <p className='mt-4 text-gray-600'>
              Discover our complete story, leadership team, and how you can be
              part of our engineering community
            </p>
          </div>
        </div>
      </section>
    );
};
export default AboutHome;
