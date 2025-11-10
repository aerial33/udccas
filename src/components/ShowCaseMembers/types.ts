import type { Membre } from '@/payload-types'

// Type partiel pour l'affichage showcase (uniquement les champs nécessaires)
export type MembreShowcase = Pick<
  Membre,
  'id' | 'name' | 'slug' | 'logo' | 'adresse' | 'informations' | 'publishedAt' | 'coordinates'
>

export interface MembreCardProps {
  membre: MembreShowcase
}

export interface MembreShowcaseProps {
  membres: MembreShowcase[]
  totalDocs?: number
}
