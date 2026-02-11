import Link from 'next/link'
import { CONTACT, SOCIAL, SITE_NAME } from '@/lib/constants'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='bg-dark pt-16 pb-8 overflow-hidden'>
      <div className='max-w-6xl mx-auto px-5 md:px-6 lg:px-8'>
        {/* Large Headline */}
        <h2 className='text-center text-3xl md:text-5xl lg:text-6xl font-title italic text-gold mb-16'>
          Votre Style, Notre Passion
        </h2>

        {/* Logo Marquee - Moved under Headline */}
        <div className='relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden py-6 md:py-8 mb-8 md:mb-12 bg-navy/50 backdrop-blur-sm border-y border-gold/5'>
          <div className='animate-marquee-rtl flex items-center gap-16 w-max'>
            {/* Duplicate logos for seamless loop - increased count for wide screens */}
            {[...Array(20)].map((_, i) => (
              <div key={i} className='relative flex-shrink-0'>
                <Image
                  src='/logo/logo-golden.svg'
                  alt="L'Instant Barbier"
                  width={120}
                  height={120}
                  className='h-20 sm:h-32 md:h-40 lg:h-80 w-auto object-contain opacity-80'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social Bar - New Top Container */}
        <div className='flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 md:gap-6 border-b border-cream/10 pb-8 md:pb-12 mb-8 md:mb-12'>
          {/* Address & Phone */}
          <div className='flex flex-col md:flex-row items-center gap-6 text-cream/80'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 border border-gold/30 flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-gold'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'></path>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'></path>
                </svg>
              </div>
              <span className='text-sm uppercase tracking-wide'>{CONTACT.address}</span>
            </div>
            <div className='hidden md:block w-px h-4 bg-cream/20'></div>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 border border-gold/30 flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-gold'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'></path>
                </svg>
              </div>
              <a
                href={CONTACT.phoneHref}
                className='text-sm uppercase tracking-wide hover:text-gold transition-colors'>
                {CONTACT.phone}
              </a>
            </div>
            <div className='hidden md:block w-px h-4 bg-cream/20'></div>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 border border-gold/30 flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-gold'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
                </svg>
              </div>
              <a
                href={`mailto:${CONTACT.email}`}
                className='text-sm uppercase tracking-wide hover:text-gold transition-colors'>
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* Social Icons - Square Style */}
          <div className='flex items-center gap-4'>
            {[
              {
                label: 'Instagram',
                href: SOCIAL.instagram,
                path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
              },
              {
                label: 'X (Twitter)',
                href: SOCIAL.x,
                path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
              },
              {
                label: 'Facebook',
                href: SOCIAL.facebook,
                path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group relative flex items-center justify-center w-10 h-10 border border-cream/20 hover:border-gold transition-colors duration-300'
                aria-label={social.label}>
                <svg
                  className='w-4 h-4 text-cream/60 group-hover:text-gold transition-colors'
                  fill='currentColor'
                  viewBox='0 0 24 24'>
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 mb-12 md:mb-16'>
          {/* Left Column - Legal */}
          <div className='flex flex-col items-center md:items-start gap-6'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-gold font-medium mb-1 uppercase tracking-wider text-sm'>Légal</h3>
              <Link
                href='/legal'
                className='text-sm text-cream/60 hover:text-gold transition-colors'>
                Mentions Légales
              </Link>
              <Link
                href='/confidentialite'
                className='text-sm text-cream/60 hover:text-gold transition-colors'>
                Politique de Confidentialité
              </Link>
            </div>
          </div>

          {/* Right Column - Pages */}
          <div className='text-center md:text-right'>
            <h3 className='text-gold font-medium mb-3 uppercase tracking-wider text-sm'>Pages</h3>
            <nav className='flex flex-col gap-2'>
              <Link href='/' className='text-sm text-cream/80 hover:text-gold transition-colors'>
                Accueil
              </Link>
              <Link
                href='/prestations'
                className='text-sm text-cream/80 hover:text-gold transition-colors'>
                Prestations
              </Link>
              <Link
                href='/galerie'
                className='text-sm text-cream/80 hover:text-gold transition-colors'>
                Galerie
              </Link>
              <Link
                href='/contact'
                className='text-sm text-cream/80 hover:text-gold transition-colors'>
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <p className='text-center text-xs text-cream/40 mt-6'>
          © {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
