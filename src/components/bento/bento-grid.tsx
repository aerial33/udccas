import { ReactNode } from 'react'

import { CARD_LAYOUTS } from '@/blocks/Bento/layouts'
import type { BentoCardBlock, Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { Media } from '../Media'
import { Badge } from '../ui/badge'

const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn('grid w-full grid-cols-3 gap-4', className)}>{children}</div>
}

// Type d'une carte individuelle depuis PayloadCMS
type SingleCard = NonNullable<BentoCardBlock['cards']>[number]

// Extension du type PayloadCMS pour BentoCard
interface BentoCardProps extends Omit<SingleCard, 'id' | 'image'> {
  image?: string | number | MediaType | null // Media object, string ou number ID depuis PayloadCMS
  className?: string // Classes CSS Tailwind pour le design
  cardIndex?: number // Index de la card pour appliquer le layout correspondant
}

const BentoCard = ({
  title,
  className,
  image,
  description,
  link,
  tag,
  cardIndex = 0,
}: BentoCardProps) => {
  // Extraire href et label depuis la structure link PayloadCMS
  const href = link?.url
  const label = link?.label

  // Récupérer la configuration de layout pour cette card
  const layout = CARD_LAYOUTS[cardIndex] || CARD_LAYOUTS[0]

  // Rendu de l'image avec le layout configuré
  const imageElement = image && (
    <Media
      resource={image}
      alt={title || 'Image'}
      className={cn(layout?.imageWrapperClass)}
      loading="lazy"
    />
  )

  // Rendu du contenu texte
  const contentElement = (
    <div className={layout?.contentWrapperClass}>
      {tag && (
        <Badge variant="outline" className={layout?.badgeClass}>
          {tag}
        </Badge>
      )}
      <h3 className={layout?.titleClass}>{title}</h3>
      <p className={layout?.descriptionClass}>{description}</p>
      {/* {href && label && (
        <Link href={href} className={layout?.linkClass}>
          {`${label} →`}
        </Link>
      )} */}
    </div>
  )

  return (
    <div className={cn('relative col-span-4 h-full rounded-[40px] shadow-lg', className)}>
      <div className={layout?.cardInnerClass}>
        {/* Ordre des éléments selon la position de l'image */}
        {layout?.imagePosition === 'top' && imageElement}
        {layout?.imagePosition === 'left' && (
          <>
            {imageElement}
            {contentElement}
          </>
        )}
        {(layout?.imagePosition === 'bottom' ||
          layout?.imagePosition === 'right' ||
          layout?.imagePosition === 'absolute-top-right' ||
          layout?.imagePosition === 'background') && (
          <>
            {contentElement}
            {layout.imagePosition !== 'background' && imageElement}
          </>
        )}
      </div>
    </div>
  )
}

export { BentoCard, BentoGrid }
