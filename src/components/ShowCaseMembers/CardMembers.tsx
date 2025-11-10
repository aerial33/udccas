'use client'

import { Building2, Mail, MapPin, Phone } from 'lucide-react'

import { forwardRef } from 'react'

import Link from 'next/link'

import { Media } from '@/components/Media'

import type { MembreShowcase } from './types'

export interface CardMembersProps {
  membre: MembreShowcase
  className?: string
  isHighlighted?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const CardMembers = forwardRef<HTMLDivElement, CardMembersProps>(
  ({ membre, className = 'h-full', isHighlighted = false, onMouseEnter, onMouseLeave }, ref) => {
    const membreUrl = `/membres/${membre.slug || '#'}`

    return (
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`group relative flex flex-row items-center border-neutral-200 transition-all duration-300 hover:shadow sm:rounded-3xl sm:border sm:bg-white/80 sm:p-4 sm:backdrop-blur-sm ${
          isHighlighted ? 'ring-2 ring-primary shadow-lg' : ''
        } ${className}`}
      >
      {/* Lien invisible sur toute la carte */}
      <Link href={membreUrl} className="absolute inset-0 z-0"></Link>

      {/* Contenu à gauche */}
      <div className="flex flex-grow flex-col">
        <div className="mb-4 space-y-3">
          {/* Nom du membre */}
          <h2 className="block text-base font-bold text-gray-700 sm:text-lg">
            <Link href={membreUrl} className="line-clamp-2" title={membre.name}>
              {membre.name}
            </Link>
          </h2>

          {/* Adresse */}
          {membre.adresse && (
            <div className="text-muted-foreground flex items-start gap-2 text-xs sm:text-sm">
              <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
              <span className="line-clamp-2">{membre.adresse}</span>
            </div>
          )}

          {/* Contact principal (téléphone ou email) */}
          {membre.informations?.contact?.tel && (
            <div className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
              <Phone className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
              <a
                href={`tel:${membre.informations.contact.tel}`}
                className="hover:text-primary relative z-10 truncate transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {membre.informations.contact.tel}
              </a>
            </div>
          )}

          {!membre.informations?.contact?.tel && membre.informations?.contact?.mail && (
            <div className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
              <Mail className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
              <a
                href={`mailto:${membre.informations.contact.mail}`}
                className="hover:text-primary relative z-10 truncate transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {membre.informations.contact.mail}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Logo à droite */}
      <Link
        href={membreUrl}
        className="relative z-0 ms-3 aspect-square w-24 flex-shrink-0 overflow-hidden rounded-2xl border-zinc-300 shadow-md transition-transform duration-300 sm:ms-5 sm:w-32"
      >
        {membre.logo && typeof membre.logo === 'object' ? (
          <Media
            resource={membre.logo}
            imgClassName="object-contain"
            fill
            size="(max-width: 600px) 180px, 400px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Building2 className="text-primary h-8 w-8 sm:h-12 sm:w-12" />
          </div>
        )}
      </Link>
    </div>
  )
},
)

CardMembers.displayName = 'CardMembers'

export default CardMembers
