import { useNavigate } from "react-router-dom";
import { blogPosts } from "../../lib/blogPosts"
import { Star, BookOpen, PenTool, Users, Eye, Sparkles, MessageCircle, Plus, Share2, ArrowRight } from "lucide-react";

const blogFeatures = [
  {
    icon: Star,
    title: "Featured Articles",
    description:
      "Handpicked blog posts covering the latest trends and insights in engineering",
    color: "bg-yellow-100 text-yellow-600",
    accent: "border-yellow-200",
  },
  {
    icon: BookOpen,
    title: "All Blogs",
    description:
      "Diverse collection of articles from students and curated online content",
    color: "bg-blue-100 text-blue-600",
    accent: "border-blue-200",
  },
  {
    icon: PenTool,
    title: "Student Articles",
    description:
      "Original content created by talented engineering students in our community",
    color: "bg-green-100 text-green-600",
    accent: "border-green-200",
  },
];

const stats = [
  { number: "15+", label: "Published Articles", icon: BookOpen },
  { number: "10+", label: "Student Writers", icon: Users },
  { number: "20", label: "Monthly Readers", icon: Eye },
];


const BlogHome = () => {

    const navigate = useNavigate();

    const handleBlogsButton = () => {
      navigate("/blog");
    };
  return (
    <section className='bg-white py-8 lg:px-4 border-t-1 border-green-200'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-4'>
            <PenTool className='w-5 h-5 text-green mr-2' />
            <span className='text-sm font-semibold text-green uppercase tracking-wide'>
              Knowledge Hub
            </span>
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Discover. Learn. <span className='text-green'>Share.</span>
          </h2>
          <p className='text-xl text-gray-700 max-w-3xl mx-auto'>
            Dive into our vibrant community of writers and readers. From
            cutting-edge tech insights to student experiences, find stories that
            inspire and inform.
          </p>
        </div>

        {/* stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100'
            >
              <div className='flex items-center justify-center mb-3'>
                <stat.icon className='w-6 h-6 text-green' />
              </div>
              <div className='text-3xl font-bold text-gray mb-1'>
                {stat.number}
              </div>
              <div className='text-gray-700'>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* features */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          {blogFeatures.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm border-2 ${feature.accent} hover:shadow-md transition-all duration-300 group`}
            >
              <div
                className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className='w-5 h-5' />
              </div>
              <h3 className='text-xl font-semibold text-green mb-2'>
                {feature.title}
              </h3>
              <p className='text-gray-700 leading-relaxed'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* posts */}
        <div className='bg-white rounded-2xl p-8 mb-12 shadow-sm border border-gray-100'>
          <div className='flex items-center justify-between mb-8'>
            <h3 className='text-2xl font-bold text-gray-900'>
              Latest from Our Community
            </h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {blogPosts.slice(0, 3).map((post, index) => (
              <div key={index} className='group cursor-pointer'>
                <div className='bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-xs font-medium text-green bg-green-100 px-2 py-1 rounded'>
                      {post.category}
                    </span>
                    {post.isFeatured && (
                      <Star className='w-4 h-4 text-yellow-500 fill-current' />
                    )}
                  </div>
                  <h4 className='font-semibold text-green mb-2 group-hover:text-green-700 transition-colors duration-200'>
                    {post.title}
                  </h4>
                  <div className='flex items-center justify-between text-sm text-gray-500'>
                    <span>By {post.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20'></div>
          <div className='absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16'></div>

          <div className='relative z-10'>
            <div className='text-center mb-8'>
              <div className='flex items-center justify-center mb-4'>
                <Sparkles className='w-6 h-6 mr-2' />
                <MessageCircle className='w-6 h-6 mr-2' />
                <Sparkles className='w-6 h-6' />
              </div>
              <h3 className='text-2xl font-bold mb-4'>
                Join Our Writing Community
              </h3>
              <p className='text-green-100 max-w-2xl mx-auto'>
                Share your knowledge, inspire others, and be part of Nigeria's
                leading engineering student community.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
              <button
                onClick={() => {
                  navigate("/blog?view=submit");
                }}
                className='group bg-white text-green font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
              >
                <span className='flex items-center'>
                  <Plus className='mr-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-300' />
                  Submit Your Article
                </span>
              </button>

              <button
                onClick={() => {
                  navigate("/blog?view=submit");
                }}
                className='group bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
              >
                <span className='flex items-center'>
                  <Share2 className='mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                  Share on WhatsApp
                </span>
              </button>
            </div>

            <div className='text-center'>
              <button
                onClick={handleBlogsButton}
                className='group text-green-100 hover:text-white font-medium transition-colors duration-300 '
              >
                <span className='flex items-center justify-center'>
                  Explore All Blog Posts
                  <ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default BlogHome