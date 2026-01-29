type ButtonLightProps = {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
}

export default function ButtonLight({
  children,
  href,
  variant = 'primary',
}: ButtonLightProps) {
  const isPrimary = variant === 'primary'

  return (
    <a href={href} className='group relative inline-block overflow-hidden'>
      {/* Background layers */}
      <span
        className={`absolute inset-0 border-2 transition-all duration-500 group-hover:scale-105 ${
          isPrimary
            ? 'bg-navy-light border-navy-light'
            : 'bg-transparent border-navy-light'
        }`}
      />
      <span
        className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${
          isPrimary ? 'bg-gold' : 'bg-navy-light'
        }`}
      />

      {/* Shimmer effect */}
      <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />

      {/* Text */}
      <span
        className={`relative block px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold transition-colors duration-300 ${
          isPrimary
            ? 'text-cream group-hover:text-navy-light'
            : 'text-navy-light group-hover:text-cream'
        }`}>
        {children}
      </span>

      {/* Corner accents */}
      <span
        className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isPrimary ? 'border-gold' : 'border-navy-light'
        }`}
      />
      <span
        className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isPrimary ? 'border-gold' : 'border-navy-light'
        }`}
      />
    </a>
  )
}
