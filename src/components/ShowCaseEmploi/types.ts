import type { Media } from '@/payload-types'

// Type simplifié unique pour tous les emplois
export interface EmploiItem {
  id: number
  title: string
  slug?: string | null
  publishedAt?: string | null
  image?: (number | null) | Media
  organisme?: {
    nom?: string | null
    lieu?: string | null
  }
  typeContrat?: 'cdi' | 'cdd' | null
  workTime?: 'full-time' | 'part-time' | 'flexible' | null
  statusOffre?: 'active' | 'filled' | 'expired' | null
  datePourvoir?: string | null
  meta?: {
    description?: string | null
  }
}

// Props pour les composants
export type EmploiGridProps = {
  heading?: string
  subheading?: string
  badgeText?: string
  emplois: EmploiItem[]
}

export type EmploiListProps = {
  limit?: number
  heading?: string
  subheading?: string
  badgeText?: string
}

export type EmploiShowcaseProps = {
  emplois: EmploiItem[]
  totalDocs?: number
}

// Types from FAQSection.tsx
export type FAQItem = {
  question: string
  answer: string
}

// Types from TestimonialSection.tsx
export type TestimonialItem = {
  quote: string
  name: string
  role: string
  age?: number
}

// Types for MediaDisplay component
export type PostFeaturedMediaProps = {
  className?: string
  postType?: 'standard' | 'video' | 'audio' | 'gallery'
  imageUrl?: string | null
  imageAlt?: string
  videoUrl?: string
  audioUrl?: string
  galleryImgs?: string[]
  isHover?: boolean
}
