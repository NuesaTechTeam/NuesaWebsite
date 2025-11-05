import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ArrowRight, Calendar, Star, Users } from 'lucide-react';

const Dinner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative px-3">
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#2d1616]  to-black"></div>
        <div
          className="absolute w-50 h-96 bg-red-600 rounded-full opacity-10 blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x / 10}px`,
            top: `${mousePosition.y / 10}px`,
          }}
        ></div>
      </div>

      {/* Header */}
      {/* <header className="relative z-10 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider">NUESA ABUAD</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-red-500 transition-colors">
              Events
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header> */}

      {/* Hero */}
      <section className="relative z-10 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="mb-6">
                <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  NUESA ABUAD PRESENTS
                </div>
                <h1 className="text-5xl lg:text-8xl font-bold mb-4 tracking-wider font-playfair">
                  CASA<span className="text-red-500">BLANCA</span>
                </h1>
                <div className="flex items-center space-x-4 text-lg text-white/80 mb-8 font-cinzel">
                  <span className="flex items-center">
                    {/* <Star className="w-5 h-5 text-red-500 mr-2" /> */}
                    HONOR
                  </span>
                  <span className="text-red-500">•</span>
                  <span className="flex items-center">
                    {/* <Star className="w-5 h-5 text-red-500 mr-2" /> */}
                    LEGACY
                  </span>
                  <span className="text-red-500">•</span>
                  <span className="flex items-center">
                    {/* <Star className="w-5 h-5 text-red-500 mr-2" /> */}
                    AMBITION
                  </span>
                </div>
              </div>

              <p className="text-xl leading-relaxed text-gray-300 mb-12 font-lora">
                Step into a world where honor meets sophistication, where
                legends are born, and where every moment is crafted with
                meticulous precision.{" "}
                <span className="text-red-500 font-semibold italic">
                  This is not just dinner—this is initiation into excellence.
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <a
                  href="https://dinner.nuesaabuad.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex font-neue items-center bg-gradient-to-r from-red-600 to-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                >
                  JOIN THE FAMIGLIA
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="flex space-x-6 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    29TH NOVEMBER, 2025
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Famiglia Only
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Visual Element */}
            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative">
                {/* Main visual container */}
                <div className="relative bg-gradient-to-br from-black via-[#1a0d0d] to-black p-4 rounded-2xl border border-red-700/70 shadow-2xl">
                  {/* Rose accent */}
                  {/* <div className="absolute top-4 right-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-80">
                    <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                  </div> */}

                  <img
                    src="/images/events/nuesa-dinner-2025.jpg"
                    alt="dinner poster"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-red-500 rotate-45"></div>
                <div className="absolute -bottom-4 max-sm:right-2 -right-4 w-8 h-8 border-2 border-red-500 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="relative z-10 px-6 py-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-playfair">
                Exclusive Network
              </h3>
              <p className="text-gray-400 font-lora">
                Connect with distinguished members of the NUESA community
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
              <p className="text-gray-400 font-lora">
                Immerse yourself in an atmosphere of sophistication and elegance
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Memorable Venue</h3>
              <p className="text-gray-400 font-lora">
                A carefully curated setting that embodies the Casablanca
                mystique
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Final CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-black/50 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 font-playfair">
            The Night Awaits Your <span className="text-red-500">Presence</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-lora">
            Limited seats available. Secure your place at the most anticipated
            dinner event of the year.
          </p>
          <a
            href="https://dinner.nuesaabuad.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex font-neue items-center bg-white text-black px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            RESERVE YOUR SEAT
            <ArrowRight className="ml-3 w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-800/20 px-6 py-8">
        <div className="max-w-6xl mx-auto text-center text-red-500/70">
          <p className="font-lora">
            &copy; 2025 NUESA ABUAD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

Dinner.propTypes = {}

export default Dinner