'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { LOGOS, VIDEO, PRODUCT_GRID, ABOUT_IMAGES } from '@/lib/images'
import Container from '@/components/Container'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import TextReveal from '@/components/TextReveal'
import { motion, useScroll, useTransform } from 'framer-motion'

// ── helpers ──────────────────────────────────────────────────────────────────

/** Splits a string of text into individual <span> word elements */
function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className='about-word inline-block mr-[0.3em]'>
          <span className='about-word-inner inline-block relative'>{word}</span>
        </span>
      ))}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT SECTION COMPONENT
// Scroll-driven cinematic video experience with three-phase reveal:
//   Phase 1 (0–30%)  — Atmospheric Entrance: blur, scale, dark overlay
//   Phase 2 (30–65%) — Architectural Reveal: clip-path mask expansion
//   Phase 3 (65–100%) — Immersive Activation: parallax settle, unpin
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const labelLineLeftRef = useRef<HTMLSpanElement>(null)
  const labelLineRightRef = useRef<HTMLSpanElement>(null)
  const labelTextRef = useRef<HTMLSpanElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const separatorRef = useRef<HTMLDivElement>(null)
  const benefitCard1Ref = useRef<HTMLDivElement>(null)
  const benefitCard2Ref = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const square1Ref = useRef<HTMLDivElement>(null)
  const square2Ref = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)

  // ── Scroll progress for interactive badge rotation ───────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  // ── Cinematic video refs ───────────────────────────────────────────────────
  const cinematicPinRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const cinematicOverlayRef = useRef<HTMLDivElement>(null)
  const cornerTLRef = useRef<HTMLDivElement>(null)
  const cornerBRRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  // ── IntersectionObserver for video autoplay/pause ──────────────────────────
  useEffect(() => {
    const video = videoRef.current
    const container = videoContainerRef.current
    if (!video || !container) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            video.play().catch(() => {})
          } else if (!video.paused) {
            video.pause()
          }
        })
      },
      { threshold: 0.1 },
    )
    obs.observe(container)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id='a-propos'
      ref={sectionRef}
      className='bg-navy relative overflow-hidden py-16 md:py-24 lg:py-32'>
      {/* ── Vertical progress reveal line ─────────────────────────────────── */}
      <div
        ref={progressLineRef}
        className='absolute left-0 top-0 bottom-0 w-[2px] origin-top'
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(175,151,120,0.5) 30%, rgba(175,151,120,0.5) 70%, transparent)',
        }}
      />

      {/* ── Ambient background orbs ───────────────────────────────────────── */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div
          ref={orb1Ref}
          className='absolute -top-32 right-0 w-[600px] h-[600px] rounded-full'
          style={{
            background: 'radial-gradient(circle, rgba(175,151,120,0.08) 0%, transparent 65%)',
          }}
        />
        <div
          ref={orb2Ref}
          className='absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full'
          style={{
            background: 'radial-gradient(circle, rgba(175,151,120,0.06) 0%, transparent 65%)',
          }}
        />

        {/* Pulsing center orb */}
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-[aboutOrbPulse_8s_ease-in-out_infinite]'
          style={{
            background: 'radial-gradient(circle, rgba(175,151,120,0.04) 0%, transparent 50%)',
          }}
        />

        {/* Decorative rotating squares */}
        <div
          ref={square1Ref}
          className='absolute top-[15%] right-[10%] w-80 h-80 border border-gold/20 opacity-10'
        />
        <div
          ref={square2Ref}
          className='absolute bottom-[15%] left-[8%] w-56 h-56 border border-gold/15 opacity-10'
        />

        {/* Subtle dot grid pattern */}
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage: 'radial-gradient(circle, #AF9778 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)',
          }}
        />

        {/* Floating gold particles */}
        <div className='hidden md:block'>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className='absolute w-[2px] h-[2px] rounded-full bg-gold/60'
              style={{
                left: `${12 + ((i * 13) % 76)}%`,
                top: `${10 + ((i * 17) % 80)}%`,
                animation: `aboutParticleFloat ${6 + i * 1.2}s ease-in-out ${i * 0.8}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Diagonal shimmer sweep */}
        <div
          className='absolute inset-0 hidden md:block'
          style={{
            background:
              'linear-gradient(135deg, transparent 40%, rgba(175,151,120,0.03) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: 'aboutShimmerSweep 12s ease-in-out infinite',
          }}
        />

        {/* Horizontal gold line accents */}
        <div
          className='absolute top-[25%] left-0 right-0 h-px opacity-[0.06]'
          style={{
            background:
              'linear-gradient(to right, transparent, #AF9778 30%, #AF9778 70%, transparent)',
          }}
        />
        <div
          className='absolute bottom-[20%] left-0 right-0 h-px opacity-[0.04]'
          style={{
            background:
              'linear-gradient(to right, transparent, #AF9778 20%, #AF9778 80%, transparent)',
          }}
        />

        {/* Logo watermark */}
        <Image
          src={LOGOS.linstant.src}
          alt=''
          width={320}
          height={320}
          className='absolute bottom-16 left-8 opacity-[0.025] -rotate-12 select-none w-40 h-40 md:w-64 md:h-64 pointer-events-none'
          aria-hidden='true'
        />

        {/* Large watermark ampersand */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] lg:text-[40rem] font-title text-gold select-none leading-none opacity-[0.015] pointer-events-none'>
          &
        </div>
      </div>

      {/* CSS keyframes for background animations */}
      <style jsx>{`
        @keyframes aboutParticleFloat {
          0%,
          100% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
            transform: translateY(-10px) scale(1.5);
          }
          85% {
            opacity: 0.5;
            transform: translateY(-60px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(0);
          }
        }
        @keyframes aboutShimmerSweep {
          0%,
          100% {
            background-position: 200% 200%;
          }
          50% {
            background-position: -100% -100%;
          }
        }
        @keyframes aboutOrbPulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 1;
          }
        }
      `}</style>

      <Container className='relative z-10'>
        {/* ── Section label ──────────────────────────────────────────────── */}
        <Reveal variant='fade-up' className='flex items-center justify-center gap-4 mb-16 md:mb-20'>
          <span
            ref={labelLineLeftRef}
            className='block w-16 h-px'
            style={{
              background: 'linear-gradient(to right, transparent, #AF9778)',
              transformOrigin: 'right',
            }}
          />
          <span
            ref={labelTextRef}
            className='text-gold text-[10px] uppercase tracking-[0.45em] font-medium'>
            À propos
          </span>
          <span
            ref={labelLineRightRef}
            className='block w-16 h-px'
            style={{
              background: 'linear-gradient(to left, transparent, #AF9778)',
              transformOrigin: 'left',
            }}
          />
        </Reveal>

        {/* ── Centered text content ────────────────────────────────────────── */}
        <div className='text-center max-w-3xl mx-auto mb-16 md:mb-20 md:hidden'>
          {/* Headline */}
          <Reveal variant='fade-up' delay={0.2} className='about-headline mb-6'>
            <h2 className='flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 mb-2'>
              {/* "23" large counter */}
              <span
                ref={counterRef}
                className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold font-light leading-[0.82] tracking-[-2px]'
                aria-label='23'>
                23
              </span>
              <span className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-title text-gold/75 uppercase tracking-[1px]'>
                ans
              </span>
            </h2>

            <span className='block text-2xl md:text-3xl lg:text-4xl font-title text-cream/55 leading-[0.9] tracking-tight'>
              au service du style masculin
            </span>
          </Reveal>

          {/* Separator line — scaleX draw */}
          <Reveal variant='scale-up' delay={0.3}>
            <div
              ref={separatorRef}
              className='w-24 h-px mx-auto mb-8 origin-center'
              style={{
                background:
                  'linear-gradient(to right, transparent, #AF9778 30%, #AF9778 70%, transparent)',
              }}
            />
          </Reveal>

          {/* Description paragraphs */}
          <Reveal variant='fade-up' delay={0.4} className='space-y-4 mb-8'>
            <p className='about-para text-cream/90 text-lg lg:text-xl leading-[1.75] tracking-wide font-light'>
              Fondé par Riccardo, maître barbier reconnu à Paris depuis plus de{' '}
              <span className='text-gold'>23 ans</span>, nous maîtrisons les techniques classiques
              comme les tendances contemporaines dans notre salon du Marais.
            </p>
            <p className='about-para text-cream/65 text-base leading-[1.75] tracking-wide'>
              Du taper fade au rasage traditionnel à la serviette chaude, chaque geste est précis.
            </p>
          </Reveal>

          {/* Feature tags */}
          <Reveal
            variant='blur-in'
            delay={0.5}
            className='about-para flex flex-wrap justify-center gap-3'>
            {[
              'Dégradés maîtrisés',
              'Rasage serviette chaude',
              'Produits premium',
              'Tailleur de barbe',
            ].map((tag) => (
              <span
                key={tag}
                className='text-[0.65rem] uppercase tracking-[0.2em] text-gold/70 border border-gold/20 px-3 py-1.5 rounded-full backdrop-blur-sm'
                style={{ background: 'rgba(175,151,120,0.04)' }}>
                {tag}
              </span>
            ))}
          </Reveal>
        </div>
      </Container>

      {/* ═══════════════════════════════════════════════════════════════════════
          CINEMATIC VIDEO — Scroll-driven reveal experience
          Scrolling = entering the salon
      ═══════════════════════════════════════════════════════════════════════ */}
      <div ref={cinematicPinRef} className='relative w-full'>
        {/* ── Background Floating Typography (Creative Mask) ── */}
        <div className='absolute inset-0 pointer-events-none flex flex-col justify-center overflow-hidden z-0 select-none'>
          <div className='translate-y-[-10vh] md:translate-y-[-15vh] whitespace-nowrap opacity-[0.03] md:opacity-[0.04]'>
            <span className='font-title text-[15vw] md:text-[8vw] lg:text-[10vw] uppercase tracking-tighter text-gold inline-block animate-[marquee-horizontal-left_40s_linear_infinite]'>
              MAÎTRISE • MAÎTRISE • MAÎTRISE • MAÎTRISE • MAÎTRISE •
            </span>
          </div>
          <div className='translate-y-[10vh] md:translate-y-[15vh] whitespace-nowrap opacity-[0.03] md:opacity-[0.04]'>
            <span
              className='font-title text-[15vw] md:text-[8vw] lg:text-[10vw] uppercase tracking-tighter text-transparent block animate-[marquee-horizontal-right_40s_linear_infinite]'
              style={{ WebkitTextStroke: '1px #AF9778', textStroke: '1px #AF9778' }}>
              ABSOLUE • ABSOLUE • ABSOLUE • ABSOLUE • ABSOLUE •
            </span>
          </div>
        </div>

        {/* Video viewport — centered portrait frame on desktop/tablet, full-width on mobile */}
        <div className='relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center z-10'>
          {/* Portrait frame container — constrains video to natural portrait ratio */}
          <Reveal
            variant='fade-up'
            duration={1.5}
            threshold={0}
            className='relative w-full min-h-[70vh] md:min-h-0 md:w-auto md:h-[90vh] md:max-w-[520px] lg:max-w-[600px] md:aspect-3/4 lg:aspect-9/16 overflow-hidden shadow-2xl shadow-navy'>
            {/* Video container */}
            <div ref={videoContainerRef} className='absolute inset-0'>
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                poster={VIDEO.aboutSection.poster}
                className='absolute inset-0 w-full h-full object-cover'>
                <source src={VIDEO.aboutSection.src} type={VIDEO.aboutSection.type} />
              </video>

              {/* Subtle gradient vignette — always present for depth */}
              <div
                className='absolute inset-0 pointer-events-none'
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 50%, rgba(7,24,30,0.4) 100%)',
                }}
              />
            </div>

            {/* Dark atmospheric overlay — fades out during scroll */}
            <div
              ref={cinematicOverlayRef}
              className='absolute inset-0 pointer-events-none'
              style={{
                background:
                  'linear-gradient(to bottom, rgba(7,24,30,0.85) 0%, rgba(7,24,30,0.6) 40%, rgba(7,24,30,0.75) 100%)',
                opacity: 0.7,
              }}
            />

            {/* ── NEW: Decorative 'X' and Typography ── */}
            <div className='absolute inset-0 z-40 flex flex-col items-center justify-end pb-32 md:pb-48 pointer-events-none'>
              {/* Box wrapper to constrain the X and Text */}
              <div className='relative flex items-center justify-center w-full h-[250px] sm:h-[300px] md:h-[350px]'>
                {/* The 'X' lines */}
                <div className='absolute inset-0 flex items-center justify-center opacity-80 overflow-hidden'>
                  <div
                    className='absolute w-[150%] h-[2px] bg-gold/50 origin-center'
                    style={{ transform: 'rotate(25deg)' }}
                  />
                  <div
                    className='absolute w-[150%] h-[2px] bg-gold/50 origin-center'
                    style={{ transform: 'rotate(-25deg)' }}
                  />
                </div>

                {/* Typography positioned into the Top & Bottom V's of the X */}
                <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                  {/* Top Text */}
                  <div className='absolute top-0 sm:top-2 md:top-4 z-10'>
                    <Reveal variant='fade-up' delay={0.3}>
                      <span className='font-serif italic text-gold/90 text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-wide opacity-90 mix-blend-overlay drop-shadow-md whitespace-nowrap'>
                        L&apos;Art du
                      </span>
                    </Reveal>
                  </div>

                  {/* Bottom Text */}
                  <div className='absolute bottom-0 sm:bottom-2 md:bottom-4 z-10'>
                    <Reveal variant='scale-up' delay={0.5}>
                      <span className='font-title text-cream/95 text-[12vw] sm:text-6xl md:text-7xl lg:text-[6rem] uppercase font-light tracking-[-0.05em] mix-blend-overlay drop-shadow-2xl leading-none'>
                        Détail
                      </span>
                    </Reveal>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner accents — cinematic frame markers */}
            <div
              ref={cornerTLRef}
              className='absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-14 md:h-14 border-t-2 border-l-2 border-gold/40 z-20 pointer-events-none'
            />
            <div
              ref={cornerBRRef}
              className='absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-14 md:h-14 border-b-2 border-r-2 border-gold/40 z-20 pointer-events-none'
            />
          </Reveal>

          {/* ── Left panel — Headline + service tags (lg+ only) ─────────── */}
          <Reveal
            variant='fade-side'
            className='hidden lg:flex absolute left-6 lg:left-[4%] xl:left-[8%] top-1/2 -translate-y-1/2 flex-col items-start gap-6 max-w-[240px] lg:max-w-[260px] z-20'>
            {/* Decorative line */}
            <div
              className='w-10 h-px'
              style={{ background: 'linear-gradient(to right, #AF9778, transparent)' }}
            />

            {/* Intro Text */}
            <div>
              <h3 className='text-gold font-title text-2xl lg:text-3xl leading-[1.1] mb-2 font-light tracking-[-0.02em]'>
                L&apos;Excellence
                <br />
                <span className='italic font-serif text-[1.15em] tracking-normal'>au Masculin</span>
              </h3>
            </div>

            {/* Separator */}
            <div
              className='w-8 h-px'
              style={{
                background: 'linear-gradient(to right, rgba(175,151,120,0.3), transparent)',
              }}
            />

            {/* Service tags — rounded pills */}
            <div className='flex flex-col gap-2'>
              {[
                'Dégradés maîtrisés',
                'Rasage serviette chaude',
                'Produits premium',
                'Tailleur de barbe',
              ].map((tag) => (
                <span
                  key={tag}
                  className='text-[0.6rem] lg:text-[0.65rem] uppercase tracking-[0.18em] text-gold/70 border border-gold/20 px-3 py-1.5 rounded-full'
                  style={{ background: 'rgba(175,151,120,0.06)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* ── Right panel — Description text (lg+ only) ─────────────────── */}
          <Reveal
            variant='fade-side'
            delay={0.2}
            className='hidden lg:flex absolute right-6 lg:right-[6%] xl:right-[10%] top-1/2 -translate-y-1/2 flex-col items-start gap-5 max-w-[240px] lg:max-w-[280px] z-20'>
            {/* Decorative line */}
            <div
              className='w-10 h-px'
              style={{ background: 'linear-gradient(to right, #AF9778, transparent)' }}
            />

            <p className='text-cream/85 text-xs lg:text-sm leading-[1.8] tracking-wide font-light'>
              Fondé par Riccardo, maître barbier reconnu à Paris depuis plus de{' '}
              <span className='text-gold'>23 ans</span>, nous maîtrisons les techniques classiques
              comme les tendances contemporaines dans notre salon du Marais.
            </p>

            {/* Separator */}
            <div
              className='w-8 h-px'
              style={{
                background: 'linear-gradient(to right, rgba(175,151,120,0.3), transparent)',
              }}
            />

            <p className='text-cream/55 text-[11px] lg:text-xs leading-[1.8] tracking-wide font-light italic'>
              Du taper fade au rasage traditionnel à la serviette chaude, chaque geste est précis.
            </p>
          </Reveal>
        </div>

        {/* Experience badge — positioned over the video corner */}
        <Reveal
          variant='scale-up'
          delay={0.6}
          className='flex absolute bottom-[10%] right-[5%] md:bottom-[5%] md:left-[calc(50%-280px)] lg:left-[calc(50%-340px)] z-30 items-center justify-center w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 pointer-events-none'>
          {/* Rotating text ring tied to scroll */}
          <motion.div className='absolute inset-0' style={{ rotate: badgeRotate }}>
            <svg viewBox='0 0 100 100' className='w-full h-full overflow-visible'>
              <path
                id='badgeTextPath'
                d='M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0'
                fill='none'
              />
              <text className='text-[8.5px] font-title font-light tracking-[0.1em] uppercase fill-gold/80'>
                <textPath
                  href='#badgeTextPath'
                  startOffset='0%'
                  textLength='264'
                  lengthAdjust='spacing'>
                  L&apos;INSTANT BARBIER • 43 RUE DE TURENNE • PARIS LE MARAIS •
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Center static badge (Logo) */}
          <div className='flex items-center justify-center w-[64px] h-[64px] md:w-[72px] md:h-[72px] relative z-10'>
            <Image
              src={LOGOS.linstant.src}
              alt='L instant Barbier'
              width={72}
              height={72}
              className='object-contain w-full h-full drop-shadow-2xl'
            />
          </div>
        </Reveal>
      </div>

      {/* ── Creative editorial tagline below video ────────────────────── */}
      <div className='relative z-10 text-center py-16 md:py-24 lg:py-32 px-6'>
        {/* Main creative tagline */}
        <div className='max-w-3xl mx-auto mb-8'>
          <TextReveal
            variant='word'
            duration={1.2}
            stagger={0.12}
            className='text-gold text-3xl md:text-5xl lg:text-6xl font-title font-light leading-[1.1] tracking-[-0.02em]'>
            L'art du geste, la précision du détail
          </TextReveal>
        </div>

        {/* Decorative line */}
        <Reveal variant='scale-up' delay={0.4}>
          <div
            className='about-para w-24 h-px mx-auto mb-10'
            style={{
              background: 'linear-gradient(to right, transparent, #AF9778, transparent)',
            }}
          />
        </Reveal>

        {/* Subtitle */}
        <Reveal variant='fade-up' delay={0.6}>
          <p className='about-para text-cream/70 text-base md:text-lg lg:text-xl leading-[1.8] font-light tracking-wide max-w-2xl mx-auto mb-8'>
            Chaque coupe raconte une histoire. Chaque trait de lame est un acte de précision et
            d&apos;élégance.
          </p>
        </Reveal>

        {/* Signature-like accent */}
        <Reveal
          variant='blur-in'
          delay={0.8}
          className='about-para flex items-center justify-center gap-4'>
          <span
            className='w-12 h-px'
            style={{ background: 'linear-gradient(to right, transparent, rgba(175,151,120,0.5))' }}
          />
          <span className='text-gold text-xs md:text-sm uppercase tracking-[0.4em] font-light italic'>
            Depuis 2002 • Paris le Marais
          </span>
          <span
            className='w-12 h-px'
            style={{ background: 'linear-gradient(to left, transparent, rgba(175,151,120,0.5))' }}
          />
        </Reveal>
      </div>
      {/* ── Benefit cards + CTA below cinematic video ────────────────────── */}
      <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-12 mt-16 md:mt-24'>
        <div className='grid md:grid-cols-2 gap-6 md:gap-8 items-stretch'>
          {[
            {
              ref: benefitCard1Ref,
              title: 'Savoir-faire artisanal',
              desc: 'Formés aux meilleures écoles, nous perpétuons les gestes authentiques du métier avec passion et rigueur.',
              image: ABOUT_IMAGES.savoirFaire.src,
              badge: '01',
            },
            {
              ref: benefitCard2Ref,
              title: 'Produits premium',
              desc: 'Huiles essentielles, baumes naturels et cosmétiques haut de gamme pour un résultat impeccable.',
              image: PRODUCT_GRID[3].src,
              badge: '02',
            },
          ].map((item) => (
            <div
              key={item.badge}
              ref={item.ref}
              className='group relative min-h-[280px] md:min-h-[400px] lg:min-h-[450px] w-full overflow-visible cursor-pointer lg:cursor-default focus:outline-none'
              tabIndex={0}
              onTouchStart={() => {}}>
              {/* Main card border + shadow + clip content */}
              <div className='absolute inset-0 overflow-hidden'>
                {/* Parallax image */}
                <div className='about-card-img absolute inset-[-12%] overflow-hidden'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover transition-transform duration-1000 group-hover:scale-[1.05] group-focus-within:scale-[1.05]'
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />
                </div>

                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent z-[1]' />
                {/* Hover gold side glow */}
                <div
                  className='absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-700 z-[2]'
                  style={{
                    background:
                      'linear-gradient(to right, rgba(175,151,120,0.07) 0%, transparent 40%)',
                  }}
                />

                {/* Number badge */}
                <div
                  className='absolute top-5 right-5 z-20 text-xs font-title text-gold/80 tracking-widest border border-gold/20 group-hover:border-gold/50 group-focus-within:border-gold/50 px-3 py-1 rounded-full backdrop-blur-sm transition-colors duration-500'
                  style={{ background: 'rgba(7,24,30,0.6)' }}>
                  {item.badge}
                </div>

                {/* Card border overlay */}
                <div className='absolute inset-0 border border-gold/20 group-hover:border-gold/45 group-focus-within:border-gold/45 transition-colors duration-700 z-10 pointer-events-none' />

                {/* Text content */}
                <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20'>
                  {/* Animated gold rule above title */}
                  <div
                    className='w-0 h-px mb-3 group-hover:w-12 group-focus-within:w-12 transition-all duration-500 origin-left'
                    style={{ background: 'linear-gradient(to right, #AF9778, transparent)' }}
                  />
                  <h4 className='text-2xl md:text-3xl font-title text-gold mb-2 tracking-[-1px] transition-transform duration-500 group-hover:-translate-y-1 group-focus-within:-translate-y-1'>
                    {item.title}
                  </h4>
                  <p className='text-cream/85 text-sm font-light leading-relaxed max-w-sm'>
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Corner accents — outside overflow container */}
              <div className='absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-gold/35 group-hover:border-gold/80 group-focus-within:border-gold/80 transition-colors duration-500 z-20 pointer-events-none' />
              <div className='absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-gold/35 group-hover:border-gold/80 group-focus-within:border-gold/80 transition-colors duration-500 z-20 pointer-events-none' />
            </div>
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className='flex justify-center mt-16 md:mt-28'>
          <Button href='/salon'>Découvrir notre univers</Button>
        </div>
      </div>
    </section>
  )
}
