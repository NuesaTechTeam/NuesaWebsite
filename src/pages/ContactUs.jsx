import { Form } from "../components/ContactUs";

const ContactUs = () => {
  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      {/* header */}
      <div className='maw-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-green mb-4'>
            Contact Us
          </h1>
          <p className='text-lg'>
            Any question or report? Just write us a message!
          </p>
        </div>
      </div>
      {/* form */}
      <Form />
    </div>
  );
}
export default ContactUs