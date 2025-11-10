import { FC } from 'react'

import { SOCIALS_DATA, SocialType } from '@/graphics/SocialsShare/SocialsShare'

export interface SocialsListProps {
  className?: string
  itemClass?: string
  socials?: SocialType[]
}

const socialsDemo: SocialType[] = SOCIALS_DATA

export const SOCIALS_2 = socialsDemo

const SocialsList: FC<SocialsListProps> = ({
  className = '',
  itemClass = 'block',
  socials = socialsDemo,
}) => {
  return (
    <nav className={`text-neutral-6000 flex space-x-3 text-2xl ${className}`}>
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <div dangerouslySetInnerHTML={{ __html: item.icon || '' }}></div>
        </a>
      ))}
    </nav>
  )
}

export default SocialsList
