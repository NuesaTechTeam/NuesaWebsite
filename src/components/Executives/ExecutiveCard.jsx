import { Award, Building, ChevronDown, ChevronUp, User, Mail } from "lucide-react";
import { useState } from "react";
import {
  BsWhatsapp,
  BsSnapchat,
} from "react-icons/bs";

const ExecutiveCard = ({executive, index, showAchievementsButton = false}) => {
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
    <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100'>
      <div className='relative'>
        <div className='w-full bg-gray-200 flex items-center justify-center overflow-hidden'>
          <img
            src={executive.image}
            alt={executive.name}
            loading='lazy'
            className='w-full max-h-100'
            onError={(e) => {
              e.target.src =
                "/images/executives/current/OIP.webp?height=300&width=300";
            }}
          />
        </div>
        <div className='absolute top-4 right-4 bg-green text-white px-3 py-1 rounded-full text-sm font-medium'>
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
              className={`text-gray-700 text-sm leading-relaxed ${
                expandedBio === index ? "" : "line-clamp-3"
              }`}
            >
              {executive.bio}
            </p>
            <button
              onClick={() => toggleBio(index)}
              className='text-green text-sm font-medium hover:text-green-700 mt-2 items-center'
            >
              {expandedBio === index ? (
                <div className='flex items-center'>
                  Show Less <ChevronUp className='w-4 h-4 ml-1' />
                </div>
              ) : (
                <div className='flex items-center'>
                  Read More <ChevronDown className='w-4 h-4 ml-1' />
                </div>
              )}
            </button>
          </div>
        )}
        {showAchievementsButton && executive.achievements && (
          <div className='mb-4'>
            <button
              onClick={() => toggleAchievements(index)}
              className='flex items-center text-green font-medium text-sm hover:text-green-700 mb-3 cursor-pointer'
            >
              <Award className='size-5 mr-2' />
              Key Achievements
              {showAchievements[index] ? (
                <ChevronUp className='size-5 ml-1' />
              ) : (
                <ChevronDown className='size-5 ml-1' />
              )}
            </button>

            {showAchievements[index] && (
              <div className='bg-green-50 rounded-lg p-4 border border-green-100'>
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
            )}
          </div>
        )}

        {executive.social && (
          <div className='flex space-x-3 pt-4 border-t border-gray-100'>
            {executive.social.email && (
              <a
                href={executive.social.email}
                className='text-gray-400 hover:text-green-600 transition-colors'
                title='Email'
              >
                <Mail className='size-5' />
              </a>
            )}
            {executive.social.whatsapp && executive.social.whatsapp !== "#" && (
              <a
                href={executive.social.whatsapp}
                className='text-gray-400 hover:text-green-600 transition-colors'
                title='WhatsApp'
              >
                <BsWhatsapp className='size-5' />
              </a>
            )}
            {executive.social.snapchat && executive.social.snapchat !== "#" && (
              <a
                href={executive.social.snapchat}
                className='text-gray-400 hover:text-green-600 transition-colors'
                title='Snapchat'
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