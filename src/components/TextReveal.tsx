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

  // We must define filter: blur() on both hidden and visible unconditionally
  // so that the server-rendered blur(8px) is properly hydrated and cleared
  // on all devices. This preserves the premium animation without getting stuck.
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: duration,
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
          <m.span key={index} variants={child}>
            {char}
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
        <m.span key={index} variants={child} className='mr-[0.25em]'>
          {word}
        </m.span>
      ))}
    </m.p>
  )
}
