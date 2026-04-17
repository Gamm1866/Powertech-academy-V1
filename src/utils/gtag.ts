// Google Analytics 4 Event Tracking Utility
// Centralized event dispatch for PowerTech Academy CTAs

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

/**
 * Track CTA click: "Aplicar Ahora" button (Hero Section)
 */
export const trackApplyNowClick = () => {
  if (window.gtag) {
    window.gtag('event', 'apply_now_clicked', {
      event_category: 'cta_click',
      event_label: 'hero_apply_button',
      button_text: 'Aplicar Ahora',
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  }
  console.log('[GA4] Event tracked: apply_now_clicked');
};

/**
 * Track CTA click: "Inicia Tu Carrera" button (Hero Section)
 */
export const trackCareerStartClick = () => {
  if (window.gtag) {
    window.gtag('event', 'career_start_clicked', {
      event_category: 'cta_click',
      event_label: 'hero_career_start_button',
      button_text: 'Inicia Tu Carrera',
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  }
  console.log('[GA4] Event tracked: career_start_clicked');
};

/**
 * Track form submission: Enrollment form ("¿Listo para inscribirte?")
 */
export const trackEnrollmentFormSubmit = (formData?: {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
}) => {
  if (window.gtag) {
    window.gtag('event', 'enrollment_form_submitted', {
      event_category: 'form_submission',
      event_label: 'enrollment_form',
      form_name: 'enrollment_registration',
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
      // Omit PII; only track form completion
      form_completed: !!formData,
    });
  }
  console.log('[GA4] Event tracked: enrollment_form_submitted');
};

/**
 * Track WhatsApp button click
 */
export const trackWhatsAppClick = () => {
  if (window.gtag) {
    window.gtag('event', 'whatsapp_button_clicked', {
      event_category: 'contact_click',
      event_label: 'whatsapp_cta',
      contact_method: 'whatsapp',
      phone_number: '+1 (786) 460-9020',
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  }
  console.log('[GA4] Event tracked: whatsapp_button_clicked');
};

/**
 * Track contact form click/view
 */
export const trackContactFormView = () => {
  if (window.gtag) {
    window.gtag('event', 'contact_form_viewed', {
      event_category: 'form_interaction',
      event_label: 'contact_form_impression',
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  }
  console.log('[GA4] Event tracked: contact_form_viewed');
};

/**
 * Track page view (supplementary; GA4 tracks this automatically but useful for custom pages)
 */
export const trackPageView = (pageName: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  }
  console.log(`[GA4] Page view tracked: ${pageName}`);
};

/**
 * Track custom event for landing page conversions (future expansion)
 */
export const trackCustomConversion = (
  conversionName: string,
  conversionData?: Record<string, any>
) => {
  if (window.gtag) {
    window.gtag('event', conversionName, {
      event_category: 'custom_conversion',
      ...conversionData,
      timestamp: new Date().toISOString(),
    });
  }
  console.log(`[GA4] Custom event tracked: ${conversionName}`);
};
