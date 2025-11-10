'use client'

import { FC } from 'react'

import MediaIcon, { MediaIconType } from '@/components/FeaturedMedia/MediaIcon'
import { Media as MediaComponent } from '@/components/Media'

import MediaVideoEmploi from './MediaVideoEmploi'
import type { EmploiItem } from './types'

export interface MediaDisplayEmploiProps {
  className?: string
  emploi: EmploiItem
  isHover?: boolean
}

const MediaDisplayEmploi: FC<MediaDisplayEmploiProps> = ({
  className = 'w-full h-full',
  emploi,
  isHover = false,
}) => {
  const { image } = emploi

  // Vérifier si image est un objet Media complet
  const isImagePopulated = image && typeof image === 'object' && 'url' in image

  // Vérifier si c'est une vidéo
  const isVideo =
    image &&
    typeof image === 'object' &&
    'mimeType' in image &&
    image.mimeType?.includes('video')

  // Vérifier si c'est une galerie (pour l'instant, on ne gère que les images simples)
  const isGallery = false // À implémenter si nécessaire

  // Déterminer le type de média
  const getMediaType = (): 'standard' | 'video' | 'audio' | 'gallery' => {
    if (isVideo) return 'video'
    if (isGallery) return 'gallery'
    return 'standard'
  }

  const mediaType = getMediaType()

  const getMediaIconType = (): MediaIconType | undefined => {
    if (mediaType === 'video' || mediaType === 'audio' || mediaType === 'gallery') {
      return mediaType as MediaIconType
    }
    return undefined
  }

  const renderContent = () => {
    // VIDEO - Affichage de la vidéo au hover
    if (mediaType === 'video' && isVideo && isHover) {
      return (
        <MediaVideoEmploi
          resource={image}
          isHover={isHover}
          className="absolute inset-0 z-20"
        />
      )
    }

    // ICON pour les vidéos (quand pas en hover) - Icône de lecture superposée
    if (mediaType === 'video' && !isHover) {
      return (
        <span className="absolute inset-0 z-10 flex items-center justify-center">
          <MediaIcon
            className="transform cursor-pointer transition-transform hover:scale-105"
            iconType="video"
          />
        </span>
      )
    }

    return null
  }

  // Si pas de média, afficher un placeholder
  if (!isImagePopulated && !isVideo) {
    return (
      <div className={`relative flex items-center justify-center bg-gray-200 ${className}`}>
        <span className="text-sm text-gray-500">Aucune image</span>
      </div>
    )
  }

  return (
    <div className={`nc-MediaDisplayEmploi relative ${className}`}>
      {/* Image de fond - TOUJOURS affichée (même pour les vidéos comme image de présentation) */}
      {mediaType !== 'gallery' && isImagePopulated && (
        <MediaComponent resource={image} fill className="object-cover" />
      )}

      {/* Contenu superposé (vidéo, icônes, etc.) */}
      {renderContent()}

      {/* Overlay pour les images standard */}
      {mediaType === 'standard' && (
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
      )}

      {/* Overlay pour les vidéos (quand pas en hover) */}
      {mediaType === 'video' && !isHover && (
        <div className="absolute inset-0 bg-black/30 transition-opacity" />
      )}
    </div>
  )
}

export default MediaDisplayEmploi
