import Container from '@/components/Container'
import Section from '@/components/Section'
import Button from '@/components/Button'
import { PLANITY_URL } from '@/lib/constants'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION — Plein écran, image sombre élégante
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center bg-[url('/images/hero-barbershop.jpg')] bg-cover bg-center">
        {/* Overlay sombre */}
        <div className='absolute inset-0 bg-navy/80' />

        <div className='relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6'>
          {/* Logo / Nom du salon */}
          <p className='text-gold uppercase tracking-[0.4em] text-sm md:text-base font-light'>
            Paris III<sup>e</sup> — Le Marais
          </p>

          <h1 className='text-5xl md:text-7xl lg:text-8xl font-title text-gold leading-tight'>
            L&apos;Instant Barbier
          </h1>

          <p className='text-lg md:text-xl text-cream/90 max-w-2xl mx-auto font-light leading-relaxed'>
            Barbier & Coiffeur Homme à Paris.
            <br className='hidden md:block' />
            L&apos;excellence du grooming masculin, dans un cadre d&apos;exception.
          </p>

          <div className='pt-6'>
            <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce'>
          <div className='w-px h-16 bg-gradient-to-b from-gold/60 to-transparent' />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRÉSENTATION — Le salon, son positionnement
      ═══════════════════════════════════════════════════════════════════ */}
      <Section className='bg-navy'>
        <Container>
          <div className='max-w-4xl mx-auto text-center space-y-10'>
            {/* Séparateur décoratif */}
            <div className='flex items-center justify-center gap-4'>
              <span className='w-12 h-px bg-gold/40' />
              <span className='text-gold text-xs uppercase tracking-[0.3em]'>Bienvenue</span>
              <span className='w-12 h-px bg-gold/40' />
            </div>

            <h2 className='text-3xl md:text-5xl font-title text-gold'>
              L&apos;Art du Barbier Parisien
            </h2>

            <div className='space-y-6 text-cream/85 text-lg leading-relaxed max-w-3xl mx-auto'>
              <p>
                Niché au cœur du Marais, L&apos;Instant Barbier est un sanctuaire dédié à l&apos;homme
                moderne. Dans un cadre sobre et raffiné, nos maîtres barbiers perpétuent un savoir-faire
                d&apos;exception, alliant techniques traditionnelles et tendances contemporaines.
              </p>
              <p>
                Chaque visite est une parenthèse hors du temps — un moment de calme et d&apos;attention
                où votre style prend forme sous les mains expertes de nos artisans.
              </p>
            </div>

            <Link
              href='/salon'
              className='inline-block text-gold text-sm uppercase tracking-widest hover:text-cream transition-colors'>
              Découvrir le salon →
            </Link>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRESTATIONS — 3 blocs : Cheveux / Barbe / Soins
      ═══════════════════════════════════════════════════════════════════ */}
      <Section className='bg-navy border-t border-gold/10'>
        <Container>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-5xl font-title text-gold'>Nos Prestations</h2>
            <p className='mt-4 text-cream/70 max-w-xl mx-auto'>
              Un savoir-faire complet pour sublimer votre style.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 lg:gap-12'>
            {/* Cheveux */}
            <article className='group border border-gold/20 p-8 lg:p-10 text-center hover:border-gold/50 transition-colors'>
              <div className='text-gold text-4xl mb-6'>✂</div>
              <h3 className='text-2xl font-title text-gold mb-4'>Cheveux</h3>
              <p className='text-cream/75 text-sm leading-relaxed mb-6'>
                Coupes sur-mesure, dégradés précis et finitions impeccables.
                Chaque coupe est pensée pour révéler votre personnalité.
              </p>
              <Link
                href='/prestations#cheveux'
                className='text-gold text-xs uppercase tracking-widest hover:text-cream transition-colors'>
                En savoir plus
              </Link>
            </article>

            {/* Barbe */}
            <article className='group border border-gold/20 p-8 lg:p-10 text-center hover:border-gold/50 transition-colors'>
              <div className='text-gold text-4xl mb-6'>𐂂</div>
              <h3 className='text-2xl font-title text-gold mb-4'>Barbe</h3>
              <p className='text-cream/75 text-sm leading-relaxed mb-6'>
                Taille, sculpture et rasage traditionnel. Maîtrisez votre barbe
                avec l&apos;art du barbier à l&apos;ancienne.
              </p>
              <Link
                href='/prestations#barbe'
                className='text-gold text-xs uppercase tracking-widest hover:text-cream transition-colors'>
                En savoir plus
              </Link>
            </article>

            {/* Soins */}
            <article className='group border border-gold/20 p-8 lg:p-10 text-center hover:border-gold/50 transition-colors'>
              <div className='text-gold text-4xl mb-6'>◈</div>
              <h3 className='text-2xl font-title text-gold mb-4'>Soins</h3>
              <p className='text-cream/75 text-sm leading-relaxed mb-6'>
                Soins du visage, serviettes chaudes et produits premium.
                Une expérience complète de bien-être masculin.
              </p>
              <Link
                href='/prestations#soins'
                className='text-gold text-xs uppercase tracking-widest hover:text-cream transition-colors'>
                En savoir plus
              </Link>
            </article>
          </div>

          <div className='text-center mt-14'>
            <Button href='/prestations'>Voir toutes les prestations</Button>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          AMBIANCE & IDENTITÉ — Images immersives, peu de texte
      ═══════════════════════════════════════════════════════════════════ */}
      <Section className='bg-navy py-0'>
        <div className='grid md:grid-cols-2'>
          {/* Image grande */}
          <div className="relative h-[60vh] md:h-[80vh] bg-[url('/images/salon-interior-1.jpg')] bg-cover bg-center">
            <div className='absolute inset-0 bg-navy/30' />
          </div>

          {/* Contenu */}
          <div className='flex items-center justify-center p-10 lg:p-20 bg-navy'>
            <div className='max-w-md space-y-8'>
              <h2 className='text-3xl md:text-4xl font-title text-gold'>
                Un Cadre d&apos;Exception
              </h2>
              <p className='text-cream/80 leading-relaxed'>
                Matériaux nobles, lumière tamisée et atmosphère feutrée.
                L&apos;Instant Barbier a été conçu comme un refuge où chaque détail
                invite à la détente et au lâcher-prise.
              </p>
              <Link
                href='/galerie'
                className='inline-block text-gold text-sm uppercase tracking-widest hover:text-cream transition-colors'>
                Explorer la galerie →
              </Link>
            </div>
          </div>
        </div>

        {/* Deuxième rangée inversée */}
        <div className='grid md:grid-cols-2'>
          <div className='flex items-center justify-center p-10 lg:p-20 bg-navy order-2 md:order-1'>
            <div className='max-w-md space-y-8'>
              <h2 className='text-3xl md:text-4xl font-title text-gold'>
                L&apos;Expérience L&apos;Instant
              </h2>
              <p className='text-cream/80 leading-relaxed'>
                Plus qu&apos;une simple coupe, une véritable cérémonie.
                Prenez le temps de vous accorder un moment de soin et de style,
                accompagné par nos experts passionnés.
              </p>
            </div>
          </div>
          <div className="relative h-[60vh] md:h-[80vh] bg-[url('/images/salon-interior-2.jpg')] bg-cover bg-center order-1 md:order-2">
            <div className='absolute inset-0 bg-navy/30' />
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          INFORMATIONS PRATIQUES
      ═══════════════════════════════════════════════════════════════════ */}
      <Section className='bg-navy border-t border-gold/10'>
        <Container>
          <div className='grid md:grid-cols-2 gap-12 lg:gap-20 items-center'>
            {/* Map ou image du quartier */}
            <div className="relative h-80 md:h-96 bg-[url('/images/marais-paris.jpg')] bg-cover bg-center rounded-sm">
              <div className='absolute inset-0 bg-navy/40' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center'>
                  <p className='text-gold font-title text-2xl'>Le Marais</p>
                  <p className='text-cream/70 text-sm mt-2'>Paris III<sup>e</sup></p>
                </div>
              </div>
            </div>

            {/* Infos texte */}
            <div className='space-y-8'>
              <h2 className='text-3xl md:text-4xl font-title text-gold'>Nous Trouver</h2>

              <div className='space-y-6 text-cream/85'>
                <div>
                  <p className='text-gold text-xs uppercase tracking-widest mb-2'>Adresse</p>
                  <p className='text-lg'>43 rue de Turenne</p>
                  <p className='text-lg'>75003 Paris</p>
                </div>

                <div>
                  <p className='text-gold text-xs uppercase tracking-widest mb-2'>Accès</p>
                  <p>Métro Saint-Sébastien – Froissart (ligne 8)</p>
                  <p>Métro Filles du Calvaire (ligne 8)</p>
                </div>

                <div>
                  <p className='text-gold text-xs uppercase tracking-widest mb-2'>Horaires</p>
                  <p>Mardi – Samedi : 10h – 20h</p>
                  <p>Dimanche & Lundi : Fermé</p>
                </div>
              </div>

              <div className='pt-4'>
                <Button href={PLANITY_URL}>Réserver en ligne</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════
          CALL TO ACTION FINAL
      ═══════════════════════════════════════════════════════════════════ */}
      <Section className='bg-navy border-t border-gold/10'>
        <Container>
          <div className='max-w-3xl mx-auto text-center space-y-8'>
            <h2 className='text-3xl md:text-5xl font-title text-gold'>
              Réservez Votre Instant
            </h2>
            <p className='text-cream/75 text-lg max-w-xl mx-auto'>
              Offrez-vous un moment d&apos;exception. Prenez rendez-vous en quelques clics
              et laissez-nous prendre soin de votre style.
            </p>
            <div className='pt-4'>
              <Button href={PLANITY_URL}>Prendre rendez-vous</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
