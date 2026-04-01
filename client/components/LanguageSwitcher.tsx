'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import {motion} from 'framer-motion';
import {FiGlobe} from 'react-icons/fi';

// SVG Flag Components
const FlagRU = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="6" fill="#FFFFFF"/>
    <rect y="6" width="24" height="6" fill="#0039A6"/>
    <rect y="12" width="24" height="6" fill="#D52B1E"/>
  </svg>
);

const FlagUZ = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="6" fill="#1EB53A"/>
    <rect y="6" width="24" height="6" fill="#FFFFFF"/>
    <rect y="12" width="24" height="6" fill="#0099B5"/>
    <rect y="6" width="24" height="6" stroke="#CE1126" strokeWidth="0.5"/>
  </svg>
);

const FlagGB = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="18" fill="#012169"/>
    <path d="M0 0L24 18M24 0L0 18" stroke="white" strokeWidth="2.4"/>
    <path d="M0 0L24 18M24 0L0 18" stroke="#C8102E" strokeWidth="1.6"/>
    <path d="M12 0V18M0 9H24" stroke="white" strokeWidth="3.2"/>
    <path d="M12 0V18M0 9H24" stroke="#C8102E" strokeWidth="2"/>
  </svg>
);

const languages = [
  {code: 'ru', name: 'Русский', Flag: FlagRU},
  {code: 'uz', name: "O'zbek", Flag: FlagUZ},
  {code: 'en', name: 'English', Flag: FlagGB},
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && ['ru', 'uz', 'en'].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push('/' + segments.join('/'));
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <div className="relative group">
      <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.95}}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <FiGlobe className="text-gray-700" size={18} />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage?.code.toUpperCase()}
        </span>
      </motion.button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => {
          const FlagComponent = lang.Flag;
          return (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 hover:bg-primary-50 rounded-lg transition-colors flex items-center space-x-3 ${
                locale === lang.code ? 'bg-primary-100' : ''
              }`}
            >
              <div className="flex-shrink-0">
                <FlagComponent />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  {lang.code.toUpperCase()}
                </span>
                <span className="text-xs text-gray-600">{lang.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
