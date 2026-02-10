import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réservation',
  description:
    'Réservez votre rendez-vous en ligne chez L\'Instant Barbier. Choisissez votre prestation, votre barbier et votre créneau horaire en quelques clics.',
  openGraph: {
    title: 'Réservation — L\'Instant Barbier',
    description:
      'Réservez votre rendez-vous en ligne chez L\'Instant Barbier en quelques clics.',
  },
}

export default function ReservationLayout({ children }: { children: React.ReactNode }) {
  return children
}
