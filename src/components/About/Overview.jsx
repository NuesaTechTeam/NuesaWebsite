import React from "react";

const Overview = () => {
  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center">
      {/* Left: Image */}
      <div className="w-full md:w-1/2">
        <div className="w-full h-64 md:h-80 bg-gray-200 rounded-xl flex items-center justify-center">
          <span className="text-gray-400">[ Image Placeholder ]</span>
        </div>
      </div>

      {/* Right: Text */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-green mb-6">
          Who We Are
        </h2>
        <p className="text-gray-700 text-base md:text-lg mb-4">
          NUESA ABUAD Chapter is a student-led organization that represents all engineering students at Afe Babalola University. 
          We serve as a bridge between students, faculty, and industry professionals, creating opportunities for growth and development.
        </p>
        <p className="text-gray-700 text-base md:text-lg">
          Our association organizes technical workshops, industry tours, competitions, and social events that 
          enhance the academic experience and prepare students for successful careers in engineering.
        </p>
        {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 text-center">
            <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-green">1K+</h3>
                <p className="text-green font-medium text-sm">Members</p>
            </div>
            <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-green">9</h3>
                <p className="text-green font-medium text-sm">Departments</p>
            </div>
            <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-green">10</h3>
                <p className="text-green font-medium text-sm">Annual Events</p>
            </div>
            <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-green">13</h3>
                <p className="text-green font-medium text-sm">Years Active</p>
            </div>
            </div>
      </div>
    </section>
  );
};

export default Overview;
