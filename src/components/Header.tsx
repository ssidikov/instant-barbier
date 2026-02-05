'use client'

import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'
import { useState, useEffect, useRef } from 'react'
import { PLANITY_URL } from '@/lib/constants'
import gsap from 'gsap'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { label: 'Le Salon', href: '/salon' },
    { label: 'Prestations', href: '/prestations' },
    { label: 'Galerie', href: '/galerie' },
    { label: 'Horaires', href: '/#horaires' },
    { label: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    // Initial animation on load
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
    })

    // Animate nav items
    if (navRef.current) {
      const navItems = Array.from(navRef.current.children)
      tl.from(
        navItems,
        {
          y: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          clearProps: 'all',
        },
        '-=0.5',
      )
    }

    tl.from(
      ctaRef.current,
      {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        clearProps: 'all',
      },
      '-=0.4',
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className='absolute w-full top-0 z-50'
      style={{
        background: 'transparent',
      }}>
      {/* Premium top gradient border */}
      <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent' />

      {/* Subtle shimmer effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gold/3 to-transparent opacity-50' />

      <div className='max-w-7xl mx-auto px-6 h-28 flex items-center justify-center xl:justify-between relative'>
        {/* Logo - Left side, visible on tablet and desktop */}
        <Link
          href='/'
          className='hidden lg:block z-20 transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(175,151,120,0.4)]'>
          <Image
            src='/logo/logo-header.svg'
            alt="L'Instant Barbier"
            width={120}
            height={56}
            className='h-12 lg:h-14 w-auto'
            priority
          />
        </Link>

        {/* Desktop Navigation - Premium centered layout */}
        <nav ref={navRef} className='hidden lg:flex items-center space-x-12'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='group relative text-[0.7rem] uppercase tracking-[0.3em] text-cream/90 font-light hover:text-gold transition-all duration-700'>
              <span className='relative z-10 [text-shadow:_0_2px_12px_rgb(11_22_34_/_90%)] group-hover:[text-shadow:_0_2px_20px_rgba(175,151,120,0.6)]'>
                {item.label}
              </span>
              {/* Premium animated underline */}
              <span className='absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-gold/80 via-gold to-gold/80 group-hover:w-full transition-all duration-700 shadow-[0_0_10px_rgba(175,151,120,0.5)]' />
              {/* Glow effect */}
              <span className='absolute inset-0 -inset-x-2 -inset-y-1 bg-gold/0 group-hover:bg-gold/5 blur-xl transition-all duration-700 rounded-lg' />
            </Link>
          ))}
        </nav>

        {/* CTA - Right side with premium glow */}
        <div ref={ctaRef} className='hidden xl:block relative'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-36 bg-gold/15 blur-3xl rounded-full animate-pulse-glow' />
          <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
        </div>

        {/* Mobile Menu Toggle - Premium styling */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='lg:hidden flex flex-col justify-center items-center w-14 h-14 gap-2 relative z-10 group'
          aria-label='Menu'>
          <div className='absolute inset-0 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_20px_rgba(175,151,120,0.2)]' />
          <span
            className={`w-8 h-[2px] bg-gradient-to-r from-gold to-gold/80 transition-all duration-700 relative shadow-[0_0_8px_rgba(175,151,120,0.5)] ${isMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`}
          />
          <span
            className={`w-8 h-[2px] bg-gradient-to-r from-gold to-gold/80 transition-all duration-700 relative shadow-[0_0_8px_rgba(175,151,120,0.5)] ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}
          />
          <span
            className={`w-8 h-[2px] bg-gradient-to-r from-gold to-gold/80 transition-all duration-700 relative shadow-[0_0_8px_rgba(175,151,120,0.5)] ${isMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu - Premium overlay */}
      <div
        className={`lg:hidden absolute top-28 left-0 right-0 transition-all duration-700 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-8'}`}
        style={{
          background:
            'linear-gradient(135deg, rgba(11, 22, 34, 0.98) 0%, rgba(20, 34, 51, 0.96) 100%)',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          borderTop: '1px solid rgba(175, 151, 120, 0.2)',
          borderBottom: '2px solid rgba(175, 151, 120, 0.4)',
          boxShadow: '0 10px 50px 0 rgba(11, 22, 34, 0.8), inset 0 1px 0 rgba(175, 151, 120, 0.1)',
        }}>
        <div className='absolute inset-0 bg-gradient-to-b from-gold/8 via-transparent to-gold/5 pointer-events-none' />
        <nav className='flex flex-col items-center py-12 space-y-8 relative'>
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{ transitionDelay: isMenuOpen ? `${index * 80}ms` : '0ms' }}
              className={`text-sm uppercase tracking-[0.3em] text-cream/90 hover:text-gold transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-light hover:[text-shadow:_0_2px_20px_rgba(175,151,120,0.6)] ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`}>
              {item.label}
            </Link>
          ))}
          <div className='pt-8'>
            <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
          </div>
        </nav>
      </div>

      {/* Premium bottom gradient border */}
      <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent' />
    </header>
  )
}
