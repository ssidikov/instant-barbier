import '@/app/globals.css'
import { Playfair_Display, Mulish } from 'next/font/google'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import ScrollToTop from '@/components/ScrollToTop'
import CookieConsent from '@/components/CookieConsent'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, CONTACT, SOCIAL } from '@/lib/constants'
import { Analytics } from '@vercel/analytics/next'

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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Barbier & Coiffeur Homme à Paris 3ᵉ`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Barbier & Coiffeur Homme à Paris 3ᵉ`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Barbier & Coiffeur Paris Marais`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Barbier & Coiffeur Homme à Paris 3ᵉ`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icons/favicon.png',
    shortcut: '/icons/favicon.png',
    apple: '/icons/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Schema.org structured data
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/favicon.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description:
      'Barbier et coiffeur homme à Paris 3ᵉ, au cœur du Marais. Coupes, barbes, soins premium.',
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '43 rue de Turenne',
      addressLocality: 'Paris',
      postalCode: '75003',
      addressCountry: 'FR',
      addressRegion: 'Île-de-France',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8606,
      longitude: 2.3632,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '20:00',
      },
    ],
    priceRange: '€€',
    sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.tiktok],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const schemas = [localBusinessSchema, websiteSchema]

  return (
    <html lang='fr' className={`${playfair.variable} ${mulish.variable}`}>
      <head>
        <link rel='preconnect' href='https://widget.planity.com' />
        <link rel='dns-prefetch' href='https://widget.planity.com' />
      </head>
      <body className='bg-navy text-cream font-body antialiased flex flex-col min-h-screen'>
        <ScrollToTop />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        <Header />
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  )
}
