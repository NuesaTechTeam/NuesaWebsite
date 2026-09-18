import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { APWEN_TESTIMONIALS } from "../../lib/apwenData";

const ApwenTestimonials = () => {
  return (
    <section
      id='testimonials'
      className='bg-gray-50 dark:bg-gray-950 px-4 py-16 sm:px-6 lg:px-8'
    >
      <div className='mx-auto max-w-7xl'>
        <div className='mb-10 text-center'>
          <p className='text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400'>
            Testimonials
          </p>
          <h2 className='mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>
            Success Stories
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-300'>
            Inspiration for the next generation of women engineers.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {APWEN_TESTIMONIALS.map((testimonial, index) => (
            <motion.blockquote
              key={testimonial.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
              className='flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6'
            >
              <Quote className='mb-4 h-8 w-8 text-purple-400' />
              <h3 className='mb-2 font-bold text-gray-900 dark:text-white'>
                {testimonial.title}
              </h3>
              <p className='flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className='mt-4 border-t border-gray-100 dark:border-gray-800 pt-4'>
                <p className='text-sm font-semibold text-purple-700 dark:text-purple-400'>
                  {testimonial.author}
                </p>
                {testimonial.role && (
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    {testimonial.role}
                  </p>
                )}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApwenTestimonials;
