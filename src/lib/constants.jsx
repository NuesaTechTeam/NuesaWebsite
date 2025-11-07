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
    title: "Dinner",
    url: "/dinner",
  },
  {
    title: "Contact Us",
    url: "/contactus",
  },
];

export const socialLinks = [
  {
    title: "Twitter",
    icon: <BsTwitterX size={24} className=" hover:text-blue-500" />,
    link: "https://x.com/nuesa_abuad?s=21",
    color: "",
  },
  {
    title: "Snapchat",
    icon: <BsSnapchat size={24} className=" hover:text-yellow-400" />,
    link: "https://www.snapchat.com/add/nuesa_abuad01",
    color: "",
  },
  {
    title: "Instagram",
    icon: <BsInstagram size={24} className=" hover:text-pink-500" />,
    link: "https://www.instagram.com/nuesaabuad?igsh=MThyYzg3aXN5ZHg2bQ==",
    color: "",
  },
  {
    title: "WhatsApp",
    icon: <BsWhatsapp size={24} className=" hover:text-green-500" />,
    link: "https://wa.me/2349153002715?text=Hello%20I%20am%20contacting%20about%20NUESA",
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
    date: "November 22, 2025",
    time: "06:00 PM - 10:30 PM",
    venue: "Alfa Belgore Hall, ABUAD",
    description: "Annual dinner and awards night.",
    image: "/images/events/nuesa-dinner-2025.jpg",
    category: "Mafia",
    status: "upcoming",
    featured: true,
  },
  {
    id: 7,
    title: "Nuesalympics",
    date: "Coming Soon",
    time: "02:00 PM - 5:30 PM",
    venue: "Pavilion, ABUAD",
    description: "A very first olympics competition by NUESA",
    image: "/images/events/nuesa-olympics.jpg",
    category: "sport",
    status: "upcoming",
    featured: true,
  },
];

export const timeTables = [
  {
    id: 1,
    title: "100L Engineering College Timetable",
    link: "/documents/timetables/100l-timetable.pdf",
  }
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
    src: "/images/events/tech-fusion.jpg",
    title: "TechFest 2024 - Opening Ceremony",
    eventDate: "October 2024",
  },
  {
    id: 2,
    src: "/images/events/college.jpg",
    title: "Engineering Symposium - Keynote Speech",
    eventDate: "September 2024",
  },
  {
    id: 3,
    src: "/images/events/tech-fusion.jpg",
    title: "Hackathon 2024 - Team Collaboration",
    eventDate: "August 2024",
  },
  {
    id: 4,
    src: "/images/events/salam-odo-nuwa.jpg",
    title: "Cultural Night - Dance Performance",
    eventDate: "July 2024",
  },
  {
    id: 5,
    src: "/images/events/career-path-in-fintech.jpg",
    title: "Industry Connect - Networking Session",
    eventDate: "June 2024",
  },
  {
    id: 6,
    src: "/images/events/career-path-in-fintech.jpg",
    title: "Science Exhibition - Project Showcase",
    eventDate: "May 2024",
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
    name: "Kienabere Alaibi Emmanuel a.k.a Kina",
    position: "President",
    department: "Electrical/Electronics Engineering",
    year: "500 Level",
    image: "/images/executives/current/Kienabere.jpg",
    bio: " I’m a passionate student leader and all-round people person who enjoys creating meaningful experiences and building connections that last. When I’m not leading or learning, I’m either on the football pitch or rooting for Man City or Barça. I’m also learning French adding a little joie de vivre to the mix and always chasing growth, purpose, and good vibes.",
    achievements: [
      "President of the NUESA 25/26 administration.",
      "Assistant Director of Engineering, Abuad Green Club 2024/2025.",
      "Member of the PR committee NUESA 24/25 administration.",
      "Hosted Sports competition to increase sports participation in college.",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Chinenye Chisomebi, Chine",
    position: "Vice President",
    department: "Biomedical Engineering",
    year: "400 Level",
    image: "/images/executives/current/Chinenye.jpg",
    bio: "I am a friendly, smiling face who is always willing to engage and offer support to the best of my abilities. I believe in fostering a supportive environment where every student feels seen and heard.",
    achievements: [
      "Assistant General Secretary, BESA 2024/2025",
      "Assistant General Secretary, BESA 2024/2025",
      "Academic Committee, SRC 2024/2025",
      "Social Committee, SRC 2024/2025",
      "Content Developer, Studysmart, 2023/2024 & 2024/2025",
      "Member, ASVA.",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Olajuyigbe Daniel Oluwasanmi ",
    position: "General Secretary",
    department: "Aeronautical and Astronautical Engineering ",
    year: "500 Level",
    image: "/images/executives/current/Daniel.jpg",
    bio: "I am an aerospace enthusiast with a track record of leading tech-driven initiatives, founding the DACTION Initiative to promote sustainability and education, and collaborating remotely with U.S.-based organizations on youth-led development and advocacy projects",
    achievements: [
      "President and Founder, DACTION Initiative",
      "Design Squad Member, Planeteer Alliance, Captain Planet Foundation ",
      "General Secretary, ABUAD Salt Valley Associates (ASVA)",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Lawal Mohammed-Mustapha Olamide",
    position: "Financial Secretary",
    department: "Mechatronics engineering ",
    year: "500 Level",
    image: "/images/executives/current/Mustee.jpg",
    bio: "I’m goal-oriented and driven, consistently striving to achieve my ambitions with dedication and hard work",
    achievements: ["Class representative, Mechatronics department, 500l"],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Ughovero Prosper Ogagaoghene ",
    position: "Assistant General Secretary",
    department: "Mechatronics Engineering",
    year: "400 Level",
    image: "/images/executives/current/Prosper.jpg",
    bio: "I am a Mechatronics Engineering student at Afe Babalola University, passionate about automation, innovation, and sustainable development. I run an online business, hold leadership roles, and I’m building a brand in trading and tech. I’m focused on growth, excellence, and contributing to the future of Industry 4.0.",
    achievements: [],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Adeniyi Emmanuel",
    position: "Public Relations Officer",
    department: "Mechanical Engineering",
    year: "500 Level",
    image: "/images/executives/current/Smallz.jpg",
    bio: "The best in the world",
    achievements: [],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Ezeaku Daniel Chiemerie",
    position: "Treasurer",
    department: "Computer Engineering",
    year: "400 Level",
    image: "/images/executives/current/Chiemerie.jpg",
    bio: "I’m a hardworking person with standards. I love connecting with new and great minds and making people around me happier. ",
    achievements: [],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "David Tokoni Tamunosiki",
    position: "Social Director (Male)",
    department: "Mechatronics Engineering",
    year: "500 Level",
    image: "/images/executives/current/Dtroiy.jpg",
    bio: "Organizing social events and activities that foster community among engineering students. David ensures that NUESA members have opportunities to network and build relationships outside the classroom.",
    achievements: [],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Stephen-Oleka Amarachi Jasmine",
    position: "Social Director (Female)",
    department: "Computer Engineering",
    year: "500 Level",
    image: "/images/executives/current/Amarachi.jpg",
    bio: "Fun and social",
    achievements: ["Social elite 2023/2024 & 2024/2025)"],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "David Lawrence ",
    position: "Sport Director (Male)",
    department: "Mechatronics engineering ",
    year: "500 Level",
    image: "/images/executives/current/Lawrence.jpg",
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
      email: "#",
    },
  },
  {
    name: "Hillary-Edjere Eseoghene Sisipho",
    position: "Sport Director (Female)",
    department: "Mechatronics Engineering",
    year: "500 Level",
    image: "/images/executives/current/Ese.jpg",
    bio: "Encourages female student involvement in sports. Eseoghene empowers women in engineering to participate in wellness and competition.",
    achievements: [],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Ahiakwo Ochinma Karissa",
    position: "Welfare Officer",
    department: "Mechatronics Engineering",
    year: "500 Level",
    image: "/images/executives/current/Karissa.jpg",
    bio: "I’m a tall and easygoing person. Friendly by nature, slightly dramatic by choice. I love good conversations, and being around people who don’t take life too seriously (but still get things done). I’m approachable, open-minded, always down for something fun and I’m the type to hype you up for no reason.",
    achievements: [
      "2022/2023 NUESA Welfare Committee",
      " Social Elite 2023/2024 SRC Welfare Committee & Social Elite",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Charles Onochie Ezeamaka",
    position: "Chief of Staff",
    department: "Mechatronics Engineering",
    year: "500 Level",
    image: "/images/executives/current/Charles.jpg",
    bio: " I am a passionate Mechatronics Engineering student, skilled in robotics and web development, driven by innovation, leadership, and a desire to make meaningful impact through technology, project management and leadership.",
    achievements: ["NUESA Treasurer 2024/2025"],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "AYANBADEJO Araoluwa Gbadunola",
    position: "Director of Academics",
    department: "Electrical/Electronics Engineering",
    year: "400 Level",
    image: "/images/executives/current/Araoluwa.jpg",
    bio: " I’m a thoughtful and purpose driven person who values good connections and balances ambition with empathy and a strive to grow and be better.",
    achievements: ["Treasurer of APWEN 2024/2025"],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Azike Ifeanyi Daniel",
    position: "Director of Events",
    department: "Mechanical Engineering",
    year: "500 Level",
    image: "/images/executives/current/Azike.jpg",
    bio: "Yet hardworking and poised, I'm all about getting down to business.",
    achievements: [
      "Produced the most attended Engineering Gala in history",
      "Managed logistics for 5+ technical and social events",
      "Oversaw successful virtual and hybrid event integration",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Dauda Nasir",
    position: "Technical Secretary",
    department: "Electrical/Electronics Engineering",
    year: "500 Level",
    image: "/images/executives/current/Nasir.jpg",
    bio: "I’m a final-year Electrical Electronics Engineering student with a strong passion for technology, AI, and innovation. I enjoy writing code and developing practical solutions to real-world problems through programming.",
    achievements: [
      "Built and contributed to several tech projects, including an AI-powered study app and academic tools.",
      "Built production ready applications and websites for individuals ",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: "Wejih Destiny Hachikaru ",
    position: "Director of External affairs",
    department: "Electrical Engineering",
    year: "500 Level",
    image: "/images/executives/current/Destiny.jpg",
    bio: "I am eager to work as an individual and also as part of a team to achieve meaningful change. I also enjoy networking with others and providing solutions to problems of our colleagues through shared collaboration.",
    achievements: [
      "Member of ASVA (Abuad Salt Valley Assiciates)24/25",
      "Member of Study Smart 23/24",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: " Akerele Obaloluwa",
    position: "Creative director",
    department: "Mechanical Engineering",
    year: "500 Level",
    image: "/images/executives/current/Oba.jpg",
    bio: " I endlessly bring beautiful ideas to life.",
    achievements: [],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
  {
    name: " Adebayo Emmanuel Ayotomiwa",
    position: "Editor in Chief ",
    department: "Mechanical Engineering",
    year: "500 Level",
    image: "/images/executives/current/Bayo.jpg",
    bio: " I’m a calm collected guy that enjoys doing things for the plot. I enjoy listen to music and also anything that has to do with being creative.",
    achievements: ["Assistant General Secretary, NUESA 2024/2025"],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "#",
    },
  },
];

export const pastExecutivesByYear = [
  {
    year: "2024-2025",
    executives: [
      {
        name: "Marvelous Osigwe",
        position: "President",
        department: "Civil Engineering",
        image:
          "/images/executives/past/Marvelous.jpg?height=300&width=300",
      },
      {
        name: "Hannah Ezera",
        position: "Vice President",
        department: "Chemical Engineering",
        image:
          "/images/executives/past/Hannah.jpg?height=300&width=300",
      },
      {
        name: "Ciaran Okafor",
        position: "General Secretary",
        department: "Civil Engineering",
        image:
          "/images/executives/past/Ciaran.jpg?height=300&width=300",
      },
      {
        name: "Qudus Igbalaye",
        position: "Financial Secretary",
        department: "Mechanical Engineering",
        image:
          "/images/executives/past/Qudus.jpg?height=300&width=300",
      },
      {
        name: "Arnold Olika",
        position: "Public Relations Officer",
        department: "Mechatronics Engineering",
        image:
          "/images/executives/past/Arnold.jpg?height=300&width=300",
      },
      {
        name: "Royal Week-Doodei",
        position: "Social Director (Male)",
        department: "Civil Engineering",
        image:
          "/images/executives/past/Royal.jpg?height=300&width=300",
      },
      {
        name: "Elizabeth Soriwei",
        position: "Social Director (Female)",
        department: "Biomedical Engineering",
        image:
          "/images/executives/past/Elizabeth.jpg?height=300&width=300",
      },
      {
        name: "Awele Okofu",
        position: "Welfare Officer",
        department: "Biomedical Engineering",
        image:
          "/images/executives/past/Awele.jpg?height=300&width=300",
      },
      {
        name: "Joshua Osiyemi",
        position: "Sport Director (Male)",
        department: "Aeronautical Engineering",
        image:
          "/images/executives/past/Joshua.jpg?height=300&width=300",
      },
      {
        name: "Chetachi Okorie",
        position: "Sport Director (Female)",
        department: "Mechanical Engineering",
        image:
          "/images/executives/past/Cheta.jpg?height=300&width=300",
      },
      {
        name: "Emmanuel Omoiya",
        position: "Technical Secretary",
        department: "Mechtronics Engineering",
        image:
          "/images/executives/past/Emmanuel.jpg?height=300&width=300",
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
