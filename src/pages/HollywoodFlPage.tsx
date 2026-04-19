import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const translations = {
  es: {
    metaTitle: 'Técnico en Alarmas Contra Incendios | Hollywood, FL | PowerTech Academy',
    metaDesc: 'Curso presencial de técnico en alarmas contra incendios en Hollywood, FL. Laboratorio físico, job placement, certificación reconocida. 2-3 meses.',
    heroTitle: 'Técnico en Alarmas Contra Incendios',
    heroSubtitle: 'Campus presencial en Hollywood, FL • Laboratorio físico • 2-3 meses',
    heroCTA: 'Agendar Asesoría Virtual',
    locationTitle: 'Campus Hollywood, Florida',
    address: '3803 N 29th Ave, Suite B, Hollywood, FL 33020',
    hours: 'Lunes–Viernes, 8 AM – 5 PM EST',
    galleryTitle: 'Infraestructura y Laboratorio',
    programTitle: 'Programa Fast-Track | 40 Horas',
    modules: [
      { title: 'Herramientas & Seguridad', hours: '8h' },
      { title: 'Canalizaciones EMT', hours: '8h' },
      { title: 'Cableado & Mediciones', hours: '8h' },
      { title: 'NFPA 72 & Ubicación', hours: '8h' },
      { title: 'Troubleshooting & Leyes FL', hours: '8h' },
    ],
    ctaTitle: '¿Listo para transformar tu carrera?',
    ctaDesc: 'Agenda una asesoría virtual gratuita con nuestro equipo de admisiones',
    ctaBtn: 'Agendar Ahora',
    backHome: '← Inicio',
  },
  en: {
    metaTitle: 'Fire Alarm Technician Training | Hollywood, FL | PowerTech Academy',
    metaDesc: 'Hands-on fire alarm technician training in Hollywood, FL. Physical lab, job placement, recognized certification. 2-3 months.',
    heroTitle: 'Fire Alarm Technician Training',
    heroSubtitle: 'In-person campus in Hollywood, FL • Hands-on lab • 2-3 months',
    heroCTA: 'Schedule Virtual Advisory',
    locationTitle: 'Hollywood, Florida Campus',
    address: '3803 N 29th Ave, Suite B, Hollywood, FL 33020',
    hours: 'Mon–Fri, 8 AM – 5 PM EST',
    galleryTitle: 'Campus & Lab Infrastructure',
    programTitle: 'Fast-Track Program | 40 Hours',
    modules: [
      { title: 'Tools & Safety', hours: '8h' },
      { title: 'EMT Conduit', hours: '8h' },
      { title: 'Wiring & Testing', hours: '8h' },
      { title: 'NFPA 72 & Placement', hours: '8h' },
      { title: 'Troubleshooting & FL Laws', hours: '8h' },
    ],
    ctaTitle: 'Ready to transform your career?',
    ctaDesc: 'Schedule a free virtual advisory with our admissions team',
    ctaBtn: 'Schedule Now',
    backHome: '← Home',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PowerTech Academy – Hollywood Campus',
  image: 'https://powertech.academy/images/hollywood/campus-hero.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3803 N 29th Ave, Suite B',
    addressLocality: 'Hollywood',
    addressRegion: 'FL',
    postalCode: '33020',
    addressCountry: 'US',
  },
  telephone: '+1-786-460-9020',
  email: 'sales@powertech.academy',
  url: 'https://powertech.academy/hollywood-fl',
  openingHours: 'Mo-Fr 08:00-17:00',
  priceRange: '$$',
};

const galleryImages = [
  { src: '/images/hollywood/campus-1.jpg', alt: 'Campus exterior' },
  { src: '/images/hollywood/campus-2.jpg', alt: 'Campus entrance' },
  { src: '/images/hollywood/lab-1.jpg', alt: 'Hands-on lab' },
  { src: '/images/hollywood/lab-2.jpg', alt: 'Lab equipment' },
  ...Array.from({ length: 22 }, (_, i) => ({
    src: `/images/hollywood/gallery-${i + 5}.jpg`,
    alt: `Campus gallery ${i + 1}`,
  })),
];

const HollywoodFlPage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language === 'es' ? 'es' : 'en'];
  const isES = language === 'es';

  return (
    <>
      <Helmet>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDesc} />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://powertech.academy${isES ? '/es' : ''}/hollywood-fl`} />
        <meta property="og:image" content="https://powertech.academy/images/hollywood/campus-hero.jpg" />
        <link rel="canonical" href={`https://powertech.academy${isES ? '/es' : ''}/hollywood-fl`} />
        <link rel="alternate" hrefLang="en" href="https://powertech.academy/hollywood-fl" />
        <link rel="alternate" hrefLang="es" href="https://powertech.academy/es/hollywood-fl" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url(/images/hollywood/campus-hero.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <p className="text-[#FF4500] font-barlow-condensed font-bold tracking-widest uppercase mb-3 text-sm">
            PowerTech Academy
          </p>
          <h1 className="text-5xl md:text-7xl font-bebas-neue font-bold leading-tight mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl font-barlow text-gray-200 mb-8">{t.heroSubtitle}</p>
          <a
            href="https://wa.me/17864609020?text=Hola%2C%20me%20interesa%20el%20programa%20en%20Hollywood%20FL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FF4500] hover:bg-[#E63E00] text-white px-10 py-4 rounded-lg font-barlow-condensed text-lg font-bold transition-colors"
          >
            {t.heroCTA}
          </a>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bebas-neue font-bold mb-10 text-center text-[#050505]">
            {t.locationTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl space-y-4">
              <p className="flex items-start gap-3 font-barlow text-gray-700">
                <span className="text-xl">📍</span>
                <span>{t.address}</span>
              </p>
              <p className="flex items-center gap-3 font-barlow text-gray-700">
                <span className="text-xl">📞</span>
                <a href="tel:+17864609020" className="hover:text-[#FF4500] transition-colors">+1 (786) 460-9020</a>
              </p>
              <p className="flex items-center gap-3 font-barlow text-gray-700">
                <span className="text-xl">✉️</span>
                <a href="mailto:sales@powertech.academy" className="hover:text-[#FF4500] transition-colors">sales@powertech.academy</a>
              </p>
              <p className="flex items-center gap-3 font-barlow text-gray-700">
                <span className="text-xl">🕐</span>
                <span>{t.hours}</span>
              </p>
            </div>
            <div className="h-80 rounded-xl overflow-hidden">
              <iframe
                title="PowerTech Academy Hollywood Campus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.8!2d-80.1679!3d26.0142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9ad3b9a3b3b3b%3A0x1!2s3803+N+29th+Ave%2C+Hollywood%2C+FL+33020!5e0!3m2!1sen!2sus!4v1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-16 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bebas-neue font-bold mb-10 text-center text-white">
            {t.galleryTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {galleryImages.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                loading="lazy"
                className="w-full h-64 object-cover rounded-xl"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bebas-neue font-bold mb-10 text-center text-[#050505]">
            {t.programTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {t.modules.map((mod, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#050505] to-[#1a1a1a] text-white p-6 rounded-xl text-center border border-[#FF4500]/20 hover:border-[#FF4500]/60 transition-colors"
              >
                <p className="font-barlow-condensed font-bold text-base mb-3 leading-tight">{mod.title}</p>
                <p className="text-[#FF4500] font-bebas-neue text-3xl font-bold">{mod.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#050505] to-[#1a1a1a] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bebas-neue font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-lg font-barlow text-gray-300 mb-10">{t.ctaDesc}</p>
          <a
            href="https://wa.me/17864609020?text=Hola%2C%20quiero%20agendar%20una%20asesor%C3%ADa%20virtual"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FF4500] hover:bg-[#E63E00] text-white px-12 py-4 rounded-lg font-barlow-condensed text-xl font-bold transition-colors"
          >
            {t.ctaBtn}
          </a>
          <div className="mt-8">
            <Link to={isES ? '/es' : '/'} className="text-gray-400 hover:text-white font-barlow text-sm transition-colors">
              {t.backHome}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HollywoodFlPage;
