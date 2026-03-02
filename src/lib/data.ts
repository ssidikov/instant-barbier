import { TEAM, GALLERY_IMAGES } from '@/lib/images'

// ═══════════════════════════════════════════════════════════════════════════
// SERVICE ICON IDENTIFIERS
// Icons are rendered in page.tsx to keep this file as a pure .ts data module
// (no JSX → no client component boundary, better tree-shaking).
// ═══════════════════════════════════════════════════════════════════════════

export type ServiceIconId = 'scissors' | 'razor' | 'care'

export interface ServiceData {
  iconId: ServiceIconId
  title: string
  description: string
  link: string
}

export const services: ServiceData[] = [
  {
    iconId: 'scissors',
    title: 'Cheveux – Coupe homme sur mesure',
    description:
      'Transformez votre style avec une coupe homme personnalisée, adaptée à votre morphologie et à vos envies. Du dégradé taper fade aux coupes classiques ou modernes, nous travaillons chaque détail pour un résultat net, équilibré et durable.',
    link: '/prestations',
  },
  {
    iconId: 'razor',
    title: 'Barbe – Rituel barbier à Paris',
    description:
      "Offrez à votre barbe l'attention qu'elle mérite grâce à un rituel barbe complet : taille précise, serviettes chaudes et soins aux huiles essentielles, notamment à l'ylang-ylang. Un service idéal pour un rendu élégant, structuré et naturel.",
    link: '/prestations',
  },
  {
    iconId: 'care',
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
