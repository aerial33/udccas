import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType, VideoEmbed } from '@/payload-types'

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  pictureClassName?: string
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  priority?: boolean // for NextImage only
  quality?: number // for NextImage only (default: 100)
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | VideoEmbed | string | number | null // for Payload media (upload ou embed)
  size?: string // for NextImage only
  src?: StaticImageData // for static media
  videoClassName?: string
}
