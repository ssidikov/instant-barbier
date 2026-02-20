'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // We synchronize GSAP's internal ticker with Lenis's Request Animation Frame (RAF)
    // This entirely eliminates jittering when ScrollTrigger animations fire during a smooth scroll
    gsap.registerPlugin(ScrollTrigger)

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    // Set GSAP lag smoothing to false to prevent it from disconnecting from Lenis
    gsap.ticker.lagSmoothing(0)
    gsap.ticker.add(update)

    // Ensure ScrollTrigger updates its triggers properly when mobile viewport sizes shift
    // (e.g. iOS Safari address bar expanding/collapsing)
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    // Additionally fire a refresh once all static elements and images finish popping in
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 1500)

    return () => {
      gsap.ticker.remove(update)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        lerp: 0.08, // The "smoothness" factor. Lower = smoother/heavier
        duration: 1.5,
        smoothWheel: true,
        syncTouch: true, // Forces touch mobile scrolling to rigidly track finger exact drag
      }}>
      {children}
    </ReactLenis>
  )
}
