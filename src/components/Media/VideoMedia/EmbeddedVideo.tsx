'use client'

import React, { Fragment, useState } from 'react'

import Image from 'next/image'

import type { VideoEmbed } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'

import { PlayButton } from './PlayButton'

interface EmbeddedVideoProps {
  embed: VideoEmbed
  className?: string
}

// Génère URL iframe selon source
const getEmbedUrl = (source: 'youtube' | 'vimeo', videoId: string): string => {
  if (source === 'youtube') {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
  }
  return `https://player.vimeo.com/video/${videoId}?autoplay=1`
}

export const EmbeddedVideo: React.FC<EmbeddedVideoProps> = ({ embed, className }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!embed.videoId) return null

  const { source, videoId, thumbnail, alt } = embed

  // Déterminer thumbnail
  let thumbnailSrc: string | null = null

  if (thumbnail && typeof thumbnail === 'object') {
    // Custom thumbnail
    thumbnailSrc = getMediaUrl(`/api/media/file/${thumbnail.filename}`)
  } else if (source === 'youtube') {
    // YouTube: thumbnail auto
    thumbnailSrc = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
  // Vimeo sans custom thumbnail: pas de poster (iframe direct)

  const embedUrl = getEmbedUrl(source, videoId)

  // Cas Vimeo sans thumbnail: iframe direct
  if (!thumbnailSrc) {
    return (
      <div className={cn('group relative my-4 aspect-video rounded-xl border-2', className)}>
        <iframe
          src={embedUrl.replace('autoplay=1', 'autoplay=0')}
          className="mt-4 h-full w-full rounded-xl shadow-lg"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={alt || `Vidéo ${source}`}
        />
      </div>
    )
  }

  // Cas avec thumbnail (YouTube auto ou custom)
  return (
    <div className={cn('group relative my-8 aspect-video rounded-xl', className)}>
      {!isPlaying ? (
        <Fragment>
          <div className="absolute inset-0 z-20 rounded-xl" onClick={() => setIsPlaying(true)}>
            <PlayButton className="rounded-xl" />
          </div>
          <Image
            src={thumbnailSrc}
            alt={alt || `Vidéo ${source}`}
            fill
            className="m-0! rounded-xl object-cover shadow-lg"
          />
        </Fragment>
      ) : (
        <iframe
          src={embedUrl}
          className="h-full w-full rounded-xl shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={alt || `Vidéo ${source}`}
        />
      )}
    </div>
  )
}
