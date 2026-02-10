import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Accès',
  description:
    "Contactez L'Instant Barbier : adresse, téléphone, horaires et itinéraire. Salon de coiffure pour homme situé au 25 Rue du Pont aux Choux, Paris 3ᵉ.",
  openGraph: {
    title: "Contact & Accès — L'Instant Barbier",
    description:
      "Contactez L'Instant Barbier : adresse, téléphone, horaires et itinéraire à Paris 3ᵉ.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
