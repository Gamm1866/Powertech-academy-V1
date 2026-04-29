import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Header from '../../components/Header';

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Fire Alarm Technician Training — Florida',
  description:
    '40-hour hands-on fire alarm technician training program in Hollywood, FL. Covers NFPA 72 content, OSHA safety practices, EMT conduit, panel configuration, and Florida closeout procedures.',
  provider: {
    '@type': 'Organization',
    name: 'PowerTech Academy',
    sameAs: 'https://www.powertech.academy',
  },
  educationalCredentialAwarded: 'Certificate of Attendance',
  courseMode: ['blended', 'onsite'],
  availableLanguage: ['en', 'es'],
  timeToComplete: 'P90D',
  offers: {
    '@type': 'Offer',
    category: 'Paid',
    priceCurrency: 'USD',
    url: 'https://www.powertech.academy/fire-alarm-technician-training-florida',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'blended',
    location: {
      '@type': 'Place',
      name: 'PowerTech Academy — Hollywood FL',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3803 N 29th Ave, Suite B',
        addressLocality: 'Hollywood',
        addressRegion: 'FL',
        postalCode: '33020',
        addressCountry: 'US',
      },
    },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need prior experience to enroll in fire alarm technician training in Florida?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No prior experience is required. The PowerTech Academy program is designed for beginners 17 and older with no background in electrical or fire alarm systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'What certification do I earn after completing the program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upon completion, students receive a PowerTech Academy Certificate of Attendance. This credential documents completion of the 40-hour program covering NFPA 72 content and hands-on lab work.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long is the fire alarm technician training program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The program is designed to be completed in 2 to 3 months. It consists of 40 hours of instruction split across 5 modules, combining theory and hands-on lab work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is the training located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PowerTech Academy is located at 3803 N 29th Ave, Suite B, Hollywood, FL 33020 — in Broward County, serving students from Miami-Dade and South Florida.',
      },
    },
    {
      '@type': 'Question',
      name: 'What topics are covered in the fire alarm training program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The curriculum covers NFPA 72 fire alarm code content, OSHA safety practices using OSHA-certified equipment, EMT conduit installation, panel configuration, circuit wiring, and Florida closeout documentation procedures.',
      },
    },
  ],
};

const faqs = [
  {
    q: 'Do I need prior experience to enroll?',
    a: 'No prior experience is required. The program is open to anyone 17 and older — no electrical or fire alarm background needed.',
  },
  {
    q: 'What credential do I earn?',
    a: 'Upon completion you receive a PowerTech Academy Certificate of Attendance documenting your 40-hour training in fire alarm systems.',
  },
  {
    q: 'How long does the program take?',
    a: 'The program is designed to be completed in 2 to 3 months — 40 hours split across 5 hands-on modules.',
  },
  {
    q: 'Where is the school located?',
    a: '3803 N 29th Ave, Suite B, Hollywood, FL 33020 — Broward County, accessible from Miami-Dade and all of South Florida.',
  },
  {
    q: 'What topics are covered?',
    a: 'NFPA 72 code content, OSHA safety practices using OSHA-certified equipment, EMT conduit, panel configuration, circuit wiring, and Florida closeout procedures.',
  },
];

const modules = [
  { num: '01', title: 'Tools & Safety', desc: 'OSHA safety practices, personal protective equipment, and tool handling with OSHA-certified safety equipment.' },
  { num: '02', title: 'EMT Conduit', desc: 'Measuring, cutting, bending, and running EMT conduit to code.' },
  { num: '03', title: 'Wiring & Testing', desc: 'Circuit wiring standards, multimeter use, conductor sizing, and continuity testing.' },
  { num: '04', title: 'NFPA 72 & Panel Config', desc: 'Fire alarm code fundamentals, device placement, and control panel programming basics.' },
  { num: '05', title: 'Florida Closeout', desc: 'Documentation, inspection checklists, and Florida-specific closeout procedures.' },
];

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex justify-between items-center py-5 text-left text-white font-semibold text-base hover:text-[#FF4500] transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {q}
        <ChevronDown size={18} className={`shrink-0 ml-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="pb-5 text-gray-400 text-sm leading-relaxed">{a}</p>}
    </div>
  );
};

const TrainingFloridaPage: React.FC = () => (
  <>
    <Header />
    <Helmet>
      <title>Fire Alarm Technician Training Florida | PowerTech Academy</title>
      <meta
        name="description"
        content="Hands-on fire alarm technician training in Hollywood, FL. 40 hours, NFPA 72 content, OSHA safety practices, panel config. Certificate of Attendance. Broward County."
      />
      <link rel="canonical" href="https://www.powertech.academy/fire-alarm-technician-training-florida" />
      <link rel="alternate" hrefLang="en" href="https://www.powertech.academy/fire-alarm-technician-training-florida" />
      <link rel="alternate" hrefLang="x-default" href="https://www.powertech.academy/fire-alarm-technician-training-florida" />
      <meta property="og:title" content="Fire Alarm Technician Training Florida | PowerTech Academy" />
      <meta property="og:description" content="Hands-on fire alarm technician training in Hollywood, FL. 40 hours, NFPA 72 content, Certificate of Attendance." />
      <meta property="og:url" content="https://www.powertech.academy/fire-alarm-technician-training-florida" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.powertech.academy/og-image.png" />
      <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>

    {/* HERO */}
    <section className="bg-[#050505] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#FF4500] text-xs font-bold uppercase tracking-widest mb-4">Hollywood, FL — Broward County</p>
        <h1 className="text-5xl md:text-7xl font-bebas-neue font-bold text-white leading-tight mb-6">
          Fire Alarm Technician<br />
          <span className="text-[#FF4500]">Training in Florida</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          40-hour hands-on program covering NFPA 72 content, OSHA safety practices, panel configuration, and Florida closeout procedures.
          No prior experience required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/17864609020?text=Hi%2C%20I%27m%20interested%20in%20the%20fire%20alarm%20technician%20training%20in%20Florida"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FF4500] hover:bg-[#E63E00] text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            Apply via WhatsApp
          </a>
          <Link
            to="/advisory"
            className="inline-block border border-white/20 hover:border-white text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            Free Advisory Call
          </Link>
        </div>
      </div>
    </section>

    {/* STATS BAR */}
    <section className="bg-[#FF4500] py-6 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
        {[
          { val: '40', label: 'Training Hours' },
          { val: '5', label: 'Hands-On Modules' },
          { val: '2–3', label: 'Months to Complete' },
          { val: '17+', label: 'Minimum Age' },
        ].map(({ val, label }) => (
          <div key={label}>
            <div className="text-3xl font-bebas-neue font-bold">{val}</div>
            <div className="text-sm font-semibold opacity-90">{label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* CURRICULUM */}
    <section className="py-20 bg-[#0a0a0a] px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bebas-neue font-bold text-white text-center mb-4">
          Program Curriculum
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Five modules totaling 40 hours — 65% hands-on lab work, 35% theory.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <div key={m.num} className="border border-white/10 rounded-xl p-6 hover:border-[#FF4500]/40 transition-colors">
              <div className="text-[#FF4500] font-bebas-neue text-4xl font-bold mb-3">{m.num}</div>
              <h3 className="font-bold text-white mb-2">{m.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
          <div className="border border-gray-100 rounded-xl p-6 bg-[#050505] flex flex-col justify-center text-center">
            <div className="text-white font-bold text-lg mb-2">Certificate of Attendance</div>
            <p className="text-gray-400 text-sm">Awarded upon successful completion of the full 40-hour program.</p>
          </div>
        </div>
      </div>
    </section>

    {/* WHY POWERTECH */}
    <section className="py-20 bg-[#050505] px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bebas-neue font-bold text-white text-center mb-12">
          Why Train at PowerTech Academy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'No Experience Required', desc: 'The program is designed for complete beginners. No electrical background needed — just a willingness to learn.' },
            { title: 'Real Equipment, Real Labs', desc: 'Train on actual fire alarm panels, conduit, and wiring setups using OSHA-certified safety equipment — not simulations.' },
            { title: 'NFPA 72 Content', desc: 'Curriculum developed around NFPA 72 fire alarm code fundamentals, the industry standard for fire alarm systems in the U.S.' },
            { title: 'South Florida Location', desc: 'Located in Hollywood, FL — Broward County. Serving students from Miami-Dade, Fort Lauderdale, and all of South Florida.' },
            { title: 'Fast-Track Format', desc: '2 to 3 months to complete the full program. Designed to fit around your schedule without dragging on for years.' },
            { title: 'Career Guidance Included', desc: 'Career guidance resources and job search support are included for students who complete the program.' },
          ].map(({ title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-[#FF4500] mt-2 shrink-0" />
              <div>
                <h3 className="text-white font-bold mb-1">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20 bg-[#111111] px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bebas-neue font-bold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="py-20 bg-[#FF4500] px-6">
      <div className="max-w-3xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bebas-neue font-bold mb-4">
          Ready to Start Your Training?
        </h2>
        <p className="text-white/90 text-lg mb-10">
          Admissions open for 2026. Limited seats available. Apply in under 2 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/17864609020?text=Hi%2C%20I%27m%20ready%20to%20apply%20for%20fire%20alarm%20technician%20training"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#FF4500] px-10 py-4 rounded-lg font-bold text-lg transition-opacity hover:opacity-90"
          >
            Apply via WhatsApp
          </a>
          <Link
            to="/advisory"
            className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg transition-opacity hover:opacity-90"
          >
            Schedule Free Advisory
          </Link>
        </div>
        <div className="mt-8">
          <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default TrainingFloridaPage;
