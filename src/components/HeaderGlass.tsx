'use client'

import Link from 'next/link'
import Image from 'next/image'
import ButtonAlt from './ButtonAlt'
import { useState, useEffect, useRef } from 'react'
import { PLANITY_URL } from '@/lib/constants'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeaderGlass() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
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
      duration: 1,
    }).from(
      logoRef.current,
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.6',
    )

    // Animate nav items properly
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
        '-=0.4',
      )
    }

    tl.from(
      ctaRef.current,
      {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        clearProps: 'all',
      },
      '-=0.3',
    )

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      tl.kill()
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-all duration-700 ${
        scrolled ? 'shadow-2xl' : ''
      }`}
      style={{
        // Transparent by default, Liquid Glass Effect on scroll
        background: scrolled
          ? 'linear-gradient(135deg, rgba(244, 241, 236, 0.85) 0%, rgba(244, 241, 236, 0.75) 50%, rgba(255, 255, 255, 0.7) 100%)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(200%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(200%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(156, 131, 88, 0.4)'
          : '1px solid transparent',
        boxShadow: scrolled
          ? '0 8px 32px rgba(11, 22, 34, 0.15), 0 2px 8px rgba(156, 131, 88, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(156, 131, 88, 0.1)'
          : 'none',
      }}>
      
      {/* Liquid glass shimmer/refraction effect - only on scroll */}
      <div 
        className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 ${scrolled ? 'opacity-40' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.4) 55%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: scrolled ? 'shimmer 8s ease-in-out infinite' : 'none',
        }}
      />
      
      {/* Top highlight line - only visible on scroll */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Gold accent line - only visible on scroll */}
      <div className={`absolute top-[1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

      <div className='max-w-7xl mx-auto px-6 h-24 flex items-center justify-between relative'>
        {/* Decorative glass side elements - only on scroll */}
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-gold/50 via-gold/20 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-l from-gold/50 via-gold/20 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        {/* Logo / Brand Name */}
        <Link href='/' className='flex items-center relative z-10'>
          <div ref={logoRef} className='relative group'>
            {/* Glow effect behind logo */}
            <div className='absolute inset-0 bg-gold/30 blur-xl group-hover:bg-gold/40 transition-all duration-500 rounded-full scale-150' />
            <Image
              src='/logo/logo-black.svg'
              alt="L'Instant Barbier"
              width={120}
              height={120}
              className='h-16 w-16 object-contain relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-lg'
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav ref={navRef} className='hidden lg:flex items-center space-x-10'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='group relative text-sm uppercase tracking-[0.2em] text-navy font-semibold hover:text-gold transition-all duration-300'>
              <span className='relative z-10 drop-shadow-[0_1px_2px_rgba(244,241,236,0.8)]'>
                {item.label}
              </span>
              {/* Animated underline */}
              <span className='absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-gold via-gold to-gold/50 group-hover:w-full transition-all duration-500 shadow-lg shadow-gold/50' />
              {/* Subtle glow on hover */}
              <span className='absolute inset-0 bg-gold/0 group-hover:bg-gold/10 blur-md transition-all duration-500 rounded' />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div ref={ctaRef} className='hidden lg:block relative z-10'>
          <ButtonAlt href={PLANITY_URL}>Prendre rendez-vous</ButtonAlt>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='lg:hidden flex flex-col justify-center items-center w-12 h-12 gap-1.5 relative z-10 group'
          aria-label='Menu'>
          <div className='absolute inset-0 bg-navy/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm' />
          <span
            className={`w-7 h-0.5 bg-navy transition-all duration-500 relative ${isMenuOpen ? 'rotate-45 translate-y-2 bg-gold' : ''}`}
          />
          <span
            className={`w-7 h-0.5 bg-navy transition-all duration-500 relative ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}
          />
          <span
            className={`w-7 h-0.5 bg-navy transition-all duration-500 relative ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-gold' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu - Liquid Glass style */}
      <div
        className={`lg:hidden absolute top-24 left-0 right-0 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
        style={{
          background: 'linear-gradient(180deg, rgba(244, 241, 236, 0.95) 0%, rgba(244, 241, 236, 0.9) 100%)',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          borderBottom: '1px solid rgba(156, 131, 88, 0.3)',
          boxShadow: '0 8px 32px rgba(11, 22, 34, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        }}>
        <div className='absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none' />
        <nav className='flex flex-col items-center py-10 space-y-6 relative'>
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
              className={`text-sm uppercase tracking-[0.25em] text-navy hover:text-gold transition-all duration-300 font-semibold ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
              {item.label}
            </Link>
          ))}
          <div className='pt-6'>
            <ButtonAlt href={PLANITY_URL}>Prendre rendez-vous</ButtonAlt>
          </div>
        </nav>
      </div>

      {/* Bottom reflection line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-50'}`}
      />

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </header>
  )
}
