import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-dark py-12 border-t border-white/5'>
      <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6'>
        <div className='text-center md:text-left'>
          <h3 className='text-gold font-title text-xl mb-2'>L&apos;Instant Barbier</h3>
          <p className='text-sm text-gray-400'>
            © {new Date().getFullYear()}. Tous droits réservés.
          </p>
        </div>

        <nav className='flex gap-6'>
          <Link
            href='/legal'
            className='text-xs uppercase tracking-widest text-gray-500 hover:text-gold transition-colors'>
            Mentions Légales
          </Link>
          <Link
            href='/contact'
            className='text-xs uppercase tracking-widest text-gray-500 hover:text-gold transition-colors'>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
