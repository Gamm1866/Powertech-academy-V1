import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './Advisory.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

const content = {
  en: {
    badge: 'Free · 15 Minutes · No Commitment',
    title: 'Schedule Your Free',
    titleAccent: 'Virtual Advisory',
    sub: 'Become a fire alarm technician in 2–3 months in Hollywood, FL. No prior experience required. Ask us anything.',
    benefits: [
      { icon: '🎯', title: 'Personalized guidance', desc: 'We review your profile and explain the exact path to certification.' },
      { icon: '📅', title: 'Flexible scheduling', desc: 'Morning, afternoon or evening slots available Monday–Friday.' },
      { icon: '💼', title: 'Job placement support', desc: 'Learn about our active employer network across South Florida.' },
      { icon: '💰', title: 'Financing options', desc: "We'll walk you through payment plans and funding options available." },
    ],
    stats: [{ num: '40h', label: 'Program' }, { num: '2–3', label: 'Months' }, { num: '17+', label: 'Min. age' }],
    formTitle: 'Reserve your spot',
    formSub: 'Free 15-minute virtual session',
    namePlaceholder: 'Full name',
    phonePlaceholder: '+1 (786) 000-0000',
    timeLabel: 'Preferred time',
    timeOptions: [
      { value: '', label: 'Select a time' },
      { value: 'morning', label: 'Morning (8 AM – 12 PM)' },
      { value: 'afternoon', label: 'Afternoon (12 PM – 4 PM)' },
      { value: 'evening', label: 'Evening (4 PM – 6 PM)' },
    ],
    submitBtn: 'Book My Free Session →',
    submitting: 'Sending...',
    privacy: 'Your information is confidential. We will never share or sell it.',
    successTitle: 'You\'re all set!',
    successMsg: 'We\'ll contact you within 24 hours to confirm your advisory session.',
    social: 'Companies that hire our graduates',
    footerCopy: `© ${new Date().getFullYear()} PowerTech Academy · Hollywood, FL`,
    backHome: '← Back to home',
  },
  es: {
    badge: 'Gratis · 15 Minutos · Sin Compromiso',
    title: 'Agenda tu',
    titleAccent: 'Asesoría Virtual Gratuita',
    sub: 'Conviértete en técnico de alarmas contra incendios en 2–3 meses en Hollywood, FL. Sin experiencia previa requerida.',
    benefits: [
      { icon: '🎯', title: 'Orientación personalizada', desc: 'Revisamos tu perfil y te explicamos el camino exacto hacia la certificación.' },
      { icon: '📅', title: 'Horarios flexibles', desc: 'Disponibilidad de mañana, tarde y noche de lunes a viernes.' },
      { icon: '💼', title: 'Apoyo en búsqueda de empleo', desc: 'Conoce nuestra red activa de empleadores en todo South Florida.' },
      { icon: '💰', title: 'Opciones de financiamiento', desc: 'Te explicamos los planes de pago y opciones de financiamiento disponibles.' },
    ],
    stats: [{ num: '40h', label: 'Programa' }, { num: '2–3', label: 'Meses' }, { num: '17+', label: 'Edad mín.' }],
    formTitle: 'Reserva tu lugar',
    formSub: 'Sesión virtual gratuita de 15 minutos',
    namePlaceholder: 'Nombre completo',
    phonePlaceholder: '+1 (786) 000-0000',
    timeLabel: 'Horario preferido',
    timeOptions: [
      { value: '', label: 'Selecciona un horario' },
      { value: 'morning', label: 'Mañana (8 AM – 12 PM)' },
      { value: 'afternoon', label: 'Tarde (12 PM – 4 PM)' },
      { value: 'evening', label: 'Noche (4 PM – 6 PM)' },
    ],
    submitBtn: 'Reservar mi sesión gratis →',
    submitting: 'Enviando...',
    privacy: 'Tu información es confidencial. Nunca la compartiremos ni venderemos.',
    successTitle: '¡Todo listo!',
    successMsg: 'Nos pondremos en contacto contigo en las próximas 24 horas para confirmar tu asesoría.',
    social: 'Empresas que contratan a nuestros egresados',
    footerCopy: `© ${new Date().getFullYear()} PowerTech Academy · Hollywood, FL`,
    backHome: '← Volver al inicio',
  },
};

const COMPANIES = ['Siemens', 'Honeywell', 'Bosch Security', 'Johnson Controls', 'Tyco', 'ADT'];

export default function Advisory() {
  const { lang } = useLanguage();
  const t = content[lang === 'es' ? 'es' : 'en'];

  const [form, setForm] = useState({ name: '', phone: '', time: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'PEGAR_TU_KEY_AQUI',
          subject: 'Nueva solicitud de Asesoría Virtual — PowerTech Academy',
          from_name: form.name,
          phone: form.phone,
          preferred_time: form.time,
          lang,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {lang === 'es'
            ? 'Agenda tu Asesoría Virtual Gratuita | PowerTech Academy'
            : 'Schedule Your Free Virtual Advisory | PowerTech Academy'}
        </title>
        <meta
          name="description"
          content={
            lang === 'es'
              ? 'Conviértete en técnico de alarmas contra incendios en 2–3 meses en Hollywood, FL. Agenda tu sesión virtual de 15 minutos. Sin experiencia previa requerida.'
              : 'Become a fire alarm technician in 2–3 months in Hollywood, FL. Schedule your free 15-minute virtual session. No prior experience required.'
          }
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://powertech.academy${lang === 'es' ? '/es' : ''}/advisory`} />
      </Helmet>

      <div className={styles.page}>
        <Header />

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.badge}>{t.badge}</div>
          <h1 className={styles.heroTitle}>
            {t.title} <span>{t.titleAccent}</span>
          </h1>
          <p className={styles.heroSub}>{t.sub}</p>

          <div className={styles.heroGrid}>
            {/* Left: benefits + stats */}
            <div>
              <div className={styles.benefits}>
                {t.benefits.map((b) => (
                  <div key={b.title} className={styles.benefitItem}>
                    <div className={styles.benefitIcon}>{b.icon}</div>
                    <div className={styles.benefitText}>
                      <strong>{b.title}</strong>
                      <p>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.stats}>
                {t.stats.map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <span className={styles.statNum}>{s.num}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className={styles.formCard}>
              {status === 'success' ? (
                <div className={styles.successBox}>
                  <div className={styles.successIcon}>✅</div>
                  <h3>{t.successTitle}</h3>
                  <p>{t.successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className={styles.formTitle}>{t.formTitle}</h2>
                  <p className={styles.formSub}>{t.formSub}</p>

                  <div className={styles.field}>
                    <label htmlFor="adv-name">
                      {lang === 'es' ? 'Nombre' : 'Name'}
                    </label>
                    <input
                      id="adv-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={t.namePlaceholder}
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="adv-phone">
                      {lang === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      id="adv-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder={t.phonePlaceholder}
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="adv-time">{t.timeLabel}</label>
                    <select
                      id="adv-time"
                      name="time"
                      required
                      value={form.time}
                      onChange={handleChange}
                    >
                      {t.timeOptions.map((o) => (
                        <option key={o.value} value={o.value} disabled={o.value === ''}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {status === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '12px' }}>
                      {lang === 'es' ? 'Hubo un error. Intenta de nuevo.' : 'Something went wrong. Please try again.'}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={styles.submitBtn}
                  >
                    {status === 'sending' ? t.submitting : t.submitBtn}
                  </button>

                  <p className={styles.privacy}>{t.privacy}</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className={styles.social}>
          <h2>{t.social}</h2>
          <div className={styles.logoRow}>
            {COMPANIES.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <span>{t.footerCopy}</span>
          <Link
            to={lang === 'es' ? '/es' : '/'}
            style={{ color: '#FF4500', textDecoration: 'none', fontSize: '0.8rem' }}
          >
            {t.backHome}
          </Link>
        </footer>
      </div>
    </>
  );
}
