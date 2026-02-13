// ═══════════════════════════════════════════════════════════════════════════
// CENTRALIZED IMAGE REGISTRY
// Single source of truth for all images used across the website.
// Update paths or alt texts here to reflect changes everywhere.
// ═══════════════════════════════════════════════════════════════════════════

// ── Types ──────────────────────────────────────────────────────────────────

export interface ImageData {
  src: string
  alt: string
}

export interface GalleryImageData extends ImageData {
  /** Category for filtering on the gallery page */
  category: 'Coupes' | 'Barbe' | 'Ambiance'
  /** Grid layout span on the gallery page */
  span: 'normal' | 'tall' | 'wide'
  /** Short alt used on the home page gallery grid */
  shortAlt: string
}

export interface TeamMemberImage extends ImageData {
  name: string
  role: string
  experience: string
}

// ── Logos ───────────────────────────────────────────────────────────────────

export const LOGOS = {
  header: {
    src: '/logo/logo-header.svg',
    alt: "L'Instant Barbier",
  },
  golden: {
    src: '/logo/logo-golden.svg',
    alt: "L'Instant Barbier",
  },
  black: {
    src: '/logo/logo-black.svg',
    alt: "L'Instant Barbier",
  },
  linstant: {
    src: '/logo/linstant-barbier-logo.png',
    alt: "L'Instant Barbier Logo",
  },
} as const satisfies Record<string, ImageData>

// ── Video ──────────────────────────────────────────────────────────────────

export const VIDEO = {
  aboutSection: {
    src: "/video/l'instant-barbier-paris.mp4",
    type: 'video/mp4',
  },
} as const

// ── Gallery Images ─────────────────────────────────────────────────────────
// Used on: Home page (gallery grid), Gallery page (masonry + lightbox),
//          Contact page (hero & CTA backgrounds)

export const GALLERY_IMAGES: GalleryImageData[] = [
  {
    src: '/images/gallery/gallery-1.jpg',
    alt: "Coupe homme moderne réalisée chez L'Instant Barbier",
    shortAlt: 'Coupe moderne',
    category: 'Coupes',
    span: 'tall',
  },
  {
    src: '/images/gallery/gallery-2.jpg',
    alt: 'Taille de barbe précise au rasoir',
    shortAlt: 'Rasage traditionnel',
    category: 'Barbe',
    span: 'normal',
  },
  {
    src: '/images/gallery/gallery-3.jpg',
    alt: 'Ambiance chaleureuse du salon dans le Marais',
    shortAlt: 'Taille de barbe',
    category: 'Ambiance',
    span: 'wide',
  },
  {
    src: '/images/gallery/gallery-4.jpg',
    alt: 'Dégradé réalisé avec précision aux ciseaux',
    shortAlt: 'Ambiance du salon',
    category: 'Coupes',
    span: 'normal',
  },
  {
    src: '/images/gallery/gallery-5.jpg',
    alt: 'Barbe sculptée avec soin et produits premium',
    shortAlt: 'Détail coupe',
    category: 'Barbe',
    span: 'tall',
  },
  {
    src: '/images/gallery/gallery-6.jpg',
    alt: "Espace élégant et raffiné du salon L'Instant Barbier",
    shortAlt: 'Finitions',
    category: 'Ambiance',
    span: 'normal',
  },
]

// ── Team ───────────────────────────────────────────────────────────────────

export const TEAM: TeamMemberImage[] = [
  {
    src: '/images/team/Riccardo.avif',
    alt: "Riccardo — Coiffeur-barbier chez L'Instant Barbier",
    name: 'RICCARDO',
    role: 'Coiffeur-barbier et directeur artistique',
    experience: "23 ans d'expérience",
  },
]

// ── Product / Equipment Grid ───────────────────────────────────────────────
// Used on: Home page — À propos section (4-column product grid)

export const PRODUCT_GRID: ImageData[] = [
  {
    src: '/images/barbershop-equipments.jpg',
    alt: 'Équipements professionnels de barbier',
  },
  {
    src: '/images/barbershop-premium-products.jpg',
    alt: 'Produits premium pour homme',
  },
  {
    src: '/images/barbershop-face-cream.jpg',
    alt: 'Crème visage homme haut de gamme',
  },
  {
    src: '/images/barbershop-hair-products.jpeg',
    alt: 'Produits capillaires professionnels',
  },
]

// ── Page Heroes & Backgrounds ──────────────────────────────────────────────
// Centralized background images used across pages.
// Keys are named by page + section for easy identification.

export const BACKGROUNDS = {
  // ── Home page ──
  homeHero: {
    src: '/images/hero-barbershop.jpg',
    alt: "L'Instant Barbier — salon de coiffure et barbier à Paris",
  },
  homeAtmosphere: {
    src: '/images/Atmosph%C3%A8re.jpg',
    alt: 'Atmosphère élégante du salon',
  },
  homeInterior: {
    src: '/images/salon-interior-1.jpg',
    alt: "Intérieur du salon L'Instant Barbier",
  },
  homeSchedule: {
    src: '/images/salon-interior-2.jpg',
    alt: 'Vue du salon — horaires',
  },
  homeMap: {
    src: '/images/marais-paris.jpg',
    alt: 'Le Marais, Paris 3ᵉ',
  },
  homeCta: {
    src: '/images/barber-tools-luxury.jpg',
    alt: 'Outils de barbier haut de gamme',
  },

  // ── Prestations page ──
  prestationsHero: {
    src: '/images/prestation-bg.jpg',
    alt: "Prestations L'Instant Barbier",
  },

  // ── Contact page (uses gallery images) ──
  contactHero: GALLERY_IMAGES[2], // gallery-3.jpg
  contactCta: GALLERY_IMAGES[0], // gallery-1.jpg

  // ── Salon page (placeholders — replace with real images) ──
  salonHero: {
    src: 'https://placehold.co/1920x1080/07181E/AF9778?text=Hero+Salon+Atmosphere',
    alt: "Salon L'Instant Barbier",
  },
  salonAtmosphereMain: {
    src: 'https://placehold.co/800x1000/0f0f0f/AF9778?text=Salon+Interior+Main',
    alt: 'Intérieur du salon',
  },
  salonAtmosphereDetail: {
    src: 'https://placehold.co/600x800/142233/AF9778?text=Detail+Ambiance',
    alt: 'Détail ambiance',
  },
  salonExpertise: {
    src: 'https://placehold.co/700x900/07181E/AF9778?text=Barber+at+Work',
    alt: 'Barbier en action',
  },
  salonExperienceLarge: {
    src: 'https://placehold.co/900x700/0f0f0f/AF9778?text=Premium+Experience',
    alt: 'Expérience premium',
  },
  salonExperienceSmall1: {
    src: 'https://placehold.co/500x600/142233/AF9778?text=Consultation',
    alt: 'Consultation',
  },
  salonExperienceSmall2: {
    src: 'https://placehold.co/500x600/07181E/AF9778?text=Relaxation',
    alt: 'Relaxation',
  },
  salonLocation: {
    src: 'https://placehold.co/1920x800/07181E/AF9778?text=Paris+Marais+Street',
    alt: 'Le Marais, Paris',
  },
  salonMap: {
    src: 'https://placehold.co/600x300/142233/AF9778?text=Map+Placeholder',
    alt: 'Carte',
  },

  // ── Prestations page (placeholders — replace with real images) ──
  prestationCoiffure: {
    src: 'https://placehold.co/900x1100/0f0f0f/AF9778?text=Coiffure+Homme',
    alt: 'Coiffure Homme',
  },
  prestationBarbe: {
    src: 'https://placehold.co/900x1100/07181E/AF9778?text=Barbe+Rituel',
    alt: 'Barbe',
  },
  prestationSoins: {
    src: 'https://placehold.co/900x1100/0f0f0f/AF9778?text=Soins+Premium',
    alt: 'Soins & Bien-être',
  },
  prestationBentoLarge: {
    src: 'https://placehold.co/1000x800/07181E/AF9778?text=Experience+Premium',
    alt: 'Expérience haut de gamme',
  },
  prestationCta: {
    src: 'https://placehold.co/1920x800/0f0f0f/AF9778?text=CTA+Background',
    alt: 'Background',
  },
} as const satisfies Record<string, ImageData>
