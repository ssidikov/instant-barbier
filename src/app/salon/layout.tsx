import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Le Salon',
  description:
    "Découvrez L'Instant Barbier : notre histoire, notre équipe de barbiers passionnés et l'ambiance chaleureuse de notre salon au cœur du Marais, Paris 3ᵉ.",
  openGraph: {
    title: "Le Salon — L'Instant Barbier",
    description:
      "Découvrez notre équipe de barbiers passionnés et l'ambiance de notre salon au cœur du Marais.",
  },
}

export default function SalonLayout({ children }: { children: React.ReactNode }) {
  return children
}
