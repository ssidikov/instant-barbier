import Container from '@/components/Container'
import Section from '@/components/Section'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen pt-20 grow'>
        <Section>
          <Container>
            <h1>Contact</h1>
            <p className='mt-8'>Nous trouver, nous contacter.</p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
