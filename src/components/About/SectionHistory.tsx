// src/components/sections/SectionContent.tsx
import { ReactNode } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

interface SectionContentProps {
  title: string
  paragraphs: string[]
  buttonText?: string
  buttonHref?: string
  buttonIcon?: ReactNode
  className?: string
}

export function SectionHistory({
  title,
  paragraphs,
  buttonText,
  buttonHref,
  buttonIcon,
  className = '',
}: SectionContentProps) {
  return (
    <div
      className={cn(
        '!mt-[50px] w-full max-w-full flex-[0_0_auto] px-[15px] lg:w-6/12 lg:px-[20px] xl:w-6/12 xl:px-[35px]',
        className,
      )}
    >
      <h2 className="!mb-3 !leading-[1.3] font-bold">{title}</h2>
      {paragraphs.map((text, i) => (
        <p
          key={i}
          className={cn(
            i === 0 ? 'feature-paragraph font-normal lg:!pr-5 xl:!pr-5' : 'text-muted-foreground',
            i === paragraphs.length - 1 && '!mb-6',
          )}
        >
          {text}
        </p>
      ))}
      {buttonText && buttonHref && (
        <Button variant="default" className="group mt-4">
          <Link href={buttonHref} className="group flex items-center">
            {buttonText}
            {buttonIcon && (
              <span className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1">
                {buttonIcon}
              </span>
            )}
          </Link>
        </Button>
      )}
    </div>
  )
}
