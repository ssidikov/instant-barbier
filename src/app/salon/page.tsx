import Container from '@/components/Container'
import Section from '@/components/Section'

export default function SalonPage() {
  return (
    <main className='min-h-screen pt-20'>
      {' '}
      {/* pt-20 to account for fixed header */}
      <Section>
        <Container>
          <h1>Le Salon</h1>
          <p className='mt-8'>Découvrez notre espace dédié à l&apos;homme.</p>
        </Container>
      </Section>
    </main>
  )
}
