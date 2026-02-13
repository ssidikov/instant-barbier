'use client'

interface GoogleMapProps {
  address?: string
  className?: string
}

export default function GoogleMap({
  address = '43 rue de Turenne, 75003 Paris',
  className = '',
}: GoogleMapProps) {
  // Encode the address for URL usage
  const encodedAddress = encodeURIComponent(address)

  // Use Google Maps embed URL — no API key required for basic embeds
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.7!2d2.3622!3d48.8606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e18a5f84801%3A0x6eb5daa624bdebd4!2s43%20Rue%20de%20Turenne%2C%2075003%20Paris!5e0!3m2!1sfr!2sfr!4v1`

  // Fallback: use the simpler place embed if the above doesn't work
  const fallbackSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  // Google Maps URL for opening in a new tab
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`

  return (
    <div className={className}>
      <div className='relative'>
        <div className='w-full h-full min-h-[280px] md:min-h-[400px] relative overflow-hidden'>
          {/* Dark overlay tint to blend with site aesthetic */}
          <div className='absolute inset-0 pointer-events-none z-10 mix-blend-multiply bg-[#07181e]/30' />

          <iframe
            src={fallbackSrc}
            width='100%'
            height='100%'
            style={{
              border: 0,
              filter: 'saturate(0.7) brightness(0.85) contrast(1.1) hue-rotate(10deg)',
              minHeight: '280px',
            }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title={`Google Maps - ${address}`}
            className='w-full h-full absolute inset-0'
          />
        </div>
        {/* Corner accents */}
        <div className='absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20 pointer-events-none z-20' />
        <div className='absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20 pointer-events-none z-20' />
      </div>

      {/* Link to open in Google Maps */}
      <div className='mt-4 text-center'>
        <a
          href={googleMapsUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 text-gold text-sm uppercase tracking-widest hover:text-cream transition-colors group touch-link'>
          Ouvrir sur Google Maps
          <span className='transition-transform group-hover:translate-x-1'>→</span>
        </a>
      </div>
    </div>
  )
}
