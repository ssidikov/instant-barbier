'use client'

import { useState, useEffect, useCallback } from 'react'
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

  // Sync index if prop changes (fixes stale index bug)
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
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  // Framer Motion variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  // Swipe sensitivity
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-9999 flex items-center justify-center'
      onClick={onClose}>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-dark/95 backdrop-blur-md' />

      {/* Close Button */}
      <button
        onClick={onClose}
        className='absolute top-6 right-6 z-50 w-12 h-12 border border-gold/40 flex items-center justify-center hover:bg-gold/10 transition-colors cursor-pointer'
        aria-label='Fermer'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          className='text-gold'>
          <line x1='4' y1='4' x2='16' y2='16' />
          <line x1='16' y1='4' x2='4' y2='16' />
        </svg>
      </button>

      {/* Counter */}
      <div className='absolute top-7 left-6 z-50 text-gold/60 text-xs uppercase tracking-[0.3em] font-body'>
        {index + 1} / {images.length}
      </div>

      {/* Caption Output */}
      <p className='absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] text-center z-50 text-cream/50 text-xs uppercase tracking-[0.25em] font-body'>
        {images[index].alt}
      </p>

      {/* Prev Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          goPrev()
        }}
        className='absolute left-4 md:left-8 z-50 w-12 h-12 border border-gold/30 flex items-center shadow-lg justify-center bg-dark/40 hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer backdrop-blur-sm'
        aria-label='Photo précédente'>
        <svg
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          className='w-5 h-5 text-gold'
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
        className='absolute right-4 md:right-8 z-50 w-12 h-12 border border-gold/30 flex items-center shadow-lg justify-center bg-dark/40 hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer backdrop-blur-sm'
        aria-label='Photo suivante'>
        <svg
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          className='w-5 h-5 text-gold'
          viewBox='0 0 24 24'>
          <path d='M9 5l7 7-7 7' />
        </svg>
      </button>

      {/* Main Image Slideshow Container */}
      <div
        className='relative w-full h-[80vh] flex items-center justify-center overflow-hidden'
        onClick={(e) => e.stopPropagation()}>
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
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                goNext()
              } else if (swipe > swipeConfidenceThreshold) {
                goPrev()
              }
            }}
            className='absolute max-h-full max-w-full object-contain px-4 md:px-24'
          />
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className='absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex gap-2'>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              goTo(i, i > index ? 1 : -1)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? 'bg-gold w-6' : 'bg-gold/30 hover:bg-gold/60'
            }`}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}
