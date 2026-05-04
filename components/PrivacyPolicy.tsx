/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';

export const PrivacyPolicy: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-power-bg min-h-screen text-power-text selection:bg-power-accent selection:text-white">
      <Helmet>
        <html lang={lang} />
        <meta name="robots" content="noindex, nofollow" />
        <title>{lang === 'en' ? 'Privacy Policy | PowerTech Academy' : 'Política de Privacidad | PowerTech Academy'}</title>
        <meta name="description" content={lang === 'en' ? 'Privacy Policy for PowerTech Academy. How we collect, use, and protect your personal information.' : 'Política de Privacidad de PowerTech Academy. Cómo recopilamos, usamos y protegemos tu información personal.'} />
        <link rel="canonical" href="https://www.powertech.academy/privacy-policy" />
      </Helmet>
      <Header />

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
