/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Clock, GraduationCap, MapPin, CircuitBoard, UserCheck, Star } from 'lucide-react';

// --- MAGNETIC BUTTON ---
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { mass: 0.1, stiffness: 150, damping: 12 });
  const ySpring = useSpring(y, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Calculate distance from center, capped for subtlety
    const xVal = (e.clientX - centerX) * 0.3; 
    const yVal = (e.clientY - centerY) * 0.3;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const defaultClasses = "px-6 py-2.5 rounded-full font-medium transition-colors bg-white text-black hover:bg-gray-200 border border-transparent";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={className || defaultClasses}
      {...props as any} // Cast to any to avoid framer/react type conflict
    >
      {children}
    </motion.button>
  );
};

// --- BENTO GRID CARD ---
const BentoCard = ({ title, value, icon: Icon, subtitle, className, delay }: any) => {
    return (
        <div 
            className={`group relative overflow-hidden bg-power-card border border-power-border hover:border-power-accent/50 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(255,69,0,0.15)] ${className}`}
        >
            <div className="absolute top-0 right-0 p-6 text-power-border group-hover:text-power-accent/20 transition-colors duration-500">
                <Icon size={48} strokeWidth={1} />
            </div>
            
            <div className="relative z-10 mt-auto">
                <h3 className="text-power-muted text-sm font-bold uppercase tracking-wider mb-2">{title}</h3>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{value}</div>
                {subtitle && <p className="text-sm text-gray-500 font-medium group-hover:text-power-accent transition-colors">{subtitle}</p>}
            </div>

            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-power-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    )
}

// --- BENTO GRID SECTION ---
export const BentoGrid: React.FC = () => {
  return (
    <section id="program" className="py-24 px-6 bg-[#050505]">
      <div className="container mx-auto">
        <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Program <span className="text-power-accent">Details</span>
            </h2>
            <p className="text-gray-400 max-w-xl">Everything you need to know about your journey to becoming a certified technician.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 grid-rows-2">
            {/* Card 1: Duration */}
            <BentoCard 
                className="md:col-span-3 lg:col-span-4 h-full min-h-[240px]" 
                title="Duration" 
                value="2 - 3 Months" 
                subtitle="Fast-track intensive course"
                icon={Clock}
                delay={0}
            />

            {/* Card 2: Requirements */}
            <BentoCard 
                className="md:col-span-3 lg:col-span-4 h-full min-h-[240px]" 
                title="Prerequisites" 
                value="Age 17+" 
                subtitle="No prior experience needed"
                icon={UserCheck}
                delay={0.1}
            />

            {/* Card 3: Credential (Large) */}
            <BentoCard 
                className="md:col-span-6 lg:col-span-4 bg-zinc-900/50 h-full min-h-[240px]" 
                title="Certification" 
                value="Certificate of Attendance" 
                subtitle="Industry recognized credential upon completion"
                icon={GraduationCap}
                delay={0.2}
            />

             {/* Card 4: Location (Wide) */}
             <BentoCard 
                className="md:col-span-6 lg:col-span-8 h-full min-h-[240px]" 
                title="Campus Location" 
                value="Hollywood, FL" 
                subtitle="Broward County • Coming Soon: South Miami (Miami-Dade)"
                icon={MapPin}
                delay={0.3}
            />

             {/* Card 5: Scope */}
             <BentoCard 
                className="md:col-span-6 lg:col-span-4 h-full min-h-[240px]" 
                title="Curriculum" 
                value="System Design" 
                subtitle="Panel Configuration & Wiring Standards"
                icon={CircuitBoard}
                delay={0.4}
            />
        </div>
      </div>
    </section>
  );
};