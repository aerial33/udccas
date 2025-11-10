import { RichText } from '@payloadcms/richtext-lexical/react'

import { Media as MediaComponent } from '@/components/Media'
// import type { ContentWithImage as ContentWithImageProps } from '@/payload-types'
import { ContentSectionBlock } from '@/payload-types'
import { getPopulatedImageData } from '@/utilities/isImagePopulated'

export const ImageGrid: React.FC<ContentSectionBlock> = (props) => {
  const { content, multipleImages, imagePosition, features } = props

  // Composant pour afficher une icône
  const IconComponent = ({ icon }: { icon: any }) => {
    if (!icon?.image) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200">
          <span className="text-gray-400">?</span>
        </div>
      )
    }

    const iconData = getPopulatedImageData(icon.image)
    if (!iconData?.url) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200">
          <span className="text-gray-400">?</span>
        </div>
      )
    }

    // Si l'icône est un SVG, utiliser un masque CSS pour pouvoir changer la couleur
    if (iconData?.mimeType?.includes('svg')) {
      return (
        <div
          className="text-primary-light h-8 w-8"
          style={{
            backgroundColor: 'currentColor',
            WebkitMaskImage: `url(${iconData.url})`,
            maskImage: `url(${iconData.url})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
          aria-label={icon.alt || 'Icône'}
        />
      )
    }

    return (
      <div className="flex h-8 w-8 items-center justify-center">
        <MediaComponent
          resource={iconData}
          alt={icon.alt || 'Icône'}
          htmlElement={null}
          pictureClassName="w-full"
          imgClassName="h-full w-full object-contain"
        />
      </div>
    )
  }

  // Composant pour afficher la grille d'images
  const ImageGridComponent = () => {
    if (!multipleImages || multipleImages.length === 0) {
      return (
        <div className="flex h-64 w-full items-center justify-center rounded-xl bg-gray-200">
          <span className="text-gray-500">Aucune image disponible</span>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {multipleImages.map((imageItem, index) => {
          const imageData = getPopulatedImageData(imageItem.image)

          if (!imageData?.url) {
            return (
              <div
                key={index}
                className={`flex w-full items-center justify-center rounded-lg bg-gray-200 ${
                  index === 0 ? 'h-64 md:col-span-2' : 'h-48'
                }`}
              >
                <span className="text-gray-500">Image non disponible</span>
              </div>
            )
          }

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl ${
                index === 0 ? 'aspect-video md:mx-5 lg:col-span-2' : 'w-full'
              }`}
            >
              <MediaComponent
                className="aspect-video h-auto w-full rounded-xl border lg:aspect-square"
                imgClassName="object-cover"
                fill
                resource={imageData}
              />
            </div>
          )
        })}
      </div>
    )
  }

  // Composant pour le contenu texte
  const ContentComponent = () => (
    <div className="richtext-content flex min-w-[250px] flex-col gap-4">
      {content && <RichText className="m-0 [&_h2]:mb-4" data={content} />}

      {/* Fonctionnalités avec icônes */}
      {features && features.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <IconComponent icon={feature.icon} />
              <div>
                <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div
      className={`container flex flex-col gap-8 py-20 md:justify-center ${imagePosition === 'Gauche' ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      {/* Contenu texte en premier */}
      <div className="w-full">
        <ContentComponent />
      </div>

      {/* Grille d'images en dessous */}
      <div className="w-full">
        <ImageGridComponent />
      </div>
    </div>
  )
}
