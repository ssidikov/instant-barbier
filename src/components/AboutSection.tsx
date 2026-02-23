'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { LOGOS, VIDEO, PRODUCT_GRID, ABOUT_IMAGES } from '@/lib/images'
import Container from '@/components/Container'
import Button from '@/components/Button'

// ── helpers ──────────────────────────────────────────────────────────────────

/** Splits a string of text into individual <span> word elements */
function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className='about-word inline-block overflow-hidden mr-[0.3em]'>
          <span className='about-word-inner inline-block translate-y-full opacity-0'>{word}</span>
        </span>
      ))}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT SECTION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
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
  const badgeRingRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)

  // IntersectionObserver for video autoplay
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting && !video.paused) {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.4 },
    )
    obs.observe(video)
    return () => obs.disconnect()
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Instant-show everything for reduced-motion
      sectionRef.current?.querySelectorAll('.about-word-inner').forEach((el) => {
        ;(el as HTMLElement).style.transform = 'translateY(0)'
        ;(el as HTMLElement).style.opacity = '1'
      })
      return
    }

    let ctx: { revert: () => void } | null = null

    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const ease = 'power3.out'
        const easeBack = 'back.out(1.4)'

        // ── 0. Decorative orbs — parallax float ─────────────────────────────
        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          })
        }
        if (orb2Ref.current) {
          gsap.to(orb2Ref.current, {
            yPercent: 25,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          })
        }

        // ── 1. Decorative squares — rotate + fade on scroll ─────────────────
        if (square1Ref.current) {
          gsap.fromTo(
            square1Ref.current,
            { rotate: 0, opacity: 0 },
            {
              rotate: 360,
              opacity: 0.12,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.8,
              },
            },
          )
        }
        if (square2Ref.current) {
          gsap.fromTo(
            square2Ref.current,
            { rotate: 0, opacity: 0 },
            {
              rotate: -360,
              opacity: 0.08,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2.2,
              },
            },
          )
        }

        // ── 2. Progress / reveal line (vertical gold rule left side) ────────
        if (progressLineRef.current) {
          gsap.fromTo(
            progressLineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1,
              },
            },
          )
        }

        // ── 3. Section label — lines expand + text fades in ─────────────────
        const labelTl = gsap.timeline({
          scrollTrigger: {
            trigger: labelTextRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
        labelTl
          .fromTo(
            labelLineLeftRef.current,
            { scaleX: 0, transformOrigin: 'right' },
            { scaleX: 1, duration: 0.7, ease },
          )
          .fromTo(
            labelTextRef.current,
            { opacity: 0, y: 6, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease },
            '-=0.3',
          )
          .fromTo(
            labelLineRightRef.current,
            { scaleX: 0, transformOrigin: 'left' },
            { scaleX: 1, duration: 0.7, ease },
            '-=0.5',
          )

        // ── 4. Video panel — soft reveal ─────────────────────────
        if (videoWrapRef.current) {
          gsap.fromTo(
            videoWrapRef.current,
            { y: 60, scale: 0.95, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: videoWrapRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            },
          )
        }

        // ── 5. Counter "23" — GSAP number ticker ────────────────────────────
        if (counterRef.current) {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: 23,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: counterRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            onUpdate() {
              if (counterRef.current) counterRef.current.textContent = String(Math.round(obj.val))
            },
          })
          // Big number scale entrance
          gsap.fromTo(
            counterRef.current,
            { opacity: 0, scale: 0.5, filter: 'blur(20px)' },
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.0,
              ease: easeBack,
              scrollTrigger: {
                trigger: counterRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            },
          )
        }

        // ── 6. Headline words — staggered clip-path reveal ──────────────────
        const allWordInners = sectionRef.current?.querySelectorAll<HTMLElement>('.about-word-inner')
        if (allWordInners?.length) {
          gsap.fromTo(
            allWordInners,
            { y: '100%', opacity: 0 },
            {
              y: '0%',
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease,
              scrollTrigger: {
                trigger: allWordInners[0].closest('.about-headline') ?? allWordInners[0],
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            },
          )
        }

        // ── 7. Separator line — scaleX draw ─────────────────────────────────
        if (separatorRef.current) {
          gsap.fromTo(
            separatorRef.current,
            { scaleX: 0, transformOrigin: 'left' },
            {
              scaleX: 1,
              duration: 0.9,
              ease,
              scrollTrigger: {
                trigger: separatorRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            },
          )
        }

        // ── 8. Paragraph lines — stagger fade-up ────────────────────────────
        const paragraphs = sectionRef.current?.querySelectorAll<HTMLElement>('.about-para')
        if (paragraphs?.length) {
          paragraphs.forEach((para) => {
            gsap.fromTo(
              para,
              { y: 28, opacity: 0, filter: 'blur(6px)' },
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.9,
                ease,
                scrollTrigger: {
                  trigger: para,
                  start: 'top 86%',
                  toggleActions: 'play none none none',
                },
              },
            )
          })
        }

        // ── 9. Benefit cards — scale + opacity entrance ──────────────────────
        const cards = [benefitCard1Ref.current, benefitCard2Ref.current].filter(Boolean)
        cards.forEach((card, i) => {
          if (!card) return
          gsap.fromTo(
            card,
            { y: 60, opacity: 0, scale: 0.92, filter: 'blur(8px)' },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.1,
              delay: i * 0.18,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            },
          )

          // card inner image parallax
          const imgEl = card.querySelector<HTMLElement>('.about-card-img')
          if (imgEl) {
            gsap.to(imgEl, {
              yPercent: -12,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 },
            })
          }
        })

        // ── 10. CTA button — bounce in ───────────────────────────────────────
        if (ctaRef.current) {
          gsap.fromTo(
            ctaRef.current,
            { y: 30, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: easeBack,
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            },
          )
        }

        // ── 11. Subtle Badge Rotation on Scroll ────────────────────────────
        if (badgeRingRef.current) {
          gsap.fromTo(
            badgeRingRef.current,
            { rotate: -4 },
            {
              rotate: 8,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: videoWrapRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            },
          )
        }
      }, sectionRef)
    })()

    return () => {
      ctx?.revert()
    }
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

        {/* Decorative rotating squares */}
        <div
          ref={square1Ref}
          className='absolute top-[15%] right-[10%] w-80 h-80 border border-gold/20 opacity-0'
        />
        <div
          ref={square2Ref}
          className='absolute bottom-[15%] left-[8%] w-56 h-56 border border-gold/15 opacity-0'
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
      </div>

      <Container className='relative z-10'>
        {/* ── Section label ──────────────────────────────────────────────── */}
        <div className='flex items-center justify-center gap-4 mb-16 md:mb-20'>
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
            className='text-gold text-[10px] uppercase tracking-[0.45em] font-medium opacity-0'>
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
        </div>
      </Container>

      {/* ── Main two-column grid ──────────────────────────────────────────── */}
      <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-12'>
        <div className='grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center'>
          {/* Left — Video panel */}
          <div className='relative'>
            <div
              ref={videoWrapRef}
              className='relative will-change-transform'
              style={{ opacity: 0 }}>
              <div
                className='relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/20 shadow-2xl shadow-black/50 group cursor-pointer focus:outline-none'
                tabIndex={0}
                onClick={togglePlay}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    togglePlay()
                  }
                }}>
                <video
                  ref={videoRef}
                  loop
                  playsInline
                  poster={VIDEO.aboutSection.poster}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-[1.03]' : 'scale-100 group-hover:scale-[1.03] group-focus-within:scale-[1.03]'}`}>
                  <source src={VIDEO.aboutSection.src} type={VIDEO.aboutSection.type} />
                </video>

                {/* Dark filter overlay (fades out when playing) */}
                <div
                  className={`absolute inset-0 bg-navy/40 transition-opacity duration-700 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent pointer-events-none' />

                {/* Play Button Overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-none ${isPlaying ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
                  <div className='w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold/40 bg-navy/60 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/80 transition-all duration-500 shadow-xl shadow-black/50 group-hover:shadow-gold/20 group-hover:scale-110'>
                    <svg
                      className='w-6 h-6 md:w-8 md:h-8 text-gold translate-x-[2px]'
                      fill='currentColor'
                      viewBox='0 0 24 24'>
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  </div>
                </div>

                {/* Hover gold shimmer overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'}`}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(175,151,120,0.06) 0%, transparent 60%)',
                  }}
                />
              </div>
            </div>

            {/* Experience badge — floats over video bottom-right */}
            <div className='flex absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 z-10 items-center justify-center w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40'>
              {/* Rotating text ring */}
              <div
                ref={badgeRingRef}
                className='absolute inset-0 pointer-events-none will-change-transform'>
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
              </div>

              {/* Center static badge (Logo) */}
              <div className='flex items-center justify-center w-[72px] h-[72px] relative z-10'>
                <Image
                  src={LOGOS.linstant.src}
                  alt='L instant Barbier'
                  width={64}
                  height={64}
                  className='object-contain w-full h-full'
                />
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className='space-y-8 lg:space-y-10'>
            {/* Headline */}
            <div className='about-headline'>
              <h2 className='flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2'>
                {/* "23" large counter — GSAP number ticker */}
                <span
                  ref={counterRef}
                  className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold font-light leading-[0.82] tracking-[-2px] opacity-0'
                  aria-label='23'>
                  0
                </span>
                <SplitWords
                  text='ans'
                  className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-title text-gold/75 uppercase tracking-[1px]'
                />
              </h2>

              <SplitWords
                text='au service du style masculin'
                className='text-2xl md:text-3xl lg:text-4xl font-title text-cream/55 leading-[0.9] tracking-tight'
              />
            </div>

            {/* Separator line — scaleX draw */}
            <div
              ref={separatorRef}
              className='w-24 h-px origin-left'
              style={{
                background:
                  'linear-gradient(to right, #AF9778 0%, rgba(175,151,120,0.3) 60%, transparent 100%)',
              }}
            />

            {/* Description paragraphs */}
            <div className='space-y-4'>
              <p className='about-para text-cream/90 text-lg lg:text-xl leading-[1.75] tracking-wide font-light opacity-0'>
                Fondé par Riccardo, maître barbier reconnu à Paris depuis plus de{' '}
                <span className='text-gold'>23 ans</span>, nous maîtrisons les techniques classiques
                comme les tendances contemporaines dans notre salon du Marais.
              </p>
              <p className='about-para text-cream/65 text-base leading-[1.75] tracking-wide opacity-0'>
                Du taper fade au rasage traditionnel à la serviette chaude, chaque geste est précis.
              </p>
            </div>

            {/* Feature tags */}
            <div className='about-para flex flex-wrap gap-3 opacity-0'>
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
            </div>
          </div>
        </div>

        {/* ── Benefit Cards ───────────────────────────────────────────────── */}
        <div className='mt-24 md:mt-36 grid md:grid-cols-2 gap-8 md:gap-10'>
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
              className='group relative h-[400px] md:h-[520px] w-full overflow-hidden opacity-0 cursor-pointer lg:cursor-default focus:outline-none'
              tabIndex={0}
              onTouchStart={() => {}}>
              {/* Main card border + shadow */}
              <div className='absolute inset-0 border border-gold/20 group-hover:border-gold/45 group-focus-within:border-gold/45 transition-colors duration-700 z-10 pointer-events-none' />

              {/* Parallax image */}
              <div className='about-card-img absolute inset-[-12%] overflow-hidden'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover transition-transform duration-1000 group-hover:scale-[1.05] group-focus-within:scale-[1.05]'
                  sizes='(max-width: 1280px) 100vw, 640px'
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
                className='absolute top-6 right-6 z-20 text-xs font-title text-gold/80 tracking-widest border border-gold/20 group-hover:border-gold/50 group-focus-within:border-gold/50 px-3 py-1 rounded-full backdrop-blur-sm transition-colors duration-500'
                style={{ background: 'rgba(7,24,30,0.6)' }}>
                {item.badge}
              </div>

              {/* Top corner accent */}
              <div className='absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold/35 group-hover:border-gold/80 group-focus-within:border-gold/80 transition-colors duration-500 z-20' />

              {/* Text content */}
              <div className='absolute bottom-0 left-0 right-0 p-8 md:p-10 z-20'>
                {/* Animated gold rule above title */}
                <div
                  className='w-0 h-px mb-4 group-hover:w-12 group-focus-within:w-12 transition-all duration-500 origin-left'
                  style={{ background: 'linear-gradient(to right, #AF9778, transparent)' }}
                />
                <h4 className='text-3xl md:text-4xl font-title text-gold mb-3 tracking-[-1px] transition-transform duration-500 group-hover:-translate-y-1 group-focus-within:-translate-y-1'>
                  {item.title}
                </h4>
                <p className='text-cream/85 text-sm md:text-base font-light leading-relaxed max-w-sm'>
                  {item.desc}
                </p>
              </div>

              {/* Bottom-right corner accent */}
              <div className='absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold/35 group-hover:border-gold/80 group-focus-within:border-gold/80 transition-colors duration-500 z-20' />
            </div>
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className='flex justify-center mt-16 md:mt-28 opacity-0'>
          <Button href='/salon'>Découvrir notre univers</Button>
        </div>
      </div>
    </section>
  )
}
