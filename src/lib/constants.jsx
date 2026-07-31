import {
  BsTwitterX,
  BsInstagram,
  BsWhatsapp,
  BsSnapchat,
} from "react-icons/bs";

import { Wrench, Building, Users, BookOpen } from "lucide-react";

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
    title: "Academics",
    url: "/academics",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Library",
    url: "/library",
  },
  // {
  //   title: "Dinner",
  //   url: "/dinner",
  // },
  {
    title: "H.E.A.R.T",
    url: "/heart",
  },
  {
    title: "Videos",
    url: "/videos",
  },
  {
    title: "Feedback",
    url: "/feedback",
  },
  {
    title: "Contact Us",
    url: "/contactus",
  },
];

export const socialLinks = [
  {
    title: "Twitter",
    icon: <BsTwitterX size={24} />,
    link: "https://x.com/nuesa_abuad",
    color: "",
  },
  {
    title: "Snapchat",
    icon: <BsSnapchat size={24} />,
    link: "https://www.snapchat.com/add/nuesa_abuad01",
    color: "",
  },
  {
    title: "Instagram",
    icon: <BsInstagram size={24} />,
    link: "https://www.instagram.com/nuesaabuad?igsh=MThyYzg3aXN5ZHg2bQ==",
    color: "",
  },
  {
    title: "WhatsApp",
    icon: <BsWhatsapp size={24} />,
    link: "https://wa.me/2348102841732?text=Hello%20I%20am%20contacting%20about%20NUESA",
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
      "ABUAD offers direct scholarships based on academic performance or need but NUESA can help with the external scholarships by partnering with organizations or helping students get some scholarship programs.",
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
    date: "August 23, 2025",
    time: "1:30 PM - 3:30 PM",
    venue: "Google Meet",
    description:
      "A webinar session hosting 2 guests with a wealth of experience in the fintech sector.",
    image: "/images/events/career-gps.jpg",
    category: "Professional",
    status: "past",
    featured: false,
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
    featured: false,
  },
  {
    id: 3,
    title: "Fresher's Orientation",
    date: "August 30, 2025",
    time: "07:30 PM - 9:00 PM",
    venue: "Google Meet",
    description:
      "Introducing the incoming freshers to the new life in engineering college with resumption essentials",
    image: "/images/events/freshers-orientation.jpg",
    category: "Academic",
    status: "past",
    featured: false,
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
    featured: false,
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
    featured: false,
  },
  {
    id: 6,
    title: "Casablanca",
    date: "November 23, 2025",
    time: "06:00 PM - 10:30 PM",
    venue: "Alfa Belgore Hall, ABUAD",
    description: "Annual dinner and awards night.",
    image: "/images/events/nuesa-dinner-2025.jpg",
    category: "Mafia",
    status: "past",
    featured: true,
    detailsUrl: "/dinner",
  },
  {
    id: 7,
    title: "Nuesalympics",
    date: "Coming Soon",
    time: "02:00 PM - 5:30 PM",
    venue: "Pavilion, ABUAD",
    description: "A very first olympics competition by NUESA",
    image: "/images/events/nuesa-olympics.jpg",
    category: "Sport",
    status: "upcoming",
    featured: true,
  },
  {
    id: 8,
    title: "Code Red Party",
    date: "February 26, 2026",
    time: "",
    venue: "",
    description:
      "Come and relax with friends, enjoy great music, and have an unforgettable evening at the Code Red Party.",
    image: "/images/events/code_red_party.jpg",
    category: "Social",
    status: "past",
    featured: false,
  },
  {
    id: 9,
    title: "HSE Training",
    date: "July 3, 2026",
    time: "",
    venue: "",
    description:
      "An online training session focused on health, safety, and job readiness for engineering students preparing for industrial training.",
    image: "/images/events/HSE_traininng.jpeg",
    category: "Academic",
    status: "past",
    featured: false,
  },
];

export const timeTables = [
  {
    id: 1,
    title: "100L Engineering College Timetable",
    link: "/documents/timetables/100l-timetable.pdf",
  },
  {
    id: 2,
    title: "Complete 2025/2026 Engineering College Timetable",
    link: "/documents/timetables/Engineering-Timetable.pdf",
  },
  {
    id: 3,
    title: "Industrial Training Report Format",
    link: "/documents/timetables/Industrial-Training-Report-Format.pdf",
  },
  {
    id: 4,
    title: "SIWES Student's Evaluation Form",
    link: "/documents/timetables/SIWES Student's Evaluation Form.pdf",
  },
]

export const newsArticles = [
  {
    id: 1,
    title: "NUESA News August edition",
    excerpt:
      "Stay updated with the latest news and events from the NUESA community in our August newsletter.",
    date: "August 30, 2025",
    image:
      "/images/news/august-news.jpg",
    link: "/documents/august-news.pdf"
  },
  {
    id: 2,
    title: "NUESA News October edition",
    excerpt:
      "Stay updated with the latest news and events from the NUESA community in our October newsletter.",
    date: "October 30, 2025",
    image:
      "/images/news/october-news.jpg",
    link: "/documents/october-news.pdf"
  },
  // {
  //   id: 2,
  //   title: "New AI Research Lab Opens on Campus",
  //   excerpt:
  //     "The college inaugurates a state-of-the-art Artificial Intelligence research facility, equipped with cutting-edge hardware and collaborative spaces.",
  //   date: "March 8, 2025",
  //   image:
  //     "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
  // },
  // {
  //   id: 3,
  //   title: "Industry Partnership Program Launches",
  //   excerpt:
  //     "New collaboration with leading tech companies provides internship opportunities and real-world project experience for final year students.",
  //   date: "March 5, 2025",
  //   image:
  //     "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop",
  // },
  // {
  //   id: 4,
  //   title: "Sustainability Initiative: Solar Panel Installation Complete",
  //   excerpt:
  //     "The college achieves 60% renewable energy coverage with the completion of rooftop solar installations across all academic buildings.",
  //   date: "March 3, 2025",
  //   image:
  //     "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
  // },
];

export const galleryPhotos = [
  {
    id: 1,
    src: "/images/events/photogallery/nuesa-apwen-1.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 2,
    src: "/images/events/photogallery/nuesa-apwen2.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 3,
    src: "/images/events/photogallery/nuesa-apwen3.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 4,
    src: "/images/events/photogallery/nuesa-apwen4.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 5,
    src: "/images/events/photogallery/nuesa-apwen5.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 6,
    src: "/images/events/photogallery/nuesa-apwen6.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 7,
    src: "/images/events/photogallery/nuesa-apwen7.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 8,
    src: "/images/events/photogallery/nuesa-apwen8.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 9,
    src: "/images/events/photogallery/nuesa-apwen9.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 10,
    src: "/images/events/photogallery/nuesa-apwen10.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 11,
    src: "/images/events/photogallery/nuesa-apwen11.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 12,
    src: "/images/events/photogallery/nuesa-apwen12.JPG",
    title: "NUESA X APWEN",
    eventDate: "October 2025",
  },
  {
    id: 13,
    src: "/images/events/photogallery/lead-conf1.JPG",
    title: "2025 INTERNATIONAL LEADERSHIP CONFERENCE ON LEADERSHIP, GOVERNANCE, SUSTAINABLE CHANGE AND WEALTH CREATION [2.0]",
    eventDate: "October 2025",
  },
  {
    id: 14,
    src: "/images/events/photogallery/lead-conf2.JPG",
    title: "2025 INTERNATIONAL LEADERSHIP CONFERENCE ON LEADERSHIP, GOVERNANCE, SUSTAINABLE CHANGE AND WEALTH CREATION [2.0]",
    eventDate: "October 2025",
  },
  {
    id: 15,
    src: "/images/events/photogallery/lead-conf3.JPG",
    title: "2025 INTERNATIONAL LEADERSHIP CONFERENCE ON LEADERSHIP, GOVERNANCE, SUSTAINABLE CHANGE AND WEALTH CREATION [2.0]",
    eventDate: "October 2025",
  },
  {
    id: 16,
    src: "/images/events/photogallery/lead-conf4.JPG",
    title: "Meeting with the Deputy Vice Chancellor (Adminstration) Prof. Olasupo Ijabadeniyi and Deputy Vice Chancellor (Academics) Prof. Olayinka Christopher ",
    eventDate: "October 2025",
  },
  {
    id: 17,
    src: "/images/events/photogallery/lead-conf5.JPG",
    title: "Meeting with the Deputy Vice Chancellor (Adminstration) Prof. Olasupo Ijabadeniyi and Deputy Vice Chancellor (Academics) Prof. Olayinka Christopher",
    eventDate: "October 2025",
  },
  {
    id: 18,
    src: "/images/events/photogallery/lead-conf6.JPG",
    title: "2025 INTERNATIONAL LEADERSHIP CONFERENCE ON LEADERSHIP, GOVERNANCE, SUSTAINABLE CHANGE AND WEALTH CREATION [2.0]",
    eventDate: "October 2025",
  },
  {
    id: 19,
    src: "/images/events/photogallery/lead-conf7.jpeg",
    title: "2025 INTERNATIONAL LEADERSHIP CONFERENCE ON LEADERSHIP, GOVERNANCE, SUSTAINABLE CHANGE AND WEALTH CREATION [2.0]",
    eventDate: "October 2025",
  },
  {
    id: 20,
    src: "/images/events/photogallery/lead-conf8.jpeg",
    title: "2025 INTERNATIONAL LEADERSHIP CONFERENCE ON LEADERSHIP, GOVERNANCE, SUSTAINABLE CHANGE AND WEALTH CREATION [2.0]",
    eventDate: "October 2025",
  },
  {
    id: 21,
    src: "/images/events/photogallery/lead-conf9.jpeg",
    title: "2025 INTERNATIONAL LEADERSHIP CONFERENCE ON LEADERSHIP, GOVERNANCE, SUSTAINABLE CHANGE AND WEALTH CREATION [2.0]",
    eventDate: "October 2025",
  },
  {
    id: 22,
    src: "/images/events/photogallery/lead-conf10.jpeg",
    title: "2025 INTERNATIONAL LEADERSHIP CONFERENCE ON LEADERSHIP, GOVERNANCE, SUSTAINABLE CHANGE AND WEALTH CREATION [2.0]",
    eventDate: "October 2025",
  },
];

export const collegeGallery = {
  environment: {
    title: "College Environment",
    description:
      "Our beautiful and modern college provides an inspiring environment for learning and innovation",
    icon: Building,
    images: [
      "/images/college/environment/environment2.jpg",
      "/images/college/environment/environment1.jpg",
      "/images/college/environment/environment3.jpg",
      "/images/college/environment/environment4.jpg",
      "/images/college/environment/environment5.jpg",
      "/images/college/environment/environment6.jpg",
    ],
  },
  // classrooms: {
  //   title: "Classrooms",
  //   description:
  //     "State-of-the-art classrooms equipped with the latest technology for interactive learning",
  //   icon: Users,
  //   images: [
  //     "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop",
  //   ],
  // },
  workshop: {
    title: "Engineering Workshops & Labs",
    description:
      "Fully equipped workshops where students bring their engineering concepts to life",
    icon: Wrench,
    images: [
      "/images/college/workshop/workshop1.jpg",
      // "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop",
      // "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop",
      // "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop",
    ],
  },
  library: {
    title: "Academic Library",
    description:
      "A quiet sanctuary for research and study with extensive engineering resources",
    icon: BookOpen,
    images: [
      "/images/college/library/library1.jpg",
      "/images/college/library/library2.jpg",
      "/images/college/library/library3.jpg",
      "/images/college/library/library4.jpg",
      "/images/college/library/library5.jpg",
      "/images/college/library/library6.jpg",
    ],
  },
};

export const currentExecutivesData = [
  {
    name: "Gregory Akidima",
    position: "President",
    department: "Chemical Engineering",
    year: "500 Level",
    image: "/images/executives/current/gregory.jpeg",
    bio: "I'm naturally curious and always looking for opportunities to grow. I appreciate meaningful conversations, genuine connections, and experiences that broaden my perspective. I try to approach life with humility, determination, and an open mind, believing that every challenge is an opportunity to learn.",
    achievements: [
      "President of the NUESA 26/27 administration.",
      "Course representative 100lvl - 500lvl",
      "⁠Ass. General secretary, NSCHe 23/24",
      "Vice president, NSCHe 24/25",
      "Public relations officer, NSCHe 25/26"
    ],
    social: {
      whatsapp: "#",
      snapchat: "gakidima77",
      email: "akidimagregory@gmail.com",
    },
  },
  {
    name: "Naimah Abdul",
    position: "Vice President",
    department: "Mechanical Engineering",
    year: "400 Level",
    image: "/images/executives/current/naimah.jpeg",
    bio: "I’m an easygoing and friendly person. I like meeting new people and having new experiences.I strive to be as helpful and supportive as possible to those around me.",
    achievements: [
      "Academic Committee, MMESA 2025/2026",
      "Social Committee, MMESA 2025/2026",
      "Academic Committee, SRC 2024/2025",
      "Social Elite, 2024/2025",
    ],
    social: {
      whatsapp: "#",
      snapchat: "msabdul.n",
      email: "#",
    },
  },
  {
    name: "Ojiji Okpa ",
    position: "General Secretary",
    department: "Mechanical Engineering",
    year: "500 Level",
    image: "/images/executives/current/ojiji.jpeg",
    bio: "I’m always up for a good conversation,Passionate about breaking boundaries, solving problems, and making every student feel represented. Fancy house music and love football aswell",
    achievements: [
      "Assistant Course Representative, Department of Mechanical Engineering (Incumbent)",
      "Delegate, Association for Local Distribution of Gas (ALDG)",
      "Project Management (In Progress)",
      "Certified in Prompt Engineering",
      "Skilled in Automotive Diagnostics & Vehicle Troubleshooting",
      "NUESA General Secretary 2026/2027",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "okpaojiji440@gmail.com",
    },
  },
  {
    name: "Joel otunowigho ",
    position: "Assistant General Secretary",
    department: "Aeronautical and Astronautical Engineering",
    year: "400 Level",
    image: "/images/executives/current/Joel.jpeg",
    bio: "Approachable and growth-driven, with a passion for leadership and innovation. I enjoy meeting new people, building valuable networks, and collaborating with people who are passionate about creating impact. I enjoy traveling, exploring new experiences, watching movies, staying active, and a strong creative side.",
    achievements: [
      "Assistant General Secretary, Aerospace Engineering Students’ Association (AESA), 2025/2026.",
      "Member, NUESA Academic Committee, 2025/2026",
      "Member, Aerospace Engineering Students’ Association (AESA) Academic Committee 2025/2026",
      "Volunteer, NUESA HEART 2025/2026",
      "Member, SRC Academic Committee, 2024/2025.",
      "Campus Ambassador, Afara Initiative Engineering Representative",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "joelotun@gmail.com",
    },
  },
  {
    name: "Agboyinu Setin Gabriel",
    position: "Technical Director",
    department: "Mechanical Engineering",
    year: "500 Level",
    image: "/images/executives/current/Agboyinu Setin Gabriel.jpeg",
    bio: "I am a Final-Year Mechanical Engineering student at Afe Babalola University with a passion for robotics, automation, intelligent manufacturing, and automotive engineering. I am is committed to using technology to solve real-world problems while fostering innovation and technical excellence within the engineering community. As Technical Director of NUESA, I aims to strengthen the association's digital presence and promote practical engineering among students.",
    achievements: [
      "Technical Director, NUESA ABUAD 26/27 administration.",
      "A member of ACMC 2022-present(ABUAD Chapel Multimedia Crew)",
      "Designed and built a functional Hexapod Robot",
      "Instructor, IEEE Build-a-Bot Workshop 2024",
      "2nd Place, EPIC 2024 Engineering Competition",
      "Member, ASVA",
    ],
    social: {
      whatsapp: "#",
      snapchat: "itssetin",
      email: "nuesa.abuad.tech@gmail.com",
    },
  },
  {
    name: "Ndukwu Nnadozie Fortune",
    position: "Financial Secretary",
    department: "Aeronautical and Astronautical Engineering ",
    year: "500 Level",
    image: "/images/executives/current/Nnadozie.jpeg",
    bio: "Approachable with a creative and strategic mind. Healthy obsession with growth.",
    achievements: [
      "Former Public Relations Officer, United Nigeria Airlines SIWES Cohort.",
      "Certified in Microsoft Office Productivity Suite.",
      "Certified participant, AMC Mathematics Competition.",
      "Student Leadership & Organizational Development.",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "Fortunendukwu25@gmail.com",
    },
  },
    {
    name: "Chukwuemeka Julian Boluwatife",
    position: "Treasurer",
    department: "Aeronautic engineering",
    year: "400 Level",
    image: "/images/executives/current/Julian.jpeg",
    bio: "I'm naturally curious and enjoy learning how things work, I like listening to music, exploring new places, or spending time with friends and family",
    achievements: [
      "social elite member 2025/2026 session",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "boluchukz@icloud.com",
    },
  },
  {
    name: "Joseph Onyebuchi",
    position: "Public Relations Officer",
    department: "Mechatronics Engineering",
    year: "500 Level",
    image: "/images/executives/current/Joseph.jpeg",
    bio: "Activizzy",
    achievements: [
      "SRC PR committee 24/25",
      "SRC PR committee 25/26",
      "MMESA Creative Committee 25/26",
      "MMESA Social Committee 25/26",
      "NUESA Public Relations Officer 26/27 ",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "joe.nnamdiebube@gmail.com",
    },
  },
  {
    name: "Oyetola Oyejobi",
    position: "Social Director (Male)",
    department: "Mechatronics Engineering",
    year: "500 Level",
    image: "/images/executives/current/Oyejobi.jpeg",
    bio: "Love playing table tennis and a few sports,love socializing ",
    achievements: [
      "Project head robotics arm ",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "Oyetolaoyejobi@gmail.com",
    },
  },
  {
    name: "Fiyin Akinyemi ",
    position: "Social Director (Female)",
    department: "Aeronautical and astronautical engineering",
    year: "500 Level",
    image: "/images/executives/current/Fiyin.jpeg",
    bio: "I’m approachable, easygoing. I love vlogging and making memorable experiences for everyone",
    achievements: [
      "200lvl, 300lvl, 400lvl femalerepresentative, AESA 2023-2026",
      "Electoral committee, AESA 2024/2025",
      "Media Team, AESA 2024/2025",
      "PR & creative Team, AESA 2025/2026",
      "Social Elites, NUESA 2025/2026",
      "⁠Gold medalist Nuesalympics 2025/2026",
      "⁠Founder of WearKafi",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "⁠afiyinfoluwa1@gmail.com",
    },
  },
  {
    name: "Sunday Amazing ",
    position: "Sport Director (Male)",
    department: "Mechatronics engineering ",
    year: "500 Level",
    image: "/images/executives/current/Amazing.jpeg",
    bio: "A very simple person",
    achievements: [
      "ABUAD football league board member for over 3 years",
      "AFL winner",
      "NUESA provost cup winner",
      "ABUAD inter-college winner",
      "AFL playmaker of the tournament 23/24",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "oluwafemiamazing@gmail.com",
    },
  },
  {
    name: "Eni Mofiyinfoluwa Sharon",
    position: "Sport Director (Female)",
    department: "Aeronautical and Astronautical Engineering",
    year: "400 Level",
    image: "/images/executives/current/Sharon.jpeg",
    bio: " I enjoy playing Football and I love adventures. I’m pretty easygoing and always up for a good chat.",
    achievements: [
      " Female Sports Director of the NUESA 25/26 administration",
      "Gold Medalist in Football, 2025 NUESAlympics.",
      "Gold Medalist in Football, 2025 APWEN Departmental Sports Tournament",
      "Bronze medalist in Football,2026 ABUAD SRC Olympics",
      "Brand & Campus Ambassador, Wema Bank",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mofiyinfoluwaeni04@gmail.com",
    },
  },
  {
    name: " Angel Amarachi Ejike",
    position: "Welfare Officer",
    department: " Mechatronics Engineering",
    year: "500 Level",
    image: "/images/executives/current/Angel.jpeg",
    bio: "A girl with passion for building community with people and working with creatives. You will always find me having a good time and helping people",
    achievements: [
      "Member, SRC Welfare Committee, 2025/2026.",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "Angieejike2@gmail.com",
    },
  },
  {
    name: " Bamidele Hassan",
    position: "Chief of staff",
    department: "⁠Civil Engineering",
    year: "500",
    image: "/images/executives/current/BAMIDELE.jpeg",
    bio: "A man with a passion to create",
    achievements: [
      "Member, SRC Welfare Committee, 2025/2026.",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "hassanbamidele60@gmail.com",
    },
  },
  {
    name: "Chinenye Chineye",
    position: "Chief Strategy Office",
    department: "Biomedical Engineering",
    year: "500 Level",
    image: "/images/executives/current/chineye.jpeg",
    bio: "I am a friendly, smiling face who is always willing to engage and offer support to the best of my abilities. I believe in fostering a supportive environment where every student feels seen, heard, and empowered to thrive.",
    achievements: [
      "Director of Engineering, ABUAD Green Club 2026/2027",
      "⁠General Secretary, Literary and Debating Society ABUAD",
      "⁠Assistant General Secretary, BESA 2024/2025",
      "⁠Academic Committee, SRC 2024/2025",
      "⁠Social Committee, SRC 2024/2025",
      "Lead Content Developer, Studysmart, 2023/2024 & 2024/2025",
      "Member, ASVA.",
    ],
    social: {
      whatsapp: "#",
      snapchat: "Nenyecore",
      email: "#",
    },
  },
    {
    name: "Akidima Gabriel",
    position: "Director of Events",
    department: "Mechanical Engineering",
    year: "500 Level",
    image: "/images/executives/current/Akidima.jpeg",
    bio: "⁠I play a lot of games",
    achievements: [
      "⁠Level 1 well performance Engineer",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
   {
    name: "Daniyan Ayomide Daniel",
    position: "Director of Academics",
    department: "Mechatronics Engineering",
    year: "400 Level",
    image: "/images/executives/current/Ayomide.jpeg",
    bio: " I spend most of my time programming, building and playing chess, I play the piano too",
    achievements: [
      "MMESA Academic Committee 2025/20265",
      "Certified in Dart/Flutter",
      "Gold Medalist NPUGA Games(Chess)",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "daniel1daniyan@gmail.com",
    },
  },
  {
    name: "Ajibade Benjamin Ogooluwa",
    position: "Director of sponsorships",
    department: "Mechatronics Engineering",
    year: "400 Level",
    image: "/images/executives/current/Benjamin.jpeg",
    bio: "  i’m a curious person with a knack for solving problems and bringing ideas to life. i enjoy learning, building, and taking on new challenges while keeping things simple and approachable.",
    achievements: ["Ranked among the Top 5% of the Robotics and Artificial Intelligence Nigeria (RAIN) Robot Development & Automation (RDA) Cohort 9.",
      "Co-Founder, 5Trees Technologies.",
      "Head of Innovation, ASVA 2026/2027.",
      "Director of Hardware & Robotics, ASVA 2025/2026.",
      "⁠PR committee, NUESA HEART 2025/26",
      "Engineer Pioneer Award Recipient, DevCon 2026.",
      "⁠Product lead, Signal 7.",
      "Multi-certified Full-Stack Software Developer and Robotics Engineer.",
    ],
    social: {
      whatsapp: "#",
      snapchat: "ao.b3nji",
      email: "ogzzyajibs@gmail.com",
    },
  },

  {
    name: "Ughovero Prosper Ogagaoghene",
    position: "Director of External affairs",
    department: "Mechatronics Engineering",
    year: "500 Level",
    image: "/images/executives/current/Prosper.jpeg",
    bio: "I’m Prosper Ughovero, a Mechatronics Engineering student at Afe Babalola University. I enjoy taking on challenges, learning new skills, and turning ideas into something meaningful. Whether it’s engineering, leadership, or empowering people through community projects, I believe in growing, helping others grow, and leaving every place better than I met it.",
    achievements: [],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "itsprosperugh@gmail.com",
    },
  },
    {
    name: "Onochie Danielle",
    position: "Creative Director",
    department: "Bio medical engineering",
    year: "300 Level",
    image: "/images/executives/current/onochie.jpeg",
    bio: " I’m easy to talk to and I love meeting new people, I also enjoy arts and crafts",
    achievements: ["PR committee, BESA 2025/2026"],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Adeniji Adam",
    position: "Director of media and publicity",
    department: "Mechanical Engineering",
    year: "500 Level",
    image: "/images/executives/current/Adeniji.jpeg",
    bio: " Creative mind, eager to learn new things, love art.",
    achievements: [
      "Abuad drug free club 2022/23",
      "Social Elites NUESA 23/24 ",
      "Social Elites NUESA 24/25",
      "Academic Committee MMESA 2025/2026",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "adamadeniji2004@gmail.com",
    },
  },
 
];

export const pastExecutivesByYear = [
  {
    year: "2025-2026",
    executives: [
      {
        name: "Kienabere Alaibi Emmanuel a.k.a Kina",
        position: "President",
        department: "Electrical/Electronics Engineering",
        image: "/images/executives/past/Kienabere.jpg",
      },
      {
        name: "Chinenye Chisomebi, Chine",
        position: "Vice President",
        department: "Biomedical Engineering",
        image: "/images/executives/past/Chinenye.jpg",
      },
      {
        name: "Olajuyigbe Daniel Oluwasanmi",
        position: "General Secretary",
        department: "Aeronautical and Astronautical Engineering",
        image: "/images/executives/past/Daniel.jpg",
      },
      {
        name: "Lawal Mohammed-Mustapha Olamide",
        position: "Financial Secretary",
        department: "Mechatronics Engineering",
        image: "/images/executives/past/Mustee.JPG",
      },
      {
        name: "Ughovero Prosper Ogagaoghene",
        position: "Assistant General Secretary",
        department: "Mechatronics Engineering",
        image: "/images/executives/past/Prosper.jpg",
      },
      {
        name: "Adeniyi Emmanuel",
        position: "Public Relations Officer",
        department: "Mechanical Engineering",
        image: "/images/executives/past/Smallz.jpg",
      },
      {
        name: "Ezeaku Daniel Chiemerie",
        position: "Treasurer",
        department: "Computer Engineering",
        image: "/images/executives/past/Chiemerie.jpg",
      },
      {
        name: "David Tokoni Tamunosiki",
        position: "Social Director (Male)",
        department: "Mechatronics Engineering",
        image: "/images/executives/past/Dtroiy.jpg",
      },
      {
        name: "Stephen-Oleka Amarachi Jasmine",
        position: "Social Director (Female)",
        department: "Computer Engineering",
        image: "/images/executives/past/Amarachi.jpg",
      },
      {
        name: "David Lawrence",
        position: "Sport Director (Male)",
        department: "Mechatronics Engineering",
        image: "/images/executives/past/Lawrence.jpg",
      },
      {
        name: "Hillary-Edjere Eseoghene Sisipho",
        position: "Sport Director (Female)",
        department: "Mechatronics Engineering",
        image: "/images/executives/past/Ese.jpg",
      },
      {
        name: "Ahiakwo Ochinma Karissa",
        position: "Welfare Officer",
        department: "Mechatronics Engineering",
        image: "/images/executives/past/Karissa.jpg",
      },
      {
        name: "Charles Onochie Ezeamaka",
        position: "Chief of Staff",
        department: "Mechatronics Engineering",
        image: "/images/executives/past/Charles.jpg",
      },
      {
        name: "AYANBADEJO Araoluwa Gbadunola",
        position: "Director of Academics",
        department: "Electrical/Electronics Engineering",
        image: "/images/executives/past/Araoluwa.jpg",
      },
      {
        name: "Azike Ifeanyi Daniel",
        position: "Director of Events",
        department: "Mechanical Engineering",
        image: "/images/executives/past/Azike.jpg",
      },
      {
        name: "Dauda Nasir",
        position: "Technical Secretary",
        department: "Electrical/Electronics Engineering",
        image: "/images/executives/past/Nasir.jpg",
      },
      {
        name: "Wejih Destiny Hachikaru",
        position: "Director of External affairs",
        department: "Electrical Engineering",
        image: "/images/executives/past/Destiny.jpg",
      },
      {
        name: "Akerele Obaloluwa",
        position: "Creative Director",
        department: "Mechanical Engineering",
        image: "/images/executives/past/Oba.jpg",
      },
      {
        name: "Adebayo Emmanuel Ayotomiwa",
        position: "Editor in Chief",
        department: "Mechanical Engineering",
        image: "/images/executives/past/Bayo.jpg",
      },
    ],
  },
  {
    year: "2024-2025",
    executives: [
      {
        name: "Marvelous Osigwe",
        position: "President",
        department: "Civil Engineering",
        image:
          "/images/executives/past/marvelous-osigwe-president-nuesa-abuad-2024-2025.jpg",
      },
      {
        name: "Hannah Ezera",
        position: "Vice President",
        department: "Chemical Engineering",
        image:
          "/images/executives/past/hannah-ezera-vice-president-nuesa-abuad-2024-2025.jpg",
      },
      {
        name: "Ciaran Okafor",
        position: "General Secretary",
        department: "Civil Engineering",
        image:
          "/images/executives/past/ciaran-okafor-general-secretary-nuesa-abuad-2024-2025.jpg",
      },
      {
        name: "Qudus Igbalaye",
        position: "Financial Secretary",
        department: "Mechanical Engineering",
        image:
          "/images/executives/past/qudus-igbalaye-financial-secretary-nuesa-abuad-2024-2025.jpg",
      },
      {
        name: "Arnold Olika",
        position: "Public Relations Officer",
        department: "Mechatronics Engineering",
        image:
          "/images/executives/past/arnold-olika-pro-nuesa-abuad-2024-2025.jpg",
      },
      {
        name: "Royal Week-Doodei",
        position: "Social Director (Male)",
        department: "Civil Engineering",
        image:
          "/images/executives/past/royal-week-doodei-social-director-male-nuesa-abuad-2024-2025.jpg",
      },
      {
        name: "Elizabeth Soriwei",
        position: "Social Director (Female)",
        department: "Biomedical Engineering",
        image:
          "/images/executives/past/elizabeth-soriwei-social-director-female-nuesa-abuad-2024-2025.jpg",
      },
      {
        name: "Awele Okofu",
        position: "Welfare Officer",
        department: "Biomedical Engineering",
        image:
          "/images/executives/past/awele-okofu-welfare-officer-nuesa-abuad-2024-2025.jpg",
      },
      {
        name: "Joshua Osiyemi",
        position: "Sport Director (Male)",
        department: "Aeronautical Engineering",
        image:
          "/images/executives/past/joshua-osiyemi-sport-director-male-nuesa-abuad-2024-2025.jpg",
      },
      {
        name: "Chetachi Okorie",
        position: "Sport Director (Female)",
        department: "Mechanical Engineering",
        image:
          "/images/executives/current/OIP.webp",
      },
      {
        name: "Emmanuel Omoiya",
        position: "Technical Secretary",
        department: "Mechtronics Engineering",
        image:
          "/images/executives/past/emmanuel-omoiya-technical-secretary-nuesa-abuad-2024-2025.jpg",
      },
    ],
  },
  {
    year: "2023-2024",
    executives: [
      {
        name: "Oluwaseun Adebayo",
        position: "President",
        department: "Mechanical Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
      {
        name: "Chioma Okonkwo",
        position: "Vice President",
        department: "Electrical Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
      {
        name: "Abdullahi Ibrahim",
        position: "General Secretary",
        department: "Civil Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
      {
        name: "Tolu Adeyemi",
        position: "Financial Secretary",
        department: "Chemical Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
    ],
  },
  {
    year: "2022-2023",
    executives: [
      {
        name: "Ngozi Okafor",
        position: "President",
        department: "Computer Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
      {
        name: "Emmanuel Osei",
        position: "Vice President",
        department: "Mechatronics Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
      {
        name: "Aisha Mohammed",
        position: "General Secretary",
        department: "Civil Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
      {
        name: "Daniel Obi",
        position: "Financial Secretary",
        department: "Electrical Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
    ],
  },
  {
    year: "2021-2022",
    executives: [
      {
        name: "Joshua Adeniyi",
        position: "President",
        department: "Mechanical Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
      {
        name: "Sarah Mensah",
        position: "Vice President",
        department: "Chemical Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
      {
        name: "Taiwo Ogunleye",
        position: "General Secretary",
        department: "Civil Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
      {
        name: "Blessing Nwachukwu",
        position: "Financial Secretary",
        department: "Computer Engineering",
        image:
          "/images/executives/current/OIP.webp?height=300&width=300",
      },
    ],
  },
];
