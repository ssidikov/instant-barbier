'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

const easeOutExpo = [0.22, 1, 0.36, 1] as const

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easeOutExpo },
  },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: easeOutExpo },
  },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: easeOutExpo },
  },
}

const scaleReveal = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(20px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: easeOutExpo },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// PARALLAX IMAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.5,
}: {
  src: string
  alt: string
  className?: string
  speed?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 30}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ y }}
        className='absolute inset-0'>
        <Image src={src} alt={alt} fill className='object-cover' />
      </motion.div>
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      {/* Image side */}
      <motion.div
        variants={scaleReveal}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        className={`lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'} h-[50vh] md:h-[65vh] relative`}>
        <ParallaxImage src={image} alt={title} className='w-full h-full' speed={0.3} />
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
      </motion.div>

      {/* Content side */}
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        className={`lg:col-span-6 ${reverse ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'}`}>
        <motion.span
          variants={fadeInUp}
          className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
          {number} — Prestation
        </motion.span>
        <motion.h3
          variants={fadeInUp}
          className='text-4xl md:text-5xl lg:text-6xl font-title text-cream mb-8 leading-[0.95]'>
          {title}
        </motion.h3>
        <motion.p
          variants={fadeInUp}
          className='text-cream/70 text-lg md:text-xl font-light leading-relaxed mb-8'>
          {description}
        </motion.p>
        <motion.div variants={fadeInUp} className='space-y-4'>
          {features.map((feature, i) => (
            <div key={i} className='flex items-center gap-4 group'>
              <div className='w-8 h-px bg-gold/40 group-hover:w-12 group-hover:bg-gold transition-all duration-500' />
              <span className='text-cream/80 text-sm uppercase tracking-widest group-hover:text-gold transition-colors duration-500'>
                {feature}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function PrestationsPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%'])

  return (
    <div className='bg-navy min-h-screen text-cream overflow-x-hidden selection:bg-gold selection:text-navy'>
      <Header />

      <main>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Immersive cinematic opening
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className='relative h-screen flex items-center justify-center overflow-hidden'>
          {/* Background */}
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity }}
            className='absolute inset-0 z-0'>
            <Image
              src='/images/prestations.jpg'
              alt='Prestations L Instant Barbier'
              fill
              className='object-cover'
              priority
            />
            <div className='absolute inset-0 bg-navy/70' />
          </motion.div>

          {/* Floating lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 1, duration: 2 }}
            className='absolute top-32 right-[20%] w-px h-[25vh] bg-gradient-to-b from-transparent via-gold to-transparent'
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1.3, duration: 2 }}
            className='absolute bottom-32 left-[15%] w-48 h-px bg-gradient-to-r from-transparent via-gold to-transparent'
          />

          {/* Hero Content */}
          <div className='relative z-10 w-full px-6 md:px-12 lg:px-20'>
            <motion.div style={{ y: titleY }} className='max-w-7xl mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-end'>
                {/* Title */}
                <motion.div
                  initial='hidden'
                  animate='visible'
                  variants={staggerContainer}
                  className='lg:col-span-8'>
                  <motion.span
                    variants={fadeInUp}
                    className='inline-block text-gold/70 text-xs uppercase tracking-[0.5em] mb-6'>
                    Barbier & Coiffeur Homme — Paris
                  </motion.span>
                  <motion.h1
                    variants={fadeInUp}
                    className='text-5xl md:text-7xl lg:text-[9rem] font-title text-gold leading-[0.85] tracking-tight'>
                    Pres
                    <br />
                    <span className='text-cream'>tations</span>
                  </motion.h1>
                </motion.div>

                {/* Side text */}
                <motion.div
                  variants={fadeInRight}
                  initial='hidden'
                  animate='visible'
                  className='lg:col-span-4 lg:pb-8'>
                  <p className='text-cream/60 text-lg font-light leading-relaxed max-w-xs'>
                    L&apos;art du sur-mesure au service de votre style.
                  </p>
                  <div className='mt-6 w-16 h-px bg-gold/40' />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className='absolute bottom-12 left-12 flex items-center gap-4 z-20'>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className='w-px h-16 bg-gradient-to-b from-gold to-transparent'
            />
            <span className='text-[10px] text-gold/50 uppercase tracking-[0.3em] rotate-90 origin-left translate-x-2'>
              Découvrir
            </span>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            INTRODUCTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-32 md:py-48 relative'>
          <div className='absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold/3 to-transparent' />

          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
              <motion.div
                variants={fadeInLeft}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='lg:col-span-6'>
                <span className='text-gold text-[6rem] md:text-[8rem] font-serif leading-none opacity-10 block'>
                  ✂
                </span>
                <h2 className='text-3xl md:text-5xl font-title text-cream leading-[1.1] -mt-12'>
                  Des prestations
                  <span className='block text-gold'>sur mesure</span>
                </h2>
              </motion.div>

              <motion.div
                variants={fadeInRight}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='lg:col-span-6 lg:pt-16'>
                <p className='text-xl md:text-2xl text-cream/70 font-light leading-relaxed mb-6'>
                  Chaque prestation est pensée pour répondre aux exigences de l&apos;homme moderne.
                </p>
                <p className='text-lg text-cream/50 font-light leading-relaxed'>
                  De la <strong className='text-gold font-normal'>coupe classique</strong> aux{' '}
                  <strong className='text-gold font-normal'>dégradés modernes</strong>, nous mettons
                  notre expertise au service de votre style.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRESTATION 1 - COIFFURE HOMME
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-24 md:py-32'>
          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
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
              image='https://placehold.co/900x1100/0f0f0f/AF9778?text=Coiffure+Homme'
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRESTATION 2 - BARBE
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-24 md:py-32 bg-dark relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent' />

          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10'>
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
              image='https://placehold.co/900x1100/07181E/AF9778?text=Barbe+Rituel'
              reverse
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRESTATION 3 - SOINS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-24 md:py-32'>
          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
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
              image='https://placehold.co/900x1100/0f0f0f/AF9778?text=Soins+Premium'
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            EXPERIENCE SECTION - Bento Grid
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-32 md:py-48 bg-navy-secondary/30 relative overflow-hidden'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-gold/3 blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none'
          />

          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10'>
            {/* Section Header */}
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='text-center mb-20'>
              <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                L&apos;Excellence
              </span>
              <h2 className='text-4xl md:text-6xl font-title text-cream'>
                Une expérience <span className='text-gold'>haut de gamme</span>
              </h2>
              <p className='text-cream/50 text-lg font-light max-w-2xl mx-auto mt-6'>
                Chaque prestation est pensée comme un moment privilégié, où expertise et confort se
                rencontrent.
              </p>
            </motion.div>

            {/* Bento Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
              {/* Large feature card */}
              <motion.div
                variants={scaleReveal}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='md:col-span-2 md:row-span-2 relative h-[400px] md:h-auto overflow-hidden group'>
                <ParallaxImage
                  src='https://placehold.co/1000x800/07181E/AF9778?text=Experience+Premium'
                  alt='Experience haut de gamme'
                  className='absolute inset-0'
                  speed={0.2}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent' />
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
              </motion.div>

              {/* Smaller cards */}
              <motion.div
                variants={scaleReveal}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className='relative h-[250px] overflow-hidden group bg-dark border border-gold/10'>
                <div className='absolute inset-0 p-6 flex flex-col justify-between'>
                  <div className='w-12 h-12 border border-gold/30 flex items-center justify-center'>
                    <svg
                      className='w-6 h-6 text-gold'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'>
                      <path d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-xl font-title text-gold mb-2'>Sur Rendez-vous</h4>
                    <p className='text-cream/50 text-sm font-light'>
                      Pour vous garantir un moment dédié, sans attente.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={scaleReveal}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className='relative h-[250px] overflow-hidden group bg-dark border border-gold/10'>
                <div className='absolute inset-0 p-6 flex flex-col justify-between'>
                  <div className='w-12 h-12 border border-gold/30 flex items-center justify-center'>
                    <svg
                      className='w-6 h-6 text-gold'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'>
                      <path d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-xl font-title text-gold mb-2'>Produits Premium</h4>
                    <p className='text-cream/50 text-sm font-light'>
                      Sélection rigoureuse de produits haut de gamme.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CTA SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-32 md:py-48 relative overflow-hidden'>
          <div className='absolute inset-0'>
            <Image
              src='https://placehold.co/1920x800/0f0f0f/AF9778?text=CTA+Background'
              alt='Background'
              fill
              className='object-cover opacity-20'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80' />
          </div>

          <div className='max-w-5xl mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center'>
            <motion.div
              variants={staggerContainer}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}>
              <motion.span
                variants={fadeInUp}
                className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-6 block'>
                Prêt ?
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className='text-4xl md:text-6xl lg:text-7xl font-title text-cream mb-8'>
                Réservez votre
                <br />
                <span className='text-gold'>instant</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className='text-cream/60 text-xl font-light mb-12 max-w-2xl mx-auto'>
                Découvrez l&apos;art du barbier parisien dans un cadre d&apos;exception.
              </motion.p>
              <motion.div variants={fadeInUp} className='flex flex-wrap justify-center gap-4'>
                <Button href='/reservation'>Prendre Rendez-vous</Button>
                <Button href='/contact'>Nous Contacter</Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative corner elements */}
          <div className='absolute top-12 left-12 w-24 h-24 border-t border-l border-gold/10' />
          <div className='absolute bottom-12 right-12 w-24 h-24 border-b border-r border-gold/10' />
        </section>
      </main>

      <Footer />
    </div>
  )
}
