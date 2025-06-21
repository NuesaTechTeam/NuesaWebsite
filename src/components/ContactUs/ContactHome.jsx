import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  BsTwitterX,
  BsInstagram,
  BsWhatsapp,
  BsSnapchat,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ContactHome = () => {
  const [quickMessage, setQuickMessage] = useState({
    name: "",
    phoneNo: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleContactButton = () => {
    navigate("/contactus");
  };

  const handleQuickSubmit = () => {
    if (!quickMessage.name || !quickMessage.phoneNo || !quickMessage.message) {
      alert("Please fill in all fields");
      return;
    }
    console.log("Quick message submitted", quickMessage);

    alert("Message sent! We'll get back to you soon.");
    setQuickMessage({ name: "", email: "", message: "" });
  };

  const handleInputChange = (e) => {
    setQuickMessage({
      ...quickMessage,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className='bg-white py-8 lg:px-4 border-t-1 border-green-200'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-green mb-4'>
            Get In Touch With Us
          </h2>
          <p className='text-lg text-gray-700 max-w-3xl mx-auto'>
            Have questions, suggestions, or want to get involved? We'd love to
            hear from you. Reach out to NUESA ABUAD and join our engineering
            community.
          </p>
        </div>
        <div className='bg-white rounded-2xl shadow-lg p-8 px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div>
              <div className='flex items-center mb-6'>
                <div className='bg-green-100 p-3 rounded-lg mr-4'>
                  <MessageCircle className='size-6 text-green' />
                </div>
                <div>
                  <h3 className='text-xl font-bold text-green'>
                    Quick Message
                  </h3>
                  <p className='text-gray-700'>
                    Send us a quick message and we'll respond as soon as we can
                  </p>
                </div>
              </div>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <input
                    type='text'
                    name='name'
                    placeholder='Your Name'
                    value={quickMessage.name}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all outline-none'
                  />
                  <input
                    type='tel'
                    inputMode='tel'
                    name='phoneNo'
                    placeholder='Your Phone No'
                    value={quickMessage.phoneNo}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all outline-none'
                  />
                  <textarea
                    name='message'
                    placeholder='Your message...'
                    value={quickMessage.message}
                    onChange={handleInputChange}
                    rows='4'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none outline-none sm:col-span-2'
                  ></textarea>
                </div>
                  <button
                    onClick={handleQuickSubmit}
                    className='w-full bg-green text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center'
                  >
                    <Send className='size-5 mr-2' />
                    Send Message
                  </button>
              </div>
            </div>

            <div className='space-y-8'>
              <div className='bg-white rounded-2xl shadow-lg p-2 py-8'>
                <h3 className='text-xl font-bold text-green mb-6'>
                  Connect With Us
                </h3>
                <div className='space-y-4'>
                  <div className='flex items-center'>
                    <div className='bg-green-100 p-2 rounded-lg mr-4'>
                      <Mail className='size-5 text-green' />
                    </div>
                    <div>
                      <p className='font-medium text-green'>Email</p>
                      <p className='text-gray-700'>contact@nuesaabuad.org</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='bg-green-100 p-2 rounded-lg mr-4'>
                      <Phone className='size-5 text-green' />
                    </div>
                    <div>
                      <p className='font-medium text-green'>Phone</p>
                      <p className='text-gray-700'>+234 (0) 123 456 7890</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='bg-green-100 p-2 rounded-lg mr-4'>
                      <MapPin className='size-5 text-green' />
                    </div>
                    <div>
                      <p className='font-medium text-green'>Location</p>
                      <p className='text-gray-700'>
                        E26 - E27, Engineering College, ABUAD, Ado-Ekiti, Ekiti
                        State
                      </p>
                    </div>
                  </div>
                </div>
              </div>
                    </div>

              <div className='bg-gradient-to-r from-green-700 to-green rounded-2xl p-6 text-white lg:col-span-2'>
                <div className='flex items-center mb-4'>
                  <Users className='size-6 mr-2' />
                  <h4 className='font-bold text-lg'>Need More Help?</h4>
                </div>
                <p className='text-green-100 mb-4'>
                  Visit our complete contact page for detailed forms, FAQs,
                  social media links, and more ways to connect with us.
                </p>
                <button
                  onClick={handleContactButton}
                  className='bg-white text-green px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center cursor-pointer'
                >
                  Visit Contact Page
                  <ArrowRight className='size-5 ml-2' />
                </button>
              </div>
          </div>
        </div>

        <div className='mt-10 text-center'>
          <h3 className='text-lg font-semibold text-green mb-4'>Follow Us</h3>
          <div className='flex justify-center space-x-4'>
            <a
              href='#'
              className='bg-white p-3 roudned-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1'
              title='WhatsApp'
            >
              <BsWhatsapp className='size-6 text-green' />
            </a>
            <a
              href='#'
              className='bg-white p-3 roudned-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1'
              title='Snapchat'
            >
              <BsSnapchat className='size-6 text-green' />
            </a>
            <a
              href='#'
              className='bg-white p-3 roudned-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1'
              title='Instagram'
            >
              <BsInstagram className='size-6 text-green' />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactHome;
