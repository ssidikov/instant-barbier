'use client'

import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'
import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { label: 'Le Salon', href: '/salon' },
    { label: 'Prestations', href: '/prestations' },
    { label: 'Galerie', href: '/galerie' },
    { label: 'Réservation', href: '/reservation' },
    { label: 'Contact', href: '/contact' },
  ]

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  // Scroll-aware background + close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (isMenuOpen) closeMenu()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen, closeMenu])

  // Body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    // Initial animation on load
    const ctx = gsap.context(() => {
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
    }, headerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed w-full top-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-navy/85 backdrop-blur-2xl shadow-[0_4px_30px_rgba(7,24,30,0.6)] border-b border-gold/10'
            : 'bg-transparent'
        }`}>
        {/* Premium top gradient border */}
        <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent' />

        {/* Subtle shimmer effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gold/3 to-transparent opacity-50 pointer-events-none' />

        <div className='max-w-7xl mx-auto px-6 h-20 lg:h-28 flex items-center justify-between relative'>
          {/* Logo - visible on all screens */}
          <Link href='/' onClick={closeMenu} className='z-20'>
            <Image
              src='/logo/logo-header.svg'
              alt="L'Instant Barbier"
              width={120}
              height={56}
              className='h-10 w-auto'
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
            <Button href='/reservation'>Prendre rendez-vous</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden flex flex-col justify-center items-center w-12 h-12 gap-1.5 relative z-[60] cursor-pointer'
            aria-label='Menu'>
            <span
              className={`w-7 h-[1.5px] bg-gold transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
            />
            <span
              className={`w-7 h-[1.5px] bg-gold transition-all duration-500 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}
            />
            <span
              className={`w-7 h-[1.5px] bg-gold transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
            />
          </button>
        </div>

        {/* Premium bottom gradient border */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-opacity duration-700 ${
            isScrolled ? 'opacity-60' : 'opacity-100'
          }`}
        />
      </header>

      {/* Mobile Menu - Fullscreen overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-600 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}>
        {/* Backdrop */}
        <div className='absolute inset-0 bg-navy/95 backdrop-blur-2xl' onClick={closeMenu} />

        {/* Subtle gold gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-gold/3 pointer-events-none' />

        {/* Navigation content — centered vertically */}
        <nav className='relative z-10 h-full flex flex-col items-center justify-center gap-8'>
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              style={{
                transitionDelay: isMenuOpen ? `${150 + index * 60}ms` : '0ms',
              }}
              className={`text-lg uppercase tracking-[0.25em] text-cream/90 hover:text-gold transition-all duration-500 font-light ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
              {item.label}
            </Link>
          ))}

          {/* Separator */}
          <div
            className={`w-12 h-px bg-gold/30 transition-all duration-500 ${
              isMenuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '500ms' : '0ms' }}
          />

          {/* CTA */}
          <div
            className={`pt-2 transition-all duration-500 ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '550ms' : '0ms' }}>
            <Button href='/reservation'>Prendre rendez-vous</Button>
          </div>
        </nav>
      </div>
    </>
  )
}
