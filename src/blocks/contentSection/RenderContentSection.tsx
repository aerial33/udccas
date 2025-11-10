import React from 'react'

import type { ContentSectionBlock as ContentSectionBlockType } from '@/payload-types'

import { BasicContent } from './variants/BasicContent'
import { ContentWithImage } from './variants/ContentWithImage'
import { ImageGrid } from './variants/ImageGrid'
import { ContentSectionBlock as ContentWithCard } from './variants/contentWithCard/Component'

export const TextMediaSectionBlock: React.FC<ContentSectionBlockType> = (props) => {
  const { variant } = props

  // console.log('RenderContentSection - Props:', props)
  // console.log('RenderContentSection - Variant:', variant)

  const variants: Record<string, React.FC<any>> = {
    basicContent: BasicContent,
    contentWithImage: ContentWithImage,
    contentWithGallery: ImageGrid,
    contentWithCard: ContentWithCard,
  }

  const VariantComponent = variants[variant] || BasicContent
  return <VariantComponent {...props} />
}

export default TextMediaSectionBlock
