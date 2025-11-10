import React from 'react'

import RichText from '@/components/RichText'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  // Classes responsives pour chaque taille
  const getResponsiveClasses = (size: string) => {
    const sizeMap = {
      full: 'col-span-4 md:col-span-4 lg:col-span-12',
      half: 'col-span-4 md:col-span-2 lg:col-span-6',
      oneThird: 'col-span-4 md:col-span-2 lg:col-span-4',
      twoThirds: 'col-span-4 md:col-span-3 lg:col-span-8',
    }
    return sizeMap[size as keyof typeof sizeMap] || 'col-span-4'
  }

  return (
    <div className="container mx-auto my-16 border">
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={`${getResponsiveClasses(size!)} richtext-content border-flamingo border`}
                key={index}
              >
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className="[&>*:first-child]:feature-paragraph [&>*:not(:first-child)]:text-muted-foreground [&>*:last-child]:mb-8"
                  />
                )}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
