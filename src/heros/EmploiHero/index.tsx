import { displayDate } from 'src/utilities/formatDateTime'

import React from 'react'

import { Media } from '@/components/Media'
import { FadeLeft, FadeRight } from '@/components/motion/animations'
import { Badge } from '@/components/ui/badge'
import type { Emplois } from '@/payload-types'

export const EmploiHero: React.FC<{
  emploi: Emplois
}> = ({ emploi }) => {
  const { image, organisme, publishedAt, title, workTime, statusOffre, datePourvoir, typeContrat } =
    emploi

  const getWorkTimeLabel = (workTime: string) => {
    const workTimeMap = {
      'full-time': 'Temps plein',
      'part-time': 'Temps partiel',
      flexible: 'Horaires flexibles',
    }
    return workTimeMap[workTime as keyof typeof workTimeMap] || workTime
  }

  const getTypeContratLabel = (type?: string | null) => {
    if (!type) return null
    return type.toUpperCase()
  }

  return (
    <>
      <section className="from-primary to-primary-dark relative z-10 bg-gradient-to-l pt-16 md:py-20 lg:py-28">
        <div className="relative z-10 container mx-auto">
          <div className="max-w-screen-md">
            {/* Badges de statut */}
            <FadeLeft delay={0.3} duration={0.6}>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                {typeContrat && (
                  <Badge variant="outline" className="font-medium text-white backdrop-blur-sm">
                    {getTypeContratLabel(typeContrat)}
                  </Badge>
                )}
                {workTime && (
                  <Badge variant="outline" className="font-medium text-white backdrop-blur-sm">
                    {getWorkTimeLabel(workTime)}
                  </Badge>
                )}
              </div>

              <h1 className="mb-10 text-3xl leading-tight font-bold text-balance text-white md:text-4xl">
                {title}
              </h1>
              <div className="w-full max-w-xl border-b border-neutral-200"></div>
              {publishedAt && (
                <div className="mt-8 flex items-center gap-4">
                  <p className="text-sm font-medium text-white/80">Publié le</p>
                  <time className="font-semibold text-white" dateTime={publishedAt}>
                    {displayDate(publishedAt)}
                  </time>
                </div>
              )}
            </FadeLeft>
          </div>
        </div>
        {/* FEATURED IMAGE */}
        <FadeRight
          duration={0.4}
          className="mt-8 md:absolute md:end-0 md:top-0 md:bottom-0 md:mt-0 md:w-1/2 lg:w-2/5"
        >
          {image && typeof image !== 'string' && (
            <Media
              fill
              videoClassName=" object-cover  h-full w-full"
              imgClassName="object-cover object-[center_30%]  w-full md:brightness-100 brightness-60"
              priority
              className="object-cover"
              resource={image}
            />
          )}
        </FadeRight>
      </section>
    </>
  )
}
