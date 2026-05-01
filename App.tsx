/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Chip, Card, Accordion, Input, Checkbox, Form } from "@heroui/react";

const TechBackground = lazy(() =>
  import('./components/QuantumScene').then(m => ({ default: m.TechBackground }))
);
import { BentoGrid, MagneticButton } from './components/Diagrams';

const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const FAQPage = lazy(() => import('./src/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const HollywoodFlPage = lazy(() => import('./src/pages/HollywoodFlPage'));
const TrainingFloridaPage = lazy(() => import('./src/pages/TrainingFloridaPage'));
const WhatDoesATechnicianDo = lazy(() => import('./src/pages/blog/WhatDoesATechnicianDo'));
const HowLongTraining = lazy(() => import('./src/pages/blog/HowLongTraining'));
const FireAlarmVsElectrician = lazy(() => import('./src/pages/blog/FireAlarmVsElectrician'));
const Advisory = lazy(() => import('./src/pages/Advisory'));
const ThankYou = lazy(() => import('./src/pages/ThankYou'));
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { CheckCircle2, ArrowRight, Zap, ChevronDown, Send } from 'lucide-react';
import Header from './components/Header';
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

// --- HERO ---
const Hero = () => {
  const { t, lang } = useLanguage();
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


      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-power-bg/50 to-power-bg pointer-events-none" style={{ zIndex: 1 }} />

      <div className="power-grid items-center" style={{ position: 'relative', zIndex: 10, height: '100%' }}>
        <motion.div style={{ y: y1, opacity }} className="col-span-12 md:col-span-7 flex flex-col items-start justify-center text-left">
          <Chip
           
            variant="soft"
            className="mb-6 font-bold tracking-widest uppercase"
            size="md"
           
          >
            {t.hero.badge}
          </Chip>

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
            className="text-lg md:text-xl text-power-muted mb-10 leading-relaxed max-w-xl"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              to={lang === 'es' ? '/es/advisory' : '/advisory'}
              className="glass-btn-accent inline-flex items-center justify-center font-bold px-8 py-4 text-lg text-white rounded-lg w-full sm:w-auto gap-2 hover:brightness-110"
            >
              {t.hero.cta}
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/blog/what-does-a-fire-alarm-technician-do-florida"
              className="glass-btn inline-flex items-center justify-center font-bold px-8 py-4 text-lg text-white rounded-lg w-full sm:w-auto hover:bg-white/10"
            >
              {lang === 'es' ? 'Saber más' : 'Learn more'}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side Visuals - Using HeroUI Card */}
        <motion.div 
          style={{ y: y1, opacity }} 
          className="col-span-12 md:col-span-5 hidden md:flex flex-col items-center justify-center"
        >
          <div className="glass-card rounded-lg w-full max-w-md overflow-hidden">
            <div className="p-8 flex flex-col gap-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{lang === 'es' ? 'Programa de 40h' : '40h Program'}</h3>
                  <p className="text-gray-400 text-sm">{lang === 'es' ? 'Práctica en laboratorios reales' : 'Hands-on practical training'}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 rounded-[8px] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{lang === 'es' ? 'Enfoque NFPA 72' : 'NFPA 72 Focused'}</h3>
                  <p className="text-gray-400 text-sm">{lang === 'es' ? 'Aprende los estándares de la industria' : 'Learn industry standards'}</p>
                </div>
              </div>
            </div>
          </div>
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
            <div className="space-y-3">
              {t.benefits.items.map((item, i) => (
                <div
                  key={i}
                  className="glass-card-interactive rounded-lg"
                >
                  <div className="flex flex-row items-center gap-4 p-4">
                    <div className="w-6 h-6 rounded-full bg-[#FF4500]/20 flex items-center justify-center text-[#FF4500] shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </ParallaxSection>

          <div className="relative z-10 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-lg">
                <div className="p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF4500]/15 flex items-center justify-center text-lg">🔥</div>
                  <div className="text-sm font-bold text-white leading-tight">{t.benefits.placementRate}</div>
                </div>
              </div>
              <div className="glass-card rounded-lg">
                <div className="p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF4500]/15 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-[#FF4500]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">{t.benefits.certified}</div>
                    <div className="text-xs text-power-muted mt-0.5">{t.benefits.certifiedSub}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-lg">
              <div className="p-5 flex flex-row items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FF4500]/15 flex items-center justify-center shrink-0">
                  <Zap size={18} className="text-[#FF4500]" fill="currentColor" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">{t.benefits.entryLevel}</div>
                  <div className="text-sm text-power-muted">{t.benefits.entryLevelSub}</div>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-lg overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(255,69,0,0.08) 0%, rgba(14,14,14,0.85) 60%)' }}
            >
              <div className="p-7 relative">
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,69,0,0.6), rgba(255,200,0,0.2), transparent)' }} />
                <p className="text-xs text-power-muted uppercase tracking-widest mb-3">{t.benefits.salary}</p>
                <div className="text-7xl font-bold text-[#FF4500] leading-none mb-3" style={{ textShadow: '0 0 50px rgba(255,69,0,0.45)' }}>
                  $65k+
                </div>
                <p className="text-sm text-gray-400">Avg. entry-level salary · South Florida</p>
                <p className="text-xs text-power-muted/50 mt-3">*Source: BLS 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <details key={i} className="group bg-[#121212]/60 border border-white/10 backdrop-blur-md rounded-2xl mb-3 shadow-none data-[open=true]:border-[#FF4500]/30 [&_summary::-webkit-details-marker]:hidden">
              <summary className="w-full text-left p-6 flex justify-between items-center cursor-pointer list-none">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/20 flex items-center justify-center text-[#FF4500] text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="font-semibold text-white">{mod.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:block text-sm text-gray-400">{mod.hours}</span>
                  <ChevronDown className="text-gray-400 group-open:rotate-180 transition-transform duration-300" size={20} />
                </div>
              </summary>
              <div className="pb-6 pl-[4.5rem]">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Chip size="sm" variant="soft">{mod.theory}</Chip>
                  <Chip size="sm" variant="soft" className="border-white/10 text-gray-400">{mod.lab}</Chip>
                  <Chip size="sm" variant="soft" className="border-white/10 text-gray-400">{mod.hours}</Chip>
                </div>
                <p className="text-gray-400 leading-relaxed">{mod.desc}</p>
              </div>
            </details>
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

  return (
    <section id="apply" className="py-32 bg-power-bg relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-power-accent/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-2xl">
        <div className="glass-card-elevated rounded-3xl p-8 md:p-12">
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
            <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">{t.enrollment.firstName}</label>
                  <input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder={t.enrollment.firstName}
                    className="w-full bg-[#121212]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-colors outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">{t.enrollment.lastName}</label>
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder={t.enrollment.lastName}
                    className="w-full bg-[#121212]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-colors outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">{t.enrollment.email}</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full bg-[#121212]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-colors outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">{t.enrollment.phone}</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (305) 000-0000"
                  className="w-full bg-[#121212]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-colors outline-none"
                />
              </div>

              <label className="flex items-start gap-3 mt-4 group cursor-pointer">
                <input 
                  type="checkbox" 
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                  className="mt-1 w-5 h-5 rounded border-white/20 bg-[#121212]/50 text-[#FF4500] focus:ring-[#FF4500]/50"
                />
                <span className="text-sm text-power-muted leading-relaxed">
                  {t.enrollment.consent}{' '}
                  <a
                    href="https://www.powertech.academy/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF4500] hover:text-white transition-colors"
                  >
                    {t.enrollment.privacyLink}
                  </a>
                  .
                </span>
              </label>

              {status === 'error' && (
                <p className="text-red-400 text-sm">{t.enrollment.error}</p>
              )}

              <button
                type="submit"
                disabled={!formData.consent || status === 'submitting'}
                className="w-full mt-2 font-bold text-base flex justify-center items-center gap-2 bg-[#FF4500] hover:bg-[#FF4500]/90 text-white rounded-xl py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {status === 'submitting' ? t.enrollment.submitting : t.enrollment.submit}
                {status !== 'submitting' && <Send size={18} />}
              </button>
            </Form>
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
              <div className="glass-card rounded-lg">
                <div className="p-4">
                  <p className="text-[#FF4500] text-xl font-bold">40h</p>
                  <p className="text-sm text-gray-400">{language === 'es' ? 'Práctica' : 'Hands-on'}</p>
                </div>
              </div>
              <div className="glass-card rounded-lg">
                <div className="p-4">
                  <p className="text-[#FF4500] text-xl font-bold">Real</p>
                  <p className="text-sm text-gray-400">{language === 'es' ? 'Equipamiento' : 'Equipment'}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to={language === 'es' ? '/es/hollywood-fl' : '/hollywood-fl'}
                className="glass-btn-accent inline-flex items-center justify-center font-bold px-8 py-4 text-lg text-white rounded-lg w-full sm:w-auto hover:brightness-110"
              >
                {language === 'es' ? '🎯 Conoce las Instalaciones' : '🎯 Explore Facilities'}
              </Link>
              <button
                type="button"
                onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-btn inline-flex items-center justify-center font-bold px-8 py-4 text-lg text-white rounded-lg w-full sm:w-auto hover:bg-white/10"
              >
                {language === 'es' ? '📞 Agendar Asesoría' : '📞 Schedule Advisory'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- BLOG SECTION ---
const blogPosts = [
  {
    slug: '/blog/what-does-a-fire-alarm-technician-do-florida',
    label: 'Career Guide',
    title: 'What Does a Fire Alarm Technician Do in Florida?',
    excerpt: 'Installation, inspection, panel programming, troubleshooting — a practical look at the day-to-day work and skills required.',
  },
  {
    slug: '/blog/how-long-does-fire-alarm-training-take',
    label: 'Training',
    title: 'How Long Does Fire Alarm Technician Training Take?',
    excerpt: 'Intensive programs vs apprenticeships vs community college — an honest breakdown of timelines and what each path covers.',
  },
  {
    slug: '/blog/fire-alarm-technician-vs-electrician-florida',
    label: 'Comparison',
    title: 'Fire Alarm Technician vs Electrician in Florida',
    excerpt: 'Entry requirements, licensing timelines, and scope of work — a side-by-side comparison for career changers in Florida.',
  },
];

const BlogSection: React.FC = () => {
  const { lang } = useLanguage();
  const isEs = lang === 'es';
  return (
    <section className="py-20 bg-[#050505] px-6">
      <div className="max-w-5xl mx-auto">
        <Chip variant="soft" size="sm" className="font-bold uppercase tracking-widest mb-4 mx-auto flex justify-center w-fit">
          {isEs ? 'Recursos' : 'Resources'}
        </Chip>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          {isEs ? 'Aprende Sobre la Industria' : 'Learn About the Industry'}
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          {isEs
            ? 'Guías prácticas sobre carreras, requisitos de licencia y formación en Florida.'
            : 'Practical guides on careers, licensing requirements, and training paths in Florida.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={post.slug} className="block group">
              <div className="glass-card-interactive rounded-lg h-full overflow-hidden">
                <div className="p-6 flex flex-col gap-3 h-full text-left">
                  <Chip variant="soft" className="font-bold uppercase tracking-widest w-fit">
                    {post.label}
                  </Chip>
                  <h3 className="text-white font-bold text-base leading-snug">{post.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <span className="text-[#FF4500] text-sm font-semibold mt-2 inline-block group-hover:text-[#cc3700] transition-colors">
                    {isEs ? 'Leer artículo →' : 'Read article →'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link
            to="/blog"
            className="glass-btn inline-flex items-center justify-center font-bold px-8 py-4 text-lg text-white rounded-lg hover:bg-white/10 gap-2"
          >
            {isEs ? 'Ver todos los artículos →' : 'View all articles →'}
          </Link>
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
    <Header />
    <main>
      <Hero />
      <div id="program"><BentoGrid /></div>
      <Benefits />
      <InstalacionesAprendizaje />
      <Curriculum />
      <BlogSection />
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
      <Suspense fallback={null}>
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
          <Route path="/fire-alarm-technician-training-florida" element={<TrainingFloridaPage />} />
          <Route path="/blog/what-does-a-fire-alarm-technician-do-florida" element={<WhatDoesATechnicianDo />} />
          <Route path="/blog/how-long-does-fire-alarm-training-take" element={<HowLongTraining />} />
          <Route path="/blog/fire-alarm-technician-vs-electrician-florida" element={<FireAlarmVsElectrician />} />
          <Route path="/gracias" element={<ThankYou />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
};

export default App;
