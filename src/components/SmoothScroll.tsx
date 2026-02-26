'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Lightweight wrapper — no Lenis, just native scroll.
 * Keeps GSAP ScrollTrigger properly initialized and refreshed.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Ensure ScrollTrigger updates when mobile viewport shifts
    // (e.g. iOS Safari address bar expanding/collapsing)
    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)

    // Refresh once after initial paint so triggers calculate correctly
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 1500)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
    }
  }, [])

  return <>{children}</>
}
