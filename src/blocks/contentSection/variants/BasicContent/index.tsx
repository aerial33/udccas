import React from 'react'

import Link from 'next/link'

import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ContentSectionBlock as ContentSectionBlockType } from '@/payload-types'

import { DEFAULT_BG_CLASSES, DEFAULT_CONTAINER_CLASSES, getIconComponent } from '../../utils'

export const BasicContent: React.FC<ContentSectionBlockType> = ({ badge, content, button }) => {
  return (
    <section className={DEFAULT_BG_CLASSES}>
      <div className={DEFAULT_CONTAINER_CLASSES}>
        <div className="mx-[-15px] flex flex-wrap items-start lg:mx-[-20px] xl:mx-[-35px]">
          <div className="w-full max-w-full flex-[0_0_auto] px-[15px] lg:!px-[20px] xl:!px-[35px]">
            {badge && (
              <Badge
                className="border-flamingo-light text-muted-foreground mb-4"
                variant={'outline'}
              >
                {badge}
              </Badge>
            )}
            <div className="richtext-content">
              <RichText
                data={content}
                enableGutter={false}
                enableProse={false}
                className="[&>*:first-child]:feature-paragraph [&>*:not(:first-child)]:text-muted-foreground [&>*:last-child]:mb-8"
              />
            </div>
            {button?.text && button?.href && (
              <Button className="group !mt-8">
                <Link href={button.href}>{button.text}</Link>
                {button.icon && button.icon !== 'none' && (
                  <span className="ml-2 text-lg transition-transform group-hover:translate-x-1">
                    {getIconComponent(button.icon)}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
