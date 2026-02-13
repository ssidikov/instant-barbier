'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import GoogleMap from '@/components/GoogleMap'
import { BACKGROUNDS, LOGOS } from '@/lib/images'

// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM IMAGE COMPONENT (Replaces Parallax)
// ═══════════════════════════════════════════════════════════════════════════

function PremiumImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <div className='absolute inset-0 transition-transform duration-[2000ms] hover:scale-105'>
        <Image src={src} alt={alt} fill className='object-cover' />
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30 pointer-events-none' />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING BADGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function FloatingBadge({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <Reveal
      variant='fade-up'
      delay={delay}
      className={`absolute bg-navy/95 backdrop-blur-md border border-gold/20 px-5 py-3 z-20 ${className}`}>
      {children}
    </Reveal>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function SalonPage() {
  return (
    <div className='bg-navy min-h-screen text-cream overflow-x-hidden selection:bg-gold selection:text-navy'>
      <main>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Full viewport immersive opening
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative h-screen flex items-center justify-center overflow-hidden'>
          {/* Background */}
          <div className='absolute inset-0 z-0'>
            <Image
              src={BACKGROUNDS.salonHero.src}
              alt={BACKGROUNDS.salonHero.alt}
              fill
              className='object-cover'
              priority
            />
            <div className='absolute inset-0 bg-navy/85 mix-blend-multiply' />
          </div>

          {/* Floating decorative elements */}
          <div className='absolute top-20 left-[10%] w-px h-[30vh] bg-gradient-to-b from-transparent via-gold to-transparent opacity-20' />
          <div className='absolute bottom-40 right-[15%] w-64 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-20' />

          {/* Hero Content - asymmetric positioning */}
          <div className='relative z-10 w-full px-5 md:px-12 lg:px-20'>
            <div className='max-w-7xl mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-end'>
                {/* Main title - spans most columns */}
                <div className='lg:col-span-8'>
                  <Reveal variant='fade-up'>
                    <span className='inline-block text-gold/70 text-xs uppercase tracking-[0.5em] mb-6'>
                      Paris 3ᵉ — Le Marais
                    </span>
                  </Reveal>
                  <Reveal variant='blur-in' duration={1.2}>
                    <h1 className='text-5xl md:text-8xl lg:text-[10rem] font-title text-gold leading-[0.85] tracking-tight'>
                      Le
                      <br />
                      <span className='text-cream'>Salon</span>
                    </h1>
                  </Reveal>
                </div>

                {/* Side description - offset position */}
                <div className='lg:col-span-4 lg:pb-8'>
                  <Reveal variant='fade-side' delay={0.4}>
                    <p className='text-cream/60 text-lg font-light leading-relaxed max-w-xs'>
                      Un lieu d&apos;élégance dédié à l&apos;excellence masculine.
                    </p>
                    <div className='mt-6 w-16 h-px bg-gold/40' />
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            INTRODUCTION - Offset asymmetric layout
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-20 md:py-32 lg:py-48 relative'>
          {/* Decorative background elements */}
          <div className='absolute top-0 right-0 w-1/2 h-full bg-navy-secondary/20 -skew-x-12 origin-top-right' />

          <div className='relative z-10 max-w-7xl mx-auto px-5 md:px-12 lg:px-20'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6'>
              {/* Large quote / statement - offset left */}
              <div className='lg:col-span-7 lg:pr-12'>
                <Reveal variant='fade-up'>
                  <span className='text-gold text-8xl font-serif leading-none opacity-20 block mb-4'>
                    &quot;
                  </span>
                  <h2 className='text-3xl md:text-5xl lg:text-6xl font-title text-cream leading-[1.1] -mt-16'>
                    Bien plus qu&apos;un
                    <span className='block text-gold'>salon de coiffure</span>
                  </h2>
                </Reveal>
              </div>

              {/* Description text - offset right */}
              <div className='lg:col-span-5 lg:pt-24'>
                <Reveal variant='fade-side' delay={0.2}>
                  <p className='text-xl md:text-2xl text-cream/70 font-light leading-relaxed'>
                    Situé au cœur du <strong className='text-gold font-normal'>Marais</strong>,
                    L&apos;Instant Barbier est un lieu pensé pour l&apos;élégance masculine, où le
                    savoir-faire artisanal rencontre une atmosphère raffinée.
                  </p>
                  <div className='mt-8 flex items-center gap-4'>
                    <div className='w-12 h-px bg-gold/40' />
                    <span className='text-gold/60 text-sm uppercase tracking-widest'>Paris 3ᵉ</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ATMOSPHERE SECTION - Overlapping images and floating content
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative py-20 md:py-0 md:min-h-screen'>
          <div className='max-w-7xl mx-auto px-5 md:px-12 lg:px-20'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]'>
              {/* Image composition - overlapping images */}
              <div className='lg:col-span-7 relative h-[50vh] md:h-[80vh]'>
                {/* Main large image */}
                <Reveal
                  variant='scale-up'
                  duration={1.2}
                  className='absolute top-0 left-0 w-[75%] h-[70%] z-10'>
                  <PremiumImage
                    src={BACKGROUNDS.salonAtmosphereMain.src}
                    alt={BACKGROUNDS.salonAtmosphereMain.alt}
                    className='w-full h-full'
                  />
                </Reveal>

                {/* Smaller overlapping image */}
                <Reveal
                  variant='scale-up'
                  delay={0.3}
                  className='absolute bottom-0 right-0 w-[55%] h-[50%] z-20 border-8 border-navy'>
                  <PremiumImage
                    src={BACKGROUNDS.salonAtmosphereDetail.src}
                    alt={BACKGROUNDS.salonAtmosphereDetail.alt}
                    className='w-full h-full'
                  />
                </Reveal>
              </div>

              {/* Text content - free flowing */}
              <div className='lg:col-span-5 lg:pl-8'>
                <Reveal variant='fade-up'>
                  <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                    01 — L&apos;Espace
                  </span>
                </Reveal>
                <Reveal variant='fade-up' delay={0.1}>
                  <h3 className='text-4xl md:text-5xl font-title text-cream mb-8 leading-tight'>
                    Élégance
                    <br />
                    <span className='text-gold'>&</span> Chaleur
                  </h3>
                </Reveal>
                <Reveal variant='fade-up' delay={0.2}>
                  <p className='text-cream/70 text-lg font-light leading-relaxed mb-6'>
                    Dès votre entrée, plongez dans une ambiance chaleureuse et apaisante. Les
                    matières nobles et l&apos;éclairage maîtrisé créent un espace propice à la
                    détente.
                  </p>
                </Reveal>
                <Reveal variant='fade-up' delay={0.3}>
                  <p className='text-cream/50 text-base font-light leading-relaxed'>
                    Chaque détail reflète notre exigence : un lieu où l&apos;on prend le temps, où
                    chaque client est unique.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            EXPERTISE SECTION - Horizontal scroll-like feel with vertical layout
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-20 md:py-32 lg:py-48 bg-dark relative overflow-hidden'>
          {/* Background accent */}
          <div className='absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold/5 to-transparent' />

          <div className='max-w-7xl mx-auto px-5 md:px-12 lg:px-20 relative z-10'>
            {/* Section header - spanning full width */}
            <Reveal variant='fade-up' className='mb-20 md:mb-32'>
              <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                02 — Savoir-Faire
              </span>
              <h3 className='text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-title text-cream leading-[0.9]'>
                L&apos;Art du
                <br />
                <span className='text-gold'>Barbier</span>
              </h3>
            </Reveal>

            {/* Content grid - asymmetric */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12'>
              {/* Left column - feature list */}
              <div className='lg:col-span-4 space-y-8'>
                {[
                  { label: 'Coupes', desc: 'Précision aux ciseaux' },
                  { label: 'Dégradés', desc: 'Taper fade maîtrisé' },
                  { label: 'Barbe', desc: 'Travail traditionnel' },
                  { label: 'Conseils', desc: 'Personnalisés' },
                ].map((item, i) => (
                  <Reveal key={i} variant='fade-up' delay={i * 0.1}>
                    <div className='group flex items-start gap-4 cursor-default'>
                      <span className='text-gold/30 text-xs font-mono mt-1'>0{i + 1}</span>
                      <div>
                        <span className='text-cream text-xl font-title block group-hover:text-gold transition-colors duration-500'>
                          {item.label}
                        </span>
                        <span className='text-cream/40 text-sm'>{item.desc}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Center - Large image */}
              <Reveal variant='scale-up' className='lg:col-span-5 h-[50vh] md:h-[70vh] relative'>
                <PremiumImage
                  src={BACKGROUNDS.salonExpertise.src}
                  alt={BACKGROUNDS.salonExpertise.alt}
                  className='w-full h-full'
                />
                {/* Gold corner accents */}
                <div className='absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold/30' />
                <div className='absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gold/30' />
              </Reveal>

              {/* Right column - text */}
              <div className='lg:col-span-3 flex flex-col justify-end'>
                <Reveal variant='fade-side' delay={0.2}>
                  <p className='text-cream/60 text-lg font-light leading-relaxed'>
                    La tradition du barbier parisien est au cœur de notre approche. Chaque geste est
                    maîtrisé avec rigueur pour un résultat
                    <span className='text-gold'> net, élégant et durable</span>.
                  </p>
                  <div className='mt-8'>
                    <Button href='/prestations'>Nos Prestations</Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            EXPERIENCE SECTION - Bento-style grid
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-20 md:py-32 lg:py-48 relative'>
          {/* Floating background orb */}
          <div className='absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none' />

          <div className='max-w-7xl mx-auto px-5 md:px-12 lg:px-20 relative z-10'>
            {/* Section header */}
            <Reveal variant='fade-up' className='text-center mb-20'>
              <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                03 — Expérience
              </span>
              <h3 className='text-4xl md:text-6xl font-title text-cream'>
                Un Moment <span className='text-gold'>Privilégié</span>
              </h3>
            </Reveal>

            {/* Bento grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
              {/* Large card */}
              <Reveal
                variant='scale-up'
                className='md:col-span-2 lg:col-span-2 lg:row-span-2 relative h-[400px] lg:h-full overflow-hidden group'>
                <PremiumImage
                  src={BACKGROUNDS.salonExperienceLarge.src}
                  alt={BACKGROUNDS.salonExperienceLarge.alt}
                  className='absolute inset-0'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent' />
                <div className='absolute bottom-0 left-0 p-8 md:p-12'>
                  <h4 className='text-3xl md:text-4xl font-title text-gold mb-4'>Soins Premium</h4>
                  <p className='text-cream/70 font-light max-w-md'>
                    Serviettes chaudes, huiles essentielles et produits haut de gamme pour une
                    expérience sensorielle complète.
                  </p>
                </div>
              </Reveal>

              {/* Smaller cards */}
              {[
                {
                  title: 'Conseils Experts',
                  desc: 'Écoute attentive pour votre style unique.',
                  image: BACKGROUNDS.salonExperienceSmall1.src,
                },
                {
                  title: 'Détente Absolue',
                  desc: 'Un moment hors du temps.',
                  image: BACKGROUNDS.salonExperienceSmall2.src,
                },
              ].map((item, i) => (
                <Reveal
                  key={i}
                  variant='scale-up'
                  delay={0.2 + i * 0.15}
                  className='relative h-[300px] overflow-hidden group'>
                  <PremiumImage src={item.image} alt={item.title} className='absolute inset-0' />
                  <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent' />
                  <div className='absolute bottom-0 left-0 p-6'>
                    <h4 className='text-xl font-title text-gold mb-2'>{item.title}</h4>
                    <p className='text-cream/60 text-sm font-light'>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            LOCATION CTA - Full-width cinematic
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative py-20 md:py-32 lg:py-48 overflow-hidden'>
          {/* Background */}
          <div className='absolute inset-0'>
            <Image
              src={BACKGROUNDS.salonLocation.src}
              alt={BACKGROUNDS.salonLocation.alt}
              fill
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60' />
          </div>

          <div className='max-w-7xl mx-auto px-5 md:px-12 lg:px-20 relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center'>
              {/* Text content */}
              <div>
                <Reveal variant='fade-up'>
                  <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-6 block'>
                    Rendez-vous
                  </span>
                </Reveal>
                <Reveal variant='fade-up' delay={0.1}>
                  <h3 className='text-4xl md:text-6xl font-title text-cream mb-8 leading-tight'>
                    Votre barbier
                    <br />
                    <span className='text-gold'>dans le Marais</span>
                  </h3>
                </Reveal>
                <Reveal variant='fade-up' delay={0.2}>
                  <p className='text-cream/70 text-xl font-light mb-10 max-w-lg'>
                    Idéalement situé dans le{' '}
                    <strong className='text-gold font-normal'>3ᵉ arrondissement</strong>, nous vous
                    accueillons sur rendez-vous.
                  </p>
                </Reveal>
                <Reveal variant='fade-up' delay={0.3} className='flex flex-wrap gap-4'>
                  <Button href='/reservation'>Prendre Rendez-vous</Button>
                  <Button href='/contact'>Nous Contacter</Button>
                </Reveal>
              </div>

              {/* Location card */}
              <Reveal
                variant='fade-up'
                delay={0.4}
                className='relative lg:h-full min-h-[500px] flex flex-col'>
                {/* Glow effect */}
                <div className='absolute inset-0 bg-gold/5 blur-3xl rounded-full opacity-20 pointer-events-none' />

                {/* Card Container */}
                <div className='grow bg-navy-secondary border border-gold/10 w-full relative overflow-hidden flex flex-col group'>
                  {/* Top Info */}
                  <div className='p-8 md:p-10 border-b border-gold/10 relative z-20 bg-navy-secondary/95 backdrop-blur-sm'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <span className='text-gold/50 text-[10px] uppercase tracking-[0.3em] font-medium mb-3 block'>
                          Localisation
                        </span>
                        <h4 className='text-3xl md:text-4xl font-title text-cream mb-2'>
                          L&apos;Instant <span className='text-gold'>Barbier</span>
                        </h4>
                        <p className='text-cream/50 font-light text-sm italic'>
                          Au cœur du Marais historique
                        </p>
                      </div>
                      <div className='hidden sm:block relative w-16 h-16 opacity-80'>
                        <Image
                          src={LOGOS.linstant.src}
                          alt={LOGOS.linstant.alt}
                          fill
                          className='object-contain'
                        />
                      </div>
                    </div>

                    <div className='mt-8 flex items-center gap-4'>
                      <div className='w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 text-gold'>
                        <svg
                          className='w-5 h-5'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.5'>
                          <path d='M12 21c-4.5-4.5-8-9.5-8-13a8 8 0 1 1 16 0c0 3.5-3.5 8.5-8 13z' />
                          <circle cx='12' cy='8' r='3' />
                        </svg>
                      </div>
                      <div>
                        <p className='text-lg text-cream'>43 rue de Turenne</p>
                        <p className='text-sm text-cream/60'>75003 Paris, France</p>
                      </div>
                    </div>
                  </div>

                  {/* Map - Fills space */}
                  <div className='relative grow min-h-[300px] z-10 grayscale-50 hover:grayscale-0 transition-all duration-700'>
                    <GoogleMap
                      address='43 rue de Turenne, 75003 Paris'
                      className='absolute inset-0 w-full h-full'
                    />
                    {/* Inner shadows for depth */}
                    <div className='absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(5,17,20,0.8)]' />
                  </div>

                  {/* Footer Info */}
                  <div className='p-6 bg-navy-secondary border-t border-gold/10 flex flex-wrap gap-6 justify-between items-center relative z-20'>
                    <a
                      href='tel:0145354722'
                      className='flex items-center gap-3 group/tel cursor-pointer'>
                      <span className='w-8 h-8 flex items-center justify-center border border-gold/20 group-hover/tel:border-gold text-gold transition-colors'>
                        <svg
                          className='w-3 h-3'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='1.5'>
                          <path
                            strokeLinecap='round'
                            d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                          />
                        </svg>
                      </span>
                      <span className='text-cream/80 text-sm tracking-widest group-hover/tel:text-gold transition-colors'>
                        01 45 35 47 22
                      </span>
                    </a>

                    <div className='text-right'>
                      <span className='block text-[10px] text-gold/60 uppercase tracking-[0.2em] mb-1'>
                        Ouverture
                      </span>
                      <span className='block text-cream/70 text-xs'>7j/7 • Nocturne 21h</span>
                    </div>
                  </div>
                </div>

                {/* Exterior Accents */}
                <div className='absolute -top-3 -right-3 w-40 h-40 border-t border-r border-gold/20 pointer-events-none' />
                <div className='absolute -bottom-3 -left-3 w-12 h-12 border-b border-l border-gold/20 pointer-events-none' />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
