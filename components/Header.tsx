import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to={lang === 'es' ? '/es' : '/'} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF4500] rounded-md flex items-center justify-center">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            PowerTech <span className="text-gray-400 font-normal">Academy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="text-gray-400 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-[#FF4500]/50"
          >
            {t.langToggle}
          </button>
          <Link
            to={lang === 'es' ? '/es/advisory' : '/advisory'}
            className="bg-[#FF4500] hover:bg-[#E63E00] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
          >
            {t.nav.advisory}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-6 py-4 flex flex-col gap-3">
          <button
            onClick={() => { setLang(lang === 'en' ? 'es' : 'en'); setIsOpen(false); }}
            className="w-full py-3 rounded border border-white/10 text-gray-400 font-bold text-sm uppercase tracking-wider"
          >
            {t.langToggle}
          </button>
          <Link
            to={lang === 'es' ? '/es/advisory' : '/advisory'}
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-[#FF4500] hover:bg-[#E63E00] text-white rounded font-bold text-sm text-center transition-colors"
          >
            {t.nav.advisory}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
