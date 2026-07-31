import { Award, Building, ChevronDown, ChevronUp, User, Mail } from "lucide-react";
import { useState } from "react";
import {
  BsWhatsapp,
  BsSnapchat,
} from "react-icons/bs";

const ExecutiveCard = ({executive, index, showAchievementsButton = false, imageLoading = "lazy"}) => {
    const [expandedBio, setExpandedBio] = useState(null);
    const [showAchievements, setShowAchievements] = useState({});

    const toggleBio = (index) => {
      setExpandedBio(expandedBio === index ? null : index);
    };

    const toggleAchievements = (index) => {
      setShowAchievements((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };


  return (
    <div className='bg-white rounded-xl border border-gray-200 transition-colors duration-200 hover:border-green-300 overflow-hidden'>
      <div className='relative'>
        <div className='aspect-[4/5] w-full bg-gray-200 flex items-center justify-center overflow-hidden'>
          <img
            src={executive.image}
            alt={`${executive.name} - ${executive.position}, NUESA ABUAD Engineering Students Association, Afe Babalola University`}
            loading={imageLoading}
            width={300}
            height={375}
            className='h-full w-full object-cover'
            onError={(e) => {
              e.target.src =
                "/images/executives/current/OIP.webp?height=300&width=300";
            }}
          />
        </div>
        <div className='absolute top-4 right-4 bg-green text-white px-3 py-1 rounded-full text-sm font-medium max-w-[calc(100%-2rem)] truncate'>
          {executive.position}
        </div>
      </div>

      <div className='p-6'>
        <h3 className='text-xl font-bold text-green mb-2'>{executive.name}</h3>
        <div className='flex items-center text-gray-700 mb-2'>
          <Building className='size-5 mr-2' />
          <span className='text-sm'>{executive.department}</span>
        </div>
        {executive.year && (
          <div className='flex items-center text-gray-700 mb-4'>
            <User className='size-5 mr-2' />
            <span className='text-sm'>{executive.year}</span>
          </div>
        )}
        {executive.bio && (
          <div className='mb-4'>
            <p
              className={`text-gray-700 text-sm leading-relaxed transition-all duration-300 ${
                expandedBio === index ? "" : "line-clamp-3"
              }`}
            >
              {executive.bio}
            </p>
            <button
              type="button"
              onClick={() => toggleBio(index)}
              className='text-green text-sm font-medium hover:text-green-700 mt-2 flex items-center cursor-pointer'
              aria-expanded={expandedBio === index}
            >
              {expandedBio === index ? (
                <>Show Less <ChevronUp className='w-4 h-4 ml-1' /></>
              ) : (
                <>Read More <ChevronDown className='w-4 h-4 ml-1' /></>
              )}
            </button>
          </div>
        )}

        {showAchievementsButton && executive.achievements && (
          <div className='mb-4'>
            <button
              type="button"
              onClick={() => toggleAchievements(index)}
              className='flex items-center text-green font-medium text-sm hover:text-green-700 mb-3 cursor-pointer'
              aria-expanded={!!showAchievements[index]}
            >
              <Award className='size-5 mr-2' />
              Key Achievements
              {showAchievements[index] ? (
                <ChevronUp className='size-5 ml-1 transition-transform duration-200' />
              ) : (
                <ChevronDown className='size-5 ml-1 transition-transform duration-200' />
              )}
            </button>

            {showAchievements[index] && (
              <div>
                <div className='bg-green-50 rounded-lg p-4 border border-green-100 mt-0'>
                  <ul className='space-y-2'>
                    {executive.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className='flex items-start'>
                        <div className='w-2 h-2 bg-green rounded-full mt-2 mr-3 flex-shrink-0'></div>
                        <span className='text-sm text-gray-700'>
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {executive.social && (
          <div className='flex space-x-3 pt-4 border-t border-gray-100'>
            {executive.social.email && executive.social.email !== "#" && (
              <a
                href={executive.social.email.startsWith("mailto:") ? executive.social.email : `mailto:${executive.social.email}`}
                className='text-gray-500 hover:text-green-600 transition-colors block'
                title='Email'
                aria-label={`Email ${executive.name}`}
              >
                <Mail className='size-5' />
              </a>
            )}
            {executive.social.whatsapp && executive.social.whatsapp !== "#" && (
              <a
                href={executive.social.whatsapp}
                className='text-gray-500 hover:text-green-600 transition-colors block'
                title='WhatsApp'
                aria-label={`WhatsApp ${executive.name}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <BsWhatsapp className='size-5' />
              </a>
            )}
            {executive.social.snapchat && executive.social.snapchat !== "#" && (
              <a
                href={executive.social.snapchat}
                className='text-gray-500 hover:text-green-600 transition-colors block'
                title='Snapchat'
                aria-label={`Snapchat ${executive.name}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <BsSnapchat className='size-5' />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default ExecutiveCard
