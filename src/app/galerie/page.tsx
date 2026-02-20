'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { PLANITY_URL, SITE_URL } from '@/lib/constants'
import Reveal from '@/components/Reveal'
import { GALLERY_IMAGES, LOGOS, BACKGROUNDS, type GalleryImageData } from '@/lib/images'
import GalleryLightbox from '@/components/GalleryLightbox'

// ═══════════════════════════════════════════════════════════════════════════
// GALLERY DATA
// ═══════════════════════════════════════════════════════════════════════════

const categories = [
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
type Category = (typeof categories)[number]

const galleryImages = GALLERY_IMAGES

// ═══════════════════════════════════════════════════════════════════════════
// GALLERY CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function GalleryCard({
  image,
  onClick,
  index,
}: {
  image: GalleryImageData
  onClick: () => void
  index: number
}) {
  // Determine if this is the first item (for larger size)
  const isFirst = index === 0

  return (
    <Reveal
      variant='scale-up'
      delay={(index % 6) * 0.1} // Modulo prevents delays from getting endlessly huge when loading more
      className={`${isFirst ? 'col-span-2 row-span-2' : ''} aspect-square`}>
      <div className={`${isFirst ? 'h-full' : 'aspect-square'}`}>
        <div className='relative w-full h-full overflow-hidden group cursor-pointer touch-feedback touch-highlight'>
          {/* Image background */}
          <div
            className='absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110'
            style={{ backgroundImage: `url("${image.src}")` }}
          />

          {/* Navy overlay that becomes transparent on hover */}
          <div className='absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500' />

          {/* Top-left corner accent */}
          <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />

          {/* Bottom-right corner accent */}
          <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />

          {/* Center "+" icon with backdrop blur */}
          <div
            className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'
            onClick={onClick}>
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

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tout')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(6)

  const filteredImages =
    activeCategory === 'Tout'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  const visibleImages = filteredImages.slice(0, visibleCount)
  const hasMore = visibleCount < filteredImages.length

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  // Reset visible count when category changes
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const initialCount = isMobile ? 5 : 6
    const timer = setTimeout(() => setVisibleCount(initialCount), 0)
    return () => clearTimeout(timer)
  }, [activeCategory])

  const openLightbox = (filteredIndex: number) => {
    setLightboxIndex(filteredIndex)
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Galerie',
        item: `${SITE_URL}/galerie`,
      },
    ],
  }

  return (
    <div className='bg-navy min-h-screen text-cream overflow-x-hidden selection:bg-gold selection:text-navy'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Cinematic opening
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative h-screen flex items-end overflow-hidden'>
          {/* Background mosaic effect */}
          <div className='absolute inset-0 z-0 opacity-70'>
            <div className='absolute inset-0 grid grid-cols-3 gap-1'>
              {galleryImages.slice(0, 6).map((img, i) => (
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
            <div className='absolute inset-0 bg-navy/85 mix-blend-multiply' />
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

              <Reveal variant='fade-up' delay={0.3} className='mt-8'>
                <div className='w-24 h-px bg-gold/30' />
              </Reveal>
            </div>
          </div>

          {/* Scroll indicator removed */}
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
                  <h2 className='text-3xl md:text-4xl lg:text-5xl font-title text-cream leading-[0.8] tracking-[-2px] -mt-14'>
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
                  <h3 className='text-4xl md:text-5xl lg:text-6xl font-title text-cream leading-[0.8] tracking-[-2px]'>
                    Explorer <span className='text-gold'>l&apos;univers</span>
                  </h3>
                </div>

                {/* Category filter */}
                <div className='flex flex-wrap gap-2 md:gap-1 justify-start md:justify-end'>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
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
            </div>

            {/* Gallery grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4'>
              {visibleImages.map((image, i) => (
                <GalleryCard
                  key={`${activeCategory}-${i}`}
                  image={image}
                  onClick={() => openLightbox(i)}
                  index={i}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <Reveal variant='fade-up' delay={0.3} className='mt-16 text-center'>
                <button
                  onClick={loadMore}
                  className='group relative inline-flex items-center gap-4 px-10 py-4 border border-gold/30 text-gold hover:bg-gold hover:text-navy transition-all duration-500 overflow-hidden'>
                  {/* Background shine effect */}
                  <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-gold/10 to-transparent' />

                  <span className='relative text-sm uppercase tracking-[0.3em] font-light'>
                    Voir plus
                  </span>

                  {/* Animated arrow */}
                  <svg
                    className='relative w-4 h-4 transition-transform duration-500 group-hover:translate-y-1'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'>
                    <path d='M12 5v14M19 12l-7 7-7-7' />
                  </svg>
                </button>

                {/* Display counter */}
                <p className='mt-6 text-cream/40 text-xs tracking-wider'>
                  <span className='text-gold'>{visibleCount}</span> / {filteredImages.length} images
                </p>
              </Reveal>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FEATURED QUOTE SECTION - Full-width cinematic
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative py-32 md:py-48 overflow-hidden'>
          {/* Background image (subtle) */}
          <div className='absolute inset-0'>
            <Image
              src={BACKGROUNDS.galleryQuote.src}
              alt={BACKGROUNDS.galleryQuote.alt}
              fill
              className='object-cover opacity-100'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy' />
          </div>

          {/* Logo watermark */}
          <Image
            src={LOGOS.linstant.src}
            alt=''
            width={400}
            height={400}
            className='absolute top-1/2 right-[5%] -translate-y-1/2 w-[30vh] h-[30vh] md:w-[50vh] md:h-[50vh] object-contain opacity-[0.04] -rotate-12 select-none pointer-events-none'
          />

          <div className='max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center'>
            <Reveal variant='fade-up' className='mb-8'>
              <div className='w-16 h-px bg-gold/40 mx-auto mb-8' />
              <span className='text-gold/60 text-xs uppercase tracking-[0.4em]'>
                Tradition &amp; Modernité
              </span>
            </Reveal>

            <Reveal variant='blur-in' className='mb-10'>
              <blockquote className='text-2xl md:text-4xl lg:text-5xl font-title text-cream leading-[0.8] tracking-[-2px]'>
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
                  {[
                    galleryImages.find((img) => img.src.includes('Coupes (19)')),
                    galleryImages.find((img) => img.src.includes('Ambiance (23)')),
                    galleryImages.find((img) => img.src.includes('Soins (4)')),
                    galleryImages.find((img) => img.src.includes('Barbe (23)')),
                  ].map((img, i) => {
                    if (!img) return null
                    return (
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
                    )
                  })}
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
                  <h3 className='text-3xl md:text-5xl font-title text-cream mb-8  leading-[0.8] tracking-[-2px]'>
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
        <GalleryLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
