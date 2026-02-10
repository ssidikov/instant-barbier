// ═══════════════════════════════════════════════════════════════════════════
// SHARED ANIMATION VARIANTS — Framer Motion
// Single source of truth for all page animations
// ═══════════════════════════════════════════════════════════════════════════

import type { Variants } from 'framer-motion'

// "Editorial" Easing - Heavy, confident, luxurious
// Ideally: [0.16, 1, 0.3, 1]
export const GOLDEN_EASE = [0.16, 1, 0.3, 1] as const

// ── Fade variants ──

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: GOLDEN_EASE },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: GOLDEN_EASE },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: GOLDEN_EASE },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: GOLDEN_EASE },
  },
}

// ── Scale variants ──

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: GOLDEN_EASE },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: GOLDEN_EASE },
  },
}

// ── Container variants (for staggered children) ──

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}
