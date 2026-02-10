export const SITE_NAME = "L'Instant Barbier"
export const SITE_URL = 'https://www.linstantbarbier.fr'
export const SITE_DESCRIPTION =
  "L'Instant Barbier — Barbier et coiffeur homme à Paris 3ᵉ, au cœur du Marais. Coupes, barbes, soins premium."

export const PLANITY_URL = 'https://www.planity.com/linstant-barbier'
export const PLANITY_KEY = process.env.NEXT_PUBLIC_PLANITY_KEY || '-NqgBt5OTqKdrZpwAY1y'

export const CONTACT = {
  phone: '01 45 35 47 22',
  phoneHref: 'tel:+33145354722',
  email: 'linstantbarbier@gmail.com',
  address: '43 rue de Turenne, 75003 Paris, France',
  addressShort: '43 rue de Turenne',
  city: '75003 Paris, France',
  mapsUrl: 'https://maps.google.com/?q=43+rue+de+Turenne+75003+Paris',
} as const

export const SOCIAL = {
  instagram: 'https://www.instagram.com/linstantbarbier/',
  facebook: '#',
  x: '#',
} as const
