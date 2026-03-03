'use client'

import { m, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  children: string
  className?: string
  variant?: 'word' | 'char' | 'line'
  delay?: number
  duration?: number
  stagger?: number
}

export default function TextReveal({
  children,
  className = '',
  variant = 'word',
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  const words = children.split(' ')
  const chars = children.split('')

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  }

  // Removed `filter: blur()` entirely. While it creates a premium effect on desktop,
  // applying `filter: blur(0px)` on mobile Safari/Chrome often leaves the text permanently
  // fuzzy or breaks sub-pixel anti-aliasing. Now relies on a clean fade and y-translate.
  // Clean, native-feeling easing curve (easeOutQuint) that is hardware accelerated.
  // We explicitly avoid spring physics here as calculating physics for dozens of
  // words simultaneously drops framerates. This guarantees a smooth 60fps premium feel.
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1], // premium smooth deceleration
      },
    },
    hidden: {
      opacity: 0,
      y: 30, // Slightly stronger drop for better reveal drama
      transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  if (variant === 'char') {
    return (
      <m.p
        ref={ref}
        className={className}
        variants={container}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}>
        {chars.map((char, index) => (
          <m.span
            key={index}
            variants={child}
            className='inline-block'
            style={{ willChange: 'opacity, transform' }}>
            {char === ' ' ? '\u00A0' : char}
          </m.span>
        ))}
      </m.p>
    )
  }

  return (
    <m.p
      ref={ref}
      className={`${className} flex flex-wrap`}
      variants={container}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}>
      {words.map((word, index) => (
        <m.span
          key={index}
          variants={child}
          className='mr-[0.25em] inline-block'
          style={{ willChange: 'opacity, transform' }}>
          {word}
        </m.span>
      ))}
    </m.p>
  )
}
