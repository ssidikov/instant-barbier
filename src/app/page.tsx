import Container from '@/components/Container'
import Section from '@/components/Section'
import Button from '@/components/Button'

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[url('/bg-hero.jpg')] bg-cover bg-center">
        <div className='absolute inset-0 bg-navy/70' /> {/* Overlay */}
        <div className='relative z-10 text-center space-y-6 max-w-4xl mx-auto px-6'>
          <h1 className='text-5xl md:text-7xl font-title text-gold'> L&apos;Art du Barbier</h1>
          <p className='text-lg md:text-xl text-cream/90 max-w-2xl mx-auto'>
            Une expérience unique, entre tradition et modernité.
          </p>
          <div className='pt-8'>
            <Button href='https://www.planity.com/linstant-barbier'>Prendre rendez-vous</Button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <Section className='bg-navy'>
        <Container>
          <div className='text-center max-w-3xl mx-auto space-y-8'>
            <h2 className='text-3xl md:text-4xl'>Bienvenue au Salon</h2>
            <p className='text-lg'>
              Situé au cœur de la ville, L'Instant Barbier vous accueille dans un cadre chaleureux
              et élégant. Profitez d'un moment de détente absolu entre les mains de nos experts.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  )
}
