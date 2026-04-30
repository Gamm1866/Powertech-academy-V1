import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Zap, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const homeHref = lang === 'es' ? '/es' : '/';
  const advisoryHref = lang === 'es' ? '/es/advisory' : '/advisory';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(5, 5, 5, 0.85)'
          : 'rgba(5, 5, 5, 0.6)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        boxShadow: scrolled
          ? '0 4px 24px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(255,69,0,0.08)'
          : 'none',
      }}
    >
      <div className="power-grid" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
        {/* Logo — cols 1-4 */}
        <div className="col-span-4 flex items-center">
          <Link to={homeHref} className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(255,69,0,0.6)]"
              style={{
                background: 'rgba(255,69,0,0.9)',
                border: '1px solid rgba(255,140,0,0.4)',
                boxShadow: '0 0 10px rgba(255,69,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              <Zap className="text-white w-4 h-4" fill="currentColor" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              PowerTech{' '}
              <span className="text-gray-400 font-normal">Academy</span>
            </span>
          </Link>
        </div>

        {/* Desktop nav — cols 5-12 */}
        <div className="col-span-8 hidden sm:flex items-center justify-end gap-3">
          <button
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="px-4 py-1.5 rounded-full text-gray-400 hover:text-white text-sm font-bold uppercase tracking-wider transition-all duration-250 glass-btn"
          >
            {t.langToggle}
          </button>
          <Link
            to={advisoryHref}
            className="px-5 py-2 rounded-lg text-white text-sm font-bold glass-btn-accent"
          >
            {t.nav.advisory}
          </Link>
        </div>

        {/* Mobile hamburger — visible only on small */}
        <div className="col-span-8 flex items-center justify-end sm:hidden">
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="p-2 rounded-lg text-gray-400 hover:text-white glass-btn transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="sm:hidden px-6 pb-5 pt-2 flex flex-col gap-3"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <button
            onClick={() => {
              setLang(lang === 'en' ? 'es' : 'en');
              setIsMenuOpen(false);
            }}
            className="w-full py-3 rounded-xl text-gray-400 font-bold uppercase tracking-wider text-sm glass-btn"
          >
            {t.langToggle}
          </button>
          <Link
            to={advisoryHref}
            onClick={() => setIsMenuOpen(false)}
            className="w-full py-3 rounded-xl text-white font-bold text-sm text-center glass-btn-accent"
          >
            {t.nav.advisory}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
