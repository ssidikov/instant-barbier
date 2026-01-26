import Link from 'next/link'
import Button from './Button'

export default function Header() {
  const navItems = [
    { label: 'Le Salon', href: '/salon' },
    { label: 'Prestations', href: '/prestations' },
    { label: 'Galerie', href: '/galerie' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className='fixed w-full top-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10'>
      <div className='max-w-6xl mx-auto px-6 h-20 flex items-center justify-between'>
        {/* Logo / Brand Name */}
        <Link href='/' className='font-title text-2xl text-gold tracking-wider'>
          L&apos;INSTANT BARBIER
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-8'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm uppercase tracking-widest text-cream hover:text-gold transition-colors'>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className='hidden md:block'>
          <Button href='https://www.planity.com/linstant-barbier'>Prendre rendez-vous</Button>
        </div>

        {/* Mobile Menu Icon (Placeholder for future implementation if needed, adhering to check "Minimal navigation") */}
      </div>
    </header>
  )
}
