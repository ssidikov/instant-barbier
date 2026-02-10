'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { PLANITY_URL } from '@/lib/constants'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT INFO CARD
// ═══════════════════════════════════════════════════════════════════════════

function ContactCard({
  icon,
  label,
  children,
  delay = 0,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <Reveal
      variant='fade-up'
      delay={delay}
      className='group relative bg-navy-secondary/40 backdrop-blur-sm border border-gold/10 p-8 hover:border-gold/30 transition-all duration-700'>
      {/* Corner accent */}
      <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />
      <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 group-hover:border-gold/50 group-hover:w-10 group-hover:h-10 transition-all duration-700' />

      {/* Icon */}
      <div className='w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold/60 transition-colors duration-500'>
        <span className='text-gold'>{icon}</span>
      </div>

      {/* Label */}
      <span className='text-gold/60 text-[10px] uppercase tracking-[0.3em] block mb-3'>
        {label}
      </span>

      {/* Content */}
      <div className='text-cream font-light leading-relaxed'>{children}</div>
    </Reveal>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// TRANSPORT LINE
// ═══════════════════════════════════════════════════════════════════════════

function TransportItem({
  icon,
  title,
  lines,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  lines: { label: string; detail: string }[]
  delay?: number
}) {
  return (
    <Reveal variant='fade-up' delay={delay} className='group'>
      <div className='flex items-start gap-5'>
        {/* Icon container */}
        <div className='w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:border-gold/50 transition-colors duration-500'>
          <span className='text-gold text-sm'>{icon}</span>
        </div>

        <div className='flex-1'>
          <h4 className='text-cream font-title text-lg mb-3'>{title}</h4>
          <div className='space-y-2'>
            {lines.map((line, i) => (
              <div key={i} className='flex items-baseline gap-3'>
                <span className='text-gold/60 text-sm font-light'>{line.label}</span>
                <span className='flex-1 border-b border-dotted border-gold/10' />
                <span className='text-cream/50 text-sm font-light'>{line.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function ContactPage() {
  return (
    <div className='bg-navy min-h-screen text-cream overflow-x-hidden selection:bg-gold selection:text-navy'>
      <main>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Clean, editorial opening
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative h-[65vh] md:h-[75vh] flex items-end overflow-hidden'>
          {/* Background */}
          <div className='absolute inset-0 z-0'>
            <Image
              src='/images/gallery/gallery-3.jpg'
              alt="Salon L'Instant Barbier — Paris Marais"
              fill
              className='object-cover'
              priority
            />
            <div className='absolute inset-0 bg-navy/70' />
            <div className='absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent' />
          </div>

          {/* Decorative lines */}
          <div className='absolute top-24 left-[12%] w-px h-[25vh] bg-gradient-to-b from-transparent via-gold to-transparent opacity-10' />
          <div className='absolute bottom-[35%] right-[8%] w-[15vw] h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-10' />

          {/* Hero content */}
          <div className='relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24'>
            <div className='max-w-7xl mx-auto'>
              <Reveal variant='fade-up'>
                <span className='inline-block text-gold/60 text-[10px] uppercase tracking-[0.5em] mb-6'>
                  Paris 3ᵉ — Le Marais
                </span>
                <h1 className='text-5xl md:text-7xl lg:text-[8rem] font-title text-gold leading-[0.9] tracking-tight mb-6'>
                  Nous
                  <br />
                  <span className='text-cream'>Trouver</span>
                </h1>
              </Reveal>

              <Reveal variant='fade-up' delay={0.2} className='max-w-lg'>
                <p className='text-cream/60 text-lg md:text-xl font-light leading-relaxed'>
                  Votre barbier et coiffeur homme au cœur du Marais. Accessible, élégant, à votre
                  écoute.
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
            CONTACT CARDS - Three main info blocks
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-24 md:py-32 relative'>
          {/* Floating bg orb */}
          <div className='absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full bg-gold/3 blur-3xl translate-x-1/4 pointer-events-none' />

          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10'>
            {/* Section header */}
            <div className='mb-16'>
              <Reveal variant='fade-up'>
                <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                  Informations
                </span>
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-title text-cream'>
                  Nous <span className='text-gold'>contacter</span>
                </h2>
              </Reveal>
            </div>

            {/* Cards grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              <ContactCard
                delay={0}
                label='Téléphone'
                icon={
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'>
                    <path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z' />
                  </svg>
                }>
                <a
                  href='tel:0145354722'
                  className='text-xl text-cream hover:text-gold transition-colors duration-300 font-title'>
                  01 45 35 47 22
                </a>
                <p className='text-cream/40 text-sm mt-2'>Du lundi au samedi</p>
              </ContactCard>

              <ContactCard
                delay={0.1}
                label='E-mail'
                icon={
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'>
                    <rect x='2' y='4' width='20' height='16' rx='2' />
                    <path d='M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7' />
                  </svg>
                }>
                <a
                  href='mailto:linstantbarbier@gmail.com'
                  className='text-cream hover:text-gold transition-colors duration-300 break-all'>
                  linstantbarbier@gmail.com
                </a>
                <p className='text-cream/40 text-sm mt-2'>Réponse sous 24h</p>
              </ContactCard>

              <ContactCard
                delay={0.2}
                label='Adresse'
                icon={
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'>
                    <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z' />
                    <circle cx='12' cy='9' r='2.5' />
                  </svg>
                }>
                <p className='text-cream'>
                  43, rue de Turenne
                  <br />
                  <span className='text-cream/60'>75003 Paris, France</span>
                </p>
                <a
                  href='https://maps.google.com/?q=43+rue+de+Turenne+75003+Paris'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-gold/70 text-sm mt-3 hover:text-gold transition-colors duration-300'>
                  Voir sur la carte
                  <svg
                    className='w-3.5 h-3.5'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'>
                    <path d='M7 17L17 7M17 7H7M17 7v10' />
                  </svg>
                </a>
              </ContactCard>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            MAP + ACCESS - Split layout with map and transport
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-16 md:py-32 bg-dark relative overflow-hidden'>
          {/* Background accent */}
          <div className='absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold/5 to-transparent' />

          <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8'>
              {/* Map side */}
              <div className='lg:col-span-7'>
                {/* Section header */}
                <Reveal variant='fade-up' className='mb-10'>
                  <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                    Localisation
                  </span>
                  <h3 className='text-3xl md:text-4xl lg:text-5xl font-title text-cream'>
                    Accès au <span className='text-gold'>salon</span>
                  </h3>
                </Reveal>

                {/* Map embed */}
                <Reveal
                  variant='scale-up'
                  delay={0.2}
                  className='relative overflow-hidden border border-gold/10 aspect-4/3'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.0!2d2.3625!3d48.8610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzM5LjYiTiAywrAyMScyNy4wIkU!5e0!3m2!1sfr!2sfr!4v1'
                    className='absolute inset-0 w-full h-full grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700'
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    title="L'Instant Barbier — 43 rue de Turenne, 75003 Paris"
                  />
                  {/* Overlay effect on map edges */}
                  <div className='absolute inset-0 pointer-events-none border border-gold/10' />
                  {/* Gold corner accents */}
                  <div className='absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-gold/30 pointer-events-none' />
                  <div className='absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-gold/30 pointer-events-none' />
                </Reveal>

                <Reveal variant='fade-up' delay={0.3}>
                  <p className='text-cream/40 text-sm mt-4 font-light'>
                    Situé dans le 3ᵉ arrondissement, facilement accessible depuis tout Paris.
                  </p>
                </Reveal>
              </div>

              {/* Transport side */}
              <div className='lg:col-span-5 lg:pl-4'>
                <Reveal variant='fade-up' className='mb-10'>
                  <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                    Comment venir
                  </span>
                  <h3 className='text-2xl md:text-3xl font-title text-cream'>
                    Transports <span className='text-gold'>&amp;</span> accès
                  </h3>
                </Reveal>

                <div className='space-y-8'>
                  <TransportItem
                    delay={0.1}
                    icon={
                      <svg
                        className='w-4 h-4'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.5'>
                        <rect x='4' y='3' width='16' height='18' rx='2' />
                        <path d='M9 21v-3h6v3' />
                        <circle cx='9' cy='15' r='1' fill='currentColor' />
                        <circle cx='15' cy='15' r='1' fill='currentColor' />
                        <path d='M8 7h8M8 10h8' />
                      </svg>
                    }
                    title='Métro'
                    lines={[
                      { label: 'Ligne 1', detail: 'Saint-Paul — 7 min' },
                      { label: 'Ligne 8', detail: 'Chemin Vert — 5 min' },
                      { label: 'Ligne 11', detail: 'Rambuteau — 10 min' },
                    ]}
                  />

                  <Reveal variant='fade-up' delay={0.15} className='w-full h-px bg-gold/10' />

                  <TransportItem
                    delay={0.2}
                    icon={
                      <svg
                        className='w-4 h-4'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.5'>
                        <rect x='3' y='6' width='18' height='12' rx='2' />
                        <circle cx='7' cy='18' r='2' />
                        <circle cx='17' cy='18' r='2' />
                        <path d='M3 12h18' />
                      </svg>
                    }
                    title='Bus'
                    lines={[{ label: 'Lignes 29 & 96', detail: 'Arrêt Rue de Turenne' }]}
                  />

                  <Reveal variant='fade-up' delay={0.25} className='w-full h-px bg-gold/10' />

                  <TransportItem
                    delay={0.3}
                    icon={
                      <svg
                        className='w-4 h-4'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.5'>
                        <circle cx='12' cy='12' r='10' />
                        <circle cx='12' cy='12' r='3' />
                        <path d='M12 2v3M12 19v3M2 12h3M19 12h3' />
                      </svg>
                    }
                    title="Vélib'"
                    lines={[{ label: 'Station n°3103', detail: 'Rue des Francs-Bourgeois' }]}
                  />

                  <Reveal variant='fade-up' delay={0.35} className='w-full h-px bg-gold/10' />

                  <TransportItem
                    delay={0.4}
                    icon={
                      <svg
                        className='w-4 h-4'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.5'>
                        <rect x='1' y='6' width='15' height='10' rx='2' />
                        <path d='M16 8h2.5a2.5 2.5 0 012.5 2.5v3.5a2 2 0 01-2 2H16V8z' />
                        <circle cx='6' cy='18' r='2' />
                        <circle cx='18' cy='18' r='2' />
                      </svg>
                    }
                    title='Parking'
                    lines={[{ label: 'Bastille Saint-Antoine', detail: '~10 min à pied' }]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRESENTATION TEXT - Asymmetric editorial
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-24 md:py-40 relative'>
          <div className='absolute top-0 right-0 w-1/3 h-full bg-navy-secondary/15 -skew-x-12 origin-top-right' />

          <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8'>
              {/* Left - Statement */}
              <div className='lg:col-span-6'>
                <Reveal variant='fade-side'>
                  <span className='text-gold text-7xl md:text-8xl font-serif leading-none opacity-15 block mb-4'>
                    &ldquo;
                  </span>
                  <h2 className='text-3xl md:text-4xl lg:text-5xl font-title text-cream leading-[1.1] -mt-14'>
                    Votre barbier
                    <span className='block text-gold mt-2'>dans le Marais</span>
                  </h2>
                </Reveal>
              </div>

              {/* Right - Description */}
              <div className='lg:col-span-6 lg:pt-16'>
                <Reveal variant='fade-side' delay={0.2}>
                  <p className='text-lg md:text-xl text-cream/60 font-light leading-relaxed mb-6'>
                    Que vous recherchiez un{' '}
                    <strong className='text-gold font-normal'>barbier à Paris</strong>, un coiffeur
                    homme dans le Marais, ou un salon offrant une expérience soignée et élégante,
                    notre équipe est à votre disposition.
                  </p>
                  <p className='text-base text-cream/45 font-light leading-relaxed'>
                    Nous vous accompagnons et répondons à vos questions concernant nos prestations
                    de coiffure, de barbe et de soins.
                  </p>
                  <div className='mt-8 flex items-center gap-4'>
                    <div className='w-12 h-px bg-gold/40' />
                    <span className='text-gold/50 text-xs uppercase tracking-widest'>
                      À votre écoute
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CONTACT FORM SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='py-24 md:py-32 bg-dark relative'>
          <div className='max-w-3xl mx-auto px-6 md:px-12 relative z-10'>
            <div className='mb-16 text-center'>
              <Reveal variant='fade-up'>
                <span className='text-gold/60 text-xs uppercase tracking-[0.3em] mb-4 block'>
                  Une question ?
                </span>
                <h2 className='text-3xl md:text-5xl font-title text-cream'>
                  Envoyez-nous un <span className='text-gold'>message</span>
                </h2>
              </Reveal>
            </div>

            <Reveal variant='fade-up' delay={0.2}>
              <ContactForm />
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CTA - Full-width cinematic closing
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative py-32 md:py-48 overflow-hidden'>
          {/* Background */}
          <div className='absolute inset-0'>
            <Image
              src='/images/gallery/gallery-1.jpg'
              alt=''
              fill
              className='object-cover opacity-10'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/90' />
          </div>

          {/* Large decorative ampersand */}
          <div className='absolute top-1/2 right-[8%] -translate-y-1/2 text-[20rem] font-title text-gold select-none pointer-events-none leading-none opacity-[0.06]'>
            &amp;
          </div>

          <div className='max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center'>
            <Reveal variant='fade-up' className='mb-8'>
              <div className='w-16 h-px bg-gold/40 mx-auto mb-8' />
              <span className='text-gold/60 text-xs uppercase tracking-[0.4em]'>Rendez-vous</span>
            </Reveal>

            <Reveal variant='fade-up' delay={0.1}>
              <h3 className='text-3xl md:text-5xl lg:text-6xl font-title text-cream leading-[1.15] mb-8'>
                Prêt pour une expérience <span className='text-gold'>sur mesure</span> ?
              </h3>
            </Reveal>

            <Reveal variant='fade-up' delay={0.2}>
              <p className='text-cream/50 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-12'>
                N'hésitez pas à nous contacter ou à réserver votre rendez-vous directement en ligne.
                Nous vous accueillons avec plaisir.
              </p>
            </Reveal>

            <Reveal variant='fade-up' delay={0.3} className='flex flex-wrap justify-center gap-5'>
              <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
              <a
                href='tel:0145354722'
                className='group relative inline-flex items-center gap-3 px-8 py-4 border border-gold/30 hover:border-gold/60 transition-all duration-500'>
                <svg
                  className='w-4 h-4 text-gold'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'>
                  <path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z' />
                </svg>
                <span className='text-gold text-xs uppercase tracking-[0.2em] font-semibold'>
                  Appeler le salon
                </span>
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
