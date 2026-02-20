'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Instantly resets scroll position to the top whenever the route changes.
 * This ensures that scroll-triggered animations (IntersectionObserver) on the
 * new page always fire correctly and the page is never pre-scrolled.
 */
export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Immediately jump to top — no smooth scroll to avoid race
    // conditions with animation observers on the incoming page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
