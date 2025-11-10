'use client'

import { useRef, useState } from 'react'

import CardMembers from './CardMembers'
import { GirondeMap, type Marker } from './GirondeMap'
import type { MembreShowcase } from './types'

export interface MembreMapLayoutProps {
  membres: MembreShowcase[]
  totalDocs: number
}

export function MembreMapLayout({ membres, totalDocs }: MembreMapLayoutProps) {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | number | null>(null)
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | number | null>(null)
  const cardRefs = useRef<Map<string | number, HTMLDivElement>>(new Map())

  const handleMarkerClick = (marker: Marker) => {
    setSelectedMarkerId(marker.id)

    // Scroll automatique vers la card correspondante
    const cardElement = cardRefs.current.get(marker.id)
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }

  const setCardRef = (id: string | number, element: HTMLDivElement | null) => {
    if (element) {
      cardRefs.current.set(id, element)
    } else {
      cardRefs.current.delete(id)
    }
  }

  const handleCardMouseEnter = (membreId: string | number) => {
    setHoveredMarkerId(membreId)
  }

  const handleCardMouseLeave = () => {
    setHoveredMarkerId(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-16">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-700 md:text-4xl lg:text-5xl">
          Le Réseau Public Départemental d'Aide à Domicile de la Gironde
        </h2>
        <p className="text-muted-foreground max-w-2xl text-xl">
          Un réseau de {totalDocs} structures associatives engagées dans l'accompagnement et le
          soutien des personnes à domicile partout en Gironde.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 py-8 pt-8 md:gap-8 lg:grid-cols-2">
        {/* Carte interactive de la Gironde */}
        <div className="w-full">
          <GirondeMap
            onMarkerClick={handleMarkerClick}
            membres={membres}
            selectedMarkerId={selectedMarkerId}
            hoveredMarkerId={hoveredMarkerId}
            width={800}
            height={800}
            showLabels={false}
          />
        </div>

        {/* Liste des cards membres - Scrollable */}
        <div className="h-[800px] overflow-x-hidden overflow-y-auto">
          <div className="grid gap-6 px-2 md:gap-8">
            {membres.map((membre) => (
              <CardMembers
                key={membre.id}
                ref={(el) => setCardRef(membre.id, el)}
                membre={membre}
                isHighlighted={selectedMarkerId === membre.id}
                onMouseEnter={() => handleCardMouseEnter(membre.id)}
                onMouseLeave={handleCardMouseLeave}
              />
            ))}
          </div>
        </div>
      </div>

      {membres.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg">Aucun membre disponible.</p>
        </div>
      )}
    </div>
  )
}
