import { TEAM, GALLERY_IMAGES } from '@/lib/images'

// ═══════════════════════════════════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════════════════════════════════

export const services = [
  {
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <circle cx='6' cy='6' r='3' />
        <circle cx='6' cy='18' r='3' />
        <line x1='20' y1='4' x2='8.12' y2='15.88' />
        <line x1='14.47' y1='14.48' x2='20' y2='20' />
        <line x1='8.12' y1='8.12' x2='12' y2='12' />
      </svg>
    ),
    title: 'Cheveux – Coupe homme sur mesure',
    description:
      'Transformez votre style avec une coupe homme personnalisée, adaptée à votre morphologie et à vos envies. Du dégradé taper fade aux coupes classiques ou modernes, nous travaillons chaque détail pour un résultat net, équilibré et durable.',
    link: '/prestations',
  },
  {
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path d='M7 4h10' />
        <rect x='5' y='3' width='14' height='4' rx='1' />
        <line x1='12' y1='7' x2='12' y2='21' />
        <line x1='9' y1='21' x2='15' y2='21' />
      </svg>
    ),
    title: 'Barbe – Rituel barbier à Paris',
    description:
      "Offrez à votre barbe l'attention qu'elle mérite grâce à un rituel barbe complet : taille précise, serviettes chaudes et soins aux huiles essentielles, notamment à l'ylang-ylang. Un service idéal pour un rendu élégant, structuré et naturel.",
    link: '/prestations',
  },
  {
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path d='M12 21c-2.4-1.2-5.7-4-5.7-9 0-3.3 3.3-6.3 5.7-9 2.4 2.7 5.7 5.7 5.7 9 0 5-3.3 7.8-5.7 9z' />
        <path d='M12 21c1.8-1.5 5-5.5 5-9 0-3.5-3-5.5-5-5.5-2 0-5 2-5 5.5 0 3.5 3.2 7.5 5 9z' />
        <path d='M12 11c1.1 0 2.2.4 3 1 .8.6 1.3 1.5 1.7 2.5' />
        <path d='M12 11c-1.1 0-2.2.4-3 1-.8.6-1.3 1.5-1.7 2.5' />
      </svg>
    ),
    title: 'Soins – Soin visage homme & bien-être',
    description:
      'Nos soins visage homme à Paris sont conçus pour revitaliser la peau et les cheveux. Nous utilisons des produits haut de gamme pour hydrater, nourrir et offrir un véritable moment de détente dans un cadre apaisant.',
    link: '/prestations',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// TEAM
// ═══════════════════════════════════════════════════════════════════════════

export const team = TEAM.map((member) => ({
  name: member.name,
  role: member.role,
  experience: member.experience,
  image: member.src,
}))

// ═══════════════════════════════════════════════════════════════════════════
// GALLERY
// ═══════════════════════════════════════════════════════════════════════════

export const galleryImages = GALLERY_IMAGES.map((img) => ({
  src: img.src,
  alt: img.shortAlt,
}))

// ═══════════════════════════════════════════════════════════════════════════
// REVIEWS
// ═══════════════════════════════════════════════════════════════════════════

export const reviews = [
  {
    text: "Ambiance géniale et service impeccable. Les barbiers sont attentifs et prennent le temps de comprendre ce que l'on souhaite. Je recommande vivement !",
    author: 'Jean-Pierre D.',
    rating: 5,
  },
  {
    text: "Je me suis senti accueilli dès mon arrivée. Coupe parfaite, rasage traditionnel d'exception. Un vrai moment de détente pour hommes.",
    author: 'Antoine L.',
    rating: 5,
  },
  {
    text: 'Une expérience incroyable à chaque visite. Des barbiers qualifiés et un cadre raffiné. On sent le souci du détail et de la précision.',
    author: 'Charles M.',
    rating: 5,
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// HOURS
// ═══════════════════════════════════════════════════════════════════════════

export const hours = [
  { day: 'Lundi', hours: '09:00 – 21:00' },
  { day: 'Mardi', hours: '09:00 – 21:00' },
  { day: 'Mercredi', hours: '09:00 – 21:00' },
  { day: 'Jeudi', hours: '09:00 – 21:00' },
  { day: 'Vendredi', hours: '09:00 – 21:00' },
  { day: 'Samedi', hours: '09:00 – 20:00' },
  { day: 'Dimanche', hours: '10:00 – 20:00' },
]
