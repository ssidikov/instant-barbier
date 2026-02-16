export default function SectionTitle({
  subtitle,
  title,
  className = '',
}: {
  subtitle?: string
  title: string
  className?: string
}) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {subtitle && (
        <div className='flex items-center justify-center gap-4 mb-4'>
          <span className='w-16 h-px bg-gradient-to-r from-transparent to-gold origin-right' />
          <span className='text-gold text-xs uppercase tracking-[0.3em]'>{subtitle}</span>
          <span className='w-16 h-px bg-gradient-to-r from-gold to-transparent origin-left' />
        </div>
      )}
      <h2 className='text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-title text-gold leading-tight tracking-[-2px] mb-6'>
        {title}
      </h2>
      <div className='mx-auto mt-6 w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent' />
    </div>
  )
}
