'use client'

import Container from '@/components/Container'
import Section from '@/components/Section'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'
import TextReveal from '@/components/TextReveal'
import { motion } from 'framer-motion'
import { LOGOS, VIDEO, GALLERY_IMAGES, TEAM, PRODUCT_GRID, BACKGROUNDS } from '@/lib/images'

// ═══════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════
// STATIC COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function ScrollProgressBar() {
  return null
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

function GalleryLightbox({
  images,
  currentIndex,
  onClose,
}: {
  images: { src: string; alt: string }[]
  currentIndex: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(currentIndex)

  const goTo = useCallback(
    (newIndex: number) => {
      setIndex(((newIndex % images.length) + images.length) % images.length)
    },
    [images.length],
  )

  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center' onClick={onClose}>
      <div className='absolute inset-0 bg-dark/95 backdrop-blur-md' />

      <button
        onClick={onClose}
        className='absolute top-6 right-6 z-50 w-12 h-12 border border-gold/40 flex items-center justify-center hover:bg-gold/10 transition-colors cursor-pointer'
        aria-label='Fermer'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          className='text-gold'>
          <line x1='4' y1='4' x2='16' y2='16' />
          <line x1='16' y1='4' x2='4' y2='16' />
        </svg>
      </button>

      <div className='absolute top-7 left-6 z-50 text-gold/60 text-xs uppercase tracking-[0.3em] font-body'>
        {index + 1} / {images.length}
      </div>

      <p className='absolute bottom-8 left-1/2 -translate-x-1/2 z-50 text-cream/50 text-xs uppercase tracking-[0.25em] font-body'>
        {images[index].alt}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation()
          goPrev()
        }}
        className='absolute left-4 md:left-8 z-50 w-12 h-12 border border-gold/30 flex items-center justify-center hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer'
        aria-label='Photo précédente'>
        <svg
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          className='text-gold'>
          <polyline points='12,3 6,9 12,15' />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          goNext()
        }}
        className='absolute right-4 md:right-8 z-50 w-12 h-12 border border-gold/30 flex items-center justify-center hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer'
        aria-label='Photo suivante'>
        <svg
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          className='text-gold'>
          <polyline points='6,3 12,9 6,15' />
        </svg>
      </button>

      <div
        className='relative w-full h-full flex items-center justify-center px-16 md:px-24 py-20'
        onClick={(e) => e.stopPropagation()}>
        <div className='relative w-full h-full max-w-5xl max-h-[80vh] mx-auto'>
          {/* Gold frame accent */}
          <div className='absolute -inset-[1px] border border-gold/20 pointer-events-none z-10' />
          <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/50 pointer-events-none z-10' />
          <div className='absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/50 pointer-events-none z-10' />
          <div className='absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/50 pointer-events-none z-10' />
          <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/50 pointer-events-none z-10' />

          <div
            className='w-full h-full bg-cover bg-center'
            style={{ backgroundImage: `url(${images[index].src})` }}
          />
        </div>
      </div>

      <div className='absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex gap-2'>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              goTo(i)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? 'bg-gold w-6' : 'bg-gold/30 hover:bg-gold/60'
            }`}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function SectionTitle({
  subtitle,
  title,
  className = '',
}: {
  subtitle?: string
  title: string
  className?: string
}) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {subtitle && (
        <div className='flex items-center justify-center gap-4 mb-4'>
          <span className='w-16 h-px bg-gradient-to-r from-transparent to-gold origin-right' />
          <span className='text-gold text-xs uppercase tracking-[0.3em]'>{subtitle}</span>
          <span className='w-16 h-px bg-gradient-to-r from-gold to-transparent origin-left' />
        </div>
      )}
      <h2 className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold leading-tight tracking-[-2px] mb-6'>
        {title}
      </h2>
      <div className='mx-auto mt-6 w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent' />
    </div>
  )
}

function StarRating({ rating }: { rating: number; animate?: boolean }) {
  return (
    <div className='flex gap-1'>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-cream/20'}`}
          fill='currentColor'
          viewBox='0 0 20 20'>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const services = [
  {
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <circle cx='6' cy='6' r='3' />
        <circle cx='6' cy='18' r='3' />
        <line x1='20' y1='4' x2='8.12' y2='15.88' />
        <line x1='14.47' y1='14.48' x2='20' y2='20' />
        <line x1='8.12' y1='8.12' x2='12' y2='12' />
      </svg>
    ),
    title: 'Cheveux – Coupe homme sur mesure',
    description:
      'Transformez votre style avec une coupe homme personnalisée, adaptée à votre morphologie et à vos envies. Du dégradé taper fade aux coupes classiques ou modernes, nous travaillons chaque détail pour un résultat net, équilibré et durable.',
    link: '/prestations',
  },
  {
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path d='M7 4h10' />
        <rect x='5' y='3' width='14' height='4' rx='1' />
        <line x1='12' y1='7' x2='12' y2='21' />
        <line x1='9' y1='21' x2='15' y2='21' />
      </svg>
    ),
    title: 'Barbe – Rituel barbier à Paris',
    description:
      "Offrez à votre barbe l'attention qu'elle mérite grâce à un rituel barbe complet : taille précise, serviettes chaudes et soins aux huiles essentielles, notamment à l'ylang-ylang. Un service idéal pour un rendu élégant, structuré et naturel.",
    link: '/prestations',
  },
  {
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path d='M12 21c-2.4-1.2-5.7-4-5.7-9 0-3.3 3.3-6.3 5.7-9 2.4 2.7 5.7 5.7 5.7 9 0 5-3.3 7.8-5.7 9z' />
        <path d='M12 21c1.8-1.5 5-5.5 5-9 0-3.5-3-5.5-5-5.5-2 0-5 2-5 5.5 0 3.5 3.2 7.5 5 9z' />
        <path d='M12 11c1.1 0 2.2.4 3 1 .8.6 1.3 1.5 1.7 2.5' />
        <path d='M12 11c-1.1 0-2.2.4-3 1-.8.6-1.3 1.5-1.7 2.5' />
      </svg>
    ),
    title: 'Soins – Soin visage homme & bien-être',
    description:
      'Nos soins visage homme à Paris sont conçus pour revitaliser la peau et les cheveux. Nous utilisons des produits haut de gamme pour hydrater, nourrir et offrir un véritable moment de détente dans un cadre apaisant.',
    link: '/prestations',
  },
]

const team = TEAM.map((member) => ({
  name: member.name,
  role: member.role,
  experience: member.experience,
  image: member.src,
}))

const galleryImages = GALLERY_IMAGES.map((img) => ({
  src: img.src,
  alt: img.shortAlt,
}))

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
  { day: 'Lundi', hours: '09:00 – 21:00' },
  { day: 'Mardi', hours: '09:00 – 21:00' },
  { day: 'Mercredi', hours: '09:00 – 21:00' },
  { day: 'Jeudi', hours: '09:00 – 21:00' },
  { day: 'Vendredi', hours: '09:00 – 21:00' },
  { day: 'Samedi', hours: '09:00 – 20:00' },
  { day: 'Dimanche', hours: '10:00 – 20:00' },
]

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => console.log('Video play failed:', error))
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  // Particles removed for performance/anim cleanup as requested
  // Parallax logic removed

  return (
    <>
      <ScrollProgressBar />
      <main className='grow'>
        {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative min-h-screen flex items-center overflow-hidden'>
          {/* Static Background Patterns */}
          <div className='absolute inset-0 opacity-10 hidden md:block'>
            <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]' />
            <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]' />
          </div>

          {/* Background Image - extends behind header */}
          <div className='absolute inset-0'>
            <div className='absolute inset-0 scale-110'>
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url('${BACKGROUNDS.homeHero.src}')` }}
              />
              {/* Main gradient overlay - stronger on left for text readability */}
              <div
                className='absolute inset-0'
                style={{
                  background:
                    'linear-gradient(to right, rgba(7, 24, 30, 0.96) 0%, rgba(7, 24, 30, 0.90) 35%, rgba(7, 24, 30, 0.60) 65%, transparent 100%)',
                }}
              />
              {/* Subtle vignette effect */}
              <div
                className='absolute inset-0'
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 0%, rgba(7, 24, 30, 0.3) 100%)',
                }}
              />
            </div>
          </div>

          {/* Decorative Gold Line */}
          <div className='absolute left-0 top-0 h-full w-[1.5px] bg-gradient-to-b from-transparent via-gold/60 to-transparent origin-top opacity-40'></div>

          {/* Grid Overlay */}
          <div className='absolute inset-0 bg-[linear-gradient(rgba(156,131,88,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(156,131,88,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]' />

          {/* Content - True vertical centering */}
          <div className='relative z-10 w-full pt-20 translate-y-[100px] md:translate-y-[0px]'>
            <Container>
              <div className='max-w-4xl'>
                {/* Main Title - Grand Badge Design */}
                {/* Mobile Stats - Text Style at Top */}
                <div className='flex flex-row items-center mx-auto justify-between gap-4 md:hidden max-w-md mb-8 translate-y-[-240px]'>
                  {[
                    { label: 'Expérience', val: '23 ans' },
                    { label: 'Avis Google', val: '★★★★★' },
                    { label: 'Clients', val: '2000+' },
                  ].map((stat, i) => (
                    <Reveal key={i} variant='fade-up' delay={0.1 + i * 0.1}>
                      <div className='flex flex-col items-center'>
                        <span className='text-2xl font-title text-gold font-light leading-none mb-1'>
                          {stat.val}
                        </span>
                        <span className='text-[0.6rem] text-cream/60 tracking-[0.1em] font-light uppercase leading-tight'>
                          {stat.label}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>

                {/* Main Title - Grand Badge Design */}
                <div className='mb-6'>
                  <Reveal variant='blur-in' delay={0.3} duration={0.9}>
                    <div className='relative block lg:inline-block group ml-0 lg:ml-[-8px]'>
                      {/* Badge Content - New Asymmetric Design */}
                      <h1 className='relative flex flex-col items-center md:items-start lg:items-center justify-center text-center md:text-left lg:text-center bg-navy/20 backdrop-blur-sm'>
                        {/* Main Composition */}
                        <span className='relative flex flex-col items-center md:items-start lg:items-center justify-center lg:mb-8'>
                          {/* Center Content - Mobile: stacked, Tablet: one line, Desktop: stacked */}
                          <span className='flex flex-col gap-2 md:gap-3 lg:gap-0 items-center md:items-start lg:items-center'>
                            {/* COIFFEUR */}
                            <span className='text-6xl md:text-7xl lg:text-8xl text-gold leading-[0.8] tracking-[-0.02em]'>
                              COIFFEUR
                            </span>

                            {/* & BARBIER - Mobile: flex row, Tablet: continue same row, Desktop: flex row */}
                            <span className='flex items-center gap-4 md:gap-6'>
                              <span className='text-6xl md:text-7xl lg:text-8xl text-gold leading-none'>
                                &
                              </span>
                              <span className='text-6xl md:text-7xl lg:text-8xl text-gold leading-none tracking-[-0.04em]'>
                                BARBIER
                              </span>
                            </span>
                          </span>
                        </span>

                        {/* Bottom Script with Lines - 280px gap on tablet only */}
                        <span className='flex items-center gap-4 w-full justify-center md:justify-start lg:justify-center lg:mb-8 mt-2 md:mt-[4px] lg:mt-[-20px]'>
                          <span className='h-[1px] w-8 md:w-24 bg-gradient-to-r from-transparent to-gold/50' />
                          <span className='text-xl lg:text-3xl italic text-gold/80 tracking-[0.01em] font-light [text-shadow:0_2px_16px_rgba(7,24,30,0.8)]'>
                            à Paris le Marais
                          </span>
                          <span className='h-[1px] w-8 md:w-24 bg-gradient-to-l from-transparent to-gold/50' />
                        </span>
                      </h1>
                      <Reveal variant='fade-up' delay={0.7} duration={0.7}>
                        <div className='relative flex mt-8 mb-4 md:translate-y-24 lg:translate-y-0 justify-center items-center'>
                          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-gold/15 blur-3xl rounded-full animate-cta-glow' />
                          <Button href='/reservation'>Prendre rendez-vous</Button>
                        </div>
                      </Reveal>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Container>
          </div>

          {/* Desktop & Tablet Stats - Right side */}
          <div className='hidden md:block absolute top-1/2 -translate-y-1/2 right-6 md:right-8 lg:right-12 xl:right-20 z-20'>
            <div className='flex flex-col gap-6'>
              {[
                { label: 'Années d\u2019expérience', val: '23+' },
                { label: 'Clients satisfaits', val: '2000+' },
                { label: 'Note Google', val: '5★' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className='flex items-center gap-3 md:gap-5 lg:gap-6 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-2xl px-4 py-3 md:px-6 md:py-4 xl:px-8 lg:py-6 shadow-2xl ring-1 ring-white/[0.02] animate-slide-in-up opacity-0 transition-all duration-300'
                  style={{ animationDelay: `${800 + i * 200}ms` }}>
                  <div className='text-3xl lg:text-6xl font-title text-gold font-light leading-none'>
                    {stat.val}
                  </div>
                  <div className='text-[0.6rem] lg:text-xs text-cream/60 tracking-[0.15em] font-light leading-tight uppercase max-w-[70px]'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Logo Marquee */}
          <div className='absolute bottom-0 left-0 w-full h-24 overflow-hidden z-20 flex items-end pointer-events-none'>
            <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent' />
            <div className='flex items-center w-max animate-marquee-rtl relative z-10'>
              {[...Array(30)].map((_, i) => (
                <div key={i} className='shrink-0 px-6 lg:px-10 opacity-25'>
                  <Image
                    src={LOGOS.golden.src}
                    alt={LOGOS.golden.alt}
                    width={200}
                    height={100}
                    className='w-auto h-14 lg:h-20 object-contain'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Corners */}
          <div className='absolute top-32 right-16 w-24 h-24 border-t border-r border-gold/15 hidden md:block'></div>
          <div className='absolute bottom-32 left-16 w-24 h-24 border-b border-l border-gold/15 hidden md:block'></div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
          À PROPOS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='a-propos' className='bg-navy relative overflow-hidden py-16 md:py-24 lg:py-32'>
          <div className='absolute inset-0 pointer-events-none opacity-5'>
            <motion.div
              className='absolute top-1/4 right-1/4 w-96 h-96 border border-gold/10'
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className='absolute bottom-1/4 left-1/4 w-64 h-64 border border-gold/10'
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <Container>
            <div className='flex items-center justify-center gap-4 mb-16'>
              <motion.div
                className='w-16 h-px bg-gradient-to-r from-transparent to-gold'
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <TextReveal
                className='text-gold text-[10px] uppercase tracking-[0.4em] font-medium'
                delay={0.4}>
                À propos
              </TextReveal>
              <motion.div
                className='w-16 h-px bg-gradient-to-r from-gold to-transparent'
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </Container>

          <div className='max-w-7xl mx-auto px-5 md:px-6 lg:px-12'>
            <div className='grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center'>
              <motion.div
                className='relative'
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                <div className='relative'>
                  <motion.div
                    className='relative aspect-[9/16] md:aspect-[4/5] overflow-hidden group border-2 border-gold/30 shadow-xl'
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}>
                    <video
                      ref={videoRef}
                      loop
                      muted
                      playsInline
                      className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'>
                      <source src={VIDEO.aboutSection.src} type={VIDEO.aboutSection.type} />
                    </video>
                    <div className='absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent' />
                  </motion.div>
                  {/* Corner accents - outside frame, not affected by hover */}
                  <div className='absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-gold/40 pointer-events-none' />
                  <div className='absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-gold/40 pointer-events-none' />
                </div>
              </motion.div>

              <div className='space-y-12 lg:space-y-16'>
                {/* Logo stamp - bottom left */}
                <Image
                  src={LOGOS.linstant.src}
                  alt=''
                  width={250}
                  height={250}
                  className='absolute bottom-20 left-10 opacity-[0.03] -rotate-12 select-none pointer-events-none z-0'
                  aria-hidden='true'
                />
                {/* Headline */}
                <div className='mb-4 xl:mb-14'>
                  <h2 className='flex items-baseline gap-3'>
                    <motion.span
                      className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold font-light leading-none'
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}>
                      23
                    </motion.span>
                    <span className='flex flex-col'>
                      <TextReveal
                        className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-title text-gold/80 uppercase tracking-[1px]'
                        delay={0.4}>
                        ans
                      </TextReveal>
                    </span>
                  </h2>
                  <div className='flex justify-start mb-6'>
                    <TextReveal
                      className='text-2xl md:text-3xl lg:text-4xl font-title text-cream/60 leading-[0.8] xl:leading-[-0.05em] tracking-[1px] mt-[-10px] xl:mt-[-24px]'
                      delay={0.5}>
                      au service du style masculin
                    </TextReveal>
                  </div>
                  <motion.div
                    className='w-20 h-px bg-linear-to-r from-gold via-gold/40 to-transparent'
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                </div>

                {/* Description */}
                <div className='space-y-6'>
                  <div className='flex justify-start'>
                    <TextReveal
                      className='text-cream/95 text-lg lg:text-xl leading-[1.7] tracking-wide font-light'
                      delay={0.8}
                      stagger={0.02}>
                      Fondé par Riccardo, maître barbier reconnu, nous maîtrisons les techniques
                      classiques comme les tendances contemporaines.
                    </TextReveal>
                  </div>
                  <div className='flex justify-start'>
                    <TextReveal
                      className='text-cream/70 text-base leading-[1.7] tracking-wide'
                      delay={1}
                      stagger={0.015}>
                      Du taper fade au rasage traditionnel à la serviette chaude, chaque geste est
                      précis.
                    </TextReveal>
                  </div>
                </div>

                {/* Benefits */}
                <div className='space-y-4'>
                  <motion.div
                    className='flex items-center gap-4 group'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 1.2 }}>
                    <div className='flex-shrink-0 relative'>
                      <motion.div
                        className='w-14 h-14 flex items-center justify-center border border-gold/30 bg-gold/5'
                        whileHover={{
                          borderColor: 'rgba(156, 131, 88, 0.6)',
                          backgroundColor: 'rgba(156, 131, 88, 0.1)',
                        }}
                        transition={{ duration: 0.3 }}>
                        <svg
                          className='w-7 h-7 text-gold'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'>
                          <circle cx='6' cy='6' r='3' />
                          <circle cx='6' cy='18' r='3' />
                          <line x1='20' y1='4' x2='8.12' y2='15.88' />
                          <line x1='14.47' y1='14.48' x2='20' y2='20' />
                          <line x1='8.12' y1='8.12' x2='12' y2='12' />
                        </svg>
                      </motion.div>
                      <div className='absolute -top-2 -right-2 text-[10px] font-title text-gold/40 tracking-wider'>
                        01
                      </div>
                    </div>
                    <div className='flex-1 pt-1'>
                      <h3 className='text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-2'>
                        Savoir-faire artisanal
                      </h3>
                      <p className='text-cream/75 text-sm leading-[1.6]'>
                        Formés aux meilleures écoles, nous perpétuons les gestes authentiques du
                        métier avec passion et rigueur.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className='flex items-center gap-4 group'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 1.4 }}>
                    <div className='flex-shrink-0 relative'>
                      <motion.div
                        className='w-14 h-14 flex items-center justify-center border border-gold/30 bg-gold/5'
                        whileHover={{
                          borderColor: 'rgba(156, 131, 88, 0.6)',
                          backgroundColor: 'rgba(156, 131, 88, 0.1)',
                        }}
                        transition={{ duration: 0.3 }}>
                        <svg
                          className='w-7 h-7 text-gold'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'>
                          <path d='M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z' />
                          <path d='M20 3v4' />
                          <path d='M22 5h-4' />
                          <path d='M4 17v2' />
                          <path d='M5 18H3' />
                        </svg>
                      </motion.div>
                      <div className='absolute -top-2 -right-2 text-[10px] font-title text-gold/40 tracking-wider'>
                        02
                      </div>
                    </div>
                    <div className='flex-1 pt-1'>
                      <h3 className='text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-2'>
                        Produits premium
                      </h3>
                      <p className='text-cream/75 text-sm leading-[1.6]'>
                        Huiles essentielles, baumes naturels et cosmétiques haut de gamme pour un
                        résultat impeccable.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16'>
              {PRODUCT_GRID.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}>
                  <motion.div
                    className='relative aspect-square overflow-hidden group border border-gold/30 shadow-xl cursor-pointer'
                    whileHover={{ borderColor: 'rgba(156, 131, 88, 0.6)', scale: 1.05 }}
                    transition={{ duration: 0.3 }}>
                    <div
                      className='absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110'
                      style={{ backgroundImage: `url('${img.src}')` }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent' />
                    {/* Corner accent */}
                    <motion.div
                      className='absolute top-0 left-0 border-t border-l border-gold/20'
                      initial={{ width: 24, height: 24 }}
                      whileHover={{ width: 40, height: 40, borderColor: 'rgba(156, 131, 88, 0.5)' }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className='absolute bottom-0 right-0 border-b border-r border-gold/20'
                      initial={{ width: 24, height: 24 }}
                      whileHover={{ width: 40, height: 40, borderColor: 'rgba(156, 131, 88, 0.5)' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className='flex justify-center mt-12'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}>
              <Button href='/salon'>Découvrir notre univers</Button>
            </motion.div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='services' className='bg-navy border-t border-gold/10 relative overflow-hidden'>
          {/* Decorative background elements */}
          <div className='absolute inset-0 pointer-events-none'>
            {/* Logo stamp - top right */}
            <Image
              src={LOGOS.linstant.src}
              alt=''
              width={200}
              height={200}
              className='absolute top-10 right-10 opacity-[0.04] rotate-12 select-none'
              aria-hidden='true'
            />
            {/* Large watermark ampersand */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] md:text-[35rem] lg:text-[45rem] font-title text-gold select-none leading-none opacity-[0.03]'>
              &
            </div>
            {/* Gradient orbs */}
            <div className='absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl' />
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl' />
          </div>

          <Container className='relative z-10'>
            <Reveal variant='fade-up'>
              <div className='text-center mb-16'>
                {/* Subtitle */}
                <div className='flex items-center justify-center gap-4 mb-6'>
                  <span className='w-16 h-px bg-gradient-to-r from-transparent to-gold origin-right' />
                  <span className='text-gold text-xs uppercase tracking-[0.3em]'>Nos Services</span>
                  <span className='w-16 h-px bg-gradient-to-r from-gold to-transparent origin-left' />
                </div>

                {/* Large Title */}
                <h2 className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold leading-tight tracking-[-2px] mb-6'>
                  Prestations
                </h2>

                {/* Decorative line */}
                <div className='mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent' />
              </div>
            </Reveal>

            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
              {services.map((service, index) => (
                <Reveal key={index} variant='fade-up' delay={index * 0.1}>
                  <TiltCard>
                    <article className='group text-center p-8 border border-gold/20 hover:border-gold/50 transition-all duration-500 relative overflow-hidden h-full'>
                      {/* Icon */}
                      <div className='flex justify-center mb-6 relative z-10'>
                        <div className='text-gold'>{service.icon}</div>
                      </div>

                      {/* Title */}
                      <h3 className='text-lg h-12 font-title text-gold mb-4 uppercase tracking-wide leading-tight relative z-10'>
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className='text-cream/70 h-40 text-sm leading-relaxed mb-6 relative z-10'>
                        {service.description}
                      </p>

                      {/* En savoir plus link */}
                      <Link
                        href={service.link}
                        className='inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest hover:text-cream transition-colors group relative z-10'>
                        En savoir plus
                        <span>→</span>
                      </Link>
                    </article>
                  </TiltCard>
                </Reveal>
              ))}
            </div>

            <Reveal variant='fade-up' delay={0.3} className='text-center mt-12'>
              <Button href='/prestations'>Voir les tarifs</Button>
            </Reveal>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          ATMOSPHÈRE SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative py-20 md:py-32 lg:py-40 xl:py-52 bg-dark overflow-hidden'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed'
            style={{ backgroundImage: `url('${BACKGROUNDS.homeAtmosphere.src}')` }}
          />
          <div className='absolute inset-0 bg-dark/85' />
          <Container className='relative z-10'>
            <div className='max-w-2xl lg:max-w-4xl mx-auto text-center'>
              <Reveal variant='fade-up'>
                <div className='flex items-center justify-center gap-4 mb-16 lg:mb-20'>
                  <span className='w-16 h-px bg-gradient-to-r from-transparent to-gold' />
                  <span className='text-gold text-[11px] uppercase tracking-[0.4em] font-body'>
                    Atmosphère
                  </span>
                  <span className='w-16 h-px bg-gradient-to-r from-gold to-transparent' />
                </div>
              </Reveal>

              <div className='w-14 h-px bg-gold/25 mx-auto mb-14 lg:mb-18 origin-center' />

              <div className='mb-14 lg:mb-18 space-y-2'>
                <div className='flex justify-center gap-x-3 md:gap-x-4'>
                  <TextReveal className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold leading-[0.8] tracking-[-2px] lg:tracking-[-4px]'>
                    Un
                  </TextReveal>
                  <TextReveal
                    className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-cream/60 leading-[0.8] tracking-[-2px] lg:tracking-[-4px]'
                    delay={0.05}>
                    salon
                  </TextReveal>
                </div>
                <div className='flex justify-center gap-x-3 md:gap-x-4'>
                  <TextReveal
                    className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-cream/60 leading-[0.8] tracking-[-2px] lg:tracking-[-4px]'
                    delay={0.1}>
                    de
                  </TextReveal>
                  <TextReveal
                    className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold leading-[0.8] tracking-[-2px] lg:tracking-[-4px]'
                    delay={0.15}>
                    barbier
                  </TextReveal>
                </div>
                <div className='flex justify-center'>
                  <TextReveal
                    className='font-title text-gold text-2xl md:text-3xl lg:text-[3.5rem] leading-[1.2] tracking-[-2px] lg:tracking-[-4px]'
                    delay={0.2}>
                    dans le Marais
                  </TextReveal>
                </div>
                <div className='flex justify-center '>
                  <TextReveal
                    className='font-title text-cream/70 text-2xl md:text-3xl lg:text-[3.5rem] leading-[0.5] tracking-[-2px] lg:tracking-[-4px] italic'
                    delay={0.4}>
                    au style
                  </TextReveal>
                  <TextReveal
                    className='font-title text-gold text-2xl md:text-3xl lg:text-[3.5rem] leading-[0.5] tracking-[-1px] lg:tracking-[-4px] italic'
                    delay={0.45}>
                    unique
                  </TextReveal>
                </div>
              </div>

              <div className='w-10 h-px bg-gold/15 mx-auto mb-12 lg:mb-16 origin-center' />

              <div className='max-w-xl mx-auto mb-10 lg:mb-12'>
                <div className='flex justify-center mb-6'>
                  <TextReveal
                    className='text-cream/80 text-base md:text-lg leading-[1.9] font-body text-center'
                    delay={0.6}
                    stagger={0.02}>
                    L&apos;Instant Barbier, c&apos;est aussi une ambiance : lumière chaleureuse,
                    matières nobles, lignes épurées et atmosphère feutrée.
                  </TextReveal>
                </div>
                <div className='flex justify-center'>
                  <TextReveal
                    className='text-cream/50 text-sm md:text-[15px] leading-[1.9] font-body italic text-center'
                    delay={0.8}
                    stagger={0.02}>
                    Chaque détail du salon reflète notre exigence et notre vision du barbier moderne
                    à Paris.
                  </TextReveal>
                </div>
              </div>

              <div className='w-20 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent mx-auto mt-16 lg:mt-20 origin-center' />
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
          ÉQUIPE SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='equipe' className='bg-dark'>
          <Container>
            <Reveal variant='fade-up'>
              <SectionTitle subtitle='Les Experts' title='Notre Équipe' />
            </Reveal>

            <div className='grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start'>
              <div>
                {team.map((member, index) => (
                  <Reveal key={index} variant='scale-up' delay={index * 0.1} threshold={0.2}>
                    <article className='group relative overflow-hidden'>
                      <div className='relative aspect-3/4 overflow-hidden bg-navy'>
                        <div
                          className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
                          style={{ backgroundImage: `url(${member.image})` }}
                        />
                        <div className='absolute inset-0 bg-linear-to-t from-navy via-navy/20 to-transparent' />
                        {/* Corner accent */}
                        <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                        <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                      </div>

                      <div className='absolute bottom-0 left-0 right-0 p-6 text-center'>
                        <div className='bg-navy/80 backdrop-blur-sm border border-gold/30 p-4 transition-colors group-hover:border-gold/60'>
                          <h3 className='text-xl font-title text-gold mb-1'>{member.name}</h3>
                          <p className='text-cream/90 text-sm mb-2'>{member.role}</p>
                          <p className='text-gold/70 text-xs uppercase tracking-wider'>
                            {member.experience}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              <div className='flex flex-col justify-center lg:py-8'>
                <Reveal variant='fade-side' delay={0.2}>
                  <div className='flex items-center gap-4 mb-10'>
                    <div className='w-12 h-px bg-gold/30 origin-left' />
                    <span className='text-gold/60 text-[11px] uppercase tracking-[0.4em] font-body'>
                      Héritage & Savoir-faire
                    </span>
                  </div>

                  <div className='space-y-10'>
                    {/* Heritage Block */}
                    <div className='relative pl-6 border-l-2 border-gold/20'>
                      <p className='text-cream/90 text-lg leading-relaxed font-title italic mb-4'>
                        &ldquo;Depuis plusieurs générations, l&apos;art de la{' '}
                        <span className='text-gold'>coiffure masculine</span> se transmet comme un
                        véritable héritage.&rdquo;
                      </p>
                      <p className='text-cream/60 text-sm leading-relaxed font-body tracking-wide'>
                        De père en fils, ce savoir-faire s&apos;est enrichi, porté par une exigence
                        constante de précision et d&apos;élégance.
                      </p>
                    </div>

                    {/* Expertise Block */}
                    <div>
                      <h4 className='text-gold text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-4'>
                        <span className='w-2 h-2 rounded-full border border-gold/40'></span>
                        Expertise Technique
                      </h4>

                      <div className='grid sm:grid-cols-2 gap-x-8 gap-y-4'>
                        {[
                          'Dégradés maîtrisés',
                          'Coupes aux ciseaux',
                          'Cheveux mi-longs',
                          'Tailleur de barbe',
                        ].map((technique, i) => (
                          <div key={i} className='group flex items-center gap-3'>
                            <div className='w-1.5 h-1.5 bg-gold/40 rotate-45 group-hover:bg-gold transition-colors duration-300' />
                            <span className='text-cream/70 text-sm tracking-wide group-hover:text-cream/90 transition-colors duration-300'>
                              {technique}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='pt-4 flex justify-center lg:justify-start'>
                      <Button href='/reservation?staff=Riccardo'>Réserver avec Riccardo</Button>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          GALERIE SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='galerie' className='bg-navy border-t border-gold/10 relative overflow-hidden'>
          {/* Decorative background elements */}
          <div className='absolute inset-0 pointer-events-none'>
            {/* Logo stamp - bottom right */}
            <Image
              src={LOGOS.linstant.src}
              alt=''
              width={180}
              height={180}
              className='absolute bottom-20 right-10 opacity-[0.04] rotate-6 select-none'
              aria-hidden='true'
            />
            {/* Large watermark scissors icon */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]'>
              <svg
                className='w-[25rem] h-[25rem] md:w-[35rem] md:h-[35rem] lg:w-[45rem] lg:h-[45rem] text-gold'
                viewBox='0 0 24 24'
                fill='currentColor'>
                <circle cx='6' cy='6' r='3' />
                <circle cx='6' cy='18' r='3' />
                <line
                  x1='20'
                  y1='4'
                  x2='8.12'
                  y2='15.88'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  fill='none'
                />
                <line
                  x1='14.47'
                  y1='14.48'
                  x2='20'
                  y2='20'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  fill='none'
                />
                <line
                  x1='8.12'
                  y1='8.12'
                  x2='12'
                  y2='12'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  fill='none'
                />
              </svg>
            </div>
            {/* Gradient orbs */}
            <div className='absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl' />
            <div className='absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl' />
          </div>

          <Container className='relative z-10'>
            <Reveal variant='fade-up'>
              <div className='text-center mb-16'>
                {/* Subtitle */}
                <div className='flex items-center justify-center gap-4 mb-6'>
                  <span className='w-16 h-px bg-gradient-to-r from-transparent to-gold origin-right' />
                  <span className='text-gold text-xs uppercase tracking-[0.3em]'>
                    Notre Travail
                  </span>
                  <span className='w-16 h-px bg-gradient-to-r from-gold to-transparent origin-left' />
                </div>

                {/* Large Title */}
                <h2 className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold leading-tight tracking-[-2px] mb-6'>
                  Galerie
                </h2>

                {/* Decorative line */}
                <div className='mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent' />
              </div>
            </Reveal>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4'>
              {/* Large Image */}
              <div className='col-span-2 row-span-2 aspect-square md:aspect-auto'>
                <Reveal variant='scale-up' threshold={0.2} className='h-full'>
                  <div
                    onClick={() => setLightboxIndex(0)}
                    className='relative w-full h-full overflow-hidden group cursor-pointer'>
                    <div
                      className='absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110'
                      style={{ backgroundImage: `url(${galleryImages[0].src})` }}
                    />
                    <div className='absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500' />
                    {/* Corner accent */}
                    <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                    <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
                      <div className='absolute inset-0 bg-navy/50 backdrop-blur-[2px]' />
                      <div className='relative w-12 h-12 border border-gold/60 flex items-center justify-center'>
                        <span className='text-gold text-2xl'>+</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Smaller Images */}
              {galleryImages.slice(1).map((image, index) => (
                <Reveal
                  key={index}
                  variant='scale-up'
                  delay={0.1 * (index + 1)}
                  threshold={0.2}
                  className='aspect-square'>
                  <div className='aspect-square'>
                    <div
                      onClick={() => setLightboxIndex(index + 1)}
                      className='relative w-full h-full overflow-hidden group cursor-pointer'>
                      <div
                        className='absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110'
                        style={{ backgroundImage: `url(${image.src})` }}
                      />
                      <div className='absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500' />
                      {/* Corner accent */}
                      <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                      <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                      <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
                        <div className='absolute inset-0 bg-navy/50 backdrop-blur-[2px]' />
                        <div className='relative w-9 h-9 border border-gold/60 flex items-center justify-center'>
                          <span className='text-gold text-lg'>+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal variant='fade-up' delay={0.2} className='text-center mt-10'>
              <Link
                href='/galerie'
                className='inline-flex items-center gap-2 text-gold text-sm uppercase tracking-widest hover:text-cream transition-colors group'>
                Voir plus
                <span>→</span>
              </Link>
            </Reveal>
          </Container>
        </Section>

        {lightboxIndex !== null && (
          <GalleryLightbox
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}

        {/* ═══════════════════════════════════════════════════════════════════
          INTERIOR IMAGE BREAK
      ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative h-[50vh] md:h-[60vh] overflow-hidden'>
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{
              backgroundImage: `url('${BACKGROUNDS.homeInterior.src}')`,
              backgroundAttachment: 'fixed',
            }}
          />
          <div className='absolute inset-0 bg-navy/60' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <Reveal variant='fade-up' duration={1}>
              <div className='text-center'>
                <Reveal variant='fade-up' delay={0.2}>
                  <div className='flex items-center justify-center gap-4 mb-4'>
                    <span className='w-16 h-px bg-gradient-to-r from-transparent to-gold' />
                    <span className='text-gold text-xs uppercase tracking-[0.4em]'>
                      Le Marais, Paris
                    </span>
                    <span className='w-16 h-px bg-gradient-to-r from-gold to-transparent' />
                  </div>
                </Reveal>
                <Reveal variant='blur-in' delay={0.4} duration={1.2}>
                  <h2 className='text-5xl md:text-7xl lg:text-8xl font-title text-gold'>
                    Un Cadre d&apos;Exception
                  </h2>
                </Reveal>
                <Reveal variant='scale-up' delay={0.6}>
                  <div className='mt-8 mx-auto h-px bg-gold/50 w-24' />
                </Reveal>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
          AVIS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='avis' className='bg-navy border-t border-gold/10 relative overflow-hidden'>
          {/* Decorative background elements */}
          <div className='absolute inset-0 pointer-events-none'>
            {/* Logo stamp - top left */}
            <Image
              src={LOGOS.linstant.src}
              alt=''
              width={220}
              height={220}
              className='absolute top-10 left-10 opacity-[0.04] -rotate-6 select-none'
              aria-hidden='true'
            />
            {/* Large watermark quote */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] md:text-[35rem] lg:text-[45rem] font-serif text-gold select-none leading-none opacity-[0.03]'>
              &ldquo;
            </div>
            {/* Gradient orbs */}
            <div className='absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl' />
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl' />
          </div>

          <Container className='relative z-10'>
            <Reveal variant='fade-up'>
              <div className='text-center mb-16'>
                {/* Subtitle */}
                <div className='flex items-center justify-center gap-4 mb-6'>
                  <span className='w-16 h-px bg-gradient-to-r from-transparent to-gold origin-right' />
                  <span className='text-gold text-xs uppercase tracking-[0.3em]'>Témoignages</span>
                  <span className='w-16 h-px bg-gradient-to-r from-gold to-transparent origin-left' />
                </div>

                {/* Large Title */}
                <h2 className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold leading-tight tracking-[-2px] mb-6'>
                  Avis Clients
                </h2>

                {/* Decorative line */}
                <div className='mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent' />
              </div>
            </Reveal>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
              {reviews.map((review, index) => (
                <Reveal key={index} variant='fade-up' delay={index * 0.15} threshold={0.1}>
                  <article className='bg-dark/50 border border-gold/20 p-8 relative hover:border-gold/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/10 cursor-default transition-all duration-500 h-full overflow-visible group/review flex flex-col'>
                    <div className='absolute -top-10 left-6'>
                      <span className='text-gold text-[4rem] md:text-[5.5rem] leading-normal font-title opacity-90 group-hover/review:opacity-100 transition-opacity duration-500'>
                        &ldquo;
                      </span>
                    </div>

                    <div className='pt-4 flex flex-col flex-1'>
                      <p className='text-cream/80 text-sm leading-relaxed mb-6 italic flex-1'>
                        {review.text}
                      </p>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover/review:bg-gold/30 transition-colors duration-500'>
                            <span className='text-gold text-sm font-title'>
                              {review.author.charAt(0)}
                            </span>
                          </div>
                          <span className='text-cream text-sm'>{review.author}</span>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className='text-center mt-12'>
              <a
                href='https://maps.app.goo.gl/n37HSH1uoHfUEB5R8'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-3 text-gold text-sm uppercase tracking-[0.2em] hover:text-cream transition-colors duration-500 group'>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='text-gold group-hover:text-cream transition-colors duration-500'>
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 16.09V13.5H8l4-7.09v4.59H14.5l-3.91 7.09z' />
                </svg>
                Voir tous les avis sur Google
                <span>→</span>
              </a>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          HORAIRES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='horaires' className='bg-dark'>
          <Container>
            <div>
              <Reveal variant='fade-up'>
                <div className='flex items-center justify-center gap-4 mb-8'>
                  <span className='w-16 h-px bg-gradient-to-r from-transparent to-gold' />
                  <span className='text-gold text-xs uppercase tracking-[0.3em] font-body'>
                    Informations pratiques
                  </span>
                  <span className='w-16 h-px bg-gradient-to-r from-gold to-transparent' />
                </div>
              </Reveal>

              <Reveal variant='fade-up' delay={0.2}>
                <h2 className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold leading-[0.8] tracking-[-2px] mb-16 text-center'>
                  Votre barbier <br /> à Paris — Le Marais
                </h2>
              </Reveal>

              <div className='grid lg:grid-cols-2 gap-16 lg:gap-24'>
                <div>
                  <Reveal variant='fade-up' delay={0.3}>
                    <h3 className='text-lg font-title text-gold/90 mb-6 tracking-wide'>
                      Horaires d&apos;ouverture
                    </h3>
                  </Reveal>

                  <div className='space-y-0'>
                    {hours.map((item, index) => (
                      <Reveal
                        key={index}
                        variant='fade-side'
                        delay={0.4 + index * 0.05}
                        threshold={0.1}>
                        <div
                          className={`flex justify-between items-center py-3.5 border-b border-gold/8 ${
                            item.hours === 'Fermé' ? 'opacity-40' : ''
                          }`}>
                          <span className='text-cream/80 text-[15px] font-body'>{item.day}</span>
                          <span
                            className={`text-[15px] font-body tracking-wide ${
                              item.hours === 'Fermé' ? 'text-cream/40 italic' : 'text-gold/80'
                            }`}>
                            {item.hours}
                          </span>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  <Reveal variant='fade-up' delay={0.8}>
                    <div className='mt-12'>
                      <Button href='/reservation'>Réserver un créneau</Button>
                    </div>
                  </Reveal>
                </div>

                <Reveal variant='scale-up' delay={0.4} threshold={0.2}>
                  <div className='relative group'>
                    <div className='relative aspect-4/3 lg:aspect-auto lg:h-full min-h-[300px] md:min-h-[400px] overflow-hidden'>
                      <div
                        className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105'
                        style={{ backgroundImage: `url('${BACKGROUNDS.homeSchedule.src}')` }}
                      />
                      <div className='absolute inset-0 bg-dark/15' />
                    </div>
                    {/* Corner accent */}
                    <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                    <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          CONTACT SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='contact' className='bg-navy border-t border-gold/10'>
          <Container>
            <Reveal variant='fade-up'>
              <SectionTitle subtitle='Nous Contacter' title='Contact' />
            </Reveal>

            <div className='grid lg:grid-cols-2 gap-12 lg:gap-20'>
              <Reveal variant='scale-up' delay={0.2} threshold={0.2}>
                <div className='relative'>
                  <div className='relative aspect-4/3 overflow-hidden group hover:scale-[1.02] transition-transform duration-500'>
                    <div
                      className='absolute inset-0 bg-cover bg-center'
                      style={{ backgroundImage: `url('${BACKGROUNDS.homeMap.src}')` }}
                    />
                    <div className='absolute inset-0 bg-navy/40' />
                    {/* Corner accent */}
                    <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                    <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                  </div>

                  <div className='absolute bottom-0 left-0 right-0 p-6'>
                    <div className='bg-navy/90 backdrop-blur-sm border border-gold/30 p-4 md:p-6 space-y-3 md:space-y-4'>
                      {[
                        { label: 'Adresse', value: '43 rue de Turenne, 75003 Paris' },
                        { label: 'Téléphone', value: '+33 1 42 72 00 00' },
                        { label: 'Email', value: 'linstantbarbier@gmail.com' },
                      ].map((item, i) => (
                        <div key={i} className='group/contact-item'>
                          <p className='text-gold text-xs uppercase tracking-widest mb-2 group-hover/contact-item:text-gold/80 transition-colors'>
                            {item.label}
                          </p>
                          <p className='text-cream'>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <div>
                <Reveal variant='fade-up' delay={0.3}>
                  <p className='text-cream/70 mb-8 leading-relaxed'>
                    Pour prendre rendez-vous, consultez notre{' '}
                    <Link
                      href='/prestations'
                      className='text-gold hover:text-gold/80 underline underline-offset-4 transition-colors'>
                      page prestations
                    </Link>
                    . Pour toute autre demande ou information, contactez-nous via ce formulaire.
                  </p>
                </Reveal>

                <Reveal variant='fade-up' delay={0.4}>
                  <ContactForm />
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative min-h-[80vh] flex items-center overflow-hidden border-t border-gold/10'>
          <div className='absolute inset-0'>
            <div
              className='absolute inset-0 bg-cover bg-center'
              style={{ backgroundImage: `url('${BACKGROUNDS.homeCta.src}')` }}
            />
            <div className='absolute inset-0 bg-gradient-to-b from-navy/65 via-dark/55 to-navy/65' />
            <div className='absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-navy/40' />
            <div className='absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:4px_4px]' />
          </div>

          <Container className='relative z-10 py-20'>
            <div className='max-w-4xl mx-auto'>
              <Reveal variant='scale-up' duration={1} threshold={0.2}>
                <div className='relative bg-navy/40 backdrop-blur-xl border border-gold/20 rounded-sm p-6 md:p-8 lg:p-12 shadow-2xl overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5 pointer-events-none' />

                  <Reveal variant='scale-up' delay={0.2}>
                    <div className='w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8' />
                  </Reveal>

                  <Reveal variant='blur-in' delay={0.3} duration={1.2}>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-title text-gold mb-6 leading-tight text-center'>
                      Réservez votre expérience chez L&apos;Instant Barbier
                    </h2>
                  </Reveal>

                  <Reveal variant='fade-up' delay={0.5}>
                    <p className='text-cream/90 text-base md:text-lg leading-relaxed mb-10 text-center max-w-2xl mx-auto'>
                      Prenez rendez-vous en quelques clics et découvrez une approche exigeante et
                      élégante de la{' '}
                      <span className='text-gold font-medium'>
                        coiffure homme et du barbier à Paris
                      </span>
                      .
                    </p>
                  </Reveal>

                  <Reveal variant='fade-up' delay={0.7}>
                    <div className='flex justify-center mb-10'>
                      <div className='relative'>
                        <Button href='/reservation'>Prendre rendez-vous maintenant</Button>
                      </div>
                    </div>
                  </Reveal>

                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gold/10'>
                    {[
                      { value: '23+', label: "Années d'expérience" },
                      { value: '2000+', label: 'Clients satisfaits' },
                      { value: '5★', label: 'Note moyenne sur Google' },
                    ].map((stat, i) => (
                      <Reveal key={i} variant='fade-up' delay={0.8 + i * 0.1} threshold={0.1}>
                        <div className='text-center'>
                          <div className='text-2xl md:text-3xl font-title text-gold mb-2'>
                            {stat.value}
                          </div>
                          <div className='text-cream/60 text-xs uppercase tracking-wider'>
                            {stat.label}
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  <Reveal variant='scale-up' delay={1.1}>
                    <div className='w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mt-8' />
                  </Reveal>
                </div>
              </Reveal>

              <Reveal variant='fade-up' delay={1.2}>
                <p className='text-center text-cream/50 text-xs uppercase tracking-[0.3em] mt-8'>
                  Quartier Le Marais • Paris 3ᵉ • Réservation instantanée
                </p>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
