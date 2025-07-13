import React from "react";
import ProjectCarousel from "./ProjectCarousel";

const ongoing = [
  {
    title: "NUESA Engineering Hub Mobile App",
    summary:
      "Your Engineering Companion in the Digital Age.\n\nThe NUESA App is a powerful academic companion tailored specifically for students of the College of Engineering. Designed to simplify campus life, it brings together essential academic tools and communication features in one seamless platform.\n\nKey Features:\n\n🗓️ Personalized academic schedule\n📚 Lecture notes organized by course\n❓ Access to past questions for exam preparation\n🤖 AI-generated practice questions based on materials and past exams\n📈 Smart revision support for active learning\n\nWhether you're attending lectures, revising for exams, or planning your study time, the NUESA App ensures you're always one step ahead — focused, prepared, and connected.",
    year: 2025,
    students: 2,
    image: "/images/projects/nuesa-app.jpg",
  },
  {
    title: "NUESA Website",
    summary:
      "The Digital Home of Engineering Students.\n\nThe NUESA website serves as an all-in-one hub for information, resources, and updates tailored to the needs of engineering students. Built to be accessible and student-friendly, it showcases everything from event details to academic tools.\n\nHighlights:\n\n📰 Latest NUESA announcements and press releases\n📚 Downloadable materials (notes, past questions, FYP templates)\n🗓️ Departmental timetables and event schedules\n🎓 NUESA leadership profiles and alumni highlights\n🧪 Project showcases and engineering blog posts\n📩 Contact and feedback form to reach NUESA directly\n\nStay informed, stay involved, stay inspired — all from your browser.",
    year: 2025,
    students: 2,
    image: "/images/nuesa-website.jpg",
  },

  // {
  //   title: "Common Room Lounge",
  //   summary: "Furnished lounge for engineering students.",
  //   year: 2022,
  //   students: 12,
  //   image: "/images/lounge.jpg",
  // },
  // {
  //   title: "Ventilation System",
  //   summary: "Fans installed across classrooms.",
  //   year: 2015,
  //   students: 3,
  //   image: "/images/fans.jpg",
  // },
];

const OngoingProjects = () => {
  return (
    <section className='max-w-7xl mx-auto pb-2'>
      <h2 className='text-2xl md:text-3xl font-bold text-center mb-8 text-green-700'>
        Ongoing Projects
      </h2>
      <ProjectCarousel projects={ongoing} />
    </section>
  );
};

export default OngoingProjects;
