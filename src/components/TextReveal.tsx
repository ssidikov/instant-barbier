'use client'

import { m, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  children: string
  className?: string
  variant?: 'word' | 'char'
  delay?: number
  duration?: number
  stagger?: number
}

export default function TextReveal({
  children,
  className = '',
  variant = 'word',
  delay = 0,
  duration = 1.2, // increased duration for luxury feel
  stagger = 0.03, // tighter stagger
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  // Split logic
  const elements = variant === 'word' ? children.split(' ') : children.split('')

  // Ultra-premium cinematic easing curve
  const premiumEase = [0.76, 0, 0.24, 1] as [number, number, number, number]

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  // Instead of just fading and sliding, we slide UP from completely hidden (120%)
  // behind a clipping mask. The parent span provides overflow:hidden.
  const child: Variants = {
    hidden: {
      y: '120%',
      // slight rotation for an even more dynamic entrance if desired, but
      // y-translate alone with this bezier is extremely premium.
      rotate: 2,
    },
    visible: {
      y: '0%',
      rotate: 0,
      transition: {
        duration: duration,
        ease: premiumEase,
      },
    },
  }

  return (
    <m.div
      ref={ref}
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}>
      {elements.map((el, index) => {
        // If variant is word, we need to preserve spaces between words.
        return (
          <span key={index} className='overflow-hidden relative inline-flex pb-1 -mb-1'>
            <m.span variants={child} className='inline-block origin-top-left'>
              {el}
            </m.span>
            {/* Add spacing back for words */}
            {variant === 'word' && index < elements.length - 1 && (
              <span className='inline-block'>&nbsp;</span>
            )}
          </span>
        )
      })}
    </m.div>
  )
}
