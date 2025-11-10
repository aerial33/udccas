import type { Page, Post } from '@/payload-types'

type LinkType = {
  type?: 'custom' | 'reference' | null
  url?: string | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
}

/**
 * Generates the href for a link, handling both internal references and external URLs
 * @param link - The link object from Payload CMS
 * @returns The generated href string
 */
export const getLinkHref = (link: LinkType): string => {
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value.slug
  ) {
    const { relationTo, value } = link.reference
    const slug = value.slug
    const basePath = relationTo !== 'pages' ? `/${relationTo}` : ''
    return `${basePath}/${slug}`
  }
  return link.url || ''
}
