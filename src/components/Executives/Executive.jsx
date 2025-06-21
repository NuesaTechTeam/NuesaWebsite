import ExecutiveCard from "./ExecutiveCard";
import {
  currentExecutivesData,
  pastExecutivesByYear,
} from "../../lib/constants";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";

const Executive = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [scrollIntoView, setScrollIntoView] = useState(null)

  const ref = useRef(null)

  useEffect(() => {
    if (scrollIntoView && ref.current) {
      ref.current.scrollIntoView({behavior: "smooth"})
    }
  }, [scrollIntoView])

  const pastButton = () => {
    setActiveTab("past")
    setScrollIntoView("header")
  }

    return (
      <div className='py-12 lg:px-4'>
        <div className='max-w-7xl mx-auto'>
          {/* header */}
          <div className='text-center mb-12'>
            <h1
              className='text-4xl font-bold text-green mb-4'
              ref={ref}
              id='header'
            >
              NUESA Leadership Team
            </h1>
            <p className='text-xl text-gray-700 max-w-4xl mx-auto mb-8'>
              Meet the dedicated individuals who lead the Nigerian Universities
              Engineering Students Association at ABUAD, working to create
              opportunities and foster excellence among engineering students.
            </p>
          </div>

          {activeTab === "past" && (
            <div className='flex justify-center mb-8'>
              <div className='bg-gray-100 p-1 rounded-lg'>
                <button
                  onClick={() => setActiveTab("current")}
                  className={`px-4 py-3 rounded-md font-medium transition-all ${
                    activeTab === "current"
                      ? "bg-green text-white shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Current Executives
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`px-4 py-3 rounded-md font-medium transition-all ${
                    activeTab === "past"
                      ? "bg-green text-white shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Past Excos
                </button>
              </div>
            </div>
          )}

          {activeTab === "current" && (
            <div>
              <div className='text-center mb-12'>
                <h2 className='text-3xl font-bold text-green mb-4'>
                  Current Leadership
                </h2>
                <h3 className='text-2xl font-semibold text-green-700 mb-4'>
                  Executive Committee 2025-2026
                </h3>
                <p className='text-lg text-gray-700 max-w-4xl mx-auto'>
                  Our current executive committee is committed to serving the
                  interests of all engineering students at ABUAD and creating
                  opportunities for academic and professional growth.
                </p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12'>
                {currentExecutivesData.map((executive, index) => (
                  <ExecutiveCard
                    key={index}
                    executive={executive}
                    index={index}
                    showAchievementsButton={true}
                  />
                ))}
              </div>

              <div className='flex justify-center mt-16 mb-8'>
                <div className='bg-gray-100 p-1 rounded-lg'>
                  <button
                    onClick={() => setActiveTab("current")}
                    className={`px-4 py-3 rounded-md font-medium transition-all ${
                      activeTab === "current"
                        ? "bg-green text-white shadow-sm"
                        : "text-gray-700 hover:text-gray-900 cursor-pointer"
                    }`}
                  >
                    Current Executives
                  </button>
                  <button
                    onClick={pastButton}
                    className={`px-4 py-3 rounded-md font-medium transition-all ${
                      activeTab === "past"
                        ? "bg-green text-white shadow-sm"
                        : "text-gray-700 hover:text-gray-900 cursor-pointer"
                    }`}
                  >
                    Past Excos
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "past" && (
            <div>
              <div className='flex justify-center mb-8'>
                <div className='flex items-center space-x-4'>
                  <Calendar className='size-5 text-green-700' />
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className='border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none'
                  >
                    {pastExecutivesByYear.map((yearData) => (
                      <option key={yearData.year} value={yearData.year}>
                        {yearData.year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {pastExecutivesByYear
                  .find((yearData) => yearData.year === selectedYear)
                  ?.executives.map((executive, index) => (
                    <ExecutiveCard
                      key={index}
                      executive={executive}
                      index={index}
                      showAchievementsButton={false}
                    />
                  ))}
              </div>
            </div>
          )}

          <div className='mt-16 text-center'>
            <div className='bg-green-50 rounded-2xl p-8 border border-green-100'>
              <h2 className='text-2xl font-bold text-green mb-4'>
                Interested in Leadership?
              </h2>
              <p className='text-gray-700 mb-6 max-w-2xl mx-auto'>
                Join our executive team and make a difference in the engineering
                community. Elections are held annually, and we welcome
                passionate students who want to lead.
              </p>
              <button className='bg-green text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors'>
                Learn About Elections
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};
export default Executive;
