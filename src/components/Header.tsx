'use client'

import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'
import { useState } from 'react'
import { PLANITY_URL } from '@/lib/constants'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Le Salon', href: '/salon' },
    { label: 'Prestations', href: '/prestations' },
    { label: 'Galerie', href: '/galerie' },
    { label: 'Horaires', href: '/#horaires' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className='fixed w-full top-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-gold/10'>
      <div className='max-w-6xl mx-auto px-6 h-20 flex items-center justify-between'>
        {/* Logo / Brand Name */}
        <Link href='/' className='flex items-center'>
          <Image 
            src='/icons/logo.png' 
            alt="L'Instant Barbier" 
            width={80} 
            height={80}
            className='h-20 w-20 object-contain hover:opacity-80 transition-opacity'
            unoptimized
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden lg:flex items-center space-x-8'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm uppercase tracking-widest text-cream hover:text-gold transition-colors'>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className='hidden lg:block'>
          <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5'
          aria-label='Menu'
        >
          <span className={`w-6 h-0.5 bg-gold transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-gold transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-gold transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-20 left-0 right-0 bg-navy/98 backdrop-blur-md border-b border-gold/10 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className='flex flex-col items-center py-8 space-y-6'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className='text-sm uppercase tracking-widest text-cream hover:text-gold transition-colors'>
              {item.label}
            </Link>
          ))}
          <div className='pt-4'>
            <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
