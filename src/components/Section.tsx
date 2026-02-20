import { forwardRef } from 'react'

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

const Section = forwardRef<HTMLElement, SectionProps>(({ children, className = '', id }, ref) => {
  return (
    <section ref={ref} id={id} className={`py-16 md:py-20 lg:py-24 ${className}`}>
      {children}
    </section>
  )
})

Section.displayName = 'Section'

export default Section
