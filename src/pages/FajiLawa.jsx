import { useEffect, useState } from "react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import useSEO from "../hooks/useSEO";
import ShufflingImage from "../components/ShufflingImage";

const RESERVATION_URL =
  "https://wa.me/2348102841732?text=Hello%2C%20I%27d%20like%20to%20reserve%20a%20seat%20for%20F%C3%80%C3%81J%C3%8D%20LAWA%20on%2031st%20October%202026.";

const POSTER_IMAGES = [
  "/images/events/faji-lawa.jpg",
  "/images/events/faji-lawa-2.jpg",
  "/images/events/faji-lawa-3.jpg",
];

const DESCRIPTION =
  "NIGHT OF ELEGANCE: DINNER DRESS CODE\n\nCome dressed to impress in your finest traditional attire! 💃🏾🕺🏾\n\n\nLadies and gentlemen, let's celebrate our culture and style in grand fashion. ✨";

const FajiLawa = () => {
  useSEO({
    title: "FÀÁJÍ LAWA",
    description:
      "FÀÁJÍ LAWA — Night of Elegance. Dinner dress code: come dressed to impress in your finest traditional attire. 31st October 2026 at Alfa Belgore Hall.",
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
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#2d2416] to-black"></div>
        <div
          className="absolute w-50 h-96 bg-amber-500 rounded-full opacity-10 blur-3xl transition duration-1000 ease-out"
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
                <div className="inline-block bg-amber-500 text-black px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  NUESA ABUAD PRESENTS
                </div>
                <h1 className="text-5xl lg:text-8xl font-bold mb-4 tracking-wider font-playfair">
                  FÀÁJÍ <span className="text-amber-400">LAWA</span>
                </h1>
                <div className="flex items-center space-x-4 text-lg text-white/80 mb-8 font-cinzel">
                  <span className="flex items-center">ENJOY</span>
                  <span className="text-amber-400">•</span>
                  <span className="flex items-center">CONNECT</span>
                  <span className="text-amber-400">•</span>
                  <span className="flex items-center">CELEBRATE</span>
                </div>
              </div>

              <p className="whitespace-pre-line text-xl leading-relaxed text-gray-300 mb-12 font-lora">
                {DESCRIPTION}
              </p>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <a
                  href={RESERVATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex font-neue items-center bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
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
                <div className="relative bg-gradient-to-br from-black via-[#1a1408] to-black p-4 rounded-2xl border border-amber-600/70 shadow-2xl">
                  <ShufflingImage
                    images={POSTER_IMAGES}
                    alt="FÀÁJÍ LAWA poster"
                    className="w-full aspect-[4/5]"
                    imgClassName="object-contain"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-amber-500 rotate-45"></div>
                <div className="absolute -bottom-4 max-sm:right-2 -right-4 w-8 h-8 border-2 border-amber-500 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-black/50 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 font-playfair">
            The Night Awaits Your <span className="text-amber-400">Presence</span>
          </h2>
          <p className="whitespace-pre-line text-xl text-gray-300 mb-8 font-lora">
            {DESCRIPTION}
          </p>
          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex font-neue items-center bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black px-6 py-3 rounded-lg font-bold text-lg transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
          >
            RESERVE YOUR SEAT
            <ArrowRight className="ml-3 w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-amber-800/20 px-6 py-8">
        <div className="max-w-6xl mx-auto text-center text-amber-500/70">
          <p className="font-lora">&copy; 2026 NUESA ABUAD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FajiLawa;
