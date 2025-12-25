import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaChalkboardTeacher } from "react-icons/fa";
import Filters from "./Filters";

const tutorialData = [
  {
    title: "Signals and Systems",
    description: "Concepts in Signals & Systems play a very important role in many areas of engineering. Learn these concepts with properly designed lectures.",
    tutor: "Neso Academy",
    date: "2016",
    department: "Mechatronics Engineering",
    link: "https://youtube.com/playlist?list=PLBlnK6fEyqRhG6s3jYIU48CqsT5cyiDTO&si=cZL9MgkSiNIcKc2m",
  },
  {
    title: "Equivalent Resistance of Complex Circuits - Resistors In Series and Parallel Combinations",
    description: "This physics video provides a basic introduction into equivalent resistance.  It explains how to calculate the equivalent resistance of circuits with resistors in series and parallel combinations.  ",
    tutor: "The Organic Chemistry Tutor",
    date: "2017",
    department: "Computer Engineering",
    link: "https://youtu.be/kjW4H3fKi8o?si=PboMtisqGjmIhDVM",
  },
  {
    title: "Voltage Divider Circuit Explained!",
    description: "This physics video tutorial provides a basic introduction into voltage divider circuits.  It provides a simple formula to calculate the voltage across a resistor in a series circuit with two resistors in series with a battery.  it contains plenty of examples and practice problems.  It discusses the effect on the output voltage of a voltage divider circuit when a load resistor is placed in parallel with R2.  It discusses how to design a voltage divider circuit to meet certain requirements.",
    tutor: "The Organic Chemistry Tutor",
    date: "2017",
    department: "Computer Engineering",
    link: "https://youtu.be/JGXdi7XcQi8?si=BGMMXSN1cIJiS02t",
  },
  {
    title: "Current Dividers Explained!",
    description: "This physics video tutorial provides a basic introduction into the current divider circuit.  It explains how to calculate the current flowing through each resistor in a two-resistor parallel circuit using a simple formula given the total current entering the circuit.  It also includes examples with a parallel circuit with three resistors and one with four resistors in parallel.  The voltage across each resistor in a parallel circuit is the same and the currents flowing through each branch must add to the current entering the circuit based on Kirchoff's current law / junction rule.  This video contains plenty of examples and practice problems for you to master this concept.",
    tutor: "The Organic Chemistry Tutor",
    date: "2017",
    department: "Computer Engineering",
    link: "https://youtu.be/PpfOH_uBKCw?si=fJrv81IOJo4Yqxgs",
  },
  {
    title: "Kirchhoff's Current Law, Junction Rule, KCl Circuits",
    description: "This physics video tutorial provides a basic introduction into kirchoff's current law or junction rule.  It explains how to calculate the missing current flowing into or out of a junction.  A current flowing into the junction is given a positive sign and a current flowing out of a junction is given a negative sign.  This video contains plenty of examples and practice problems on kirchoff's junction rule for KCl circuits.",
    tutor: "The Organic Chemistry Tutor",
    date: "2018",
    department: "Computer Engineering",
    link: "https://youtu.be/Q39xQUlTGew?si=nltlUmfAllqqJSRO",
  },
  {
    title: "Kirchhoff's Voltage Law - KVL Circuits, Loop Rule & Ohm's Law",
    description: "This physics video tutorial provides a basic introduction into kirchoff's voltage law which states that the sum of all the voltages in a loop must add to zero.  This video explains how to solve kcl circuits by using kirchoff's loop rule to calculate the current flowing in a series circuit with multiple batteries / voltage sources.  This video also explains how to calculate the electric potential at every point using ohm's law.  This video contains plenty of examples and practice problems.",
    tutor: "The Organic Chemistry Tutor",
    date: "2017",
    department: "Computer Engineering",
    link: "https://youtu.be/6F_rmZ1nXFQ?si=DuytabhiSbnHfe80",
  },
  {
    title: "Superposition Theorem",
    description: "This electronics video tutorial provides a basic introduction into the superposition theorem.  It explains how to solve circuit problems with multiple voltage and current sources using the superposition theorem.",
    tutor: "The Organic Chemistry Tutor",
    date: "2020",
    department: "Computer Engineering",
    link: "https://youtu.be/EX52BuZxpQM?si=N7Q9cBa2dRDjwvXu",
  },
];

const Tutorials = () => {
  const [selectedDept, setSelectedDept] = useState("All");
  const departments = [
    "All", "Civil Engineering", "Computer Engineering", "Aeronautical Engineering", "Chemical Engineering", "Petroleum Engineering", "Mechanical Engineering", "Mechatronics Engineering", "Electrical Engineering", "Biomedical Engineering"
  ];

  const filtered = selectedDept === "All"
    ? tutorialData
    : tutorialData.filter(tut => tut.department === selectedDept);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: "spring", damping: 25, stiffness: 100 }
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-black text-green-800 mb-4 tracking-tight">
          Featured Tutorials
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-10">
          Handpicked learning paths from top engineering educators on YouTube.
        </p>

        <Filters
          filterOptions={departments}
          selected={selectedDept}
          setSelected={setSelectedDept}
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {filtered.map((tutorial, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group bg-white rounded-2xl shadow-xl shadow-green-900/5 p-8 border border-green-50 hover:border-green-200 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  <FaChalkboardTeacher className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors leading-tight">
                  {tutorial.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                {tutorial.description}
              </p>
              <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-8">
                <span className="bg-gray-50 px-2 py-1 rounded">👤 {tutorial.tutor}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{tutorial.date}</span>
              </div>
            </div>

            <motion.a
              href={tutorial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white px-6 py-3 rounded-xl text-sm font-black transition-all duration-300 shadow-sm border border-green-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Watch Lecture Series
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Tutorials;
