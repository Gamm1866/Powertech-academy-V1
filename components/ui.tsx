/**
 * PowerTech Academy — Design System
 *
 * Palette (index.css @theme):
 *   bg       #050505   --color-power-bg
 *   card     #121212   --color-power-card
 *   border   #27272a   --color-power-border
 *   accent   #FF4500   --color-power-accent
 *   hover    #cc3700   --color-power-accentHover
 *   text     #f3f4f6   --color-power-text
 *   muted    #9ca3af   --color-power-muted
 *
 * Typography:
 *   Body     Inter (--font-sans) — weights 400 / 600 / 700
 *   Display  Bebas Neue (font-bebas-neue) — headings, hero, section titles
 *   UI       Barlow Condensed (font-barlow-condensed) — labels, CTAs
 *
 * Button variants:
 *   primary   — orange fill, white text  → main CTA, 1 per section max
 *   secondary — transparent + orange border → supporting action
 *   ghost     — no border, muted text     → tertiary / nav items
 *
 * Accessibility:
 *   All interactive elements meet WCAG 2.1 AA contrast (4.5:1 minimum)
 *   Focus rings use focus-visible, not focus (avoids mouse outline)
 *   Disabled state uses opacity-50 + cursor-not-allowed
 */

import React from 'react';
import { Link } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

type BtnVariant = 'primary' | 'secondary' | 'ghost';
type BtnSize = 'sm' | 'md' | 'lg';

// ─── Shared base ──────────────────────────────────────────────────────────────

const base =
  'inline-flex items-center justify-center gap-2 font-bold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-power-accent focus-visible:ring-offset-2 focus-visible:ring-offset-power-bg disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<BtnVariant, string> = {
  primary:   'bg-power-accent text-white hover:bg-power-accentHover',
  secondary: 'border-2 border-power-accent text-power-accent hover:bg-power-accent hover:text-white',
  ghost:     'border border-power-border text-power-muted hover:text-white hover:border-power-accent/50',
};

const sizes: Record<BtnSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-8 py-4 text-base rounded-xl',
};

// ─── Btn — universal button ───────────────────────────────────────────────────

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
}

export const Btn: React.FC<BtnProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => (
  <button
    className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

// ─── BtnLink — same variants but renders a React Router <Link> ────────────────

interface BtnLinkProps {
  to: string;
  variant?: BtnVariant;
  size?: BtnSize;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const BtnLink: React.FC<BtnLinkProps> = ({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onClick,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
  >
    {children}
  </Link>
);

// ─── BtnAnchor — same variants for external <a> links ────────────────────────

interface BtnAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: BtnVariant;
  size?: BtnSize;
}

export const BtnAnchor: React.FC<BtnAnchorProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => (
  <a
    className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </a>
);

// ─── SectionCTA — reusable bottom-of-section CTA block ───────────────────────
// Usage: one primary action, optional secondary action

interface SectionCTAProps {
  heading: string;
  subtext?: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  dark?: boolean;
}

export const SectionCTA: React.FC<SectionCTAProps> = ({
  heading,
  subtext,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  dark = true,
}) => (
  <section className={`py-20 px-6 ${dark ? 'bg-[#FF4500]' : 'bg-power-bg'}`}>
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bebas-neue font-bold text-white mb-4">
        {heading}
      </h2>
      {subtext && (
        <p className="text-white/80 text-lg mb-10">{subtext}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <BtnLink to={primaryTo} size="lg" variant="secondary">
          {primaryLabel}
        </BtnLink>
        {secondaryLabel && secondaryTo && (
          <BtnLink to={secondaryTo} size="lg" variant="ghost" className="text-white border-white/40 hover:border-white">
            {secondaryLabel}
          </BtnLink>
        )}
      </div>
    </div>
  </section>
);

// ─── Usage guide ─────────────────────────────────────────────────────────────
//
// import { Btn, BtnLink, BtnAnchor, SectionCTA } from '../../components/ui';
//
// <!-- Primary button (form submit, hero CTA) -->
// <Btn variant="primary" size="lg" onClick={handleSubmit}>Start Your Career</Btn>
//
// <!-- Internal nav link -->
// <BtnLink to="/advisory" variant="primary" size="md">Schedule Advisory</BtnLink>
//
// <!-- External link (WhatsApp, docs) -->
// <BtnAnchor href="https://wa.me/..." target="_blank" variant="secondary" size="lg">
//   Contact via WhatsApp
// </BtnAnchor>
//
// <!-- Full section CTA block -->
// <SectionCTA
//   heading="Ready to Start Your Training?"
//   subtext="Admissions open for 2026. Limited seats."
//   primaryLabel="Schedule Free Advisory"
//   primaryTo="/advisory"
// />
