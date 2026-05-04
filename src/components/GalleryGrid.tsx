'use client'

import { useState } from 'react'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { GALLERY_IMAGES, type GalleryImageData } from '@/lib/images'
import dynamic from 'next/dynamic'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/blur'

const GalleryLightbox = dynamic(() => import('@/components/GalleryLightbox'), { ssr: false })

export const categories = [
  'Tout',
  'Coupes',
  'Barbe',
  'Ambiance',
  'Barbiers',
  'Outils',
  'Produit',
  'Salon',
  'Soins',
] as const

export type Category = (typeof categories)[number]

function GalleryCard({
  image,
  onClick,
  index,
}: {
  image: GalleryImageData
  onClick: () => void
  index: number
}) {
  const isFirst = index === 0

  return (
    <Reveal
      variant='scale-up'
      delay={(index % 6) * 0.1}
      className={`${isFirst ? 'col-span-2 row-span-2' : ''} aspect-square`}>
      <div className={`${isFirst ? 'h-full' : 'aspect-square'}`}>
        <div
          onClick={onClick}
          className='relative w-full h-full overflow-hidden group cursor-pointer touch-feedback touch-highlight'>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            quality={75}
            sizes={isFirst ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
            className='object-cover transition-transform duration-700 group-hover:scale-110'
            loading='lazy'
            placeholder='blur'
            blurDataURL={DEFAULT_BLUR_DATA_URL}
          />
          <div className='absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500' />
          <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
          <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
          <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
            <div className='absolute inset-0 bg-navy/50 backdrop-blur-[2px]' />
            <div
              className={`relative ${isFirst ? 'w-12 h-12' : 'w-9 h-9'} border border-gold/60 flex items-center justify-center`}>
              <span className={`text-gold ${isFirst ? 'text-2xl' : 'text-lg'}`}>+</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

interface GalleryGridProps {
  layout?: 'home' | 'page'
}

export default function GalleryGrid({ layout = 'page' }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('Tout')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const getInitialVisibleCount = () => {
    if (typeof window === 'undefined') return 6
    return window.innerWidth < 768 ? 5 : 6
  }

  const [visibleCount, setVisibleCount] = useState(() => getInitialVisibleCount())

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat)
    setVisibleCount(getInitialVisibleCount())
    setLightboxIndex(null)
  }

  const filteredImages =
    activeCategory === 'Tout'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory)

  const visibleImages = filteredImages.slice(0, visibleCount)
  const hasMore = visibleCount < filteredImages.length

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <>
      {/* Section header + Filter */}
      <div className='mb-16'>
        {layout === 'page' ? (
          <Reveal
            variant='fade-up'
            className='flex flex-col md:flex-row md:items-end md:justify-between gap-8'>
            <div>
              <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                Nos Réalisations
              </span>
              <h3 className='text-3xl md:text-5xl lg:text-6xl font-title text-cream leading-[0.8] tracking-[-2px]'>
                Explorer <span className='text-gold'>l&apos;univers</span>
              </h3>
            </div>

            <div className='flex flex-wrap gap-2 md:gap-1 justify-start md:justify-end'>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative px-3 py-2 md:px-5 md:py-2.5 text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'text-navy bg-gold'
                      : 'text-cream/50 hover:text-cream hover:bg-white/5'
                  }`}>
                  <span className='relative z-10'>{cat}</span>
                </button>
              ))}
            </div>
          </Reveal>
        ) : (
          <Reveal variant='fade-up'>
            <div className='text-center mb-10'>
              <div className='flex items-center justify-center gap-4 mb-6'>
                <span className='w-16 h-px bg-gradient-to-r from-transparent to-gold origin-right' />
                <span className='text-gold text-xs uppercase tracking-[0.3em]'>Notre Travail</span>
                <span className='w-16 h-px bg-gradient-to-r from-gold to-transparent origin-left' />
              </div>
              <h2 className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold leading-tight tracking-[-2px] mb-6'>
                Galerie
              </h2>
              <div className='mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-12' />

              {/* Filter centered for home */}
              <div className='flex flex-wrap gap-2 justify-center'>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`relative px-3 py-2 md:px-5 md:py-2.5 text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${
                      activeCategory === cat
                        ? 'text-navy bg-gold'
                        : 'text-cream/50 hover:text-cream hover:bg-white/5'
                    }`}>
                    <span className='relative z-10'>{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Gallery grid */}
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4'>
        {visibleImages.map((image, i) => (
          <GalleryCard
            key={`${activeCategory}-${i}`}
            image={image}
            onClick={() => setLightboxIndex(i)}
            index={i}
          />
        ))}
      </div>

      {hasMore && (
        <Reveal variant='fade-up' delay={0.3} className='mt-16 text-center'>
          <button
            onClick={loadMore}
            className='group relative inline-flex items-center gap-4 px-10 py-4 border border-gold/30 text-gold hover:bg-gold hover:text-navy transition-all duration-500 overflow-hidden'>
            <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-gold/10 to-transparent' />
            <span className='relative text-sm uppercase tracking-[0.3em] font-light'>
              Voir plus
            </span>
            <svg
              className='relative w-4 h-4 transition-transform duration-500 group-hover:translate-y-1'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'>
              <path d='M12 5v14M19 12l-7 7-7-7' />
            </svg>
          </button>
          <p className='mt-6 text-cream/40 text-xs tracking-wider'>
            <span className='text-gold'>{visibleCount}</span> / {filteredImages.length} images
          </p>
        </Reveal>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
