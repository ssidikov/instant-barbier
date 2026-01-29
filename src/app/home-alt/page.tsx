'use client'

import Container from '@/components/Container'
import Section from '@/components/Section'
import ButtonAlt from '@/components/ButtonAlt'
import HeaderGlass from '@/components/HeaderGlass'
import Footer from '@/components/Footer'
import { PLANITY_URL } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS - Framer Motion
// ═══════════════════════════════════════════════════════════════════════════

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const letterAnimation = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.05,
      ease: "easeOut" as const
    }
  })
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
}

// Magnetic Button Effect Hook
function useMagnetic(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])
}

// Animated Text Component
function AnimatedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterAnimation}
          className="inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Reveal on Scroll Component
function RevealOnScroll({ children, className, delay = 0 }: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 75 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Parallax Image Component
function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  
  return (
    <motion.div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-full">
        <Image src={src} alt={alt} fill className="object-cover" />
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
        className='w-12 h-12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'>
        <path
          d='M6 3v18M18 3v18M6 12h12M9 6h6M9 18h6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    title: 'Coupes',
    description:
      'Coupes précises et adaptées à votre style. Un travail sur-mesure pour révéler votre caractère.',
    price: 'à partir de 25€',
  },
  {
    icon: (
      <svg
        className='w-12 h-12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'>
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
      'Rasage traditionnel au blaireau et serviettes chaudes. Taille et sculpture par nos experts.',
    price: 'à partir de 20€',
  },
  {
    icon: (
      <svg
        className='w-12 h-12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'>
        <circle cx='12' cy='12' r='3' />
        <path
          d='M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83'
          strokeLinecap='round'
        />
      </svg>
    ),
    title: 'Soins',
    description:
      'Soins du visage, gommages et masques pour une peau revitalisée et éclatante de santé.',
    price: 'à partir de 30€',
  },
  {
    icon: (
      <svg
        className='w-12 h-12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'>
        <path
          d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    title: 'Forfaits',
    description: 'Combinaisons coupe + barbe pour un service complet et un résultat harmonieux.',
    price: 'à partir de 40€',
  },
]

const team = [
  {
    name: 'RICCARDO',
    role: 'Coiffeur-barbier et directeur artistique',
    experience: '23 ans',
    image: '/images/team/Riccardo.avif',
    specialty: 'Français, Arabe, Italien, Anglais',
  },
]

const galleryImages = [
  { src: '/images/gallery/gallery-1.jpg', alt: 'Coupe moderne', category: 'Coupe' },
  { src: '/images/gallery/gallery-2.jpg', alt: 'Rasage traditionnel', category: 'Rasage' },
  { src: '/images/gallery/gallery-3.jpg', alt: 'Taille de barbe', category: 'Barbe' },
  { src: '/images/gallery/gallery-4.jpg', alt: 'Ambiance du salon', category: 'Salon' },
  { src: '/images/gallery/gallery-5.jpg', alt: 'Détail coupe', category: 'Coupe' },
  { src: '/images/gallery/gallery-6.jpg', alt: 'Finitions', category: 'Finitions' },
]

const reviews = [
  {
    text: "Ambiance géniale et service impeccable. Les barbiers sont attentifs et prennent le temps de comprendre ce que l'on souhaite.",
    author: 'Jean-Pierre D.',
    rating: 5,
    date: 'Il y a 2 semaines',
  },
  {
    text: "Je me suis senti accueilli dès mon arrivée. Coupe parfaite, rasage traditionnel d'exception. Un vrai moment de détente.",
    author: 'Antoine L.',
    rating: 5,
    date: 'Il y a 1 mois',
  },
  {
    text: 'Une expérience incroyable à chaque visite. Des barbiers qualifiés et un cadre raffiné. Le souci du détail est remarquable.',
    author: 'Charles M.',
    rating: 5,
    date: 'Il y a 3 semaines',
  },
]

const hours = [
  { day: 'Lundi', hours: 'Fermé', isClosed: true },
  { day: 'Mardi', hours: '10h – 20h', isClosed: false },
  { day: 'Mercredi', hours: '10h – 20h', isClosed: false },
  { day: 'Jeudi', hours: '10h – 21h', isClosed: false },
  { day: 'Vendredi', hours: '10h – 21h', isClosed: false },
  { day: 'Samedi', hours: '09h – 19h', isClosed: false },
  { day: 'Dimanche', hours: 'Fermé', isClosed: true },
]

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANTS UI PREMIUM
// ═══════════════════════════════════════════════════════════════════════════

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  light?: boolean
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-16 ${alignClass}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-4 mb-6 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className={`h-px w-8 ${light ? 'bg-gold/60' : 'bg-gold'}`} />
          <span className='text-gold text-xs font-medium uppercase tracking-[0.25em]'>
            {eyebrow}
          </span>
          <span className={`h-px w-8 ${light ? 'bg-gold/60' : 'bg-gold'}`} />
        </div>
      )}
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-title leading-tight ${light ? 'text-cream' : 'text-navy'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-6 text-lg leading-relaxed ${light ? 'text-cream/70' : 'text-navy/60'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'md' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <div className='flex gap-0.5'>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${sizeClass} ${i < rating ? 'text-gold' : 'text-navy/20'}`}
          fill='currentColor'
          viewBox='0 0 20 20'>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}
    </div>
  )
}

function FeatureIcon() {
  return (
    <div className='w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0'>
      <svg
        className='w-3.5 h-3.5 text-gold'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        strokeWidth='2.5'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE - REDESIGN PREMIUM CRÈME/BLEU/DORÉ
// ═══════════════════════════════════════════════════════════════════════════

export default function HomeAlt() {
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
  const parallaxImgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero entrance animation - simplified and elegant
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(heroSubtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
    })
      .from(
        heroTitleRef.current?.children || [],
        {
          y: 80,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
        },
        '-=0.4',
      )
      .from(
        heroDescriptionRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.5',
      )
      .from(
        heroCtaRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.4',
      )

    // Subtle parallax for background
    if (parallaxImgRef.current) {
      gsap.to(parallaxImgRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

    // Scroll-triggered animations for sections
    gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
      gsap.from(element as Element, {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element as Element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <>
      <HeaderGlass />

      <main className='grow bg-cream'>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Premium Minimal with WOW animations
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className='lg:pr-148 relative min-h-screen flex items-center overflow-hidden'>
          {/* Background Image with Parallax */}
          <motion.div 
            className='absolute inset-0'
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div ref={parallaxImgRef} className='absolute inset-0 scale-105'>
              <Image
                src='/images/hero-barbershop.jpg'
                alt="L'Instant Barbier"
                fill
                className='object-cover object-center'
                priority
              />
              {/* Elegant gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-r from-cream via-cream/85 to-cream/40' />
              <div className='absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream' />
            </div>
          </motion.div>

          {/* Animated decorative lines */}
          <motion.div 
            className='absolute left-12 md:left-20 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent'
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          
          {/* Floating golden particles */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute w-2 h-2 rounded-full bg-gold/30'
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Content */}
          <Container className='relative z-10 pt-24'>
            <div className='max-w-2xl'>
              {/* Eyebrow with line animation */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className='flex items-center gap-4 mb-8'
              >
                <motion.span 
                  className='h-px w-12 bg-gold origin-left'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <p className='text-gold text-sm font-[var(--font-sweet)] uppercase tracking-[0.3em]'>
                  Barbier Paris
                </p>
              </motion.div>

              {/* Title with letter animation */}
              <motion.h1
                className='text-5xl md:text-7xl lg:text-8xl text-navy leading-[0.9] mb-8'
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.span 
                  className='block font-[var(--font-haarlem)] tracking-[0.15em] overflow-hidden'
                  variants={fadeInUp}
                >
                  <AnimatedText text="L'INSTANT" />
                </motion.span>
                <motion.span 
                  className='block mt-2'
                  variants={fadeInUp}
                >
                  <span className='text-gold font-[var(--font-sweet)] uppercase tracking-[0.2em]'>
                    <AnimatedText text="Barbier" />
                  </span>
                </motion.span>
              </motion.h1>

              {/* Description with smooth reveal */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className='text-xl md:text-2xl text-navy/70 max-w-lg leading-relaxed mb-10'>
                L&apos;excellence du grooming masculin au cœur du Marais. Un savoir-faire
                traditionnel dans un cadre d&apos;exception.
              </motion.p>

              {/* CTA with magnetic effect */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className='flex flex-wrap items-center gap-6'
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ButtonAlt href={PLANITY_URL}>Prendre rendez-vous</ButtonAlt>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    href='/prestations'
                    className='text-navy text-sm uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-2 group'>
                    Nos prestations
                    <motion.svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      whileHover={{ x: 5 }}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='1.5'
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </Container>
          
          {/* Scroll indicator with pulse */}
          <motion.div 
            className='absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.span 
              className='text-navy/40 text-xs uppercase tracking-widest'
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll
            </motion.span>
            <motion.div
              className='w-6 h-10 border-2 border-navy/20 rounded-full flex justify-center pt-2'
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className='w-1.5 h-1.5 bg-gold rounded-full'
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            À PROPOS - Elegant Two Column with WOW animations
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='a-propos' className='bg-cream overflow-hidden'>
          <Container>
            <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
              {/* Image Side with parallax */}
              <RevealOnScroll className='relative'>
                <motion.div 
                  className='relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-navy/10'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <ParallaxImage
                    src='/images/about-barbershop.jpg'
                    alt='Notre salon'
                    className='absolute inset-0'
                  />
                  {/* Shine effect on hover */}
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full'
                    whileHover={{ translateX: '200%' }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>
                {/* Floating accent card - Gold background with animation */}
                <motion.div 
                  className='absolute -bottom-8 -right-8 bg-gold text-navy p-8 shadow-xl'
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <motion.span 
                    className='block text-5xl font-title text-navy'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    23+
                  </motion.span>
                  <span className='text-sm uppercase tracking-wider text-navy/80'>
                    ans d&apos;expérience
                  </span>
                </motion.div>
              </RevealOnScroll>

              {/* Content Side */}
              <RevealOnScroll delay={0.2} className='space-y-8'>
                <SectionHeader
                  eyebrow='Notre histoire'
                  title="L'Art du Barbier Parisien"
                  align='left'
                />

                <motion.div 
                  className='space-y-6 text-navy/70 text-lg leading-relaxed -mt-8'
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.p variants={fadeInUp} className='text-navy/70'>
                    Niché au cœur du Marais, L&apos;Instant Barbier est un sanctuaire dédié à
                    l&apos;homme moderne. Dans un cadre sobre et raffiné, nos maîtres barbiers
                    perpétuent un savoir-faire d&apos;exception.
                  </motion.p>
                  <motion.p variants={fadeInUp} className='text-navy/70'>
                    Notre approche allie techniques traditionnelles du rasage à l&apos;ancienne et
                    tendances contemporaines, pour un résultat unique.
                  </motion.p>
                </motion.div>

                {/* Features with stagger */}
                <motion.div 
                  className='grid grid-cols-2 gap-4 pt-4'
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {['Produits Premium', 'Maîtres Barbiers', 'Cadre Élégant', 'Sur Rendez-vous'].map(
                    (feature, index) => (
                      <motion.div 
                        key={feature} 
                        className='flex items-center gap-3'
                        variants={fadeInUp}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, type: "spring" }}
                        >
                          <FeatureIcon />
                        </motion.div>
                        <span className='text-navy text-sm'>{feature}</span>
                      </motion.div>
                    ),
                  )}
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    href='/salon'
                    className='inline-flex items-center gap-3 text-navy text-sm uppercase tracking-widest hover:text-gold transition-colors group pt-4'>
                    Découvrir le salon
                    <svg
                      className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='1.5'
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </Link>
                </motion.div>
              </RevealOnScroll>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            SERVICES - Card Grid with WOW animations
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='services' className='bg-white overflow-hidden'>
          <Container>
            <RevealOnScroll>
              <SectionHeader
                eyebrow='Nos Services'
                title='Prestations'
                description='Des soins personnalisés pour révéler votre style et sublimer votre apparence.'
              />
            </RevealOnScroll>

            <motion.div 
              className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {services.map((service, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 25px 50px -12px rgba(175, 151, 120, 0.25)" 
                  }}
                  className='group relative p-8 bg-cream/50 hover:bg-cream border border-navy/5 hover:border-gold/30 transition-all duration-500'>
                  {/* Icon with rotation on hover */}
                  <motion.div 
                    className='text-gold/70 group-hover:text-gold transition-colors duration-300 mb-6'
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className='text-xl font-title text-navy mb-3'>{service.title}</h3>

                  {/* Description */}
                  <p className='text-navy/60 text-sm leading-relaxed mb-6'>{service.description}</p>

                  {/* Price with counter animation */}
                  <motion.p 
                    className='text-gold text-sm font-medium'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {service.price}
                  </motion.p>

                  {/* Hover accent with animation */}
                  <motion.div 
                    className='absolute bottom-0 left-0 right-0 h-1 bg-gold origin-left'
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.article>
              ))}
            </motion.div>

            <RevealOnScroll delay={0.3} className='text-center mt-14'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ButtonAlt href='/prestations'>Voir tous les tarifs</ButtonAlt>
              </motion.div>
            </RevealOnScroll>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            PARALLAX BREAK - Quote with WOW animations
        ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative h-[60vh] md:h-[70vh] overflow-hidden'>
          <motion.div 
            className='absolute inset-0'
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <ParallaxImage
              src='/images/salon-interior-1.jpg'
              alt='Intérieur du salon'
              className='absolute inset-0'
            />
            <div className='absolute inset-0 bg-navy/70' />
          </motion.div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center max-w-3xl px-6'>
              <motion.span 
                className='text-gold text-6xl font-title block'
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                &ldquo;
              </motion.span>
              <motion.blockquote 
                className='text-2xl md:text-4xl font-title text-cream leading-relaxed mt-4'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Le détail fait la perfection, et la perfection n&apos;est pas un détail.
              </motion.blockquote>
              <motion.cite 
                className='block mt-8 text-gold/80 text-sm uppercase tracking-widest not-italic'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                — Notre philosophie
              </motion.cite>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ÉQUIPE - Clean Cards with WOW animations
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='equipe' className='bg-cream overflow-hidden'>
          <Container>
            <RevealOnScroll>
              <SectionHeader
                eyebrow="L'Équipe"
                title='Nos Experts'
                description='Des professionnels passionnés à votre service.'
              />
            </RevealOnScroll>

            <motion.div 
              className='grid md:grid-cols-3 gap-8'
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {team.map((member, index) => (
                <motion.article 
                  key={index} 
                  className='group'
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                >
                  {/* Image with parallax effect */}
                  <motion.div 
                    className='relative aspect-[3/4] overflow-hidden mb-6 bg-navy/5'
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className='absolute inset-0'
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className='object-cover'
                      />
                    </motion.div>
                    <motion.div 
                      className='absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent'
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Hover info with spring animation */}
                    <motion.div 
                      className='absolute bottom-0 left-0 right-0 p-6'
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.span 
                        className='inline-block bg-gold text-navy text-xs px-3 py-1 uppercase tracking-wider'
                        whileHover={{ scale: 1.1 }}
                      >
                        {member.specialty}
                      </motion.span>
                    </motion.div>
                  </motion.div>

                  {/* Info */}
                  <motion.div 
                    className='text-center'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <h3 className='text-2xl font-title text-navy mb-1'>{member.name}</h3>
                    <p className='text-navy/60 text-sm mb-2'>{member.role}</p>
                    <motion.p 
                      className='text-gold text-xs uppercase tracking-wider'
                      whileHover={{ scale: 1.05 }}
                    >
                      {member.experience} d&apos;expérience
                    </motion.p>
                  </motion.div>
                </motion.article>
              ))}
            </motion.div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            GALERIE - Masonry Grid with WOW animations
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='galerie' className='bg-white overflow-hidden'>
          <Container>
            <RevealOnScroll>
              <SectionHeader
                eyebrow='Portfolio'
                title='Notre Galerie'
                description='Un aperçu de notre travail et de notre savoir-faire.'
              />
            </RevealOnScroll>

            <motion.div 
              className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  className={`group relative overflow-hidden cursor-pointer ${
                    index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                  }`}>
                  <motion.div
                    className='absolute inset-0'
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className='object-cover'
                    />
                  </motion.div>
                  <motion.div 
                    className='absolute inset-0 bg-navy/0'
                    whileHover={{ backgroundColor: "rgba(7, 24, 30, 0.5)" }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Hover Label with spring animation */}
                  <motion.div 
                    className='absolute inset-0 flex items-center justify-center'
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span 
                      className='text-cream text-sm uppercase tracking-widest bg-gold/90 px-4 py-2'
                      whileHover={{ scale: 1.1 }}
                    >
                      {image.category}
                    </motion.span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <RevealOnScroll delay={0.3} className='text-center mt-12'>
              <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  href='/galerie'
                  className='inline-flex items-center gap-3 text-navy text-sm uppercase tracking-widest hover:text-gold transition-colors group'>
                  Voir toute la galerie
                  <svg
                    className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </Link>
            </motion.div>
            </RevealOnScroll>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            AVIS CLIENTS - Testimonial Cards with WOW animations
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='avis' className='bg-cream overflow-hidden'>
          <Container>
            <RevealOnScroll>
              <SectionHeader eyebrow='Témoignages' title='Ce que disent nos clients' />
            </RevealOnScroll>

            <motion.div 
              className='grid md:grid-cols-3 gap-8'
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {reviews.map((review, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(7, 24, 30, 0.15)" }}
                  className='bg-white p-8 shadow-lg shadow-navy/5 border border-navy/5 relative'>
                  {/* Stars with animation */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <StarRating rating={review.rating} size='md' />
                  </motion.div>

                  {/* Quote */}
                  <p className='text-navy/70 leading-relaxed mt-6 mb-8'>
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <motion.div 
                        className='w-12 h-12 rounded-full bg-navy flex items-center justify-center'
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span className='text-gold text-lg font-title'>
                          {review.author.charAt(0)}
                        </span>
                      </motion.div>
                      <div>
                        <p className='text-navy font-medium'>{review.author}</p>
                        <p className='text-navy/40 text-xs'>{review.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative accent with animation */}
                  <motion.div 
                    className='absolute top-0 left-8 h-1 bg-gold origin-left'
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  />
                </motion.article>
              ))}
            </motion.div>

            {/* Trust badges with reveal */}
            <RevealOnScroll delay={0.3}>
              <div className='flex flex-wrap items-center justify-center gap-8 mt-16 pt-12 border-t border-navy/10'>
              <div className='text-center'>
                <motion.span 
                  className='block text-4xl font-title text-navy'
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  4.9
                </motion.span>
                <span className='text-xs text-navy/50 uppercase tracking-wider'>Note Google</span>
              </div>
              <div className='w-px h-12 bg-navy/10' />
              <div className='text-center'>
                <motion.span 
                  className='block text-4xl font-title text-navy'
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  2000+
                </motion.span>
                <span className='text-xs text-navy/50 uppercase tracking-wider'>Clients</span>
              </div>
              <div className='w-px h-12 bg-navy/10' />
              <div className='text-center'>
                <motion.span 
                  className='block text-4xl font-title text-navy'
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  98%
                </motion.span>
                <span className='text-xs text-navy/50 uppercase tracking-wider'>Satisfaction</span>
              </div>
              </div>
            </RevealOnScroll>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            HORAIRES & LOCALISATION - Two Column with WOW animations
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='horaires' className='bg-navy overflow-hidden'>
          <Container>
            <div className='grid lg:grid-cols-2 gap-16 items-start'>
              {/* Hours */}
              <RevealOnScroll>
                <SectionHeader
                  eyebrow='Disponibilités'
                  title="Horaires d'Ouverture"
                  align='left'
                  light
                />

                <motion.div 
                  className='space-y-0 -mt-6'
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {hours.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInLeft}
                      whileHover={{ x: 10, backgroundColor: "rgba(175, 151, 120, 0.1)" }}
                      className={`flex justify-between items-center py-4 border-b border-cream/10 px-2 -mx-2 rounded transition-colors ${
                        item.isClosed ? 'opacity-40' : ''
                      }`}>
                      <span className='text-cream'>{item.day}</span>
                      <span className={item.isClosed ? 'text-cream/50' : 'text-gold'}>
                        {item.hours}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className='mt-10'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ButtonAlt href={PLANITY_URL}>Réserver maintenant</ButtonAlt>
                </motion.div>
              </RevealOnScroll>

              {/* Location Card */}
              <RevealOnScroll delay={0.2}>
                <motion.div 
                  className='relative aspect-[4/3] overflow-hidden mb-8'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <ParallaxImage
                    src='/images/salon-interior-2.jpg'
                    alt='Notre salon'
                    className='absolute inset-0'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent' />

                  {/* Location overlay */}
                  <motion.div 
                    className='absolute bottom-0 left-0 right-0 p-8'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className='text-gold text-xs uppercase tracking-widest mb-2'>Adresse</p>
                    <p className='text-cream text-xl font-title'>43 rue de Turenne</p>
                    <p className='text-cream/80'>75003 Paris — Le Marais</p>
                  </motion.div>
                </motion.div>

                {/* Contact info with hover effects */}
                <motion.div 
                  className='grid grid-cols-2 gap-6'
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className='p-6 border border-cream/10'
                    variants={fadeInUp}
                    whileHover={{ borderColor: "rgba(175, 151, 120, 0.5)", scale: 1.02 }}
                  >
                    <p className='text-gold text-xs uppercase tracking-widest mb-2'>Téléphone</p>
                    <p className='text-cream'>01 42 72 00 00</p>
                  </motion.div>
                  <motion.div 
                    className='p-6 border border-cream/10'
                    variants={fadeInUp}
                    whileHover={{ borderColor: "rgba(175, 151, 120, 0.5)", scale: 1.02 }}
                  >
                    <p className='text-gold text-xs uppercase tracking-widest mb-2'>Email</p>
                    <p className='text-cream text-sm'>contact@linstant-barbier.fr</p>
                  </motion.div>
                </motion.div>
              </RevealOnScroll>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            CONTACT FORM - Clean & Simple with WOW animations
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='contact' className='bg-cream overflow-hidden'>
          <Container>
            <div className='max-w-2xl mx-auto'>
              <RevealOnScroll>
                <SectionHeader
                  eyebrow='Contact'
                  title='Une question ?'
                  description='Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.'
                />
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <motion.form 
                  onSubmit={handleSubmit} 
                  className='space-y-6'
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className='grid sm:grid-cols-2 gap-6'>
                    <motion.input
                      variants={fadeInUp}
                      whileFocus={{ scale: 1.02, borderColor: "#AF9778" }}
                      type='text'
                      placeholder='Votre nom'
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className='w-full bg-white border border-navy/10 text-navy px-5 py-4 placeholder:text-navy/40 focus:border-gold focus:outline-none transition-colors'
                    />
                    <motion.input
                      variants={fadeInUp}
                      whileFocus={{ scale: 1.02, borderColor: "#AF9778" }}
                      type='tel'
                      placeholder='Téléphone'
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className='w-full bg-white border border-navy/10 text-navy px-5 py-4 placeholder:text-navy/40 focus:border-gold focus:outline-none transition-colors'
                    />
                  </div>

                  <motion.input
                    variants={fadeInUp}
                    whileFocus={{ scale: 1.02, borderColor: "#AF9778" }}
                    type='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className='w-full bg-white border border-navy/10 text-navy px-5 py-4 placeholder:text-navy/40 focus:border-gold focus:outline-none transition-colors'
                  />

                  <motion.textarea
                    variants={fadeInUp}
                    whileFocus={{ scale: 1.02, borderColor: "#AF9778" }}
                    placeholder='Votre message'
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className='w-full bg-white border border-navy/10 text-navy px-5 py-4 placeholder:text-navy/40 focus:border-gold focus:outline-none transition-colors resize-none'
                  />

                  <motion.button
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, backgroundColor: "#AF9778", color: "#07181E" }}
                    whileTap={{ scale: 0.98 }}
                    type='submit'
                    className='w-full bg-navy text-cream py-4 uppercase tracking-widest text-sm font-medium transition-all duration-300'>
                    Envoyer
                  </motion.button>
                </motion.form>
              </RevealOnScroll>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
