'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { TYPOGRAPHY } from '@/styles/typography'

type AnimatedHeadingProps = {
  children: ReactNode
  level?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
  centered?: boolean
}

/**
 * Composant titre animé avec effet de révélation progressive
 */
export default function AnimatedHeading({
  children,
  level = 'h2',
  className = '',
  delay = 0,
  centered = false,
}: AnimatedHeadingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const Tag = level

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
        delay,
      },
    },
  }

  const underlineVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
        delay: delay + 0.3,
      },
    },
  }

  const typographyClasses = {
    h1: TYPOGRAPHY.h1,
    h2: TYPOGRAPHY.h2,
    h3: TYPOGRAPHY.h2, // Utiliser h2 si h3 n'existe pas
  }

  return (
    <div className={`relative ${centered ? 'text-center' : ''}`}>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        variants={headingVariants}>
        <Tag className={`${typographyClasses[level]} ${className}`}>{children}</Tag>
      </motion.div>

      {/* Decorative underline */}
      <motion.div
        className={`h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mt-6 ${centered ? 'mx-auto w-32' : 'w-24'}`}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        variants={underlineVariants}
        style={{ originX: centered ? 0.5 : 0 }}
      />
    </div>
  )
}
