'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
  animate?: boolean
  animationType?: 'fade-up' | 'fade-in' | 'scale'
  delay?: number
}

export default function Section({
  children,
  className = '',
  id,
  animate = false,
  animationType = 'fade-up',
  delay = 0,
}: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' as const, delay },
      },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: 'easeOut' as const, delay },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: 'easeOut' as const, delay },
      },
    },
  }

  if (!animate) {
    return (
      <section id={id} className={`py-24 ${className}`}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-24 ${className}`}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[animationType]}>
      {children}
    </motion.section>
  )
}
