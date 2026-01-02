import React, { useEffect, useState } from 'react'
import nuesaHeart from "../assets/nuesaHeart.png"
import {
  Heart,
  Users,
  Calendar,
  BookOpen,
  Mail,
  MessageCircle,
  FileText,
  Video,
  Download,
  UserPlus,
  ChevronRight,
  Target,
  Eye,
  Clock,
  Search,
  Send,
  Instagram,
  Twitter,
  Phone,
  ChevronLeft,
} from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';
import { BsInstagram, BsSnapchat, BsTiktok } from 'react-icons/bs';

const HeartPage = () => {

  const [currentQuote, setCurrentQuote] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCounselor, setSelectedCounselor] = useState("");
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });

  const quotes = [
    "Your mental health is just as important as your physical health.",
    "It's okay to not be okay. Reach out, we're here for you.",
    "Resilience is not about never falling, it's about always rising.",
    "You are not alone in this journey. Together, we are stronger.",
    "Taking care of yourself is not selfish, it's essential.",
  ];

  const teamMembers = [
    {
      name: "Onochie Maryann Ezinne",
      department: "Mechatronics Engineering",
      role: "Director of HEART",
      message: "Here to listen and support you",
      photo:
        "https://res.cloudinary.com/dtamm3ss1/image/upload/v1763637372/ydawvrfg4yxb3hajnovl.jpg",
    },
    {
      name: "Kanyinsola Omolola",
      department: "Electrical Engineering",
      role: "Deputy Director",
      message: "Let's talk about what matters",
      photo:
        "https://res.cloudinary.com/dtamm3ss1/image/upload/v1763636872/pf4ppy7mk9q7tykkvko0.jpg",
    },
    {
      name: "Elisha Fezan Wombo",
      department: "Mechatronics Engineering",
      role: "General Secretary",
      message: "Your wellness is my priority",
      photo:
        "https://res.cloudinary.com/dtamm3ss1/image/upload/v1763637369/l5ixdpmiqox87a9snlkq.jpg",
    },
    {
      name: "Oluwagbemiga Oluwasanmi Ogungboye",
      department: "Computer Engineering",
      role: "Financial Secretary",
      message: "Creating safe spaces together",
      photo:
        "https://res.cloudinary.com/dtamm3ss1/image/upload/v1763637370/zwt6sv2emhj3tjepyebu.jpg",
    },
    {
      name: "Victor Faeren Utoo",
      department: "Computer Engineering",
      role: "Public Relations Officer",
      message: "Creating safe spaces together",
      photo:
        "https://res.cloudinary.com/dtamm3ss1/image/upload/v1763637371/vsopehburlkoreatoh6m.jpg",
    },
  ];

  const upcomingEvents = [
    {
      date: "Nov 28, 2025",
      theme: "Inside Out",
      description: "Empowering a Generation to Rise Beyond Stress and Thrive",
      time: "2:00 PM",
    },
  ];

  const pastEvents = [
  ];

  const resources = [
    {
      category: "Articles & Blogs",
      icon: FileText,
      items: [
        "Managing Academic Pressure",
        "Self-Care for Engineering Students",
        "Building Healthy Study Habits",
        "Coping with Anxiety",
      ],
    },
    {
      category: "Downloadables",
      icon: Download,
      items: [
        "Mental Health Awareness Poster",
        "Self-Care Checklist",
        "Stress Management Guide",
        "Resilience Handbook",
      ],
    },
    {
      category: "Videos & Podcasts",
      icon: Video,
      items: [
        "Understanding Mental Health",
        "HEART Campaign Highlights",
        "Student Stories of Resilience",
        "Mindfulness Meditation Guide",
      ],
    },
  ];

  const milestones = [
    { year: "2025", event: "HEART Initiative Launched" },
    { year: "2025", event: "First Mental Health Campaign" },
    { year: "2025", event: "Peer Counselor Program Started" },
    { year: "2025", event: "100+ Students Reached" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [quotes.length]);

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    // const filteredResources = resources
    //   .map((resource) => ({
    //     ...resource,
    //     items: resource.items.filter((item) =>
    //       item.toLowerCase().includes(searchTerm.toLowerCase())
    //     ),
    //   }))
    //   .filter((resource) => resource.items.length > 0);

    const handleContactSubmit = () => {
      const counselorText = selectedCounselor
        ? `Counselor: ${selectedCounselor}`
        : "Anonymous Submission";
      const nameText = formData.name
        ? `Name: ${formData.name}`
        : "Name: Anonymous";
      const emailText = formData.email
        ? `Email: ${formData.email}`
        : "Email: Not provided";

      const whatsappMessage = `HEART Support Request\n\n${nameText}\n${emailText}\n${counselorText}\n\nMessage:\n${formData.message}`;

      const whatsappNumber = "2349017615500";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      window.open(whatsappUrl, "_blank");

      setFormData({ name: "", email: "", message: "" });
      setSelectedCounselor("");
    };

    const handleGoogleFormContact = () => {
      window.open("https://forms.gle/tJXHvaVaYtq9d5pR6", "_blank");
    };

    const handleJoinHeart = () => {
      window.open("https://forms.gle/tJXHvaVaYtq9d5pR6", "_blank");
    };


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 py-20 px-2 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Heart className="absolute top-10 left-10 w-16 h-16 text-red-400 animate-pulse" />
          <Heart
            className="absolute bottom-20 right-20 w-20 h-20 text-pink-400 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <Heart
            className="absolute top-1/2 left-1/4 w-12 h-12 text-red-300 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <img
              src={nuesaHeart}
              alt="NUESA HEART Logo"
              className="w-16 h-16 mr-4"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              H.E.A.R.T
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-red-600 font-semibold mb-8">
            Helping Everyone Achieve Resilience Together
          </p>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            A safe space for mental wellness, peer support, and personal growth
            within the NUESA community.
          </p>
          {/* <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Learn More About Us
          </button> */}
        </div>
      </div>

      {/* Quick Links Bar */}
      <div className="bg-white shadow-md ">
        <div className="max-w-7xl mx-auto px-2 py-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Events", icon: Calendar, section: "events" },
              { label: "Resources", icon: BookOpen, section: "resources" },
              { label: "Meet the Team", icon: Users, section: "team" },
              {
                label: "Contact a Counselor",
                icon: MessageCircle,
                section: "contact",
              },
            ].map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.section)}
                className="flex items-center px-6 py-2 bg-pink-50 hover:bg-pink-100 text-red-600 font-medium rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <link.icon className="w-5 h-5 mr-2" />
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Carousel */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 py-12 px-2">
        <div className="max-w-4xl mx-auto text-center relative">
          <button
            onClick={() =>
              setCurrentQuote(
                (prev) => (prev - 1 + quotes.length) % quotes.length
              )
            }
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="px-12">
            <p className="text-2xl md:text-3xl text-white font-medium italic">
              "{quotes[currentQuote]}"
            </p>
          </div>

          <button
            onClick={() =>
              setCurrentQuote((prev) => (prev + 1) % quotes.length)
            }
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {quotes.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentQuote ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* About HEART */}
      <div className="py-16 px-2 bg-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-red-500 mr-2" />
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                About Us
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About H.E.A.R.T
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-red-100">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-red-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide holistic mental health support through evidence-based
                resilience training, accessible peer networks, research-driven
                programs, and transformative community engagement that empowers
                engineering students to overcome challenges and achieve
                sustainable success.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-pink-100">
              <div className="flex items-center mb-4">
                <Eye className="w-8 h-8 text-pink-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To pioneer a culture of mental resilience in engineering
                education, where every student is equipped to navigate academic
                and personal challenges with confidence and community support.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl p-8 px-3 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <Clock className="w-6 h-6 mr-2 text-red-500" />
              The Journey of HEART
            </h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200"></div>
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <div className="bg-pink-50 rounded-lg p-4 inline-block">
                      <p className="font-bold text-red-600 text-xl">
                        {milestone.year}
                      </p>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-white"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Part of NUESA Banner */}
          <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-center">
            <p className="text-white text-lg font-medium">
              HEART is a proud initiative of
              <span className="font-bold ml-2">
                NUESA (Nigerian University Engineering Students Association)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div id="team" className="py-16 px-2 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-red-500 mr-2" />
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                Our Team
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Compassionate leaders dedicated to your mental wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-pink-100"
              >
                <div className="text-center">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="mx-auto rounded-full w-24 h-24 object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {member.department}
                  </p>
                  <p className="text-sm font-semibold text-red-600 mb-4">
                    {member.role}
                  </p>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-gray-700 italic mb-3">
                      "{member.message}"
                    </p>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center mx-auto">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Talk to Me
                    </button>
                  </div>

                  <Heart className="w-8 h-8 text-red-400 mx-auto mt-4 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events */}
      <div id="events" className="py-16 px-2 bg-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-red-500 mr-2" />
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                Events
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              HEART Events
            </h2>
          </div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Upcoming Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-100 hover:border-red-300 transition-all duration-300"
                >
                  <div className="bg-red-100 text-red-600 font-bold px-3 py-1 rounded-full inline-block mb-4 text-sm">
                    {event.date}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {event.theme}
                  </h4>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{event.time}</span>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                      Join Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Past Events
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg"
                  >
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">{event.date}</p>
                    <p className="text-gray-700">{event.recap}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resources */}
      <div id="resources" className="py-16 px-2 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-red-500 mr-2" />
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                Resources
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mental Health Resources
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Your library for mental wellness and resilience
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 shadow-lg border-2 border-pink-100"
              >
                <div className="flex items-center mb-4">
                  <resource.icon className="w-8 h-8 text-red-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {resource.category}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {resource.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start group cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 text-red-500 mr-2 mt-0.5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact a Counselor */}
      <div
        id="contact"
        className="py-16 px-2 bg-gradient-to-br from-pink-50 via-red-50 to-pink-100"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-red-500 mr-2" />
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                Get Support
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Contact a Counselor
            </h2>
            <p className="text-xl text-gray-600">
              Need to talk? We're here for you. Your conversations are
              confidential.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-2xl relative overflow-hidden">
            <Heart className="absolute right-8 top-8 w-16 h-16 text-red-200 animate-pulse" />

            <div className="space-y-6 relative z-10">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Anonymous"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Select a Counselor or Submit Anonymously
                </label>
                <select
                  value={selectedCounselor}
                  onChange={(e) => setSelectedCounselor(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Anonymous Submission</option>
                  {teamMembers.map((member, index) => (
                    <option key={index} value={member.name}>
                      {member.name} - {member.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  How can we help you?
                </label>
                <textarea
                  rows="6"
                  placeholder="Share what's on your mind... Remember, you're not alone."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>

              <button
                onClick={handleContactSubmit}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                You can also submit via our{" "}
                <a
                  href="#"
                  onClick={handleGoogleFormContact}
                  className="text-red-600 hover:underline font-medium"
                >
                  Google Form
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Join HEART */}
      <div className="py-16 px-2 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <UserPlus className="w-8 h-8 text-red-500 mr-2" />
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                Join Us
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Join HEART
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Become a volunteer and help create a supportive community for your
              peers
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-8 shadow-lg border-2 border-red-100">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What it means to volunteer:
              </h3>
              <ul className="space-y-3">
                {[
                  "Participate in mental health awareness campaigns",
                  "Support peers through active listening and empathy",
                  "Attend training sessions on mental health support",
                  "Help organize wellness events and activities",
                  "Be part of a compassionate community making real impact",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Heart className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleJoinHeart}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Sign Up to Join HEART
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Complete our{" "}
              <a href="#" className="text-red-600 hover:underline font-medium">
                volunteer registration form
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="py-12 px-4 bg-gradient-to-r from-red-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Connect With HEART
          </h3>
          <p className="text-white mb-8">
            Follow us for daily inspiration, event updates, and mental health
            tips
          </p>

          <div className="flex justify-center gap-6">
            {[
              {
                icon: BsInstagram,
                label: "Instagram",
                link: "https://www.instagram.com/nuesamentalhealth?igsh=YjJkZ3h1NjhvZnY3",
              },
              {
                icon: BsSnapchat,
                label: "Snapchat",
                link: "https://www.snapchat.com/add/nuesaheart?share_id=96wdx1jgK2k&locale=en-GB",
              },
              {
                icon: FaWhatsapp,
                label: "WhatsApp",
                link: "https://whatsapp.com/channel/0029Vb5GEyHGE56blJUghb37",
              },
              {
                icon: BsTiktok,
                label: "TikTok",
                link: "https://www.tiktok.com/@nuesamentalhealth?_t=ZS-90SMHhite6K&_r=1",
              },
            ].map((social, index) => (
              <button
                key={index}
                
                className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 group"
              >
                <a href={social.link} className=''>
                <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeartPage