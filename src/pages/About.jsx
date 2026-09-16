import React from "react";
import {
  Overview,
  MissionVision,
  Disciplines,
  PresidentMessage,
} from "../components/About";
import useSEO from "../hooks/useSEO";

const About = () => {
  useSEO({
    title: "About Us",
    description: "Learn more about NUESA ABUAD, our founding history, mission, vision, engineering departments, and a message from our chapter President."
  });

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100'>
      <Overview />
      <MissionVision />
      <Disciplines />
      <PresidentMessage />
    </div>
  );
};

export default About;
