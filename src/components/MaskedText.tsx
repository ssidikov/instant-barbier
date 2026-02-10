'use client'

import { motion } from 'framer-motion'
import { GOLDEN_EASE } from '@/lib/animations'

type MaskedTextProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

// Splitting text logic could be complex, assuming simple string or array of strings for now.
// For "editorial" look, we often want to animate line by line or character by character.
// Here we'll implement a simple line/block reveal.

export default function MaskedText({ children, className = '', delay = 0 }: MaskedTextProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{
          duration: 1.2,
          ease: GOLDEN_EASE,
          delay: delay,
        }}>
        {children}
      </motion.div>
    </div>
  )
}
