'use client'

import Container from '@/components/Container'
import Section from '@/components/Section'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'
import TextReveal from '@/components/TextReveal'
import { motion, useReducedMotion } from 'framer-motion'
import { useParallax, useParallaxStyle, useParallaxXY } from '@/hooks/useParallax'
import { LOGOS, BACKGROUNDS } from '@/lib/images'
import GoogleMap from '@/components/GoogleMap'
import GalleryLightbox from '@/components/GalleryLightbox'
import SectionTitle from '@/components/SectionTitle'
import StarRating from '@/components/StarRating'
import { services, team, galleryImages, reviews, hours } from '@/lib/data'
import AboutSection from '@/components/AboutSection'

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const shouldReduceMotion = useReducedMotion()

  // ── Section container refs (for Framer Motion useScroll targeting) ──────
  const heroSectionRef = useRef<HTMLElement>(null)
  const atmosphereSectionRef = useRef<HTMLElement>(null)
  const galerieSectionRef = useRef<HTMLElement>(null)
  const avisSectionRef = useRef<HTMLElement>(null)
  const ctaSectionRef = useRef<HTMLElement>(null)

  // ── GSAP parallax refs — lazy-load GSAP, respect prefers-reduced-motion ─
  const heroBgRef = useParallax<HTMLDivElement>(0.25)
  const atmosphereBgRef = useParallax<HTMLDivElement>(0.3)
  const interiorBgRef = useParallax<HTMLDivElement>(0.4)
  const ctaBgRef = useParallax<HTMLDivElement>(0.2, 1.5)

  // ── Hero section parallax layers ────────────────────────────────────────
  const heroOrb1Y = useParallaxStyle(heroSectionRef, { outputRange: [-80, 80] })
  const heroOrb2Y = useParallaxStyle(heroSectionRef, { outputRange: [60, -60] })
  const heroGridY = useParallaxStyle(heroSectionRef, { outputRange: [-20, 40] })
  const heroDecorY = useParallaxStyle(heroSectionRef, { outputRange: [30, -50] })

  // ── Atmosphère section parallax layers ──────────────────────────────────
  const atmosphereOrb1 = useParallaxXY(atmosphereSectionRef, [-15, 15], [-60, 40])
  const atmosphereOrb2 = useParallaxXY(atmosphereSectionRef, [12, -12], [40, -60])

  // ── Galerie section parallax layers ─────────────────────────────────────
  const galerieWatermarkY = useParallaxStyle(galerieSectionRef, { outputRange: [-50, 70] })
  const galerieOrb1 = useParallaxXY(galerieSectionRef, [-8, 8], [-40, 40])

  // ── Avis section parallax layers ────────────────────────────────────────
  const avisWatermarkY = useParallaxStyle(avisSectionRef, { outputRange: [-60, 60] })
  const avisOrb1 = useParallaxXY(avisSectionRef, [10, -10], [-50, 50])

  // ── CTA section parallax layers ─────────────────────────────────────────
  const ctaOrb1Y = useParallaxStyle(ctaSectionRef, { outputRange: [-70, 50] })
  const ctaOrb2Y = useParallaxStyle(ctaSectionRef, { outputRange: [50, -70] })

  // State for gallery count
  const [galleryCount, setGalleryCount] = useState(6)

  useEffect(() => {
    // Adjust gallery count based on screen width
    const handleResize = () => {
      setGalleryCount(window.innerWidth < 768 ? 5 : 6)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Particles removed for performance/anim cleanup as requested
  // Parallax logic removed

  return (
    <>
      <main className='grow'>
        {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION — Premium Animated
      ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={heroSectionRef}
          className='relative min-h-screen flex items-center overflow-hidden'>
          {/* ── Ken Burns Background ─────────────────────────────────────────── */}
          <div className='absolute inset-0 overflow-hidden'>
            <div ref={heroBgRef} className='absolute inset-0 scale-[1.15] will-change-transform'>
              <motion.div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url('${BACKGROUNDS.homeHero.src}')` }}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 12, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              {/* Gradient overlay — left heavy for text legibility */}
              <div
                className='absolute inset-0'
                style={{
                  background:
                    'linear-gradient(to right, rgba(7,24,30,0.97) 0%, rgba(7,24,30,0.92) 30%, rgba(7,24,30,0.65) 60%, rgba(7,24,30,0.20) 100%)',
                }}
              />
              {/* Bottom fade into next section */}
              <div className='absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy to-transparent' />
              {/* Radial vignette */}
              <div
                className='absolute inset-0'
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 40%, rgba(7,24,30,0.45) 100%)',
                }}
              />
            </div>
          </div>

          {/* ── Animated Parallax Orbs ───────────────────────────────────────── */}
          <div className='absolute inset-0 pointer-events-none'>
            <motion.div
              className='absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full blur-[140px]'
              style={{
                y: heroOrb1Y,
                background: 'radial-gradient(circle, rgba(175,151,120,0.14) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className='absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full blur-[120px]'
              style={{
                y: heroOrb2Y,
                background: 'radial-gradient(circle, rgba(175,151,120,0.10) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <motion.div
              className='absolute top-[35%] right-[30%] w-[250px] h-[250px] rounded-full blur-[90px]'
              style={{
                y: heroDecorY,
                background: 'radial-gradient(circle, rgba(175,151,120,0.07) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>

          {/* ── Parallax Grid Overlay ────────────────────────────────────────── */}
          <motion.div
            className='absolute inset-0 pointer-events-none'
            style={{
              y: heroGridY,
              backgroundImage:
                'linear-gradient(rgba(175,151,120,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(175,151,120,0.035) 1px, transparent 1px)',
              backgroundSize: '100px 100px',
              maskImage: 'radial-gradient(ellipse 70% 60% at 30% 50%, black, transparent)',
            }}
          />

          {/* ── Flying Gold Particles ────────────────────────────────────────── */}
          <div className='absolute inset-0 pointer-events-none overflow-hidden hidden md:block'>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute w-[2px] h-[2px] rounded-full bg-gold'
                style={{
                  left: `${8 + ((i * 7) % 55)}%`,
                  top: `${15 + ((i * 11) % 70)}%`,
                  opacity: 0,
                }}
                animate={{
                  y: [0, -80 - i * 12],
                  opacity: [0, 0.6 + (i % 3) * 0.15, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 3)],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 5 + i * 0.7,
                  repeat: Infinity,
                  delay: i * 0.9,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* ── Animated Left Border Line ────────────────────────────────────── */}
          <motion.div
            className='absolute left-0 top-0 w-[1.5px] bg-gradient-to-b from-transparent via-gold to-transparent'
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.45 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '100%', transformOrigin: 'top' }}
          />
          {/* Animated Right Accent Line */}
          <motion.div
            className='absolute right-0 top-0 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden xl:block'
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '100%', transformOrigin: 'top' }}
          />

          {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
          <div className='relative z-10 w-full pt-4 translate-y-[100px] md:translate-y-[0px]'>
            <Container>
              <div className='max-w-4xl'>
                {/* Mobile Stats Row */}
                <div className='flex flex-row items-center mx-auto justify-between gap-4 lg:hidden max-w-md translate-y-[-240px] md:translate-y-[-140px]'>
                  {[
                    { label: 'Expérience', val: '23 ans' },
                    { label: 'Avis Google', val: '★★★★★' },
                    { label: 'Clients', val: '2000+' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className='flex flex-col items-center'
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.3 + i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}>
                      <span className='text-2xl font-title text-gold font-light leading-none mb-1'>
                        {stat.val}
                      </span>
                      <span className='text-[0.6rem] text-cream/60 tracking-[0.1em] font-light uppercase leading-tight'>
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* ── Grand Badge Title ─────────────────────────────────────── */}
                <div className='mb-6'>
                  <div className='relative block lg:inline-block ml-0 lg:ml-[-8px]'>
                    {/* Animated Gold Scan Line — sweeps across title on load */}
                    <motion.div
                      className='absolute inset-0 pointer-events-none z-20 overflow-hidden hidden md:block'
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 2.2 }}>
                      <motion.div
                        className='absolute top-0 bottom-0 w-[3px] blur-[2px]'
                        style={{
                          background:
                            'linear-gradient(to bottom, transparent 0%, rgba(175,151,120,0.9) 40%, rgba(255,220,150,1) 50%, rgba(175,151,120,0.9) 60%, transparent 100%)',
                        }}
                        initial={{ left: '-5%' }}
                        animate={{ left: '110%' }}
                        transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </motion.div>

                    {/* COIFFEUR word — staggered blur-slide-in */}
                    <h1 className='relative flex flex-col items-center lg:items-start lg:items-center justify-center text-center md:text-left lg:text-center md:translate-y-[100px] lg:translate-y-[40px]'>
                      <span className='relative flex flex-col items-center md:items-start lg:items-center justify-center lg:mb-8'>
                        <span className='flex flex-col gap-2 md:gap-3 lg:gap-0 items-center md:items-start lg:items-center'>
                          {/* COIFFEUR */}
                          <motion.span
                            className='text-6xl md:text-7xl lg:text-8xl text-gold leading-[0.7] lg:leading-[0.9] tracking-[-0.02em] relative inline-block'
                            initial={
                              shouldReduceMotion
                                ? false
                                : { opacity: 0, y: 40, filter: 'blur(20px)' }
                            }
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                            COIFFEUR
                            {/* Shimmer overlay on the word */}
                            <motion.span
                              className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none'
                              initial={{ x: '-150%' }}
                              animate={{ x: '250%' }}
                              transition={{ duration: 0.8, delay: 1.8, ease: 'easeOut' }}
                            />
                          </motion.span>

                          {/* & BARBIER */}
                          <span className='flex items-center gap-4 md:gap-6'>
                            <motion.span
                              className='text-6xl md:text-7xl lg:text-8xl text-gold leading-[0.7] lg:leading-[0.9]'
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : { opacity: 0, y: 40, filter: 'blur(20px)' }
                              }
                              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                              transition={{ duration: 1.0, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                              &amp;
                            </motion.span>
                            <motion.span
                              className='text-6xl md:text-7xl lg:text-8xl text-gold leading-[0.7] lg:leading-[0.9] tracking-[-0.04em] relative inline-block'
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : { opacity: 0, y: 40, filter: 'blur(20px)' }
                              }
                              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                              transition={{ duration: 1.0, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                              BARBIER
                              <motion.span
                                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none'
                                initial={{ x: '-150%' }}
                                animate={{ x: '250%' }}
                                transition={{ duration: 0.8, delay: 2.05, ease: 'easeOut' }}
                              />
                            </motion.span>
                          </span>
                        </span>
                      </span>

                      {/* à Paris le Marais — with animated lines expanding outward */}
                      <motion.span
                        className='flex items-center gap-4 w-full justify-center lg:justify-start lg:justify-center lg:mb-8 mt-2 md:mt-[4px] lg:mt-[-20px]'
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.0 }}>
                        <motion.span
                          className='h-[1px] bg-gradient-to-r from-transparent to-gold/60'
                          initial={{ width: 0 }}
                          animate={{ width: 'clamp(2rem, 6vw, 6rem)' }}
                          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <motion.span
                          className='text-xl lg:text-3xl italic text-gold/80 tracking-[0.01em] font-light'
                          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 1.15 }}
                          style={{ textShadow: '0 2px 24px rgba(7,24,30,0.9)' }}>
                          à Paris le Marais
                        </motion.span>
                        <motion.span
                          className='h-[1px] bg-gradient-to-l from-transparent to-gold/60'
                          initial={{ width: 0 }}
                          animate={{ width: 'clamp(2rem, 6vw, 6rem)' }}
                          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </motion.span>
                    </h1>

                    {/* CTA Button with magnetic glow */}
                    <motion.div
                      className='relative flex mt-8 mb-4 md:translate-y-32 lg:translate-y-4 justify-center items-center'
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}>
                      {/* Pulsing glow ring */}
                      <motion.div
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-20 rounded-full pointer-events-none'
                        style={{
                          background:
                            'radial-gradient(ellipse, rgba(175,151,120,0.25) 0%, transparent 70%)',
                        }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      {/* Secondary outer glow ring */}
                      <motion.div
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full pointer-events-none'
                        style={{
                          background:
                            'radial-gradient(ellipse, rgba(175,151,120,0.10) 0%, transparent 70%)',
                        }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                        transition={{
                          duration: 3.6,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.5,
                        }}
                      />
                      <Button href='/reservation'>Prendre rendez-vous</Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {/* ── Desktop Stat Cards — right side ─────────────────────────────── */}
          <div className='hidden lg:block absolute top-1/2 -translate-y-1/2 right-6 md:right-8 lg:right-12 xl:right-20 z-20'>
            <div className='flex flex-col gap-6'>
              {[
                { label: 'Années d\u2019expérience', val: '23+' },
                { label: 'Clients satisfaits', val: '2000+' },
                { label: 'Note Google', val: '5★' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className='group relative flex items-center gap-3 md:gap-5 lg:gap-6 backdrop-blur-2xl rounded-2xl px-4 py-3 md:px-6 md:py-4 xl:px-8 lg:py-6 shadow-2xl overflow-hidden cursor-default'
                  style={{
                    background: 'rgba(7,24,30,0.55)',
                    border: '1px solid rgba(175,151,120,0.10)',
                  }}
                  initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  whileHover={{
                    borderColor: 'rgba(175,151,120,0.35)',
                    background: 'rgba(7,24,30,0.75)',
                    scale: 1.03,
                    transition: { duration: 0.25 },
                  }}
                  whileFocus={{
                    borderColor: 'rgba(175,151,120,0.35)',
                    background: 'rgba(7,24,30,0.75)',
                    scale: 1.03,
                    transition: { duration: 0.25 },
                  }}
                  whileTap={{
                    borderColor: 'rgba(175,151,120,0.35)',
                    background: 'rgba(7,24,30,0.75)',
                    scale: 1.03,
                    transition: { duration: 0.25 },
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.8,
                    delay: shouldReduceMotion ? 0 : 0.9 + i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  tabIndex={0}>
                  {/* Hover shimmer sweep */}
                  <motion.div
                    className='absolute inset-0 -skew-x-12 pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 30%, rgba(175,151,120,0.08) 50%, transparent 70%)',
                    }}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    whileFocus={{ x: '200%' }}
                    whileTap={{ x: '200%' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  {/* Left gold accent bar */}
                  <motion.div
                    className='absolute left-0 top-1/4 bottom-1/4 w-[2px] rounded-full'
                    style={{
                      background:
                        'linear-gradient(to bottom, transparent, rgba(175,151,120,0.7), transparent)',
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 + i * 0.18 }}
                  />
                  <div className='text-3xl lg:text-5xl xl:text-6xl font-title text-gold font-light leading-none relative z-10'>
                    {stat.val}
                  </div>
                  <div className='text-[0.6rem] lg:text-xs text-cream/60 tracking-[0.15em] font-light leading-tight uppercase max-w-[70px] relative z-10'>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Animated Scroll Indicator ────────────────────────────────────── */}
          <motion.div
            className='absolute bottom-44 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}>
            <motion.span
              className='text-[9px] uppercase tracking-[0.3em] text-gold/50 font-light'
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}>
              Défiler
            </motion.span>
            <motion.div
              className='w-[1px] h-10 bg-gradient-to-b from-gold/60 to-transparent'
              animate={{ scaleY: [0, 1, 0], originY: 'top' }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* ── Bottom Logo Marquee ──────────────────────────────────────────── */}
          <div className='absolute bottom-0 left-0 w-full h-40 overflow-hidden z-20 flex items-end pointer-events-none'>
            <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent' />
            <div className='flex items-center w-max animate-marquee-rtl relative z-10'>
              {[...Array(30)].map((_, i) => (
                <div key={i} className='shrink-0 px-6 lg:px-10 opacity-25'>
                  <Image
                    src={LOGOS.golden.src}
                    alt={LOGOS.golden.alt}
                    width={240}
                    height={160}
                    className='w-auto h-24 lg:h-32 object-contain'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Animated Decorative Corners ─────────────────────────────────── */}
          <motion.div
            className='absolute top-32 right-16 w-28 h-28 border-t border-r border-gold/20 hidden md:block'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className='absolute bottom-44 left-16 w-28 h-28 border-b border-l border-gold/20 hidden md:block'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Extra top-left accent */}
          <motion.div
            className='absolute top-32 left-16 w-16 h-16 border-t border-l border-gold/12 hidden xl:block'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.9 }}
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
          À PROPOS SECTION — GSAP animated (see AboutSection.tsx)
      ═══════════════════════════════════════════════════════════════════ */}
        <AboutSection />

        {/* ═══════════════════════════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
        <Section id='services' className='bg-navy border-gold/10 relative overflow-hidden z-10'>
          {/* Decorative background elements */}
          <div className='absolute inset-0 pointer-events-none'>
            {/* Logo stamp - top right */}
            <Image
              src={LOGOS.linstant.src}
              alt=''
              width={180}
              height={180}
              className='absolute top-4 right-4 md:top-10 md:right-10 opacity-[0.04] rotate-12 select-none w-24 h-24 md:w-40 md:h-40'
              aria-hidden='true'
            />
            {/* Large watermark ampersand */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[25rem] lg:text-[35rem] xl:text-[45rem] font-title text-gold select-none leading-none opacity-[0.03]'>
              &
            </div>
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
                <h2 className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold leading-[0.8] tracking-[-2px] mb-6'>
                  Prestations
                </h2>

                {/* Decorative line */}
                <div className='mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent' />
              </div>
            </Reveal>

            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
              {services.map((service, index) => (
                <Reveal
                  key={index}
                  variant='fade-up'
                  delay={index * 0.1}
                  className={index === 2 ? 'hidden lg:block' : ''}>
                  <article className='group text-center p-8 border border-gold/20 hover:border-gold/50 transition-all duration-500 relative overflow-hidden h-full touch-card-lift md:hover:-translate-y-2'>
                    {/* Icon */}
                    <div className='flex justify-center mb-6 relative z-10'>
                      <div className='text-gold'>{service.icon}</div>
                    </div>

                    {/* Title */}
                    <h3 className='text-lg h-12 font-title text-gold mb-4 uppercase tracking-wide leading-tight relative z-10'>
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className='text-cream/70 md:h-40 text-sm leading-relaxed mb-6 relative z-10'>
                      {service.description}
                    </p>

                    {/* En savoir plus link */}
                    <Link
                      href={service.link}
                      className='inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest hover:text-cream transition-colors group relative z-10 touch-link'>
                      En savoir plus
                      <span>→</span>
                    </Link>
                  </article>
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
        <section
          ref={atmosphereSectionRef}
          className='relative py-16 md:py-24 lg:py-32 xl:py-40 bg-dark overflow-hidden'>
          {/* Background — GSAP parallax replaces CSS bg-fixed */}
          <div
            ref={atmosphereBgRef}
            className='absolute inset-0 scale-[1.2] bg-cover bg-center will-change-transform'
            style={{ backgroundImage: `url('${BACKGROUNDS.homeAtmosphere.src}')` }}
          />
          <div className='absolute inset-0 bg-dark/85' />
          {/* Parallax floating accent orbs over the bg */}
          <motion.div
            style={{ x: atmosphereOrb1.x, y: atmosphereOrb1.y }}
            className='absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold/6 rounded-full blur-[100px] pointer-events-none'
          />
          <motion.div
            style={{ x: atmosphereOrb2.x, y: atmosphereOrb2.y }}
            className='absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gold/4 rounded-full blur-[80px] pointer-events-none'
          />
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

            <div className='grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start'>
              <div className='p-4'>
                {team.map((member, index) => (
                  <Reveal key={index} variant='scale-up' delay={index * 0.1} threshold={0.2}>
                    <article className='group relative touch-card-lift'>
                      <div className='relative'>
                        <div className='relative aspect-3/4 md:aspect-3/4 overflow-hidden bg-navy'>
                          <div
                            className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
                            style={{ backgroundImage: `url(${member.image})` }}
                          />
                          <div className='absolute inset-0 bg-linear-to-t from-navy to-navy/20' />
                        </div>
                        {/* Corner accent - outside frame, not affected by hover */}
                        <div className='absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-gold/40 pointer-events-none' />
                        <div className='absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-gold/40 pointer-events-none' />
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
        <Section
          id='galerie'
          ref={galerieSectionRef as React.RefObject<HTMLElement>}
          className='bg-navy border-t border-gold/10 relative overflow-hidden'>
          {/* Decorative background elements */}
          <div className='absolute inset-0 pointer-events-none'>
            {/* Logo stamp - bottom right */}
            <Image
              src={LOGOS.linstant.src}
              alt=''
              width={160}
              height={160}
              className='absolute bottom-10 right-4 md:bottom-20 md:right-10 opacity-[0.04] rotate-6 select-none w-24 h-24 md:w-36 md:h-36'
              aria-hidden='true'
            />
            {/* Large watermark scissors icon — parallax drift */}
            <motion.div
              style={{ y: galerieWatermarkY }}
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]'>
              <svg
                className='w-[12rem] h-[12rem] md:w-[25rem] md:h-[25rem] lg:w-[35rem] lg:h-[35rem] xl:w-[45rem] xl:h-[45rem] text-gold'
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
            </motion.div>
            {/* Gradient orbs — parallax */}
            <motion.div
              style={{ x: galerieOrb1.x, y: galerieOrb1.y }}
              className='absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl'
            />
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

            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4'>
              {galleryImages.slice(0, galleryCount).map((image, index) => {
                const isFirst = index === 0
                return (
                  <Reveal
                    key={index}
                    variant='scale-up'
                    delay={index * 0.1}
                    className={`${isFirst ? 'col-span-2 row-span-2' : ''} aspect-square`}>
                    <div className={`${isFirst ? 'h-full' : 'aspect-square'}`}>
                      <div
                        onClick={() => setLightboxIndex(index)}
                        className='relative w-full h-full overflow-hidden group cursor-pointer touch-feedback touch-highlight'>
                        {/* Image background */}
                        <div
                          className='absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110'
                          style={{ backgroundImage: `url("${image.src}")` }}
                        />

                        {/* Navy overlay that becomes transparent on hover */}
                        <div className='absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500' />

                        {/* Top-left corner accent */}
                        <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />

                        {/* Bottom-right corner accent */}
                        <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />

                        {/* Center "+" icon with backdrop blur */}
                        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
                          <div className='absolute inset-0 bg-navy/50 backdrop-blur-[2px]' />
                          <div
                            className={`relative ${isFirst ? 'w-12 h-12' : 'w-9 h-9'} border border-gold/60 flex items-center justify-center`}>
                            <span className={`text-gold ${isFirst ? 'text-2xl' : 'text-lg'}`}>
                              +
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <Reveal variant='fade-up' delay={0.2} className='text-center mt-10'>
              <Link
                href='/galerie'
                className='inline-flex items-center gap-2 text-gold text-sm uppercase tracking-widest hover:text-cream transition-colors group touch-link'>
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
        <section className='relative h-[40vh] md:h-[60vh] overflow-hidden'>
          {/* Background — GSAP parallax replaces CSS bg-fixed */}
          <div
            ref={interiorBgRef}
            className='absolute inset-0 scale-[1.2] bg-cover bg-center will-change-transform'
            style={{ backgroundImage: `url('${BACKGROUNDS.homeInterior.src}')` }}
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
        <Section
          id='avis'
          ref={avisSectionRef as React.RefObject<HTMLElement>}
          className='bg-navy border-t border-gold/10 relative overflow-hidden'>
          {/* Decorative background elements */}
          <div className='absolute inset-0 pointer-events-none'>
            {/* Logo stamp - top left */}
            <Image
              src={LOGOS.linstant.src}
              alt=''
              width={200}
              height={200}
              className='absolute top-4 left-4 md:top-10 md:left-10 opacity-[0.04] -rotate-6 select-none w-24 h-24 md:w-44 md:h-44'
              aria-hidden='true'
            />
            {/* Large watermark quote — parallax drift */}
            <motion.div
              style={{ y: avisWatermarkY }}
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[25rem] lg:text-[35rem] xl:text-[45rem] font-serif text-gold select-none leading-none opacity-[0.03]'>
              &ldquo;
            </motion.div>
            {/* Gradient orbs — parallax */}
            <motion.div
              style={{ x: avisOrb1.x, y: avisOrb1.y }}
              className='absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl'
            />
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

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
              {reviews.map((review, index) => (
                <Reveal
                  key={index}
                  variant='fade-up'
                  delay={index * 0.15}
                  threshold={0.1}
                  className={index === 2 ? 'hidden lg:block' : ''}>
                  <article className='bg-dark/50 border border-gold/20 p-6 md:p-8 relative hover:border-gold/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/10 cursor-default transition-all duration-500 h-full overflow-visible group/review flex flex-col mt-8 md:mt-0 touch-card-lift'>
                    <div className='absolute -top-8 md:-top-10 left-4 md:left-6'>
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
                className='inline-flex items-center gap-3 text-gold text-sm uppercase tracking-[0.2em] hover:text-cream transition-colors duration-500 group touch-link touch-highlight'>
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
          <Container className='px-4 md:px-6'>
            <div>
              <Reveal variant='fade-up'>
                <div className='flex items-center justify-center gap-4 mb-8'>
                  <span className='w-16 h-px bg-gradient-to-r from-transparent to-gold' />
                  <span className='text-gold text-xs uppercase text-center tracking-[0.3em] font-body'>
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

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24'>
                <div>
                  <Reveal variant='fade-up' delay={0.3}>
                    <h3 className='text-lg font-title text-gold/90 mb-6 tracking-wide text-center lg:text-left'>
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
                    <div className='mt-12 flex justify-center lg:justify-start'>
                      <Button href='/reservation'>Réserver un créneau</Button>
                    </div>
                  </Reveal>
                </div>

                <div className='space-y-6'>
                  <Reveal variant='fade-up' delay={0.3}>
                    <h3 className='text-lg font-title text-gold/90 mb-4 tracking-wide text-center lg:text-left'>
                      Notre adresse
                    </h3>
                    <p className='text-cream/80 text-[15px] font-body mb-6 text-center lg:text-left'>
                      43 rue de Turenne, 75003 Paris
                    </p>
                  </Reveal>

                  <Reveal variant='scale-up' delay={0.4} threshold={0.2}>
                    <GoogleMap
                      address='43 rue de Turenne, 75003 Paris'
                      className='w-full h-[280px] md:h-[400px] lg:h-full lg:min-h-[500px]'
                    />
                  </Reveal>
                </div>
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
                  <div className='relative aspect-4/3 overflow-hidden group transition-transform duration-500'>
                    <div
                      className='absolute inset-0 bg-cover bg-center'
                      style={{ backgroundImage: `url('${BACKGROUNDS.homeMap.src}')` }}
                    />
                    <div className='absolute inset-0 bg-navy/40' />
                    {/* Corner accent */}
                    <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                    <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
                  </div>

                  <div className='absolute bottom-0 left-0 right-0 p-4 md:p-6'>
                    <div className='bg-navy/90 backdrop-blur-sm border border-gold/30 p-3 md:p-6 space-y-2 md:space-y-4'>
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
                  <p className='text-cream/70 text-sm md:text-base mb-8 leading-relaxed'>
                    Pour prendre rendez-vous, consultez notre{' '}
                    <Link
                      href='/prestations'
                      className='text-gold hover:text-gold/80 underline underline-offset-4 transition-colors touch-link'>
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
        <section
          ref={ctaSectionRef}
          className='relative min-h-[80vh] flex items-center overflow-hidden border-t border-gold/10'>
          <div className='absolute inset-0'>
            {/* GSAP parallax background */}
            <div
              ref={ctaBgRef}
              className='absolute inset-0 scale-[1.15] bg-cover bg-center will-change-transform'
              style={{ backgroundImage: `url('${BACKGROUNDS.homeCta.src}')` }}
            />
            <div className='absolute inset-0 bg-gradient-to-b from-navy/65 via-dark/55 to-navy/65' />
            <div className='absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-navy/40' />
            <div className='absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:4px_4px]' />
          </div>
          {/* Parallax floating accent orbs */}
          <motion.div
            style={{ y: ctaOrb1Y }}
            className='absolute top-1/4 left-1/4 w-64 h-64 bg-gold/8 rounded-full blur-[80px] pointer-events-none'
          />
          <motion.div
            style={{ y: ctaOrb2Y }}
            className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/6 rounded-full blur-[100px] pointer-events-none'
          />

          <Container className='relative z-10 py-20'>
            <div className='max-w-4xl mx-auto'>
              <Reveal variant='scale-up' duration={1} threshold={0.2}>
                <div className='relative bg-navy/40 backdrop-blur-xl border border-gold/20 rounded-sm p-5 md:p-8 lg:p-12 shadow-2xl overflow-hidden'>
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
