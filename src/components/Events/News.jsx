import { Calendar, Newspaper } from "lucide-react";
import { newsArticles } from "../../lib/constants";
import { useState } from "react";

const News = () => {
  const [showNews, setShowNews] = useState(false)
  const [news, setNews] = useState(false)

  const handleClick = (news) => {
    setShowNews(true)
    setNews(news)
  }

  const hasNews = newsArticles && newsArticles.length > 0;

  const NoNewsCard = () => (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center'>
      <div className='mb-6'>
        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <Newspaper className="text-gray-500" size={20}/>
        </div>
        <h3 className='text-2xl font-bold text-gray-900 mb-3'>
          No News Available
        </h3>
        <p className='text-gray-600 leading-relaxed mb-6'>
          We're currently preparing exciting news and updates for our
          engineering community. Check back soon for the latest developments,
          achievements, and announcements!
        </p>
      </div>
      <div className='space-y-4'>
        <button className='bg-green hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'>
          Get Notified
        </button>
        <p className='text-sm text-gray-500'>
          Be the first to know when we publish new updates
        </p>
      </div>
    </div>
  );

  const NoNewsGrid = () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      <div className='md:col-span-2 lg:col-span-2'>
        <NoNewsCard />
      </div>

      <div className='space-y-6'>
        <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-dashed border-green-300 p-6 text-center'>
          <div className='text-green mb-2'>
            <svg
              className='w-8 h-8 mx-auto mb-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            <div className='text-sm font-medium'>Upcoming News</div>
          </div>
        </div>

        <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-dashed border-blue-300 p-6 text-center'>
          <div className='text-blue-600 mb-2'>
            <svg
              className='w-8 h-8 mx-auto mb-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5V7a9.966 9.966 0 0110-10z'
              />
            </svg>
            <div className='text-sm font-medium'>Stay Connected</div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <section className="py-15">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green mb-4">
            {hasNews ? "Latest News & Updates" : "News & Updates"}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {hasNews
              ? "Stay informed with the latest developments, achievements, and announcements from our engineering college"
              : "Your source for the latest developments, achievements, and announcements from our engineering college"}
          </p>
          <div className="w-24 h-1 bg-green mx-auto mt-8"></div>
        </div>

        {hasNews ? (
          <>
            {/* news grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {newsArticles.map((article, index) => (
                <article
                  key={article.id}
                  className={`group cursor-pointer ${
                    index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center ">
                          <div className="flex items-center space-x-1">
                            <Calendar className="size-5" />
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleClick(article)}
                        className="mt-4 bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
                      >
                        Read Full Article
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-10">
              <button className="bg-green hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                View All News Articles
              </button>
            </div>

            {/* Overlay */}
            {showNews && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                <div className="relative w-11/12 h-[78vh] bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Close button */}
                  <button
                    onClick={() => setShowNews(false)}
                    className="absolute top-1.5 right-2 bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    ✕
                  </button>

                  {/* PDF inside iframe */}
                  <iframe
                    src={news.link}
                    className="w-full h-full"
                    title="Full Article"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* No news fallback */}
            <NoNewsGrid />

            <div className="text-center mt-10">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-green hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  Subscribe to Updates
                </button>
                <button className="bg-white hover:bg-gray-50 text-green border-2 border-green px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  Contact Us
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Have news to share? We'd love to hear from you!
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default News;
