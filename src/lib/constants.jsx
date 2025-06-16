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
    icon: <BsTwitterX size={24} className=' hover:text-blue-500' />,
    link: "https://x.com/nuesa_abuad",
    color: "",
  },
  {
    title: "Snapchat",
    icon: <BsSnapchat size={24} className=' hover:text-yellow-400' />,
    link: "https://www.snapchat.com/add/nuesa_abuad",
    color: "",
  },
  {
    title: "Instagram",
    icon: <BsInstagram size={24} className=' hover:text-pink-500' />,
    link: "https://www.instagram.com/nuesaabuad",
    color: "",
  },
  {
    title: "WhatsApp",
    icon: <BsWhatsapp size={24} className=' hover:text-green-500' />,
    link: "/",
    color: "",
  },
];

export const faqData = [
  {
    question: "How can I become a member of NUESA ABUAD Chapter?",
    answer:
      "All engineering students at ABUAD are automatically members of NUESA. However, to become an active member, you need to register at the beginning of each academic session and pay the membership dues. Registration can be done at the NUESA office or during orientation programs.",
  },
  {
    question: "What benefits do I get as a NUESA member?",
    answer:
      "As a NUESA member, you gain access to networking opportunities, technical workshops, industry tours, career development programs, and social events. You also get the chance to participate in engineering competitions and projects that enhance your practical skills.",
  },
  {
    question: "How can I get involved in NUESA activities and leadership?",
    answer:
      "You can get involved by joining committees, volunteering for events, or running for executive positions during elections. We also have departmental representatives and project teams that welcome active participation from members.",
  },
  {
    question: "Does NUESA offer any scholarships or financial support?",
    answer:
      "NUESA occasionally offers scholarships and financial support to members based on academic excellence and financial need. We also provide information about external scholarships and grants available to engineering students.",
  },
  {
    question: "How does NUESA connect students with industry professionals?",
    answer:
      "We organize industry tours, guest lectures, career fairs, and mentorship programs that connect students with professionals in various engineering fields. We also maintain relationships with alumni who provide guidance and opportunities to current students.",
  },
  {
    question: "Can non-engineering students participate in NUESA events?",
    answer:
      "While NUESA primarily serves engineering students, many of our events are open to the wider university community. Non-engineering students can attend public lectures, exhibitions, and social events, but may not be eligible for certain technical workshops or competitions.",
  },
];
