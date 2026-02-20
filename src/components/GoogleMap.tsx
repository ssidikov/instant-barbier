'use client'

import { useState } from 'react'
import { VIDEO } from '@/lib/images'

interface GoogleMapProps {
  address?: string
  className?: string
  hideLink?: boolean
}

export default function GoogleMap({
  address = '43 rue de Turenne, 75003 Paris',
  className = '',
  hideLink = false,
}: GoogleMapProps) {
  const [showVideo, setShowVideo] = useState(false)

  // Encode the address for URL usage
  const encodedAddress = encodeURIComponent(address)

  // Fallback: use the simpler place embed if the above doesn't work
  const fallbackSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  // Google Maps URL for opening in a new tab
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`

  return (
    <div className={className}>
      <div className='relative w-full h-full min-h-[280px] md:min-h-[400px] overflow-hidden group'>
        {/* Map View */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 z-1 ${
            showVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
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

        {/* 360 Video View */}
        <div
          className={`absolute inset-0 bg-navy transition-opacity duration-1000 z-2 ${
            showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
          {showVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className='absolute inset-0 w-full h-full object-cover cursor-move'>
              <source src={VIDEO.vrSalon.src} type={VIDEO.vrSalon.type} />
            </video>
          )}
          {/* Dark gradient overlay at bottom of video for button readability */}
          <div className='absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent pointer-events-none' />
        </div>

        {/* Overlay effect on map/video edges */}
        <div className='absolute inset-0 pointer-events-none border border-gold/10 z-10' />
        {/* Gold corner accents */}
        <div className='absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-gold/30 pointer-events-none z-10' />
        <div className='absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-gold/30 pointer-events-none z-10' />

        {/* Toggle Button */}
        <div className='absolute bottom-4 right-4 z-20'>
          <button
            onClick={() => setShowVideo(!showVideo)}
            className='group/btn relative flex items-center justify-center gap-2 overflow-hidden px-5 py-3 md:px-6 md:py-3.5 bg-navy/85 hover:bg-navy backdrop-blur-md border border-gold/40 hover:border-gold shadow-xl transition-all duration-300 touch-button touch-ripple touch-highlight'
            tabIndex={0}>
            {/* Button active glow */}
            <span className='absolute inset-0 bg-gold/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300' />
            <span className='absolute inset-0 border border-gold opacity-0 group-hover/btn:opacity-100 scale-105 group-hover/btn:scale-100 transition-all duration-500' />

            {showVideo ? (
              <>
                <svg
                  className='w-4 h-4 text-gold shrink-0 transition-transform group-hover/btn:-translate-x-1'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                  />
                </svg>
                <span className='text-gold text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold relative z-10'>
                  Voir la carte
                </span>
              </>
            ) : (
              <>
                <svg
                  className='w-4 h-4 text-gold shrink-0 animate-pulse'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
                  />
                </svg>
                <span className='text-gold text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold relative z-10'>
                  Visite 360° du Salon
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Link to open in Google Maps */}
      {!hideLink && (
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
      )}
    </div>
  )
}
