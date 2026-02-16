'use client'

import { useState, useEffect, useCallback } from 'react'

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

  const goTo = useCallback(
    (newIndex: number) => {
      setIndex(((newIndex % images.length) + images.length) % images.length)
    },
    [images.length],
  )

  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])

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

  return (
    <div className='fixed inset-0 z-9999 flex items-center justify-center' onClick={onClose}>
      <div className='absolute inset-0 bg-dark/95 backdrop-blur-md' />

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

      <div className='absolute top-7 left-6 z-50 text-gold/60 text-xs uppercase tracking-[0.3em] font-body'>
        {index + 1} / {images.length}
      </div>

      <p className='absolute bottom-8 left-1/2 -translate-x-1/2 z-50 text-cream/50 text-xs uppercase tracking-[0.25em] font-body'>
        {images[index].alt}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation()
          goPrev()
        }}
        className='absolute left-4 md:left-8 z-50 w-12 h-12 border border-gold/30 flex items-center justify-center hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer'
        aria-label='Photo précédente'>
        <svg
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          className='text-gold'>
          <polyline points='12,3 6,9 12,15' />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          goNext()
        }}
        className='absolute right-4 md:right-8 z-50 w-12 h-12 border border-gold/30 flex items-center justify-center hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer'
        aria-label='Photo suivante'>
        <svg
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          className='text-gold'>
          <polyline points='6,3 12,9 6,15' />
        </svg>
      </button>

      <div
        className='relative w-full h-full flex items-center justify-center px-16 md:px-24 py-20'
        onClick={(e) => e.stopPropagation()}>
        <div className='relative w-full h-full max-w-5xl max-h-[80vh] mx-auto'>
          {/* Gold frame accent */}
          <div className='absolute -inset-px border border-gold/20 pointer-events-none z-10' />
          <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/50 pointer-events-none z-10' />
          <div className='absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/50 pointer-events-none z-10' />
          <div className='absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/50 pointer-events-none z-10' />
          <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/50 pointer-events-none z-10' />

          <div
            className='w-full h-full bg-cover bg-center'
            style={{ backgroundImage: `url(${images[index].src})` }}
          />
        </div>
      </div>

      <div className='absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex gap-2'>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              goTo(i)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? 'bg-gold w-6' : 'bg-gold/30 hover:bg-gold/60'
            }`}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
