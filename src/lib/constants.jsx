import {
  BsTwitterX,
  BsInstagram,
  BsWhatsapp,
  BsSnapchat,
} from "react-icons/bs";

export const navbarLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "Executives",
    url: "/executives",
  },
  {
    title: "Projects",
    url: "/projects",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Contact Us",
    url: "/contactus",
  },
];

export const socialLinks = [
  {
    title: "Twitter",
    icon: <BsTwitterX size={24} className='text-black hover:text-blue-500' />,
    link: "https://x.com/nuesa_abuad",
    color: "",
  },
  {
    title: "Snapchat",
    icon: <BsSnapchat size={24} className='text-black hover:text-yellow-400' />,
    link: "https://www.snapchat.com/add/nuesa_abuad",
    color: "",
  },
  {
    title: "Instagram",
    icon: <BsInstagram size={24} className='text-black hover:text-pink-500' />,
    link: "https://www.instagram.com/nuesaabuad",
    color: "",
  },
  {
    title: "WhatsApp",
    icon: <BsWhatsapp size={24} className='text-black hover:text-green-500' />,
    link: "/",
    color: "",
  },
];
