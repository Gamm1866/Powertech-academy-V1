/**
 * Post-build pre-rendering script.
 *
 * After `vite build`, this script reads dist/index.html and generates a
 * static HTML file for every route with the correct title, description,
 * canonical, hreflang, and OG tags already in the <head>.
 *
 * Vercel serves static files before applying the catch-all rewrite, so bots
 * (and social share previews) receive real meta tags without waiting for JS.
 * The React SPA hydrates normally for human visitors.
 *
 * Add to package.json:  "postbuild": "node scripts/prerender.mjs"
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const BASE = 'https://www.powertech.academy';

const routes = [
  {
    path: '',
    title: 'Fire Alarm Technician Training | Hollywood FL — PowerTech Academy',
    description: 'Hands-on fire alarm technician training in Hollywood, FL. NFPA 72 content, OSHA safety, panel config & conduit. Certificate of Attendance upon completion.',
    canonical: `${BASE}/`,
    hreflangEn: `${BASE}/`,
    hreflangEs: `${BASE}/es`,
  },
  {
    path: 'es',
    title: 'Capacitación Técnico de Alarmas | Hollywood FL — PowerTech Academy',
    description: 'Entrenamiento práctico de técnico de alarmas en Hollywood, FL. Contenido NFPA 72, seguridad OSHA, configuración de paneles. Certificado al completar.',
    canonical: `${BASE}/es`,
    hreflangEn: `${BASE}/`,
    hreflangEs: `${BASE}/es`,
  },
  {
    path: 'fire-alarm-technician-training-florida',
    title: 'Fire Alarm Technician Training Program Florida | PowerTech Academy',
    description: 'Complete fire alarm technician training in Hollywood, FL. 40-hour program covering NFPA 72, OSHA safety, panel configuration, conduit installation, and Florida closeout procedures.',
    canonical: `${BASE}/fire-alarm-technician-training-florida`,
    hreflangEn: `${BASE}/fire-alarm-technician-training-florida`,
    hreflangEs: `${BASE}/es`,
  },
  {
    path: 'hollywood-fl',
    title: 'Fire Alarm Technician Training Hollywood FL | Broward County | PowerTech Academy',
    description: 'Fire alarm technician training in Hollywood FL, Broward County. Serving Hollywood, Fort Lauderdale, Miami, and South Florida. No experience required.',
    canonical: `${BASE}/hollywood-fl`,
    hreflangEn: `${BASE}/hollywood-fl`,
    hreflangEs: `${BASE}/es/hollywood-fl`,
  },
  {
    path: 'es/hollywood-fl',
    title: 'Entrenamiento Técnico de Alarmas Hollywood FL | PowerTech Academy',
    description: 'Entrenamiento de técnico de alarmas contra incendio en Hollywood, FL. Sirviendo Hollywood, Fort Lauderdale, Miami y el Sur de Florida.',
    canonical: `${BASE}/es/hollywood-fl`,
    hreflangEn: `${BASE}/hollywood-fl`,
    hreflangEs: `${BASE}/es/hollywood-fl`,
  },
  {
    path: 'advisory',
    title: 'Free Advisory Call — Fire Alarm Training Florida | PowerTech Academy',
    description: 'Schedule a free advisory call with PowerTech Academy. Learn about our fire alarm technician training program in Hollywood, FL. No commitment required.',
    canonical: `${BASE}/advisory`,
    hreflangEn: `${BASE}/advisory`,
    hreflangEs: `${BASE}/es/advisory`,
  },
  {
    path: 'es/advisory',
    title: 'Asesoría Gratuita — Entrenamiento de Alarmas Florida | PowerTech Academy',
    description: 'Agenda una asesoría gratuita con PowerTech Academy. Conoce nuestro programa de técnico de alarmas en Hollywood, FL.',
    canonical: `${BASE}/es/advisory`,
    hreflangEn: `${BASE}/advisory`,
    hreflangEs: `${BASE}/es/advisory`,
  },
  {
    path: 'faq',
    title: 'FAQ — Fire Alarm Technician Training Florida | PowerTech Academy',
    description: 'Frequently asked questions about fire alarm technician training at PowerTech Academy in Hollywood, FL.',
    canonical: `${BASE}/faq`,
    hreflangEn: `${BASE}/faq`,
    hreflangEs: `${BASE}/es/faq`,
  },
  {
    path: 'es/faq',
    title: 'Preguntas Frecuentes — Entrenamiento de Alarmas Florida | PowerTech Academy',
    description: 'Preguntas frecuentes sobre el entrenamiento de técnico de alarmas en PowerTech Academy en Hollywood, FL.',
    canonical: `${BASE}/es/faq`,
    hreflangEn: `${BASE}/faq`,
    hreflangEs: `${BASE}/es/faq`,
  },
  {
    path: 'blog',
    title: 'Technology & Safety Blog | PowerTech Academy',
    description: 'Explore articles on the fire alarm industry, technical training, and career opportunities in Florida.',
    canonical: `${BASE}/blog`,
    hreflangEn: `${BASE}/blog`,
    hreflangEs: `${BASE}/es/blog`,
  },
  {
    path: 'es/blog',
    title: 'Blog de Tecnología y Seguridad | PowerTech Academy',
    description: 'Explora artículos sobre la industria de alarmas contra incendio, formación técnica y oportunidades de carrera en Florida.',
    canonical: `${BASE}/es/blog`,
    hreflangEn: `${BASE}/blog`,
    hreflangEs: `${BASE}/es/blog`,
  },
  {
    path: 'blog/fire-alarm-technician-salary-florida',
    title: 'Fire Alarm Technician Salary in Florida 2026 | PowerTech Academy',
    description: 'Fire alarm technician salaries in Florida range from $38,000 entry-level to $75,000+ experienced. See what affects your pay in South Florida and how to grow faster.',
    canonical: `${BASE}/blog/fire-alarm-technician-salary-florida`,
    hreflangEn: `${BASE}/blog/fire-alarm-technician-salary-florida`,
    hreflangEs: `${BASE}/es/blog/fire-alarm-technician-salary-florida`,
  },
  {
    path: 'es/blog/fire-alarm-technician-salary-florida',
    title: 'Salario Técnico de Alarmas Florida 2026 | PowerTech Academy',
    description: 'Los salarios de técnico de alarmas en Florida van de $38,000 de entrada a $75,000+ con experiencia. Qué afecta tu salario en el Sur de Florida.',
    canonical: `${BASE}/es/blog/fire-alarm-technician-salary-florida`,
    hreflangEn: `${BASE}/blog/fire-alarm-technician-salary-florida`,
    hreflangEs: `${BASE}/es/blog/fire-alarm-technician-salary-florida`,
  },
  {
    path: 'blog/how-to-get-hired-fire-alarm-technician-south-florida',
    title: 'How to Get Hired as Entry-Level Fire Alarm Tech in South Florida | PowerTech Academy',
    description: 'Practical steps to land your first fire alarm technician job in Broward, Miami-Dade, or Palm Beach County. What employers look for and how to stand out.',
    canonical: `${BASE}/blog/how-to-get-hired-fire-alarm-technician-south-florida`,
    hreflangEn: `${BASE}/blog/how-to-get-hired-fire-alarm-technician-south-florida`,
    hreflangEs: `${BASE}/es/blog/how-to-get-hired-fire-alarm-technician-south-florida`,
  },
  {
    path: 'es/blog/how-to-get-hired-fire-alarm-technician-south-florida',
    title: 'Cómo Conseguir Empleo de Técnico de Alarmas en el Sur de Florida | PowerTech Academy',
    description: 'Pasos prácticos para conseguir tu primer empleo de técnico de alarmas en Broward, Miami-Dade o Palm Beach. Qué buscan los empleadores y cómo destacar.',
    canonical: `${BASE}/es/blog/how-to-get-hired-fire-alarm-technician-south-florida`,
    hreflangEn: `${BASE}/blog/how-to-get-hired-fire-alarm-technician-south-florida`,
    hreflangEs: `${BASE}/es/blog/how-to-get-hired-fire-alarm-technician-south-florida`,
  },
  {
    path: 'blog/nfpa-72-guide-florida-fire-alarm-technicians',
    title: "NFPA 72 Explained: Beginner's Guide for Florida Fire Alarm Technicians | PowerTech Academy",
    description: "What NFPA 72 actually covers and why it matters for fire alarm work in Florida. A practical intro for new technicians — no jargon, just what you need to know.",
    canonical: `${BASE}/blog/nfpa-72-guide-florida-fire-alarm-technicians`,
    hreflangEn: `${BASE}/blog/nfpa-72-guide-florida-fire-alarm-technicians`,
    hreflangEs: `${BASE}/es/blog/nfpa-72-guide-florida-fire-alarm-technicians`,
  },
  {
    path: 'es/blog/nfpa-72-guide-florida-fire-alarm-technicians',
    title: 'NFPA 72 Explicado: Guía para Principiantes en Florida | PowerTech Academy',
    description: 'Qué cubre el NFPA 72 y por qué importa para el trabajo de alarmas en Florida. Una introducción práctica para nuevos técnicos.',
    canonical: `${BASE}/es/blog/nfpa-72-guide-florida-fire-alarm-technicians`,
    hreflangEn: `${BASE}/blog/nfpa-72-guide-florida-fire-alarm-technicians`,
    hreflangEs: `${BASE}/es/blog/nfpa-72-guide-florida-fire-alarm-technicians`,
  },
  {
    path: 'blog/what-does-a-fire-alarm-technician-do-florida',
    title: 'What Does a Fire Alarm Technician Do in Florida? | PowerTech Academy',
    description: 'A practical look at the day-to-day work of fire alarm technicians in Florida — installation, testing, panel config, and what skills the job actually requires.',
    canonical: `${BASE}/blog/what-does-a-fire-alarm-technician-do-florida`,
    hreflangEn: `${BASE}/blog/what-does-a-fire-alarm-technician-do-florida`,
    hreflangEs: `${BASE}/es/blog/what-does-a-fire-alarm-technician-do-florida`,
  },
  {
    path: 'es/blog/what-does-a-fire-alarm-technician-do-florida',
    title: '¿Qué hace un Técnico de Alarmas contra Incendio en Florida? | PowerTech Academy',
    description: 'Una mirada práctica al trabajo diario de los técnicos de alarmas en Florida — instalación, inspección, programación de paneles y habilidades requeridas.',
    canonical: `${BASE}/es/blog/what-does-a-fire-alarm-technician-do-florida`,
    hreflangEn: `${BASE}/blog/what-does-a-fire-alarm-technician-do-florida`,
    hreflangEs: `${BASE}/es/blog/what-does-a-fire-alarm-technician-do-florida`,
  },
  {
    path: 'blog/how-long-does-fire-alarm-training-take',
    title: 'How Long Does Fire Alarm Technician Training Take? | Florida 2026 | PowerTech Academy',
    description: 'Fire alarm technician training in Florida takes 2–3 months in an intensive program or 1–4 years via apprenticeship. Learn what each path covers.',
    canonical: `${BASE}/blog/how-long-does-fire-alarm-training-take`,
    hreflangEn: `${BASE}/blog/how-long-does-fire-alarm-training-take`,
    hreflangEs: `${BASE}/es/blog/how-long-does-fire-alarm-training-take`,
  },
  {
    path: 'es/blog/how-long-does-fire-alarm-training-take',
    title: '¿Cuánto tiempo dura la capacitación de Técnico de Alarmas? | Florida 2026 | PowerTech Academy',
    description: 'La capacitación de técnico de alarmas en Florida toma 2–3 meses en un programa intensivo o 1–4 años en un aprendizaje.',
    canonical: `${BASE}/es/blog/how-long-does-fire-alarm-training-take`,
    hreflangEn: `${BASE}/blog/how-long-does-fire-alarm-training-take`,
    hreflangEs: `${BASE}/es/blog/how-long-does-fire-alarm-training-take`,
  },
  {
    path: 'blog/fire-alarm-technician-vs-electrician-florida',
    title: 'Fire Alarm Technician vs Electrician in Florida | 2026 Guide | PowerTech Academy',
    description: 'Comparing fire alarm technician and electrician career paths in Florida — entry requirements, licensing timeline, and which is more accessible for career changers.',
    canonical: `${BASE}/blog/fire-alarm-technician-vs-electrician-florida`,
    hreflangEn: `${BASE}/blog/fire-alarm-technician-vs-electrician-florida`,
    hreflangEs: `${BASE}/es/blog/fire-alarm-technician-vs-electrician-florida`,
  },
  {
    path: 'es/blog/fire-alarm-technician-vs-electrician-florida',
    title: 'Técnico de Alarmas vs Electricista en Florida | Guía 2026 | PowerTech Academy',
    description: 'Comparando las carreras de técnico de alarmas y electricista en Florida — requisitos de entrada, plazos de licencia y cuál es más accesible.',
    canonical: `${BASE}/es/blog/fire-alarm-technician-vs-electrician-florida`,
    hreflangEn: `${BASE}/blog/fire-alarm-technician-vs-electrician-florida`,
    hreflangEs: `${BASE}/es/blog/fire-alarm-technician-vs-electrician-florida`,
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────

function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function inject(html, route) {
  const { title, description, canonical, hreflangEn, hreflangEs } = route;

  // title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);

  // description
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${esc(description)}" />`,
  );

  // canonical
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${esc(canonical)}" />`,
  );

  // hreflang en
  html = html.replace(
    /<link rel="alternate" hreflang="en"[^>]*>/,
    `<link rel="alternate" hreflang="en" href="${esc(hreflangEn)}" />`,
  );

  // hreflang es
  html = html.replace(
    /<link rel="alternate" hreflang="es"[^>]*>/,
    `<link rel="alternate" hreflang="es" href="${esc(hreflangEs)}" />`,
  );

  // x-default
  html = html.replace(
    /<link rel="alternate" hreflang="x-default"[^>]*>/,
    `<link rel="alternate" hreflang="x-default" href="${esc(hreflangEn)}" />`,
  );

  // og:url
  html = html.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${esc(canonical)}" />`,
  );

  // og:title
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${esc(title)}" />`,
  );

  // og:description
  html = html.replace(
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${esc(description)}" />`,
  );

  return html;
}

// ── main ─────────────────────────────────────────────────────────────────────

const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');
let count = 0;

for (const route of routes) {
  const html = inject(baseHtml, route);

  if (route.path === '') {
    // Root: overwrite dist/index.html in place
    writeFileSync(join(DIST, 'index.html'), html);
  } else {
    const dir = join(DIST, route.path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }

  console.log(`  ✓  /${route.path || ''}`);
  count++;
}

console.log(`\nPre-rendered ${count} routes → dist/`);
