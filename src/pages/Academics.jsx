import React from "react";
import Tutorials from "../components/Academics/Tutorials";
import PastPapers from "../components/Academics/PastPapers";
import Notes from "../components/Academics/Notes";
import { TimeTables } from "../components/Academics";

const Academics = () => {
  return (
    <div className="min-h-screen">
      <header className="text-center py-12 px-4 bg-green-100">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-3">
           NUESA Academic Resources
        </h1>
        <p className="text-gray-700 text-sm max-w-2xl mx-auto">
          Empowering students through structured learning support: tutorials, past papers, and detailed notes.
        </p>
        <div className="w-20 h-1 bg-green-500 mt-4 mx-auto rounded"></div>
      </header>

      <main className="space-y-20">
        <TimeTables />
        <Tutorials />
        <PastPapers />
        <Notes />
      </main>
    </div>
  );
};

export default Academics;
