'use client'

import { useEffect, useRef, useCallback } from 'react'
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
  const badgeRingRef = useRef<HTMLDivElement>(null)

  // ── Cinematic video refs ───────────────────────────────────────────────────
  const cinematicPinRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const cinematicOverlayRef = useRef<HTMLDivElement>(null)
  const cinematicTextRef = useRef<HTMLDivElement>(null)
  const cornerTLRef = useRef<HTMLDivElement>(null)
  const cornerBRRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  // ── Desktop cursor parallax (lg+ only) ─────────────────────────────────────
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!videoContainerRef.current || window.innerWidth < 1024) return
    const rect = videoContainerRef.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5 // -0.5 → +0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    // Max ±8px translate — very subtle
    videoContainerRef.current.style.transform = `translate(${cx * 16}px, ${cy * 16}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!videoContainerRef.current) return
    videoContainerRef.current.style.transform = 'translate(0px, 0px)'
  }, [])

  // ── IntersectionObserver for video autoplay/pause ──────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
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
      { threshold: 0.3 },
    )
    obs.observe(video)
    return () => obs.disconnect()
  }, [])

  // ── GSAP ScrollTrigger animations ──────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) {
      // Instant-show everything for reduced-motion
      sectionRef.current?.querySelectorAll('.about-word-inner').forEach((el) => {
        ;(el as HTMLElement).style.transform = 'translateY(0)'
        ;(el as HTMLElement).style.opacity = '1'
      })
      // Show cinematic video immediately
      if (videoContainerRef.current) {
        videoContainerRef.current.style.clipPath = 'inset(0% 0%)'
        videoContainerRef.current.style.filter = 'blur(0px) brightness(1)'
        videoContainerRef.current.style.transform = 'scale(1)'
        videoContainerRef.current.style.opacity = '1'
      }
      if (cinematicOverlayRef.current) cinematicOverlayRef.current.style.opacity = '0'
      if (cinematicTextRef.current) cinematicTextRef.current.style.opacity = '0'
      if (leftPanelRef.current) leftPanelRef.current.style.opacity = '1'
      if (rightPanelRef.current) rightPanelRef.current.style.opacity = '1'
      return
    }

    const isMobile = window.innerWidth < 1024
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

        // ═════════════════════════════════════════════════════════════════════
        // ── 4. CINEMATIC VIDEO — Scroll-driven 3-phase reveal ───────────────
        // ═════════════════════════════════════════════════════════════════════

        if (cinematicPinRef.current && videoContainerRef.current) {
          if (!isMobile) {
            // ── DESKTOP: Pinned scroll-driven experience ─────────────────────
            const cinematicTl = gsap.timeline({
              scrollTrigger: {
                trigger: cinematicPinRef.current,
                start: 'top top',
                end: '+=300%', // 3× viewport height of scroll distance
                pin: true,
                scrub: 1.2,
                anticipatePin: 1,
              },
            })

            // PHASE 1 — Atmospheric Entrance (0% → 30% of timeline)
            // Video: blurred, scaled up, dim behind dark overlay
            cinematicTl
              .fromTo(
                videoContainerRef.current,
                {
                  scale: 1.12,
                  filter: 'blur(6px) brightness(0.6)',
                  opacity: 0.3,
                  clipPath: 'inset(28% 32%)',
                },
                {
                  scale: 1.06,
                  filter: 'blur(2px) brightness(0.85)',
                  opacity: 0.8,
                  clipPath: 'inset(28% 32%)',
                  duration: 0.3,
                  ease: 'power2.inOut',
                },
                0,
              )
              // Overlay darkens then starts to lift
              .fromTo(
                cinematicOverlayRef.current,
                { opacity: 0.7 },
                { opacity: 0.35, duration: 0.3, ease: 'power2.inOut' },
                0,
              )
              // Atmospheric text fades in then out
              .fromTo(
                cinematicTextRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
                0.05,
              )
              .to(
                cinematicTextRef.current,
                { opacity: 0, y: -15, duration: 0.1, ease: 'power2.in' },
                0.22,
              )

            // PHASE 2 — Architectural Reveal (30% → 65% of timeline)
            // Mask expands from small centered rectangle to full viewport
            cinematicTl
              .to(
                videoContainerRef.current,
                {
                  clipPath: 'inset(0% 0%)',
                  scale: 1.02,
                  filter: 'blur(0px) brightness(0.95)',
                  opacity: 1,
                  duration: 0.35,
                  ease: 'power2.inOut',
                },
                0.3,
              )
              // Overlay continues fading
              .to(
                cinematicOverlayRef.current,
                { opacity: 0.08, duration: 0.35, ease: 'power2.inOut' },
                0.3,
              )
              // Corner accents animate in at midpoint
              .fromTo(
                cornerTLRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' },
                0.5,
              )
              .fromTo(
                cornerBRRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' },
                0.55,
              )

            // PHASE 3 — Immersive Activation (65% → 100%)
            // Final zoom settle, shadow softens, overlay gone
            cinematicTl
              .to(
                videoContainerRef.current,
                {
                  scale: 1,
                  filter: 'blur(0px) brightness(1)',
                  duration: 0.35,
                  ease: 'power2.out',
                },
                0.65,
              )
              .to(
                cinematicOverlayRef.current,
                { opacity: 0, duration: 0.3, ease: 'power2.out' },
                0.65,
              )

            // Flanking text panels — slide in from sides during Phase 3
            if (leftPanelRef.current) {
              cinematicTl.fromTo(
                leftPanelRef.current,
                { opacity: 0, x: -40, filter: 'blur(6px)' },
                {
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  duration: 0.3,
                  ease: 'power3.out',
                },
                0.72,
              )
            }
            if (rightPanelRef.current) {
              cinematicTl.fromTo(
                rightPanelRef.current,
                { opacity: 0, x: 40, filter: 'blur(6px)' },
                {
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  duration: 0.3,
                  ease: 'power3.out',
                },
                0.78,
              )
            }
          } else {
            // ── MOBILE: One-shot reveal on viewport entry (no pinning) ───────
            const mobileTl = gsap.timeline({
              scrollTrigger: {
                trigger: cinematicPinRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            })

            mobileTl
              .fromTo(
                videoContainerRef.current,
                {
                  scale: 1.08,
                  filter: 'blur(4px) brightness(0.7)',
                  opacity: 0,
                  clipPath: 'inset(20% 24%)',
                },
                {
                  scale: 1,
                  filter: 'blur(0px) brightness(1)',
                  opacity: 1,
                  clipPath: 'inset(0% 0%)',
                  duration: 1.6,
                  ease: 'power3.out',
                },
              )
              .to(
                cinematicOverlayRef.current,
                { opacity: 0, duration: 1.2, ease: 'power2.out' },
                0.3,
              )
              .fromTo(
                cornerTLRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
                0.8,
              )
              .fromTo(
                cornerBRRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
                0.9,
              )
          }
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
            { rotate: -20 },
            {
              rotate: 70,
              ease: 'none',
              scrollTrigger: {
                trigger: cinematicPinRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
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
          className='absolute top-[15%] right-[10%] w-80 h-80 border border-gold/20 opacity-0'
        />
        <div
          ref={square2Ref}
          className='absolute bottom-[15%] left-[8%] w-56 h-56 border border-gold/15 opacity-0'
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

        {/* ── Centered text content ────────────────────────────────────────── */}
        <div className='text-center max-w-3xl mx-auto mb-16 md:mb-20 md:hidden'>
          {/* Headline */}
          <div className='about-headline mb-6'>
            <h2 className='flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 mb-2'>
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
            className='w-24 h-px mx-auto mb-8 origin-center'
            style={{
              background:
                'linear-gradient(to right, transparent, #AF9778 30%, #AF9778 70%, transparent)',
            }}
          />

          {/* Description paragraphs */}
          <div className='space-y-4 mb-8'>
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
          <div className='about-para flex flex-wrap justify-center gap-3 opacity-0'>
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
      </Container>

      {/* ═══════════════════════════════════════════════════════════════════════
          CINEMATIC VIDEO — Scroll-driven reveal experience
          Scrolling = entering the salon
      ═══════════════════════════════════════════════════════════════════════ */}
      <div ref={cinematicPinRef} className='relative w-full' style={{ minHeight: '100vh' }}>
        {/* Video viewport — centered portrait frame on desktop/tablet, full-width on mobile */}
        <div className='relative w-full h-screen overflow-hidden flex items-center justify-center'>
          {/* Portrait frame container — constrains video to natural portrait ratio */}
          <div className='relative w-full h-full md:w-auto md:h-[90vh] md:max-w-[520px] lg:max-w-[600px] md:aspect-[3/4] lg:aspect-[9/16]'>
            {/* Video container — receives clip-path, scale, blur, and cursor parallax */}
            <div
              ref={videoContainerRef}
              className='absolute inset-0 will-change-[transform,clip-path] overflow-hidden'
              style={{
                clipPath: 'inset(28% 32%)',
                transform: 'scale(1.12)',
                filter: 'blur(6px) brightness(0.6)',
                opacity: 0.3,
                transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
              onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
              onMouseLeave={handleMouseLeave}>
              <video
                ref={videoRef}
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

            {/* Atmospheric text — visible during Phase 1 only */}
            <div
              ref={cinematicTextRef}
              className='absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none'>
              <div className='text-center'>
                <div
                  className='w-12 h-px mx-auto mb-6'
                  style={{
                    background: 'linear-gradient(to right, transparent, #AF9778, transparent)',
                  }}
                />
                <p className='text-gold/80 text-[10px] md:text-xs uppercase tracking-[0.5em] font-light mb-3'>
                  Entrez dans notre univers
                </p>
                <p className='text-cream/40 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-light'>
                  Défiler pour découvrir
                </p>
                <div
                  className='w-12 h-px mx-auto mt-6'
                  style={{
                    background: 'linear-gradient(to right, transparent, #AF9778, transparent)',
                  }}
                />
              </div>
            </div>

            {/* Corner accents — cinematic frame markers */}
            <div
              ref={cornerTLRef}
              className='absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-14 md:h-14 border-t-2 border-l-2 border-gold/40 z-20 pointer-events-none'
              style={{ opacity: 0 }}
            />
            <div
              ref={cornerBRRef}
              className='absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-14 md:h-14 border-b-2 border-r-2 border-gold/40 z-20 pointer-events-none'
              style={{ opacity: 0 }}
            />
          </div>

          {/* ── Left panel — Headline + service tags (md+ only) ─────────── */}
          <div
            ref={leftPanelRef}
            className='hidden md:flex absolute left-6 lg:left-[6%] xl:left-[10%] top-1/2 -translate-y-1/2 flex-col items-start gap-6 max-w-[220px] lg:max-w-[260px]'
            style={{ opacity: 0 }}>
            {/* Decorative line */}
            <div
              className='w-10 h-px'
              style={{ background: 'linear-gradient(to right, #AF9778, transparent)' }}
            />

            {/* Headline */}
            <div>
              <span className='text-4xl lg:text-5xl font-title text-gold font-light leading-[0.85] tracking-[-1px] block mb-1'>
                23
              </span>
              <span className='text-sm lg:text-base font-title text-gold/70 uppercase tracking-[0.15em] block mb-1'>
                ans
              </span>
              <span className='text-sm lg:text-base font-title text-cream/50 leading-tight tracking-tight block'>
                au service du style masculin
              </span>
            </div>

            {/* Separator */}
            <div
              className='w-8 h-px'
              style={{
                background: 'linear-gradient(to right, rgba(175,151,120,0.4), transparent)',
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
          </div>

          {/* ── Right panel — Description text (md+ only) ─────────────────── */}
          <div
            ref={rightPanelRef}
            className='hidden md:flex absolute right-6 lg:right-[6%] xl:right-[10%] top-1/2 -translate-y-1/2 flex-col items-start gap-5 max-w-[240px] lg:max-w-[280px]'
            style={{ opacity: 0 }}>
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
          </div>
        </div>

        {/* Experience badge — outside overflow-hidden to avoid clipping on mobile */}
        <div className='flex absolute bottom-[3%] left-3 md:left-[calc(50%-260px)] lg:left-[calc(50%-300px)] z-30 items-center justify-center w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36'>
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
          <div className='flex items-center justify-center w-[56px] h-[56px] md:w-[64px] md:h-[64px] relative z-10'>
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
              className='group relative min-h-[280px] md:min-h-[400px] lg:min-h-[450px] w-full overflow-visible opacity-0 cursor-pointer lg:cursor-default focus:outline-none'
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
        <div ref={ctaRef} className='flex justify-center mt-16 md:mt-28 opacity-0'>
          <Button href='/salon'>Découvrir notre univers</Button>
        </div>
      </div>
    </section>
  )
}
