'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { LOGOS, PRODUCT_GRID, ABOUT_IMAGES } from '@/lib/images'
import Container from '@/components/Container'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import { m, useScroll, useTransform } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT SECTION COMPONENT
// Premium full-width Vimeo background with editorial overlays
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
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

  const desktopVideoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) {
            // Lazy load source if not present
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src
            }
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (desktopVideoRef.current) observer.observe(desktopVideoRef.current)
    if (mobileVideoRef.current) observer.observe(mobileVideoRef.current)

    return () => observer.disconnect()
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

      {/* ═══════════════════════════════════════════════════════════════════════
          DESKTOP: À propos + three-column (left text | portrait video | right text)
          MOBILE:  full-width video → À propos → text below
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* ── Desktop "À propos" label (lg+ only, above the columns) ── */}
      <Container className='relative z-10 hidden lg:block'>
        <Reveal variant='fade-up' className='flex items-center justify-center gap-4 mb-16'>
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
      </Container>

      {/* ── Three-column desktop layout / stacked mobile ── */}
      <div className='relative w-full'>
        {/* ── Background Rotating Logo ── */}
        <div className='absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0'>
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className='w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] max-w-[1000px] max-h-[1000px] opacity-[0.03] md:opacity-[0.05]'>
            <Image
              src={LOGOS.linstant.src}
              alt=''
              fill
              className='object-contain'
              aria-hidden='true'
            />
          </m.div>
        </div>

        {/* ── Desktop: three-column grid (lg+) ── */}
        <div className='hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-12 lg:items-center lg:max-w-7xl lg:mx-auto lg:px-8 xl:px-12 relative z-10'>
          {/* ── LEFT PANEL — 23 ans + tagline + separator ── */}
          <Reveal
            variant='fade-side'
            className='flex flex-col items-end text-right gap-6 max-w-[320px] ml-auto'>
            {/* Decorative line */}
            <div
              className='w-12 h-px'
              style={{ background: 'linear-gradient(to left, #AF9778, transparent)' }}
            />

            {/* 23 ans counter */}
            <div>
              <h2 className='flex flex-wrap items-baseline justify-end gap-x-3 gap-y-1 mb-2'>
                <span
                  ref={counterRef}
                  className='text-7xl xl:text-8xl font-title text-gold font-light leading-[0.82] tracking-[-2px]'
                  aria-label='23'>
                  23
                </span>
                <span className='text-3xl xl:text-4xl font-title text-gold/80 uppercase tracking-[1px]'>
                  ans
                </span>
              </h2>
              <span className='block text-2xl xl:text-3xl font-title text-cream/70 leading-[1.1] tracking-tight'>
                au service du style masculin
              </span>
            </div>

            {/* Separator */}
            <div
              ref={separatorRef}
              className='w-20 h-px origin-right'
              style={{
                background: 'linear-gradient(to left, #AF9778 30%, transparent)',
              }}
            />
          </Reveal>

          {/* ── CENTER — Portrait Vimeo video ── */}
          <div className='relative w-[380px] xl:w-[440px] aspect-[9/16] overflow-hidden'>
            {/* Native video background */}
            <div className='absolute inset-0 z-0 overflow-hidden bg-navy/50'>
              <video
                ref={desktopVideoRef}
                data-src='/video/linstant-barbier-Paris.mp4'
                preload='none'
                muted
                loop
                playsInline
                className='pointer-events-none absolute inset-0 w-full h-full object-cover'
              />
            </div>

            {/* Gradient overlays */}
            <div
              className='absolute inset-x-0 top-0 h-[30%] z-1 pointer-events-none'
              style={{
                background: 'linear-gradient(to bottom, rgba(7,24,30,0.6) 0%, transparent 100%)',
              }}
            />
            <div
              className='absolute inset-x-0 bottom-0 h-[40%] z-1 pointer-events-none'
              style={{
                background: 'linear-gradient(to top, rgba(7,24,30,0.7) 0%, transparent 100%)',
              }}
            />

            {/* Corner accents */}
            <div className='absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/40 z-10 pointer-events-none' />
            <div className='absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/40 z-10 pointer-events-none' />

            {/* "L'Art du Détail" decorative text */}
            <div className='absolute inset-0 z-2 flex flex-col items-center justify-end pb-6 pointer-events-none'>
              <Reveal variant='fade-up' delay={0.6}>
                <div className='flex flex-col items-center'>
                  <span className='font-serif italic text-gold/30 text-4xl xl:text-5xl tracking-wide drop-shadow-md whitespace-nowrap mb-1'>
                    L&apos;Art du
                  </span>
                  <span className='font-serif italic text-gold/30 text-4xl xl:text-5xl tracking-wide drop-shadow-md whitespace-nowrap'>
                    Détail
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── RIGHT PANEL — Description + service tags ── */}
          <Reveal
            variant='fade-side'
            delay={0.2}
            className='flex flex-col items-start gap-6 max-w-[320px]'>
            {/* Decorative line */}
            <div
              className='w-12 h-px'
              style={{ background: 'linear-gradient(to right, #AF9778, transparent)' }}
            />

            <p className='text-cream/85 text-sm xl:text-base leading-[1.8] tracking-wide font-light'>
              Fondé par Riccardo, maître barbier reconnu à Paris depuis plus de{' '}
              <span className='text-gold'>23 ans</span>, nous maîtrisons les techniques classiques
              comme les tendances contemporaines dans notre salon du Marais.
            </p>

            {/* Separator */}
            <div
              className='w-10 h-px'
              style={{
                background: 'linear-gradient(to right, rgba(175,151,120,0.3), transparent)',
              }}
            />

            <p className='text-cream/55 text-xs xl:text-sm leading-[1.8] tracking-wide font-light italic'>
              Du taper fade au rasage traditionnel à la serviette chaude, chaque geste est précis.
            </p>

            {/* Service tags */}
            <div className='flex flex-col gap-2'>
              {[
                'Dégradés maîtrisés',
                'Rasage serviette chaude',
                'Produits premium',
                'Tailleur de barbe',
              ].map((tag) => (
                <span
                  key={tag}
                  className='text-[0.6rem] xl:text-[0.65rem] uppercase tracking-[0.18em] text-gold/70 border border-gold/20 px-3 py-1.5 rounded-full w-fit'
                  style={{ background: 'rgba(175,151,120,0.06)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Mobile / Tablet: stacked layout (below lg) ── */}
        <div className='lg:hidden'>
          {/* Mobile: À propos label + Title (above video) */}
          <div className='mb-8'>
            <Container className='relative z-10'>
              <Reveal
                variant='fade-up'
                className='flex items-center justify-center gap-4 mt-8 md:mt-12 mb-0'>
                <span
                  className='block w-16 h-px'
                  style={{ background: 'linear-gradient(to right, transparent, #AF9778)' }}
                />
                <span className='text-gold text-[10px] uppercase tracking-[0.45em] font-medium'>
                  À propos
                </span>
                <span
                  className='block w-16 h-px'
                  style={{ background: 'linear-gradient(to left, transparent, #AF9778)' }}
                />
              </Reveal>
            </Container>

            <div className='relative z-10 text-center pt-8 px-6 max-w-3xl mx-auto'>
              <Reveal variant='fade-up' delay={0.1} className='mb-4'>
                <h2 className='flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1'>
                  <span
                    className='text-6xl md:text-8xl font-title text-gold font-light leading-[0.82] tracking-[-2px]'
                    aria-label='23'>
                    23
                  </span>
                  <span className='text-2xl md:text-3xl font-title text-gold/80 uppercase tracking-[1px]'>
                    ans
                  </span>
                </h2>
              </Reveal>

              <Reveal variant='fade-up' delay={0.25}>
                <span className='block text-2xl md:text-3xl font-title text-cream/70 leading-[1.1] tracking-tight'>
                  au service du style masculin
                </span>
              </Reveal>
            </div>
          </div>

          {/* Full-width portrait video */}
          <div className='relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden'>
            <div className='absolute inset-0 z-0 overflow-hidden bg-navy'>
              <video
                ref={mobileVideoRef}
                data-src='/video/linstant-barbier-Paris.mp4'
                preload='none'
                muted
                loop
                playsInline
                className='pointer-events-none absolute inset-0 w-full h-full object-cover'
              />
            </div>

            {/* Gradient overlays */}
            <div
              className='absolute inset-x-0 top-0 h-[35%] z-1 pointer-events-none'
              style={{
                background:
                  'linear-gradient(to bottom, rgba(7,24,30,0.75) 0%, rgba(7,24,30,0.2) 70%, transparent 100%)',
              }}
            />
            <div
              className='absolute inset-x-0 bottom-0 h-[45%] z-1 pointer-events-none'
              style={{
                background:
                  'linear-gradient(to top, rgba(7,24,30,0.85) 0%, rgba(7,24,30,0.3) 50%, transparent 100%)',
              }}
            />
            <div
              className='absolute inset-0 z-1 pointer-events-none'
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(7,24,30,0.15) 0%, rgba(7,24,30,0.45) 100%)',
              }}
            />

            {/* Corner accents */}
            <Reveal
              variant='fade-up'
              delay={0.2}
              className='absolute top-6 left-6 z-10 pointer-events-none'>
              <div className='w-12 h-12 border-t-2 border-l-2 border-gold/40' />
            </Reveal>
            <Reveal
              variant='fade-up'
              delay={0.3}
              className='absolute bottom-6 right-6 z-10 pointer-events-none'>
              <div className='w-12 h-12 border-b-2 border-r-2 border-gold/40' />
            </Reveal>

            {/* "L'Art du Détail" decorative text */}
            <div className='absolute inset-0 z-2 flex flex-col items-center justify-end pb-8 pointer-events-none'>
              <Reveal variant='fade-up' delay={0.6}>
                <div className='flex flex-col items-center'>
                  <span className='font-serif italic text-gold/30 text-4xl sm:text-5xl md:text-6xl tracking-wide drop-shadow-md whitespace-nowrap mb-1'>
                    L&apos;Art du
                  </span>
                  <span className='font-serif italic text-gold/30 text-4xl sm:text-5xl md:text-6xl tracking-wide drop-shadow-md whitespace-nowrap'>
                    Détail
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Experience badge */}
        <Reveal
          variant='scale-up'
          delay={0.6}
          className='flex absolute bottom-[-5%] -left-12 md:left-[calc(50%-280px)] lg:left-[calc(50%-340px)] z-30 items-center justify-center w-40 h-40 pointer-events-none'>
          <m.div className='absolute inset-0' style={{ rotate: badgeRotate }}>
            <svg viewBox='0 0 100 100' className='w-full h-full overflow-visible'>
              <path
                id='badgeTextPath'
                d='M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0'
                fill='none'
              />
              <text className='text-[8.5px] font-title font-light tracking-widest uppercase fill-gold/80'>
                <textPath
                  href='#badgeTextPath'
                  startOffset='0%'
                  textLength='264'
                  lengthAdjust='spacing'>
                  L&apos;INSTANT BARBIER • 43 RUE DE TURENNE • PARIS LE MARAIS •
                </textPath>
              </text>
            </svg>
          </m.div>
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

      {/* ── Mobile: text content below video (below lg) ── */}
      <div className='lg:hidden'>
        <div className='relative z-10 text-center py-16 md:py-24 px-6 max-w-3xl mx-auto'>
          <Reveal variant='scale-up' delay={0.35}>
            <div
              className='w-24 h-px mx-auto mb-8 origin-center'
              style={{
                background:
                  'linear-gradient(to right, transparent, #AF9778 30%, #AF9778 70%, transparent)',
              }}
            />
          </Reveal>

          <Reveal variant='fade-up' delay={0.45} className='space-y-4 mb-8'>
            <p className='text-cream/90 text-base md:text-lg leading-[1.75] tracking-wide font-light'>
              Fondé par Riccardo, maître barbier reconnu à Paris depuis plus de{' '}
              <span className='text-gold'>23 ans</span>, nous maîtrisons les techniques classiques
              comme les tendances contemporaines dans notre salon du Marais.
            </p>
            <p className='text-cream/60 text-sm md:text-base leading-[1.75] tracking-wide font-light'>
              Du taper fade au rasage traditionnel à la serviette chaude, chaque geste est précis.
            </p>
          </Reveal>

          <Reveal variant='blur-in' delay={0.55} className='flex flex-wrap justify-center gap-3'>
            {[
              'Dégradés maîtrisés',
              'Rasage serviette chaude',
              'Produits premium',
              'Tailleur de barbe',
            ].map((tag) => (
              <span
                key={tag}
                className='text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] text-gold/80 border border-gold/25 px-3 py-1.5 rounded-full'
                style={{ background: 'rgba(175,151,120,0.06)' }}>
                {tag}
              </span>
            ))}
          </Reveal>
        </div>
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
          ].map((item, index) => (
            <Reveal key={item.badge} variant='fade-up' delay={index * 0.2} className='w-full'>
              <div
                ref={item.ref}
                className='group relative min-h-[280px] md:min-h-[400px] lg:min-h-[450px] w-full overflow-visible cursor-pointer lg:cursor-default focus:outline-none'
                tabIndex={0}
                onTouchStart={() => {}}>
                {/* Main card border + shadow + clip content */}
                <div className='absolute inset-0 overflow-hidden z-0 transform-gpu bg-navy'>
                  {/* Image */}
                  <div className='absolute inset-0 overflow-hidden'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className='object-cover transition-transform duration-1000 group-hover:scale-105 group-focus-within:scale-105'
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
            </Reveal>
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
