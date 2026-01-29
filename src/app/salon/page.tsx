import Container from '@/components/Container'
import Section from '@/components/Section'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SalonPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen pt-20 grow'>
        <Section>
          <Container>
            <h1>Le Salon</h1>
            <p className='mt-8'>Découvrez notre espace dédié à l&apos;homme.</p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
