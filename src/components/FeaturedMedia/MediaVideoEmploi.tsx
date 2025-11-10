'use client'

import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'

import { FC, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import LoadingVideo from '@/components/FeaturedMedia/LoadingVideo'
import type { Media } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'

export interface MediaVideoEmploiProps {
  resource: Media | string | null
  isHover: boolean
  className?: string
}

const MediaVideoEmploi: FC<MediaVideoEmploiProps> = ({ resource, isHover, className = '' }) => {
  const [isMuted, setIsMuted] = useState(true)
  const [showDescUnmuted, setShowDescUnmuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Démarrer la vidéo quand on commence à hover
  useEffect(() => {
    if (isHover) {
      // Réinitialiser l'état d'erreur
      setHasError(false)

      // Petit délai pour éviter les interruptions
      const startTimer = setTimeout(() => {
        setIsPlaying(true)
      }, 100)

      // Masquer le message après 2.5 secondes
      const messageTimer = setTimeout(() => {
        setShowDescUnmuted(false)
      }, 2500)

      return () => {
        clearTimeout(startTimer)
        clearTimeout(messageTimer)
      }
    } else {
      setIsPlaying(false)
      setShowDescUnmuted(true)
    }
  }, [isHover])

  // Gestion des erreurs de lecture
  const handleError = () => {
    setHasError(true)
    setIsPlaying(false)
  }

  // Déterminer l'URL de la vidéo
  const getVideoUrl = () => {
    if (!resource) return ''

    if (typeof resource === 'string') {
      return resource
    }

    if (typeof resource === 'object' && resource?.filename) {
      return `${getClientSideURL()}/api/media/file/${resource.filename}`
    }

    return ''
  }

  const videoUrl = getVideoUrl()

  // Si pas de vidéo ou erreur, ne rien afficher
  if (!videoUrl || hasError) {
    return null
  }

  return (
    <div className={`relative ${className}`}>
      <ReactPlayer
        src={videoUrl}
        muted={isMuted}
        playing={isHover && !hasError}
        style={{
          opacity: isPlaying ? 1 : 0,
        }}
        className={`absolute inset-0 bg-neutral-900 transition-opacity`}
        width="100%"
        height="100%"
        controls={false}
        loop={true}
        onError={handleError}
      />
      <div
        className={`${
          isPlaying ? 'opacity-0' : 'opacity-100'
        } absolute inset-0 flex items-center justify-center bg-neutral-900/30 transition-opacity`}
      >
        <LoadingVideo />
      </div>
      {isPlaying && (
        <div
          className={`bg-opacity-70 absolute start-2 bottom-2 z-20 flex h-6 transform items-center justify-center rounded-full bg-black text-sm text-white transition-transform ${
            showDescUnmuted ? 'ps-[6px] pe-2' : 'w-6 hover:scale-125'
          }`}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <>
              <SpeakerXMarkIcon className="h-3.5 w-3.5" />
              {showDescUnmuted && (
                <span className="ms-1 inline-block text-[9px]">Cliquez pour activer le son</span>
              )}
            </>
          ) : (
            <SpeakerWaveIcon className="h-3.5 w-3.5" />
          )}
        </div>
      )}
    </div>
  )
}

export default MediaVideoEmploi
