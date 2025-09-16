import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import Filters from "./Filters";

const pastPapers = [
  {
    course: "100L PHY103 First Semester Tutorial Questions",
    level: "100L",
    link: "https://drive.google.com/uc?export=download&id=1U2nlCFukKbbcHJpxVP1LOeX6orhB8JID",
  },
  {
    course: "100L First Semester General PQ 1",
    level: "100L",
    link: "https://drive.google.com/uc?export=download&id=13V22nqSyGUX9NTq3LFB5zWuz6OydnLUK",
  },
  {
    course: "100L First Semester General PQ 2",
    level: "100L",
    link: "https://drive.google.com/uc?export=download&id=1yTSo9oViRa75Z8BZ0gIyxCOwMlS4Qwjk",
  },
  {
    course: "AESA 100L PQ",
    level: "100L",
    link: "https://drive.google.com/uc?export=download&id=10xqC40YJNqhNEO3ywFv-0lEo7PW9yv6N",
  },
  {
    course: "PHY 102 CBT EXAMINATION QUESTIONS 2014-2015",
    level: "100L",
    link: "https://docs.google.com/document/d/1BizPWsiU5zs2uQGCMis-L6SC13aowrWx/export?format=pdf",
  },
  {
    course: "NEW CHM 102 PQ",
    level: "100L",
    link: "https://drive.google.com/uc?export=download&id=1EVv552IHF4LHtkuNrhH4LpB89l4d-834",
  },
  {
    course: "CHM 102 PQ",
    level: "100L",
    link: "https://drive.google.com/uc?export=download&id=1lAyi796BuvfB9vm5lioR8hIgVQf8PWZB",
  },
  {
    course: "100L Second Semester General PQ",
    level: "100L",
    link: "https://drive.google.com/uc?export=download&id=13VgGLJstDyln9H_xEcZ0Pn9ZxNpGHI1Z",
  },
  {
    course: "200L First Semester General PQ",
    level: "200L",
    link: "https://drive.google.com/uc?export=download&id=1YaVCAQjB0SvHEepH-fsHJyJrVajeLqFJ",
  },
  {
    course: "200L Second Semester PQ",
    level: "200L",
    link: "https://drive.google.com/uc?export=download&id=1XzkPvocuv9WUoFVclpTCLpA-HfvJVELT",
  },
  {
    course: "AESA PQ First Semester",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1oqMbK8ehiXgkn1H2kxeawkzgkuugGGAU",
  },
  {
    course: "Aeronautics PQ Second Semester",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1jxHoJ8VqIrHmizbHqC9oW6-AVC3fgyx4",
  },
  {
    course: "Aeronautics PQ First Semester",
    level: "400L",
    link: "https://drive.google.com/uc?export=download&id=1mcqI1XmYrBdc7VpRriv5JEwPhkCaZYIj",
  },
  {
    course: "Aeronautics PQ First Semester",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=17iGCOIFd-CuICMDQYdX-0x5iYnmzvGfn",
  },
  {
    course: "Aeronautics PQ Second Semester",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1BcZQ9QIT91nki8YyZWjWh9AAFNITSA_p",
  },
  {
    course: "BIOMED First Semester PQ",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1YohirzeR6_K1dyK768FwpBfUBHtRMIzZ",
  },
  {
    course: "BIOMED First Semester PQ 001",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1qLGjMfNmHPL9kzKD6m91wJfcbMkOj5B0",
  },
  {
    course: "BIOMED Second Semester PQ",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1w5jB7CHiIr4vNgHiLZrfTQm1pjY8QxWc",
  },
  {
    course: "BIOMED 400L First Semester PQ",
    level: "400L",
    link: "https://drive.google.com/uc?export=download&id=1YqgsP5X9lolgGcZUc6KVad_1sSd9kLks",
  },
  {
    course: "BIOMED 500L First Semester PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1_BsaMGAJ7lSH-HCWdQ4G1X3t6CH6gsj_",
  },
  {
    course: "BIOMED 500L Second Semester PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1dDOPzyVwEYUFJBOjX1Vedh4CTJhFauc8",
  },
  {
    course: "Chemical Engineering First Semester PQ",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1ETvC5BGLSG0f0F0JGsEI0B2JIVZEun2D",
  },
  {
    course: "Chemical Engineering Second Semester PQ 001",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1XRl8YwhIfqDcG7_wzsl7SHgYXCV77kUC",
  },
  {
    course: "Chemical Engineering Second Semester PQ 002",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1Ou-WPspLZn_FRqsZyPyh7Gq8ED5c9Msf",
  },
  {
    course: "Chemical Engineering 400L First Semester PQ",
    level: "400L",
    link: "https://drive.google.com/uc?export=download&id=1Tpztuu7gwGhr48uLTI85-VxgHYr_T9yO",
  },
  {
    course: "Chemical Engineering 500L First Semester PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1DphK_HSFZCP-XbcUzxe9AVQ1OETlyxGU",
  },
  {
    course: "Chemical Engineering 500L Second Semester PQ 001",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1XqyLfMaVsC5Bih-o7iThZzvGAvgcffVJ",
  },
  {
    course: "Chemical Engineering 500L Second Semester PQ 002",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1QWgBfx45KGj7-SZ9Rpp8oZlc3Iw99m2u",
  },
  {
    course: "Civil Engineering 300L First Semester PQ 001",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1xdsm3hFmZgcyFproXxQAsFqbbq5cpLxY",
  },
  {
    course: "Civil Engineering 300L First Semester PQ 002",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1dyC5Fv9WO6R_mp_70M8h3vQ93Q_JdNuP",
  },
  {
    course: "Civil Engineering 300L Second Semester PQ",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1XyhYmmtGa8d4M7xypwskhM_E5w9c8lU_",
  },
  {
    course: "Civil Engineering 400L First Semester PQ",
    level: "400L",
    link: "https://drive.google.com/uc?export=download&id=1XyhYmmtGa8d4M7xypwskhM_E5w9c8lU_",
  },
  {
    course: "Civil Engineering 500L First Semester PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=11XtqkyWnMuCdUY-M1yvSabJ3EHtW38kA",
  },
  {
    course: "Civil Engineering 500L Second Semester PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1hXujLsOkZi-7vWlcsJziYf82DaBISpGa",
  },
  {
    course: "Computer Engineering 400L PQ",
    level: "400L",
    link: "https://drive.google.com/uc?export=download&id=1B3KOmXqMC3QvEPNGfm8Yv6T0ypbt1ovn",
  },
  {
    course: "Computer Engineering 500L PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1TTJ7ce2GR4CdqA0mkDV4WP69DU3Vzg1X",
  },
  {
    course: "Computer Engineering 500L PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1TTJ7ce2GR4CdqA0mkDV4WP69DU3Vzg1X",
  },
  {
    course: "Electrical Engineering 300L First Semester PQ",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=16f9gq4al8RqCwBtCcOTYyALdLefeTPNU",
  },
  {
    course: "Electrical Engineering 300L Second Semester PQ",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1PZ3eq9zwsqZtvyRlzIgWmtoA8WbXUKDi",
  },
  {
    course: "Electrical Engineering 400L PQ",
    level: "400L",
    link: "https://drive.google.com/uc?export=download&id=1nU6IjdvSJmq5q8UThWBqIkZfK0rVQvna",
  },
  {
    course: "Electrical Engineering 500L First Semester PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1tSIfldG9po_vhG-qtKV66dpFmdupRucU",
  },
  {
    course: "Electrical Engineering 500L Second Semester PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1KCbFWQQcyJDPHez26NIw5jnTnh-gcb_R",
  },
  {
    course: "Mechanical Engineering 300L Second Semester PQ",
    level: "300L",
    link: "https://drive.google.com/uc?export=download&id=1bmGZ5Y0MTcNb1dC-Ylej5q2EFTLgx9LI",
  },
  {
    course: "Mechanical Engineering 400L PQ",
    level: "400L",
    link: "https://drive.google.com/uc?export=download&id=10O11RGjyr-1g00-btYHBtw8xPfXcVuva",
  },
  {
    course: "Mechatronics Engineering 400L PQ",
    level: "400L",
    link: "https://drive.google.com/uc?export=download&id=1sJTAgRzXwBJEFaA7mTk3QyG1iNSm5U8y",
  },
  {
    course: "Mechatronics Engineering 500L First Semester PQ 1",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1GYuQtSwV67NU8JVvdtqu_8F0_Q2X7dCX",
  },
  {
    course: "Mechatronics Engineering 500L First Semester PQ 2",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1q3YnJivgi52wxmvUSMHmcOBjI_kwfdbv",
  },
  {
    course: "Mechatronics Engineering 500L Second Semester PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1PI_MqJKnjOPhozYiV8Y6WOumNyqf7KvV",
  },
  {
    course: "Petroleum Engineering 400L PQ",
    level: "400L",
    link: "https://drive.google.com/uc?export=download&id=1Ccoh79TjtkEmpEWTSWgDeCtkaAj34ivM",
  },
  {
    course: "Petroleum Engineering 500L First Semester PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1aeouE_VbLOHf5F8Tllcr5VoEzylDSxOD",
  },
  {
    course: "Petroleum Engineering 500L Second Semester PQ",
    level: "500L",
    link: "https://drive.google.com/uc?export=download&id=1J2yRSpf4s1GxnYpCbEXROkLcmB2tcyPq",
  },
];

const PastPapers = () => {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const levels = ["All", "100L", "200L", "300L", "400L", "500L"];

  const filtered = selectedLevel === "All"
    ? pastPapers
    : pastPapers.filter(paper => paper.level === selectedLevel);

  return (
    <section className="max-w-7xl mx-auto py-12 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
        Past Questions & Solutions
      </h2>
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto text-sm">
        Browse past exam papers across various levels and engineering courses.
      </p>

      <Filters
        filterOptions={levels}
        selected={selectedLevel}
        setSelected={setSelectedLevel}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((paper, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaFilePdf className="text-red-600 text-xl" />
              <h3 className="text-lg font-semibold text-green-800">
                {paper.course}
              </h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Level: {paper.level}
            </p>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-green-700 font-medium hover:underline"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PastPapers;
