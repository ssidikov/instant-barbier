// ═══════════════════════════════════════════════════════════════════════════
// SHARED ANIMATION VARIANTS — Framer Motion
// NEUTRALIZED: Animations disabled for performance
// ═══════════════════════════════════════════════════════════════════════════

import type { Variants } from 'framer-motion'

// Easing kept for compatibility but unused effectively
export const GOLDEN_EASE = [0.16, 1, 0.3, 1] as const

// ── Fade variants (Disabled) ──

export const fadeInUp: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 1, x: 0 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0 },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 1, x: 0 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0 },
  },
}

// ── Scale variants (Disabled) ──

export const scaleReveal: Variants = {
  hidden: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0 },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0 },
  },
}

// ── Container variants (Disabled delays) ──

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
}
