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


export const eventsData = [
  {
    id: 1,
    title: "Career Path in Fintech: The Journey",
    date: "September 7, 2024",
    time: "11:30 AM - 13:30 PM",
    venue: "Google Meet",
    description:
      "A webinar session hosting 2 guests with a wealth of experience in the fintech sector.",
    image: "/images/events/career-path-in-fintech.jpg",
    category: "Professional",
    status: "past",
  },
  {
    id: 2,
    title: "Q&A Sessions with your Excos",
    date: "September 18, 2024",
    time: "8:00 PM - 09:30 PM",
    venue: "Twitter Spaces",
    description:
      "Visit to leading tech companies in Lagos to gain insights into industry practices and network with professionals.",
    image: "/images/events/know-your-excos.jpg",
    category: "Exhibition",
    status: "past",
  },
  {
    id: 3,
    title: "Fresher's Orientation",
    date: "October 12, 2024",
    time: "09:30 AM - 12:00 PM",
    venue: "Engineering Auditorium",
    description:
      "Hands-on workshops on emerging technologies and engineering practices led by industry experts.",
    image: "/images/events/freshers-orientation.jpg",
    category: "Academic",
    status: "past",
  },
  {
    id: 4,
    title: "Tech Fusion",
    date: "November 20, 2024",
    time: "05:00 PM - 07:00 PM",
    venue: "Engineering Auditorium",
    description:
      "Annual technical festival featuring coding competitions, robotics, and innovation showcases.",
    image: "/images/events/tech-fusion.jpg",
    category: "Technical",
    status: "past",
  },
  {
    id: 5,
    title: "Salam Odo N'uwa",
    date: "November 24, 2024",
    time: "07:00 PM - 10:30 PM",
    venue: "Alfa Belgore Hall, ABUAD",
    description: "Annual dinner and awards night.",
    image: "/images/events/salam-odo-nuwa.jpg",
    category: "Cultural",
    status: "past",
  },
  {
    id: 6,
    title: "Career Path in Fintech: The Journey",
    date: "September 7, 2024",
    time: "11:30 AM - 13:30 PM",
    venue: "Google Meet",
    description:
      "A webinar session hosting 2 guests with a wealth of experience in the fintech sector.",
    image: "/images/events/career-path-in-fintech.jpg",
    category: "Professional",
    status: "upcoming",
  },
  {
    id: 7,
    title: "Q&A Sessions with your Excos",
    date: "September 18, 2024",
    time: "8:00 PM - 09:30 PM",
    venue: "Twitter Spaces",
    description:
      "Visit to leading tech companies in Lagos to gain insights into industry practices and network with professionals.",
    image: "/images/events/know-your-excos.jpg",
    category: "Exhibition",
    status: "upcoming",
  },
  {
    id: 8,
    title: "Fresher's Orientation",
    date: "October 12, 2024",
    time: "09:30 AM - 12:00 PM",
    venue: "Engineering Auditorium",
    description:
      "Hands-on workshops on emerging technologies and engineering practices led by industry experts.",
    image: "/images/events/freshers-orientation.jpg",
    category: "Academic",
    status: "upcoming",
  },
  {
    id: 9,
    title: "Tech Fusion",
    date: "November 20, 2024",
    time: "05:00 PM - 07:00 PM",
    venue: "Engineering Auditorium",
    description:
      "Annual technical festival featuring coding competitions, robotics, and innovation showcases.",
    image: "/images/events/tech-fusion.jpg",
    category: "Technical",
    status: "upcoming",
  },
  {
    id: 10,
    title: "Salam Odo N'uwa",
    date: "November 24, 2024",
    time: "07:00 PM - 10:30 PM",
    venue: "Alfa Belgore Hall, ABUAD",
    description:
      "Annual dinner and awards night. Annual dinner and awards night.",
    image: "/images/events/salam-odo-nuwa.jpg",
    category: "Cultural",
    status: "upcoming",
  },
];