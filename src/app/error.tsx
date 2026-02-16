'use client'

import { Header, Footer, Section, Container } from '@/components'

export default function GlobalError({
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
            <div className='text-center max-w-2xl mx-auto'>
              <p className='text-gold/60 font-body text-sm tracking-[0.3em] uppercase mb-6'>
                Erreur
              </p>

              <h1 className='font-title text-5xl md:text-7xl text-gold mb-6'>
                Une erreur est survenue
              </h1>

              <div className='w-24 h-px bg-gold/30 mx-auto mb-8' />

              <p className='text-cream/70 text-lg md:text-xl font-body leading-relaxed mb-12'>
                Nous nous excusons pour la gêne occasionnée. Veuillez réessayer.
              </p>

              <div>
                <button
                  onClick={reset}
                  className='inline-flex items-center justify-center px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-navy transition-colors duration-300 text-sm tracking-wider uppercase cursor-pointer'>
                  Réessayer
                </button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
