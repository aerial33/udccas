import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ membres: [], lieux: [] })
    }

    const payload = await getPayload({ config: configPromise })

    // Recherche des membres correspondants
    const results = await payload.find({
      collection: 'membres',
      depth: 0,
      limit: 20,
      where: {
        and: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            or: [
              {
                name: {
                  like: query,
                },
              },
              {
                adresse: {
                  like: query,
                },
              },
              {
                'coordinates.zone': {
                  like: query,
                },
              },
            ],
          },
        ],
      },
      select: {
        name: true,
        slug: true,
        adresse: true,
        coordinates: true,
      },
    })

    // Extraire les suggestions de membres (par nom)
    const membresSuggestions = results.docs
      .filter((doc) => doc.name?.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 4)
      .map((doc) => ({
        type: 'membre' as const,
        label: doc.name,
        value: doc.name,
        slug: doc.slug,
      }))

    // Extraire les suggestions de lieux uniques
    const lieuxSet = new Set<string>()

    results.docs.forEach((doc) => {
      // Ajouter les villes depuis l'adresse
      if (doc.adresse) {
        const adresseParts = doc.adresse.split(',')
        if (adresseParts.length > 1) {
          const ville = adresseParts[adresseParts.length - 1]!.trim()
          if (ville.toLowerCase().includes(query.toLowerCase())) {
            lieuxSet.add(ville)
          }
        }
      }

      // Ajouter les zones
      if (
        doc.coordinates?.zone &&
        doc.coordinates.zone.toLowerCase().includes(query.toLowerCase())
      ) {
        lieuxSet.add(doc.coordinates.zone)
      }
    })

    const lieuxSuggestions = Array.from(lieuxSet)
      .slice(0, 4)
      .map((lieu) => ({
        type: 'lieu' as const,
        label: lieu,
        value: lieu,
      }))

    return NextResponse.json({
      membres: membresSuggestions,
      lieux: lieuxSuggestions,
    })
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    return NextResponse.json({ membres: [], lieux: [] }, { status: 500 })
  }
}
