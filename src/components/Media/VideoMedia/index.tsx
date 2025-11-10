'use client'

import React, { useRef, useState } from 'react'

import Image from 'next/image'

import type { Media, VideoEmbed } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'

import type { Props as MediaProps } from '../types'
import { EmbeddedVideo } from './EmbeddedVideo'
import { PlayButton } from './PlayButton'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  if (!resource || typeof resource !== 'object') return null

  // CAS 3: EMBEDDED VIDEO (YouTube/Vimeo)
  if ('source' in resource && 'videoId' in resource) {
    // console.log('🎬 VideoEmbed détecté:', {
    //   type: 'VideoEmbed',
    //   source: resource.source,
    //   videoId: resource.videoId,
    //   title: resource.title,
    //   hasCustomThumbnail: !!resource.thumbnail,
    // })

    return <EmbeddedVideo embed={resource as VideoEmbed} className={videoClassName} />
  }

  // À ce stade, resource est forcément de type Media (uploaded video)
  const { filename, mimeType, videoPoster } = resource as Media

  // CAS 1: UPLOADED VIDEO WITH POSTER
  if (videoPoster && typeof videoPoster === 'object') {
    return (
      <div className={cn('group relative aspect-video rounded-xl', videoClassName)}>
        {!isPlaying ? (
          <>
            <div className="absolute inset-0 z-20 rounded-xl" onClick={() => setIsPlaying(true)}>
              <PlayButton className="rounded-xl" />
            </div>
            <Image
              src={getMediaUrl(`/api/media/file/${videoPoster.filename}`)}
              alt="Thumbnail vidéo"
              fill
              className="m-0! rounded-xl object-cover shadow-lg"
            />
          </>
        ) : (
          <video ref={videoRef} controls autoPlay className="w-full rounded-xl shadow-lg">
            <source src={getMediaUrl(`/api/media/file/${filename}`)} type={mimeType || undefined} />
          </video>
        )}
      </div>
    )
  }

  // CAS 2: UPLOADED VIDEO WITHOUT POSTER (fallback actuel préservé)
  return (
    <video
      ref={videoRef}
      autoPlay={false}
      controls={true}
      muted={false}
      onClick={onClick}
      playsInline
      className={cn(videoClassName)}
    >
      <source src={getMediaUrl(`/api/media/file/${filename}`)} />
    </video>
  )
}
