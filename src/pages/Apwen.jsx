import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Eye,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { BsInstagram, BsLinkedin, BsSnapchat, BsTiktok } from "react-icons/bs";
import useSEO from "../hooks/useSEO";
import {
  APWEN_ABOUT,
  APWEN_CONTACT,
  APWEN_EVENTS,
  APWEN_EXECUTIVES,
  APWEN_LOGO,
  APWEN_SOCIALS,
} from "../lib/apwenData";
import { ApwenExecCard, ApwenTestimonials } from "../components/Apwen";

const SOCIAL_ICONS = {
  Instagram: BsInstagram,
  LinkedIn: BsLinkedin,
  Snapchat: BsSnapchat,
  TikTok: BsTiktok,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Apwen = () => {
  useSEO({
    title: "APWEN ABUAD Collegiate | Women in Engineering",
    description:
      "APWEN ABUAD Collegiate — the Association of Professional Women Engineers of Nigeria, Afe Babalola University chapter. Inspiring, supporting and advancing women in engineering.",
    keywords:
      "APWEN, APWEN ABUAD, women engineers, women in STEM, ABUAD engineering, Association of Professional Women Engineers of Nigeria, female engineers, mentorship",
    ogImage: APWEN_LOGO,
    canonicalPath: "/apwen",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "APWEN ABUAD Collegiate",
      alternateName: "Association of Professional Women Engineers of Nigeria, ABUAD Chapter",
      description:
        "A network of passionate and driven female engineers committed to fostering professional growth, mentorship and opportunities for women in STEM.",
      url: "https://nuesaabuad.ng/apwen",
      email: APWEN_CONTACT.email,
      telephone: APWEN_CONTACT.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ado-Ekiti",
        addressRegion: "Ekiti State",
        addressCountry: "NG",
        streetAddress: "Afe Babalola University",
      },
    },
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const quickLinks = [
    { label: "Who We Are", icon: Users, section: "who-we-are" },
    { label: "Executives", icon: Users, section: "executives" },
    { label: "Events", icon: Calendar, section: "events" },
    { label: "Testimonials", icon: Sparkles, section: "testimonials" },
    { label: "Contact", icon: MessageCircle, section: "contact" },
  ];

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      {/* Hero */}
      <section className='relative overflow-hidden bg-purple-50 dark:bg-purple-950/30 px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]'>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='text-center lg:text-left'
          >
            <span className='inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-purple-700 dark:text-purple-300'>
              Association of Professional Women Engineers
            </span>
            <h1 className='mt-4 text-4xl font-bold text-gray-900 dark:text-white md:text-6xl'>
              APWEN <span className='text-purple-600 dark:text-purple-400'>ABUAD</span> Collegiate
            </h1>
            <p className='mt-4 text-lg font-semibold text-purple-700 dark:text-purple-300 md:text-2xl'>
              Empowering Women, Engineering the Future
            </p>
            <p className='mx-auto mt-4 max-w-xl text-gray-700 dark:text-gray-200 lg:mx-0'>
              A community dedicated to inspiring, supporting and advancing women
              in engineering. Together, we break barriers, build innovative
              solutions and shape a more inclusive future in STEM.
            </p>
            <div className='mt-8 flex flex-wrap justify-center gap-3 lg:justify-start'>
              <button
                onClick={() => scrollToSection("contact")}
                className='inline-flex items-center rounded-full bg-purple-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-purple-700'
              >
                Become a Member
                <ArrowRight className='ml-2 h-4 w-4' />
              </button>
              <button
                onClick={() => scrollToSection("who-we-are")}
                className='inline-flex items-center rounded-full border border-purple-300 dark:border-purple-700 px-6 py-3 font-semibold text-purple-700 dark:text-purple-300 transition-colors duration-200 hover:bg-purple-100 dark:hover:bg-purple-900/40'
              >
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className='flex justify-center'
          >
            <img
              src={APWEN_LOGO}
              alt='APWEN ABUAD Collegiate logo'
              className='h-56 w-56 rounded-full object-contain md:h-72 md:w-72'
            />
          </motion.div>
        </div>
      </section>

      {/* Quick links */}
      <div className='border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm'>
        <div className='mx-auto max-w-7xl px-2 py-4'>
          <div className='flex flex-wrap justify-center gap-3'>
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.section)}
                  className='flex items-center rounded-full bg-purple-50 dark:bg-purple-900/30 px-5 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 transition-colors duration-200 hover:bg-purple-100 dark:hover:bg-purple-900/50'
                >
                  <Icon className='mr-2 h-4 w-4' />
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Who we are */}
      <section id='who-we-are' className='px-4 py-16 sm:px-6 lg:px-8'>
        <motion.div
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className='mx-auto max-w-4xl text-center'
        >
          <p className='text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400'>
            Who We Are
          </p>
          <h2 className='mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>
            A community of women building the future
          </h2>
          <p className='mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-200'>
            {APWEN_ABOUT.whoWeAre}
          </p>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className='bg-gray-50 dark:bg-gray-950 px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto grid max-w-5xl gap-6 md:grid-cols-2'>
          <motion.div
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8'
          >
            <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'>
              <Eye className='h-6 w-6' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
              Our Vision
            </h3>
            <p className='mt-2 leading-relaxed text-gray-700 dark:text-gray-200'>
              {APWEN_ABOUT.vision}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8'
          >
            <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'>
              <Target className='h-6 w-6' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
              Our Mission
            </h3>
            <p className='mt-2 leading-relaxed text-gray-700 dark:text-gray-200'>
              {APWEN_ABOUT.mission}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Executives */}
      <section id='executives' className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-10 text-center'>
            <p className='text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400'>
              Meet the Team
            </p>
            <h2 className='mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>
              APWEN Executives 2026/2027
            </h2>
          </div>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {APWEN_EXECUTIVES.map((executive, index) => (
              <ApwenExecCard
                key={executive.position}
                executive={executive}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section
        id='events'
        className='bg-gray-50 dark:bg-gray-950 px-4 py-16 sm:px-6 lg:px-8'
      >
        <div className='mx-auto max-w-7xl'>
          <div className='mb-10 text-center'>
            <p className='text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400'>
              What's Happening
            </p>
            <h2 className='mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>
              APWEN Events
            </h2>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {APWEN_EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
                className='flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6'
              >
                <div className='mb-3 flex items-center gap-2'>
                  <span className='inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/40 px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-300'>
                    <Calendar className='mr-1.5 h-3.5 w-3.5' />
                    {event.date}
                  </span>
                  {event.featured && (
                    <span className='inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400'>
                      Featured
                    </span>
                  )}
                </div>
                <h3 className='text-lg font-bold text-gray-900 dark:text-white'>
                  {event.title}
                </h3>
                <p className='mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
                  {event.description}
                </p>
                <div className='mt-4 space-y-1 border-t border-gray-100 dark:border-gray-800 pt-4 text-sm text-gray-500 dark:text-gray-400'>
                  {event.time && (
                    <p className='flex items-center'>
                      <Calendar className='mr-2 h-4 w-4' />
                      {event.time}
                    </p>
                  )}
                  <p className='flex items-center'>
                    <MapPin className='mr-2 h-4 w-4' />
                    {event.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <ApwenTestimonials />

      {/* Contact */}
      <section id='contact' className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto grid max-w-5xl gap-8 lg:grid-cols-2'>
          <motion.div
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <p className='text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400'>
              Get in touch
            </p>
            <h2 className='mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>
              Contact Us
            </h2>
            <p className='mt-3 text-gray-600 dark:text-gray-300'>
              Have a question or want to join APWEN ABUAD Collegiate? Reach out
              to our welfare team.
            </p>

            <div className='mt-6 space-y-3'>
              <a
                href={`mailto:${APWEN_CONTACT.email}`}
                className='flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 transition-colors hover:border-purple-300 dark:hover:border-purple-700'
              >
                <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'>
                  <Mail className='h-5 w-5' />
                </span>
                <span>
                  <span className='block text-xs font-bold uppercase tracking-wide text-gray-400'>
                    Email
                  </span>
                  <span className='text-sm font-medium text-gray-800 dark:text-gray-100'>
                    {APWEN_CONTACT.email}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${APWEN_CONTACT.phone}`}
                className='flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 transition-colors hover:border-purple-300 dark:hover:border-purple-700'
              >
                <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'>
                  <Phone className='h-5 w-5' />
                </span>
                <span>
                  <span className='block text-xs font-bold uppercase tracking-wide text-gray-400'>
                    Phone
                  </span>
                  <span className='text-sm font-medium text-gray-800 dark:text-gray-100'>
                    {APWEN_CONTACT.phone}
                  </span>
                </span>
              </a>

              <div className='flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4'>
                <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'>
                  <MapPin className='h-5 w-5' />
                </span>
                <span>
                  <span className='block text-xs font-bold uppercase tracking-wide text-gray-400'>
                    Location
                  </span>
                  <span className='text-sm font-medium text-gray-800 dark:text-gray-100'>
                    {APWEN_CONTACT.location}
                  </span>
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8'
          >
            <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
              Join APWEN ABUAD
            </h3>
            <p className='mt-2 leading-relaxed text-gray-600 dark:text-gray-300'>
              APWEN ABUAD Collegiate is open to all female engineering students
              at Afe Babalola University. Become part of a network that
              mentors, supports and celebrates women in engineering.
            </p>

            <a
              href={`mailto:${APWEN_CONTACT.email}?subject=Joining%20APWEN%20ABUAD%20Collegiate`}
              className='mt-6 inline-flex w-full items-center justify-center rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700'
            >
              <Mail className='mr-2 h-5 w-5' />
              Email us to join
            </a>

            <div className='mt-6 border-t border-gray-100 dark:border-gray-800 pt-6'>
              <p className='mb-3 text-sm font-semibold text-gray-900 dark:text-white'>
                Connect with APWEN
              </p>
              <div className='flex flex-wrap gap-3'>
                {APWEN_SOCIALS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.title] ?? Sparkles;
                  return (
                    <a
                      key={social.title}
                      href={social.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900/40 dark:hover:text-purple-300'
                    >
                      <Icon className='h-4 w-4' />
                      {social.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Apwen;
