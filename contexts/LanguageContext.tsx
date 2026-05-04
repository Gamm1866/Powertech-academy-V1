/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type Lang = 'en' | 'es';

export const translations = {
  en: {
    langToggle: 'ES',
    nav: {
      apply: 'Apply Now',
      advisory: 'Schedule Advisory',
    },
    hero: {
      badge: 'Admissions Open 2026',
      h1a: 'Fire Alarm',
      h1b: 'Technician',
      h1c: 'Training',
      sub: 'Fire alarm systems technician training in Hollywood, FL — Broward County. Covers NFPA 72 content, OSHA safety practices, panel configuration, and EMT conduit installation using OSHA-certified safety equipment. Start a career in South Florida in 2 to 3 months.',
      cta: 'Start Your Career',
    },
    program: {
      title: 'Program',
      titleAccent: 'Details',
      sub: 'Everything you need to know about the program and your path to a career in fire alarm systems.',
      duration: 'Duration',
      durationVal: '2 - 3 Months',
      durationSub: 'Fast-track intensive course',
      prereqs: 'Prerequisites',
      prereqsVal: 'Age 17+',
      prereqsSub: 'No prior experience needed',
      cert: 'Certification',
      certVal: 'Certificate of Attendance',
      certSub: 'Certificate of Attendance designed with active industry professionals.',
      location: 'Campus Location',
      locationVal: 'Hollywood, FL',
      locationSub: 'Broward County \u2022 Coming Soon: South Miami (Miami-Dade)',
      curriculum: 'Curriculum',
      curriculumVal: 'System Design',
      curriculumSub: 'Panel Configuration & Wiring Standards',
    },
    benefits: {
      title: 'Great Job',
      titleAccent: 'Opportunities',
      items: [
        'Join a high-growth employment sector with stable demand across South Florida and Broward County.',
        'Career guidance resources and job search support included for program completers in the fire alarm and low voltage sectors.',
        'No prior experience required. Open to anyone 17+ in the Hollywood FL and Miami-Dade area.',
        'Hands-on program covering NFPA 72 content, developed with input from active industry professionals in Florida.',
      ],
      placementRate: 'Active Job Market',
      entryLevel: 'Entry Level',
      entryLevelSub: 'Accessible to all',
      certified: 'Certified',
      certifiedSub: 'Built with industry pros',
      salary: 'Earning Potential*',
    },
    socialProof: {
      title: 'Where fire alarm technicians work in South Florida',
    },
    curriculum: {
      title: 'What You',
      titleAccent: 'Will Learn',
      sub: 'A structured 5-module program totaling 40 hours of hands-on training.',
      modules: [
        {
          title: 'Module 1: Fire Alarm Fundamentals',
          hours: '8 hours',
          theory: '4h Theory',
          lab: '4h Lab',
          desc: 'Introduction to fire alarm systems, NFPA 72 code fundamentals, component identification, and life-safety principles.',
        },
        {
          title: 'Module 2: System Design & Codes',
          hours: '8 hours',
          theory: '5h Theory',
          lab: '3h Lab',
          desc: 'Reading blueprints, AHJ requirements, Florida Fire Prevention Code, and complete system layout design.',
        },
        {
          title: 'Module 3: Panel Configuration',
          hours: '8 hours',
          theory: '3h Theory',
          lab: '5h Lab',
          desc: 'Programming addressable and conventional panels, zone mapping, and trouble-shooting sequences.',
        },
        {
          title: 'Module 4: Installation & Wiring',
          hours: '8 hours',
          theory: '2h Theory',
          lab: '6h Lab',
          desc: 'Conduit and cable runs, device placement, supervision circuits, and NEC wiring standards.',
        },
        {
          title: 'Module 5: Testing & Maintenance',
          hours: '8 hours',
          theory: '3h Theory',
          lab: '5h Lab',
          desc: 'Acceptance testing procedures, periodic inspection, record-keeping, and customer handover.',
        },
      ],
    },
    enrollment: {
      heading: 'Ready to Enroll?',
      sub: 'Secure your spot in the next cohort. Fill out the form below to take the first step towards a new career.',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      consent: 'I agree to receive communications from PowerTech Academy. See our',
      privacyLink: 'Privacy Policy',
      submit: 'Submit Application',
      submitting: 'Sending\u2026',
      success: "Application received! We\u2019ll be in touch shortly.",
      error: 'Something went wrong. Please try again or email sales@powertech.academy.',
    },
    footer: {
      copy: '© 2026 PowerTech Academy. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    privacyPolicy: {
      title: 'Privacy Policy',
      effectiveDate: 'Effective Date: January 1, 2025',
      intro: 'PowerTech Academy (\u201cwe,\u201d \u201cour,\u201d or \u201cus\u201d), located in Hollywood, Florida, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or submit an enrollment inquiry.',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'We collect personal information that you voluntarily provide, including: full name, email address, phone number, and any other information you submit through our enrollment form. We may also collect standard web analytics data such as IP address, browser type, and page visits.',
        },
        {
          heading: '2. How We Use Your Information',
          body: 'We use the information we collect to: process your enrollment inquiry, contact you about program details, send marketing communications (only with your express written consent), and improve our website and services.',
        },
        {
          heading: '3. TCPA Consent & Text/Call Communications',
          body: 'By checking the consent box on our enrollment form, you expressly consent under the Telephone Consumer Protection Act (TCPA) to receive autodialed or prerecorded calls and text messages from PowerTech Academy at the phone number you provided, for enrollment and marketing purposes. Consent is not a condition of purchase. Message and data rates may apply. You may opt out at any time by replying STOP to any text message or calling us at (954) 000-0000.',
        },
        {
          heading: '4. Florida Privacy Rights',
          body: 'Under Florida law, you have the right to know what personal information we collect, to request access to or deletion of your data, and to opt out of marketing communications at any time. To exercise these rights, contact us at sales@powertech.academy.',
        },
        {
          heading: '5. Data Sharing',
          body: 'We do not sell your personal information. We may share data with trusted service providers (email delivery, CRM) solely to operate our services. We do not disclose personal data to third parties for their own marketing purposes.',
        },
        {
          heading: '6. Data Retention',
          body: 'We retain your personal information for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law, whichever is longer.',
        },
        {
          heading: '7. Security',
          body: 'We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is completely secure.',
        },
        {
          heading: '8. Contact Us',
          body: 'If you have questions or concerns about this Privacy Policy, please contact us at: PowerTech Academy \u2022 1234 Taft St, Hollywood, FL 33020 \u2022 Email: sales@powertech.academy',
        },
      ],
    },
  },
  es: {
    langToggle: 'EN',
    nav: {
      apply: 'Aplicar Ahora',
      advisory: 'Agendar Asesoría',
    },
    hero: {
      badge: 'Admisiones Abiertas 2026',
      h1a: 'Formaci\u00f3n de',
      h1b: 'T\u00e9cnico en',
      h1c: 'Alarmas',
      sub: 'Formación técnica en sistemas de alarmas contra incendio en Hollywood, FL — Broward County. Cubre contenido NFPA 72, prácticas de seguridad OSHA, configuración de paneles e instalación de canaletas EMT usando implementos de seguridad certificados OSHA. Inicia una carrera en South Florida en 2 a 3 meses.',
      cta: 'Inicia Tu Carrera',
    },
    program: {
      title: 'Detalles del',
      titleAccent: 'Programa',
      sub: 'Todo lo que necesitas saber sobre tu camino para convertirte en t\u00e9cnico certificado.',
      duration: 'Duraci\u00f3n',
      durationVal: '2 - 3 Meses',
      durationSub: 'Curso intensivo acelerado',
      prereqs: 'Requisitos',
      prereqsVal: '17 a\u00f1os+',
      prereqsSub: 'Sin experiencia previa necesaria',
      cert: 'Certificaci\u00f3n',
      certVal: 'Certificado de Asistencia',
      certSub: 'Credencial reconocida por la industria al completar',
      location: 'Ubicaci\u00f3n del Campus',
      locationVal: 'Hollywood, FL',
      locationSub: 'Condado Broward \u2022 Pr\u00f3ximamente: South Miami (Miami-Dade)',
      curriculum: 'Plan de Estudios',
      curriculumVal: 'Dise\u00f1o de Sistemas',
      curriculumSub: 'Configuraci\u00f3n de Paneles y Est\u00e1ndares de Cableado',
    },
    benefits: {
      title: 'Grandes',
      titleAccent: 'Oportunidades',
      items: [
        'Únete a un sector de alto crecimiento con demanda estable en South Florida y Broward County.',
        'Recursos de orientación profesional y apoyo en búsqueda de empleo incluidos para los completadores del programa en los sectores de alarmas y bajo voltaje.',
        'Sin experiencia previa. Abierto a cualquier persona mayor de 17 años en el área de Hollywood FL y Miami-Dade.',
        'Programa práctico basado en contenido NFPA 72, desarrollado con la participación de profesionales activos de la industria en Florida.',
      ],
      placementRate: 'Demanda Laboral Activa',
      entryLevel: 'Nivel de Entrada',
      entryLevelSub: 'Accesible para todos',
      certified: 'Certificado',
      certifiedSub: 'Diseñado con profesionales activos del sector',
      salary: 'Potencial de Ingresos*',
    },
    socialProof: {
      title: 'D\u00f3nde trabajan los t\u00e9cnicos de alarmas en South Florida',
    },
    curriculum: {
      title: 'Lo Que',
      titleAccent: 'Aprender\u00e1s',
      sub: 'Un programa estructurado de 5 m\u00f3dulos con 40 horas de entrenamiento pr\u00e1ctico.',
      modules: [
        {
          title: 'M\u00f3dulo 1: Fundamentos de Alarmas de Incendio',
          hours: '8 horas',
          theory: '4h Teor\u00eda',
          lab: '4h Laboratorio',
          desc: 'Introducci\u00f3n a los sistemas de alarma contra incendios, fundamentos del c\u00f3digo NFPA 72, identificaci\u00f3n de componentes y principios de seguridad.',
        },
        {
          title: 'M\u00f3dulo 2: Dise\u00f1o de Sistemas y C\u00f3digos',
          hours: '8 horas',
          theory: '5h Teor\u00eda',
          lab: '3h Laboratorio',
          desc: 'Lectura de planos, requisitos AHJ, C\u00f3digo de Prevenci\u00f3n de Incendios de Florida y dise\u00f1o completo del sistema.',
        },
        {
          title: 'M\u00f3dulo 3: Configuraci\u00f3n de Paneles',
          hours: '8 horas',
          theory: '3h Teor\u00eda',
          lab: '5h Laboratorio',
          desc: 'Programaci\u00f3n de paneles direccionables y convencionales, mapeo de zonas y secuencias de soluci\u00f3n de problemas.',
        },
        {
          title: 'M\u00f3dulo 4: Instalaci\u00f3n y Cableado',
          hours: '8 horas',
          theory: '2h Teor\u00eda',
          lab: '6h Laboratorio',
          desc: 'Canalizaciones y tendido de cables, ubicaci\u00f3n de dispositivos, circuitos de supervisi\u00f3n y est\u00e1ndares de cableado NEC.',
        },
        {
          title: 'M\u00f3dulo 5: Pruebas y Mantenimiento',
          hours: '8 horas',
          theory: '3h Teor\u00eda',
          lab: '5h Laboratorio',
          desc: 'Procedimientos de prueba de aceptaci\u00f3n, inspecci\u00f3n peri\u00f3dica, mantenimiento de registros y entrega al cliente.',
        },
      ],
    },
    enrollment: {
      heading: '\u00bfListo para Inscribirte?',
      sub: 'Asegura tu lugar en la pr\u00f3xima cohorte. Completa el formulario para dar el primer paso hacia una nueva carrera.',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electr\u00f3nico',
      phone: 'N\u00famero de Tel\u00e9fono',
      consent: 'Acepto recibir comunicaciones de PowerTech Academy. Ver nuestra',
      privacyLink: 'Pol\u00edtica de Privacidad',
      submit: 'Enviar Solicitud',
      submitting: 'Enviando\u2026',
      success: '\u00a1Solicitud recibida! Nos pondremos en contacto pronto.',
      error: 'Algo sali\u00f3 mal. Por favor int\u00e9ntalo de nuevo o escr\u00edbenos a sales@powertech.academy.',
    },
    footer: {
      copy: '© 2026 PowerTech Academy. Todos los derechos reservados.',
      privacy: 'Pol\u00edtica de Privacidad',
      terms: 'T\u00e9rminos de Servicio',
    },
    privacyPolicy: {
      title: 'Pol\u00edtica de Privacidad',
      effectiveDate: 'Fecha de Vigencia: 1 de enero de 2025',
      intro: 'PowerTech Academy (\u201cnosotros,\u201d \u201cnuestro,\u201d o \u201cnos\u201d), con sede en Hollywood, Florida, se compromete a proteger su privacidad. Esta Pol\u00edtica de Privacidad explica c\u00f3mo recopilamos, usamos, divulgamos y protegemos su informaci\u00f3n cuando visita nuestro sitio web o env\u00eda una consulta de inscripci\u00f3n.',
      sections: [
        {
          heading: '1. Informaci\u00f3n que Recopilamos',
          body: 'Recopilamos informaci\u00f3n personal que usted proporciona voluntariamente, incluyendo: nombre completo, direcci\u00f3n de correo electr\u00f3nico, n\u00famero de tel\u00e9fono y cualquier otra informaci\u00f3n que env\u00ede a trav\u00e9s de nuestro formulario de inscripci\u00f3n. Tambi\u00e9n podemos recopilar datos est\u00e1ndar de an\u00e1lisis web como direcci\u00f3n IP, tipo de navegador y visitas a p\u00e1ginas.',
        },
        {
          heading: '2. C\u00f3mo Usamos Su Informaci\u00f3n',
          body: 'Usamos la informaci\u00f3n que recopilamos para: procesar su consulta de inscripci\u00f3n, contactarlo sobre los detalles del programa, enviar comunicaciones de marketing (solo con su consentimiento expreso por escrito) y mejorar nuestro sitio web y servicios.',
        },
        {
          heading: '3. Consentimiento TCPA y Comunicaciones por Texto/Llamada',
          body: 'Al marcar la casilla de consentimiento en nuestro formulario de inscripci\u00f3n, usted consiente expresamente bajo la Ley de Protecci\u00f3n al Consumidor Telef\u00f3nico (TCPA) recibir llamadas autom\u00e1ticas o pregrabadas y mensajes de texto de PowerTech Academy al n\u00famero de tel\u00e9fono que proporcion\u00f3, con fines de inscripci\u00f3n y marketing. El consentimiento no es una condici\u00f3n de compra. Pueden aplicarse tarifas de mensajes y datos. Puede cancelar su suscripci\u00f3n en cualquier momento respondiendo STOP a cualquier mensaje de texto o llam\u00e1ndonos al (954) 000-0000.',
        },
        {
          heading: '4. Derechos de Privacidad de Florida',
          body: 'Bajo la ley de Florida, usted tiene el derecho de saber qu\u00e9 informaci\u00f3n personal recopilamos, solicitar acceso o eliminaci\u00f3n de sus datos, y optar por no recibir comunicaciones de marketing en cualquier momento. Para ejercer estos derechos, cont\u00e1ctenos en sales@powertech.academy.',
        },
        {
          heading: '5. Compartir Datos',
          body: 'No vendemos su informaci\u00f3n personal. Podemos compartir datos con proveedores de servicios de confianza (entrega de correo electr\u00f3nico, CRM) \u00fanicamente para operar nuestros servicios. No divulgamos datos personales a terceros para sus propios fines de marketing.',
        },
        {
          heading: '6. Retenci\u00f3n de Datos',
          body: 'Conservamos su informaci\u00f3n personal durante el tiempo necesario para cumplir con los prop\u00f3sitos descritos en esta pol\u00edtica, o seg\u00fan lo requiera la ley aplicable, lo que sea mayor.',
        },
        {
          heading: '7. Seguridad',
          body: 'Implementamos medidas t\u00e9cnicas y organizativas razonables para proteger su informaci\u00f3n personal de acceso, uso o divulgaci\u00f3n no autorizados. Sin embargo, ninguna transmisi\u00f3n por Internet es completamente segura.',
        },
        {
          heading: '8. Cont\u00e1ctenos',
          body: 'Si tiene preguntas o inquietudes sobre esta Pol\u00edtica de Privacidad, cont\u00e1ctenos en: PowerTech Academy \u2022 1234 Taft St, Hollywood, FL 33020 \u2022 Email: sales@powertech.academy',
        },
      ],
    },
  },
};

export type TranslationType = typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  console.log("LanguageProvider mounting...");
  const location = useLocation();
  const navigate = useNavigate();

  const lang: Lang = location.pathname.startsWith('/es') ? 'es' : 'en';

  const setLang = (newLang: Lang) => {
    const path = location.pathname;
    if (newLang === 'es' && !path.startsWith('/es')) {
      navigate('/es' + (path === '/' ? '' : path));
    } else if (newLang === 'en' && path.startsWith('/es')) {
      navigate(path.replace(/^\/es/, '') || '/');
    }
  };

  const t = translations[lang] as TranslationType;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  console.log("useLanguage called, ctx is:", !!ctx);
  if (!ctx) {
    console.error('useLanguage called outside of LanguageProvider!');
    console.trace();
    return { lang: 'en', setLang: () => {}, t: translations.en };
  }
  return ctx;
};
