import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description:
    "Politique de confidentialité de L'Instant Barbier : traitement des données personnelles, cookies, droits RGPD et protection de votre vie privée.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ConfidentialiteLayout({ children }: { children: React.ReactNode }) {
  return children
}
