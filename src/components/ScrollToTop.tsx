'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'

export default function ScrollToTop() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const lenis = useLenis()

  // Reset scroll on navigation (original functional requirement)
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, lenis])

  // Show/hide floating button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Check on initial load
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <button
      onClick={handleScrollToTop}
      aria-label='Retour en haut'
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-gold/40 bg-navy/90 text-gold shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 hover:border-gold hover:bg-gold hover:text-navy hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}
      `}>
      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='square'
          strokeLinejoin='miter'
          strokeWidth='1.5'
          d='M4.5 15.75l7.5-7.5 7.5 7.5'
        />
      </svg>
    </button>
  )
}
