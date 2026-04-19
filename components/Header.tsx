import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { lang, setLang } = useLanguage();
  // We use lang in our LanguageContext. 
  // Let's create an alias for compatibility with the requested code.
  const language = lang;
  const setLanguage = setLang;

  return (
    <header className="bg-[#050505] border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Home Link */}
        <Link to="/" className="text-2xl font-bebas-neue font-bold text-white">
          PowerTech <span className="text-[#FF4500]">Academy</span>
        </Link>

        {/* Language Toggle */}
        <div className="flex gap-4">
          <button
            onClick={() => setLanguage('en')}
            className={`font-barlow font-bold px-3 py-2 rounded ${
              language === 'en'
                ? 'bg-[#FF4500] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`font-barlow font-bold px-3 py-2 rounded ${
              language === 'es'
                ? 'bg-[#FF4500] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ES
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
