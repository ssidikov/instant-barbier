'use client'

import { motion } from 'framer-motion'
import { Header, Footer, Section, Container } from '@/components'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
                Erreur
              </motion.p>

              <motion.h1
                variants={fadeInUp}
                className='font-title text-5xl md:text-7xl text-gold mb-6'>
                Une erreur est survenue
              </motion.h1>

              <motion.div variants={fadeInUp} className='w-24 h-px bg-gold/30 mx-auto mb-8' />

              <motion.p
                variants={fadeInUp}
                className='text-cream/70 text-lg md:text-xl font-body leading-relaxed mb-12'>
                Nous nous excusons pour la gêne occasionnée. Veuillez réessayer.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <button
                  onClick={reset}
                  className='inline-flex items-center justify-center px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-navy transition-colors duration-300 text-sm tracking-wider uppercase cursor-pointer'>
                  Réessayer
                </button>
              </motion.div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
