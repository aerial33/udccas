'use client'

import { Building2, Handshake, MapPin, UsersRound } from 'lucide-react'

import { useState } from 'react'

import Image from 'next/image'

import { Badge } from '@/components/ui/badge'

import BackgroundSection from '../BackgroundSection/BackgroundSection'
import { MembreMapLayout } from './MembreMapLayout'
import type { MembreShowcaseProps } from './types'

export function MembreShowcase({ membres, totalDocs = 0 }: MembreShowcaseProps) {
  const [hoveredMembre, setHoveredMembre] = useState<number | string | null>(null)

  return (
    <div className="">
      {/* HEADER */}
      <div className="mx-auto mb-16 h-120 w-full px-2 pt-12 xl:max-w-screen-2xl">
        <div className="aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 relative z-0 h-full overflow-hidden rounded-3xl md:rounded-[40px]">
          <Image
            alt="Nos membres RPDAD"
            fill
            src="https://images.pexels.com/photos/3184352/pexels-photo-3184352.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="h-full w-full rounded-3xl object-cover object-center brightness-60 md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          <div className="bg-opacity-30 absolute inset-0 flex flex-col items-center justify-center text-white">
            <Badge className="mb-4 text-white" variant="outline">
              {totalDocs} membres dans le réseau
            </Badge>
            <h1 className="inline-block align-middle text-5xl font-semibold md:text-7xl">
              Nos Membres
            </h1>
            <p className="mt-4 text-xl font-semibold text-neutral-50">
              Un réseau uni au service de l'aide à domicile
            </p>
            <span className="mt-4 block max-w-lg text-center text-neutral-50">
              Découvrez les structures associatives qui composent le Réseau Public Départemental
              d'Aide à Domicile de la Gironde.
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      {/* Section Présentation */}
      <section className="bg-muted/30 relative py-8">
        <BackgroundSection />
        {/* LOOP CARDS */}
        {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {membres.map((membre) => (
              <div
                key={membre.id}
                onMouseEnter={() => setHoveredMembre(membre.id)}
                onMouseLeave={() => setHoveredMembre(null)}
              >
                <MembreCard membre={membre} />
              </div>
            ))}
          </div> */}
        <MembreMapLayout membres={membres} totalDocs={totalDocs} />
        {membres.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">Aucun membre disponible pour le moment.</p>
          </div>
        )}
      </section>

      {/* Section Valeurs */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <UsersRound className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Solidarité</h3>
              <p className="text-muted-foreground text-sm">
                Des structures unies pour offrir un service de qualité sur tout le département.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-flamingo/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Building2 className="text-flamingo h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Proximité</h3>
              <p className="text-muted-foreground text-sm">
                Un maillage territorial dense pour être au plus près des bénéficiaires.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-chateau/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <MapPin className="text-chateau h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Couverture territoriale</h3>
              <p className="text-muted-foreground text-sm">
                Une présence sur l'ensemble de la Gironde pour garantir l'accès aux services.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300/10">
                <Handshake className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Engagement</h3>
              <p className="text-muted-foreground text-sm">
                Des valeurs communes au service du bien-être et de l'autonomie des personnes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
