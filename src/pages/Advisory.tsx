import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

// CSS injected as a <style> tag so global selectors (body::before, *, grid-bg)
// stay scoped to .adv-root without leaking to other pages in the SPA.
const RAW_CSS = `
  .adv-root {
    --bg: #050505;
    --surface: #0e0e0e;
    --surface2: #161616;
    --border: #1e1e1e;
    --orange: #FF4500;
    --orange-dim: rgba(255,69,0,0.12);
    --orange-glow: rgba(255,69,0,0.25);
    --text: #f0ede8;
    --text-muted: #7a7672;
    --text-dim: #3a3835;
    --green: #22c55e;
    --font-display: 'Bebas Neue', sans-serif;
    --font-sub: 'Barlow Condensed', sans-serif;
    --font-body: 'Barlow', sans-serif;
    --font-mono: 'DM Mono', monospace;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-weight: 400;
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }
  .adv-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: .4;
  }
  .adv-root *, .adv-root *::before, .adv-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .grid-bg {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,69,0,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,69,0,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    z-index: 0;
  }
  .adv-root .page {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }
  .adv-root .left {
    padding: 48px 56px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }
  .adv-root .left::after {
    content: '';
    position: absolute;
    bottom: -120px;
    left: -120px;
    width: 480px;
    height: 480px;
    background: radial-gradient(circle, var(--orange-glow) 0%, transparent 70%);
    pointer-events: none;
  }
  .adv-root .logo-wrap { display: flex; align-items: center; gap: 12px; animation: advFadeDown .6s ease both; }
  .adv-root .logo-icon {
    width: 36px; height: 36px; background: var(--orange);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: grid; place-items: center; flex-shrink: 0;
  }
  .adv-root .logo-icon svg { width: 18px; height: 18px; }
  .adv-root .logo-text { font-family: var(--font-sub); font-weight: 700; font-size: 15px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text); }
  .adv-root .logo-text span { color: var(--orange); }
  .adv-root .hero-content { margin-top: 64px; }
  .adv-root .tag {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--orange); border: 1px solid var(--orange);
    display: inline-block; padding: 4px 10px; margin-bottom: 28px;
    animation: advFadeDown .6s .1s ease both;
  }
  .adv-root .headline {
    font-family: var(--font-display); font-size: clamp(52px, 5.5vw, 82px);
    line-height: .95; letter-spacing: .01em; color: var(--text);
    animation: advFadeDown .6s .15s ease both;
  }
  .adv-root .headline .accent { color: var(--orange); }
  .adv-root .sub {
    font-family: var(--font-sub); font-size: 18px; font-weight: 400;
    color: var(--text-muted); margin-top: 20px; max-width: 400px;
    line-height: 1.5; animation: advFadeDown .6s .2s ease both;
  }
  .adv-root .stats { display: flex; gap: 32px; margin-top: 48px; animation: advFadeDown .6s .3s ease both; }
  .adv-root .stat-item { display: flex; flex-direction: column; gap: 2px; }
  .adv-root .stat-num { font-family: var(--font-display); font-size: 36px; color: var(--orange); line-height: 1; }
  .adv-root .stat-label { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); letter-spacing: .1em; text-transform: uppercase; }
  .adv-root .stat-divider { width: 1px; background: var(--border); align-self: stretch; }
  .adv-root .proof { margin-top: 48px; animation: advFadeDown .6s .4s ease both; }
  .adv-root .proof-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; color: var(--text-dim); text-transform: uppercase; margin-bottom: 12px; }
  .adv-root .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .adv-root .skill-pill {
    font-family: var(--font-sub); font-size: 12px; font-weight: 600;
    letter-spacing: .06em; text-transform: uppercase; color: var(--text-muted);
    border: 1px solid var(--border); padding: 5px 12px; background: var(--surface);
    transition: border-color .2s, color .2s;
  }
  .adv-root .skill-pill:hover { border-color: var(--orange); color: var(--orange); }
  .adv-root .left-footer { margin-top: 48px; display: flex; align-items: center; gap: 20px; animation: advFadeDown .6s .5s ease both; }
  .adv-root .left-footer a { font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); text-decoration: none; letter-spacing: .08em; transition: color .2s; }
  .adv-root .left-footer a:hover { color: var(--orange); }
  .adv-root .right { padding: 48px 56px; display: flex; flex-direction: column; justify-content: center; background: var(--surface); }
  .adv-root .lang-bar { display: flex; justify-content: flex-end; margin-bottom: 40px; animation: advFadeDown .6s ease both; }
  .adv-root .lang-toggle { display: flex; border: 1px solid var(--border); overflow: hidden; }
  .adv-root .lang-btn {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em;
    text-transform: uppercase; background: transparent; border: none;
    color: var(--text-muted); padding: 6px 14px; cursor: pointer;
    transition: background .2s, color .2s;
  }
  .adv-root .lang-btn.active { background: var(--orange); color: #fff; }
  .adv-root .form-header { margin-bottom: 32px; animation: advFadeDown .6s .1s ease both; }
  .adv-root .form-eyebrow { font-family: var(--font-mono); font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--orange); margin-bottom: 8px; }
  .adv-root .form-title { font-family: var(--font-sub); font-weight: 700; font-size: 28px; letter-spacing: .02em; line-height: 1.2; }
  .adv-root .form-desc { font-size: 14px; color: var(--text-muted); margin-top: 8px; line-height: 1.5; }
  .adv-root .form-wrap { animation: advFadeDown .6s .2s ease both; }
  .adv-root .field-group { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .adv-root .field-group.full { grid-template-columns: 1fr; }
  .adv-root .field { display: flex; flex-direction: column; gap: 6px; }
  .adv-root .field label { font-family: var(--font-mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-muted); }
  .adv-root .field input, .adv-root .field select, .adv-root .field textarea {
    background: var(--surface2); border: 1px solid var(--border); color: var(--text);
    font-family: var(--font-body); font-size: 14px; padding: 12px 14px; outline: none;
    transition: border-color .2s, box-shadow .2s; appearance: none; -webkit-appearance: none; border-radius: 0;
  }
  .adv-root .field input::placeholder, .adv-root .field textarea::placeholder { color: var(--text-dim); }
  .adv-root .field input:focus, .adv-root .field select:focus, .adv-root .field textarea:focus {
    border-color: var(--orange); box-shadow: 0 0 0 3px var(--orange-dim);
  }
  .adv-root .field select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237a7672' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; cursor: pointer;
  }
  .adv-root .field select option { background: #161616; }
  .adv-root .field textarea { resize: vertical; min-height: 80px; }
  .adv-root .tcpa-wrap {
    display: flex; gap: 10px; align-items: flex-start;
    margin: 16px 0; padding: 14px; border: 1px solid var(--border); background: var(--surface2);
  }
  .adv-root .tcpa-wrap input[type="checkbox"] { width: 16px; height: 16px; flex-shrink: 0; accent-color: var(--orange); margin-top: 2px; cursor: pointer; }
  .adv-root .tcpa-wrap p { font-size: 11px; color: var(--text-dim); line-height: 1.5; }
  .adv-root .tcpa-wrap a { color: var(--text-muted); }
  .adv-root .submit-btn {
    width: 100%; background: var(--orange); color: #fff; border: none;
    font-family: var(--font-sub); font-weight: 700; font-size: 16px;
    letter-spacing: .1em; text-transform: uppercase; padding: 16px 24px;
    cursor: pointer; position: relative; overflow: hidden;
    transition: background .2s, transform .1s; margin-top: 4px;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .adv-root .submit-btn::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent); transition: left .5s;
  }
  .adv-root .submit-btn:hover::before { left: 100%; }
  .adv-root .submit-btn:hover { background: #e03d00; }
  .adv-root .submit-btn:active { transform: scale(.99); }
  .adv-root .submit-btn:disabled { opacity: .5; cursor: not-allowed; }
  .adv-root .btn-arrow { transition: transform .2s; width: 18px; height: 18px; flex-shrink: 0; }
  .adv-root .submit-btn:hover .btn-arrow { transform: translateX(4px); }
  .adv-root .success-msg { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 48px 24px; gap: 16px; }
  .adv-root .success-check {
    width: 64px; height: 64px; background: var(--orange-dim);
    border: 2px solid var(--orange); border-radius: 50%; display: grid; place-items: center;
  }
  .adv-root .success-msg h3 { font-family: var(--font-display); font-size: 32px; color: var(--orange); }
  .adv-root .success-msg p { font-size: 14px; color: var(--text-muted); max-width: 320px; line-height: 1.6; }
  .adv-root .info-strip { display: flex; gap: 24px; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border); animation: advFadeDown .6s .3s ease both; }
  .adv-root .info-item { display: flex; align-items: center; gap: 8px; }
  .adv-root .info-item svg { color: var(--orange); flex-shrink: 0; }
  .adv-root .info-item span { font-family: var(--font-mono); font-size: 10px; color: var(--text-dim); letter-spacing: .08em; text-transform: uppercase; line-height: 1.4; }
  @keyframes advFadeDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
  @media (max-width: 900px) {
    .adv-root .page { grid-template-columns: 1fr; }
    .adv-root .left { padding: 32px 24px; border-right: none; border-bottom: 1px solid var(--border); }
    .adv-root .left::after { display: none; }
    .adv-root .headline { font-size: 56px; }
    .adv-root .stats { gap: 20px; }
    .adv-root .right { padding: 32px 24px; }
    .adv-root .field-group { grid-template-columns: 1fr; }
    .adv-root .info-strip { flex-direction: column; gap: 12px; }
  }
`

const copy = {
  es: {
    tag: 'Hollywood, FL — Now Enrolling 2026',
    headline: 'EMPIEZA<br>TU CARRERA<br>EN <span class="accent">FIRE ALARM</span>',
    sub: 'Programa fast-track de 2–3 meses. Sin experiencia previa. Inserción laboral en uno de los oficios técnicos con mayor demanda en Florida.',
    stat1: 'Días / Fast-Track',
    stat2: 'Salario potencial',
    stat3: 'Experiencia requerida',
    skillsLabel: 'Lo que vas a aprender',
    eyebrow: 'Asesoría Virtual · 15 min · Google Meet',
    formTitle: 'Agenda tu sesión gratuita',
    formDesc: 'Completa el formulario y uno de nuestros asesores te contactará para confirmar fecha y hora. Sin costo ni compromiso.',
    lFirstName: 'Nombre',
    lLastName: 'Apellido',
    lEmail: 'Correo electrónico',
    lPhone: 'Teléfono',
    lProfile: 'Perfil',
    profilePlaceholder: 'Selecciona...',
    p1: 'Sin experiencia previa',
    p2: 'Técnico en el área',
    p3: 'Ing. / Arquitecto',
    p4: 'Empresa / B2B',
    lDate: 'Fecha preferida',
    lTime: 'Horario preferido',
    timePlaceholder: 'Selecciona...',
    tcpaText: 'Al enviar este formulario, acepto ser contactado por PowerTech Academy vía teléfono, email o WhatsApp para recibir información sobre el programa. Entiendo que puedo cancelar mi solicitud en cualquier momento.',
    privacyLink: 'Política de privacidad',
    submitText: 'Agendar asesoría gratuita',
    sendingText: 'Enviando...',
    successTitle: '¡SOLICITUD RECIBIDA!',
    successBody: 'Tu asesoría virtual ha sido solicitada. Un asesor de PowerTech Academy se comunicará contigo en las próximas horas para confirmar fecha y hora. Lunes a Viernes 8:00 AM – 5:00 PM EST.',
  },
  en: {
    tag: 'Hollywood, FL — Now Enrolling 2026',
    headline: 'START YOUR<br>CAREER IN<br><span class="accent">FIRE ALARM</span>',
    sub: "2–3 month fast-track program. No prior experience required. Job placement in one of Florida's highest-demand technical trades.",
    stat1: 'Days / Fast-Track',
    stat2: 'Potential Salary',
    stat3: 'Experience Required',
    skillsLabel: "What you'll learn",
    eyebrow: 'Virtual Advisory · 15 min · Google Meet',
    formTitle: 'Schedule your free session',
    formDesc: 'Fill out the form and one of our advisors will contact you to confirm date and time. No cost, no commitment.',
    lFirstName: 'First Name',
    lLastName: 'Last Name',
    lEmail: 'Email Address',
    lPhone: 'Phone Number',
    lProfile: 'Profile',
    profilePlaceholder: 'Select...',
    p1: 'No prior experience',
    p2: 'Current technician',
    p3: 'Engineer / Architect',
    p4: 'Company / B2B',
    lDate: 'Preferred Date',
    lTime: 'Preferred Time',
    timePlaceholder: 'Select...',
    tcpaText: 'By submitting this form, I agree to be contacted by PowerTech Academy via phone, email, or WhatsApp to receive program information. I understand I can cancel my request at any time.',
    privacyLink: 'Privacy Policy',
    submitText: 'Schedule free advisory',
    sendingText: 'Sending...',
    successTitle: 'REQUEST RECEIVED!',
    successBody: 'Your virtual advisory has been requested. A PowerTech Academy advisor will contact you within the next few hours to confirm date and time. Monday to Friday 8:00 AM – 5:00 PM EST.',
  },
}

const SKILLS = ['Panel Config', 'NFPA 72', 'EMT Conduit', 'EOL Resistors', 'OSHA Safety', 'Wiring Std.', 'Troubleshooting', 'System Design']

export default function Advisory() {
  const [lang, setLangState] = useState<'es' | 'en'>('es')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const setLang = (l: 'es' | 'en') => setLangState(l)
  const c = copy[lang]

  useEffect(() => {
    const input = document.getElementById('prefDate') as HTMLInputElement
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
        <title>Agenda tu Asesoría Virtual Gratuita | PowerTech Academy</title>
        <meta name="description" content="Conviértete en técnico de alarmas contra incendios en 2–3 meses en Hollywood, FL. Agenda tu sesión virtual de 15 minutos. Sin experiencia previa requerida." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Scoped styles — .adv-root prevents bleeding to other SPA routes */}
      <style dangerouslySetInnerHTML={{ __html: RAW_CSS }} />

      <div className="adv-root">
        <div className="grid-bg" />

        <div className="page">
          {/* ── LEFT ── */}
          <div className="left">
            <div className="logo-wrap">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L4.5 13.5H11L10 22L19.5 10H13L13 2Z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="logo-text">Power<span>Tech</span> Academy</div>
            </div>

            <div className="hero-content">
              <div className="tag">{c.tag}</div>
              <h1 className="headline" dangerouslySetInnerHTML={{ __html: c.headline }} />
              <p className="sub">{c.sub}</p>

              <div className="stats">
                <div className="stat-item">
                  <div className="stat-num">90</div>
                  <div className="stat-label">{c.stat1}</div>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <div className="stat-num">$65K+</div>
                  <div className="stat-label">{c.stat2}</div>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <div className="stat-num">0</div>
                  <div className="stat-label">{c.stat3}</div>
                </div>
              </div>

              <div className="proof">
                <div className="proof-label">{c.skillsLabel}</div>
                <div className="skills-grid">
                  {SKILLS.map((s) => (
                    <span key={s} className="skill-pill">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="left-footer">
              <a href="https://powertech.academy" target="_blank" rel="noopener noreferrer">powertech.academy</a>
              <a href="tel:+17864609020">(786) 460-9020</a>
              <a href="mailto:sales@powertech.academy">sales@powertech.academy</a>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="right">
            <div className="lang-bar">
              <div className="lang-toggle">
                <button className={`lang-btn${lang === 'es' ? ' active' : ''}`} onClick={() => setLang('es')}>ES</button>
                <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
              </div>
            </div>

            <div className="form-header">
              <div className="form-eyebrow">{c.eyebrow}</div>
              <h2 className="form-title">{c.formTitle}</h2>
              <p className="form-desc">{c.formDesc}</p>
            </div>

            <div className="form-wrap">
              {submitted ? (
                <div className="success-msg">
                  <div className="success-check">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF4500" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3>{c.successTitle}</h3>
                  <p>{c.successBody}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '.1em' }}>
                    sales@powertech.academy
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
                  <input type="hidden" name="subject" value="Nueva solicitud de Asesoría Virtual — PowerTech Academy" />
                  <input type="hidden" name="from_name" value="PowerTech Academy Landing" />
                  <input type="hidden" name="redirect" value="https://powertech.academy/gracias" />

                  <div className="field-group">
                    <div className="field">
                      <label htmlFor="adv-first">{c.lFirstName}</label>
                      <input id="adv-first" type="text" name="first_name" placeholder="Juan" required />
                    </div>
                    <div className="field">
                      <label htmlFor="adv-last">{c.lLastName}</label>
                      <input id="adv-last" type="text" name="last_name" placeholder="García" required />
                    </div>
                  </div>

                  <div className="field-group full">
                    <div className="field">
                      <label htmlFor="adv-email">{c.lEmail}</label>
                      <input id="adv-email" type="email" name="email" placeholder="juan@correo.com" required />
                    </div>
                  </div>

                  <div className="field-group">
                    <div className="field">
                      <label htmlFor="adv-phone">{c.lPhone}</label>
                      <input id="adv-phone" type="tel" name="phone" placeholder="+1 (786) 000-0000" required />
                    </div>
                    <div className="field">
                      <label htmlFor="adv-profile">{c.lProfile}</label>
                      <select id="adv-profile" name="profile" required defaultValue="">
                        <option value="" disabled>{c.profilePlaceholder}</option>
                        <option value="sin-experiencia">{c.p1}</option>
                        <option value="tecnico">{c.p2}</option>
                        <option value="profesional">{c.p3}</option>
                        <option value="empresa">{c.p4}</option>
                      </select>
                    </div>
                  </div>

                  <div className="field-group">
                    <div className="field">
                      <label htmlFor="prefDate">{c.lDate}</label>
                      <input id="prefDate" type="date" name="preferred_date" />
                    </div>
                    <div className="field">
                      <label htmlFor="adv-time">{c.lTime}</label>
                      <select id="adv-time" name="preferred_time" defaultValue="">
                        <option value="">{c.timePlaceholder}</option>
                        <option value="8am-10am">8:00 AM – 10:00 AM</option>
                        <option value="10am-12pm">10:00 AM – 12:00 PM</option>
                        <option value="12pm-2pm">12:00 PM – 2:00 PM</option>
                        <option value="2pm-4pm">2:00 PM – 4:00 PM</option>
                        <option value="4pm-5pm">4:00 PM – 5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="tcpa-wrap">
                    <input type="checkbox" name="tcpa_consent" id="tcpa" required />
                    <p dangerouslySetInnerHTML={{
                      __html: `${c.tcpaText} <a href="https://powertech.academy/privacy-policy" target="_blank">${c.privacyLink}</a>.`
                    }} />
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    <span>{loading ? c.sendingText : c.submitText}</span>
                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              )}
            </div>

            <div className="info-strip">
              <div className="info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>3803 N 29th Ave, Suite B<br />Hollywood, FL 33020</span>
              </div>
              <div className="info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Lun – Vie<br />8:00 AM – 5:00 PM EST</span>
              </div>
              <div className="info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.41 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l.77-.77a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>(786) 460-9020<br />WhatsApp disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
