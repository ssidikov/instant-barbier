'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function PageLoader() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'visible' | 'fading' | 'hidden'>('visible')
  const isFirstLoad = useRef(true)
  const [prevPathname, setPrevPathname] = useState(pathname)

  // ── Initial page load ─────────────────────────────────────────────────
  useEffect(() => {
    // Dramatically reduced timings for near-instant load
    const fadeTimer = setTimeout(() => setPhase('fading'), 50)
    const hideTimer = setTimeout(() => {
      setPhase('hidden')
      isFirstLoad.current = false
    }, 300)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  // ── Navigation between pages (Derived State Pattern) ─────────────────
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setPhase('visible')
  }

  // Handle the timeouts after the component has rendered
  useEffect(() => {
    if (isFirstLoad.current) return

    // Faster route transitions
    const fadeTimer = setTimeout(() => setPhase('fading'), 50)
    const hideTimer = setTimeout(() => setPhase('hidden'), 350)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [pathname])

  if (phase === 'hidden') return null

  return (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-navy transition-opacity duration-200 ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
      {/* Ambient glow */}
      <div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full'
        style={{
          background: 'radial-gradient(circle, rgba(175,151,120,0.08) 0%, transparent 60%)',
          animation: 'loaderOrbPulse 3s ease-in-out infinite',
        }}
      />

      {/* Badge container */}
      <div
        className={`relative w-40 h-40 md:w-48 md:h-48 transition-all duration-500 ${
          phase === 'fading' ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}>
        {/* Rotating text ring */}
        <div className='absolute inset-0' style={{ animation: 'loaderSpin 10s linear infinite' }}>
          <svg viewBox='0 0 100 100' className='w-full h-full overflow-visible'>
            <path
              id='loaderTextPath'
              d='M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0'
              fill='none'
            />
            <text className='text-[8.5px] font-title font-light tracking-widest uppercase fill-gold/80'>
              <textPath
                href='#loaderTextPath'
                startOffset='0%'
                textLength='264'
                lengthAdjust='spacing'>
                L&apos;INSTANT BARBIER • 43 RUE DE TURENNE • PARIS LE MARAIS •
              </textPath>
            </text>
          </svg>
        </div>

        {/* Logo center */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div
            className='w-[72px] h-[72px] md:w-[84px] md:h-[84px]'
            style={{ animation: 'loaderLogoReveal 0.5s ease-out 0.1s both' }}>
            <Image
              src='/logo/linstant-barbier-logo.png'
              alt="L'Instant Barbier"
              width={84}
              height={84}
              className='object-contain w-full h-full'
              priority
            />
          </div>
        </div>

        {/* Outer ring pulse */}
        <div
          className='absolute inset-[-8px] border border-gold/15 rounded-full'
          style={{ animation: 'loaderRingPulse 2s ease-in-out infinite' }}
        />
      </div>

      {/* Bottom loading bar */}
      <div className='absolute bottom-16 left-1/2 -translate-x-1/2'>
        <div className='w-24 h-px bg-navy overflow-hidden rounded-full'>
          <div
            className='h-full rounded-full'
            style={{
              background: 'linear-gradient(to right, transparent, #AF9778, transparent)',
              animation: 'loaderBar 1s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes loaderSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes loaderOrbPulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
          }
        }
        @keyframes loaderLogoReveal {
          from {
            opacity: 0;
            transform: scale(0.6);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }
        @keyframes loaderRingPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.6;
          }
        }
        @keyframes loaderBar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  )
}
