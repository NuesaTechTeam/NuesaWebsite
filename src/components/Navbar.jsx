import { useState } from "react";
import { navbarLinks, socialLinks } from "../lib/constants";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { DropdownMenu } from "radix-ui";
import { ChevronDown } from "lucide-react";
import Hamburger from "./Hamburger.jsx";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Split links into primary and secondary (for "More" dropdown)
  const primaryLinks = navbarLinks.filter((link) =>
    ["Home", "About", "Events", "Executives", "Projects", "Academics", "Blog", "Library", "Contact Us"].includes(link.title)
  );
  const secondaryLinks = navbarLinks.filter(
    (link) => !["Home", "About", "Events", "Executives", "Projects", "Academics", "Blog", "Library", "Contact Us"].includes(link.title)
  );

  const overlayVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const socialVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  return (
    <>
      <nav className='fixed left-0 top-0 w-full z-nav bg-white/80 backdrop-blur-md w-full mx-auto flex items-center justify-between py-2 shadow-md px-4 md:px-8 lg:px-12'>
        <Link to='/' className='flex items-center gap-2'>
          <img src={logo} alt='nuesa abuad' className="h-10 w-10 object-contain" />
          <h1 className="font-semibold text-black text-lg">NUESA ABUAD</h1>
        </Link>
        <div className='hidden md:flex items-center gap-x-1 overflow-x-scroll scrollbar-hidden'>
          {primaryLinks.map((link) => (
            <Link
              key={link.title}
              to={link.url}
              className={`px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 rounded transition-colors duration-200 ${
                location.pathname === link.url ? "bg-green-100 text-green-700 font-medium" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}

          {/* More dropdown for secondary pages */}
          {secondaryLinks.length > 0 && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className='px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 rounded transition-colors duration-200 flex items-center gap-1 cursor-pointer active:scale-[0.97]'>
                  More
                  <ChevronDown className='w-3.5 h-3.5' />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className='min-w-[180px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-nav-dropdown'
                  sideOffset={8}
                >
                  {secondaryLinks.map((link) => (
                    <DropdownMenu.Item
                      key={link.title}
                      className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded transition-colors duration-200 cursor-pointer'
                    >
                      <Link
                        to={link.url}
                        className='w-full text-sm'
                      >
                        {link.title}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className='hidden lg:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-green/90 px-5 py-2 text-sm w-fit text-white bg-green h-auto active:scale-[0.97]'>
              Follow us
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className='min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-nav-dropdown'
              sideOffset={8}
            >
              {socialLinks.map((social) => (
                <DropdownMenu.Item
                  key={social.title}
                  className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded transition-colors duration-200 cursor-pointer'
                >
                  <a
                    href={social.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2'
                  >
                    {social.icon}
                    {social.title}
                  </a>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <button className='md:hidden z-mobile-menu'>
          <Hamburger setMobileMenu={setIsOpen} mobileMenu={isOpen} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            variants={overlayVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='fixed inset-0 bg-white z-mobile-menu flex flex-col overflow-y-auto md:hidden'
          >
            <div className='flex flex-col items-center pt-24 pb-6 space-y-6'>
              {navbarLinks.map((link, index) => (
                <Motion.div
                  key={index}
                  variants={linkVariants}
                  className={`text-lg font-medium transition-colors duration-200 ${
                    location.pathname === link.url
                      ? "text-green"
                      : "text-gray-700"
                  }`}
                >
                  <Link to={link.url} onClick={() => setIsOpen(false)}>
                    {link.title}
                  </Link>
                </Motion.div>
              ))}
            </div>
            <Motion.div
              variants={socialVariants}
              className='pb-8 justify-center space-x-6 flex mt-auto pt-6'
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-black hover:text-green transition-colors duration-200 flex items-center gap-2'
                >
                  {social.icon}
                </a>
              ))}
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
