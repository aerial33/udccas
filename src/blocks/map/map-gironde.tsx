'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowRight } from 'lucide-react'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { GirondeMap } from '@/components/ShowCaseMembers/GirondeMap'
import type { MembreShowcase } from '@/components/ShowCaseMembers/types'
import { FadeUp } from '@/components/motion/animations'
import type { MapBlock as MapBlockType } from '@/payload-types'

// Définir une interface pour les propriétés du canton
export interface CantonProperties {
  code: string
  nom: string
  villes?: string[]
  // Ajoutez d'autres propriétés si nécessaire
}

export function MapBlock(props: MapBlockType) {
  const { MapInfo } = props
  const router = useRouter()

  const [membres, setMembres] = useState<MembreShowcase[]>([])
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | number | null>(null)

  // Récupération des membres depuis l'API Payload
  useEffect(() => {
    const fetchMembres = async () => {
      try {
        const response = await fetch('/api/membres?limit=100&where[coordinates.lat][exists]=true')
        const data = await response.json()
        if (data.docs) {
          setMembres(data.docs)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des membres:', error)
      }
    }

    fetchMembres()
  }, [])

  return (
    <section className="relative py-8">
      <BackgroundSection />
      <div className="relative z-10 container mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FadeUp className="p-2 md:p-4">
          {MapInfo && (
            <div className="richtext-content my-4 text-gray-500 [&_h2]:mb-4 [&_h2]:text-gray-700 [&_h3]:text-gray-600 [&_p]:text-xl [&_p]:lg:text-gray-600">
              <RichText data={MapInfo} />
            </div>
          )}
          <Link
            href={`/membres`}
            className="bg-primary hover:bg-primary/90 mt-4 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-white transition-colors"
          >
            <span className="text-sm font-medium md:text-base">{'Accedez aux membres'}</span>
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </FadeUp>
        <FadeUp delay={0.5} className="-mx-4 self-center p-0 md:mx-0 md:p-4">
          <div className="w-full">
            <GirondeMap
              membres={membres}
              selectedMarkerId={selectedMarkerId}
              onMarkerClick={(marker) => {
                setSelectedMarkerId(marker.id)

                // Trouver le membre complet dans la liste pour récupérer son slug
                const membre = membres.find((m) => m.id === marker.id)

                if (membre?.slug) {
                  router.push(`/membres/${membre.slug}`)
                }
              }}
              width={800}
              height={800}
              showLabels={false}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
