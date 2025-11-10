'use client'

import { Building2, Clock, Globe, Mail, MapPin, Phone } from 'lucide-react'

import { useState } from 'react'

import Link from 'next/link'

import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { MembreCardProps } from './types'

//todo rework the card to use the new Card component

export function MembreCard({ membre }: MembreCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex-shrink-0 space-y-4 p-6">
        {/* Logo */}
        <div className="from-primary/10 to-flamingo/10 relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br p-3 shadow-md transition-transform duration-300 group-hover:scale-110">
          {membre.logo && typeof membre.logo === 'object' ? (
            <Media resource={membre.logo} imgClassName="object-contain" fill />
          ) : (
            <Building2 className="text-primary h-12 w-12" />
          )}
        </div>

        {/* Nom */}
        <CardTitle className="line-clamp-2 text-center text-xl font-bold">{membre.name}</CardTitle>

        {/* Adresse */}
        {membre.adresse && (
          <div className="text-muted-foreground flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-2">{membre.adresse}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-4 p-6 pt-0">
        {/* Informations de contact */}
        <div className="flex-1 space-y-3">
          {membre.informations?.contact?.tel && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <a
                href={`tel:${membre.informations.contact.tel}`}
                className="hover:text-primary truncate transition-colors"
              >
                {membre.informations.contact.tel}
              </a>
            </div>
          )}

          {membre.informations?.contact?.mail && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <a
                href={`mailto:${membre.informations.contact.mail}`}
                className="hover:text-primary truncate transition-colors"
              >
                {membre.informations.contact.mail}
              </a>
            </div>
          )}

          {membre.informations?.horaires && (
            <div className="text-muted-foreground flex items-start gap-2 text-sm">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-3 whitespace-pre-line">
                {membre.informations.horaires}
              </span>
            </div>
          )}

          {membre.informations?.website && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 flex-shrink-0" />
              <a
                href={membre.informations.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary truncate transition-colors"
              >
                Visiter le site web
              </a>
            </div>
          )}

          {membre.informations?.astreinte && (
            <div className="mt-3">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                Astreinte: {membre.informations.astreinte}
              </Badge>
            </div>
          )}
        </div>

        {/* Bouton Voir la fiche */}
        <Button
          asChild
          className="mt-auto w-full rounded-2xl transition-all group-hover:shadow-md"
          variant={isHovered ? 'default' : 'outline'}
        >
          <Link href={`/membres/${membre.slug || '#'}`}>
            Voir la fiche complète
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
