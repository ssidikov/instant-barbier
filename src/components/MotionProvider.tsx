'use client'

import { LazyMotion, domAnimation } from 'framer-motion'

/**
 * Wraps the app in LazyMotion with domAnimation features.
 * This reduces the framer-motion bundle by ~35 KB gzipped because
 * only the animation features actually used are loaded (no drag, layout, etc.).
 *
 * Components use `m.div` instead of `motion.div` to benefit from this.
 * GalleryLightbox (which needs drag) loads domMax features separately.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
