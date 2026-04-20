import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

declare global {
  interface Window { gtag: (...args: unknown[]) => void; }
}

export default function ThankYou() {
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18072029178/PpzhCNz0up4cEPqPtalD',
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>¡Gracias! | PowerTech Academy</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-white font-['Bebas_Neue'] text-4xl tracking-wide mb-4">
            ¡Mensaje Recibido!
          </h1>
          <p className="text-gray-300 font-['Barlow'] text-lg mb-8">
            Un asesor de PowerTech Academy se comunicará contigo en menos de 24 horas.
          </p>
          <a
            href="/"
            className="inline-block bg-[#FF4500] text-white font-['Barlow_Condensed'] font-semibold text-lg px-8 py-3 rounded hover:bg-orange-600 transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </main>
    </>
  );
}
