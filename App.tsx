/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { TechBackground } from './components/QuantumScene';
import { BentoGrid, MagneticButton } from './components/Diagrams';
import { CheckCircle2, Menu, X, ArrowRight, Star, ExternalLink, Zap } from 'lucide-react';

const TYPEFORM_LINK = "https://forms.gle/CUZ6WxNeXvYcVdkL7";

// --- Static Section Helper (Animation Removed) ---
const ParallaxSection = ({ 
  children, 
  className = "", 
  offset = 50,
  speed = 1 
}: { 
  children?: React.ReactNode, 
  className?: string, 
  offset?: number,
  speed?: number
}) => {
  // Simplified to a static div, ignoring offset/speed to remove animation effects
  return (
    <div className={className}>
      {children}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyClick = () => {
    window.open(TYPEFORM_LINK, '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-power-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-power-accent rounded-md flex items-center justify-center">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight">PowerTech <span className="text-power-muted font-normal">Academy</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <MagneticButton onClick={handleApplyClick}>
            Apply Now
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 right-0 bg-power-card border-b border-power-border p-6 flex flex-col gap-6 md:hidden"
        >
          <button 
            onClick={() => { setIsOpen(false); handleApplyClick(); }}
            className="w-full py-3 bg-power-accent rounded text-white font-bold"
          >
            Apply Now
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <TechBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-power-bg/50 to-power-bg pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div style={{ y: y1, opacity }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full border border-power-border bg-white/5 backdrop-blur-sm text-power-accent text-xs font-bold uppercase tracking-widest"
            >
                Admissions Open 2026
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
            >
                Become a <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Fire Alarm</span> <br/>
                <span className="text-power-accent">Technician</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl mx-auto text-lg md:text-xl text-power-muted mb-10 leading-relaxed"
            >
                Master the skills of Design, Supply, Installation, and Maintenance. 
                Join a high-demand industry and start a career with limitless growth.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-center"
            >
                <MagneticButton 
                    className="px-10 py-5 bg-power-accent text-white hover:bg-power-accentHover font-bold text-lg rounded-full flex items-center justify-center gap-2 transition-all"
                    onClick={() => window.open(TYPEFORM_LINK, '_blank')}
                >
                    Start Your Career <ArrowRight size={20} />
                </MagneticButton>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Benefits = () => {
    return (
        <section className="py-24 bg-power-bg relative overflow-hidden">
            <div className="container mx-auto px-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <ParallaxSection offset={-30}>
                        <h2 className="text-4xl font-bold mb-8">Great Job <span className="text-power-accent">Opportunities</span></h2>
                        <div className="space-y-6">
                            {[
                                "Join a high-growth employment sector with stable demand.",
                                "Comprehensive support for job placement after graduation.",
                                "Suitable for anyone interested in learning a technical skill.",
                                "Trusted by industry experts and major security firms."
                            ].map((item, i) => (
                                <div 
                                    key={i}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                                >
                                    <div className="mt-1 w-6 h-6 rounded-full bg-power-accent/20 flex items-center justify-center text-power-accent shrink-0">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <p className="text-lg text-gray-300">{item}</p>
                                </div>
                            ))}
                        </div>
                    </ParallaxSection>
                    
                    <div className="relative">
                        {/* Background glow moves slower for depth */}
                        <ParallaxSection offset={-50} className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-power-accent/20 blur-[100px] rounded-full opacity-20"></div>
                        </ParallaxSection>
                        
                        <ParallaxSection offset={40} className="relative z-10">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 pt-8">
                                    <div className="bg-power-card p-6 rounded-2xl border border-power-border h-48 flex flex-col justify-end">
                                        <div className="text-4xl font-bold text-white mb-1">94%</div>
                                        <div className="text-sm text-power-muted">Placement Rate</div>
                                    </div>
                                    <div className="bg-power-card p-6 rounded-2xl border border-power-border h-32 flex flex-col justify-end">
                                        <div className="text-xl font-bold text-white mb-1">Entry Level</div>
                                        <div className="text-sm text-power-muted">Accessible to all</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-power-card p-6 rounded-2xl border border-power-border h-32 flex flex-col justify-end">
                                        <div className="text-xl font-bold text-white mb-1">Certified</div>
                                        <div className="text-sm text-power-muted">Industry recognized</div>
                                    </div>
                                    <div className="bg-power-card p-6 rounded-2xl border border-power-border h-48 flex flex-col justify-end">
                                        <div className="text-4xl font-bold text-power-accent mb-1">$65k+</div>
                                        <div className="text-sm text-power-muted">Avg. Starting Potential</div>
                                    </div>
                                </div>
                            </div>
                        </ParallaxSection>
                    </div>
                 </div>
            </div>
        </section>
    );
}

const SocialProof = () => {
    return (
        <section className="py-20 border-y border-white/5 bg-black/40 overflow-hidden">
            <ParallaxSection offset={20}>
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm text-power-muted uppercase tracking-widest font-bold mb-10">Companies that trust our graduates</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder logos using text for demo */}
                        {['Securitas', 'ADT Commercial', 'Johnson Controls', 'Siemens', 'Honeywell'].map((brand, i) => (
                            <div key={i} className="text-2xl font-bold font-sans text-white hover:text-power-accent cursor-default transition-colors">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </ParallaxSection>
        </section>
    )
}

const EnrollmentCTA = () => {
    return (
        <section id="apply" className="py-32 bg-power-bg relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-power-accent/10 blur-[120px] rounded-full"></div>
             </div>

             <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
                <div className="bg-power-card border border-power-border rounded-3xl p-10 md:p-16 shadow-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Enroll?</h2>
                    <p className="text-xl text-power-muted mb-10 max-w-2xl mx-auto">
                        Secure your spot in the next cohort. Start your application today and take the first step towards a new career.
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <MagneticButton 
                            onClick={() => window.open(TYPEFORM_LINK, '_blank')}
                            className="px-10 py-5 bg-white text-black hover:bg-gray-200 font-bold text-lg rounded-full flex items-center justify-center gap-2 transition-all w-full md:w-auto"
                        >
                            Start Application <ExternalLink size={20} />
                        </MagneticButton>
                    </div>
                </div>
             </div>
        </section>
    );
}

const Footer = () => (
    <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold tracking-tight">PowerTech <span className="text-power-muted font-normal">Academy</span></div>
            <div className="text-power-muted text-sm">© 2024 PowerTech Academy. All rights reserved.</div>
            <div className="flex gap-6">
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
    </footer>
);

const App: React.FC = () => {
  return (
    <div className="bg-power-bg min-h-screen text-power-text selection:bg-power-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <Benefits />
        <SocialProof />
        <EnrollmentCTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;