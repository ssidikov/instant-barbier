import Container from '@/components/Container'
import Section from '@/components/Section'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrestationsPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen pt-20 grow'>
        <Section>
          <Container>
            <h1>Nos Prestations</h1>
            <p className='mt-8'>Coupe, Barbe, Soins Visage...</p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
