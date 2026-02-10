'use client'

import { ReactNode } from 'react'
import { TYPOGRAPHY } from '@/styles/typography'

type AnimatedHeadingProps = {
  children: ReactNode
  level?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
  centered?: boolean
}

/**
 * Composant titre statique (anciennement animé)
 */
export default function AnimatedHeading({
  children,
  level = 'h2',
  className = '',
  centered = false,
}: AnimatedHeadingProps) {
  const Tag = level

  const typographyClasses = {
    h1: TYPOGRAPHY.h1,
    h2: TYPOGRAPHY.h2,
    h3: TYPOGRAPHY.h2,
  }

  return (
    <div className={`relative ${centered ? 'text-center' : ''}`}>
      <div>
        <Tag className={`${typographyClasses[level]} ${className}`}>{children}</Tag>
      </div>

      {/* Decorative underline */}
      <div
        className={`h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mt-6 ${centered ? 'mx-auto w-32' : 'w-24'}`}
      />
    </div>
  )
}
