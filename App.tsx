/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

const MainPage = lazy(() => import('./src/pages/MainPage'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const FAQPage = lazy(() => import('./src/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const HollywoodFlPage = lazy(() => import('./src/pages/HollywoodFlPage'));
const TrainingFloridaPage = lazy(() => import('./src/pages/TrainingFloridaPage'));
const WhatDoesATechnicianDo = lazy(() => import('./src/pages/blog/WhatDoesATechnicianDo'));
const HowLongTraining = lazy(() => import('./src/pages/blog/HowLongTraining'));
const FireAlarmVsElectrician = lazy(() => import('./src/pages/blog/FireAlarmVsElectrician'));
const Advisory = lazy(() => import('./src/pages/Advisory'));
const ThankYou = lazy(() => import('./src/pages/ThankYou'));
const BlogPage = lazy(() => import('./src/pages/BlogPage'));

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/es" element={<MainPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/es/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/es/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/hollywood-fl" element={<HollywoodFlPage />} />
          <Route path="/es/hollywood-fl" element={<HollywoodFlPage />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/es/advisory" element={<Advisory />} />
          <Route path="/fire-alarm-technician-training-florida" element={<TrainingFloridaPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/es/blog" element={<BlogPage />} />
          <Route path="/blog/what-does-a-fire-alarm-technician-do-florida" element={<WhatDoesATechnicianDo />} />
          <Route path="/blog/how-long-does-fire-alarm-training-take" element={<HowLongTraining />} />
          <Route path="/blog/fire-alarm-technician-vs-electrician-florida" element={<FireAlarmVsElectrician />} />
          <Route path="/gracias" element={<ThankYou />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
};

export default App;
