import { Link } from "react-router-dom";
import { navbarLinks, socialLinks } from "../lib/constants";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full px-6 pt-12 pb-6 bg-white border-t border-gray-200'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8'>
          {/* Brand */}
          <div>
            <Link to='/' className='flex gap-2 items-center mb-4'>
              <img src={logo} alt='Nuesa Abuad' className="h-10 w-10 object-contain" />
              <h1 className='font-semibold text-black text-lg'>NUESA ABUAD</h1>
            </Link>
            <p className='text-sm text-gray-600 leading-relaxed'>
              NUESA ABUAD is the Afe Babalola University Ado-Ekiti chapter for
              the Nigerian Universities Engineering Students Association.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='font-semibold text-gray-900 mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              {navbarLinks
                .filter((link) => ["Home", "About", "Events", "Executives", "Projects", "Contact Us"].includes(link.title))
                .map((link) => (
                  <li key={link.title}>
                    <Link
                      to={link.url}
                      className='text-sm text-gray-600 hover:text-green transition-colors duration-200'
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='font-semibold text-gray-900 mb-4'>Resources</h3>
            <ul className='space-y-2'>
              {navbarLinks
                .filter((link) => ["Academics", "Library", "H.E.A.R.T", "Videos", "Blog", "Feedback"].includes(link.title))
                .map((link) => (
                  <li key={link.title}>
                    <Link
                      to={link.url}
                      className='text-sm text-gray-600 hover:text-green transition-colors duration-200'
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className='font-semibold text-gray-900 mb-4'>Connect With Us</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Follow us on social media for the latest updates and events.
            </p>
            <div className='flex flex-wrap gap-3'>
              {socialLinks.map((social) => (
                <a
                  key={social.title}
                  href={social.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-lg text-sm transition-colors duration-200'
                >
                  {social.icon}
                  <span>{social.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='border-t border-green/20 pt-6'>
          <p className='text-center text-sm text-gray-600'>
            &copy; {currentYear} NUESA ABUAD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
