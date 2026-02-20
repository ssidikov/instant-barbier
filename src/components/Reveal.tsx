'use client'

import React, { useEffect, useRef } from 'react'

type RevealVariant = 'fade-up' | 'fade-side' | 'blur-in' | 'scale-up' | 'mask-reveal'

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  duration?: number
  threshold?: number
}

export default function Reveal({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration = 1.2,
  threshold = 0.15,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Fallback for reduced motion accessibility preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion && ref.current) {
      ref.current.style.opacity = '1'
      ref.current.style.transform = 'none'
      ref.current.style.filter = 'none'
      ref.current.style.clipPath = 'none'
      return
    }

    let ctx: { revert: () => void } | null = null

    ;(async () => {
      // Dynamically import GSAP
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!ref.current) return

      ctx = gsap.context(() => {
        // We use a custom start string, converting threshold to percentage
        const startTrigger = `top ${100 - threshold * 100}%`

        let fromState: gsap.TweenVars = {}
        let toState: gsap.TweenVars = {
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: startTrigger,
            toggleActions: 'play none none reverse', // Smoothly reverses on scroll up
          },
        }

        switch (variant) {
          case 'fade-up':
            fromState = { opacity: 0, y: 60 }
            toState = { ...toState, opacity: 1, y: 0, ease: 'power4.out' }
            break
          case 'fade-side':
            fromState = { opacity: 0, x: -50 }
            toState = { ...toState, opacity: 1, x: 0, ease: 'power3.out' }
            break
          case 'blur-in':
            fromState = { opacity: 0, scale: 0.95, filter: 'blur(12px)' }
            toState = { ...toState, opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power2.out' }
            break
          case 'scale-up':
            fromState = { opacity: 0, scale: 0.85 }
            toState = { ...toState, opacity: 1, scale: 1, ease: 'back.out(1.2)' }
            break
          case 'mask-reveal':
            fromState = { clipPath: 'inset(100% 0 0 0)', opacity: 0 }
            toState = { ...toState, clipPath: 'inset(0% 0 0 0)', opacity: 1, ease: 'power4.inOut' }
            break
          default:
            fromState = { opacity: 0 }
            toState = { ...toState, opacity: 1 }
        }

        // Apply initial hidden state immediately within the microtask context
        gsap.set(ref.current, fromState)

        // Then create the tween bound to ScrollTrigger
        gsap.to(ref.current, toState)
      })
    })()

    return () => {
      if (ctx) ctx.revert()
    }
  }, [variant, delay, duration, threshold])

  // We set initial inline style opacity: 0 to prevent a flash of unstyled content
  // while NextJS hydrated the React component before GSAP can lock onto it.
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }} {...rest}>
      {children}
    </div>
  )
}
