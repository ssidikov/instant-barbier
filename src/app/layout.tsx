import './globals.css'
import { Playfair_Display, Mulish } from 'next/font/google' // Note: Muli is now Mulish in Google Fonts

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const muli = Mulish({
  subsets: ['latin'],
  variable: '--font-muli',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fr' className={`${playfair.variable} ${muli.variable}`}>
      <head>
        <link href='https://fonts.cdnfonts.com/css/haarlem-deco-demo' rel='stylesheet' />
        <link href='https://fonts.cdnfonts.com/css/source-sans-pro-2' rel='stylesheet' />
      </head>
      <body className='bg-navy text-cream font-body antialiased flex flex-col min-h-screen'>
        {children}
      </body>
    </html>
  )
}
