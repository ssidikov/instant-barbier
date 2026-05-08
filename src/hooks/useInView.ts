'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Hook to detect when a DOM element with a specific selector comes into view
 * @param selector CSS selector of the element to track
 * @param options Intersection Observer options
 * @returns boolean indicating if the element is in view
 */
export function useInView(selector: string, options: IntersectionObserverInit = {}) {
  const [isInView, setIsInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const element = document.querySelector(selector)
    if (!element) return

    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.1,
      ...options,
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        // Stop observing once the element is in view
        if (observerRef.current) {
          observerRef.current.unobserve(element)
        }
      }
    }, defaultOptions)

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element)
        observerRef.current.disconnect()
      }
    }
  }, [selector, options])

  return isInView
}
