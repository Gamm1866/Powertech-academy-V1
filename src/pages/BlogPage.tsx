import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    slug: '/blog/fire-alarm-technician-salary-florida',
    title: {
      en: 'Fire Alarm Technician Salary in Florida: What to Expect in 2026',
      es: 'Salario de Técnico de Alarmas en Florida: Qué esperar en 2026'
    },
    excerpt: {
      en: 'Entry-level to senior pay ranges, what affects your earnings, and how fast you can move up in South Florida.',
      es: 'Rangos salariales de entrada hasta senior, qué afecta tus ingresos y qué tan rápido puedes avanzar en el Sur de Florida.'
    },
    category: { en: 'Salary Guide', es: 'Guía Salarial' }
  },
  {
    slug: '/blog/how-to-get-hired-fire-alarm-technician-south-florida',
    title: {
      en: 'How to Get Hired as Entry-Level Fire Alarm Tech in South Florida',
      es: 'Cómo Conseguir Empleo de Técnico de Alarmas en el Sur de Florida'
    },
    excerpt: {
      en: 'What Broward and Miami-Dade contractors actually look for, where to find openings, and how to stand out with no experience.',
      es: 'Qué buscan los contratistas de Broward y Miami-Dade, dónde encontrar vacantes y cómo destacar sin experiencia.'
    },
    category: { en: 'Career Guide', es: 'Guía de Carrera' }
  },
  {
    slug: '/blog/nfpa-72-guide-florida-fire-alarm-technicians',
    title: {
      en: 'NFPA 72 Explained: A Beginner\'s Guide for Florida Technicians',
      es: 'NFPA 72 Explicado: Guía para Principiantes en Florida'
    },
    excerpt: {
      en: 'What NFPA 72 actually covers, how Florida enforces it, and what a new technician needs to understand before day one.',
      es: 'Qué cubre el NFPA 72, cómo lo aplica Florida y qué debe entender un nuevo técnico antes de su primer día.'
    },
    category: { en: 'Technical Guide', es: 'Guía Técnica' }
  },
  {
    slug: '/blog/what-does-a-fire-alarm-technician-do-florida',
    title: {
      en: 'What Does a Fire Alarm Technician Do in Florida?',
      es: '¿Qué hace un Técnico de Alarmas contra Incendio en Florida?'
    },
    excerpt: {
      en: 'Installation, inspection, panel programming, troubleshooting — a practical look at the day-to-day work and skills required.',
      es: 'Instalación, inspección, programación de paneles, resolución de problemas: una mirada práctica al trabajo diario.'
    },
    category: { en: 'Career Guide', es: 'Guía de Carrera' }
  },
  {
    slug: '/blog/how-long-does-fire-alarm-training-take',
    title: {
      en: 'How Long Does Fire Alarm Technician Training Take?',
      es: '¿Cuánto tiempo dura la capacitación de Técnico de Alarmas?'
    },
    excerpt: {
      en: 'Intensive programs vs apprenticeships vs community college — an honest breakdown of timelines and what each path covers.',
      es: 'Programas intensivos vs. aprendizajes vs. institutos: un desglose honesto de los plazos y lo que cubre cada camino.'
    },
    category: { en: 'Training', es: 'Capacitación' }
  },
  {
    slug: '/blog/fire-alarm-technician-vs-electrician-florida',
    title: {
      en: 'Fire Alarm Technician vs Electrician in Florida',
      es: 'Técnico de Alarmas contra Incendio vs. Electricista en Florida'
    },
    excerpt: {
      en: 'Entry requirements, licensing timelines, and scope of work — a side-by-side comparison for career changers in Florida.',
      es: 'Requisitos de entrada, plazos de licencia y alcance del trabajo: una comparación detallada para quienes cambian de carrera.'
    },
    category: { en: 'Comparison', es: 'Comparación' }
  },
];

const BlogPage = () => {
  const { lang } = useLanguage();
  const isEs = lang === 'es';

  return (
    <div className="bg-power-bg min-h-screen text-power-text font-sans selection:bg-power-accent selection:text-white pb-24">
      <Helmet>
        <html lang={lang} />
        <title>{isEs ? 'Blog de Tecnología y Seguridad | PowerTech Academy' : 'Technology & Safety Blog | PowerTech Academy'}</title>
        <meta name="description" content={isEs ? 'Explora artículos sobre la industria de alarmas contra incendio, formación técnica y oportunidades de carrera en Florida.' : 'Explore articles on the fire alarm industry, technical training, and career opportunities in Florida.'} />
        <link rel="canonical" href={isEs ? 'https://www.powertech.academy/es/blog' : 'https://www.powertech.academy/blog'} />
      </Helmet>

      <Header />

      <main className="container mx-auto px-6 pt-32 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {isEs ? 'Blog' : 'Blog'} <span className="text-power-accent">{isEs ? 'Recursos' : 'Resources'}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {isEs 
              ? 'Guías completas, comparativas y noticias sobre la industria de sistemas de seguridad en Florida.' 
              : 'Complete guides, comparisons, and news about the security systems industry in Florida.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={post.slug} className="group block h-full">
                <div className="glass-card-interactive rounded-2xl h-full overflow-hidden flex flex-col border border-white/5 hover:border-power-accent/30 transition-all duration-300">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-power-accent/10 text-power-accent text-xs font-bold uppercase tracking-wider border border-power-accent/20">
                        {isEs ? post.category.es : post.category.en}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-power-accent transition-colors">
                      {isEs ? post.title.es : post.title.en}
                    </h2>
                    <p className="text-gray-400 mb-8 flex-1 leading-relaxed">
                      {isEs ? post.excerpt.es : post.excerpt.en}
                    </p>
                    <div className="flex items-center text-white font-bold gap-2 group-hover:gap-4 transition-all duration-300">
                      {isEs ? 'Leer más' : 'Read more'}
                      <ArrowRight size={18} className="text-power-accent" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to action for those looking for training */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-3xl bg-gradient-to-br from-[#121212] to-black border border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-power-accent to-transparent opacity-50" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isEs ? '¿Listo para empezar tu carrera?' : 'Ready to start your career?'}
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            {isEs 
              ? 'Únete a nuestro próximo cohorte en Hollywood, FL y certifícate en sistemas de alarmas contra incendio.' 
              : 'Join our next cohort in Hollywood, FL and get certified in fire alarm systems.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isEs ? '/es/advisory' : '/advisory'}
              className="glass-btn-accent px-8 py-4 rounded-xl font-bold text-lg"
            >
              {isEs ? 'Agendar Asesoría Gratis' : 'Schedule Free Advisory'}
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BlogPage;
