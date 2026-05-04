import React from 'react';
import { Clock, GraduationCap, MapPin, CircuitBoard, UserCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

// --- BUTTON ---
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, ...props }) => {
  const defaultClasses = "px-6 py-2.5 rounded-full font-bold text-sm glass-btn-accent text-white";
  return (
    <button className={className || defaultClasses} {...props}>
      {children}
    </button>
  );
};

// --- BENTO GRID CARD ---
const BentoCard = ({ title, value, icon: Icon, subtitle, className, delay = 0 }: {
  title: string;
  value: string;
  icon: React.ElementType;
  subtitle?: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`group relative overflow-hidden glass-card-interactive rounded-3xl p-6 md:p-8 flex flex-col justify-between ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(22,22,22,0.75) 0%, rgba(14,14,14,0.85) 100%)',
      }}
    >
      {/* Top-left glass highlight streak */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
      />

      {/* Icon — white */}
      <div className="absolute top-5 right-5 text-white/50 group-hover:text-white transition-colors duration-400">
        <Icon size={44} strokeWidth={1} />
      </div>

      {/* Card content */}
      <div className="relative z-10 mt-auto">
        <h3 className="text-power-muted text-xs font-bold uppercase tracking-widest mb-2">{title}</h3>
        <div className="text-2xl md:text-3xl font-bold text-white mb-1.5">{value}</div>
        {subtitle && (
          <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
        )}
      </div>

      {/* Hover inner glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-power-accent/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

// --- BENTO GRID SECTION ---
export const BentoGrid: React.FC = () => {
  const { t } = useLanguage();
  const p = t.program;

  return (
    <section id="program" className="py-24 relative overflow-hidden" style={{ background: '#050505' }}>
      {/* Ambient glow behind cards so glass effect is visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255,69,0,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="power-grid">
        {/* Header — full 12 cols */}
        <div className="col-span-12 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {p.title} <span className="text-power-accent">{p.titleAccent}</span>
            </h2>
            <p className="text-gray-400 max-w-xl">{p.sub}</p>
          </motion.div>
        </div>

        {/* Bento grid — full 12 cols */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          <BentoCard
            className="md:col-span-3 lg:col-span-4 min-h-[240px]"
            title={p.duration}
            value={p.durationVal}
            subtitle={p.durationSub}
            icon={Clock}
            delay={0.1}
          />
          <BentoCard
            className="md:col-span-3 lg:col-span-4 min-h-[240px]"
            title={p.prereqs}
            value={p.prereqsVal}
            subtitle={p.prereqsSub}
            icon={UserCheck}
            delay={0.2}
          />
          <BentoCard
            className="md:col-span-6 lg:col-span-4 min-h-[240px]"
            title={p.cert}
            value={p.certVal}
            subtitle={p.certSub}
            icon={GraduationCap}
            delay={0.3}
          />
          <BentoCard
            className="md:col-span-6 lg:col-span-8 min-h-[240px]"
            title={p.location}
            value={p.locationVal}
            subtitle={p.locationSub}
            icon={MapPin}
            delay={0.4}
          />
          <BentoCard
            className="md:col-span-6 lg:col-span-4 min-h-[240px]"
            title={p.curriculum}
            value={p.curriculumVal}
            subtitle={p.curriculumSub}
            icon={CircuitBoard}
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};
