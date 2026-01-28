'use client'

import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'
import { useState, useEffect, useRef } from 'react'
import { PLANITY_URL } from '@/lib/constants'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Header() {
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
          clearProps: 'all', // Clear all properties after animation
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
      tl.kill() // Kill timeline on unmount
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled ? 'shadow-2xl shadow-gold/5' : ''
      }`}
      style={{
        background: scrolled
          ? 'linear-gradient(135deg, rgba(11, 22, 34, 0.95) 0%, rgba(11, 22, 34, 0.85) 100%)'
          : 'linear-gradient(135deg, rgba(11, 22, 34, 0.7) 0%, rgba(11, 22, 34, 0.5) 100%)',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(150%)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(150%)',
        borderBottom: scrolled
          ? '1px solid rgba(156, 131, 88, 0.3)'
          : '1px solid rgba(156, 131, 88, 0.15)',
        boxShadow: scrolled
          ? '0 8px 32px 0 rgba(11, 22, 34, 0.5), inset 0 1px 0 0 rgba(156, 131, 88, 0.1)'
          : '0 4px 16px 0 rgba(11, 22, 34, 0.2), inset 0 1px 0 0 rgba(156, 131, 88, 0.05)',
      }}>
      {/* Liquid glass shimmer effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-30' />
      {/* Animated top gold line */}
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent' />

      <div className='max-w-7xl mx-auto px-6 h-24 flex items-center justify-between relative'>
        {/* Decorative elements */}
        <div className='absolute left-0 top-1/2 -translate-y-1/2 w-20 h-px bg-gradient-to-r from-gold/40 to-transparent' />
        <div className='absolute right-0 top-1/2 -translate-y-1/2 w-20 h-px bg-gradient-to-l from-gold/40 to-transparent' />

        {/* Logo / Brand Name */}
        <Link href='/' className='flex items-center relative z-10'>
          <div ref={logoRef} className='relative group'>
            <div className='absolute inset-0 bg-gold/20 blur-xl group-hover:bg-gold/30 transition-all duration-500 rounded-full' />
            <Image
              src='/icons/logo.png'
              alt="L'Instant Barbier"
              width={90}
              height={90}
              className='h-20 w-20 object-contain relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3'
              unoptimized
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
              className='group relative text-sm uppercase tracking-[0.2em] text-cream font-medium hover:text-gold transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'>
              <span className='relative z-10 [text-shadow:_0_1px_8px_rgb(11_22_34_/_80%)]'>
                {item.label}
              </span>
              {/* Animated underline */}
              <span className='absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-gold via-gold to-gold/50 group-hover:w-full transition-all duration-500 shadow-lg shadow-gold/50' />
              {/* Glow effect */}
              <span className='absolute inset-0 bg-gold/0 group-hover:bg-gold/10 blur-md transition-all duration-500 rounded' />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div ref={ctaRef} className='hidden lg:block relative z-10'>
          <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='lg:hidden flex flex-col justify-center items-center w-12 h-12 gap-1.5 relative z-10 group'
          aria-label='Menu'>
          <div className='absolute inset-0 bg-gold/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          <span
            className={`w-7 h-0.5 bg-gold transition-all duration-500 relative ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`w-7 h-0.5 bg-gold transition-all duration-500 relative ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}
          />
          <span
            className={`w-7 h-0.5 bg-gold transition-all duration-500 relative ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-24 left-0 right-0 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
        style={{
          background:
            'linear-gradient(135deg, rgba(11, 22, 34, 0.98) 0%, rgba(11, 22, 34, 0.95) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(156, 131, 88, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(11, 22, 34, 0.6)',
        }}>
        <div className='absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none' />
        <nav className='flex flex-col items-center py-10 space-y-6 relative'>
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
              className={`text-sm uppercase tracking-[0.25em] text-cream hover:text-gold transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
              {item.label}
            </Link>
          ))}
          <div className='pt-6'>
            <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
          </div>
        </nav>
      </div>

      {/* Bottom decorative line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
      />
    </header>
  )
}
