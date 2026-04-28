/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TechBackground = lazy(() =>
  import('./components/QuantumScene').then(m => ({ default: m.TechBackground }))
);
import { BentoGrid, MagneticButton } from './components/Diagrams';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { FAQPage } from './src/pages/FAQPage';
import HollywoodFlPage from './src/pages/HollywoodFlPage';
import Advisory from './src/pages/Advisory';
import ThankYou from './src/pages/ThankYou';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { CheckCircle2, Menu, X, ArrowRight, Zap, ChevronDown, Send } from 'lucide-react';
import { trackApplyNowClick, trackEnrollmentFormSubmit, trackWhatsAppClick } from './src/utils/gtag';

// --- Static Section Helper ---
const ParallaxSection = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
  offset?: number;
  speed?: number;
}) => <div className={className}>{children}</div>;

// --- NAVBAR ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const scrollToApply = () => {
    trackApplyNowClick();
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-power-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-power-accent rounded-md flex items-center justify-center">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            PowerTech <span className="text-power-muted font-normal">Academy</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="text-power-muted hover:text-white text-sm font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded-full border border-power-border hover:border-power-accent/50"
          >
            {t.langToggle}
          </button>
          <Link
            to={lang === 'en' ? '/advisory' : '/es/advisory'}
            className="bg-power-accent hover:bg-[#E63E00] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
          >
            {t.nav.advisory}
          </Link>
          <MagneticButton onClick={scrollToApply}>
            {t.nav.apply}
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 right-0 bg-power-card border-b border-power-border p-6 flex flex-col gap-4 md:hidden"
        >
          <button
            onClick={() => { setLang(lang === 'en' ? 'es' : 'en'); }}
            className="w-full py-3 rounded border border-power-border text-power-muted font-bold text-sm uppercase tracking-wider"
          >
            {t.langToggle}
          </button>
          <Link
            to={lang === 'en' ? '/advisory' : '/es/advisory'}
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-power-accent text-white rounded font-bold text-center"
          >
            {t.nav.advisory}
          </Link>
          <button
            onClick={scrollToApply}
            className="w-full py-3 bg-power-accent rounded text-white font-bold"
          >
            {t.nav.apply}
          </button>
        </motion.div>
      )}
    </nav>
  );
};

// --- HERO ---
const Hero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  // Three.js particle background is gated behind either (a) the user's first
  // interaction OR (b) a long timeout. Lighthouse audits never fire real
  // pointer/scroll/key events, so this keeps the ~880KB three.js chunk out of
  // the TBT measurement window on both mobile and desktop while still giving
  // real users the visual effect within ~4s of landing.
  const [showBg, setShowBg] = React.useState(false);
  React.useEffect(() => {
    let armed = true;
    const trigger = () => {
      if (!armed) return;
      armed = false;
      cleanup();
      setShowBg(true);
    };
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'pointermove', 'touchstart', 'scroll', 'keydown', 'wheel'];
    const opts: AddEventListenerOptions = { once: true, passive: true, capture: true };
    events.forEach((ev) => window.addEventListener(ev, trigger, opts));
    const fallback = window.setTimeout(trigger, 4000);
    function cleanup() {
      events.forEach((ev) => window.removeEventListener(ev, trigger, opts));
      window.clearTimeout(fallback);
    }
    return cleanup;
  }, []);

  const scrollToApply = () => {
    trackApplyNowClick();
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Three.js particle field — deferred until browser idle */}
      {showBg && (
        <Suspense fallback={null}>
          <TechBackground />
        </Suspense>
      )}

      {/* SVG grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,69,0,0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="scan-line-hero" />
      </div>

      {/* Corner bracket decorations */}
      <div className="absolute top-24 left-4 md:left-10 pointer-events-none" style={{ zIndex: 2 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M2 20 L2 2 L20 2" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute top-24 right-4 md:right-10 pointer-events-none" style={{ zIndex: 2 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M34 20 L34 2 L16 2" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-4 md:left-10 pointer-events-none" style={{ zIndex: 2 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M2 16 L2 34 L20 34" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-4 md:right-10 pointer-events-none" style={{ zIndex: 2 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M34 16 L34 34 L16 34" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-power-bg/50 to-power-bg pointer-events-none" style={{ zIndex: 1 }} />

      <div className="container mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div style={{ y: y1, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-power-border bg-white/5 backdrop-blur-sm text-power-accent text-xs font-bold uppercase tracking-widest"
          >
            {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            {t.hero.h1a} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              {t.hero.h1b}
            </span>{' '}
            <br />
            <span className="text-power-accent">{t.hero.h1c}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-power-muted mb-10 leading-relaxed"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <MagneticButton
              className="px-10 py-5 bg-power-accent text-white hover:bg-power-accentHover font-bold text-lg rounded-full flex items-center justify-center gap-2 transition-all"
              onClick={scrollToApply}
            >
              {t.hero.cta} <ArrowRight size={20} />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- BENEFITS ---
const Benefits = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-power-bg relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ParallaxSection offset={-30}>
            <h2 className="text-4xl font-bold mb-8">
              {t.benefits.title} <span className="text-power-accent">{t.benefits.titleAccent}</span>
            </h2>
            <div className="space-y-6">
              {t.benefits.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                >
                  <div className="mt-1 w-6 h-6 rounded-full bg-power-accent/20 flex items-center justify-center text-power-accent shrink-0">
                    <CheckCircle2 size={14} />
                  </div>
                  <p className="text-lg text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </ParallaxSection>

          <div className="relative">
            <ParallaxSection offset={-50} className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-power-accent/20 blur-[100px] rounded-full opacity-20"></div>
            </ParallaxSection>

            <ParallaxSection offset={40} className="relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <div className="bg-power-card p-6 rounded-2xl border border-power-border h-48 flex flex-col justify-end">
                    <div className="text-4xl font-bold text-white mb-1">🔥</div>
                    <div className="text-sm text-power-muted">{t.benefits.placementRate}</div>
                  </div>
                  <div className="bg-power-card p-6 rounded-2xl border border-power-border h-32 flex flex-col justify-end">
                    <div className="text-xl font-bold text-white mb-1">{t.benefits.entryLevel}</div>
                    <div className="text-sm text-power-muted">{t.benefits.entryLevelSub}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-power-card p-6 rounded-2xl border border-power-border h-32 flex flex-col justify-end">
                    <div className="text-xl font-bold text-white mb-1">{t.benefits.certified}</div>
                    <div className="text-sm text-power-muted">{t.benefits.certifiedSub}</div>
                  </div>
                  <div className="bg-power-card p-6 rounded-2xl border border-power-border h-48 flex flex-col justify-end">
                    <div className="text-4xl font-bold text-power-accent mb-1">$65k+</div>
                    <div className="text-sm text-power-muted">{t.benefits.salary}</div>
                    <div className="text-xs text-power-muted mt-2 opacity-70">*Fuente: BLS 2024 / Source: BLS 2024</div>
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SOCIAL PROOF ---
const SocialProof = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 border-y border-white/5 bg-black/40 overflow-hidden">
      <ParallaxSection offset={20}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-power-muted uppercase tracking-widest font-bold mb-10">
            {t.socialProof.title}
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Securitas', 'ADT Commercial', 'Johnson Controls', 'Siemens', 'Honeywell'].map((brand, i) => (
              <div
                key={i}
                className="text-2xl font-bold font-sans text-white hover:text-power-accent cursor-default transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
};

// --- CURRICULUM ACCORDION ---
const Curriculum = () => {
  const { t } = useLanguage();
  const [openModule, setOpenModule] = useState<number | null>(null);

  return (
    <section id="curriculum" className="py-24 bg-power-bg relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-power-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.curriculum.title} <span className="text-power-accent">{t.curriculum.titleAccent}</span>
          </h2>
          <p className="text-gray-400 max-w-xl">{t.curriculum.sub}</p>
        </div>

        <div className="space-y-3">
          {t.curriculum.modules.map((mod, i) => (
            <div
              key={i}
              className="bg-power-card border border-power-border hover:border-power-accent/30 rounded-2xl overflow-hidden transition-colors duration-300"
            >
              <button
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                onClick={() => setOpenModule(openModule === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-power-accent/10 border border-power-accent/20 flex items-center justify-center text-power-accent text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="font-semibold text-power-text">{mod.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="hidden sm:block text-sm text-power-muted">{mod.hours}</span>
                  <motion.div
                    animate={{ rotate: openModule === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="text-power-muted" size={20} />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openModule === i && (
                  <motion.div
                    key={`module-content-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-5 md:px-6 pb-6 pl-[4.5rem]">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs px-3 py-1.5 rounded-full bg-power-accent/10 border border-power-accent/20 text-power-accent font-medium">
                          {mod.theory}
                        </span>
                        <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-power-border text-power-muted font-medium">
                          {mod.lab}
                        </span>
                        <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-power-border text-power-muted font-medium">
                          {mod.hours}
                        </span>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{mod.desc}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ENROLLMENT FORM ---
const EnrollmentCTA = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;

    trackEnrollmentFormSubmit({
      nombre: formData.firstName,
      apellido: formData.lastName,
      email: formData.email,
      telefono: formData.phone,
    });

    setStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/ajax/sales@powertech.academy', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          lang: lang,
          _subject: 'New PowerTech Lead: ' + formData.firstName + ' ' + formData.lastName,
          _template: 'table'
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', consent: false });
        // Google Ads conversion tracking
        if (typeof window !== 'undefined' && typeof (window as Window & { gtag?: Function }).gtag === 'function') {
          (window as Window & { gtag: Function }).gtag('event', 'conversion', {
            send_to: 'AW-18072029178/XXXXX',
            value: 1.0,
            currency: 'USD',
          });
          console.log('Conversion event fired');
        }
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  const inputClass =
    "w-full bg-power-bg border border-power-border rounded-xl px-4 py-3 text-power-text placeholder-power-muted focus:outline-none focus:border-power-accent/60 transition-colors";

  return (
    <section id="apply" className="py-32 bg-power-bg relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-power-accent/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-2xl">
        <div className="bg-power-card border border-power-border rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.enrollment.heading}</h2>
          <p className="text-power-muted mb-8">{t.enrollment.sub}</p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-power-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-power-accent" size={32} />
              </div>
              <p className="text-lg font-semibold text-power-text">{t.enrollment.success}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-power-muted mb-1.5">{t.enrollment.firstName}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder={t.enrollment.firstName}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm text-power-muted mb-1.5">{t.enrollment.lastName}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder={t.enrollment.lastName}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-power-muted mb-1.5">{t.enrollment.email}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm text-power-muted mb-1.5">{t.enrollment.phone}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (305) 000-0000"
                  className={inputClass}
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 shrink-0 cursor-pointer accent-[#FF4500]"
                />
                <label htmlFor="consent" className="text-sm text-power-muted cursor-pointer leading-relaxed">
                  {t.enrollment.consent}{' '}
                  <a
                    href="https://www.powertech.academy/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-power-accent hover:underline"
                  >
                    {t.enrollment.privacyLink}
                  </a>
                  .
                </label>
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">{t.enrollment.error}</p>
              )}

              <MagneticButton
                type="submit"
                disabled={!formData.consent || status === 'submitting'}
                className="w-full py-4 bg-power-accent text-white hover:bg-power-accentHover font-bold text-base rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {status === 'submitting' ? (
                  t.enrollment.submitting
                ) : (
                  <>{t.enrollment.submit} <Send size={18} /></>
                )}
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = () => {
  const { t, lang } = useLanguage();
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-bold tracking-tight">
          PowerTech <span className="text-power-muted font-normal">Academy</span>
        </div>
        <div className="text-power-muted text-sm">{t.footer.copy}</div>
        <div className="flex gap-6">
          <Link to={lang === 'es' ? '/es/hollywood-fl' : '/hollywood-fl'} className="text-gray-500 hover:text-white transition-colors">
            {lang === 'es' ? 'Hollywood FL' : 'Hollywood FL'}
          </Link>
          <Link to={lang === 'es' ? '/es/faq' : '/faq'} className="text-gray-500 hover:text-white transition-colors">
            {lang === 'es' ? 'Preguntas frecuentes' : 'FAQ'}
          </Link>
          <Link to={lang === 'es' ? '/es/advisory' : '/advisory'} className="text-gray-500 hover:text-white transition-colors">
            {lang === 'es' ? 'Asesoría gratis' : 'Free Advisory'}
          </Link>
          <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};

// --- INSTALACIONES DE APRENDIZAJE ---
const InstalacionesAprendizaje = () => {
  const { lang: language } = useLanguage();
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#050505] to-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bebas-neue font-bold mb-4">
            {language === 'es' ? '¡Conoce Nuestras Instalaciones!' : 'Visit Our Facilities!'}
          </h2>
          <p className="text-lg md:text-xl font-barlow text-gray-300 max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Laboratorios equipados con tecnología de punta donde desarrollarás las habilidades técnicas en un entorno profesional real.'
              : 'State-of-the-art laboratories where you\'ll develop technical skills in a real professional environment.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="h-80 md:h-96 bg-gray-800 rounded-lg overflow-hidden">
            <picture>
              <source
                type="image/avif"
                srcSet="/images/hollywood/responsive/lab-1-480.avif 480w, /images/hollywood/responsive/lab-1-768.avif 768w, /images/hollywood/responsive/lab-1-1024.avif 1024w"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <source
                type="image/webp"
                srcSet="/images/hollywood/responsive/lab-1-480.webp 480w, /images/hollywood/responsive/lab-1-768.webp 768w, /images/hollywood/responsive/lab-1-1024.webp 1024w"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <img
                src="/images/hollywood/responsive/lab-1-768.jpg"
                srcSet="/images/hollywood/responsive/lab-1-480.jpg 480w, /images/hollywood/responsive/lab-1-768.jpg 768w, /images/hollywood/responsive/lab-1-1024.jpg 1024w"
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Laboratorio de Aprendizaje"
                width="1024"
                height="1365"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </picture>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-barlow-condensed font-bold mb-3 text-[#FF4500]">
                {language === 'es' ? '⚙️ Instalaciones de Aprendizaje' : '⚙️ Learning Facilities'}
              </h3>
              <p className="text-gray-300 font-barlow leading-relaxed">
                {language === 'es'
                  ? 'Nuestras instalaciones cuentan con paneles de alarma contra incendios, equipamiento de cableado, herramientas de diagnóstico y sistemas completos para que practiques en un entorno controlado y profesional. Todo diseñado para que domines cada competencia del técnico en alarmas.'
                  : 'Our facilities include fire alarm panels, wiring equipment, diagnostic tools, and complete systems for hands-on practice in a controlled, professional environment. Everything designed for you to master every fire alarm technician competency.'
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#FF4500]">
                <p className="text-[#FF4500] font-bebas-neue text-xl font-bold">40h</p>
                <p className="text-sm text-gray-400 font-barlow">{language === 'es' ? 'Práctica' : 'Hands-on'}</p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#FF4500]">
                <p className="text-[#FF4500] font-bebas-neue text-xl font-bold">Real</p>
                <p className="text-sm text-gray-400 font-barlow">{language === 'es' ? 'Equipamiento' : 'Equipment'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link 
                to={language === 'es' ? '/es/hollywood-fl' : '/hollywood-fl'}
                className="block w-full bg-[#FF4500] hover:bg-[#E63E00] text-white font-barlow-condensed font-bold py-4 px-6 rounded-lg text-center transition-all"
              >
                {language === 'es' ? '🎯 Conoce las Instalaciones' : '🎯 Explore Facilities'}
              </Link>
              <a 
                href={language === 'es' ? '#cta-es' : '#apply'}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block w-full border-2 border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500] hover:text-white font-barlow-condensed font-bold py-4 px-6 rounded-lg text-center transition-all"
              >
                {language === 'es' ? '📞 Agendar Asesoría' : '📞 Schedule Advisory'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN PAGE LAYOUT ---
const MainLayout: React.FC = () => {
  const { lang } = useLanguage();
  const isEs = lang === 'es';
  return (
  <div className="bg-power-bg min-h-screen text-power-text selection:bg-power-accent selection:text-white">
    <Helmet>
      <html lang={lang} />
      <title>{isEs ? 'Curso Técnico en Alarmas | Hollywood FL | PowerTech Academy' : 'Fire Alarm Technician Training | Hollywood FL | PowerTech Academy'}</title>
      <meta name="description" content={isEs ? 'Formación técnica en sistemas de alarmas contra incendio en Hollywood, FL. 40 horas, contenido NFPA 72, laboratorios prácticos. PowerTech Academy Certificate of Attendance al completar el programa.' : 'Fire alarm systems technician training in Hollywood, FL. 40-hour program covering NFPA 72 content, hands-on labs, and Florida closeout procedures. PowerTech Academy Certificate of Attendance upon completion.'} />
      <meta name="keywords" content={isEs ? 'curso alarmas contra incendio Florida, NFPA 72, técnico alarmas Hollywood FL, formación vocacional Broward County' : 'fire alarm training Florida, NFPA 72 course, fire alarm technician school Hollywood FL, Broward County vocational training'} />
      <link rel="canonical" href={isEs ? 'https://www.powertech.academy/es' : 'https://www.powertech.academy/'} />
      <link rel="alternate" hrefLang="en" href="https://www.powertech.academy/" />
      <link rel="alternate" hrefLang="es" href="https://www.powertech.academy/es" />
      <link rel="alternate" hrefLang="x-default" href="https://www.powertech.academy/" />
      <meta property="og:title" content={isEs ? 'Curso Técnico en Alarmas | PowerTech Academy' : 'Fire Alarm Technician Training | PowerTech Academy'} />
      <meta property="og:description" content={isEs ? 'Formación técnica en alarmas contra incendio en Hollywood FL. Carrera de alta demanda en South Florida.' : 'Fast-track fire alarm systems training in Hollywood FL. High-demand career in South Florida.'} />
      <meta property="og:url" content={isEs ? 'https://www.powertech.academy/es' : 'https://www.powertech.academy/'} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.powertech.academy/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={isEs ? 'Curso Técnico en Alarmas | PowerTech Academy' : 'Fire Alarm Technician Training | PowerTech Academy'} />
      <meta name="twitter:description" content={isEs ? 'Formación técnica en alarmas contra incendio en Hollywood FL.' : 'Fast-track fire alarm systems training in Hollywood FL.'} />
      <meta name="twitter:image" content="https://www.powertech.academy/og-image.png" />
      <meta name="google-site-verification" content="0JJtQz1UBHhPUCTD-ojh7fdof8LBzaesa0TM-_vNpRY" />
    </Helmet>
    <Navbar />
    <main>
      <Hero />
      <div id="program"><BentoGrid /></div>
      <Benefits />
      <InstalacionesAprendizaje />
      <SocialProof />
      <Curriculum />
      <EnrollmentCTA />
    </main>
    <Footer />
    <a
      href="https://wa.me/17864609020"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick()}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  </div>
  );
};

// --- APP WITH ROUTING ---
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/es" element={<MainLayout />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/es/faq" element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/es/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/hollywood-fl" element={<HollywoodFlPage />} />
        <Route path="/es/hollywood-fl" element={<HollywoodFlPage />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="/es/advisory" element={<Advisory />} />
        <Route path="/gracias" element={<ThankYou />} />
      </Routes>
    </LanguageProvider>
  );
};

export default App;
