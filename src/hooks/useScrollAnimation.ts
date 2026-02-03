'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'fade'

interface UseScrollAnimationOptions {
  animation?: AnimationType
  delay?: number
  duration?: number
  threshold?: number
  scrub?: boolean
  once?: boolean
}

/**
 * Hook personnalisé pour animer un élément au scroll
 * @param options Configuration de l'animation
 * @returns Ref à attacher à l'élément à animer
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {},
) {
  const {
    animation = 'fade-up',
    delay = 0,
    duration = 1,
    threshold = 0.2,
    scrub = false,
    once = true,
  } = options

  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Configuration de base pour chaque type d'animation
    const animationConfigs: Record<AnimationType, gsap.TweenVars> = {
      'fade-up': {
        y: 60,
        opacity: 0,
      },
      'fade-down': {
        y: -60,
        opacity: 0,
      },
      'fade-left': {
        x: -60,
        opacity: 0,
      },
      'fade-right': {
        x: 60,
        opacity: 0,
      },
      scale: {
        scale: 0.8,
        opacity: 0,
      },
      fade: {
        opacity: 0,
      },
    }

    // Appliquer l'état initial
    gsap.set(element, animationConfigs[animation])

    // Créer l'animation ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: `top ${100 - threshold * 100}%`,
      once,
      onEnter: () => {
        gsap.to(element, {
          ...animationConfigs[animation],
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
          clearProps: 'all',
        })
      },
      ...(scrub && { scrub: true }),
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [animation, delay, duration, threshold, scrub, once])

  return ref
}

/**
 * Hook pour animer plusieurs enfants d'un container avec stagger
 */
export function useScrollStagger<T extends HTMLElement>(
  options: UseScrollAnimationOptions & { stagger?: number } = {},
) {
  const {
    animation = 'fade-up',
    delay = 0,
    duration = 0.8,
    threshold = 0.2,
    stagger = 0.1,
    once = true,
  } = options

  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const container = ref.current
    const children = Array.from(container.children)

    if (children.length === 0) return

    const animationConfigs: Record<AnimationType, gsap.TweenVars> = {
      'fade-up': { y: 40, opacity: 0 },
      'fade-down': { y: -40, opacity: 0 },
      'fade-left': { x: -40, opacity: 0 },
      'fade-right': { x: 40, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      fade: { opacity: 0 },
    }

    // Appliquer l'état initial à tous les enfants
    gsap.set(children, animationConfigs[animation])

    // Créer l'animation avec stagger
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: `top ${100 - threshold * 100}%`,
      once,
      onEnter: () => {
        gsap.to(children, {
          ...animationConfigs[animation],
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          clearProps: 'all',
        })
      },
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [animation, delay, duration, threshold, stagger, once])

  return ref
}
