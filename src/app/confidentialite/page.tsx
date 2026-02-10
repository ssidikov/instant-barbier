'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// POLICY SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function PolicySection({
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
// INFO BLOCK
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
// BULLET LIST
// ═══════════════════════════════════════════════════════════════════════════

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className='space-y-2 pl-1'>
      {items.map((item, i) => (
        <li key={i} className='flex items-start gap-3'>
          <span className='w-1.5 h-1.5 bg-gold/40 rounded-full mt-2 shrink-0' />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function ConfidentialitePage() {
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

      <Header />

      <main>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='relative pt-32 md:pt-44 pb-16 md:pb-24'>
          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 0.1, height: '20vh' }}
            transition={{ delay: 0.6, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className='absolute top-20 right-[10%] w-px bg-linear-to-b from-transparent via-gold to-transparent'
          />
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 0.08, width: '12vw' }}
            transition={{ delay: 0.9, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className='absolute top-[55%] left-[5%] h-px bg-linear-to-r from-transparent via-gold to-transparent'
          />

          <div className='max-w-4xl mx-auto px-6 md:px-12'>
            <motion.div initial='hidden' animate='visible' variants={staggerContainer}>
              <motion.span
                variants={fadeInUp}
                className='inline-block text-gold/50 text-[10px] uppercase tracking-[0.5em] mb-6'>
                Protection des données
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className='text-4xl md:text-6xl lg:text-7xl font-title text-gold leading-[0.95] tracking-tight mb-8'>
                Politique de
                <br />
                <span className='text-cream'>Confidentialité</span>
              </motion.h1>

              <motion.div variants={fadeInUp} className='max-w-xl'>
                <p className='text-cream/50 text-base md:text-lg font-light leading-relaxed'>
                  Comment nous protégeons vos données personnelles, conformément au Règlement
                  Général sur la Protection des Données (RGPD).
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className='mt-10 flex items-center gap-4'>
                <div className='w-20 h-px bg-gold/25' />
                <span className='text-gold/30 text-[10px] uppercase tracking-[0.3em]'>
                  En vigueur depuis le 26 janvier 2026
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            POLICY CONTENT
            ═══════════════════════════════════════════════════════════════════ */}
        <section className='pb-32 md:pb-48'>
          <div className='max-w-4xl mx-auto px-6 md:px-12 space-y-16 md:space-y-20'>
            {/* ── 1. Qui sommes-nous ── */}
            <PolicySection number='01' title='Qui sommes-nous ?'>
              <p>Le présent site est exploité par :</p>

              <InfoBlock label='Exploitant'>
                <p className='text-cream font-title text-lg mb-2'>L&apos;INSTANT BARBIER (LIB)</p>
                <p>Société par actions simplifiée (SAS)</p>
                <p>43 rue de Turenne, 75003 Paris, France</p>
                <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-3 pt-3 border-t border-gold/8'>
                  <a
                    href='tel:0145354722'
                    className='text-gold/70 hover:text-gold transition-colors duration-300 inline-flex items-center gap-2'>
                    <svg
                      className='w-3.5 h-3.5'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'>
                      <path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z' />
                    </svg>
                    01 45 35 47 22
                  </a>
                  <a
                    href='mailto:linstantbarbier@gmail.com'
                    className='text-gold/70 hover:text-gold transition-colors duration-300 inline-flex items-center gap-2'>
                    <svg
                      className='w-3.5 h-3.5'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'>
                      <rect x='2' y='4' width='20' height='16' rx='2' />
                      <path d='M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7' />
                    </svg>
                    linstantbarbier@gmail.com
                  </a>
                </div>
              </InfoBlock>

              <p>
                Le site internet{' '}
                <a
                  href='https://www.linstantbarbier.fr'
                  className='text-gold/80 hover:text-gold transition-colors duration-300 underline underline-offset-2 decoration-gold/20 hover:decoration-gold/50'>
                  www.linstantbarbier.fr
                </a>{' '}
                a pour vocation de présenter l&apos;activité du salon L&apos;Instant Barbier et de
                faciliter la prise de contact et l&apos;accès à la réservation en ligne via un
                service tiers.
              </p>
            </PolicySection>

            {/* ── 2. Collecte ── */}
            <PolicySection number='02' title='Collecte et utilisation des données personnelles'>
              <p>
                Lors de l&apos;utilisation du site{' '}
                <span className='text-gold/70'>www.linstantbarbier.fr</span>, certaines données à
                caractère personnel peuvent être collectées, uniquement lorsque cela est nécessaire.
              </p>
              <p>
                Le terme « données personnelles » désigne toute information permettant
                d&apos;identifier directement ou indirectement une personne physique.
              </p>

              <InfoBlock label="Données susceptibles d'être collectées">
                <BulletList
                  items={[
                    'Nom et prénom',
                    'Adresse e-mail',
                    'Numéro de téléphone',
                    'Données transmises via le formulaire de contact',
                  ]}
                />
              </InfoBlock>

              <p>
                Ces données sont collectées{' '}
                <strong className='text-cream/80 font-normal'>
                  uniquement avec le consentement de l&apos;utilisateur
                </strong>
                , notamment lors :
              </p>

              <BulletList items={["d'une prise de contact,", "d'une demande d'information."]} />

              <p className='text-cream/50 text-sm italic'>
                Aucune donnée bancaire n&apos;est collectée ou stockée sur le site.
              </p>
            </PolicySection>

            {/* ── 3. Finalités ── */}
            <PolicySection number='03' title='Finalités de la collecte'>
              <p>Les données personnelles sont collectées pour les finalités suivantes :</p>

              <BulletList
                items={[
                  'répondre aux demandes envoyées via le formulaire de contact,',
                  'assurer la communication avec les utilisateurs,',
                  'fournir des informations relatives aux prestations du salon.',
                ]}
              />

              <p>
                Les données collectées sont strictement nécessaires et ne sont jamais utilisées à
                des fins commerciales non sollicitées.
              </p>
            </PolicySection>

            {/* ── 4. Réservation tiers ── */}
            <PolicySection number='04' title='Réservation en ligne via un service tiers'>
              <p>
                La prise de rendez-vous s&apos;effectue via une plateforme externe (
                <strong className='text-cream/80 font-normal'>Planity</strong>).
              </p>
              <p>
                À ce titre, les données personnelles liées à la réservation sont collectées et
                traitées{' '}
                <strong className='text-cream/80 font-normal'>directement par Planity</strong>,
                conformément à leur propre politique de confidentialité.
              </p>
              <p>
                L&apos;Instant Barbier n&apos;est pas responsable du traitement des données effectué
                par ce service tiers.
              </p>
            </PolicySection>

            {/* ── 5. Formulaire ── */}
            <PolicySection number='05' title='Formulaire de contact'>
              <p>
                Lorsque vous utilisez le formulaire de contact, les informations saisies sont
                transmises par voie sécurisée et utilisées uniquement pour répondre à votre demande.
              </p>
              <p>
                Aucune information fournie via le formulaire de contact n&apos;est partagée avec des
                tiers.
              </p>
            </PolicySection>

            {/* ── 6. Cookies ── */}
            <PolicySection number='06' title='Cookies'>
              <p>
                Le site <span className='text-gold/70'>www.linstantbarbier.fr</span> peut être amené
                à utiliser des cookies à des fins :
              </p>

              <BulletList
                items={[
                  'de bon fonctionnement du site,',
                  "de mesure d'audience,",
                  "d'amélioration de l'expérience utilisateur.",
                ]}
              />

              <p>
                Un cookie est un petit fichier texte stocké sur votre terminal (ordinateur,
                tablette, smartphone).
              </p>
              <p>
                Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies. Le
                refus des cookies peut toutefois limiter certaines fonctionnalités du site.
              </p>
              <p>
                Pour plus d&apos;informations sur les cookies :{' '}
                <a
                  href='https://www.cnil.fr/vos-droits/vos-traces/les-cookies/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gold/80 hover:text-gold transition-colors duration-300 underline underline-offset-2 decoration-gold/20 hover:decoration-gold/50 inline-flex items-center gap-1.5'>
                  cnil.fr
                  <svg
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'>
                    <path d='M7 17L17 7M17 7H7M17 7v10' />
                  </svg>
                </a>
              </p>
            </PolicySection>

            {/* ── 7. Contenus embarqués ── */}
            <PolicySection number='07' title="Contenus embarqués depuis d'autres sites">
              <p>
                Certaines pages du site peuvent inclure des contenus intégrés (par exemple : carte
                Google Maps, liens vers des réseaux sociaux).
              </p>
              <p>
                Les contenus intégrés depuis d&apos;autres sites se comportent de la même manière
                que si l&apos;utilisateur visitait directement ces sites.
              </p>
              <p>
                Ces sites tiers peuvent collecter des données, utiliser des cookies ou des outils de
                suivi indépendamment de L&apos;Instant Barbier.
              </p>
            </PolicySection>

            {/* ── 8. Conservation ── */}
            <PolicySection number='08' title='Durée de conservation des données'>
              <p>
                Les données personnelles sont conservées uniquement pendant la durée nécessaire aux
                finalités pour lesquelles elles ont été collectées :
              </p>

              <div className='space-y-2.5 py-2'>
                <div className='flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3'>
                  <span className='text-cream/40 text-sm shrink-0'>Données de contact</span>
                  <span className='hidden sm:block flex-1 border-b border-dotted border-gold/8' />
                  <span className='text-cream/70 text-sm font-light'>
                    Maximum <strong className='text-cream/90 font-normal'>3 ans</strong> à compter
                    du dernier échange
                  </span>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3'>
                  <span className='text-cream/40 text-sm shrink-0'>Obligations légales</span>
                  <span className='hidden sm:block flex-1 border-b border-dotted border-gold/8' />
                  <span className='text-cream/70 text-sm font-light'>
                    Durée prévue par la loi en vigueur
                  </span>
                </div>
              </div>

              <p>Au-delà de ces délais, les données sont supprimées ou anonymisées.</p>
            </PolicySection>

            {/* ── 9. Droits ── */}
            <PolicySection number='09' title='Droits des utilisateurs'>
              <p>
                Conformément au{' '}
                <strong className='text-cream/80 font-normal'>
                  Règlement Général sur la Protection des Données (RGPD)
                </strong>
                , vous disposez des droits suivants :
              </p>

              <BulletList
                items={[
                  "droit d'accès à vos données personnelles,",
                  'droit de rectification,',
                  "droit à l'effacement,",
                  "droit d'opposition,",
                  'droit à la limitation du traitement,',
                  'droit à la portabilité des données.',
                ]}
              />

              <p>Pour exercer vos droits, vous pouvez adresser votre demande à :</p>

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

              <p className='text-cream/50 text-sm'>
                Une réponse vous sera apportée dans un délai maximum d&apos;un mois.
              </p>
            </PolicySection>

            {/* ── 10. Sécurité ── */}
            <PolicySection number='10' title='Sécurité des données'>
              <p>
                L&apos;Instant Barbier met en œuvre des mesures techniques et organisationnelles
                appropriées afin de garantir la sécurité et la confidentialité des données
                personnelles.
              </p>
              <p>
                Les données sont hébergées sur des infrastructures sécurisées et ne sont accessibles
                qu&apos;aux personnes autorisées.
              </p>
            </PolicySection>

            {/* ── 11. Violation ── */}
            <PolicySection number='11' title='Procédure en cas de violation de données'>
              <p>
                En cas de violation de données personnelles, L&apos;Instant Barbier s&apos;engage à
                :
              </p>

              <BulletList
                items={[
                  'informer les personnes concernées,',
                  'notifier la CNIL si nécessaire,',
                  'prendre toutes les mesures correctives appropriées.',
                ]}
              />
            </PolicySection>

            {/* ── 12. Tiers ── */}
            <PolicySection number='12' title='Transmission des données à des tiers'>
              <p>
                Les données personnelles ne sont ni vendues, ni cédées, ni échangées avec des tiers.
              </p>
              <p>
                Seuls les prestataires techniques nécessaires au fonctionnement du site peuvent y
                avoir accès, dans le strict respect du RGPD.
              </p>
            </PolicySection>

            {/* ── 13. Droit applicable ── */}
            <PolicySection number='13' title='Droit applicable'>
              <p>La présente politique de confidentialité est régie par le droit français.</p>
              <p>
                Tout litige relatif à son interprétation ou à son exécution relève de la compétence
                des tribunaux français.
              </p>
            </PolicySection>

            {/* ── 14. Entrée en vigueur ── */}
            <PolicySection number='14' title='Entrée en vigueur'>
              <p>
                La présente politique de confidentialité est entrée en vigueur le{' '}
                <strong className='text-cream/80 font-normal'>26 janvier 2026</strong>.
              </p>
            </PolicySection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
