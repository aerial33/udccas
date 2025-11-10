import { ReactNode } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

interface FeatureCardProps {
  number: string
  numberBgClass?: string // ex: "bg-picton-blue-lighter text-picton-blue"
  title: string
  description: string
  className?: string
  children?: ReactNode // pour du contenu additionnel si besoin
}

export function FeatureCard({
  number,
  numberBgClass = 'bg-blue-lighter text-blue',
  title,
  description,
  className = '',
  children,
}: FeatureCardProps) {
  return (
    <Card
      className={cn('mt-2 flex max-w-[580px] flex-row border bg-white pt-6 shadow-lg', className)}
    >
      <CardContent className="flex flex-row items-center space-x-6">
        <div
          className={cn(
            numberBgClass,
            'flex aspect-square h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-medium',
          )}
        >
          {number}
        </div>
        <div>
          <h4 className="!mb-1 text-lg font-semibold">{title}</h4>
          <p className="text-muted-foreground text-sm">{description}</p>
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
