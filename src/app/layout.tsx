import '@/app/globals.css'
import { Playfair_Display, Mulish } from 'next/font/google'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import CookieConsent from '@/components/CookieConsent'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-muli',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Barbier & Coiffeur Homme à Paris 3ᵉ`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'barbier Paris',
    'coiffeur homme Paris',
    'barbier Marais',
    'salon coiffure homme Paris 3',
    'barbe Paris',
    "L'Instant Barbier",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Barbier & Coiffeur Homme à Paris 3ᵉ`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fr' className={`${playfair.variable} ${mulish.variable}`}>
      <body className='bg-navy text-cream font-body antialiased flex flex-col min-h-screen'>
        <Header />
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
