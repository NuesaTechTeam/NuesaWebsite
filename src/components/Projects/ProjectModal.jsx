import React from "react";

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4'>
      <div className='bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn'>
        <img
          src={project.image}
          alt={project.title}
          className='w-full h-64 object-cover rounded-t-xl'
        />
        <div className='p-6'>
          <h2 className='text-2xl font-bold text-green-700 mb-3'>
            {project.title}
          </h2>
          <p className='text-gray-700 text-sm leading-relaxed'>
            {project.summary}
          </p>
          <button
            onClick={onClose}
            className='mt-6 bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
