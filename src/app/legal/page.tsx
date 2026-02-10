'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import Footer from '@/components/Footer'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// ═══════════════════════════════════════════════════════════════════════════
// LEGAL SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function LegalSection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className='relative pl-8 md:pl-12 border-l border-gold/10 hover:border-gold/30 transition-colors duration-700'>
      {/* Section number */}
      <span className='absolute left-0 -translate-x-1/2 top-0 w-8 h-8 bg-navy border border-gold/20 flex items-center justify-center text-gold/50 text-[10px] font-mono'>
        {number}
      </span>

      <h2 className='text-xl md:text-2xl font-title text-gold mb-6 leading-tight'>{title}</h2>

      <div className='space-y-4 text-cream/60 font-light leading-relaxed text-[15px]'>
        {children}
      </div>
    </motion.article>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// INFO BLOCK - For structured data like company info
// ═══════════════════════════════════════════════════════════════════════════

function InfoBlock({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className='bg-navy-secondary/30 border border-gold/8 p-5 md:p-6'>
      {label && (
        <span className='text-gold/50 text-[10px] uppercase tracking-[0.3em] block mb-3'>
          {label}
        </span>
      )}
      <div className='text-cream/70 text-sm leading-relaxed space-y-1'>{children}</div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA ROW - For key/value pairs
// ═══════════════════════════════════════════════════════════════════════════

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3'>
      <span className='text-cream/40 text-sm shrink-0 sm:min-w-50'>{label}</span>
      <span className='hidden sm:block flex-1 border-b border-dotted border-gold/8' />
      <span className='text-cream/70 text-sm font-light'>{value}</span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function LegalPage() {
  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className='bg-navy min-h-screen text-cream overflow-x-hidden selection:bg-gold selection:text-navy'>
      {/* Scroll progress */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-0.5 bg-gold/80 origin-left z-100'
        style={{ scaleX: progressScaleX }}
      />

      <main>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Minimal, editorial
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative pt-32 md:pt-44 pb-16 md:pb-24'>
          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 0.1, height: '20vh' }}
            transition={{ delay: 0.6, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className='absolute top-20 right-[12%] w-px bg-linear-to-b from-transparent via-gold to-transparent'
          />

          <div className='max-w-4xl mx-auto px-6 md:px-12'>
            <motion.div initial='hidden' animate='visible' variants={staggerContainer}>
              <motion.span
                variants={fadeInUp}
                className='inline-block text-gold/50 text-[10px] uppercase tracking-[0.5em] mb-6'>
                Informations légales
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className='text-4xl md:text-6xl lg:text-7xl font-title text-gold leading-[0.95] tracking-tight mb-8'>
                Mentions
                <br />
                <span className='text-cream'>Légales</span>
              </motion.h1>

              <motion.div variants={fadeInUp} className='max-w-xl'>
                <p className='text-cream/50 text-base md:text-lg font-light leading-relaxed'>
                  Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
                  l&apos;économie numérique.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className='mt-10 w-20 h-px bg-gold/25' />
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            LEGAL CONTENT
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='pb-32 md:pb-48'>
          <div className='max-w-4xl mx-auto px-6 md:px-12 space-y-16 md:space-y-20'>
            {/* ── 1. Présentation ── */}
            <LegalSection number='01' title='Présentation du site'>
              <p>
                Conformément à l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la
                confiance dans l&apos;économie numérique, il est précisé aux utilisateurs du site{' '}
                <a
                  href='https://www.linstantbarbier.fr'
                  className='text-gold/80 hover:text-gold transition-colors duration-300 underline underline-offset-2 decoration-gold/20 hover:decoration-gold/50'>
                  www.linstantbarbier.fr
                </a>{' '}
                l&apos;identité des différents intervenants dans le cadre de sa réalisation et de
                son suivi.
              </p>

              <InfoBlock label='Propriétaire du site'>
                <p className='text-cream font-title text-lg mb-2'>L&apos;INSTANT BARBIER (LIB)</p>
                <p>Société par actions simplifiée (SAS)</p>
                <p>Capital social : 3 000 €</p>
                <p>43 rue de Turenne, 75003 Paris, France</p>
              </InfoBlock>

              <div className='space-y-2.5 py-2'>
                <DataRow label='SIREN' value='953 101 995' />
                <DataRow label='SIRET' value='953 101 995 00017' />
                <DataRow label='TVA intracommunautaire' value='FR40 953 101 995' />
                <DataRow label='Code APE / NAF' value='96.02A — Coiffure' />
                <DataRow label='Activité' value='Coiffure et activités de barbier' />
              </div>

              <InfoBlock label='Responsable de la publication'>
                <p>
                  L&apos;INSTANT BARBIER (LIB), représentée par son Directeur Général,{' '}
                  <strong className='text-cream/90 font-normal'>Rached ELLOUZE</strong>
                </p>
                <p className='text-cream/40 text-xs mt-1'>
                  Le responsable de la publication est une personne morale.
                </p>
              </InfoBlock>
            </LegalSection>

            {/* ── 2. Hébergement ── */}
            <LegalSection number='02' title='Hébergement du site'>
              <InfoBlock label='Hébergeur'>
                <p className='text-cream font-title text-base mb-1'>Vercel Inc.</p>
                <p>340 S Lemon Ave #4133</p>
                <p>Walnut, CA 91789, États-Unis</p>
                <a
                  href='https://vercel.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 text-gold/70 hover:text-gold transition-colors duration-300 mt-2 text-sm'>
                  vercel.com
                  <svg
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'>
                    <path d='M7 17L17 7M17 7H7M17 7v10' />
                  </svg>
                </a>
              </InfoBlock>
            </LegalSection>

            {/* ── 3. CGU ── */}
            <LegalSection number='03' title="Conditions générales d'utilisation">
              <p>
                L&apos;utilisation du site{' '}
                <span className='text-gold/70'>www.linstantbarbier.fr</span> implique
                l&apos;acceptation pleine et entière des conditions générales d&apos;utilisation
                décrites ci-après.
              </p>
              <p>
                Ces conditions sont susceptibles d&apos;être modifiées ou complétées à tout moment ;
                les utilisateurs du site sont donc invités à les consulter régulièrement.
              </p>
              <p>
                Le site est normalement accessible à tout moment. Toutefois, une interruption pour
                raison de maintenance technique peut être décidée par L&apos;Instant Barbier, qui
                s&apos;efforcera alors de communiquer préalablement aux utilisateurs les dates et
                heures de l&apos;intervention.
              </p>
            </LegalSection>

            {/* ── 4. Services ── */}
            <LegalSection number='04' title='Description des services fournis'>
              <p>
                Le site <span className='text-gold/70'>www.linstantbarbier.fr</span> a pour objet de
                fournir une information concernant l&apos;ensemble des activités du salon
                L&apos;Instant Barbier.
              </p>
              <p>
                L&apos;Instant Barbier s&apos;efforce de fournir sur le site des informations aussi
                précises que possible. Toutefois, il ne pourra être tenu responsable des omissions,
                des inexactitudes ou des carences dans la mise à jour, qu&apos;elles soient de son
                fait ou du fait des tiers partenaires.
              </p>
              <p>
                Toutes les informations indiquées sur le site sont données à titre indicatif et sont
                susceptibles d&apos;évoluer.
              </p>
            </LegalSection>

            {/* ── 5. Données techniques ── */}
            <LegalSection number='05' title='Limitations contractuelles sur les données techniques'>
              <p>Le site utilise les technologies modernes du web, notamment JavaScript.</p>
              <p>
                Le site Internet ne pourra être tenu responsable de dommages matériels liés à
                l&apos;utilisation du site, notamment en cas d&apos;incompatibilité, de bug ou de
                mauvaise configuration du matériel de l&apos;utilisateur.
              </p>
              <p>
                L&apos;utilisateur du site s&apos;engage à accéder au site en utilisant un matériel
                récent, ne contenant pas de virus, et avec un navigateur de dernière génération mis
                à jour.
              </p>
            </LegalSection>

            {/* ── 6. Propriété intellectuelle ── */}
            <LegalSection number='06' title='Propriété intellectuelle et contrefaçons'>
              <p>
                L&apos;INSTANT BARBIER (LIB) est propriétaire des droits de propriété intellectuelle
                ou détient les droits d&apos;usage sur l&apos;ensemble des éléments accessibles sur
                le site, notamment les textes, images, graphismes, logos, icônes, photographies et
                contenus.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication ou adaptation de tout
                ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
                interdite sans autorisation écrite préalable de L&apos;INSTANT BARBIER (LIB).
              </p>
              <p>
                Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments
                qu&apos;il contient sera considérée comme constitutive d&apos;une contrefaçon et
                poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de
                la propriété intellectuelle.
              </p>
            </LegalSection>

            {/* ── 7. Responsabilité ── */}
            <LegalSection number='07' title='Limitations de responsabilité'>
              <p>
                L&apos;INSTANT BARBIER (LIB) ne pourra être tenu responsable des dommages directs ou
                indirects causés au matériel de l&apos;utilisateur lors de l&apos;accès au site, et
                résultant soit de l&apos;utilisation d&apos;un matériel ne répondant pas aux
                spécifications indiquées, soit de l&apos;apparition d&apos;un bug ou d&apos;une
                incompatibilité.
              </p>
              <p>
                L&apos;INSTANT BARBIER (LIB) ne pourra également être tenu responsable des dommages
                indirects (tels qu&apos;une perte de marché ou une perte de chance) consécutifs à
                l&apos;utilisation du site.
              </p>
              <p>
                Des espaces interactifs (formulaire de contact) sont à la disposition des
                utilisateurs. L&apos;INSTANT BARBIER (LIB) se réserve le droit de supprimer, sans
                mise en demeure préalable, tout contenu contrevenant à la législation française.
              </p>
            </LegalSection>

            {/* ── 8. RGPD ── */}
            <LegalSection number='08' title='Gestion des données personnelles'>
              <p>
                Les données personnelles sont protégées par la législation française et européenne,
                notamment le{' '}
                <strong className='text-cream/80 font-normal'>
                  Règlement Général sur la Protection des Données (RGPD)
                </strong>
                .
              </p>
              <p>
                Le site <span className='text-gold/70'>www.linstantbarbier.fr</span> ne collecte des
                informations personnelles que dans le cadre strict des services proposés (prise de
                contact, demande d&apos;information).
              </p>
              <p>
                Aucune donnée personnelle de l&apos;utilisateur n&apos;est publiée, échangée,
                transférée, cédée ou vendue à des tiers.
              </p>
              <p>
                Conformément à la réglementation en vigueur, tout utilisateur dispose d&apos;un
                droit d&apos;accès, de rectification et d&apos;opposition aux données personnelles
                le concernant, en adressant sa demande à :
              </p>

              <div className='inline-flex items-center gap-3 bg-navy-secondary/40 border border-gold/10 px-5 py-3'>
                <svg
                  className='w-4 h-4 text-gold/60'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'>
                  <rect x='2' y='4' width='20' height='16' rx='2' />
                  <path d='M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7' />
                </svg>
                <a
                  href='mailto:linstantbarbier@gmail.com'
                  className='text-gold/80 hover:text-gold transition-colors duration-300 text-sm'>
                  linstantbarbier@gmail.com
                </a>
              </div>
            </LegalSection>

            {/* ── 9. Cookies ── */}
            <LegalSection number='09' title='Liens hypertextes et cookies'>
              <p>
                Le site peut contenir des liens hypertextes vers d&apos;autres sites. L&apos;INSTANT
                BARBIER (LIB) n&apos;exerce aucun contrôle sur le contenu de ces sites et décline
                toute responsabilité quant à leur contenu.
              </p>
              <p>
                La navigation sur le site peut entraîner l&apos;installation de cookies destinés à
                améliorer l&apos;expérience utilisateur et à mesurer l&apos;audience.
              </p>
              <p>
                L&apos;utilisateur peut configurer son navigateur pour refuser l&apos;installation
                des cookies.
              </p>
            </LegalSection>

            {/* ── 10. Droit applicable ── */}
            <LegalSection number='10' title='Droit applicable et juridiction compétente'>
              <p>
                Tout litige en relation avec l&apos;utilisation du site{' '}
                <span className='text-gold/70'>www.linstantbarbier.fr</span> est soumis au droit
                français.
              </p>
              <p>
                Il est fait attribution exclusive de juridiction aux tribunaux compétents de{' '}
                <strong className='text-cream/80 font-normal'>Paris</strong>.
              </p>
            </LegalSection>

            {/* ── 11. Lexique ── */}
            <LegalSection number='11' title='Lexique'>
              <div className='space-y-4'>
                <div>
                  <span className='text-cream/80 font-title text-base'>Utilisateur</span>
                  <p className='mt-1'>Internaute se connectant et utilisant le site.</p>
                </div>
                <div className='w-full h-px bg-gold/8' />
                <div>
                  <span className='text-cream/80 font-title text-base'>
                    Informations personnelles
                  </span>
                  <p className='mt-1'>
                    Toute information permettant, directement ou indirectement,
                    l&apos;identification d&apos;une personne physique.
                  </p>
                </div>
              </div>
            </LegalSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
