import React, { useState, useEffect } from "react";
import {
  Home,
  ArrowLeft,
  Search,
  Wrench,
  Cog,
  AlertTriangle,
  Zap,
  BookOpen,
  Users,
  Calendar,
  Mail,
  RefreshCw,
  Construction,
} from "lucide-react";

const Error = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const quickLinks = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Academics", path: "/academics" },
    { icon: Users, label: "About Us", path: "/about" },
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: Mail, label: "Contact", path: "/contact" },
  ];

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center py-8 px-1">
      <div className="max-w-4xl mx-auto text-center">
        

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Cog className={`text-green-600 ${isAnimating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} size={40} />
            <Cog className={` text-green-600 -ml-6 ${isAnimating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s', animationDirection: 'reverse' }} size={34} />
          </div>
          
          {/* Main 404 Text */}
          <div className="relative z-10">
            <h1 className="text-8xl md:text-9xl font-bold text-green mb-4 opacity-90">
              4<span className="relative">
                0
                <Wrench className="absolute top-2 left-1/2 transform -translate-x-1/2 text-green-600" size={20} />
              </span>4
            </h1>
            <div className="flex items-center justify-center mb-6">
              <Construction className="text-orange-500 mr-1" size={26} />
              <span className="text-lg font-semibold text-gray-700">SYSTEM MALFUNCTION DETECTED</span>
              <Construction className=" text-orange-500 ml-1" size={26} />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white rounded-xl p-8 px-2 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className=" text-orange-500 mr-1" size={30} />
            <h2 className="text-2xl font-bold text-gray-900">Circuit Breaker Activated</h2>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Oops! It looks like you've encountered a <span className="font-semibold text-green">routing error</span>. 
            The page you're looking for seems to have been disconnected from our main circuit.
          </p>
          
          {/* Engineering-themed explanation */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Zap className="text-green-600 mt-0.5 mr-3 flex-shrink-0" size={16} />
              <div className="text-left">
                <p className="text-sm text-green font-medium mb-1">Engineering Diagnosis:</p>
                <p className="text-sm text-green-700">
                  The requested URL pathway could not be established. This might be due to:
                  a broken link, mistyped address, or a page that's currently under maintenance.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button 
              onClick={handleGoBack}
              className="group bg-green hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center">
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={14} />
                Go Back
              </span>
            </button>
            
            <button 
              onClick={handleRefresh}
              className="group bg-white hover:bg-gray-50 text-green-700 border-2 border-green-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center">
                <RefreshCw className="mr-2 group-hover:rotate-180 transition-transform duration-300" size={16} />
                Refresh
              </span>
            </button>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center">
            <Search className=" mr-2 text-green" size={18} />
            Quick Navigation
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                className="group flex flex-col items-center p-4 rounded-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = link.path}
              >
                <link.icon className=" text-green mb-2 group-hover:scale-110 transition-transform duration-300" size={18} />
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors duration-300">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Need help? Our engineering support team is here to assist you.
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="text-green hover:text-green-700 font-medium text-sm mt-2 transition-colors duration-300"
          >
            Contact Technical Support →
          </button>
        </div>

        {/* Floating Animation Elements */}
        <div className="fixed top-20 left-10 opacity-20">
          <Cog className="text-green-400 animate-spin" style={{ animationDuration: '10s' }} size={30} />
        </div>
        <div className="fixed bottom-10 right-10 opacity-20">
          <Wrench className="text-green-400 animate-bounce" size={28} />
        </div>
      </div>
    </div>
  );
};
export default Error;
