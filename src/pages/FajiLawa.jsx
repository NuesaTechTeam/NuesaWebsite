import { useEffect, useState } from "react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import useSEO from "../hooks/useSEO";

const RESERVATION_URL =
  "https://wa.me/2348102841732?text=Hello%2C%20I%27d%20like%20to%20reserve%20a%20seat%20for%20F%C3%80%C3%81J%C3%8D%20LAWA%20on%2031st%20October%202026.";

const FajiLawa = () => {
  useSEO({
    title: "FÀÁJÍ LAWA",
    description:
      "FÀÁJÍ LAWA — a NUESA ABUAD event happening 31st October 2026 at Alfa Belgore Hall. Save the date and stay tuned for full details.",
  });

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
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#2d1616] to-black"></div>
        <div
          className="absolute w-50 h-96 bg-red-600 rounded-full opacity-10 blur-3xl transition duration-1000 ease-out"
          style={{
            left: `${mousePosition.x / 10}px`,
            top: `${mousePosition.y / 10}px`,
          }}
        ></div>
      </div>

      {/* Hero */}
      <section className="relative z-10 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div
              className={`transform transition duration-1000 ${
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
                  FÀÁJÍ <span className="text-red-500">LAWA</span>
                </h1>
                <div className="flex items-center space-x-4 text-lg text-white/80 mb-8 font-cinzel">
                  <span className="flex items-center">ENJOY</span>
                  <span className="text-red-500">•</span>
                  <span className="flex items-center">CONNECT</span>
                  <span className="text-red-500">•</span>
                  <span className="flex items-center">CELEBRATE</span>
                </div>
              </div>

              <p className="text-xl leading-relaxed text-gray-300 mb-12 font-lora">
                Placeholder description for FÀÁJÍ LAWA.{" "}
                <span className="text-red-500 font-semibold italic">
                  Full details will be announced soon.
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <a
                  href={RESERVATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex font-neue items-center bg-gradient-to-r from-red-600 to-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                >
                  RESERVE YOUR SEAT
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    31ST OCTOBER, 2026
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Alfa Belgore Hall
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Visual Element */}
            <div
              className={`transform transition duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative">
                {/* Main visual container */}
                <div className="relative bg-gradient-to-br from-black via-[#1a0d0d] to-black p-4 rounded-2xl border border-red-700/70 shadow-2xl">
                  <img
                    src="/images/events/faji-lawa.jpg"
                    alt="FÀÁJÍ LAWA poster"
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

      {/* Final CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-black/50 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 font-playfair">
            The Night Awaits Your <span className="text-red-500">Presence</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-lora">
            Placeholder description for FÀÁJÍ LAWA. Limited seats available —
            secure your place early.
          </p>
          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex font-neue items-center bg-white text-black px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            RESERVE YOUR SEAT
            <ArrowRight className="ml-3 w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-800/20 px-6 py-8">
        <div className="max-w-6xl mx-auto text-center text-red-500/70">
          <p className="font-lora">&copy; 2026 NUESA ABUAD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FajiLawa;
