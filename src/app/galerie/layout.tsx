import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    'Découvrez notre galerie photo : coupes, dégradés, barbes taillées et l\'ambiance unique de L\'Instant Barbier, salon de coiffure pour homme à Paris 3ᵉ.',
  openGraph: {
    title: 'Galerie — L\'Instant Barbier',
    description:
      'Découvrez notre galerie photo : coupes, dégradés, barbes taillées et l\'ambiance unique de L\'Instant Barbier.',
  },
}

export default function GalerieLayout({ children }: { children: React.ReactNode }) {
  return children
}
