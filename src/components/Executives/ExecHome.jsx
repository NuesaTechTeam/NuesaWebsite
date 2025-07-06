import { useNavigate } from "react-router-dom";
import { currentExecutivesData } from "../../lib/constants"
import ExecutiveCard from "./ExecutiveCard";
import { ArrowRight, UserCheck } from "lucide-react";

const ExecHome = () => {
    const featuredExecutives = currentExecutivesData.slice(0, 4)
    const navigate = useNavigate()
    const handleExecButton = () => {
        navigate("/executives")
    }

  return (
    <section className='bg-white py-8 lg:px-4 border-t-1 border-green-200'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-4'>
            <UserCheck className='w-5 h-5 text-green mr-2' />
            <span className='text-sm font-semibold text-green uppercase tracking-wide'>
              Leadership Team
            </span>
          </div>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Meet Our <span className="text-green">Leadership</span>
          </h2>
          <p className='text-lg text-gray-700 maw-w-3xl mx-auto'>
            Our dedicated executive team works tirelessly to serve the
            engineering community at ABUAD, creating opportunities for growth,
            innovation, and excellence.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12'>
          {featuredExecutives.map((executive, index) => (
            <ExecutiveCard key={index} executive={executive} />
          ))}
        </div>
        <div className='text-center'>
          <div className='bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 border border-green-200'>
            <h3 className='text-2xl font-bold text-green mb-4'>
              Get to Know Our Full Team
            </h3>
            <p className='text-gray-700 mb-6 max-w-2xl mx-auto'>
              Discover more about our complete executive committee, their
              achievements, and how they're working to make a difference in the
              engineering community.
            </p>
            <button
              onClick={handleExecButton}
              className='inline-flex items-center bg-green text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer'
            >
              View All Executives
              <ArrowRight className='size-5 ml-2' />
            </button>
          </div>
        </div>
        <div className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-8'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green mb-2'>12+</div>
            <div className='text-gray-700 text-sm'>Executive Members</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green mb-2'>9</div>
            <div className='text-gray-700 text-sm'>Enginnering Departments</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green mb-2'>1000+</div>
            <div className='text-gray-700 text-sm'>Studnets Served</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green mb-2'>2025</div>
            <div className='text-gray-700 text-sm'>Current Session</div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ExecHome