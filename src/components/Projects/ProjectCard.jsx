const ProjectCard = ({ title, summary, image, year, onOpen }) => {
  return (
    <article className='overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors duration-200 hover:border-green-300'>
      <img
        src={image}
        alt={title}
        className='h-48 w-full object-cover'
      />
      <div className='flex min-h-[190px] flex-col justify-between p-5'>
        <div>
          <p className='mb-2 text-sm font-medium text-gray-500'>{year}</p>
          <h3 className='mb-2 text-lg font-semibold text-gray-950'>{title}</h3>
          <p className='line-clamp-3 text-sm leading-relaxed text-gray-700'>
            {summary}
          </p>
        </div>

        <button
          type='button'
          onClick={onOpen}
          className='mt-5 inline-flex w-fit rounded-lg border border-green px-4 py-2 text-sm font-semibold text-green transition-colors duration-200 hover:bg-green hover:text-white'
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
