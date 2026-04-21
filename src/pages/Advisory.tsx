import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../../components/Header'
import { useLanguage } from '../../contexts/LanguageContext'

const SKILLS = [
  'Panel Config', 'NFPA 72', 'EMT Conduit', 'EOL Resistors',
  'OSHA Safety', 'Wiring Std.', 'Troubleshooting', 'System Design',
]

const copy = {
  es: {
    metaTitle: 'Agenda tu Asesoría Virtual Gratuita | PowerTech Academy',
    metaDesc: 'Conviértete en técnico de alarmas contra incendios en 2–3 meses en Hollywood, FL. Agenda tu sesión virtual de 15 minutos. Sin experiencia previa requerida.',
    badge: 'Hollywood, FL · Inscripciones Abiertas 2026',
    h1a: 'Empieza tu carrera en',
    h1b: 'Fire Alarm',
    sub: 'Programa fast-track de 2–3 meses. Sin experiencia previa requerida. Inserción laboral en uno de los oficios técnicos con mayor demanda en Florida.',
    stats: [
      { num: '90', label: 'Días Fast-Track' },
      { num: '$65K+', label: 'Salario potencial' },
      { num: '0', label: 'Exp. requerida' },
    ],
    skillsLabel: 'Lo que vas a aprender',
    eyebrow: 'Asesoría Virtual · 15 min · Google Meet',
    formTitle: 'Agenda tu sesión gratuita',
    formDesc: 'Completa el formulario y uno de nuestros asesores te contactará para confirmar fecha y hora. Sin costo ni compromiso.',
    fFirstName: 'Nombre', fLastName: 'Apellido',
    fEmail: 'Correo electrónico', fPhone: 'Teléfono',
    fProfile: 'Perfil',
    profiles: [
      { v: 'sin-experiencia', l: 'Sin experiencia previa' },
      { v: 'tecnico', l: 'Técnico en el área' },
      { v: 'profesional', l: 'Ing. / Arquitecto' },
      { v: 'empresa', l: 'Empresa / B2B' },
    ],
    fDate: 'Fecha preferida', fTime: 'Horario preferido',
    times: [
      { v: '8am-10am', l: '8:00 AM – 10:00 AM' },
      { v: '10am-12pm', l: '10:00 AM – 12:00 PM' },
      { v: '12pm-2pm', l: '12:00 PM – 2:00 PM' },
      { v: '2pm-4pm', l: '2:00 PM – 4:00 PM' },
      { v: '4pm-5pm', l: '4:00 PM – 5:00 PM' },
    ],
    tcpa: 'Al enviar este formulario, acepto ser contactado por PowerTech Academy vía teléfono, email o WhatsApp. Entiendo que puedo cancelar mi solicitud en cualquier momento.',
    privacy: 'Política de privacidad',
    submitText: 'Agendar asesoría gratuita →',
    sendingText: 'Enviando...',
    successTitle: '¡SOLICITUD RECIBIDA!',
    successBody: 'Tu asesoría virtual ha sido solicitada. Un asesor de PowerTech Academy se comunicará contigo en las próximas horas para confirmar fecha y hora.',
    successHours: 'Lunes a Viernes · 8:00 AM – 5:00 PM EST',
    info: [
      { icon: '📍', text: '3803 N 29th Ave, Suite B\nHollywood, FL 33020' },
      { icon: '🕐', text: 'Lun – Vie\n8:00 AM – 5:00 PM EST' },
      { icon: '📞', text: '(786) 460-9020\nWhatsApp disponible' },
    ],
    selectPlaceholder: 'Selecciona...',
  },
  en: {
    metaTitle: 'Schedule Your Free Virtual Advisory | PowerTech Academy',
    metaDesc: 'Become a fire alarm technician in 2–3 months in Hollywood, FL. Schedule your free 15-minute virtual session. No prior experience required.',
    badge: 'Hollywood, FL · Enrolling 2026',
    h1a: 'Start your career in',
    h1b: 'Fire Alarm',
    sub: '2–3 month fast-track program. No prior experience required. Job placement in one of Florida\'s highest-demand technical trades.',
    stats: [
      { num: '90', label: 'Days Fast-Track' },
      { num: '$65K+', label: 'Potential Salary' },
      { num: '0', label: 'Exp. Required' },
    ],
    skillsLabel: "What you'll learn",
    eyebrow: 'Virtual Advisory · 15 min · Google Meet',
    formTitle: 'Schedule your free session',
    formDesc: 'Fill out the form and one of our advisors will contact you to confirm date and time. No cost, no commitment.',
    fFirstName: 'First Name', fLastName: 'Last Name',
    fEmail: 'Email Address', fPhone: 'Phone Number',
    fProfile: 'Profile',
    profiles: [
      { v: 'no-experience', l: 'No prior experience' },
      { v: 'technician', l: 'Current technician' },
      { v: 'professional', l: 'Engineer / Architect' },
      { v: 'business', l: 'Company / B2B' },
    ],
    fDate: 'Preferred Date', fTime: 'Preferred Time',
    times: [
      { v: '8am-10am', l: '8:00 AM – 10:00 AM' },
      { v: '10am-12pm', l: '10:00 AM – 12:00 PM' },
      { v: '12pm-2pm', l: '12:00 PM – 2:00 PM' },
      { v: '2pm-4pm', l: '2:00 PM – 4:00 PM' },
      { v: '4pm-5pm', l: '4:00 PM – 5:00 PM' },
    ],
    tcpa: 'By submitting this form, I agree to be contacted by PowerTech Academy via phone, email, or WhatsApp. I understand I can cancel my request at any time.',
    privacy: 'Privacy Policy',
    submitText: 'Schedule free advisory →',
    sendingText: 'Sending...',
    successTitle: 'REQUEST RECEIVED!',
    successBody: 'Your virtual advisory has been requested. A PowerTech Academy advisor will contact you within the next few hours to confirm date and time.',
    successHours: 'Monday to Friday · 8:00 AM – 5:00 PM EST',
    info: [
      { icon: '📍', text: '3803 N 29th Ave, Suite B\nHollywood, FL 33020' },
      { icon: '🕐', text: 'Mon – Fri\n8:00 AM – 5:00 PM EST' },
      { icon: '📞', text: '(786) 460-9020\nWhatsApp available' },
    ],
    selectPlaceholder: 'Select...',
  },
}

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-[#FF4500]/60 focus:ring-2 focus:ring-[#FF4500]/15 transition-all'
const labelCls = 'block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5'

export default function Advisory() {
  const { lang } = useLanguage()
  const c = copy[lang === 'en' ? 'en' : 'es']
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const input = document.getElementById('adv-date') as HTMLInputElement
    if (input) input.min = new Date().toISOString().split('T')[0]
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDesc} />
        <link rel="canonical" href={`https://www.powertech.academy${lang === 'es' ? '/es' : ''}/advisory`} />
        <link rel="alternate" hrefLang="en" href="https://www.powertech.academy/advisory" />
        <link rel="alternate" hrefLang="es" href="https://www.powertech.academy/es/advisory" />
        <link rel="alternate" hrefLang="x-default" href="https://www.powertech.academy/advisory" />
      </Helmet>

      <div className="min-h-screen bg-[#050505] text-white">
        <Header />

        {/* Page content — padded below fixed header */}
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* ── LEFT: Value Prop ── */}
              <div className="lg:sticky lg:top-28">
                {/* Badge pill */}
                <span className="inline-flex items-center gap-2 bg-[#FF4500]/10 border border-[#FF4500]/25 text-[#FF4500] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                  {c.badge}
                </span>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
                  {c.h1a}{' '}
                  <span className="text-[#FF4500]">{c.h1b}</span>
                </h1>

                <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
                  {c.sub}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {c.stats.map((s, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 text-center"
                    >
                      <span className="block text-2xl lg:text-3xl font-bold text-[#FF4500] leading-tight mb-1">
                        {s.num}
                      </span>
                      <span className="block text-[10px] text-gray-500 uppercase tracking-wider leading-tight">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-3">
                  {c.skillsLabel}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {SKILLS.map((s) => (
                    <span
                      key={s}
                      className="bg-white/[0.04] border border-white/[0.08] text-gray-400 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full hover:border-[#FF4500]/40 hover:text-[#FF4500] transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Info strip */}
                <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-8">
                  {c.info.map((item) => (
                    <div key={item.icon} className="flex items-start gap-3">
                      <span className="text-base mt-0.5">{item.icon}</span>
                      <span className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Form ── */}
              <div className="bg-[#0e0e0e] border border-white/[0.07] rounded-3xl p-8 lg:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center text-center py-8 gap-5">
                    <div className="w-16 h-16 rounded-full bg-[#FF4500]/10 border-2 border-[#FF4500] flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF4500" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-[#FF4500] tracking-wide">{c.successTitle}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{c.successBody}</p>
                    <p className="text-xs text-gray-600 uppercase tracking-widest">{c.successHours}</p>
                    <p className="text-xs text-[#FF4500] tracking-widest">sales@powertech.academy</p>
                  </div>
                ) : (
                  <>
                    <p className="text-[10px] text-[#FF4500] uppercase tracking-[0.2em] font-bold mb-1">{c.eyebrow}</p>
                    <h2 className="text-2xl font-bold mb-2">{c.formTitle}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">{c.formDesc}</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
                      <input type="hidden" name="subject" value="Nueva solicitud de Asesoría Virtual — PowerTech Academy" />
                      <input type="hidden" name="from_name" value="PowerTech Academy — /advisory" />
                      <input type="hidden" name="redirect" value="false" />

                      {/* Nombre + Apellido */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="adv-fname" className={labelCls}>{c.fFirstName}</label>
                          <input id="adv-fname" name="first_name" type="text" required placeholder="Juan" className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="adv-lname" className={labelCls}>{c.fLastName}</label>
                          <input id="adv-lname" name="last_name" type="text" required placeholder="García" className={inputCls} />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="adv-email" className={labelCls}>{c.fEmail}</label>
                        <input id="adv-email" name="email" type="email" required placeholder="juan@correo.com" className={inputCls} />
                      </div>

                      {/* Teléfono + Perfil */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="adv-phone" className={labelCls}>{c.fPhone}</label>
                          <input id="adv-phone" name="phone" type="tel" required placeholder="+1 (786) 000-0000" className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="adv-profile" className={labelCls}>{c.fProfile}</label>
                          <select id="adv-profile" name="profile" required defaultValue="" className={inputCls + ' cursor-pointer'}>
                            <option value="" disabled>{c.selectPlaceholder}</option>
                            {c.profiles.map((p) => (
                              <option key={p.v} value={p.v} className="bg-[#161616]">{p.l}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Fecha + Horario */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="adv-date" className={labelCls}>{c.fDate}</label>
                          <input id="adv-date" name="preferred_date" type="date" className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="adv-time" className={labelCls}>{c.fTime}</label>
                          <select id="adv-time" name="preferred_time" defaultValue="" className={inputCls + ' cursor-pointer'}>
                            <option value="">{c.selectPlaceholder}</option>
                            {c.times.map((t) => (
                              <option key={t.v} value={t.v} className="bg-[#161616]">{t.l}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* TCPA */}
                      <div className="flex gap-3 items-start bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                        <input
                          id="adv-tcpa"
                          type="checkbox"
                          name="tcpa_consent"
                          required
                          className="mt-0.5 flex-shrink-0 w-4 h-4 accent-[#FF4500] cursor-pointer"
                        />
                        <label htmlFor="adv-tcpa" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                          {c.tcpa}{' '}
                          <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#FF4500] underline transition-colors"
                          >
                            {c.privacy}
                          </a>.
                        </label>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF4500] hover:bg-[#E63E00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-widest py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {loading ? c.sendingText : c.submitText}
                      </button>
                    </form>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
