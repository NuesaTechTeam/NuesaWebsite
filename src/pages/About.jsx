import React from "react";
import {
  Overview,
  MissionVision,
  Disciplines,
  PresidentMessage,
} from "../components/About";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 space-y-24 px-6 md:px-12 py-12">
      <Overview />
      <MissionVision />
      <Disciplines />
      <PresidentMessage />
    </div>
  );
};

export default About;
