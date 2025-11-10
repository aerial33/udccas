import React from 'react'

import type { StaticImageData } from 'next/image'

import RichText from '@/components/RichText'
import type { MediaBlock as MediaBlockProps, Media as MediaType, VideoEmbed } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    videoEmbed,
    staticImage,
    disableInnerContainer,
  } = props

  // Utiliser media OU videoEmbed selon ce qui est défini
  const selectedMedia = media || videoEmbed

  // Extraire resource depuis structure polymorphe
  const resource =
    selectedMedia && typeof selectedMedia === 'object' && 'value' in selectedMedia
      ? selectedMedia.value
      : selectedMedia

  let caption
  // Fonctionne pour Media et VideoEmbed (les deux ont un champ caption)
  if (resource && typeof resource === 'object')
    caption = (resource as MediaType | VideoEmbed).caption

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(resource || staticImage) && (
        <Media
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={resource as MediaType | VideoEmbed}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
