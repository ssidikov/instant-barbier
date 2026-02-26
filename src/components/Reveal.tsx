'use client'

import React, { useEffect, useRef, useState } from 'react'

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
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const currentRef = ref.current
    if (!currentRef) return

    // Intersection Observer for maximum performance on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          // We only want it to reveal once, so unobserve
          observer.unobserve(currentRef)
        }
      },
      {
        threshold,
        // Trigger slightly earlier on mobile
        rootMargin: window.innerWidth < 768 ? '0px 0px -50px 0px' : '0px 0px -100px 0px',
      },
    )

    observer.observe(currentRef)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  // Get base translate/scale based on variant
  const getVariantStyles = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: 'translate(0px, 0px) scale(1)',
        filter: 'blur(0px)',
        clipPath: 'inset(0% 0 0 0)',
      }
    }

    switch (variant) {
      case 'fade-up':
        return { opacity: 0, transform: 'translateY(60px)', filter: 'blur(0px)' }
      case 'fade-side':
        return { opacity: 0, transform: 'translateX(-50px)', filter: 'blur(0px)' }
      case 'blur-in':
        return { opacity: 0, transform: 'scale(0.95)', filter: 'blur(12px)' }
      case 'scale-up':
        return { opacity: 0, transform: 'scale(0.85)', filter: 'blur(0px)' }
      case 'mask-reveal':
        return { opacity: 0, transform: 'translateY(0px)', clipPath: 'inset(100% 0 0 0)' }
      default:
        return { opacity: 0, transform: 'translateY(0px)' }
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...getVariantStyles(),
        transitionProperty: 'opacity, transform, filter, clip-path',
        transitionDuration: `${duration}s`,
        transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)', // power3.out equivalent
        transitionDelay: `${delay}s`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
      {...rest}>
      {children}
    </div>
  )
}
