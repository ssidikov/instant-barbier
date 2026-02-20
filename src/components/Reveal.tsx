'use client'

import React, { useEffect, useRef, useState } from 'react'

type RevealVariant = 'fade-up' | 'fade-side' | 'blur-in' | 'scale-up' | 'mask-reveal'

interface RevealProps {
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
  duration = 0.8,
  threshold = 0.2,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [threshold])

  // ── Inline styles ──────────────────────────────────────────────────────────
  const baseStyle: React.CSSProperties = {
    transitionDuration: `${duration}s`,
    transitionDelay: `${delay}s`,
    willChange: variant === 'mask-reveal' ? 'transform' : 'transform, opacity, filter',
  }

  if (variant === 'mask-reveal') {
    baseStyle.clipPath = isVisible ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)'
    baseStyle.transitionProperty = 'clip-path, opacity'
  }

  // ── Variant classes ────────────────────────────────────────────────────────
  const getVariantStyles = () => {
    switch (variant) {
      case 'fade-up':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      case 'fade-side':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
      case 'blur-in':
        return isVisible ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-95'
      case 'scale-up':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      case 'mask-reveal':
        return 'opacity-100'
      default:
        return ''
    }
  }

  const transitionClass = variant === 'mask-reveal' ? '' : 'transition-all'

  return (
    <div
      ref={ref}
      className={`${className} ${transitionClass} ease-premium ${getVariantStyles()}`}
      style={baseStyle}>
      {children}
    </div>
  )
}
