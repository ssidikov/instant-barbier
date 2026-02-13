type ButtonProps = {
  children: React.ReactNode
  href?: string
  className?: string
}

export default function Button({ children, href, className = '' }: ButtonProps) {
  return (
    <a
      href={href}
      className={`group relative inline-block overflow-hidden touch-button touch-ripple touch-glow touch-highlight ${className}`}>
      {/* Liquid glass backdrop */}
      <span className='absolute inset-0 bg-gradient-to-br from-navy/40 via-navy/30 to-navy/40 backdrop-blur-md border border-gold/30 rounded-sm' />

      {/* Glow effect layer */}
      <span className='absolute -inset-1 bg-gold/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse' />

      {/* Background layers - adjusted for glass effect */}
      <span className='absolute inset-0 bg-navy/80 border-2 border-gold transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(156,131,88,0.4)] backdrop-blur-sm' />
      <span className='absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out' />

      {/* Shimmer effect */}
      <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-100' />

      {/* Animated border glow */}
      <span className='absolute inset-0 border-2 border-gold/50 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-700' />

      {/* Text */}
      <span className='relative block px-10 py-5 md:px-6 md:py-4 text-gold group-hover:text-navy uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm font-semibold transition-all duration-300'>
        {children}
      </span>

      {/* Corner accents with animation */}
      <span className='absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500' />
      <span className='absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500' />
    </a>
  )
}
