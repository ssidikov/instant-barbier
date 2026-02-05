'use client'

import Container from '@/components/Container'
import Section from '@/components/Section'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PLANITY_URL } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useInView } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS - Framer Motion
// ═══════════════════════════════════════════════════════════════════════════

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// Reveal on scroll component
function RevealOnScroll({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: isMobile ? 20 : 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 20 : 60 }}
      transition={{ duration: isMobile ? 0.3 : 0.8, delay, ease: 'easeOut' }}
      className={className}>
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA - Données du site
// ═══════════════════════════════════════════════════════════════════════════

const services = [
  {
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'>
        <path
          d='M6 3v18M18 3v18M6 12h12M9 6h6M9 18h6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    title: 'Coupes',
    description:
      'Coupes précises et adaptées à votre style et personnalité. Un travail sur-mesure pour révéler votre caractère.',
  },
  {
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'>
        <path
          d='M7 8c0-2.21 1.79-4 4-4s4 1.79 4 4v2c0 2.21-1.79 4-4 4s-4-1.79-4-4V8z'
          strokeLinecap='round'
        />
        <path d='M5 22c0-3.87 3.13-7 7-7s7 3.13 7 7' strokeLinecap='round' />
        <path d='M15 8h4M15 12h3' strokeLinecap='round' />
      </svg>
    ),
    title: 'Barbe & Rasage',
    description:
      'Rasage traditionnel au blaireau et serviettes chaudes. Taille et sculpture de barbe par nos experts.',
  },
  {
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'>
        <path d='M4 12c0 0 3-4 8-4s8 4 8 4' strokeLinecap='round' />
        <path d='M7 12c0 0 2-2 5-2s5 2 5 2' strokeLinecap='round' />
        <circle cx='12' cy='12' r='1' fill='currentColor' />
      </svg>
    ),
    title: 'Moustache',
    description:
      'Taille et entretien de moustache pour un look soigné et raffiné. Conseils personnalisés inclus.',
  },
  {
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'>
        <path
          d='M12 3c-1.5 0-3 1-3 3v4c0 1 .5 2 1.5 3l-3 8h9l-3-8c1-.5 1.5-2 1.5-3V6c0-2-1.5-3-3-3z'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M9 21h6' strokeLinecap='round' />
      </svg>
    ),
    title: 'Coiffage',
    description:
      'Brushing et coiffage professionnel pour garder votre coiffure impeccable au quotidien.',
  },
]

const team = [
  {
    name: 'RICCARDO',
    role: 'Coiffeur-barbier et directeur artistique',
    experience: "23 ans d'expérience",
    image: '/images/team/Riccardo.avif',
  },
]

const galleryImages = [
  { src: '/images/gallery/gallery-1.jpg', alt: 'Coupe moderne' },
  { src: '/images/gallery/gallery-2.jpg', alt: 'Rasage traditionnel' },
  { src: '/images/gallery/gallery-3.jpg', alt: 'Taille de barbe' },
  { src: '/images/gallery/gallery-4.jpg', alt: 'Ambiance du salon' },
  { src: '/images/gallery/gallery-5.jpg', alt: 'Détail coupe' },
  { src: '/images/gallery/gallery-6.jpg', alt: 'Finitions' },
]

const reviews = [
  {
    text: "Ambiance géniale et service impeccable. Les barbiers sont attentifs et prennent le temps de comprendre ce que l'on souhaite. Je recommande vivement !",
    author: 'Jean-Pierre D.',
    rating: 5,
  },
  {
    text: "Je me suis senti accueilli dès mon arrivée. Coupe parfaite, rasage traditionnel d'exception. Un vrai moment de détente pour hommes.",
    author: 'Antoine L.',
    rating: 5,
  },
  {
    text: 'Une expérience incroyable à chaque visite. Des barbiers qualifiés et un cadre raffiné. On sent le souci du détail et de la précision.',
    author: 'Charles M.',
    rating: 5,
  },
]

const hours = [
  { day: 'Lundi', hours: 'Fermé' },
  { day: 'Mardi', hours: '10:00 – 20:00' },
  { day: 'Mercredi', hours: '10:00 – 20:00' },
  { day: 'Jeudi-Ven', hours: '10:00 – 21:00' },
  { day: 'Samedi', hours: '09:00 – 19:00' },
  { day: 'Dimanche', hours: 'Fermé' },
]

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANTS INTERNES
// ═══════════════════════════════════════════════════════════════════════════

function SectionTitle({
  subtitle,
  title,
  className = '',
}: {
  subtitle?: string
  title: string
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={`text-center mb-16 ${className}`}>
      {subtitle && (
        <motion.div variants={fadeInUp} className='flex items-center justify-center gap-4 mb-4'>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='w-12 h-px bg-gold/40 origin-right'
          />
          <span className='text-gold text-xs uppercase tracking-[0.3em]'>{subtitle}</span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='w-12 h-px bg-gold/40 origin-left'
          />
        </motion.div>
      )}
      <motion.h2 variants={fadeInUp} className='text-3xl md:text-5xl font-title text-gold'>
        {title}
      </motion.h2>
    </motion.div>
  )
}

function StarRating({ rating, animate = false }: { rating: number; animate?: boolean }) {
  return (
    <div className='flex gap-1'>
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          initial={animate ? { opacity: 0, scale: 0, rotate: -180 } : {}}
          animate={animate ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-cream/20'}`}
          fill='currentColor'
          viewBox='0 0 20 20'>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </motion.svg>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  // Animation refs
  const heroRef = useRef<HTMLElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubtitleRef = useRef<HTMLDivElement>(null)
  const heroDescriptionRef = useRef<HTMLParagraphElement>(null)
  const heroCtaRef = useRef<HTMLDivElement>(null)
  const heroLineRef = useRef<HTMLDivElement>(null)
  const parallaxImgRef = useRef<HTMLDivElement>(null)

  // Generate stable particle positions using useState with initializer function
  const [particles] = useState(() =>
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
    })),
  )

  useEffect(() => {
    const isMobile = window.innerWidth < 768

    // ============================================
    // PARALLAX EFFECTS
    // ============================================

    if (parallaxImgRef.current) {
      if (isMobile) {
        // CSS-only parallax for mobile (no ScrollTrigger = no scroll blocking)
        // Apply transform directly, browser handles scroll optimization
        const handleScroll = () => {
          if (!parallaxImgRef.current) return
          const scrollY = window.scrollY
          const heroHeight = heroRef.current?.offsetHeight || 0
          // Simple parallax calculation
          const offset = Math.min(scrollY * 0.1, heroHeight * 0.1)
          parallaxImgRef.current.style.transform = `translateY(${offset}px)`
        }

        // Passive listener for best scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      } else {
        // Desktop: Use GSAP ScrollTrigger for smooth effect
        gsap.to(parallaxImgRef.current, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }

    // ============================================
    // ENTRANCE ANIMATIONS - Desktop only for performance
    // ============================================

    if (isMobile) {
      return // Skip entrance animations on mobile
    }

    // Hero entrance animation (desktop only)
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Animate decorative line
    tl.from(heroLineRef.current, {
      scaleY: 0,
      duration: 1.2,
      ease: 'power3.inOut',
    })

      // Animate subtitle with split effect
      .from(
        heroSubtitleRef.current,
        {
          x: -100,
          opacity: 0,
          duration: 1,
        },
        '-=0.6',
      )

      // Animate title with stagger
      .from(
        heroTitleRef.current?.children || [],
        {
          y: 120,
          opacity: 0,
          rotationX: -90,
          stagger: 0.2,
          duration: 1.2,
          ease: 'power4.out',
        },
        '-=0.4',
      )

      // Animate description
      .from(
        heroDescriptionRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
        },
        '-=0.6',
      )

      // Animate CTA button
      .from(
        heroCtaRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.3',
      )

    // Floating animation for decorative elements (desktop only)
    gsap.to('.float-element', {
      y: 20,
      duration: 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Rotate animation for corner elements (desktop only)
    gsap.to('.corner-element', {
      rotation: 90,
      duration: 20,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <>
      <Header />
      <main className='grow'>
        {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - PREMIUM
      ═══════════════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className='relative h-screen flex items-center overflow-hidden'>
          {/* Animated Background Patterns - DISABLED ON MOBILE for performance */}
          <div className='absolute inset-0 opacity-10 hidden md:block'>
            <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-[120px] animate-pulse' />
            <div
              className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-[120px] animate-pulse'
              style={{ animationDelay: '1s' }}
            />
          </div>

          {/* Background Image with Parallax */}
          <div className='absolute inset-0'>
            <div ref={parallaxImgRef} className='absolute inset-0 scale-110'>
              <div className="absolute inset-0 bg-[url('/images/hero-barbershop.jpg')] bg-cover bg-center" />
              <div className='absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/30' />
              <div className='absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/30 to-navy/85' />
              {/* Top gradient for header area */}
              <div className='absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-navy/80 via-navy/50 to-transparent' />
            </div>
          </div>

          {/* Animated Decorative Gold Line */}
          <div
            ref={heroLineRef}
            className='absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-gold to-transparent origin-top'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full shadow-lg shadow-gold/50 animate-pulse' />
          </div>

          {/* Grid Overlay */}
          <div className='absolute inset-0 bg-[linear-gradient(rgba(156,131,88,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(156,131,88,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]' />

          {/* Content */}
          <div className='relative z-10 h-full flex'>
            {/* Logo on left side - rotated 90 degrees with vertical marquee, 20% width */}
            <div className='hidden md:flex w-[20vw] shrink-0 h-full overflow-hidden relative items-center justify-center'>
              <div className='animate-marquee-vertical flex flex-col items-center h-max'>
                {/* First set of logos */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`set1-${i}`}
                    className='shrink-0 h-[50vh] flex items-center justify-center'>
                    <Image
                      src='/logo/logo-golden.svg'
                      alt="L'Instant Barbier"
                      width={600}
                      height={200}
                      className='w-[45vh] h-auto object-contain drop-shadow-[0_4px_16px_rgba(156,131,88,0.4)] opacity-60 -rotate-90'
                      priority={i === 0}
                    />
                  </div>
                ))}
                {/* Second set - identical to first for seamless loop */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`set2-${i}`}
                    className='shrink-0 h-[50vh] flex items-center justify-center'>
                    <Image
                      src='/logo/logo-golden.svg'
                      alt="L'Instant Barbier"
                      width={600}
                      height={200}
                      className='w-[45vh] h-auto object-contain drop-shadow-[0_4px_16px_rgba(156,131,88,0.4)] opacity-60 -rotate-90'
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Hero content - with padding to clear header */}
            <Container className='flex-1 flex items-center pt-32 md:pt-24'>
              <div className='w-full flex flex-col'>
                {/* Mobile horizontal logo marquee - only visible on mobile */}
                <div className='md:hidden w-screen relative -ml-6 overflow-hidden mb-8'>
                  <div className='animate-marquee-rtl flex items-center gap-8 w-max'>
                    {/* Reduced to 4 logos for better mobile performance */}
                    {[...Array(4)].map((_, i) => (
                      <Image
                        key={i}
                        src='/logo/logo-golden.svg'
                        alt="L'Instant Barbier"
                        width={120}
                        height={120}
                        className='h-16 w-auto object-contain opacity-60'
                      />
                    ))}
                  </div>
                </div>

                <div className='max-w-3xl space-y-8 md:space-y-10'>
                  {/* Subtitle with animated line */}
                  <div ref={heroSubtitleRef} className='flex items-center gap-4'>
                    <span className='w-16 h-[1px] bg-gradient-to-r from-transparent to-gold' />
                    <p className='text-gold uppercase tracking-[0.3em] text-sm font-light'>
                      Barbier & Coiffeur Homme
                    </p>
                    <div className='flex gap-1'>
                      <span className='w-1 h-1 bg-gold rounded-full animate-pulse' />
                      <span
                        className='w-1 h-1 bg-gold rounded-full animate-pulse'
                        style={{ animationDelay: '0.2s' }}
                      />
                      <span
                        className='w-1 h-1 bg-gold rounded-full animate-pulse'
                        style={{ animationDelay: '0.4s' }}
                      />
                    </div>
                  </div>

                  {/* Main Title */}
                  <h1
                    ref={heroTitleRef}
                    className='text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-title text-gold leading-[0.95] [perspective:1000px]'>
                    <span className='block [transform-style:preserve-3d]'>Barbier & coiffeur</span>
                    <span className='block [transform-style:preserve-3d]'>homme à Paris</span>
                  </h1>

                  {/* Description with premium styling */}
                  <div
                    ref={heroDescriptionRef}
                    className='text-lg md:text-xl text-cream/90 max-w-xl font-light leading-relaxed relative pl-6 border-l-2 border-gold/50 space-y-4'>
                    <p>
                      <strong className='text-gold font-medium'>Au cœur du Marais</strong>,
                      L&apos;Instant Barbier est un{' '}
                      <strong className='text-gold font-medium'>
                        salon de coiffure homme à Paris
                      </strong>{' '}
                      dédié à l&apos;élégance, au détail et au savoir-faire artisanal.
                    </p>
                    <p>
                      Ici, chaque coupe, chaque barbe et chaque soin est pensé pour sublimer votre
                      style dans un cadre raffiné et chaleureux.
                    </p>
                  </div>

                  {/* CTA Button with glow effect */}
                  <div ref={heroCtaRef} className='pt-6 relative inline-flex'>
                    <div className='cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-gold/20 blur-2xl rounded-full' />
                    <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
                  </div>

                  {/* Social Proof / Stats */}
                  <div className='flex gap-12 pt-8'>
                    <div className='group cursor-default'>
                      <div className='text-3xl font-title text-gold mb-1 group-hover:scale-110 transition-transform'>
                        23+
                      </div>
                      <div className='text-xs text-cream/60 uppercase tracking-wider'>
                        Années d&apos;expérience
                      </div>
                    </div>
                    <div className='group cursor-default'>
                      <div className='text-3xl font-title text-gold mb-1 group-hover:scale-110 transition-transform'>
                        2000+
                      </div>
                      <div className='text-xs text-cream/60 uppercase tracking-wider'>
                        Clients satisfaits
                      </div>
                    </div>
                    <div className='group cursor-default'>
                      <div className='text-3xl font-title text-gold mb-1 group-hover:scale-110 transition-transform'>
                        5★
                      </div>
                      <div className='text-xs text-cream/60 uppercase tracking-wider'>
                        Note moyenne
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {/* Decorative Corner Elements - Static */}
          <div className='absolute top-32 right-16 w-24 h-24 border-t-2 border-r-2 border-gold/30'>
            <div className='absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full shadow-lg shadow-gold/50' />
          </div>
          <div className='absolute bottom-32 left-16 w-24 h-24 border-b-2 border-l-2 border-gold/30'>
            <div className='absolute -bottom-1 -left-1 w-2 h-2 bg-gold rounded-full shadow-lg shadow-gold/50' />
          </div>

          {/* Particles Effect */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            {particles.map((particle, i) => (
              <div
                key={i}
                className='absolute w-1 h-1 bg-gold/20 rounded-full'
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animation: `float ${particle.duration}s ease-in-out infinite`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
          À PROPOS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='a-propos' className='bg-navy'>
          <Container>
            <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
              {/* Image Side */}
              <RevealOnScroll className='relative'>
                <motion.div
                  className='relative aspect-4/5 overflow-hidden'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}>
                  <div className="absolute inset-0 bg-[url('/images/about-barbershop.jpg')] bg-cover bg-center" />
                  <div className='absolute inset-0 bg-navy/20' />
                  {/* Shine effect on hover */}
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full'
                    whileHover={{ translateX: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
                {/* Decorative Frame - Animated */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className='absolute -bottom-4 -right-4 w-full h-full border border-gold/30 -z-10'
                />
                {/* Experience Badge - Animated */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className='absolute -bottom-6 -left-6 bg-gold text-navy p-6 text-center cursor-default'>
                  <span className='block text-4xl font-title font-bold'>23+</span>
                  <span className='text-xs uppercase tracking-wider'>Ans d&apos;expérience</span>
                </motion.div>
              </RevealOnScroll>

              {/* Content Side */}
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
                className='space-y-8'>
                <div>
                  <motion.div variants={fadeInUp} className='flex items-center gap-3 mb-4'>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className='w-10 h-px bg-gold origin-left'
                    />
                    <span className='text-gold text-xs uppercase tracking-[0.3em]'>À propos</span>
                  </motion.div>
                  <motion.h2
                    variants={fadeInUp}
                    className='text-3xl md:text-5xl font-title text-gold leading-tight'>
                    Un barbier à Paris où l’exigence rencontre l’élégance
                  </motion.h2>
                </div>

                <motion.div variants={fadeInUp} className='space-y-6 text-cream/80 leading-relaxed'>
                  <p>
                    Spécialisé dans la coiffure homme et l’entretien de la barbe, L’Instant Barbier
                    vous accueille dans un univers premium, inspiré des codes du grooming haut de
                    gamme.
                  </p>
                  <p>
                    Notre équipe de coiffeurs-barbiers expérimentés, dirigée par Riccardo, met son
                    savoir-faire au service de chaque client afin de proposer une expérience sur
                    mesure, alliant précision, écoute, conseils personnalisés et produits de
                    qualité.
                  </p>
                  <p>
                    Que vous recherchiez un barbier dans le Marais, un coiffeur homme à Paris, ou
                    une expérience authentique et soignée, notre salon est pensé pour les hommes
                    exigeants, attachés au détail et à l’élégance.
                  </p>
                </motion.div>

                {/* Features - Staggered */}
                <motion.div variants={staggerContainer} className='grid grid-cols-2 gap-6 pt-4'>
                  {[
                    'Produits Premium',
                    'Maîtres Barbiers',
                    'Cadre Élégant',
                    'Service Personnalisé',
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                      className='flex items-center gap-3'>
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className='text-gold text-2xl'>
                        ✓
                      </motion.span>
                      <span className='text-cream/90 text-sm'>{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Link
                    href='/salon'
                    className='inline-flex items-center gap-2 text-gold text-sm uppercase tracking-widest hover:text-cream transition-colors group'>
                    En savoir plus
                    <motion.span className='inline-block' whileHover={{ x: 5 }}>
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='services' className='bg-navy border-t border-gold/10'>
          <Container>
            <SectionTitle subtitle='Nos Services' title='Prestations' />

            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
              {services.map((service, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  initial='rest'
                  whileHover='hover'
                  className='group text-center p-8 border border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300'>
                  {/* Icon */}
                  <div className='flex justify-center mb-6'>
                    <motion.div
                      className='text-gold'
                      variants={{
                        rest: { scale: 1, rotate: 0 },
                        hover: { scale: 1.2, rotate: 5 },
                      }}
                      transition={{ duration: 0.3 }}>
                      {service.icon}
                    </motion.div>
                  </div>

                  {/* Title */}
                  <motion.h3
                    className='text-xl font-title text-gold mb-4 uppercase tracking-wide'
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -3 },
                    }}>
                    {service.title}
                  </motion.h3>

                  {/* Description */}
                  <p className='text-cream/70 text-sm leading-relaxed'>{service.description}</p>

                  {/* Decorative line on hover */}
                  <motion.div
                    className='mt-6 h-px bg-gold/50 mx-auto'
                    variants={{
                      rest: { width: 0 },
                      hover: { width: '50%' },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.article>
              ))}
            </motion.div>

            <RevealOnScroll delay={0.3} className='text-center mt-12'>
              <Button href='/prestations'>Voir les tarifs</Button>
            </RevealOnScroll>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          ÉQUIPE SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='equipe' className='bg-dark'>
          <Container>
            <SectionTitle subtitle='Les Experts' title='Notre Équipe' />

            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className='grid md:grid-cols-3 gap-8'>
              {team.map((member, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className='group relative overflow-hidden'>
                  {/* Image */}
                  <div className='relative aspect-3/4 overflow-hidden bg-navy'>
                    <motion.div
                      className='absolute inset-0 bg-cover bg-center'
                      style={{ backgroundImage: `url(${member.image})` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-navy via-navy/20 to-transparent' />
                  </div>

                  {/* Info Overlay - Animated */}
                  <motion.div
                    className='absolute bottom-0 left-0 right-0 p-6 text-center'
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}>
                    <motion.div
                      className='bg-navy/80 backdrop-blur-sm border border-gold/30 p-4'
                      whileHover={{ borderColor: 'rgba(175, 151, 120, 0.6)' }}>
                      <h3 className='text-xl font-title text-gold mb-1'>{member.name}</h3>
                      <p className='text-cream/90 text-sm mb-2'>{member.role}</p>
                      <p className='text-gold/70 text-xs uppercase tracking-wider'>
                        {member.experience}
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Decorative Corner - Animated */}
                  <motion.div
                    className='absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/40'
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, rotate: 45 }}
                  />
                </motion.article>
              ))}
            </motion.div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          GALERIE SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='galerie' className='bg-navy border-t border-gold/10'>
          <Container>
            <SectionTitle subtitle='Notre Travail' title='Galerie' />

            {/* Gallery Grid */}
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {/* Large Image */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 0.98 }}
                className='col-span-2 row-span-2 relative aspect-square md:aspect-auto overflow-hidden group cursor-pointer'>
                <motion.div
                  className='absolute inset-0 bg-cover bg-center'
                  style={{ backgroundImage: `url(${galleryImages[0].src})` }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className='absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors' />
                {/* View overlay */}
                <motion.div
                  className='absolute inset-0 flex items-center justify-center bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity'
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}>
                  <motion.span
                    className='text-gold text-4xl'
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}>
                    +
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Smaller Images */}
              {galleryImages.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 0.95 }}
                  className='relative aspect-square overflow-hidden group cursor-pointer'>
                  <motion.div
                    className='absolute inset-0 bg-cover bg-center'
                    style={{ backgroundImage: `url(${image.src})` }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className='absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors' />
                  {/* View overlay */}
                  <div className='absolute inset-0 flex items-center justify-center bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <span className='text-gold text-2xl'>+</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <RevealOnScroll delay={0.3} className='text-center mt-10'>
              <Link
                href='/galerie'
                className='inline-flex items-center gap-2 text-gold text-sm uppercase tracking-widest hover:text-cream transition-colors group'>
                Voir plus
                <motion.span className='inline-block' whileHover={{ x: 5 }}>
                  →
                </motion.span>
              </Link>
            </RevealOnScroll>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          INTERIOR IMAGE BREAK - with Parallax
      ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative h-[50vh] md:h-[60vh] overflow-hidden'>
          <motion.div
            className="absolute inset-0 bg-[url('/images/salon-interior-1.jpg')] bg-cover bg-center"
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            style={{ backgroundAttachment: 'fixed' }}
          />
          <div className='absolute inset-0 bg-navy/60' />
          <motion.div
            className='absolute inset-0 flex items-center justify-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}>
            <div className='text-center'>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-gold text-xs uppercase tracking-[0.4em] mb-4'>
                Le Marais, Paris
              </motion.p>
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className='text-4xl md:text-6xl font-title text-gold'>
                Un Cadre d&apos;Exception
              </motion.h2>
              {/* Decorative line */}
              <motion.div
                className='mt-8 mx-auto h-px bg-gold/50'
                initial={{ width: 0 }}
                whileInView={{ width: 100 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
          AVIS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='avis' className='bg-navy border-t border-gold/10'>
          <Container>
            <SectionTitle subtitle='Témoignages' title='Avis Clients' />

            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className='grid md:grid-cols-3 gap-8'>
              {reviews.map((review, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className='bg-dark/50 border border-gold/20 p-8 relative hover:border-gold/40 cursor-default'>
                  {/* Quote Icon - Animated */}
                  <motion.div
                    className='absolute -top-4 left-8'
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                    viewport={{ once: true }}>
                    <span className='text-gold text-5xl font-title'>&ldquo;</span>
                  </motion.div>

                  {/* Content */}
                  <div className='pt-4'>
                    <motion.p
                      className='text-cream/80 text-sm leading-relaxed mb-6 italic'
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}>
                      {review.text}
                    </motion.p>

                    {/* Author */}
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <motion.div
                          className='w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center'
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(175, 151, 120, 0.4)' }}>
                          <span className='text-gold text-sm font-title'>
                            {review.author.charAt(0)}
                          </span>
                        </motion.div>
                        <span className='text-cream text-sm'>{review.author}</span>
                      </div>
                      <StarRating rating={review.rating} animate={true} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          HORAIRES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='horaires' className='bg-dark'>
          <Container>
            <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
              {/* Hours Table */}
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-50px' }}
                variants={staggerContainer}
                className='order-2 lg:order-1'>
                <motion.div variants={fadeInUp} className='flex items-center gap-3 mb-6'>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className='w-10 h-px bg-gold origin-left'
                  />
                  <span className='text-gold text-xs uppercase tracking-[0.3em]'>Horaires</span>
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className='text-3xl md:text-4xl font-title text-gold mb-10'>
                  Horaires d&apos;Ouverture
                </motion.h2>

                <motion.div variants={staggerContainer} className='space-y-4'>
                  {hours.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ x: 10, backgroundColor: 'rgba(175, 151, 120, 0.05)' }}
                      transition={{ duration: 0.2 }}
                      className={`flex justify-between items-center py-3 px-2 border-b border-gold/10 ${
                        item.hours === 'Fermé' ? 'opacity-50' : ''
                      }`}>
                      <span className='text-cream/90'>{item.day}</span>
                      <motion.span
                        className={`${item.hours === 'Fermé' ? 'text-cream/50' : 'text-gold'}`}
                        whileHover={{ scale: 1.05 }}>
                        {item.hours}
                      </motion.span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={fadeInUp} className='mt-10'>
                  <Button href={PLANITY_URL}>Réserver un créneau</Button>
                </motion.div>
              </motion.div>

              {/* Image */}
              <RevealOnScroll className='relative order-1 lg:order-2'>
                <motion.div
                  className='relative aspect-4/3 overflow-hidden'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}>
                  <div className="absolute inset-0 bg-[url('/images/salon-interior-2.jpg')] bg-cover bg-center" />
                  <div className='absolute inset-0 bg-navy/20' />
                </motion.div>
                {/* Decorative Frame - Animated */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: -20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className='absolute -top-4 -left-4 w-full h-full border border-gold/30 -z-10'
                />
              </RevealOnScroll>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          CONTACT SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='contact' className='bg-navy border-t border-gold/10'>
          <Container>
            <SectionTitle subtitle='Nous Contacter' title='Contact' />

            <div className='grid lg:grid-cols-2 gap-12 lg:gap-20'>
              {/* Map / Image Side */}
              <RevealOnScroll className='relative'>
                <motion.div
                  className='relative aspect-4/3 overflow-hidden'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}>
                  <div className="absolute inset-0 bg-[url('/images/marais-paris.jpg')] bg-cover bg-center" />
                  <div className='absolute inset-0 bg-navy/40' />
                </motion.div>

                {/* Info Overlay - Animated */}
                <motion.div
                  className='absolute bottom-0 left-0 right-0 p-6'
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}>
                  <motion.div
                    className='bg-navy/90 backdrop-blur-sm border border-gold/30 p-6 space-y-4'
                    whileHover={{ borderColor: 'rgba(175, 151, 120, 0.5)' }}>
                    {[
                      { label: 'Adresse', value: '43 rue de Turenne, 75003 Paris' },
                      { label: 'Téléphone', value: '+33 1 42 72 00 00' },
                      { label: 'Email', value: 'contact@linstant-barbier.fr' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        viewport={{ once: true }}>
                        <p className='text-gold text-xs uppercase tracking-widest mb-2'>
                          {item.label}
                        </p>
                        <p className='text-cream'>{item.value}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </RevealOnScroll>

              {/* Form Side */}
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-50px' }}
                variants={staggerContainer}>
                <motion.p variants={fadeInUp} className='text-cream/70 mb-8 leading-relaxed'>
                  Remplissez vos coordonnées et nous vous recontacterons pour planifier votre
                  prochain rendez-vous.
                </motion.p>

                <motion.form
                  variants={staggerContainer}
                  onSubmit={handleSubmit}
                  className='space-y-6'>
                  <motion.div variants={fadeInUp} className='grid sm:grid-cols-2 gap-6'>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <motion.input
                        whileFocus={{ borderColor: 'rgba(175, 151, 120, 1)' }}
                        type='text'
                        placeholder='Votre nom'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className='w-full bg-transparent border border-gold/30 text-cream px-4 py-3 placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors'
                      />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <motion.input
                        whileFocus={{ borderColor: 'rgba(175, 151, 120, 1)' }}
                        type='tel'
                        placeholder='Téléphone'
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className='w-full bg-transparent border border-gold/30 text-cream px-4 py-3 placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors'
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <motion.input
                      whileFocus={{ borderColor: 'rgba(175, 151, 120, 1)' }}
                      type='email'
                      placeholder='Email'
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className='w-full bg-transparent border border-gold/30 text-cream px-4 py-3 placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors'
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <motion.textarea
                      whileFocus={{ borderColor: 'rgba(175, 151, 120, 1)' }}
                      placeholder='Message'
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className='w-full bg-transparent border border-gold/30 text-cream px-4 py-3 placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors resize-none'
                    />
                  </motion.div>

                  <motion.button
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(175, 151, 120, 0.9)' }}
                    whileTap={{ scale: 0.98 }}
                    type='submit'
                    className='w-full bg-gold text-navy py-4 uppercase tracking-widest text-sm font-medium hover:bg-gold/90 transition-colors'>
                    Envoyer le message
                  </motion.button>
                </motion.form>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM CTA & FOOTER INFO
      ═══════════════════════════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='bg-dark py-16 border-t border-gold/10'>
          <Container>
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={staggerContainer}
              className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              {/* Address */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                className='flex items-center gap-4'>
                <motion.div
                  className='w-10 h-10 border border-gold/30 flex items-center justify-center'
                  whileHover={{ borderColor: 'rgba(175, 151, 120, 0.6)', scale: 1.1 }}>
                  <svg
                    className='w-5 h-5 text-gold'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </motion.div>
                <div>
                  <p className='text-cream text-sm'>43 rue de Turenne, 75003 Paris</p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                className='flex items-center gap-4'>
                <motion.div
                  className='w-10 h-10 border border-gold/30 flex items-center justify-center'
                  whileHover={{ borderColor: 'rgba(175, 151, 120, 0.6)', scale: 1.1 }}>
                  <svg
                    className='w-5 h-5 text-gold'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                </motion.div>
                <div>
                  <p className='text-cream text-sm'>+33 1 42 72 00 00</p>
                </div>
              </motion.div>

              {/* Logo */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className='flex items-center gap-3'>
                <Image
                  src='/logo/logo-golden.svg'
                  alt="L'Instant Barbier"
                  width={40}
                  height={40}
                  className='h-10 w-10 object-contain'
                />
                <span className='font-title text-gold text-xl'>L&apos;Instant Barbier</span>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeInUp} className='flex items-center gap-4'>
                {['instagram', 'twitter'].map((social) => (
                  <motion.a
                    key={social}
                    href='#'
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(175, 151, 120, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className='w-10 h-10 border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors'>
                    {social === 'instagram' ? (
                      <svg
                        className='w-5 h-5 text-cream/80'
                        fill='currentColor'
                        viewBox='0 0 24 24'>
                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                      </svg>
                    ) : (
                      <svg
                        className='w-5 h-5 text-cream/80'
                        fill='currentColor'
                        viewBox='0 0 24 24'>
                        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                      </svg>
                    )}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </motion.section>
      </main>
      <Footer />
    </>
  )
}
