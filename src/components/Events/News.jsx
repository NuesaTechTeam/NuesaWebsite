import { Calendar } from "lucide-react";
import { newsArticles } from "../../lib/constants";

const News = () => {
  return (
    <section className='py-15'>
      <div className='max-w-7xl mx-auto'>
        {/* header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-green mb-4'>
            Latest News & Updates
          </h2>
          <p className='text-xl text-gray-700 max-w-3xl mx-auto'>
            Stay informed with the latest developments, achievements, and
            announcements from our engineering college
          </p>
          <div className='w-24 h-1 bg-green mx-auto mt-8'></div>
        </div>

        {/* news grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
          {newsArticles.map((article, index) => (
            <article
              key={article.id}
              className={`group cursor-pointer ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-2'>
                <div className='relative overflow-hidden'>
                  <img
                    src={article.image}
                    alt={article.title}
                    className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2'>
                    {article.title}
                  </h3>
                  <p className='text-gray-700 mb-4 leading-relaxed line-clamp-3'>
                    {article.excerpt}
                  </p>

                  <div className='flex items-center justify-between text-sm text-gray-500'>
                    <div className='flex items-center '>
                      <div className='flex items-center space-x-1'>
                        <Calendar className='size-5' />
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className='text-center mt-10'>
          <button className='bg-green hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'>
            View All News Articles
          </button>
        </div>
      </div>
    </section>
  );
};
export default News;
