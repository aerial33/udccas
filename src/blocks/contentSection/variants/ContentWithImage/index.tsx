import { RichText } from '@payloadcms/richtext-lexical/react'

// import type { ContentWithImage as ContentWithImageProps } from '@/payload-types'
import { DotPattern } from '@/components/DotPattern'
import { Media as MediaComponent } from '@/components/Media'
import { FadeUp } from '@/components/motion/animations'
import { ContentSectionBlock } from '@/payload-types'
import { getPopulatedImageData } from '@/utilities/isImagePopulated'

export const ContentWithImage: React.FC<ContentSectionBlock> = (props) => {
  const { content, singleImage, imagePosition } = props

  // Récupérer l'image unique
  const firstImage = singleImage?.image

  // Vérifier si l'image est un objet Media complet ou juste un ID
  const imageData = getPopulatedImageData(firstImage)

  // Composant pour afficher l'image
  const ImageComponent = () => {
    if (!imageData?.url) {
      return (
        <div className="flex h-64 w-full items-center justify-center bg-gray-200">
          <span className="text-gray-500">Image non disponible</span>
        </div>
      )
    }

    return (
      <div className="relative overflow-visible rounded-3xl shadow-lg">
        {/* <Image
          src={imageData.url}
          alt={imageData.alt || 'Image'}
          width={imageData.width || 800}
          height={imageData.height || 600}
          className="h-auto w-full object-cover"
          priority // Si c'est une image importante
        /> */}
        <MediaComponent resource={imageData} imgClassName="rounded-3xl" />
        <DotPattern dotColor="bg-blue-base" className="-right-5 -bottom-20 -z-10 hidden md:flex" />
      </div>
    )
  }

  // Composant pour le contenu texte
  const ContentComponent = () => (
    <div className="richtext-content [&_p]:lg:text-muted-foreground flex min-w-[250px] flex-col gap-4 text-gray-500 [&_h2]:mb-4 [&_h2]:text-gray-700 [&_h3]:text-gray-600 [&_p]:text-xl">
      {content && <RichText className="m-0" data={content} />}
    </div>
  )

  return (
    <FadeUp
      delay={0.5}
      className={`container flex flex-col gap-8 py-8 md:items-center md:justify-center xl:pb-16 ${imagePosition === 'Gauche' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
    >
      <div className="lg:w-1/2">
        <ContentComponent />
      </div>
      <div className="lg:w-1/2">
        <ImageComponent />
      </div>
    </FadeUp>
  )
}
