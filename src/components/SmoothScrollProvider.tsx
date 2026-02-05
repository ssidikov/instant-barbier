'use client'

// Native smooth scrolling provider - no external libraries needed
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Native CSS smooth scrolling is enabled via globals.css
  // No JavaScript library needed for performance
  return <>{children}</>
}
