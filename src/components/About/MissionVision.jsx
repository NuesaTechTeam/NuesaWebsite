import React from "react";
import { Target, Sparkles, Users, GraduationCap } from "lucide-react";

const cardData = [
  {
    title: "Mission",
    text: "Empowering students to lead in engineering through excellence, leadership, and vision.",
    icon: <Target className="w-8 h-8 text-green-600 mb-3" />,
  },
  {
    title: "Innovation",
    text: "Encouraging creativity and problem-solving to build practical solutions for society.",
    icon: <Sparkles className="w-8 h-8 text-green-600 mb-3" />,
  },
  {
    title: "Community",
    text: "Fostering a sense of belonging and collaboration across all engineering disciplines.",
    icon: <Users className="w-8 h-8 text-green-600 mb-3" />,
  },
  {
    title: "Learning",
    text: "Promoting continuous academic growth and professional development opportunities.",
    icon: <GraduationCap className="w-8 h-8 text-green-600 mb-3" />,
  },
];

const MissionVision = () => {
  return (
    <section className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-green mb-10">
        Our Pillars
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-green-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              {card.icon}
              <h3 className="text-xl font-bold text-green-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-700 text-sm">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionVision;
