'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { PLANITY_URL } from '@/lib/constants'
import Reveal from '@/components/Reveal'
import { GALLERY_IMAGES, type GalleryImageData } from '@/lib/images'

// ═══════════════════════════════════════════════════════════════════════════
// GALLERY DATA
// ═══════════════════════════════════════════════════════════════════════════

const categories = ['Tout', 'Coupes', 'Barbe', 'Ambiance'] as const
type Category = (typeof categories)[number]

const galleryImages = GALLERY_IMAGES

// ═══════════════════════════════════════════════════════════════════════════
// LIGHTBOX COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function Lightbox({
  images,
  currentIndex,
  onClose,
}: {
  images: GalleryImageData[]
  currentIndex: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(currentIndex)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback(
    (newIndex: number) => {
      setIsAnimating(true)
      setTimeout(() => {
        setIndex(((newIndex % images.length) + images.length) % images.length)
        setIsAnimating(false)
      }, 300) // Match transition duration
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
    <div className='fixed inset-0 z-[200] flex items-center justify-center animate-in fade-in duration-300'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-navy/95 backdrop-blur-md' onClick={onClose} />

      {/* Close button */}
      <button
        onClick={onClose}
        className='absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold hover:text-navy transition-all duration-300 group'>
        <svg
          className='w-5 h-5'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'>
          <path d='M18 6L6 18M6 6l12 12' />
        </svg>
      </button>

      {/* Counter */}
      <div className='absolute top-8 left-8 z-50'>
        <span className='text-gold/60 text-xs uppercase tracking-[0.3em] font-mono'>
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className='absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center border border-gold/20 text-gold/70 hover:text-gold hover:border-gold/50 transition-all duration-300 hover:scale-110'>
        <svg
          className='w-5 h-5'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'>
          <path d='M15 19l-7-7 7-7' />
        </svg>
      </button>
      <button
        onClick={goNext}
        className='absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center border border-gold/20 text-gold/70 hover:text-gold hover:border-gold/50 transition-all duration-300 hover:scale-110'>
        <svg
          className='w-5 h-5'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'>
          <path d='M9 5l7 7-7 7' />
        </svg>
      </button>

      {/* Image Container */}
      <div
        className={`relative z-40 w-[90vw] h-[80vh] flex items-center justify-center transition-opacity duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className='relative w-full h-full max-w-5xl'>
          <Image
            src={images[index].src}
            alt={images[index].alt}
            fill
            className='object-contain'
            sizes='90vw'
            priority
          />
        </div>
      </div>

      {/* Caption */}
      <div
        className={`absolute bottom-8 left-0 right-0 text-center z-50 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <p className='text-cream/60 text-sm font-light'>{images[index].alt}</p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// GALLERY CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function GalleryCard({ image, onClick }: { image: GalleryImageData; onClick: () => void }) {
  const spanClasses = {
    normal: '',
    tall: 'md:row-span-2',
    wide: 'md:col-span-2',
  }

  const heightClasses = {
    normal: 'h-[300px] md:h-[350px]',
    tall: 'h-[300px] md:h-[720px]',
    wide: 'h-[300px] md:h-[350px]',
  }

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer group ${spanClasses[image.span]} ${heightClasses[image.span]}`}>
      {/* Image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className='object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700' />

      {/* Corner accents on hover */}
      <div className='absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/0 group-hover:border-gold/60 transition-all duration-700 group-hover:w-12 group-hover:h-12' />
      <div className='absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/0 group-hover:border-gold/60 transition-all duration-700 group-hover:w-12 group-hover:h-12' />

      {/* Content overlay */}
      <div className='absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
        <span className='text-gold/70 text-[10px] uppercase tracking-[0.3em] block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100'>
          {image.category}
        </span>
        <p className='text-cream/80 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200'>
          {image.alt}
        </p>
      </div>

      {/* Zoom icon */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border border-gold/40 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500'>
        <svg
          className='w-5 h-5 text-gold'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'>
          <circle cx='11' cy='11' r='8' />
          <path d='M21 21l-4.35-4.35' />
          <path d='M11 8v6M8 11h6' />
        </svg>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tout')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages =
    activeCategory === 'Tout'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (filteredIndex: number) => {
    setLightboxIndex(filteredIndex)
  }

  return (
    <div className='bg-navy min-h-screen text-cream overflow-x-hidden selection:bg-gold selection:text-navy'>
      <main>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Cinematic opening
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative h-[70vh] md:h-[85vh] flex items-end overflow-hidden'>
          {/* Background mosaic effect */}
          <div className='absolute inset-0 z-0 opacity-40'>
            <div className='absolute inset-0 grid grid-cols-3 gap-1 opacity-30'>
              {galleryImages.map((img, i) => (
                <div key={i} className='relative overflow-hidden'>
                  <Image
                    src={img.src}
                    alt=''
                    fill
                    className='object-cover scale-110'
                    priority={i < 3}
                  />
                </div>
              ))}
            </div>
            <div className='absolute inset-0 bg-navy/75' />
            <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/30' />
          </div>

          {/* Decorative lines */}
          <div className='absolute top-20 right-[15%] w-px h-[30vh] bg-gradient-to-b from-transparent via-gold to-transparent opacity-20' />
          <div className='absolute top-[40%] left-[5%] w-[20vw] h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-15' />

          {/* Hero content */}
          <div className='relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24'>
            <div className='max-w-7xl mx-auto'>
              <Reveal variant='fade-up'>
                <span className='inline-block text-gold/60 text-[10px] uppercase tracking-[0.5em] mb-6'>
                  Barbier &amp; Coiffeur — Paris
                </span>
                <h1 className='text-5xl md:text-7xl lg:text-[8rem] font-title text-gold leading-[0.9] tracking-tight mb-6'>
                  La
                  <br />
                  <span className='text-cream'>Galerie</span>
                </h1>
              </Reveal>

              <Reveal variant='fade-up' delay={0.2} className='max-w-xl'>
                <p className='text-cream/60 text-lg md:text-xl font-light leading-relaxed'>
                  Découvrez l&apos;univers de L&apos;Instant Barbier à travers une sélection
                  d&apos;images mettant en lumière l&apos;ambiance, le savoir-faire et
                  l&apos;exigence du salon.
                </p>
              </Reveal>

              <Reveal variant='fade-up' delay={0.3} className='mt-8 w-24 h-px bg-gold/30' />
            </div>
          </div>

          {/* Scroll indicator */}
          <Reveal
            variant='fade-up'
            delay={1.5}
            className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20'>
            <span className='text-[9px] text-gold/40 uppercase tracking-[0.4em]'>Défiler</span>
            <div className='w-px h-10 bg-gradient-to-b from-gold/50 to-transparent animate-pulse' />
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            INTRODUCTION - Asymmetric text layout
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-24 md:py-40 relative'>
          {/* Decorative background */}
          <div className='absolute top-0 right-0 w-1/3 h-full bg-navy-secondary/15 -skew-x-12 origin-top-right' />

          <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8'>
              {/* Left - Large statement */}
              <div className='lg:col-span-6'>
                <Reveal variant='fade-side'>
                  <span className='text-gold text-7xl md:text-8xl font-serif leading-none opacity-15 block mb-4'>
                    &ldquo;
                  </span>
                  <h2 className='text-3xl md:text-4xl lg:text-5xl font-title text-cream leading-[1.1] -mt-14'>
                    Chaque image reflète
                    <span className='block text-gold mt-2'>notre exigence</span>
                  </h2>
                </Reveal>
              </div>

              {/* Right - Description text */}
              <div className='lg:col-span-6 lg:pt-16'>
                <Reveal variant='fade-side' delay={0.2}>
                  <p className='text-lg md:text-xl text-cream/60 font-light leading-relaxed mb-6'>
                    Situé au cœur du{' '}
                    <strong className='text-gold font-normal'>Marais à Paris</strong>,
                    L&apos;Instant Barbier propose un cadre élégant et raffiné, pensé pour offrir
                    une expérience unique à chaque visite.
                  </p>
                  <p className='text-base text-cream/45 font-light leading-relaxed'>
                    Des coupes réalisées avec précision, des barbes sculptées avec soin et un espace
                    conçu pour le confort et le bien-être de notre clientèle.
                  </p>
                  <div className='mt-8 flex items-center gap-4'>
                    <div className='w-12 h-px bg-gold/40' />
                    <span className='text-gold/50 text-xs uppercase tracking-widest'>Paris 3ᵉ</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            GALLERY GRID - Masonry-style with category filter
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-16 md:py-24 relative'>
          {/* Floating background orb */}
          <div className='absolute top-1/3 left-0 w-[50vw] h-[50vw] rounded-full bg-gold/3 blur-3xl -translate-x-1/3 pointer-events-none' />

          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10'>
            {/* Section header + Filter */}
            <div className='mb-16'>
              <Reveal
                variant='fade-up'
                className='flex flex-col md:flex-row md:items-end md:justify-between gap-8'>
                <div>
                  <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                    Nos Réalisations
                  </span>
                  <h3 className='text-4xl md:text-5xl lg:text-6xl font-title text-cream'>
                    Explorer <span className='text-gold'>l&apos;univers</span>
                  </h3>
                </div>

                {/* Category filter */}
                <div className='flex gap-1'>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`relative px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                        activeCategory === cat
                          ? 'text-navy bg-gold'
                          : 'text-cream/50 hover:text-cream hover:bg-white/5'
                      }`}>
                      <span className='relative z-10'>{cat}</span>
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Masonry grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[350px] transition-all duration-500'>
              {filteredImages.map((image, i) => (
                <Reveal key={`${activeCategory}-${i}`} variant='scale-up' delay={i * 0.1}>
                  <GalleryCard image={image} onClick={() => openLightbox(i)} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FEATURED QUOTE SECTION - Full-width cinematic
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative py-32 md:py-48 overflow-hidden'>
          {/* Background image (subtle) */}
          <div className='absolute inset-0'>
            <Image
              src='/images/gallery/gallery-3.jpg'
              alt=''
              fill
              className='object-cover opacity-10'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/90' />
          </div>

          {/* Decorative elements */}
          <div className='absolute top-1/2 right-[10%] -translate-y-1/2 text-[20rem] font-title text-gold select-none pointer-events-none leading-none opacity-[0.08]'>
            &amp;
          </div>

          <div className='max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center'>
            <Reveal variant='fade-up' className='mb-8'>
              <div className='w-16 h-px bg-gold/40 mx-auto mb-8' />
              <span className='text-gold/60 text-xs uppercase tracking-[0.4em]'>
                Tradition &amp; Modernité
              </span>
            </Reveal>

            <Reveal variant='blur-in' className='mb-10'>
              <blockquote className='text-2xl md:text-4xl lg:text-5xl font-title text-cream leading-[1.2]'>
                Où tradition et modernité se rencontrent pour{' '}
                <span className='text-gold'>sublimer le style masculin</span>
              </blockquote>
            </Reveal>

            <Reveal variant='fade-up' delay={0.2}>
              <p className='text-cream/50 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-12'>
                L&apos;attention portée aux détails, la qualité des prestations et l&apos;atmosphère
                chaleureuse caractérisent chaque moment passé dans notre salon.
              </p>
              <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BOTTOM SECTION - Showcase strip + CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-24 md:py-32 bg-dark relative overflow-hidden'>
          {/* Subtle gradient accent */}
          <div className='absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold/5 to-transparent' />

          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
              {/* Image strip */}
              <Reveal variant='scale-up' className='relative'>
                <div className='grid grid-cols-2 gap-3'>
                  {galleryImages.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      className={`relative overflow-hidden group ${i === 0 ? 'h-48 md:h-56' : i === 3 ? 'h-48 md:h-56' : 'h-40 md:h-48'}`}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className='object-cover hover:scale-105 transition-transform duration-700'
                      />
                      <div className='absolute inset-0 bg-navy/30 hover:bg-navy/10 transition-colors duration-500' />
                    </div>
                  ))}
                </div>
                {/* Gold corner accent */}
                <div className='absolute -top-3 -left-3 w-12 h-12 border-t border-l border-gold/30' />
                <div className='absolute -bottom-3 -right-3 w-12 h-12 border-b border-r border-gold/30' />
              </Reveal>

              {/* CTA content */}
              <div>
                <Reveal variant='fade-up'>
                  <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-6 block'>
                    Votre barbier dans le Marais
                  </span>
                </Reveal>
                <Reveal variant='fade-up' delay={0.1}>
                  <h3 className='text-3xl md:text-5xl font-title text-cream mb-8 leading-tight'>
                    Vivez l&apos;expérience
                    <br />
                    <span className='text-gold'>en personne</span>
                  </h3>
                </Reveal>
                <Reveal variant='fade-up' delay={0.2}>
                  <p className='text-cream/60 text-lg font-light mb-10 max-w-md leading-relaxed'>
                    Les photos ne racontent qu&apos;une partie de l&apos;histoire. Réservez votre
                    créneau et découvrez notre savoir-faire.
                  </p>
                </Reveal>
                <Reveal variant='fade-up' delay={0.3} className='flex flex-wrap gap-4'>
                  <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
