'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryImage {
  src: string
  alt: string
}

export default function GalleryLightbox({
  images,
  currentIndex,
  onClose,
}: {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(currentIndex)
  const [direction, setDirection] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Only render portal after hydration
  useEffect(() => setMounted(true), [])

  // Sync index if prop changes
  useEffect(() => {
    setIndex(currentIndex)
  }, [currentIndex])

  const goTo = useCallback(
    (newIndex: number, newDirection: number) => {
      setDirection(newDirection)
      setIndex(((newIndex % images.length) + images.length) % images.length)
    },
    [images.length],
  )

  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)

    // Lock scroll: measure scrollbar width first to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    // iOS Safari ignores overflow:hidden on body — block touchmove at document level
    const preventTouch = (e: TouchEvent) => e.preventDefault()
    document.addEventListener('touchmove', preventTouch, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.removeEventListener('touchmove', preventTouch)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [onClose, goNext, goPrev])

  // Framer Motion variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        key='lightbox'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{ zIndex: 99999 }}
        className='fixed inset-0 flex items-center justify-center'>
        {/* Backdrop */}
        <div className='absolute inset-0 bg-[#07181e]/97 backdrop-blur-md' />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ zIndex: 100001 }}
          className='absolute top-6 right-6 w-12 h-12 border border-[#af9778]/40 flex items-center justify-center hover:bg-[#af9778]/10 transition-colors cursor-pointer'
          aria-label='Fermer'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            className='text-[#af9778]'>
            <line x1='4' y1='4' x2='16' y2='16' />
            <line x1='16' y1='4' x2='4' y2='16' />
          </svg>
        </button>

        {/* Counter */}
        <div
          style={{ zIndex: 100001 }}
          className='absolute top-7 left-6 text-[#af9778]/60 text-xs uppercase tracking-[0.3em] font-body'>
          {index + 1} / {images.length}
        </div>

        {/* Caption */}
        <p
          style={{ zIndex: 100001 }}
          className='absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] text-center text-[#ede8d0]/50 text-xs uppercase tracking-[0.25em] font-body'>
          {images[index].alt}
        </p>

        {/* Prev Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          style={{ zIndex: 100001 }}
          className='absolute left-4 md:left-8 w-12 h-12 border border-[#af9778]/30 flex items-center shadow-lg justify-center bg-[#07181e]/40 hover:bg-[#af9778]/10 hover:border-[#af9778]/60 transition-all cursor-pointer backdrop-blur-sm'
          aria-label='Photo précédente'>
          <svg
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            className='w-5 h-5 text-[#af9778]'
            viewBox='0 0 24 24'>
            <path d='M15 19l-7-7 7-7' />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          style={{ zIndex: 100001 }}
          className='absolute right-4 md:right-8 w-12 h-12 border border-[#af9778]/30 flex items-center shadow-lg justify-center bg-[#07181e]/40 hover:bg-[#af9778]/10 hover:border-[#af9778]/60 transition-all cursor-pointer backdrop-blur-sm'
          aria-label='Photo suivante'>
          <svg
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            className='w-5 h-5 text-[#af9778]'
            viewBox='0 0 24 24'>
            <path d='M9 5l7 7-7 7' />
          </svg>
        </button>

        {/* Image Container — fullscreen, stops click from bubbling to backdrop */}
        <div
          className='relative w-full h-full flex items-center justify-center overflow-hidden'
          onClick={(e) => e.stopPropagation()}
          style={{ zIndex: 100000 }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={index}
              src={images[index].src}
              alt={images[index].alt}
              custom={direction}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) goNext()
                else if (swipe > swipeConfidenceThreshold) goPrev()
              }}
              className='absolute max-h-[85vh] max-w-[90vw] object-contain select-none'
            />
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div
          style={{ zIndex: 100001 }}
          className='absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2'>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                goTo(i, i > index ? 1 : -1)
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === index ? 'bg-[#af9778] w-6' : 'bg-[#af9778]/30 w-2 hover:bg-[#af9778]/60'
              }`}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
