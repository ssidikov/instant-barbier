import Container from '@/components/Container'
import Section from '@/components/Section'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function GaleriePage() {
  return (
    <>
      <Header />
      <main className='min-h-screen pt-20 grow'>
        <Section>
          <Container>
            <h1>Galerie</h1>
            <p className='mt-8'>Quelques réalisations...</p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
