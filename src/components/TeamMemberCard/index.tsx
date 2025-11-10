import { Media } from '@/components/Media'
import { Card, CardContent } from '@/components/ui/card'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface TeamMemberCardProps {
  name: string
  role: string
  photo?: string | number | MediaType | null
  bio?: string | null
  className?: string
  accentColor?: string
}

export function TeamMemberCard({ name, role, photo, bio, className = '' }: TeamMemberCardProps) {
  return (
    <Card
      className={cn(
        'overflow-hidden border-4 bg-white shadow-lg transition-shadow hover:shadow-xl',
        className,
      )}
    >
      <div className="aspect-square w-full overflow-hidden bg-neutral-100">
        {photo && typeof photo !== 'string' && typeof photo !== 'number' ? (
          <Media resource={photo} className="h-full w-full object-cover" />
        ) : (
          <div className="from-primary-lighter to-primary/20 flex h-full w-full items-center justify-center bg-gradient-to-br">
            <span className="text-primary/30 text-6xl font-bold">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="mb-1 text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-primary mb-3 text-sm font-medium">{role}</p>
        {bio && <p className="text-muted-foreground text-sm leading-relaxed">{bio}</p>}
      </CardContent>
    </Card>
  )
}

export function SimpleTeamCard({
  name,
  role,
  photo,
  bio,
  accentColor = 'bg-blue-100',
}: TeamMemberCardProps) {
  return (
    <div className="group relative mx-auto h-full w-full max-w-sm pb-4 pr-4">
      <div
        className={cn('absolute inset-0 left-4 top-4 -z-10 rounded-lg', accentColor)}
      />

      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          {photo && typeof photo !== 'string' && typeof photo !== 'number' ? (
            <Media resource={photo} fill imgClassName="object-contain" />
          ) : (
            <div className="from-primary-lightest to-primary/20 flex h-full w-full items-center justify-center bg-gradient-to-br">
              <span className="text-primary/30 text-6xl font-bold">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-1 text-3xl font-semibold text-gray-700">{name}</h3>
          <p className="mb-2 text-lg text-gray-600">{role}</p>
          {bio && <p className="text-muted-foreground mt-auto text-sm leading-relaxed">{bio}</p>}
        </div>
      </div>
    </div>
  )
}
