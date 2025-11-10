import { ArrowRight } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Type pour les éléments à afficher
export type FeatureGridItem = {
  id: number | string
  image?: string
  titre: string
  date?: string
  description: string
  objectPosition?: string
  link?: string
}

// Props du composant
export interface FeatureGridProps {
  title: string
  subtitle: string
  badgeText?: string
  buttonText: string
  buttonLink?: string
  items: FeatureGridItem[]
  maxItems?: number
  columns?: 2 | 3 | 4
}

function FeatureGrid({
  title,
  subtitle,
  badgeText,
  buttonText,
  buttonLink = '#',
  items,
  maxItems = 6,
  columns = 3,
}: FeatureGridProps) {
  // Limiter le nombre d'éléments affichés
  const displayedItems = items.slice(0, maxItems)

  // Déterminer le nombre de colonnes pour différentes tailles d'écran
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'md:grid-cols-2'
      case 4:
        return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      case 3:
      default:
        return 'md:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 xl:ps-0">
      <div className="h-full w-full px-6 xl:px-0">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start gap-4">
            <div>
              {badgeText && (
                <Badge variant={'outline'} className="text-md mb-4 border-gray-700">
                  {badgeText}
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h2>{title}</h2>
              <p className="text-muted-foreground max-w-xl text-left text-xl leading-relaxed tracking-tight">
                {subtitle}
              </p>
            </div>
            {buttonText && buttonLink && (
              <Link href={buttonLink}>
                <Button className="group my-6">
                  {buttonText}{' '}
                  <ArrowRight className="ml-2 text-lg transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </div>
          <div className={`grid grid-cols-1 gap-8 ${getGridCols()}`}>
            {displayedItems.map((item) => (
              <Link href={item.link || '#'} key={item.id}>
                <div className="shadow-card mb-4 flex flex-col gap-2 rounded-3xl transition-all hover:scale-[1.02]">
                  <div className="bg-primary-lightest relative mb-2 aspect-video overflow-hidden rounded-t-3xl shadow">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={`${item.titre}`}
                        fill
                        className={`absolute object-cover object-top ${item.objectPosition || 'object-cover'}`}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-700">
                      {item.titre}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 text-base">
                      {item.description}
                    </p>
                    {item.date && <p className="text-sm text-gray-400">{item.date}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { FeatureGrid }
