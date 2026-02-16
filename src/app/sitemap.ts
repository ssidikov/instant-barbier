import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  // Static routes
  const routes = [
    '',
    '/salon',
    '/prestations',
    '/galerie',
    '/contact',
    '/reservation',
    '/legal',
    '/confidentialite',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === '' || route === '/reservation' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : route === '/reservation' ? 0.9 : 0.8,
  }))

  return routes
}
