'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!mounted || !visible) return null

  return (
    <div className='fixed bottom-6 right-6 z-[999] max-w-sm w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-4 duration-500 fade-in'>
      <div className='relative bg-navy/95 backdrop-blur-xl border border-gold/15 shadow-2xl shadow-black/40 p-6'>
        {/* Corner accents */}
        <div className='absolute top-0 left-0 w-5 h-5 border-t border-l border-gold/30' />
        <div className='absolute bottom-0 right-0 w-5 h-5 border-b border-r border-gold/30' />

        {/* Icon + Title */}
        <div className='flex items-center gap-3 mb-3'>
          <div className='w-8 h-8 border border-gold/25 flex items-center justify-center shrink-0'>
            <svg
              className='w-4 h-4 text-gold'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'>
              <circle cx='12' cy='12' r='10' />
              <circle cx='8' cy='10' r='1' fill='currentColor' stroke='none' />
              <circle cx='15' cy='8' r='1.5' fill='currentColor' stroke='none' />
              <circle cx='10' cy='15' r='1' fill='currentColor' stroke='none' />
              <circle cx='16' cy='14' r='0.8' fill='currentColor' stroke='none' />
            </svg>
          </div>
          <span className='text-gold font-title text-sm'>Cookies</span>
        </div>

        {/* Text */}
        <p className='text-cream/50 text-xs font-light leading-relaxed mb-5'>
          Ce site utilise des cookies pour améliorer votre expérience.{' '}
          <Link
            href='/confidentialite'
            className='text-gold/70 hover:text-gold underline underline-offset-2 decoration-gold/20 hover:decoration-gold/50 transition-colors duration-300'>
            En savoir plus
          </Link>
        </p>

        {/* Buttons */}
        <div className='flex items-center gap-3'>
          <button
            onClick={accept}
            className='group relative flex-1 py-2.5 text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 overflow-hidden'>
            <span className='absolute inset-0 bg-gold' />
            <span className='absolute inset-0 bg-gold/80 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300' />
            <span className='relative text-navy'>Accepter</span>
          </button>
          <button
            onClick={decline}
            className='group py-2.5 px-4 text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-cream/70 border border-gold/10 hover:border-gold/30 transition-all duration-300'>
            Refuser
          </button>
        </div>
      </div>
    </div>
  )
}
