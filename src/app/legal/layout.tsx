import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description:
    "Mentions légales de L'Instant Barbier : informations sur l'éditeur, l'hébergeur, la propriété intellectuelle et les conditions d'utilisation du site.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return children
}
