import React, { Fragment } from 'react'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'
import type { Props } from './types'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  // Détecter vidéo uploadée (mimeType) ou embed (source + videoId)
  const isVideo =
    typeof resource === 'object' &&
    resource !== null &&
    (('mimeType' in resource && resource.mimeType?.includes('video')) ||
      ('source' in resource && 'videoId' in resource))
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
