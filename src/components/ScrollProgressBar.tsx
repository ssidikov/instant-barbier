'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin gold progress bar fixed at top of the page.
 * Tracks the user's scroll depth via Framer Motion useScroll.
 * Uses useSpring for a smooth, slightly-lagged feel (not mechanical).
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden='true'
      className='fixed top-0 left-0 right-0 z-999 origin-left pointer-events-none'
      style={{
        height: '2px',
        scaleX,
        background: 'linear-gradient(90deg, #AF9778 0%, #c8aa88 60%, #AF9778 100%)',
        boxShadow: '0 0 8px rgba(175,151,120,0.55)',
      }}
    />
  )
}
