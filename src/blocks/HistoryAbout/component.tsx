import { ArrowRight } from 'lucide-react'

import React from 'react'

import Link from 'next/link'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import RichText from '@/components/RichText'
import { FadeUp } from '@/components/motion/animations'
import { Button } from '@/components/ui/button'
import type { HistoryAboutBlock as HistoryAboutBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { Timeline } from './Timeline'

export const HistoryAboutBlock: React.FC<HistoryAboutBlockType> = ({
  title,
  content,
  link,
  timelineItems,
  bgColor,
}) => {
  return (
    <section className={cn('relative mt-16 py-16')}>
      <BackgroundSection className={bgColor || 'bg-primary-lightest'} />

      <div className="container mx-auto px-6">
        <div className="mx-[-15px] flex flex-wrap items-start">
          {/* Section gauche : Titre et description */}
          <div
            className="mb-10 w-full max-w-2xl flex-[0_0_auto] lg:!sticky lg:w-5/12 xl:!sticky xl:w-5/12"
            style={{ top: '8rem' }}
          >
            <FadeUp
              delay={0.2}
              className="sticky top-20 w-full max-w-full px-6 lg:!sticky lg:w-full lg:px-0 xl:w-full xl:px-0"
            >
              <h2 className="!mb-3 !leading-[1.3] font-bold">{title}</h2>

              <div className="richtext-content">
                <RichText
                  data={content}
                  enableGutter={false}
                  enableProse={false}
                  className="[&>*:first-child]:feature-paragraph [&>*:not(:first-child)]:text-muted-foreground [&>*:first-child]:font-normal [&>*:first-child]:lg:!pr-5 [&>*:first-child]:xl:!pr-5 [&>*:last-child]:!mb-6"
                />
              </div>

              {link?.label && (
                <Button variant="default" className="group mt-4">
                  <Link
                    href={
                      link.type === 'custom'
                        ? link.url || '#'
                        : typeof link.reference?.value === 'object' && link.reference.value?.slug
                          ? `/${link.reference.value.slug}`
                          : '#'
                    }
                    target={link.newTab ? '_blank' : undefined}
                    rel={link.newTab ? 'noopener noreferrer' : undefined}
                    className="group flex items-center"
                  >
                    {link.label}
                    <span className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1">
                      <ArrowRight />
                    </span>
                  </Link>
                </Button>
              )}
            </FadeUp>
          </div>

          {/* Section droite : Timeline */}
          <FadeUp
            delay={0.5}
            className="!ml-auto w-full max-w-full flex-[0_0_auto] !px-[15px] lg:w-6/12 xl:w-7/12"
          >
            <Timeline items={timelineItems || []} />
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
