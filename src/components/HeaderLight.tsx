'use client'

import Link from 'next/link'
import Image from 'next/image'
import ButtonLight from './ButtonLight'
import { useState, useEffect, useRef } from 'react'
import { PLANITY_URL } from '@/lib/constants'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeaderLight() {
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
    { label: 'Horaires', href: '/home-alt#horaires' },
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
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled ? 'shadow-xl shadow-navy-light/10' : ''
      }`}
      style={{
        background: scrolled
          ? 'linear-gradient(135deg, rgba(11, 22, 34, 0.98) 0%, rgba(20, 34, 51, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(11, 22, 34, 0.95) 0%, rgba(20, 34, 51, 0.90) 100%)',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(150%)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(150%)',
        borderBottom: scrolled
          ? '1px solid rgba(156, 131, 88, 0.4)'
          : '1px solid rgba(156, 131, 88, 0.2)',
        boxShadow: scrolled
          ? '0 8px 32px 0 rgba(11, 22, 34, 0.15)'
          : '0 4px 16px 0 rgba(11, 22, 34, 0.08)',
      }}>
      {/* Subtle shimmer effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-30' />
      {/* Animated top gold line */}
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent' />

      <div className='max-w-7xl mx-auto px-6 h-24 flex items-center justify-between relative'>
        {/* Decorative elements */}
        <div className='absolute left-0 top-1/2 -translate-y-1/2 w-20 h-px bg-gradient-to-r from-gold/40 to-transparent' />
        <div className='absolute right-0 top-1/2 -translate-y-1/2 w-20 h-px bg-gradient-to-l from-gold/40 to-transparent' />

        {/* Logo / Brand Name */}
        <Link href='/home-alt' className='flex items-center relative z-10'>
          <div ref={logoRef} className='relative group'>
            <div className='absolute inset-0 bg-gold/20 blur-xl group-hover:bg-gold/30 transition-all duration-500 rounded-full' />
            <Image
              src='/logo/logo-black.svg'
              alt="L'Instant Barbier"
              width={90}
              height={90}
              className='h-20 w-20 object-contain relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3'
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
              className='group relative text-sm uppercase tracking-[0.2em] text-cream font-medium hover:text-gold transition-all duration-300'>
              <span className='relative z-10'>{item.label}</span>
              {/* Animated underline */}
              <span className='absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-gold via-gold to-gold/50 group-hover:w-full transition-all duration-500 shadow-lg shadow-gold/50' />
              {/* Glow effect */}
              <span className='absolute inset-0 bg-gold/0 group-hover:bg-gold/10 blur-md transition-all duration-500 rounded' />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div ref={ctaRef} className='hidden lg:block relative'>
          <div className='absolute inset-0 bg-gold/10 blur-xl rounded-full' />
          <ButtonLight href={PLANITY_URL} variant='secondary'>
            Réserver
          </ButtonLight>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5 group'
          aria-label='Menu'>
          <span
            className={`w-6 h-[2px] bg-cream transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-cream transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-cream transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-navy-light/98 backdrop-blur-xl transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ top: '96px' }}>
        <nav className='flex flex-col items-center justify-center h-full gap-8 py-12'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className='text-2xl font-title text-cream hover:text-gold transition-colors'>
              {item.label}
            </Link>
          ))}
          <div className='mt-4'>
            <ButtonLight href={PLANITY_URL}>Réserver</ButtonLight>
          </div>
        </nav>
      </div>
    </header>
  )
}
