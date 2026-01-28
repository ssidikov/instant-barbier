type ButtonProps = {
  children: React.ReactNode
  href?: string
}

export default function Button({ children, href }: ButtonProps) {
  return (
    <a href={href} className='group relative inline-block overflow-hidden'>
      {/* Background layers */}
      <span className='absolute inset-0 bg-navy border-2 border-gold transition-all duration-500 group-hover:scale-105' />
      <span className='absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500' />

      {/* Shimmer effect */}
      <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />

      {/* Text */}
      <span className='relative block px-8 py-4 text-gold group-hover:text-navy uppercase tracking-[0.25em] text-xs font-semibold transition-colors duration-300'>
        {children}
      </span>

      {/* Corner accents */}
      <span className='absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      <span className='absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
    </a>
  )
}
