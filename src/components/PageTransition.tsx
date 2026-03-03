'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Lightweight page transition — CSS-only fade-in.
 *
 * Previous implementation used Framer Motion's AnimatePresence which
 * keeps the ENTIRE outgoing page tree in memory during exit animation.
 * This CSS approach gives the same visual effect with zero JS overhead
 * and no memory duplication.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [prevPath, setPrevPath] = useState(pathname)

  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setIsVisible(false)
  }

  useEffect(() => {
    if (!isVisible) {
      // Brief fade on route change
      const timer = requestAnimationFrame(() => {
        setIsVisible(true)
      })
      return () => cancelAnimationFrame(timer)
    }
  }, [isVisible])

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease-out',
      }}>
      {children}
    </div>
  )
}
