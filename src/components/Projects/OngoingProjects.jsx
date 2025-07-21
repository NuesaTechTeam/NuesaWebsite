import React from "react";
import ProjectCarousel from "./ProjectCarousel";

const ongoing = [
{
  title: "NUESA Website",
  summary:
    "The \"Engineering Hub\" is an application to aid students in the college of engineering.\nIt has amazing features, which include, the academic schedule for students per session,\neasy access to notes and textbooks for various lectures, past questions, and,\nAI generated questions based on study materials and past questions that can be used\nto prepare for tests and examinations.",
  year: 2025,
  students: 2,
  image: "/images/projects/nuesa-app.jpg",
},
{
  title: "NUESA Website",
  summary:
    "The NUESA Website is designed to serve as a central platform for engineering students. It provides easy access to important information, resources, and updates that are relevant to their academic life.\n\nSome of the key features include the latest NUESA announcements, downloadable materials like notes, past questions, and final year project templates, as well as departmental timetables and event schedules. It also highlights NUESA leadership profiles, alumni activities, project showcases, and blog posts related to engineering.\n\nStudents can also use the website to contact NUESA directly or share feedback easily.",
  year: 2025,
  students: 2,
  image: "/images/projects/website.jpg",
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
