'use client'

/**
 * Root loading boundary — enables streaming SSR.
 * Next.js wraps the page in <Suspense fallback={<Loading/>}>
 * so the shell (layout) ships immediately while page content streams in.
 *
 * We keep this minimal to avoid layout shift — just a full-height
 * element that matches the page background color.
 */
export default function Loading() {
  return <div className='min-h-screen bg-navy' aria-busy='true' aria-label='Chargement…' />
}
