'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import { BACKGROUNDS } from '@/lib/images'

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
  // Check if className already contains positioning (absolute, relative, fixed)
  const hasPositioning = /\b(absolute|relative|fixed)\b/.test(className)
  const positionClass = hasPositioning ? '' : 'relative'

  return (
    <div className={`${positionClass} overflow-hidden ${className}`}>
      <div className='absolute inset-0 transition-transform duration-[2000ms] group-hover:scale-105'>
        <Image src={src} alt={alt} fill className='object-cover' />
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30 pointer-events-none' />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PRESTATION CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function PrestationCard({
  number,
  title,
  description,
  features,
  image,
  reverse = false,
}: {
  number: string
  title: string
  description: string
  features: string[]
  image: string
  reverse?: boolean
}) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      {/* Image side */}
      <Reveal
        variant='scale-up'
        duration={1.2}
        className={`lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'} h-[40vh] md:h-[65vh] relative`}>
        <PremiumImage src={image} alt={title} className='w-full h-full' />
        {/* Corner accents */}
        <div
          className={`absolute ${reverse ? '-right-4 -top-4' : '-left-4 -top-4'} w-16 h-16 border-t-2 ${reverse ? 'border-r-2' : 'border-l-2'} border-gold/30`}
        />
        <div
          className={`absolute ${reverse ? '-left-4 -bottom-4' : '-right-4 -bottom-4'} w-16 h-16 border-b-2 ${reverse ? 'border-l-2' : 'border-r-2'} border-gold/30`}
        />
        {/* Number overlay */}
        <div
          className={`absolute ${reverse ? 'right-8' : 'left-8'} bottom-8 text-8xl font-title text-gold/10`}>
          {number}
        </div>
      </Reveal>

      {/* Content side */}
      <div className={`lg:col-span-6 ${reverse ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'}`}>
        <Reveal variant='fade-up'>
          <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
            {number} — Prestation
          </span>
        </Reveal>
        <Reveal variant='fade-up' delay={0.1}>
          <h3 className='text-4xl md:text-5xl lg:text-6xl font-title text-cream mb-8 leading-[0.95]'>
            {title}
          </h3>
        </Reveal>
        <Reveal variant='fade-up' delay={0.2}>
          <p className='text-cream/70 text-lg md:text-xl font-light leading-relaxed mb-8'>
            {description}
          </p>
        </Reveal>
        <div className='space-y-4'>
          {features.map((feature, i) => (
            <Reveal key={i} variant='fade-up' delay={0.3 + i * 0.1}>
              <div className='flex items-center gap-4 group'>
                <div className='w-8 h-px bg-gold/40 group-hover:w-12 group-hover:bg-gold transition-all duration-500' />
                <span className='text-cream/80 text-sm uppercase tracking-widest group-hover:text-gold transition-colors duration-500'>
                  {feature}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function PrestationsPage() {
  return (
    <div className='bg-navy min-h-screen text-cream overflow-x-hidden selection:bg-gold selection:text-navy'>
      <main>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Immersive cinematic opening
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative h-screen flex items-center justify-center overflow-hidden'>
          {/* Background */}
          <div className='absolute inset-0 z-0'>
            <div className='absolute inset-0 animate-[kenburns_20s_infinite_alternate]'>
              <Image
                src={BACKGROUNDS.prestationsHero.src}
                alt={BACKGROUNDS.prestationsHero.alt}
                fill
                className='object-cover'
                priority
              />
            </div>
            <div className='absolute inset-0 bg-navy/85 mix-blend-multiply' />
          </div>

          {/* Floating lines */}
          <div className='absolute top-32 right-[20%] w-px h-[25vh] bg-gradient-to-b from-transparent via-gold to-transparent opacity-15' />
          <div className='absolute bottom-32 left-[15%] w-48 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-10' />

          {/* Hero Content */}
          <div className='relative z-10 w-full px-5 md:px-12 lg:px-20'>
            <div className='max-w-7xl mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-end'>
                {/* Title */}
                <div className='lg:col-span-8'>
                  <Reveal variant='fade-up'>
                    <span className='inline-block text-gold/70 text-xs uppercase tracking-[0.5em] mb-6'>
                      Barbier & Coiffeur Homme — Paris
                    </span>
                  </Reveal>
                  <Reveal variant='blur-in' duration={1.2}>
                    <h1 className='text-4xl md:text-7xl lg:text-[9rem] font-title text-gold leading-[0.85] tracking-tight'>
                      Pres
                      <br />
                      <span className='text-cream'>tations</span>
                    </h1>
                  </Reveal>
                </div>

                {/* Side text */}
                <div className='lg:col-span-4 lg:pb-8'>
                  <Reveal variant='fade-side' delay={0.5}>
                    <p className='text-cream/60 text-lg font-light leading-relaxed max-w-xs'>
                      L&apos;art du sur-mesure au service de votre style.
                    </p>
                    <div className='mt-6 w-16 h-px bg-gold/40' />
                  </Reveal>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className='absolute bottom-12 left-12 flex items-center gap-4 z-20 animate-bounce duration-[3s]'>
            <div className='w-px h-16 bg-gradient-to-b from-gold to-transparent' />
            <span className='text-[10px] text-gold/50 uppercase tracking-[0.3em] rotate-90 origin-left translate-x-2'>
              Découvrir
            </span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            INTRODUCTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-20 md:py-32 lg:py-48 relative'>
          <div className='absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold/3 to-transparent' />

          <div className='max-w-7xl mx-auto px-5 md:px-12 lg:px-20 relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
              <div className='lg:col-span-6'>
                <Reveal variant='scale-up' duration={1}>
                  <span className='text-gold text-[6rem] md:text-[8rem] font-serif leading-none opacity-10 block'>
                    ✂
                  </span>
                </Reveal>
                <Reveal variant='fade-up' delay={0.2}>
                  <h2 className='text-3xl md:text-5xl font-title text-cream leading-[1.1] -mt-12'>
                    Des prestations
                    <span className='block text-gold'>sur mesure</span>
                  </h2>
                </Reveal>
              </div>

              <div className='lg:col-span-6 lg:pt-16'>
                <Reveal variant='fade-side' delay={0.4}>
                  <p className='text-xl md:text-2xl text-cream/70 font-light leading-relaxed mb-6'>
                    Chaque prestation est pensée pour répondre aux exigences de l&apos;homme
                    moderne.
                  </p>
                  <p className='text-lg text-cream/50 font-light leading-relaxed'>
                    De la <strong className='text-gold font-normal'>coupe classique</strong> aux{' '}
                    <strong className='text-gold font-normal'>dégradés modernes</strong>, nous
                    mettons notre expertise au service de votre style.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRESTATION 1 - COIFFURE HOMME
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-16 md:py-24 lg:py-32'>
          <div className='max-w-7xl mx-auto px-5 md:px-12 lg:px-20'>
            <PrestationCard
              number='01'
              title='Coiffure Homme'
              description='Nos coupes sont réalisées avec une attention particulière portée aux détails et à la morphologie. Chaque réalisation est adaptée à votre personnalité et à votre mode de vie.'
              features={[
                'Dégradé Taper Fade',
                'Coupe classique ciseaux',
                'Coiffure contemporaine',
                'Conseil personnalisé',
              ]}
              image={BACKGROUNDS.prestationCoiffure.src}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRESTATION 2 - BARBE
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-16 md:py-24 lg:py-32 bg-dark relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent' />

          <div className='max-w-7xl mx-auto px-5 md:px-12 lg:px-20 relative z-10'>
            <PrestationCard
              number='02'
              title='Barbe'
              description={`La barbe est travaillée comme un véritable art. Nos rituels incluent une taille précise, des finitions soignées et l'utilisation de serviettes chaudes pour un rendu net et élégant.`}
              features={[
                'Taille précise',
                'Serviettes chaudes',
                'Soins spécifiques',
                'Finitions soignées',
              ]}
              image={BACKGROUNDS.prestationBarbe.src}
              reverse
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRESTATION 3 - SOINS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-16 md:py-24 lg:py-32'>
          <div className='max-w-7xl mx-auto px-5 md:px-12 lg:px-20'>
            <PrestationCard
              number='03'
              title='Soins & Bien-être'
              description='Nous proposons des soins premium pour les cheveux et le visage, conçus pour hydrater, revitaliser et offrir un véritable moment de détente.'
              features={[
                'Soin visage homme',
                'Hydratation premium',
                'Massage relaxant',
                'Produits haut de gamme',
              ]}
              image={BACKGROUNDS.prestationSoins.src}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            EXPERIENCE SECTION - Bento Grid
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-20 md:py-32 lg:py-48 bg-navy-secondary/30 relative overflow-hidden'>
          <div className='absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-gold/3 blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none' />

          <div className='max-w-7xl mx-auto px-5 md:px-12 lg:px-20 relative z-10'>
            {/* Section Header */}
            <div className='text-center mb-20'>
              <Reveal variant='fade-up'>
                <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                  L&apos;Excellence
                </span>
                <h2 className='text-4xl md:text-6xl font-title text-cream'>
                  Une expérience <span className='text-gold'>haut de gamme</span>
                </h2>
              </Reveal>
              <Reveal variant='fade-up' delay={0.2}>
                <p className='text-cream/50 text-lg font-light max-w-2xl mx-auto mt-6'>
                  Chaque prestation est pensée comme un moment privilégié, où expertise et confort
                  se rencontrent.
                </p>
              </Reveal>
            </div>

            {/* Bento Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
              {/* Large feature card */}
              <Reveal
                variant='scale-up'
                duration={1}
                className='md:col-span-2 md:row-span-2 relative h-[400px] md:h-full overflow-hidden group border border-gold/10'>
                <PremiumImage
                  src={BACKGROUNDS.prestationBentoLarge.src}
                  alt={BACKGROUNDS.prestationBentoLarge.alt}
                  className='absolute inset-0'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent pointer-events-none' />
                <div className='absolute bottom-0 left-0 p-8 md:p-12'>
                  <span className='text-gold/60 text-xs uppercase tracking-[0.2em] mb-3 block'>
                    Notre Promesse
                  </span>
                  <h3 className='text-3xl md:text-4xl font-title text-cream mb-4'>
                    Élégance <span className='text-gold'>&</span> Personnalisation
                  </h3>
                  <p className='text-cream/70 font-light max-w-md'>
                    Notre objectif est de vous offrir bien plus qu&apos;un service : une expérience
                    élégante et personnalisée, fidèle à l&apos;esprit du barbier parisien.
                  </p>
                </div>
              </Reveal>

              {/* Smaller cards */}
              <Reveal
                variant='fade-up'
                delay={0.2}
                className='relative h-[250px] overflow-hidden group border border-gold/10'>
                <PremiumImage
                  src={BACKGROUNDS.prestationBentoRendezVous.src}
                  alt={BACKGROUNDS.prestationBentoRendezVous.alt}
                  className='absolute inset-0'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent pointer-events-none' />
                <div className='absolute inset-0 p-6 flex flex-col justify-end relative z-10 h-full'>
                  <div>
                    <h4 className='text-xl font-title text-gold mb-2'>Sur Rendez-vous</h4>
                    <p className='text-cream/50 text-sm font-light'>
                      Pour vous garantir un moment dédié, sans attente.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal
                variant='fade-up'
                delay={0.4}
                className='relative h-[250px] overflow-hidden group border border-gold/10'>
                <PremiumImage
                  src={BACKGROUNDS.prestationBentoPremium.src}
                  alt={BACKGROUNDS.prestationBentoPremium.alt}
                  className='absolute inset-0'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent pointer-events-none' />
                <div className='absolute inset-0 p-6 flex flex-col justify-end relative z-10 h-full'>
                  <div>
                    <h4 className='text-xl font-title text-gold mb-2'>Produits Premium</h4>
                    <p className='text-cream/50 text-sm font-light'>
                      Sélection rigoureuse de produits haut de gamme.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CTA SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-20 md:py-32 lg:py-48 relative overflow-hidden'>
          <div className='absolute inset-0'>
            <Image
              src={BACKGROUNDS.prestationCta.src}
              alt={BACKGROUNDS.prestationCta.alt}
              fill
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-navy/50' />
          </div>

          <div className='max-w-5xl mx-auto px-5 md:px-12 lg:px-20 relative z-10 text-center'>
            <Reveal variant='fade-up'>
              <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-6 block'>
                Prêt ?
              </span>
              <h2 className='text-4xl md:text-6xl lg:text-7xl font-title text-cream mb-8'>
                Réservez votre
                <br />
                <span className='text-gold'>instant</span>
              </h2>
            </Reveal>
            <Reveal variant='fade-up' delay={0.2}>
              <p className='text-cream/60 text-xl font-light mb-12 max-w-2xl mx-auto'>
                Découvrez l&apos;art du barbier parisien dans un cadre d&apos;exception.
              </p>
            </Reveal>
            <Reveal variant='fade-up' delay={0.4}>
              <div className='flex flex-wrap justify-center gap-4'>
                <Button href='/reservation'>Prendre Rendez-vous</Button>
                <Button href='/contact'>Nous Contacter</Button>
              </div>
            </Reveal>
          </div>

          {/* Decorative corner elements */}
          <div className='absolute top-12 left-12 w-24 h-24 border-t border-l border-gold/10 hidden md:block' />
          <div className='absolute bottom-12 right-12 w-24 h-24 border-b border-r border-gold/10 hidden md:block' />
        </section>
      </main>

      <Footer />
    </div>
  )
}
