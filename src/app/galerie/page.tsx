'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { PLANITY_URL, SITE_URL } from '@/lib/constants'
import Reveal from '@/components/Reveal'
import { GALLERY_IMAGES, LOGOS, BACKGROUNDS, type GalleryImageData } from '@/lib/images'
import GalleryLightbox from '@/components/GalleryLightbox'

import GalleryGrid from '@/components/GalleryGrid'

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function GaleriePage() {
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
              {GALLERY_IMAGES.slice(0, 6).map((img, i) => (
                <div key={i} className='relative overflow-hidden'>
                  <Image
                    src={img.src}
                    alt=''
                    fill
                    quality={90}
                    sizes='(max-width: 768px) 100vw, 33vw'
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
                <h1 className='text-3xl md:text-5xl lg:text-[6rem] font-title text-gold leading-[0.8] tracking-tight mb-6'>
                  La
                  <br />
                  Galerie
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
                    <span className='block text-gold mt-2 pb-2'>notre exigence</span>
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
            <GalleryGrid layout='page' />
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
              quality={90}
              sizes='(max-width: 768px) 100vw, 100vw'
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
              <blockquote className='text-2xl md:text-4xl lg:text-5xl font-title text-cream leading-[0.8] md:tracking-[-2px] pb-2'>
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
                    GALLERY_IMAGES.find((img) => img.src.includes('Coupes-19')),
                    GALLERY_IMAGES.find((img) => img.src.includes('Ambiance-23')),
                    GALLERY_IMAGES.find((img) => img.src.includes('Soins-4')),
                    GALLERY_IMAGES.find((img) => img.src.includes('Barbe-23')),
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
                          quality={90}
                          sizes='(max-width: 768px) 100vw, 50vw'
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

      <Footer />
    </div>
  )
}
