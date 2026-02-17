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
  category: 'Coupes' | 'Barbe' | 'Ambiance' | 'Barbiers' | 'Outils' | 'Produit' | 'Salon' | 'Soins'
  /** Grid layout span on the gallery page */
  span: 'normal' | 'tall' | 'wide'
  /** Short alt used on the home page gallery grid */
  shortAlt: string
}

export interface TeamMemberImage extends ImageData {
  name: string
  role: string
}

// ── Brand Assets ───────────────────────────────────────────────────────────

export const LOGO: ImageData = {
  src: '/images/logo.png',
  alt: "Logo L'Instant Barbier",
}

export const HERO_IMAGE: ImageData = {
  src: '/images/hero-bg.jpg',
  alt: '',
}

// ── Gallery Images ─────────────────────────────────────────────────────────

// Helper function to create span pattern
const getSpan = (index: number): 'normal' | 'tall' | 'wide' => {
  const pattern = index % 12
  if (pattern === 0 || pattern === 5) return 'tall'
  if (pattern === 3 || pattern === 8) return 'wide'
  return 'normal'
}

export const GALLERY_IMAGES: GalleryImageData[] = [
  // ── Coupes (49 images) ──
  ...Array.from({ length: 49 }, (_, i) => ({
    src: `/images/gallery/Coupes/Coupes (${i + 1}).${(i + 1 >= 35 && i + 1 <= 42) || (i + 1 >= 44 && i + 1 <= 49) ? 'JPG' : 'jpg'}`,
    alt: 'Coupes',
    shortAlt: 'Coupes',
    category: 'Coupes' as const,
    span: getSpan(i),
  })),

  // ── Barbe (36 images) ──
  ...Array.from({ length: 36 }, (_, i) => ({
    src: `/images/gallery/Barbe/Barbe (${i + 1}).${i + 1 === 29 ? 'JPG' : 'jpg'}`,
    alt: 'Barbe',
    shortAlt: 'Barbe',
    category: 'Barbe' as const,
    span: getSpan(i),
  })),

  // ── Ambiance (29 images) ──
  ...Array.from({ length: 29 }, (_, i) => ({
    src: `/images/gallery/Ambiance/Ambiance (${i + 1}).${i + 1 === 23 || (i + 1 >= 26 && i + 1 <= 28) ? 'JPG' : 'jpg'}`,
    alt: 'Ambiance',
    shortAlt: 'Ambiance',
    category: 'Ambiance' as const,
    span: getSpan(i),
  })),

  // ── Barbiers (13 images) ──
  ...Array.from({ length: 13 }, (_, i) => {
    if (i === 0) {
      return [
        {
          src: `/images/gallery/Barbiers/Barbiers- (1).jpg`,
          alt: 'Barbiers',
          shortAlt: 'Barbiers',
          category: 'Barbiers' as const,
          span: getSpan(i),
        },
        {
          src: `/images/gallery/Barbiers/Barbiers- (1).png`,
          alt: 'Barbiers',
          shortAlt: 'Barbiers',
          category: 'Barbiers' as const,
          span: getSpan(i + 1),
        },
      ]
    }
    return {
      src: `/images/gallery/Barbiers/Barbiers- (${i + 12}).${i + 12 === 14 ? 'JPG' : 'jpg'}`,
      alt: 'Barbiers',
      shortAlt: 'Barbiers',
      category: 'Barbiers' as const,
      span: getSpan(i + 2),
    }
  }).flat(),

  // ── Outils (14 images) ──
  ...Array.from({ length: 14 }, (_, i) => {
    if (i === 0) {
      return [
        {
          src: `/images/gallery/Outils/Outils (1).jpg`,
          alt: 'Outils',
          shortAlt: 'Outils',
          category: 'Outils' as const,
          span: getSpan(i),
        },
        {
          src: `/images/gallery/Outils/Outils (1).png`,
          alt: 'Outils',
          shortAlt: 'Outils',
          category: 'Outils' as const,
          span: getSpan(i + 1),
        },
      ]
    }
    return {
      src: `/images/gallery/Outils/Outils (${i + 1}).jpg`,
      alt: 'Outils',
      shortAlt: 'Outils',
      category: 'Outils' as const,
      span: getSpan(i + 2),
    }
  }).flat(),

  // ── Produit (11 images) ──
  ...Array.from({ length: 11 }, (_, i) => {
    const extensions = [
      'jpeg',
      'jpg',
      'jpeg',
      'jpg',
      'jpg',
      'jpg',
      'JPG',
      'JPG',
      'JPG',
      'jpg',
      'JPG',
    ]
    return {
      src: `/images/gallery/Produit/Produit (${i + 1}).${extensions[i]}`,
      alt: 'Produit',
      shortAlt: 'Produit',
      category: 'Produit' as const,
      span: getSpan(i),
    }
  }),

  // ── Salon (26 images) ──
  ...Array.from({ length: 26 }, (_, i) => {
    const extensions = [
      'jpeg',
      'jpg',
      'png',
      'JPG',
      'JPG',
      'JPG',
      'jpg',
      'jpg',
      'JPG',
      'JPG',
      'JPG',
      'JPG',
      'jpg',
      'jpg',
      'jpg',
      'jpg',
      'jpg',
      'jpg',
      'jpg',
      'jpeg',
      'jpg',
      'jpeg',
      'jpg',
      'jpeg',
      'jpg',
      'jpeg',
      'jpg',
    ]
    if (i < 6) {
      return {
        src: `/images/gallery/Salon/Salon (${i + 1}).${extensions[i]}`,
        alt: 'Salon',
        shortAlt: 'Salon',
        category: 'Salon' as const,
        span: getSpan(i),
      }
    }
    return {
      src: `/images/gallery/Salon/Salon (${i + 3}).${extensions[i + 1] || 'jpg'}`,
      alt: 'Salon',
      shortAlt: 'Salon',
      category: 'Salon' as const,
      span: getSpan(i),
    }
  }),

  // ── Soins (14 images) ──
  ...Array.from({ length: 14 }, (_, i) => ({
    src: `/images/gallery/Soins/Soins (${i + 1}).jpg`,
    alt: 'Soins',
    shortAlt: 'Soins',
    category: 'Soins' as const,
    span: getSpan(i),
  })),
]

// ── Team Images ────────────────────────────────────────────────────────────

export const TEAM_IMAGES: TeamMemberImage[] = [
  {
    src: '/images/team/team-1.jpg',
    alt: 'Richard - Barbier expert',
    name: 'Richard',
    role: 'Barbier expert',
  },
  {
    src: '/images/team/team-2.jpg',
    alt: 'Maxime - Coiffeur styliste',
    name: 'Maxime',
    role: 'Coiffeur styliste',
  },
  {
    src: '/images/team/team-3.jpg',
    alt: 'Thomas - Spécialiste rasage',
    name: 'Thomas',
    role: 'Spécialiste rasage',
  },
]
