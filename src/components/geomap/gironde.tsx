'use client'

import React from 'react'

// Import des données GeoJSON des cantons de la Gironde
import girondeCantonsData from '@/components/geomap/gironde-cantons.json'
// Import du composant GeoMap et de son type GeoData
import { CantonProperties } from '@/blocks/map/map-gironde'

import GeoMap, { GeoData } from '@/components/geomap/france-map'

// Interface définissant les props du composant MapGironde
interface MapGirondeProps {
  width?: number // Largeur optionnelle de la carte
  height?: number // Hauteur optionnelle de la carte
  className?: string // Classes CSS additionnelles
  highlightedAreaId?: string | null // ID du canton à mettre en surbrillance
  onAreaClick?: (areaId: string, areaName: string, extraData?: CantonProperties) => void // Callback lors du clic sur un canton
}

// Définition du composant MapGironde avec ses valeurs par défaut
export const MapGironde: React.FC<MapGirondeProps> = ({
  width = 700, // Largeur par défaut : 700px
  height = 500, // Hauteur par défaut : 500px
  className = '', // Pas de classe CSS par défaut
  highlightedAreaId = null, // Pas de surbrillance par défaut
  onAreaClick, // Callback optionnel pour les clics
}) => {
  return (
    <GeoMap
      // Cast des données GeoJSON vers le type GeoData
      geoData={girondeCantonsData as GeoData}
      width={width}
      height={height}
      className={className}
      idField="code" // Utilise le champ "code" comme identifiant
      nameField="nom" // Utilise le champ "nom" pour le nom du canton
      highlightedAreaId={highlightedAreaId}
      onAreaClick={onAreaClick}
      // Configuration des couleurs
      defaultFill="#64748b" // Gris par défaut
      highlightFill="#3b82f6" // Bleu pour la surbrillance
      hoverFill="#475569" // Gris foncé pour le survol
      hoverHighlightFill="#2563eb" // Bleu foncé pour le survol en surbrillance
    />
  )
}
