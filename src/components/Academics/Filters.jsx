import React from "react";

const Filters = ({ filterOptions, selected, setSelected }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {filterOptions.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selected === option
              ? "bg-green-600 text-white shadow-sm"
              : "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-400 hover:bg-green-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Filters;
