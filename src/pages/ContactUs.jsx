import { Form, Faq } from "../components/ContactUs";
import useSEO from "../hooks/useSEO";

const ContactUs = () => {
  useSEO({
    title: "Contact Us",
    description: "Get in touch with NUESA ABUAD. Submit enquiries, find our social links, office location, or read Frequently Asked Questions (FAQ)."
  });

  return (
    <div className='min-h-screen py-12  sm:px-6 lg:px-8'>
      <div>
        {/* header for contact us form */}
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-green mb-4'>
              Contact Us
            </h1>
            <p className='text-lg'>
              Any question or report? Just write us a message!
            </p>
          </div>
        </div>
        {/* form for contact us */}
        <Form />
      </div>
      <div>
        <div className='max-w-7xl mx-auto mt-12'>
          <h2 className='text-3xl font-bold text-green mb-6'>
            Frequently Asked Questions
          </h2>
          <p className='text-lg mb-8'>
            Here are some common questions we receive. If you have a different
            question, feel free to reach out!
          </p>
          {/* Accordion component for FAQs */}
          <Faq />
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
