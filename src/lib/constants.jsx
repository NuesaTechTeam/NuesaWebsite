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
    title: "Contact Us",
    url: "/contactus",
  },
];

export const socialLinks = [
  {
    title: "Twitter",
    icon: <BsTwitterX size={24} className=' hover:text-blue-500' />,
    link: "https://x.com/nuesa_abuad?s=21",
    color: "",
  },
  {
    title: "Snapchat",
    icon: <BsSnapchat size={24} className=' hover:text-yellow-400' />,
    link: "https://snapchat.com/t/LFnYiU0W",
    color: "",
  },
  {
    title: "Instagram",
    icon: <BsInstagram size={24} className=' hover:text-pink-500' />,
    link: "https://www.instagram.com/nuesaabuad?igsh=MThyYzg3aXN5ZHg2bQ==",
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
    date: "October 12, 2024",
    time: "09:30 AM - 12:00 PM",
    venue: "Engineering Auditorium",
    description:
      "Hands-on workshops on emerging technologies and engineering practices led by industry experts.",
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
    title: "Career Path in Fintech: The Journey",
    date: "September 7, 2024",
    time: "11:30 AM - 13:30 PM",
    venue: "Google Meet",
    description:
      "A webinar session hosting 2 guests with a wealth of experience in the fintech sector.",
    image: "/images/events/career-path-in-fintech.jpg",
    category: "Professional",
    status: "upcoming",
    featured: true
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
    featured: false,
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
    featured: false,
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
    featured: true,
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
    featured: true,
  },
];

export const newsArticles = [
  {
    id: 1,
    title: "Engineering Students Win National Robotics Championship",
    excerpt:
      "Our team of brilliant engineering students has secured first place in the National Robotics Championship, showcasing innovative solutions in autonomous systems.",
    date: "March 10, 2025",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "New AI Research Lab Opens on Campus",
    excerpt:
      "The college inaugurates a state-of-the-art Artificial Intelligence research facility, equipped with cutting-edge hardware and collaborative spaces.",
    date: "March 8, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Industry Partnership Program Launches",
    excerpt:
      "New collaboration with leading tech companies provides internship opportunities and real-world project experience for final year students.",
    date: "March 5, 2025",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "Sustainability Initiative: Solar Panel Installation Complete",
    excerpt:
      "The college achieves 60% renewable energy coverage with the completion of rooftop solar installations across all academic buildings.",
    date: "March 3, 2025",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
  },
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
      "/images/college/environment/environment1.jpg",
      "/images/college/environment/environment2.jpg",
      "/images/college/environment/environment3.jpg",
      "/images/college/environment/environment4.jpg",
      "/images/college/environment/environment5.jpg",
      "/images/college/environment/environment6.jpg",
    ],
  },
  classrooms: {
    title: "Classrooms",
    description:
      "State-of-the-art classrooms equipped with the latest technology for interactive learning",
    icon: Users,
    images: [
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop",
    ],
  },
  workshop: {
    title: "Engineering Workshops & Labs",
    description:
      "Fully equipped workshops where students bring their engineering concepts to life",
    icon: Wrench,
    images: [
      "/images/college/workshop/workshop1.jpg",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=400&fit=crop",
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
    name: "Marvelous Osigwe",
    position: "President",
    department: "Electrical Engineering",
    year: "500 Level",
    image:
      "/images/executives/current/Kinabere.jpg?height=300&width=300",
    bio: "A visionary leader with a passion for innovation and community building in engineering. Emmanuel has led several initiatives to enhance the academic and professional development of NUESA members.",
    achievements: [
      "Led the organization of the largest Engineering Week in ABUAD history",
      "Established partnerships with 5 industry leaders for internship opportunities",
      "Initiated the NUESA mentorship program connecting students with alumni",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Hannah Ezera",
    position: "Vice President",
    department: "Chemical Engineering",
    year: "400 Level",
    image:
      "/images/executives/past/Hannah.jpg?height=300&width=300",
    bio: "Dedicated to fostering collaboration and excellence among engineering students. Amina oversees the academic committee and has implemented several programs to support student success.",
    achievements: [
      "Coordinated the inter-departmental technical competition",
      "Developed the peer tutoring program for core engineering courses",
      "Represented NUESA at the National Engineering Students Conference",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Ciaran Okafor",
    position: "General Secretary",
    department: "Civil Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Ciaran.jpg?height=300&width=300",
    bio: "Committed to maintaining effective communication and organization within NUESA. David ensures that all association activities are well-documented and members are informed about opportunities.",
    achievements: [
      "Digitized NUESA's record-keeping system",
      "Created a comprehensive database of all engineering students",
      "Improved communication channels between executives and members",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Qudus Igbalaye",
    position: "Financial Secretary",
    department: "Mechanical Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Qudus.jpg?height=300&width=300",
    bio: "Managing NUESA's finances with transparency and strategic planning. Chioma has implemented systems to ensure financial accountability and efficient resource allocation.",
    achievements: [
      "Secured funding for student projects through corporate sponsorships",
      "Implemented a transparent financial reporting system",
      "Organized fundraising events for the Engineering Building renovation",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Emmanuel Addebayo",
    position: "Assistant General Secretary",
    department: "Mechanical Engineering",
    year: "400 Level",
    image:
      "/images/executives/past/Bayo.jpg?height=300&width=300",
    bio: "Committed to maintaining effective communication and organization within NUESA. David ensures that all association activities are well-documented and members are informed about opportunities.",
    achievements: [
      "Digitized NUESA's record-keeping system",
      "Created a comprehensive database of all engineering students",
      "Improved communication channels between executives and members",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Arnold Olika",
    position: "Public Relations Officer",
    department: "Mechatronics Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Arnold.jpg?height=300&width=300",
    bio: "Oversees the financial integrity of the association. Charles ensures proper budgeting, financial reporting, and resource planning for NUESA activities.",
    achievements: [
      "Redesigned NUESA's website and social media presence",
      "Established relationships with engineering firms for industry tours",
      "Created the monthly NUESA newsletter",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Charles Ezeamaka",
    position: "Treasurer",
    department: "Mechatronics Engineering",
    year: "400 Level",
    image:
      "/images/executives/past/Charles.jpg?height=300&width=300",
    bio: "Responsible for NUESA's public image and external communications. Tunde has strengthened the association's presence on campus and in the wider engineering community.",
    achievements: [
      "Prepared quarterly financial reports for executive review",
      "Assisted in securing grants for engineering initiatives",
      "Implemented a streamlined budget tracking system",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Royal Week-Doodei",
    position: "Social Director (Male)",
    department: "Civil Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Royal.jpg?height=300&width=300",
    bio: "Organizing social events and activities that foster community among engineering students. Fatima ensures that NUESA members have opportunities to network and build relationships outside the classroom.",
    achievements: [
      "Organized the annual Engineering Gala Night",
      "Coordinated inter-departmental sports competitions",
      "Established the NUESA community service initiative",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Elizabeth Soriwei",
    position: "Social Director (Female)",
    department: "Biomedical Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Elizabeth.jpg?height=300&width=300",
    bio: "Coordinates social events and activities tailored to female students. Elizabeth promotes community engagement and fun learning experiences.",
    achievements: [
      "Organized female-led networking brunch",
      "Planned themed social mixer for female engineers",
      "Initiated monthly ‘Women in Engineering’ socials",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Joshua Osiyemi",
    position: "Sport Director (Male)",
    department: "Aeronautical Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Joshua.jpg?height=300&width=300",
    bio: "Oversees all male-focused sports and fitness activities in NUESA. Joshua motivates students through athletics and team-building.",
    achievements: [
      "Hosted the annual NUESA male football league",
      "Coordinated inter-departmental athletics tournaments",
      "Launched wellness workshops and fitness bootcamps",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Chetachi Okorie",
    position: "Sport Director (Female)",
    department: "Mechanical Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Cheta.jpg?height=300&width=300",
    bio: "Encourages female student involvement in sports. Chetachi empowers women in engineering to participate in wellness and competition.",
    achievements: [
      "Led the female sports tournament planning",
      "Introduced weekly women’s fitness sessions",
      "Championed female athlete recognition awards",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Awele Okofu",
    position: "Welfare Officer",
    department: "Biomedical Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Awele.jpg?height=300&width=300",
    bio: "Ensures student welfare, advocating for resources and mental health awareness. Awele fosters a supportive engineering community.",
    achievements: [
      "Introduced the mental health awareness unit (H.E.A.R.T.)",
      "Organized mental health awareness week",
      "Distributed wellness kits to all femal toilets",
      "Created an anonymous feedback system for student concerns",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Dickson Kemdirim",
    position: "Chief of Staff",
    department: "Mechanical Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Dickson.jpg?height=300&width=300",
    bio: "Manages executive workflow and coordination across departments. Dickson enhances internal efficiency and executive planning.",
    achievements: [
      "Streamlined executive meeting processes",
      "Introduced performance tracking for all officers",
      "Helped coordinate inter-department collaboration efforts",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Christopher Anenechukwu",
    position: "Director of Academics",
    department: "Aeronautical Engineering",
    year: "400 Level",
    image:
      "/images/executives/past/Christopher.jpg?height=300&width=300",
    bio: "Dedicated to enhancing academic excellence among engineering students. Christopher coordinates tutoring programs, academic competitions, and liaises with faculty on curriculum matters.",
    achievements: [
      "Launched the Engineering Scholars Program",
      "Organized weekly study groups for key subjects",
      "Collaborated with lecturers to hold special revision classes",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Gbolahan Adebayo",
    position: "Director of Events",
    department: "Mechanical Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/gbolahan.jpg?height=300&width=300",
    bio: "Leads planning and execution of all official NUESA events. Gbolahan curates experiences that inspire, educate, and entertain students.",
    achievements: [
      "Produced the most attended Engineering Gala in history",
      "Managed logistics for 5+ technical and social events",
      "Oversaw successful virtual and hybrid event integration",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Emmanuel Omoiya",
    position: "Technical Secretary",
    department: "Mechtronics Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Emmanuel.jpg?height=300&width=300",
    bio: "Responsible for NUESA's technical activities, equipments, events, outreach, website and technical advances implmentation in the college for a better learning environment for students.",
    achievements: [
      "Organized the annual Tech Hangpout",
      "Developed a tool to help ABUAD students find their roommates easily",
      "Designed and Built the annual NUESA dinner and awards night website",
      "Built this lovely website you're looking at 😂👌",
      "Built an all inclusive platform that helps students keep track of their academic courses timtable and sends reminder in advance.",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Stephen Amadhe",
    position: "Director of outreach and alliance",
    department: "Civil Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Stephen.jpg?height=300&width=300",
    bio: "Establishes partnerships and outreach programs with industry, alumni, and other institutions. Stephen promotes visibility and cooperation.",
    achievements: [
      "Built an alumni-student career connect program",
      "Secured guest lectures from 3 industry experts",
      "Established university-industry research collaboration links",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
    },
  },
  {
    name: "Chidera Udeora",
    position: "Head of Departmental Affairs",
    department: "Computer Engineering",
    year: "500 Level",
    image:
      "/images/executives/past/Chidera.jpg?height=300&width=300",
    bio: "Manages department-level student concerns and harmonizes inter-departmental communication. Chidera ensures academic and administrative alignment.",
    achievements: [
      "Created a cross-departmental student rep network",
      "Helped resolve 12+ academic issues with HoDs",
      "Standardized semester academic review sessions",
    ],
    social: {
      whatsapp: "#",
      snapchat: "#",
      email: "mailto:president@nuesaabuad.org",
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
