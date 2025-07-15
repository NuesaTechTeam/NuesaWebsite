import React from "react";
import { Link } from "react-router-dom";

const PresidentMessage = () => {
  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4 py-12">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <div className="rounded-xl overflow-hidden shadow-lg border border-green-100">
          <img
            src="/NuesaWebsite/images/about/nuesa-president.jpg"
            alt="NUESA President"
            className="w-full h-100 md:h-[32rem] object-cover object-top"
          />
        </div>
      </div>

      {/* Message Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
          President's Message
        </h2>

        <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4">
          <p>
            Dear Fellow Engineering Students,
          </p>

          <p>
            It is with great humility and a deep sense of responsibility that I welcome you to a new and exciting chapter in the life of our association. As your President, I consider it a privilege to serve you and to lead an administration that is committed to your growth, well-being, and success.
          </p>

          <p className="font-semibold italic text-green-700">
            This tenure is anchored on a clear vision: “Reformation: Sustaining Policies and Advancing Possibilities.”
          </p>

          <p>
            We are here to build on the strengths of past administrations while pushing boundaries to unlock new opportunities for every engineering student. From academic support and professional development to student welfare and vibrant campus life, this administration is focused on real impact.
          </p>

          <p>
            This website stands as one of many steps in that direction — a space designed to keep you informed, connected, and involved. Through it, we hope to bridge the gap between leadership and students, ensuring that everyone feels seen, heard, and valued.
          </p>

          <p>
            We invite you to be active participants in this journey. Share your ideas. Engage with our programs. Hold us accountable. The legacy we build is not about individuals, but about a community moving forward together.
          </p>

          <p>
            Here’s to a tenure marked by vision, progress, and unity.
          </p>

          <div className="mt-6 font-medium">
            <p>With all sincerity,</p>
            <p>Kienabere Alaibi Emmanuel</p>
            <p>President, NUESA</p>
            <p>Afe Babalola University, Ado-Ekiti</p>
            <p className="italic text-sm text-green-600">“Reformation: Sustaining Policies and Advancing Possibilities”</p>
          </div>

          <p>
            NUESA is more than a union — it is a family, a force, and a future. I encourage every student to get involved, contribute, and grow with us. Together, we engineer greatness.
          </p>
        </div>

        <Link to="/executives">
          <button className="mt-6 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-green-600 hover:to-teal-700 transition-all">
            Meet Other Executives
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PresidentMessage;
