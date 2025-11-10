'use client'

import React, { Suspense } from 'react'

import { HeroSearchMembers } from '@/components/HeroSearchMembers'
import { CMSLink } from '@/components/Link'
import { LogoTicker } from '@/components/LogoTicker'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ExpandFromCenter, FadeUp } from '@/components/motion/animations'
import { Badge } from '@/components/ui/badge'
import { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const HeroPrimary: React.FC<Page['hero']> = ({
  richText,
  links,
  badge,
  images,
  actionType,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState<Record<number, boolean>>({})

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <section className="relative -z-10 mt-4 flex min-h-screen items-center lg:min-h-0">
      <div className="container mx-auto px-4 xl:px-0">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <FadeUp delay={0.3} className="lg:mt-8">
            <div className="flex flex-col gap-10 lg:gap-6">
              {badge && (
                <Badge variant="outline" className="text-muted-foreground border-muted-foreground">
                  {badge}
                </Badge>
              )}
              <div className="prose prose-xl richtext-content">
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className="text-gray-200 [&_h1]:text-gray-100 [&_h1]:lg:text-gray-700 [&_p]:text-xl [&_p]:lg:text-gray-500"
                  />
                )}
              </div>

              {actionType === 'links' && links && (
                <div className="mt-2 flex flex-wrap gap-4">
                  {Array.isArray(links) && links.length > 0 && (
                    <ul className="flex gap-4">
                      {links.map(({ link }, i) => {
                        return (
                          <li key={i}>
                            <CMSLink {...link} />
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )}
              {actionType === 'search' && (
                <Suspense
                  fallback={
                    <div className="relative w-full max-w-2xl">
                      <div className="animate-pulse rounded-2xl border-2 border-gray-300 bg-gray-100 p-8" />
                    </div>
                  }
                >
                  <HeroSearchMembers />
                </Suspense>
              )}

              {/* Desktop: LogoTicker intégré dans le hero */}
              <LogoTicker className="lg:text-muted-foreground mt-12 rounded-xl bg-white/20 p-3 text-white backdrop-blur-sm lg:mt-0 xl:block" />
            </div>
          </FadeUp>

          {/* Mobile: afficher seulement la première image avec forme arrondie */}
          <div className="absolute inset-0 -z-1 min-h-screen overflow-hidden sm:rounded-bl-[300px] lg:hidden lg:shadow-2xl">
            {images?.[0]?.image && (
              <Media
                resource={images[0].image}
                imgClassName="h-full min-h-screen w-full object-cover brightness-60 object-left"
                priority={true}
                quality={90}
                size="100vw"
              />
            )}
          </div>

          {/* Desktop: grille complète */}
          <div className="hidden self-start lg:block">
            <div className="relative grid grid-cols-2 gap-6">
              {images && images.length > 0 ? (
                images.map((item, index) => {
                  const isPriority = index < 2 // Les 2 premières images en priorité

                  return (
                    <ExpandFromCenter
                      delay={0.15 + index * 0.06}
                      duration={0.35}
                      key={index}
                      className={cn(
                        'flex aspect-square items-center justify-center overflow-hidden rounded-full shadow-lg transition-transform',
                        (index === 0 || index === images.length - 1) && 'scale-75',
                      )}
                    >
                      <div className="relative h-full w-full">
                        {/* Skeleton placeholder */}
                        {!imageLoaded[index] && (
                          <div className="absolute inset-0 animate-pulse rounded-full bg-gray-300">
                            <svg
                              className="h-10 w-10 text-gray-200 dark:text-gray-600"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 18"
                            >
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                          </div>
                        )}

                        {item.image ? (
                          <Media
                            resource={item.image}
                            className="h-full w-full object-cover"
                            imgClassName={cn(
                              'h-full object-cover transition-opacity duration-300',
                              imageLoaded[index] ? 'opacity-100' : 'opacity-0',
                            )}
                            priority={isPriority}
                            loading={isPriority ? 'eager' : 'lazy'}
                            quality={75}
                            size="(max-width: 1024px) 50vw, 25vw"
                            onLoad={() => handleImageLoad(index)}
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200" />
                        )}
                      </div>
                    </ExpandFromCenter>
                  )
                })
              ) : (
                // Template par défaut avec 4 placeholders gris
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex aspect-square items-center justify-center overflow-hidden rounded-full transition-transform',
                        (i === 1 || i === 4) && 'scale-75',
                      )}
                    >
                      <div className="h-full w-full bg-gray-200" />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Section séparée pour LogoTicker */}
        {/* <div className="mt-16 lg:mt-24 xl:hidden">
          <LogoTicker className="rounded-xl bg-white/10 p-4 text-white backdrop-blur-sm" />
        </div> */}
      </div>
      <div className="lg:from-primary lg:to-primary-dark absolute inset-0 top-[-188px] -bottom-4 -z-1 rounded-bl-[300px] lg:visible lg:left-[60%] lg:bg-gradient-to-br lg:shadow"></div>
    </section>
  )
}
