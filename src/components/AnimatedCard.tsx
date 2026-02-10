'use client'

import { ReactNode } from 'react'

type AnimatedCardProps = {
  children: ReactNode
  className?: string
  delay?: number
  index?: number
}

/**
 * Composant carte statique avec hover CSS
 */
export default function AnimatedCard({ children, className = '' }: AnimatedCardProps) {
  return (
    <div
      className={`group relative ${className} transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.03]`}>
      {/* Glow effect on hover */}
      <div className='absolute -inset-0.5 bg-gradient-to-r from-gold/30 via-gold/10 to-gold/30 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500' />

      {/* Content */}
      <div className='relative'>{children}</div>
    </div>
  )
}
