import React from "react";

const ProjectCard = ({ title, summary, image, year }) => {
  return (
    <div className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300'>
      <img
        src={image || "https://via.placeholder.com/400x220"}
        alt={title}
        className='w-full h-48 object-cover'
      />
      <div className='p-4 flex flex-col justify-between min-h-[140px]'>
        <div>
          <h3 className='text-green-700 font-semibold text-lg mb-1'>{title}</h3>
          <p className='text-gray-700 text-sm line-clamp-2'>{summary}</p>
        </div>
        <p className='text-sm text-gray-500 mt-3'>{year}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
