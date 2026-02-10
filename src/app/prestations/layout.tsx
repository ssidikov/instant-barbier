import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Prestations',
  description:
    "Découvrez nos prestations : coupes homme, taille de barbe, rasage traditionnel, soins capillaires et forfaits complets chez L'Instant Barbier, Paris 3ᵉ.",
  openGraph: {
    title: "Nos Prestations — L'Instant Barbier",
    description:
      "Coupes homme, taille de barbe, rasage traditionnel et soins capillaires chez L'Instant Barbier.",
  },
}

export default function PrestationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
