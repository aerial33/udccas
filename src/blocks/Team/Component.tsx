'use client'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { MySlider } from '@/components/Slider'
import { SimpleTeamCard } from '@/components/TeamMemberCard'
import { FadeUp } from '@/components/motion/animations'
import type { TeamBlock as TeamBlockType } from '@/payload-types'

// Map layout to itemPerRow for the slider
const layoutToItemsMap = {
  'grid-2': 2,
  'grid-3': 3,
  'grid-4': 4,
} as const

export const TeamBlock = ({ title, subtitle, members, layout, bgColor }: TeamBlockType) => {
  const itemPerRow = layoutToItemsMap[layout || 'grid-3']

  return (
    <section className="relative py-16 xl:py-20">
      <BackgroundSection className={bgColor || 'bg-white'} />

      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <FadeUp delay={0.2} className="mb-12 xl:mb-16">
            {title && (
              <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-balance">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground text-center text-xl text-balance">{subtitle}</p>
            )}
          </FadeUp>
        )}

        {members && members.length > 0 && (
          <FadeUp delay={0.3}>
            <MySlider
              data={members}
              itemPerRow={itemPerRow}
              className="mx-auto py-4"
              arrowBtnClass="top-1/2 -translate-y-1/2"
              renderItem={(member) => (
                <SimpleTeamCard
                  name={member.name}
                  role={member.role}
                  photo={member.photo}
                  bio={member.bio}
                  accentColor={member.cardAccentColor || 'bg-blue-100'}
                />
              )}
            />
          </FadeUp>
        )}
      </div>
    </section>
  )
}
