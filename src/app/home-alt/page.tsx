'use client'

import Container from '@/components/Container'
import Section from '@/components/Section'
import ButtonAlt from '@/components/ButtonAlt'
import HeaderGlass from '@/components/HeaderGlass'
import Footer from '@/components/Footer'
import { PLANITY_URL } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ═══════════════════════════════════════════════════════════════════════════
// DATA - Données du site
// ═══════════════════════════════════════════════════════════════════════════

const services = [
  {
    icon: (
      <svg
        className='w-12 h-12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'>
        <path
          d='M6 3v18M18 3v18M6 12h12M9 6h6M9 18h6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    title: 'Coupes',
    description:
      'Coupes précises et adaptées à votre style. Un travail sur-mesure pour révéler votre caractère.',
    price: 'à partir de 25€',
  },
  {
    icon: (
      <svg
        className='w-12 h-12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'>
        <path
          d='M7 8c0-2.21 1.79-4 4-4s4 1.79 4 4v2c0 2.21-1.79 4-4 4s-4-1.79-4-4V8z'
          strokeLinecap='round'
        />
        <path d='M5 22c0-3.87 3.13-7 7-7s7 3.13 7 7' strokeLinecap='round' />
        <path d='M15 8h4M15 12h3' strokeLinecap='round' />
      </svg>
    ),
    title: 'Barbe & Rasage',
    description:
      'Rasage traditionnel au blaireau et serviettes chaudes. Taille et sculpture par nos experts.',
    price: 'à partir de 20€',
  },
  {
    icon: (
      <svg
        className='w-12 h-12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'>
        <circle cx='12' cy='12' r='3' />
        <path
          d='M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83'
          strokeLinecap='round'
        />
      </svg>
    ),
    title: 'Soins',
    description:
      'Soins du visage, gommages et masques pour une peau revitalisée et éclatante de santé.',
    price: 'à partir de 30€',
  },
  {
    icon: (
      <svg
        className='w-12 h-12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'>
        <path
          d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    title: 'Forfaits',
    description: 'Combinaisons coupe + barbe pour un service complet et un résultat harmonieux.',
    price: 'à partir de 40€',
  },
]

const team = [
  {
    name: 'RICCARDO',
    role: 'Coiffeur-barbier et directeur artistique',
    experience: '23 ans',
    image: '/images/team/Riccardo.avif',
    specialty: 'Français, Arabe, Italien, Anglais',
  },
]

const galleryImages = [
  { src: '/images/gallery/gallery-1.jpg', alt: 'Coupe moderne', category: 'Coupe' },
  { src: '/images/gallery/gallery-2.jpg', alt: 'Rasage traditionnel', category: 'Rasage' },
  { src: '/images/gallery/gallery-3.jpg', alt: 'Taille de barbe', category: 'Barbe' },
  { src: '/images/gallery/gallery-4.jpg', alt: 'Ambiance du salon', category: 'Salon' },
  { src: '/images/gallery/gallery-5.jpg', alt: 'Détail coupe', category: 'Coupe' },
  { src: '/images/gallery/gallery-6.jpg', alt: 'Finitions', category: 'Finitions' },
]

const reviews = [
  {
    text: "Ambiance géniale et service impeccable. Les barbiers sont attentifs et prennent le temps de comprendre ce que l'on souhaite.",
    author: 'Jean-Pierre D.',
    rating: 5,
    date: 'Il y a 2 semaines',
  },
  {
    text: "Je me suis senti accueilli dès mon arrivée. Coupe parfaite, rasage traditionnel d'exception. Un vrai moment de détente.",
    author: 'Antoine L.',
    rating: 5,
    date: 'Il y a 1 mois',
  },
  {
    text: 'Une expérience incroyable à chaque visite. Des barbiers qualifiés et un cadre raffiné. Le souci du détail est remarquable.',
    author: 'Charles M.',
    rating: 5,
    date: 'Il y a 3 semaines',
  },
]

const hours = [
  { day: 'Lundi', hours: 'Fermé', isClosed: true },
  { day: 'Mardi', hours: '10h – 20h', isClosed: false },
  { day: 'Mercredi', hours: '10h – 20h', isClosed: false },
  { day: 'Jeudi', hours: '10h – 21h', isClosed: false },
  { day: 'Vendredi', hours: '10h – 21h', isClosed: false },
  { day: 'Samedi', hours: '09h – 19h', isClosed: false },
  { day: 'Dimanche', hours: 'Fermé', isClosed: true },
]

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANTS UI PREMIUM
// ═══════════════════════════════════════════════════════════════════════════

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  light?: boolean
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-16 ${alignClass}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-4 mb-6 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className={`h-px w-8 ${light ? 'bg-gold/60' : 'bg-gold'}`} />
          <span className='text-gold text-xs font-medium uppercase tracking-[0.25em]'>
            {eyebrow}
          </span>
          <span className={`h-px w-8 ${light ? 'bg-gold/60' : 'bg-gold'}`} />
        </div>
      )}
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-title leading-tight ${light ? 'text-cream' : 'text-navy'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-6 text-lg leading-relaxed ${light ? 'text-cream/70' : 'text-navy/60'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'md' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <div className='flex gap-0.5'>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${sizeClass} ${i < rating ? 'text-gold' : 'text-navy/20'}`}
          fill='currentColor'
          viewBox='0 0 20 20'>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}
    </div>
  )
}

function FeatureIcon() {
  return (
    <div className='w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0'>
      <svg
        className='w-3.5 h-3.5 text-gold'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        strokeWidth='2.5'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE - REDESIGN PREMIUM CRÈME/BLEU/DORÉ
// ═══════════════════════════════════════════════════════════════════════════

export default function HomeAlt() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  // Animation refs
  const heroRef = useRef<HTMLElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubtitleRef = useRef<HTMLDivElement>(null)
  const heroDescriptionRef = useRef<HTMLParagraphElement>(null)
  const heroCtaRef = useRef<HTMLDivElement>(null)
  const parallaxImgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero entrance animation - simplified and elegant
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(heroSubtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
    })
      .from(
        heroTitleRef.current?.children || [],
        {
          y: 80,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
        },
        '-=0.4',
      )
      .from(
        heroDescriptionRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.5',
      )
      .from(
        heroCtaRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.4',
      )

    // Subtle parallax for background
    if (parallaxImgRef.current) {
      gsap.to(parallaxImgRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

    // Scroll-triggered animations for sections
    gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
      gsap.from(element as Element, {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element as Element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <>
      <HeaderGlass />

      <main className='grow bg-cream'>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Premium Minimal
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className='lg:pr-148 relative min-h-screen flex items-center overflow-hidden'>
          {/* Background Image */}
          <div className='absolute inset-0'>
            <div ref={parallaxImgRef} className='absolute inset-0 scale-105'>
              <Image
                src='/images/hero-barbershop.jpg'
                alt="L'Instant Barbier"
                fill
                className='object-cover object-center'
                priority
              />
              {/* Elegant gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-r from-cream via-cream/85 to-cream/40' />
              <div className='absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream' />
            </div>
          </div>

          {/* Subtle decorative line */}
          <div className='absolute left-12 md:left-20 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent' />

          {/* Content */}
          <Container className='relative z-10 pt-24'>
            <div className='max-w-2xl'>
              {/* Eyebrow */}
              <div ref={heroSubtitleRef} className='flex items-center gap-4 mb-8'>
                <span className='h-px w-12 bg-gold' />
                <p className='text-gold text-sm font-medium uppercase tracking-[0.3em]'>
                  Barbier Paris
                </p>
              </div>

              {/* Title */}
              <h1
                ref={heroTitleRef}
                className='text-5xl md:text-7xl lg:text-8xl font-title text-navy leading-[0.9] mb-8'>
                <span className='block'>L&apos;Instant</span>
                <span className='block mt-2'>
                  <span className='text-gold'>Barbier</span>
                </span>
              </h1>

              {/* Description */}
              <p
                ref={heroDescriptionRef}
                className='text-xl md:text-2xl text-navy/70 max-w-lg leading-relaxed mb-10'>
                L&apos;excellence du grooming masculin au cœur du Marais. Un savoir-faire
                traditionnel dans un cadre d&apos;exception.
              </p>

              {/* CTA */}
              <div ref={heroCtaRef} className='flex flex-wrap items-center gap-6'>
                <ButtonAlt href={PLANITY_URL}>Prendre rendez-vous</ButtonAlt>
                <Link
                  href='/prestations'
                  className='text-navy text-sm uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-2 group'>
                  Nos prestations
                  <svg
                    className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            À PROPOS - Elegant Two Column
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='a-propos' className='bg-cream'>
          <Container>
            <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
              {/* Image Side */}
              <div className='relative animate-on-scroll'>
                <div className='relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-navy/10'>
                  <Image
                    src='/images/about-barbershop.jpg'
                    alt='Notre salon'
                    fill
                    className='object-cover'
                  />
                </div>
                {/* Floating accent card - Gold background */}
                <div className='absolute -bottom-8 -right-8 bg-gold text-navy p-8 shadow-xl'>
                  <span className='block text-5xl font-title text-navy'>15+</span>
                  <span className='text-sm uppercase tracking-wider text-navy/80'>
                    ans d&apos;expérience
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className='space-y-8 animate-on-scroll'>
                <SectionHeader
                  eyebrow='Notre histoire'
                  title="L'Art du Barbier Parisien"
                  align='left'
                />

                <div className='space-y-6 text-navy/70 text-lg leading-relaxed -mt-8'>
                  <p className='text-navy/70'>
                    Niché au cœur du Marais, L&apos;Instant Barbier est un sanctuaire dédié à
                    l&apos;homme moderne. Dans un cadre sobre et raffiné, nos maîtres barbiers
                    perpétuent un savoir-faire d&apos;exception.
                  </p>
                  <p className='text-navy/70'>
                    Notre approche allie techniques traditionnelles du rasage à l&apos;ancienne et
                    tendances contemporaines, pour un résultat unique.
                  </p>
                </div>

                {/* Features */}
                <div className='grid grid-cols-2 gap-4 pt-4'>
                  {['Produits Premium', 'Maîtres Barbiers', 'Cadre Élégant', 'Sur Rendez-vous'].map(
                    (feature) => (
                      <div key={feature} className='flex items-center gap-3'>
                        <FeatureIcon />
                        <span className='text-navy text-sm'>{feature}</span>
                      </div>
                    ),
                  )}
                </div>

                <Link
                  href='/salon'
                  className='inline-flex items-center gap-3 text-navy text-sm uppercase tracking-widest hover:text-gold transition-colors group pt-4'>
                  Découvrir le salon
                  <svg
                    className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            SERVICES - Card Grid with Prices
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='services' className='bg-white'>
          <Container>
            <SectionHeader
              eyebrow='Nos Services'
              title='Prestations'
              description='Des soins personnalisés pour révéler votre style et sublimer votre apparence.'
            />

            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll'>
              {services.map((service, index) => (
                <article
                  key={index}
                  className='group relative p-8 bg-cream/50 hover:bg-cream border border-navy/5 hover:border-gold/30 transition-all duration-500 hover:shadow-xl hover:shadow-gold/5'>
                  {/* Icon */}
                  <div className='text-gold/70 group-hover:text-gold transition-colors duration-300 mb-6'>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className='text-xl font-title text-navy mb-3'>{service.title}</h3>

                  {/* Description */}
                  <p className='text-navy/60 text-sm leading-relaxed mb-6'>{service.description}</p>

                  {/* Price */}
                  <p className='text-gold text-sm font-medium'>{service.price}</p>

                  {/* Hover accent */}
                  <div className='absolute bottom-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left' />
                </article>
              ))}
            </div>

            <div className='text-center mt-14 animate-on-scroll'>
              <ButtonAlt href='/prestations'>Voir tous les tarifs</ButtonAlt>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            PARALLAX BREAK - Quote
        ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative h-[60vh] md:h-[70vh] overflow-hidden'>
          <div className='absolute inset-0'>
            <Image
              src='/images/salon-interior-1.jpg'
              alt='Intérieur du salon'
              fill
              className='object-cover'
            />
            <div className='absolute inset-0 bg-navy/70' />
          </div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center max-w-3xl px-6'>
              <span className='text-gold text-6xl font-title'>&ldquo;</span>
              <blockquote className='text-2xl md:text-4xl font-title text-cream leading-relaxed mt-4'>
                Le détail fait la perfection, et la perfection n&apos;est pas un détail.
              </blockquote>
              <cite className='block mt-8 text-gold/80 text-sm uppercase tracking-widest not-italic'>
                — Notre philosophie
              </cite>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ÉQUIPE - Clean Cards
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='equipe' className='bg-cream'>
          <Container>
            <SectionHeader
              eyebrow="L'Équipe"
              title='Nos Experts'
              description='Des professionnels passionnés à votre service.'
            />

            <div className='grid md:grid-cols-3 gap-8 animate-on-scroll'>
              {team.map((member, index) => (
                <article key={index} className='group'>
                  {/* Image */}
                  <div className='relative aspect-[3/4] overflow-hidden mb-6 bg-navy/5'>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className='object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                    {/* Hover info */}
                    <div className='absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                      <span className='inline-block bg-gold text-navy text-xs px-3 py-1 uppercase tracking-wider'>
                        {member.specialty}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className='text-center'>
                    <h3 className='text-2xl font-title text-navy mb-1'>{member.name}</h3>
                    <p className='text-navy/60 text-sm mb-2'>{member.role}</p>
                    <p className='text-gold text-xs uppercase tracking-wider'>
                      {member.experience} d&apos;expérience
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            GALERIE - Masonry Grid
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='galerie' className='bg-white'>
          <Container>
            <SectionHeader
              eyebrow='Portfolio'
              title='Notre Galerie'
              description='Un aperçu de notre travail et de notre savoir-faire.'
            />

            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 animate-on-scroll'>
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden cursor-pointer ${
                    index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                  }`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors duration-500' />

                  {/* Hover Label */}
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                    <span className='text-cream text-sm uppercase tracking-widest bg-gold/90 px-4 py-2'>
                      {image.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className='text-center mt-12'>
              <Link
                href='/galerie'
                className='inline-flex items-center gap-3 text-navy text-sm uppercase tracking-widest hover:text-gold transition-colors group'>
                Voir toute la galerie
                <svg
                  className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </Link>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            AVIS CLIENTS - Testimonial Cards
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='avis' className='bg-cream'>
          <Container>
            <SectionHeader eyebrow='Témoignages' title='Ce que disent nos clients' />

            <div className='grid md:grid-cols-3 gap-8 animate-on-scroll'>
              {reviews.map((review, index) => (
                <article
                  key={index}
                  className='bg-white p-8 shadow-lg shadow-navy/5 border border-navy/5 relative'>
                  {/* Stars */}
                  <StarRating rating={review.rating} size='md' />

                  {/* Quote */}
                  <p className='text-navy/70 leading-relaxed mt-6 mb-8'>
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 rounded-full bg-navy flex items-center justify-center'>
                        <span className='text-gold text-lg font-title'>
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className='text-navy font-medium'>{review.author}</p>
                        <p className='text-navy/40 text-xs'>{review.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative accent */}
                  <div className='absolute top-0 left-8 w-16 h-1 bg-gold' />
                </article>
              ))}
            </div>

            {/* Trust badges */}
            <div className='flex flex-wrap items-center justify-center gap-8 mt-16 pt-12 border-t border-navy/10'>
              <div className='text-center'>
                <span className='block text-4xl font-title text-navy'>4.9</span>
                <span className='text-xs text-navy/50 uppercase tracking-wider'>Note Google</span>
              </div>
              <div className='w-px h-12 bg-navy/10' />
              <div className='text-center'>
                <span className='block text-4xl font-title text-navy'>2000+</span>
                <span className='text-xs text-navy/50 uppercase tracking-wider'>Clients</span>
              </div>
              <div className='w-px h-12 bg-navy/10' />
              <div className='text-center'>
                <span className='block text-4xl font-title text-navy'>98%</span>
                <span className='text-xs text-navy/50 uppercase tracking-wider'>Satisfaction</span>
              </div>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            HORAIRES & LOCALISATION - Two Column
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='horaires' className='bg-navy'>
          <Container>
            <div className='grid lg:grid-cols-2 gap-16 items-start'>
              {/* Hours */}
              <div className='animate-on-scroll'>
                <SectionHeader
                  eyebrow='Disponibilités'
                  title="Horaires d'Ouverture"
                  align='left'
                  light
                />

                <div className='space-y-0 -mt-6'>
                  {hours.map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center py-4 border-b border-cream/10 ${
                        item.isClosed ? 'opacity-40' : ''
                      }`}>
                      <span className='text-cream'>{item.day}</span>
                      <span className={item.isClosed ? 'text-cream/50' : 'text-gold'}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <div className='mt-10'>
                  <ButtonAlt href={PLANITY_URL}>Réserver maintenant</ButtonAlt>
                </div>
              </div>

              {/* Location Card */}
              <div className='animate-on-scroll'>
                <div className='relative aspect-[4/3] overflow-hidden mb-8'>
                  <Image
                    src='/images/salon-interior-2.jpg'
                    alt='Notre salon'
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent' />

                  {/* Location overlay */}
                  <div className='absolute bottom-0 left-0 right-0 p-8'>
                    <p className='text-gold text-xs uppercase tracking-widest mb-2'>Adresse</p>
                    <p className='text-cream text-xl font-title'>43 rue de Turenne</p>
                    <p className='text-cream/80'>75003 Paris — Le Marais</p>
                  </div>
                </div>

                {/* Contact info */}
                <div className='grid grid-cols-2 gap-6'>
                  <div className='p-6 border border-cream/10'>
                    <p className='text-gold text-xs uppercase tracking-widest mb-2'>Téléphone</p>
                    <p className='text-cream'>01 42 72 00 00</p>
                  </div>
                  <div className='p-6 border border-cream/10'>
                    <p className='text-gold text-xs uppercase tracking-widest mb-2'>Email</p>
                    <p className='text-cream text-sm'>contact@linstant-barbier.fr</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            CONTACT FORM - Clean & Simple
        ═══════════════════════════════════════════════════════════════════ */}
        <Section id='contact' className='bg-cream'>
          <Container>
            <div className='max-w-2xl mx-auto'>
              <SectionHeader
                eyebrow='Contact'
                title='Une question ?'
                description='Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.'
              />

              <form onSubmit={handleSubmit} className='space-y-6 animate-on-scroll'>
                <div className='grid sm:grid-cols-2 gap-6'>
                  <input
                    type='text'
                    placeholder='Votre nom'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className='w-full bg-white border border-navy/10 text-navy px-5 py-4 placeholder:text-navy/40 focus:border-gold focus:outline-none transition-colors'
                  />
                  <input
                    type='tel'
                    placeholder='Téléphone'
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className='w-full bg-white border border-navy/10 text-navy px-5 py-4 placeholder:text-navy/40 focus:border-gold focus:outline-none transition-colors'
                  />
                </div>

                <input
                  type='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='w-full bg-white border border-navy/10 text-navy px-5 py-4 placeholder:text-navy/40 focus:border-gold focus:outline-none transition-colors'
                />

                <textarea
                  placeholder='Votre message'
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className='w-full bg-white border border-navy/10 text-navy px-5 py-4 placeholder:text-navy/40 focus:border-gold focus:outline-none transition-colors resize-none'
                />

                <button
                  type='submit'
                  className='w-full bg-navy text-cream py-4 uppercase tracking-widest text-sm font-medium hover:bg-gold hover:text-navy transition-all duration-300'>
                  Envoyer
                </button>
              </form>
            </div>
          </Container>
        </Section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRE-FOOTER CTA BAR
        ═══════════════════════════════════════════════════════════════════ */}
        <section className='bg-navy py-16'>
          <Container>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              {/* Logo & tagline */}
              <div className='flex items-center gap-4'>
                <Image
                  src='/logo/logo-golden.svg'
                  alt="L'Instant Barbier"
                  width={50}
                  height={50}
                  className='h-12 w-12 object-contain'
                />
                <div>
                  <span className='font-title text-gold text-xl'>L&apos;Instant Barbier</span>
                  <p className='text-cream/50 text-xs'>Le Marais, Paris</p>
                </div>
              </div>

              {/* Quick contact */}
              <div className='flex flex-wrap items-center gap-8 text-cream/80 text-sm'>
                <span>43 rue de Turenne, 75003</span>
                <span className='text-gold'>|</span>
                <span>01 42 72 00 00</span>
              </div>

              {/* Social */}
              <div className='flex items-center gap-3'>
                {['instagram', 'facebook'].map((social) => (
                  <a
                    key={social}
                    href='#'
                    className='w-10 h-10 border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-cream/60'>
                    {social === 'instagram' ? (
                      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                      </svg>
                    ) : (
                      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
