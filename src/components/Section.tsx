'use client'

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
  animate?: boolean
  animationType?: 'fade-up' | 'fade-in' | 'scale'
  delay?: number
}

export default function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-24 ${className}`}>
      {children}
    </section>
  )
}
