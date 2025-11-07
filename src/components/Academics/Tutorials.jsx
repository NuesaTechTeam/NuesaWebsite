import React, { useState } from "react";
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
  "All",
  "Civil Engineering",
  "Computer Engineering",
  "Aeronautical Engineering",
  "Chemical Engineering",
  "Petroleum Engineering",
  "Mechanical Engineering",
  "Mechatronics Engineering",
  "Electrical Engineering",
  "Biomedical Engineering",
];

  const filtered = selectedDept === "All"
    ? tutorialData
    : tutorialData.filter(tut => tut.department === selectedDept);

  return (
    <section className="max-w-7xl mx-auto py-12 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
        Tutorials
      </h2>
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto text-sm">
        Access tutorials provided and gotten from Youtube.
      </p>

      <Filters
        filterOptions={departments}
        selected={selectedDept}
        setSelected={setSelectedDept}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tutorial, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaChalkboardTeacher className="text-green-600 text-xl" />
              <h3 className="text-lg font-semibold text-green-800">
                {tutorial.title}
              </h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">{tutorial.description}</p>
            <p className="text-xs text-gray-500">
              👤 {tutorial.tutor} | {tutorial.date}
            </p>
            <a
              href={tutorial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-green-600 text-sm font-medium hover:underline"
            >
              Watch Tutorial →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tutorials;
