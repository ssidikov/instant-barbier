'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // We synchronize GSAP's internal ticker with Lenis's Request Animation Frame (RAF)
    // This entirely eliminates jittering when ScrollTrigger animations fire during a smooth scroll
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    // Set GSAP lag smoothing to false to prevent it from disconnecting from Lenis
    gsap.ticker.lagSmoothing(0)
    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
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
      }}>
      {children}
    </ReactLenis>
  )
}
