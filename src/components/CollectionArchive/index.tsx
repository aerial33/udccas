import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { cn } from '@/utilities/ui'

import { SidebarWidgets, type SidebarWidgetsProps } from './SidebarWidgets'

export type Props = {
  posts: CardPostData[]
  relationTo?: 'posts' | 'emplois'
  sidebarProps?: SidebarWidgetsProps
  className?: string
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, relationTo = 'posts', sidebarProps, className } = props

  return (
    <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8 xl:ps-0', className)}>
      <div className="mx-[-15px] flex flex-wrap lg:mx-[-20px] xl:mx-[-35px]">
        <div className="w-full max-w-full flex-[0_0_auto] !px-[15px] md:!px-[20px] lg:w-8/12 lg:!px-[20px] xl:w-8/12 xl:!px-[35px]">
          <div className="blog classic-view">
            <article className="post !mb-8">
              {posts && posts.length > 0 && (
                <Card
                  doc={posts[0]}
                  relationTo={relationTo}
                  showCategories
                  variant="featured"
                  className="shadow-card"
                />
              )}
            </article>
          </div>

          <div className="blog itemgrid grid-view">
            <div className="isotope mx-[-15px] !mt-[-40px] !mb-8 flex flex-wrap md:mx-[-20px] lg:mx-[-20px] xl:mx-[-20px]">
              {posts?.slice(1).map((result, index) => {
                if (typeof result === 'object' && result !== null) {
                  return (
                    <article
                      key={index + 1}
                      className="item post !mt-[40px] w-full max-w-full flex-[0_0_auto] !px-[15px] md:w-6/12 md:!px-[20px] lg:w-6/12 lg:!px-[20px] xl:w-6/12 xl:!px-[20px]"
                    >
                      <Card doc={result} relationTo={relationTo} showCategories variant="grid" />
                    </article>
                  )
                }
                return null
              })}
            </div>
          </div>
        </div>

        <SidebarWidgets {...sidebarProps} />
      </div>
    </div>
  )
}
