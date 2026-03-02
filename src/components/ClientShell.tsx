'use client'

import dynamic from 'next/dynamic'

/**
 * Client-side shell for components that only need to render on the client.
 * Uses dynamic imports with ssr: false to avoid shipping their JS in the
 * initial server-rendered HTML, reducing First Load JS.
 */
const PageLoader = dynamic(() => import('./PageLoader'), { ssr: false })
const CookieConsent = dynamic(() => import('./CookieConsent'), { ssr: false })

export function ClientPageLoader() {
  return <PageLoader />
}

export function ClientCookieConsent() {
  return <CookieConsent />
}
