'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  /** Target number to count to */
  end: number
  /** Animation duration in seconds (default 2) */
  duration?: number
  /** Optional suffix, e.g. '+' or '★' */
  suffix?: string
  /** Tailwind / CSS classes to pass to the span */
  className?: string
  /** IntersectionObserver threshold (0–1) */
  threshold?: number
}

/**
 * GSAP-powered number counter that animates from 0 → `end` when the element
 * enters the viewport.
 *
 * - Lazy-imports gsap so it only loads when the component is in view.
 * - Respects prefers-reduced-motion: shows the final value immediately.
 * - Fires once (observer disconnects on first intersection).
 */
export default function CountUp({
  end,
  duration = 2,
  suffix = '',
  className = '',
  threshold = 0.5,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // Respect reduced-motion preference — show final value instantly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.disconnect()

          // Lazy-import GSAP — only loaded when this component is triggered
          import('gsap').then(({ gsap }) => {
            const obj = { value: 0 }
            gsap.to(obj, {
              value: end,
              duration,
              ease: 'power3.out',
              onUpdate() {
                setCount(Math.round(obj.value))
              },
            })
          })
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, threshold, started])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}
