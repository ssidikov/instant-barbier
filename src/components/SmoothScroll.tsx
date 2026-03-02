'use client'

import { useEffect } from 'react'

/**
 * Lightweight wrapper — no Lenis, just native scroll.
 * Keeps GSAP ScrollTrigger properly initialized and refreshed.
 * GSAP is dynamically imported to keep it off the critical path.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cleanup: (() => void) | undefined
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Ensure ScrollTrigger updates when mobile viewport shifts
      // (e.g. iOS Safari address bar expanding/collapsing)
      const handleResize = () => ScrollTrigger.refresh()
      window.addEventListener('resize', handleResize)

      // Refresh once after initial paint so triggers calculate correctly
      const timeout = setTimeout(() => ScrollTrigger.refresh(), 1500)

      cleanup = () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(timeout)
      }
    })()

    return () => cleanup?.()
  }, [])

  return <>{children}</>
}
