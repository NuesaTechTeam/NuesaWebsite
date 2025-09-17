import { useState } from "react";
import logo from "../../assets/logo.png";
import { Phone, Mail, MapPin } from "lucide-react";
import { socialLinks } from "../../lib/constants";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    message: "",
  });

  const contactLinks = [
    {
      value: "09153002715",
      icon: <Phone />,
    },
    {
      value: "nuesatechteam2025@gmail.com",
      icon: <Mail />,
    },
    {
      value: "E26 - E27, Engineering College, ABUAD, Km 8.5 Afe Babalola Way, Ado-Ekiti, Ekiti State.",
      icon: <MapPin />,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name,phoneNo, message } = formData;

      if (
        !name ||
        !phoneNo ||
        !message
      ) {
        alert("Please fill in all fields");
        return;
      }


    const targetNumber = "2349153002715";

     const text = `Hello, my name is ${name}. ${message}`;

      const encodedText = encodeURIComponent(text);

      const whatsappLink = `https://wa.me/${targetNumber}?text=${encodedText}`;

      window.open(whatsappLink, "_blank");
  };

  return (
    <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div
          className='bg-white text-white p-8 px-4 lg:p-12 relative overflow-hidden bg-contain bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${logo})`  }}
        >
          <div className='absolute inset-0 bg-green opacity-92'></div>
          <div className='relative z-10'>
            <h2 className='text-2xl md:text-3xl font-semibold mb-4'>
              Contact Information
            </h2>
            <p className='text-gray-300 mb-8 text-sm md:text-base'>
              You can contact through any of these medium
            </p>
            {/* contact info */}
            <div className='space-y-6 mb-12'>
              {contactLinks.map((contact, index) => (
                <div className='flex items-center space-x-4' key={index}>
                  <div className='flex-shrink-0'>{contact.icon}</div>
                  <span className='text-sm md:text-base'>{contact.value}</span>
                </div>
              ))}
            </div>
            {/* social links */}
            <div className='flex space-x-6'>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-100 hover:text-green transition-colors duration-200 flex items-center gap-2'
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* contact form */}
        <div className='p-8 lg:p-12'>
          <div className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium mb-2'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full px-0 py-3 border-0 border-b-2 border-green-900 bg-transparent focus:border-green-600 focus:ring-0 focus:outline-none transition-colors'
                required
              />
            </div>
            <div>
              <label
                htmlFor='phoneNo'
                className='block text-sm font-medium mb-2'
              >
                Phone NO
              </label>
              <input
                type='tel'
                inputMode='tel'
                id='phoneNo'
                name='phoneNo'
                value={formData.phoneNo}
                onChange={handleInputChange}
                className='w-full px-0 py-3 border-0 border-b-2 border-green-900 bg-transparent focus:border-green-600 focus:ring-0 focus:outline-none transition-colors'
                required
              />
            </div>
            <div>
              <label
                htmlFor='message'
                className='block text-sm font-medium mb-2'
              >
                Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleInputChange}
                placeholder='Write your message...'
                rows={4}
                className='w-full px-0 py-3 border-0 border-b-2 border-green-900 bg-transparent focus:border-green-600 focus:ring-0 focus:outline-none transition-colors resize-none'
                required
              />
            </div>
            <div className='pt-6'>
              <button
                type='button'
                onClick={handleSubmit}
                className='w-full md:w-auto px-8 py-3 bg-green text-white font-medium rounded-lg hover:bg-green-800  focus:ring-2 focus:outline-none transition-colors focus:ring-green-600 focus:ring-offset-2 cursor-pointer'
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
