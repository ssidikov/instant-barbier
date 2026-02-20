'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Page transition wrapper.
 *
 * Key behaviour:
 * - First load → NO opacity animation. Page appears instantly so that
 *   Reveal (IntersectionObserver + CSS) animations are visible immediately.
 * - Navigations → short fade + lift (0.3s). Fast enough not to feel sluggish,
 *   long enough to feel intentional.
 * - Reduced-motion → opacity only, no Y movement.
 */
let isFirstMount = true

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    isFirstMount = false
  }, [])

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial={isFirstMount ? false : shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
