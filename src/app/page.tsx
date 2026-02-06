'use client'

import Container from '@/components/Container'
import Section from '@/components/Section'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PLANITY_URL } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion'

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

// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Scroll progress bar — premium gold indicator
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className='fixed top-0 left-0 right-0 h-[2px] bg-gold/80 origin-left z-[100]'
      style={{ scaleX }}
    />
  )
}

// Animated counter — numbers count up when in view
function AnimatedCounter({
  target,
  suffix = '',
  duration = 2,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = target / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {isInView ? count : 0}
      {suffix}
    </span>
  )
}

// Magnetic hover wrapper — subtle pull toward cursor
function MagneticWrap({
  children,
  className = '',
  strength = 0.3,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set((e.clientX - centerX) * strength)
      y.set((e.clientY - centerY) * strength)
    },
    [x, y, strength],
  )

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}>
      {children}
    </motion.div>
  )
}

// 3D tilt card wrapper
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      rotateX.set(y * -8)
      rotateY.set(x * 8)
    },
    [rotateX, rotateY],
  )

  const handleLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
      }}
      className={className}>
      {children}
    </motion.div>
  )
}

// Image reveal with golden curtain
function ImageReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1.2, delay, ease: [0.77, 0, 0.18, 1] }}
        className='absolute inset-0 bg-navy origin-right z-10'
      />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1.2, delay: delay + 0.15, ease: [0.77, 0, 0.18, 1] }}
        className='absolute inset-0 bg-gold/20 origin-right z-10'
      />
    </div>
  )
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

// Gallery Lightbox Carousel
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
  const [direction, setDirection] = useState(0)
  const dragX = useMotionValue(0)

  const goTo = useCallback(
    (newIndex: number, dir: number) => {
      setDirection(dir)
      setIndex(((newIndex % images.length) + images.length) % images.length)
    },
    [images.length],
  )

  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index])

  // Keyboard navigation
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

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -80) goNext()
    else if (info.offset.x > 80) goPrev()
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className='fixed inset-0 z-[9999] flex items-center justify-center'
      onClick={onClose}>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-dark/95 backdrop-blur-md' />

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
      </motion.button>

      {/* Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='absolute top-7 left-6 z-50 text-gold/60 text-xs uppercase tracking-[0.3em] font-body'>
        {index + 1} / {images.length}
      </motion.div>

      {/* Image caption */}
      <motion.p
        key={`caption-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 z-50 text-cream/50 text-xs uppercase tracking-[0.25em] font-body'>
        {images[index].alt}
      </motion.p>

      {/* Navigation arrows */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
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
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
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
      </motion.button>

      {/* Image container with swipe */}
      <div
        className='relative w-full h-full flex items-center justify-center px-16 md:px-24 py-20'
        onClick={(e) => e.stopPropagation()}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          style={{ x: dragX }}
          onDragEnd={handleDragEnd}
          className='relative w-full h-full max-w-5xl max-h-[80vh] mx-auto cursor-grab active:cursor-grabbing'>
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
        </motion.div>
      </div>

      {/* Thumbnail strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className='absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex gap-2'>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              goTo(i, i > index ? 1 : -1)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? 'bg-gold w-6' : 'bg-gold/30 hover:bg-gold/60'
            }`}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </motion.div>
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
        strokeWidth='1.5'>
        <path
          d='M7 8c0-2.21 1.79-4 4-4s4 1.79 4 4v2c0 2.21-1.79 4-4 4s-4-1.79-4-4V8z'
          strokeLinecap='round'
        />
        <path d='M5 22c0-3.87 3.13-7 7-7s7 3.13 7 7' strokeLinecap='round' />
        <path d='M15 8h4M15 12h3' strokeLinecap='round' />
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
        strokeWidth='1.5'>
        <path d='M4 12c0 0 3-4 8-4s8 4 8 4' strokeLinecap='round' />
        <path d='M7 12c0 0 2-2 5-2s5 2 5 2' strokeLinecap='round' />
        <circle cx='12' cy='12' r='1' fill='currentColor' />
      </svg>
    ),
    title: 'Soins – Soin visage homme & bien-être',
    description:
      'Nos soins visage homme à Paris sont conçus pour revitaliser la peau et les cheveux. Nous utilisons des produits haut de gamme pour hydrater, nourrir et offrir un véritable moment de détente dans un cadre apaisant.',
    link: '/prestations',
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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
      <ScrollProgressBar />
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
              {/* Stronger gradient for content readability - very dark background */}
              <div
                className='absolute inset-0'
                style={{
                  background:
                    'linear-gradient(to right, rgba(7, 24, 30, 0.98) 0%, rgba(7, 24, 30, 0.93) 30%, rgba(7, 24, 30, 0.65) 60%, transparent 100%)',
                }}
              />
              {/* Top gradient for header area - softer, more gradual */}
              <div
                className='absolute top-0 inset-x-0 h-40'
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(7, 24, 30, 0.65) 0%, rgba(7, 24, 30, 0.25) 50%, transparent 100%)',
                }}
              />
            </div>
          </div>

          {/* Decorative Gold Line - static, elegant */}
          <div
            ref={heroLineRef}
            className='absolute left-0 top-0 h-full w-[1.5px] bg-gradient-to-b from-transparent via-gold/60 to-transparent origin-top opacity-40'></div>

          {/* Grid Overlay */}
          <div className='absolute inset-0 bg-[linear-gradient(rgba(156,131,88,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(156,131,88,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]' />

          {/* Content */}
          <div className='relative z-10 h-full flex'>
            {/* Logo on left side - rotated 90 degrees with vertical marquee, 20% width */}
            <div className='hidden md:flex w-[15vw] shrink-0 h-full overflow-hidden relative items-center justify-center'>
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
                    <p className='text-gold uppercase tracking-[0.3em] text-sm font-light [text-shadow:0_1px_8px_rgba(7,24,30,0.8)]'>
                      Barbier & Coiffeur Homme
                    </p>
                    <span className='w-16 h-[1px] bg-gradient-to-r from-gold to-transparent' />
                  </div>

                  {/* Main Title - Luxury Hierarchy */}
                  <h1 ref={heroTitleRef} className='[perspective:1000px] space-y-2'>
                    {/* Primary: BARBIER & COIFFEUR - dominant */}
                    <span className='block text-5xl md:text-6xl lg:text-8xl font-title text-gold leading-[1.1] tracking-[0.02em] [transform-style:preserve-3d] [text-shadow:0_2px_12px_rgba(7,24,30,0.8),0_4px_24px_rgba(7,24,30,0.5)]'>
                      BARBIER & COIFFEUR
                    </span>
                    {/* Secondary: homme à Paris - refined, lighter */}
                    <span className='block text-2xl md:text-3xl lg:text-5xl font-title text-gold/85 leading-[1.1] tracking-[0.15em] font-light [transform-style:preserve-3d] [text-shadow:0_2px_8px_rgba(7,24,30,0.7),0_4px_16px_rgba(7,24,30,0.4)]'>
                      homme à Paris
                    </span>
                  </h1>

                  {/* Description with premium styling */}
                  <div
                    ref={heroDescriptionRef}
                    className='text-lg md:text-xl text-cream/90 max-w-xl font-light leading-relaxed relative pl-6 border-l-2 border-gold/50 [text-shadow:0_1px_8px_rgba(7,24,30,0.8)]'>
                    <p>
                      <strong className='text-gold font-medium'>Au cœur du Marais</strong>,
                      L&apos;Instant Barbier est un{' '}
                      <strong className='text-gold font-medium'>
                        salon de coiffure homme à Paris
                      </strong>{' '}
                      dédié à l&apos;élégance, au détail et au savoir-faire artisanal.
                    </p>
                  </div>

                  {/* CTA Button with glow effect */}
                  <div ref={heroCtaRef} className='pt-6 relative inline-flex'>
                    <div className='cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-gold/20 blur-2xl rounded-full' />
                    <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
                  </div>

                  {/* Social Proof / Stats - Animated Counters */}
                  <div className='flex gap-12 pt-8'>
                    <MagneticWrap className='group cursor-default'>
                      <div className='text-2xl lg:text-3xl font-title text-gold mb-1 font-light opacity-90 transition-all duration-600 group-hover:opacity-100 group-hover:[text-shadow:0_0_20px_rgba(175,151,120,0.3)] [text-shadow:0_1px_8px_rgba(7,24,30,0.7)]'>
                        <AnimatedCounter target={23} suffix='+' duration={2} />
                      </div>
                      <div className='text-[0.625rem] text-cream/50 tracking-[0.15em] font-light [text-shadow:0_1px_4px_rgba(7,24,30,0.8)]'>
                        Années d&apos;expérience
                      </div>
                    </MagneticWrap>
                    <MagneticWrap className='group cursor-default'>
                      <div className='text-2xl lg:text-3xl font-title text-gold mb-1 font-light opacity-90 transition-all duration-600 group-hover:opacity-100 group-hover:[text-shadow:0_0_20px_rgba(175,151,120,0.3)] [text-shadow:0_1px_8px_rgba(7,24,30,0.7)]'>
                        <AnimatedCounter target={2000} suffix='+' duration={2.5} />
                      </div>
                      <div className='text-[0.625rem] text-cream/50 tracking-[0.15em] font-light [text-shadow:0_1px_4px_rgba(7,24,30,0.8)]'>
                        Clients satisfaits
                      </div>
                    </MagneticWrap>
                    <MagneticWrap className='group cursor-default'>
                      <div className='text-2xl lg:text-3xl font-title text-gold mb-1 font-light opacity-90 transition-all duration-600 group-hover:opacity-100 group-hover:[text-shadow:0_0_20px_rgba(175,151,120,0.3)] [text-shadow:0_1px_8px_rgba(7,24,30,0.7)]'>
                        <AnimatedCounter target={5} suffix='★' duration={1.5} />
                      </div>
                      <div className='text-[0.625rem] text-cream/50 tracking-[0.15em] font-light [text-shadow:0_1px_4px_rgba(7,24,30,0.8)]'>
                        Note moyenne
                      </div>
                    </MagneticWrap>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {/* Decorative Corner Elements - Subtle, static presence */}
          <div className='absolute top-32 right-16 w-24 h-24 border-t border-r border-gold/15'></div>
          <div className='absolute bottom-32 left-16 w-24 h-24 border-b border-l border-gold/15'></div>

          {/* Particles Effect - Minimal */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            {particles.slice(0, 8).map((particle, i) => (
              <div
                key={i}
                className='absolute w-1 h-1 bg-gold/10 rounded-full'
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animation: `float ${particle.duration * 1.5}s ease-in-out infinite`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
          À PROPOS SECTION - PREMIUM REFINED DESIGN
          Luxury minimalist barbershop Paris
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='a-propos' className='bg-navy relative overflow-hidden py-24 lg:py-32'>
          {/* Subtle background pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.02 }}
            transition={{ duration: 3, ease: 'easeOut' }}
            viewport={{ once: true }}
            className='absolute inset-0 pointer-events-none'>
            <div className='absolute top-1/4 right-1/4 w-96 h-96 border border-gold/10 rotate-12' />
            <div className='absolute bottom-1/4 left-1/4 w-64 h-64 border border-gold/10 -rotate-6' />
          </motion.div>

          {/* Main content wrapper */}
          <div className='max-w-7xl mx-auto px-6 lg:px-12'>
            <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
              {/* Images - Layout asymétrique */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-80px' }}
                className='relative'>
                {/* Image dominante 60% */}
                <ImageReveal delay={0.1} className='aspect-[4/5]'>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className='relative aspect-[4/5] overflow-hidden group border-2 border-gold/30 shadow-xl'>
                    <div
                      className='absolute inset-0 bg-cover bg-center transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105'
                      style={{ backgroundImage: "url('/images/about-barbershop.jpg')" }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent' />

                    {/* Premium corner accents */}
                    <div className='absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-500' />
                    <div className='absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-500' />
                    <div className='absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-500' />
                    <div className='absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-500' />
                  </motion.div>
                </ImageReveal>
                {/* Images secondaires */}
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  <ImageReveal delay={0.3} className='aspect-square'>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className='relative aspect-square overflow-hidden group border-2 border-gold/30 shadow-xl'>
                      <div
                        className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105'
                        style={{ backgroundImage: "url('/images/gallery/gallery-1.jpg')" }}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent' />

                      {/* Premium corner accents */}
                      <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-500' />
                      <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-500' />
                    </motion.div>
                  </ImageReveal>

                  <ImageReveal delay={0.5} className='aspect-square'>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className='relative aspect-square overflow-hidden group border-2 border-gold/30 shadow-xl'>
                      <div
                        className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105'
                        style={{ backgroundImage: "url('/images/gallery/gallery-2.jpg')" }}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent' />

                      {/* Premium corner accents */}
                      <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-500' />
                      <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-500' />
                    </motion.div>
                  </ImageReveal>
                </div>
              </motion.div>

              {/* Content */}
              <div className='space-y-10 lg:space-y-12'>
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className='flex items-center gap-4'>
                  <div className='w-12 h-px bg-gold' />
                  <span className='text-gold text-[10px] uppercase tracking-[0.4em] font-medium'>
                    À propos
                  </span>
                </motion.div>

                {/* Titre optimisé */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className='text-3xl md:text-4xl lg:text-5xl font-title text-gold leading-[1.4] tracking-wide'>
                  Un barbier à Paris, où l&apos;
                  <span className='text-gold/90 font-semibold'>exigence</span> rencontre l&apos;
                  <span className='text-gold/90 font-semibold'>élégance</span>
                </motion.h2>

                {/* Paragraphe principal */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className='text-cream/90 text-base lg:text-lg leading-relaxed'>
                  Spécialisé dans la{' '}
                  <span className='text-gold font-medium'>coiffure masculine</span> et l&apos;art de
                  la barbe, L&apos;Instant Barbier vous accueille dans un univers premium où
                  tradition et modernité se rencontrent. Chaque coupe est pensée comme une
                  expérience sur mesure.
                </motion.p>

                {/* Highlights avec icônes */}
                <div className='space-y-6'>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className='flex items-start gap-4 group'>
                    <div className='flex-shrink-0 w-8 h-8 flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 text-gold transition-transform duration-300 group-hover:scale-110'
                        fill='currentColor'
                        viewBox='0 0 20 20'>
                        <path d='M10 2L12.5 7.5L18 8.5L14 13L15 18.5L10 15.5L5 18.5L6 13L2 8.5L7.5 7.5L10 2Z' />
                      </svg>
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-gold text-sm font-semibold uppercase tracking-wider mb-1'>
                        Maîtres barbiers expérimentés
                      </h3>
                      <p className='text-cream/80 text-sm leading-relaxed'>
                        Notre équipe, dirigée par Riccardo, met son savoir-faire au service
                        d&apos;une clientèle exigeante.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className='flex items-start gap-4 group'>
                    <div className='flex-shrink-0 w-8 h-8 flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 text-gold transition-transform duration-300 group-hover:rotate-45'
                        fill='currentColor'
                        viewBox='0 0 20 20'>
                        <rect x='4' y='4' width='12' height='12' transform='rotate(45 10 10)' />
                      </svg>
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-gold text-sm font-semibold uppercase tracking-wider mb-1'>
                        Excellence parisienne
                      </h3>
                      <p className='text-cream/80 text-sm leading-relaxed'>
                        Un salon pensé pour les hommes attachés au détail et à l&apos;élégance
                        authentique.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* CTA premium */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                  viewport={{ once: true }}>
                  <Button href='/salon'>Découvrir notre univers</Button>
                </motion.div>
              </div>
            </div>
          </div>
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
              className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {services.map((service, index) => (
                <TiltCard key={index}>
                  <motion.article
                    variants={fadeInUp}
                    initial='rest'
                    whileHover='hover'
                    className='group text-center p-8 border border-gold/20 hover:border-gold/50 transition-all duration-500 relative overflow-hidden h-full'>
                    {/* Hover glow background */}
                    <motion.div
                      className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(175,151,120,0.08),transparent_70%)] pointer-events-none'
                      variants={{
                        rest: { opacity: 0, scale: 0.8 },
                        hover: { opacity: 1, scale: 1.2 },
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Animated border glow */}
                    <motion.div
                      className='absolute inset-0 pointer-events-none'
                      variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 },
                      }}
                      transition={{ duration: 0.4 }}>
                      <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/60' />
                      <div className='absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/60' />
                      <div className='absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/60' />
                      <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/60' />
                    </motion.div>

                    {/* Icon */}
                    <div className='flex justify-center mb-6 relative z-10'>
                      <motion.div
                        className='text-gold'
                        variants={{
                          rest: { scale: 1, rotate: 0 },
                          hover: { scale: 1.15, rotate: 5 },
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                        {service.icon}
                      </motion.div>
                    </div>

                    {/* Title */}
                    <motion.h3
                      className='text-lg font-title text-gold mb-4 uppercase tracking-wide leading-tight relative z-10'
                      variants={{
                        rest: { y: 0 },
                        hover: { y: -3 },
                      }}>
                      {service.title}
                    </motion.h3>

                    {/* Description */}
                    <p className='text-cream/70 text-sm leading-relaxed mb-6 relative z-10'>
                      {service.description}
                    </p>

                    {/* En savoir plus link */}
                    <Link
                      href={service.link}
                      className='inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest hover:text-cream transition-colors group relative z-10'>
                      En savoir plus
                      <motion.span
                        className='inline-block'
                        variants={{
                          rest: { x: 0 },
                          hover: { x: 5 },
                        }}>
                        →
                      </motion.span>
                    </Link>

                    {/* Decorative line on hover */}
                    <motion.div
                      className='mt-6 h-px bg-gold/50 mx-auto relative z-10'
                      variants={{
                        rest: { width: 0 },
                        hover: { width: '50%' },
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.article>
                </TiltCard>
              ))}
            </motion.div>

            <RevealOnScroll delay={0.3} className='text-center mt-12'>
              <Button href='/prestations'>Voir les tarifs</Button>
            </RevealOnScroll>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
          ATMOSPHÈRE & IDENTITÉ SECTION
          Parenthèse élégante — pause visuelle immersive
      ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative py-32 md:py-40 lg:py-52 bg-dark overflow-hidden'>
          {/* Background image — fixed, slow, cinematic */}
          <div
            className='absolute inset-0 bg-cover bg-center bg-fixed'
            style={{ backgroundImage: "url('/images/Atmosph%C3%A8re.jpg')" }}
          />
          {/* Dark overlay — preserves text legibility and luxury mood */}
          <div className='absolute inset-0 bg-dark/85' />
          {/* Subtle radial depth — almost imperceptible warmth */}
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_40%,rgba(20,34,51,0.35),transparent)] pointer-events-none' />

          <Container className='relative z-10'>
            <div className='max-w-2xl lg:max-w-3xl mx-auto text-center'>
              {/* ── Label « Atmosphère » — first breath ── */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-120px' }}
                className='block text-gold text-[11px] uppercase tracking-[0.4em] font-body mb-16 lg:mb-20'>
                Atmosphère
              </motion.span>

              {/* ── Top separator — slow draw ── */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: '-120px' }}
                className='w-14 h-px bg-gold/25 mx-auto mb-14 lg:mb-18 origin-center'
              />

              {/* ── Titre éditorial — ligne par ligne ── */}
              <motion.h2 className='font-title text-gold mb-14 lg:mb-18'>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true, margin: '-120px' }}
                  className='block text-2xl md:text-3xl lg:text-[2.75rem] leading-[1.35] tracking-wide'>
                  Un salon de barbier dans le Marais
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true, margin: '-120px' }}
                  className='block text-2xl md:text-3xl lg:text-[2.75rem] leading-[1.35] tracking-wide mt-1'>
                  au style unique
                </motion.span>
              </motion.h2>

              {/* ── Middle separator ── */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: '-120px' }}
                className='w-10 h-px bg-gold/15 mx-auto mb-12 lg:mb-16 origin-center'
              />

              {/* ── Texte principal — ambiance ── */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 1, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-120px' }}
                className='text-cream/65 text-base md:text-lg leading-[1.9] max-w-xl mx-auto mb-10 lg:mb-12 font-body'>
                L&apos;Instant Barbier, c&apos;est aussi une ambiance : lumière chaleureuse,
                matières nobles, lignes épurées et atmosphère feutrée.
              </motion.p>

              {/* ── Texte secondaire — vision / exigence — plus discret ── */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 1.2, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-120px' }}
                className='text-cream/40 text-sm md:text-[15px] leading-[1.9] max-w-md mx-auto font-body italic'>
                Chaque détail du salon reflète notre exigence et notre vision du barbier moderne à
                Paris.
              </motion.p>

              {/* ── Bottom separator — closing breath ── */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.8, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: '-120px' }}
                className='w-20 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent mx-auto mt-16 lg:mt-20 origin-center'
              />
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
          ÉQUIPE SECTION — Signature humaine
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='equipe' className='bg-dark'>
          <Container>
            <SectionTitle subtitle='Les Experts' title='Notre Équipe' />

            <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-start'>
              {/* ── LEFT: Expert Card ── */}
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-50px' }}
                variants={staggerContainer}>
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

              {/* ── RIGHT: Editorial Heritage Text ── */}
              <div className='flex flex-col justify-center lg:py-8'>
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-80px' }}
                  className='flex items-center gap-4 mb-8'>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true }}
                    className='w-10 h-px bg-gold/30 origin-left'
                  />
                  <span className='text-gold/50 text-[11px] uppercase tracking-[0.4em] font-body'>
                    Héritage & Savoir-faire
                  </span>
                </motion.div>

                {/* Main text blocks with staggered reveal */}
                <div className='space-y-6'>
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true, margin: '-60px' }}
                    className='text-cream/75 text-[15px] leading-[1.9] font-body'>
                    Depuis plusieurs générations, l&apos;art de la{' '}
                    <strong className='text-gold/90 font-medium'>coiffure masculine</strong> se
                    transmet au sein de la famille de Riccardo comme un véritable héritage.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true, margin: '-60px' }}
                    className='text-cream/60 text-[15px] leading-[1.9] font-body'>
                    De père en fils, ce savoir-faire s&apos;est enrichi au fil du temps, porté par
                    une exigence constante de précision, d&apos;élégance et de maîtrise du geste.
                  </motion.p>

                  {/* Separator */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true }}
                    className='w-12 h-px bg-gold/20 origin-left'
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true, margin: '-60px' }}
                    className='text-cream/75 text-[15px] leading-[1.9] font-body'>
                    Spécialisé dans la{' '}
                    <strong className='text-gold/90 font-medium'>
                      coiffure homme et le métier de barbier à Paris
                    </strong>
                    , L&apos;Instant Barbier perpétue des techniques intemporelles&nbsp;:
                  </motion.p>

                  {/* Techniques list — revealed one by one */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.05, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true, margin: '-60px' }}
                    className='pl-5 border-l border-gold/15 space-y-2'>
                    {[
                      'Dégradés maîtrisés',
                      'Coupes classiques aux ciseaux',
                      'Entretien des cheveux mi-longs et longs',
                      'Travail minutieux de la barbe',
                    ].map((technique, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1.15 + i * 0.1, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className='text-cream/55 text-sm leading-relaxed font-body flex items-center gap-3'>
                        <span className='w-1 h-1 bg-gold/40 rounded-full shrink-0' />
                        {technique}
                      </motion.p>
                    ))}
                  </motion.div>

                  {/* Closing line */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true, margin: '-60px' }}
                    className='text-cream/45 text-sm leading-[1.9] font-body italic'>
                    Cet héritage artisanal est aujourd&apos;hui au cœur de chaque prestation
                    proposée au salon.
                  </motion.p>
                </div>
              </div>
            </div>
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
              <ImageReveal delay={0} className='col-span-2 row-span-2 aspect-square md:aspect-auto'>
                <motion.div
                  variants={scaleIn}
                  whileHover={{ scale: 0.98 }}
                  onClick={() => setLightboxIndex(0)}
                  className='col-span-2 row-span-2 relative aspect-square md:aspect-auto overflow-hidden group cursor-pointer h-full'>
                  <motion.div
                    className='absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700'
                    style={{ backgroundImage: `url(${galleryImages[0].src})` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <div className='absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500' />
                  {/* Premium hover overlay */}
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
                    <div className='absolute inset-0 bg-navy/50 backdrop-blur-[2px]' />
                    <div className='relative flex flex-col items-center gap-3'>
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        className='w-12 h-12 border border-gold/60 flex items-center justify-center'>
                        <span className='text-gold text-2xl'>+</span>
                      </motion.div>
                      <span className='text-gold/80 text-xs uppercase tracking-[0.3em]'>Voir</span>
                    </div>
                  </div>
                </motion.div>
              </ImageReveal>

              {/* Smaller Images */}
              {galleryImages.slice(1).map((image, index) => (
                <ImageReveal key={index} delay={0.15 * (index + 1)} className='aspect-square'>
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 0.95 }}
                    onClick={() => setLightboxIndex(index + 1)}
                    className='relative aspect-square overflow-hidden group cursor-pointer h-full'>
                    <motion.div
                      className='absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700'
                      style={{ backgroundImage: `url(${image.src})` }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    <div className='absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500' />
                    {/* Premium hover overlay */}
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
                      <div className='absolute inset-0 bg-navy/50 backdrop-blur-[2px]' />
                      <div className='relative w-9 h-9 border border-gold/60 flex items-center justify-center'>
                        <span className='text-gold text-lg'>+</span>
                      </div>
                    </div>
                  </motion.div>
                </ImageReveal>
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

        {/* Gallery Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <GalleryLightbox
              images={galleryImages}
              currentIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </AnimatePresence>

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
                  className='bg-dark/50 border border-gold/20 p-8 relative hover:border-gold/40 cursor-default transition-all duration-500 h-full overflow-visible group/review flex flex-col'>
                  {/* Quote Icon - Animated, half out */}
                  <motion.div
                    className='absolute -top-10 left-6'
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                    viewport={{ once: true }}>
                    <span className='text-gold text-[5.5rem] leading-normal font-title'>
                      &ldquo;
                    </span>
                  </motion.div>

                  {/* Content */}
                  <div className='pt-4 flex flex-col flex-1'>
                    <motion.p
                      className='text-cream/80 text-sm leading-relaxed mb-6 italic flex-1'
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
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: 'rgba(175, 151, 120, 0.4)',
                          }}>
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
                  <span className='text-gold text-xs uppercase tracking-[0.3em]'>
                    Informations pratiques
                  </span>
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className='text-3xl md:text-4xl font-title text-gold mb-4 leading-tight'>
                  Votre barbier à Paris 3ᵉ – Le Marais
                </motion.h2>

                <motion.p variants={fadeInUp} className='text-cream/70 mb-8 text-sm'>
                  📍 43 rue de Turenne, 75003 Paris
                  <br />
                  🕒 Sur rendez-vous
                  <br />
                  📅 Réservation en ligne disponible 24h/24
                </motion.p>

                <motion.h3 variants={fadeInUp} className='text-xl font-title text-gold mb-6 mt-10'>
                  Horaires d&apos;Ouverture
                </motion.h3>

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
                  className='relative aspect-4/3 overflow-hidden group'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}>
                  <div className="absolute inset-0 bg-[url('/images/salon-interior-2.jpg')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
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
                  className='relative aspect-4/3 overflow-hidden group'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}>
                  <div className="absolute inset-0 bg-[url('/images/marais-paris.jpg')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
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
          FINAL CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section className='bg-navy border-t border-gold/10'>
          <Container>
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className='max-w-4xl mx-auto text-center'>
              <motion.h2
                variants={fadeInUp}
                className='text-3xl md:text-5xl font-title text-gold mb-6 leading-tight'>
                Réservez votre expérience chez L&apos;Instant Barbier
              </motion.h2>

              <motion.p variants={fadeInUp} className='text-cream/80 text-lg leading-relaxed mb-10'>
                Prenez rendez-vous en quelques clics et découvrez une approche exigeante et élégante
                de la{' '}
                <strong className='text-gold font-medium'>
                  coiffure homme et du barbier à Paris
                </strong>
                .
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
              </motion.div>
            </motion.div>
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
