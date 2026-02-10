'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header, Footer, Section, Container } from '@/components'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { PLANITY_URL } from '@/lib/constants'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className='min-h-screen pt-20 grow flex items-center'>
        <Section className='w-full'>
          <Container>
            <motion.div
              variants={staggerContainer}
              initial='hidden'
              animate='visible'
              className='text-center max-w-2xl mx-auto'>
              <motion.p
                variants={fadeInUp}
                className='text-gold/60 font-body text-sm tracking-[0.3em] uppercase mb-6'>
                Erreur 404
              </motion.p>

              <motion.h1
                variants={fadeInUp}
                className='font-title text-5xl md:text-7xl text-gold mb-6'>
                Page introuvable
              </motion.h1>

              <motion.div variants={fadeInUp} className='w-24 h-px bg-gold/30 mx-auto mb-8' />

              <motion.p
                variants={fadeInUp}
                className='text-cream/70 text-lg md:text-xl font-body leading-relaxed mb-12'>
                La page que vous recherchez n&apos;existe pas ou a été déplacée.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                  href='/'
                  className='inline-flex items-center justify-center px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-navy transition-colors duration-300 text-sm tracking-wider uppercase'>
                  Retour à l&apos;accueil
                </Link>
                <Link
                  href={PLANITY_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center justify-center px-8 py-3 bg-gold text-navy hover:bg-gold/90 transition-colors duration-300 text-sm tracking-wider uppercase'>
                  Prendre rendez-vous
                </Link>
              </motion.div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
