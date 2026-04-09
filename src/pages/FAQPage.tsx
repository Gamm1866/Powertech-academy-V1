import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../contexts/LanguageContext';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Schema JSON-LD
const getFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long is the fire alarm technician program?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The program is a fast-track format lasting 2 to 3 months (approximately 90 days). It includes 40 hours of instruction split between virtual theory (35%) and hands-on lab sessions (65%) at our Hollywood FL campus."
        }
      },
      {
        "@type": "Question",
        "name": "What certification do I get after completing the program?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upon completion you receive a Certificate of Attendance from PowerTech Academy, recognized by top employers in the fire and life safety industry in South Florida. Note: this is not an NFPA 72 certification — it is a proprietary credential that demonstrates your training in fire alarm systems."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need prior experience to enroll?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No prior experience is required. The program is designed for anyone 17 years or older who wants to enter the fire and life safety industry. Our curriculum starts from the fundamentals and builds up to hands-on panel configuration and Florida code compliance."
        }
      },
      {
        "@type": "Question",
        "name": "Does PowerTech Academy offer job placement support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. PowerTech Academy provides active job search support connecting graduates with employers in the fire alarm, low voltage, and security industries across South Florida."
        }
      },
      {
        "@type": "Question",
        "name": "How much can I earn as a fire alarm technician in Florida?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Entry-level fire alarm technicians in Florida can earn $65,000 or more per year. The fire and life safety sector is one of the most stable and in-demand trades in the state, with consistent growth driven by new construction and mandatory compliance requirements."
        }
      },
      {
        "@type": "Question",
        "name": "What topics are covered in the program?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The program covers 5 modules: OSHA safety and tools, EMT conduit and physical installation, cable wiring and multimeter measurements, NFPA 72 device configuration, and Florida law compliance including Florida Statute 489.5185, FASA card requirements, and Rule 69A-48 panel labeling. 65% of the time is spent in hands-on lab exercises."
        }
      },
      {
        "@type": "Question",
        "name": "Where is the campus located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our main campus is located at 3803 N 29th Ave, Suite B, Hollywood FL 33020 (Broward County). We are also planning a second campus in South Miami, Miami-Dade County. Office hours are Monday to Friday, 8:00 AM to 5:00 PM EST."
        }
      },
      {
        "@type": "Question",
        "name": "How do I enroll?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The first step is a mandatory 15-minute Virtual Advisory session via Google Meet with our admissions team. You can apply directly on our website or call us at +1 (786) 460-9020. Seats are limited per cohort."
        }
      }
    ]
  };
};

const FAQ_DATA = [
  {
    question: {
      en: "How long is the fire alarm technician program?",
      es: "¿Cuánto dura el programa de técnico en alarmas contra incendio?"
    },
    answer: {
      en: "The program is a fast-track format lasting 2 to 3 months (approximately 90 days). It includes 40 hours of instruction split between virtual theory (35%) and hands-on lab sessions (65%) at our Hollywood FL campus.",
      es: "El programa tiene un formato fast-track de 2 a 3 meses (aproximadamente 90 días). Incluye 40 horas de instrucción divididas entre teoría virtual (35%) y laboratorios prácticos presenciales (65%) en nuestro campus en Hollywood FL."
    }
  },
  {
    question: {
      en: "What certification do I get after completing the program?",
      es: "¿Qué certificación obtengo al completar el programa?"
    },
    answer: {
      en: "Upon completion you receive a Certificate of Attendance from PowerTech Academy, recognized by top employers in the fire and life safety industry in South Florida. Note: this is not an NFPA 72 certification — it is a proprietary credential that demonstrates your training in fire alarm systems.",
      es: "Al completar el programa recibes un Certificado de Asistencia de PowerTech Academy, reconocido por los principales empleadores del sector fire & life safety en South Florida. Nota: este no es una certificación NFPA 72 — es una credencial propia que demuestra tu formación en sistemas de alarmas."
    }
  },
  {
    question: {
      en: "Do I need prior experience to enroll?",
      es: "¿Necesito experiencia previa para inscribirme?"
    },
    answer: {
      en: "No prior experience is required. The program is designed for anyone 17 years or older who wants to enter the fire and life safety industry. Our curriculum starts from the fundamentals and builds up to hands-on panel configuration and Florida code compliance.",
      es: "No se requiere experiencia previa. El programa está diseñado para cualquier persona mayor de 17 años que quiera ingresar al sector fire & life safety. El currículo comienza desde los fundamentos y avanza hasta la configuración de paneles y cumplimiento del código de Florida."
    }
  },
  {
    question: {
      en: "Does PowerTech Academy offer job placement support?",
      es: "¿PowerTech Academy ofrece apoyo para conseguir empleo?"
    },
    answer: {
      en: "Yes. PowerTech Academy provides active job search support connecting graduates with employers in the fire alarm, low voltage, and security industries across South Florida.",
      es: "Sí. PowerTech Academy brinda apoyo activo en la búsqueda de empleo, conectando a los graduados con empleadores en los sectores de alarmas, bajo voltaje y seguridad en South Florida."
    }
  },
  {
    question: {
      en: "How much can I earn as a fire alarm technician in Florida?",
      es: "¿Cuánto puedo ganar como técnico en alarmas contra incendio en Florida?"
    },
    answer: {
      en: "Entry-level fire alarm technicians in Florida can earn $65,000 or more per year. The fire and life safety sector is one of the most stable and in-demand trades in the state, with consistent growth driven by new construction and mandatory compliance requirements.",
      es: "Los técnicos en alarmas contra incendio de nivel inicial en Florida pueden ganar $65,000 o más al año. El sector fire & life safety es uno de los oficios más estables y demandados del estado, con crecimiento constante impulsado por nueva construcción y requisitos de cumplimiento obligatorio."
    }
  },
  {
    question: {
      en: "What topics are covered in the program?",
      es: "¿Qué temas cubre el programa?"
    },
    answer: {
      en: "The program covers 5 modules: OSHA safety and tools, EMT conduit and physical installation, cable wiring and multimeter measurements, NFPA 72 device configuration, and Florida law compliance including Florida Statute 489.5185, FASA card requirements, and Rule 69A-48 panel labeling. 65% of the time is spent in hands-on lab exercises.",
      es: "El programa cubre 5 módulos: seguridad OSHA y herramientas, montaje físico y canalizaciones EMT, cableado y mediciones con multímetro, configuración de dispositivos según NFPA 72, y cumplimiento legal de Florida incluyendo el Estatuto 489.5185, requisitos de tarjeta FASA y etiquetado de paneles según la Regla 69A-48. El 65% del tiempo se dedica a laboratorios prácticos."
    }
  },
  {
    question: {
      en: "Where is the campus located?",
      es: "¿Dónde está ubicado el campus?"
    },
    answer: {
      en: "Our main campus is located at 3803 N 29th Ave, Suite B, Hollywood FL 33020 (Broward County). We are also planning a second campus in South Miami, Miami-Dade County. Office hours are Monday to Friday, 8:00 AM to 5:00 PM EST.",
      es: "Nuestro campus principal está ubicado en 3803 N 29th Ave, Suite B, Hollywood FL 33020 (Broward County). También estamos planeando un segundo campus en South Miami, Miami-Dade County. Horario de atención: lunes a viernes, 8:00 AM a 5:00 PM EST."
    }
  },
  {
    question: {
      en: "How do I enroll?",
      es: "¿Cómo me inscribo?"
    },
    answer: {
      en: "The first step is a mandatory 15-minute Virtual Advisory session via Google Meet with our admissions team. You can apply directly on our website or call us at +1 (786) 460-9020. Seats are limited per cohort.",
      es: "El primer paso es una sesión obligatoria de Virtual Advisory de 15 minutos por Google Meet con nuestro equipo de admisiones. Puedes aplicar directamente en nuestro sitio web o llamarnos al +1 (786) 460-9020. Los cupos son limitados por cohorte."
    }
  }
];

export const FAQPage = () => {
  const { lang, setLang } = useLanguage();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-power-bg min-h-screen text-power-text font-sans selection:bg-power-accent selection:text-white pb-24">
      <Helmet>
        <html lang={lang} />
        {lang === 'en' ? (
          <>
            <title>FAQ — Fire Alarm Technician Training | PowerTech Academy</title>
            <meta name="description" content="Frequently asked questions about PowerTech Academy's fire alarm systems technician program in Hollywood FL. Duration, cost, requirements, certification, and job placement." />
          </>
        ) : (
          <>
            <title>Preguntas Frecuentes — Curso Técnico en Alarmas | PowerTech Academy</title>
            <meta name="description" content="Preguntas frecuentes sobre el programa de técnico en sistemas de alarmas contra incendio de PowerTech Academy en Hollywood FL." />
          </>
        )}
        <link rel="canonical" href="https://www.powertech.academy/faq" />
        <meta property="og:title" content={lang === 'en' ? 'FAQ — Fire Alarm Technician Training | PowerTech Academy' : 'Preguntas Frecuentes — Curso Técnico en Alarmas | PowerTech Academy'} />
        <meta property="og:description" content={lang === 'en' ? "Frequently asked questions about PowerTech Academy's fire alarm program in Hollywood FL." : 'Preguntas frecuentes sobre el programa de técnico en alarmas de PowerTech Academy en Hollywood FL.'} />
        <meta property="og:url" content="https://www.powertech.academy/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.powertech.academy/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(getFAQSchema())}
        </script>
      </Helmet>

      {/* Header logic */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-power-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="text-power-accent" />
            <span className="text-xl font-bold tracking-tight">
              PowerTech <span className="text-power-muted font-normal">Academy</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="text-power-muted hover:text-white text-sm font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded-full border border-power-border hover:border-power-accent/50"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {lang === 'en' ? 'Frequently Asked' : 'Preguntas'} <span className="text-power-accent">{lang === 'en' ? 'Questions' : 'Frecuentes'}</span>
        </h1>
        
        <div className="space-y-4 mt-12">
          {FAQ_DATA.map((item, i) => (
            <div
              key={i}
              className="bg-power-card border border-power-border hover:border-power-accent/30 rounded-2xl overflow-hidden transition-colors duration-300"
            >
              <button
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                onClick={() => toggleQuestion(i)}
              >
                <span className="font-semibold text-power-text text-lg pr-4">
                  {lang === 'en' ? item.question.en : item.question.es}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-auto shrink-0"
                >
                  <ChevronDown className="text-power-accent" size={20} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key={`faq-content-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-5 md:px-6 pb-6">
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {lang === 'en' ? item.answer.en : item.answer.es}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
