// src/blocks/HistoryAbout/Timeline.tsx
import { cn } from '@/utilities/ui'

export interface TimelineItem {
  date?: string
  title?: string
  description?: string
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className = '' }: TimelineProps) {
  return (
    <ul
      className={cn('timeline !m-0 !w-full !list-none !p-0 md:table lg:table xl:table', className)}
    >
      {items.map((item, idx) => {
        return (
          <li
            key={idx}
            className="relative !pl-8 md:table-row md:p-0 lg:table-row lg:p-0 xl:table-row xl:p-0"
          >
            <div className="timeline-info meta !text-flamingo-light !text-normal !mb-2 font-bold !tracking-[0.02rem] whitespace-nowrap uppercase md:table-cell md:!pr-6 md:text-right md:align-top lg:table-cell lg:!pr-6 lg:text-right lg:align-top xl:table-cell xl:!pr-6 xl:text-right xl:align-top">
              {item.date}
            </div>
            <div className="!text-primary before:bg-flamingo-dark absolute inset-y-0 left-0 w-[0.6rem] before:absolute before:top-[0.2rem] before:-left-0.5 before:block before:h-[0.8rem] before:w-[0.8rem] before:rounded-[100%] before:content-[''] after:absolute after:top-4 after:bottom-0 after:left-1 after:block after:w-px after:bg-[rgba(164,174,198,.2)] after:content-[''] md:relative md:table-cell md:align-top lg:relative lg:table-cell lg:align-top xl:relative xl:table-cell xl:align-top"></div>
            <div
              className={cn(
                'align-top md:!pl-6 lg:!pl-6 xl:!pl-6',
                idx === items.length - 1 ? '!pb-0' : 'pb-8',
              )}
            >
              <h3 className="mb-4 text-2xl font-semibold md:!mt-[-0.25rem] lg:!mt-[-0.25rem]">
                {item.title}
              </h3>
              <p className="text-muted-foreground !m-0 text-lg">{item.description}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
