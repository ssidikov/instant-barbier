'use client'

import { useEffect, useRef } from 'react'
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// GSAP ScrollTrigger Parallax Hook
// For parallax background images - scrub-based translateY via GSAP
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GSAP ScrollTrigger parallax hook.
 * Attaches a scrub-based translateY to `ref` as the user scrolls.
 *
 * @param speed  Parallax intensity — 0 = static, 0.3 = subtle, 1 = full scroll
 * @param scrub  Smoothing lag (higher = smoother/slower catch-up)
 * @returns      ref to attach to the parallax element
 */
export function useParallax<T extends HTMLElement>(speed = 0.25, scrub = 1.2) {
  const ref = useRef<T>(null)

  useEffect(() => {
    // Bail immediately under reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let gsap: typeof import('gsap').gsap
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
    let ctx: ReturnType<typeof gsap.context> | null = null

    ;(async () => {
      const gsapModule = await import('gsap')
      const stModule = await import('gsap/ScrollTrigger')

      gsap = gsapModule.gsap
      ScrollTrigger = stModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      if (!ref.current) return

      ctx = gsap.context(() => {
        gsap.to(ref.current!, {
          yPercent: speed * 30, // subtle drift — not too aggressive
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current!.closest('section') ?? ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub, // smooth lag — feels premium
          },
        })
      }, ref)
    })()

    return () => {
      ctx?.revert()
    }
  }, [speed, scrub])

  return ref
}

// ─────────────────────────────────────────────────────────────────────────────
// Framer Motion Parallax Value Hook
// For inline-style parallax on individual elements using useScroll/useTransform
// ─────────────────────────────────────────────────────────────────────────────

interface ParallaxStyleOptions {
  /** Output range in pixels. Negative = moves up when scrolling down. Default: [-60, 60] */
  outputRange?: [number, number]
  /** Spring config for smooth feel. Set to false to disable spring smoothing */
  spring?: boolean | { stiffness?: number; damping?: number; mass?: number }
}

/**
 * Returns a MotionValue `y` (and optionally `x`) that you can pass directly
 * to a `<motion.div style={{ y }}>` to create smooth parallax.
 *
 * Tracks the scroll position of the entire page (offset: ["start end", "end start"]).
 *
 * @param containerRef  Ref to the section/container element to track scroll progress of
 * @param options       Output range and spring config
 */
export function useParallaxStyle(
  containerRef: React.RefObject<HTMLElement | null>,
  options: ParallaxStyleOptions = {},
): MotionValue<number> {
  const { outputRange = [-60, 60], spring: springConfig = true } = options

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const raw = useTransform(scrollYProgress, [0, 1], outputRange)

  const springOpts =
    springConfig === false
      ? undefined
      : {
          stiffness: 80,
          damping: 25,
          mass: 0.5,
          ...(typeof springConfig === 'object' ? springConfig : {}),
        }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const smoothed = useSpring(raw, springOpts ?? { stiffness: 100, damping: 30 })

  return springConfig !== false ? smoothed : raw
}

/**
 * Same as useParallaxStyle but returns both X and Y transforms.
 * Useful for diagonal or floating parallax effects.
 */
export function useParallaxXY(
  containerRef: React.RefObject<HTMLElement | null>,
  xRange: [number, number] = [-30, 30],
  yRange: [number, number] = [-60, 60],
): { x: MotionValue<number>; y: MotionValue<number> } {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], yRange)
  const rawX = useTransform(scrollYProgress, [0, 1], xRange)

  const springConfig = { stiffness: 60, damping: 20, mass: 0.6 }
  const y = useSpring(rawY, springConfig)
  const x = useSpring(rawX, springConfig)

  return { x, y }
}
