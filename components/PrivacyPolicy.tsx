/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Zap, ArrowLeft } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="bg-power-bg min-h-screen text-power-text selection:bg-power-accent selection:text-white">
      <Helmet>
        <html lang={lang} />
        <meta name="robots" content="noindex, nofollow" />
        <title>{lang === 'en' ? 'Privacy Policy | PowerTech Academy' : 'Política de Privacidad | PowerTech Academy'}</title>
        <meta name="description" content={lang === 'en' ? 'Privacy Policy for PowerTech Academy. How we collect, use, and protect your personal information.' : 'Política de Privacidad de PowerTech Academy. Cómo recopilamos, usamos y protegemos tu información personal.'} />
        <link rel="canonical" href="https://www.powertech.academy/privacy-policy" />
      </Helmet>
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-power-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-power-accent rounded-md flex items-center justify-center">
              <Zap className="text-white w-5 h-5" fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              PowerTech <span className="text-power-muted font-normal">Academy</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="text-power-muted hover:text-white text-sm font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded-full border border-power-border hover:border-power-accent/50"
            >
              {t.langToggle}
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 text-power-muted hover:text-white transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {lang === 'en' ? 'Back' : 'Volver'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20">
        <div className="container mx-auto px-6 max-w-3xl py-16">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{t.privacyPolicy.title}</h1>
            <p className="text-power-muted">{t.privacyPolicy.effectiveDate}</p>
          </div>

          <p className="text-gray-300 leading-relaxed mb-10 text-lg">{t.privacyPolicy.intro}</p>

          <div className="space-y-10">
            {t.privacyPolicy.sections.map((section, i) => (
              <div key={i} className="border-b border-power-border pb-10 last:border-0 last:pb-0">
                <h2 className="text-xl font-bold text-power-text mb-3">{section.heading}</h2>
                <p className="text-gray-400 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold tracking-tight">
            PowerTech <span className="text-power-muted font-normal">Academy</span>
          </div>
          <div className="text-power-muted text-sm">{t.footer.copy}</div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-power-accent hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
