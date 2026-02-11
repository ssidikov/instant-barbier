'use client'

type MaskedTextProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function MaskedText({ children, className = '' }: MaskedTextProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div>{children}</div>
    </div>
  )
}
