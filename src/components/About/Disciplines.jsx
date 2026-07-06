import React from "react";
import {
  FaCog,
  FaLaptopCode,
  FaBolt,
  FaCity,
  FaFlask,
  FaCogs,
  FaHeartbeat,
  FaPlane,
} from "react-icons/fa";
import { GiOilPump } from "react-icons/gi";

const disciplines = [
  {
    name: "Mechanical Engineering",
    icon: <FaCog className='text-green-700 text-3xl mb-3' />,
    description:
      "Focuses on the design, analysis, and manufacturing of mechanical systems.",
    courses: [
      "Mechanics of Machines",
      "Production Engineering",
      "Internal Combustion Engines",
      "Heat and Mass Transfer",
    ],
  },
  {
    name: "Civil Engineering",
    icon: <FaCity className='text-green-700 text-3xl mb-3' />,
    description:
      "Deals with the planning, design, and construction of infrastructure like roads, bridges, and buildings.",
    courses: [
      "Theory of Structures",
      "Hydraulics Engineering",
      "Structural Engineering",
      "Geotechnical Engineering",
    ],
  },
  {
    name: "Electrical/Electronics Engineering",
    icon: <FaBolt className='text-green-700 text-3xl mb-3' />,
    description:
      "Covers the generation, transmission, and utilization of electrical power and electronic systems.",
    courses: [
      "Circuit Theory",
      "Control Theory and Systems",
      "Digital Electronics",
      "Embedded Systems",
    ],
  },
  {
    name: "Computer Engineering",
    icon: <FaLaptopCode className='text-green-700 text-3xl mb-3' />,
    description:
      "Combines computer science and electrical engineering to develop computer systems and hardware.",
    courses: [
      "Computer Architecture",
      "Prototyping Techniques",
      "Control Theory and Systems",
      "Artificial Neural Network",
    ],
  },
  {
    name: "Petroleum Engineering",
    icon: <GiOilPump className='text-green-700 text-3xl mb-3' />,
    description:
      "Focuses on the exploration, extraction, and production of oil and gas.",
    courses: [
      "Reservoir Engineering",
      "Drilling Engineering",
      "Petroleum Geology",
      "Production Technology",
    ],
  },
  {
    name: "Mechatronics Engineering",
    icon: <FaCogs className='text-green-700 text-3xl mb-3' />,
    description:
      "Integrates mechanical, electrical, and computer engineering to design smart systems.",
    courses: [
      "Robotics",
      "Control Systems",
      "Embedded Systems",
      "Automation",
    ],
  },
  {
    name: "Biomedical Engineering",
    icon: <FaHeartbeat className='text-green-700 text-3xl mb-3' />,
    description:
      "Applies engineering principles to the medical field for healthcare solutions.",
    courses: [
      "Biomedical Instrumentation",
      "Thermodynamics of Biological Systems",
      "Biomedical Electronics Engineering",
      "Anatomy for Engineers",
    ],
  },
  {
    name: "Aeronautical Engineering",
    icon: <FaPlane className='text-green-700 text-3xl mb-3' />,
    description:
      "Specializes in the design, development, and testing of aircraft and related systems.",
    courses: [
      "Aerodynamics",
      "Flight Mechanics",
      "Propulsion Systems",
      "Aircraft Structures",
    ],
  },
  {
    name: "Chemical Engineering",
    icon: <FaFlask className='text-green-700 text-3xl mb-3' />,
    description:
      "Applies physical sciences, life sciences, and mathematics to convert raw materials into valuable products.",
    courses: [
      "Transport Phenomena",
      "Process Control",
      "Reaction Engineering",
      "Separation Processes",
    ],
  },
];

const Disciplines = () => {
  return (
    <section className='px-4 py-16 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-950 mb-3'>
          Engineering Departments
        </h2>
        <p className='mx-auto mb-10 max-w-2xl text-gray-700'>
          NUESA serves students across the college, so the page should make each department easy to scan without making every card compete for attention.
        </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left'>
        {disciplines.map((dept, index) => (
          <div
            key={index}
            className='rounded-lg border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-green-300'
          >
            <div className='text-center'>{dept.icon}</div>
            <h4 className='text-lg font-bold text-green-800 mb-2 text-center'>
              {dept.name}
            </h4>
            <p className='text-gray-700 mb-3 text-sm text-center'>
              {dept.description}
            </p>
            <h5 className='text-green-700 font-semibold mb-1 text-sm'>
              Key Courses:
            </h5>
            <ul className='list-disc list-inside text-gray-600 text-sm space-y-1'>
              {dept.courses.map((course, idx) => (
                <li key={idx}>{course}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Disciplines;
