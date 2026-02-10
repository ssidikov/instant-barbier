'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { fadeInUp, fadeInLeft, fadeInRight, scaleReveal, staggerContainer } from '@/lib/animations'

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING TEXT BADGE COMPONENT
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute bg-navy/95 backdrop-blur-md border border-gold/20 px-5 py-3 z-20 ${className}`}>
      {children}
    </motion.div>
  )
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
      {/* Luxury vignette overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/30 pointer-events-none' />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function SalonPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%'])

  // Smooth spring for mouse parallax
  const springConfig = { stiffness: 100, damping: 30 }
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)

  return (
    <div className='bg-navy min-h-screen text-cream overflow-x-hidden selection:bg-gold selection:text-navy'>
      <Header />

      <main>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Full viewport immersive opening
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className='relative h-screen flex items-center justify-center overflow-hidden'>
          {/* Background with scale effect on scroll */}
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity }}
            className='absolute inset-0 z-0'>
            <Image
              src='https://placehold.co/1920x1080/07181E/AF9778?text=Hero+Salon+Atmosphere'
              alt='Salon L  Instant Barbier'
              fill
              className='object-cover'
              priority
            />
            <div className='absolute inset-0 bg-navy/60' />
          </motion.div>

          {/* Floating decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 1, duration: 2 }}
            className='absolute top-20 left-[10%] w-px h-[30vh] bg-gradient-to-b from-transparent via-gold to-transparent'
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 1.2, duration: 2 }}
            className='absolute bottom-40 right-[15%] w-64 h-px bg-gradient-to-r from-transparent via-gold to-transparent'
          />

          {/* Hero Content - asymmetric positioning */}
          <div className='relative z-10 w-full px-6 md:px-12 lg:px-20'>
            <motion.div style={{ y: titleY }} className='max-w-7xl mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-end'>
                {/* Main title - spans most columns */}
                <motion.div
                  initial='hidden'
                  animate='visible'
                  variants={staggerContainer}
                  className='lg:col-span-8'>
                  <motion.span
                    variants={fadeInUp}
                    className='inline-block text-gold/70 text-xs uppercase tracking-[0.5em] mb-6'>
                    Paris 3ᵉ — Le Marais
                  </motion.span>
                  <motion.h1
                    variants={fadeInUp}
                    className='text-6xl md:text-8xl lg:text-[10rem] font-title text-gold leading-[0.85] tracking-tight'>
                    Le
                    <br />
                    <span className='text-cream'>Salon</span>
                  </motion.h1>
                </motion.div>

                {/* Side description - offset position */}
                <motion.div
                  variants={fadeInRight}
                  initial='hidden'
                  animate='visible'
                  className='lg:col-span-4 lg:pb-8'>
                  <p className='text-cream/60 text-lg font-light leading-relaxed max-w-xs'>
                    Un lieu d'élégance dédié à l'excellence masculine.
                  </p>
                  <div className='mt-6 w-16 h-px bg-gold/40' />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator - bottom left */}
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
              Scroll
            </span>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            INTRODUCTION - Offset asymmetric layout
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-32 md:py-48 relative'>
          {/* Decorative background elements */}
          <div className='absolute top-0 right-0 w-1/2 h-full bg-navy-secondary/20 -skew-x-12 origin-top-right' />

          <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6'>
              {/* Large quote / statement - offset left */}
              <motion.div
                variants={fadeInLeft}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='lg:col-span-7 lg:pr-12'>
                <span className='text-gold text-8xl font-serif leading-none opacity-20 block mb-4'>
                  "
                </span>
                <h2 className='text-3xl md:text-5xl lg:text-6xl font-title text-cream leading-[1.1] -mt-16'>
                  Bien plus qu'un
                  <span className='block text-gold'>salon de coiffure</span>
                </h2>
              </motion.div>

              {/* Description text - offset right */}
              <motion.div
                variants={fadeInRight}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='lg:col-span-5 lg:pt-24'>
                <p className='text-xl md:text-2xl text-cream/70 font-light leading-relaxed'>
                  Situé au cœur du <strong className='text-gold font-normal'>Marais</strong>,
                  L'Instant Barbier est un lieu pensé pour l'élégance masculine, où le savoir-faire
                  artisanal rencontre une atmosphère raffinée.
                </p>
                <div className='mt-8 flex items-center gap-4'>
                  <div className='w-12 h-px bg-gold/40' />
                  <span className='text-gold/60 text-sm uppercase tracking-widest'>Paris 3ᵉ</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ATMOSPHERE SECTION - Overlapping images and floating content
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative py-20 md:py-0 md:min-h-screen'>
          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]'>
              {/* Image composition - overlapping images */}
              <div className='lg:col-span-7 relative h-[60vh] md:h-[80vh]'>
                {/* Main large image */}
                <motion.div
                  variants={scaleReveal}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  className='absolute top-0 left-0 w-[75%] h-[70%] z-10'>
                  <ParallaxImage
                    src='https://placehold.co/800x1000/0f0f0f/AF9778?text=Salon+Interior+Main'
                    alt='Intérieur du salon'
                    className='w-full h-full'
                    speed={0.3}
                  />
                </motion.div>

                {/* Smaller overlapping image */}
                <motion.div
                  variants={scaleReveal}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className='absolute bottom-0 right-0 w-[55%] h-[50%] z-20 border-8 border-navy'>
                  <ParallaxImage
                    src='https://placehold.co/600x800/142233/AF9778?text=Detail+Ambiance'
                    alt='Détail ambiance'
                    className='w-full h-full'
                    speed={0.5}
                  />
                </motion.div>

                {/* Floating badge */}
                <FloatingBadge className='bottom-[30%] right-[15%]' delay={0.6}>
                  <span className='text-gold text-xs uppercase tracking-widest'>Atmosphère</span>
                </FloatingBadge>
              </div>

              {/* Text content - free flowing */}
              <motion.div
                variants={staggerContainer}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='lg:col-span-5 lg:pl-8'>
                <motion.span
                  variants={fadeInUp}
                  className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                  01 — L'Espace
                </motion.span>
                <motion.h3
                  variants={fadeInUp}
                  className='text-4xl md:text-5xl font-title text-cream mb-8 leading-tight'>
                  Élégance
                  <br />
                  <span className='text-gold'>&</span> Chaleur
                </motion.h3>
                <motion.p
                  variants={fadeInUp}
                  className='text-cream/70 text-lg font-light leading-relaxed mb-6'>
                  Dès votre entrée, plongez dans une ambiance chaleureuse et apaisante. Les matières
                  nobles et l'éclairage maîtrisé créent un espace propice à la détente.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className='text-cream/50 text-base font-light leading-relaxed'>
                  Chaque détail reflète notre exigence : un lieu où l'on prend le temps, où chaque
                  client est unique.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            EXPERTISE SECTION - Horizontal scroll-like feel with vertical layout
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-32 md:py-48 bg-dark relative overflow-hidden'>
          {/* Background accent */}
          <div className='absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold/5 to-transparent' />

          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10'>
            {/* Section header - spanning full width */}
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='mb-20 md:mb-32'>
              <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                02 — Savoir-Faire
              </span>
              <h3 className='text-5xl md:text-7xl lg:text-8xl font-title text-cream leading-[0.9]'>
                L'Art du
                <br />
                <span className='text-gold'>Barbier</span>
              </h3>
            </motion.div>

            {/* Content grid - asymmetric */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
              {/* Left column - feature list */}
              <motion.div
                variants={staggerContainer}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='lg:col-span-4 space-y-8'>
                {[
                  { label: 'Coupes', desc: 'Précision aux ciseaux' },
                  { label: 'Dégradés', desc: 'Taper fade maîtrisé' },
                  { label: 'Barbe', desc: 'Travail traditionnel' },
                  { label: 'Conseils', desc: 'Personnalisés' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInLeft}
                    className='group flex items-start gap-4 cursor-default'>
                    <span className='text-gold/30 text-xs font-mono mt-1'>0{i + 1}</span>
                    <div>
                      <span className='text-cream text-xl font-title block group-hover:text-gold transition-colors duration-500'>
                        {item.label}
                      </span>
                      <span className='text-cream/40 text-sm'>{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Center - Large image */}
              <motion.div
                variants={scaleReveal}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='lg:col-span-5 h-[50vh] md:h-[70vh] relative'>
                <ParallaxImage
                  src='https://placehold.co/700x900/07181E/AF9778?text=Barber+at+Work'
                  alt='Barbier en action'
                  className='w-full h-full'
                  speed={0.4}
                />
                {/* Gold corner accents */}
                <div className='absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold/30' />
                <div className='absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gold/30' />
              </motion.div>

              {/* Right column - text */}
              <motion.div
                variants={fadeInRight}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='lg:col-span-3 flex flex-col justify-end'>
                <p className='text-cream/60 text-lg font-light leading-relaxed'>
                  La tradition du barbier parisien est au cœur de notre approche. Chaque geste est
                  maîtrisé avec rigueur pour un résultat
                  <span className='text-gold'> net, élégant et durable</span>.
                </p>
                <div className='mt-8'>
                  <Button href='/prestations'>
                    Nos Prestations
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            EXPERIENCE SECTION - Bento-style grid
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-32 md:py-48 relative'>
          {/* Floating background orb */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none'
          />

          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10'>
            {/* Section header */}
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='text-center mb-20'>
              <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                03 — Expérience
              </span>
              <h3 className='text-4xl md:text-6xl font-title text-cream'>
                Un Moment <span className='text-gold'>Privilégié</span>
              </h3>
            </motion.div>

            {/* Bento grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
              {/* Large card */}
              <motion.div
                variants={scaleReveal}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='md:col-span-2 lg:col-span-2 lg:row-span-2 relative h-[400px] lg:h-auto overflow-hidden group'>
                <ParallaxImage
                  src='https://placehold.co/900x700/0f0f0f/AF9778?text=Premium+Experience'
                  alt='Expérience premium'
                  className='absolute inset-0'
                  speed={0.2}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent' />
                <div className='absolute bottom-0 left-0 p-8 md:p-12'>
                  <h4 className='text-3xl md:text-4xl font-title text-gold mb-4'>Soins Premium</h4>
                  <p className='text-cream/70 font-light max-w-md'>
                    Serviettes chaudes, huiles essentielles et produits haut de gamme pour une
                    expérience sensorielle complète.
                  </p>
                </div>
              </motion.div>

              {/* Smaller cards */}
              {[
                {
                  title: 'Conseils Experts',
                  desc: 'Écoute attentive pour votre style unique.',
                  image: 'https://placehold.co/500x600/142233/AF9778?text=Consultation',
                },
                {
                  title: 'Détente Absolue',
                  desc: 'Un moment hors du temps.',
                  image: 'https://placehold.co/500x600/07181E/AF9778?text=Relaxation',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={scaleReveal}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className='relative h-[300px] overflow-hidden group'>
                  <ParallaxImage
                    src={item.image}
                    alt={item.title}
                    className='absolute inset-0'
                    speed={0.3}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent' />
                  <div className='absolute bottom-0 left-0 p-6'>
                    <h4 className='text-xl font-title text-gold mb-2'>{item.title}</h4>
                    <p className='text-cream/60 text-sm font-light'>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            LOCATION CTA - Full-width cinematic
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative py-32 md:py-48 overflow-hidden'>
          {/* Background */}
          <div className='absolute inset-0'>
            <Image
              src='https://placehold.co/1920x800/07181E/AF9778?text=Paris+Marais+Street'
              alt='Le Marais, Paris'
              fill
              className='object-cover opacity-20'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80' />
          </div>

          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
              {/* Text content */}
              <motion.div
                variants={staggerContainer}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}>
                <motion.span
                  variants={fadeInUp}
                  className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-6 block'>
                  Rendez-vous
                </motion.span>
                <motion.h3
                  variants={fadeInUp}
                  className='text-4xl md:text-6xl font-title text-cream mb-8 leading-tight'>
                  Votre barbier
                  <br />
                  <span className='text-gold'>dans le Marais</span>
                </motion.h3>
                <motion.p
                  variants={fadeInUp}
                  className='text-cream/70 text-xl font-light mb-10 max-w-lg'>
                  Idéalement situé dans le{' '}
                  <strong className='text-gold font-normal'>3ᵉ arrondissement</strong>, nous vous
                  accueillons sur rendez-vous.
                </motion.p>
                <motion.div variants={fadeInUp} className='flex flex-wrap gap-4'>
                  <Button href='/reservation'>
                    Prendre Rendez-vous
                  </Button>
                  <Button href='/contact'>
                    Nous Contacter
                  </Button>
                </motion.div>
              </motion.div>

              {/* Location card */}
              <motion.div
                variants={scaleReveal}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='relative'>
                <div className='bg-navy-secondary/80 backdrop-blur-sm border border-gold/10 p-8 md:p-12'>
                  <div className='flex items-start gap-6 mb-8'>
                    <div className='w-12 h-12 border border-gold/30 flex items-center justify-center flex-shrink-0'>
                      <svg
                        className='w-5 h-5 text-gold'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.5'>
                        <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z' />
                        <circle cx='12' cy='9' r='2.5' />
                      </svg>
                    </div>
                    <div>
                      <h4 className='text-gold font-title text-2xl mb-2'>L'Instant Barbier</h4>
                      <p className='text-cream/60 font-light'>
                        Rue des Archives
                        <br />
                        75003 Paris, France
                      </p>
                    </div>
                  </div>
                  <div className='h-48 relative overflow-hidden border border-gold/10'>
                    <Image
                      src='https://placehold.co/600x300/142233/AF9778?text=Map+Placeholder'
                      alt='Carte'
                      fill
                      className='object-cover opacity-70'
                    />
                  </div>
                </div>
                {/* Decorative corner */}
                <div className='absolute -top-3 -right-3 w-12 h-12 border-t border-r border-gold/30' />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
