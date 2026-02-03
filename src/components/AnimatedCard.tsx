'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

type AnimatedCardProps = {
  children: ReactNode
  className?: string
  delay?: number
  index?: number
}

/**
 * Composant carte avec animation au scroll et hover
 * Utilisé pour les grilles de services, galerie, équipe, etc.
 */
export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  index = 0,
}: AnimatedCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
        delay: delay + index * 0.1,
      },
    },
  }

  const hoverVariants = {
    scale: 1.03,
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`group relative ${className}`}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardVariants}
      whileHover={hoverVariants}>
      {/* Glow effect on hover */}
      <div className='absolute -inset-0.5 bg-gradient-to-r from-gold/30 via-gold/10 to-gold/30 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500' />

      {/* Content */}
      <div className='relative'>{children}</div>
    </motion.div>
  )
}
