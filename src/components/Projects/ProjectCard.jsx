const ProjectCard = ({ title, summary, image, year, onOpen }) => {
  return (
    <article className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200 hover:border-green-300 dark:hover:border-green-700'>
      <img
        src={image}
        alt={title}
        className='h-48 w-full object-cover'
      />
      <div className='flex min-h-[190px] flex-col justify-between p-5'>
        <div>
          <p className='mb-2 text-sm font-medium text-gray-500 dark:text-gray-400'>{year}</p>
          <h3 className='mb-2 text-lg font-semibold text-gray-950 dark:text-white'>{title}</h3>
          <p className='line-clamp-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200'>
            {summary}
          </p>
        </div>

        <button
          type='button'
          onClick={onOpen}
          className='mt-5 inline-flex w-fit rounded-lg border border-green px-4 py-2 text-sm font-semibold text-green dark:text-green-400 transition-colors duration-200 hover:bg-green hover:text-white'
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
