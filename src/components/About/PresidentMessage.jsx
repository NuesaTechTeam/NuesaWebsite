import React from "react";
import { Link } from "react-router-dom";

const PresidentMessage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <div className="rounded-lg overflow-hidden border border-green-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <img
            src="/images/about/gregory.jpeg"
            alt="NUESA President"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Message Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-950 dark:text-white mb-6">
          President's Message
        </h2>

        <div className="max-w-prose text-gray-700 dark:text-gray-200 text-base md:text-lg leading-relaxed space-y-4">
          <p>Dear Engineering Students,</p>

          <p>
            It is with great honour and a deep sense of responsibility that I
            welcome you to a new chapter of NUESA, Afe Babalola University.
          </p>

          <p>
            As your President, I believe leadership is more than occupying a
            position; it is about service, representation, and creating
            opportunities for the people we serve.
          </p>

          <p className="font-semibold italic text-green-700 dark:text-green-400">
            Our administration is built on a clear vision of Continuity, Growth
            and Innovation.
          </p>

          <p>
            We are committed to building on the progress of previous
            administrations while introducing new ideas that will strengthen our
            academic, professional, social and welfare experiences as
            engineering students. We want a NUESA that communicates better,
            creates meaningful opportunities, embraces innovation, and ensures
            that every student has a voice.
          </p>

          <p>
            However, this vision cannot be achieved by the executive council
            alone. NUESA belongs to all of us. Your ideas, participation and
            support will be essential in making this administration successful.
          </p>

          <p>
            There will be challenges, but our commitment remains to serve with
            purpose, remain accountable, and leave NUESA better than we found
            it.
          </p>

          <p>
            Together, let us build an engineering community defined by
            Continuity, Growth and Innovation.
          </p>

          <p>The future of the college is ours to build.</p>

          <div className="mt-6 font-medium">
            <p>Gregory Akidima</p>
            <p>President, NUESA ABUAD</p>
          </div>
        </div>

        <Link to="/executives">
          <button className="mt-6 bg-green text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-green-dark">
            Meet Other Executives
          </button>
        </Link>
      </div>
      </div>
    </section>
  );
};

export default PresidentMessage;
