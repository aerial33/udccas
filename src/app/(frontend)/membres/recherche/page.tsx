import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next/types'

import { HeroSearchMembers } from '@/components/HeroSearchMembers'
import CardMembers from '@/components/ShowCaseMembers/CardMembers'

import MembresSearchPageClient from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

export default async function MembresSearchPage({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  // Récupérer les résultats de recherche si une query existe
  const searchResults = query
    ? await payload.find({
        collection: 'membres',
        depth: 1,
        limit: 50,
        select: {
          name: true,
          slug: true,
          adresse: true,
          coordinates: true,
          meta: true,
          logo: true,
          informations: true,
        },
        pagination: false,
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
                {
                  'meta.description': {
                    like: query,
                  },
                },
                {
                  'meta.title': {
                    like: query,
                  },
                },
                {
                  slug: {
                    like: query,
                  },
                },
              ],
            },
          ],
        },
        sort: 'name',
      })
    : null

  // Si pas de recherche ou si la recherche ne donne aucun résultat, récupérer tous les membres
  const allMembers =
    !query || (searchResults && searchResults.docs.length === 0)
      ? await payload.find({
          collection: 'membres',
          depth: 1,
          limit: 50,
          select: {
            name: true,
            slug: true,
            adresse: true,
            coordinates: true,
            meta: true,
            logo: true,
            informations: true,
          },
          pagination: false,
          where: {
            _status: {
              equals: 'published',
            },
          },
          sort: 'name',
        })
      : null

  // Déterminer quels membres afficher
  const membres = searchResults || allMembers || {
    docs: [],
    totalDocs: 0,
  }

  return (
    <div className="animation-appear pt-24 pb-24">
      <MembresSearchPageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Rechercher un membre</h1>

          <div className="mx-auto max-w-[40rem] text-center">
            <HeroSearchMembers />
          </div>
        </div>
      </div>

      {membres.docs.length > 0 ? (
        <div className="container">
          {query && searchResults && searchResults.docs.length === 0 && (
            <>
              <div className="text-center mb-8">
                <p className="text-lg">Aucun membre trouvé pour cette recherche.</p>
              </div>

              <div className="prose dark:prose-invert max-w-none text-center mb-8">
                <h2>Tous nos membres</h2>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {membres.docs.map((membre) => (
              <CardMembers key={membre.id} membre={membre} />
            ))}
          </div>
        </div>
      ) : (
        <div className="container text-center">
          <p className="text-lg">Aucun membre disponible.</p>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Rechercher un membre du RPDAD`,
    description:
      "Trouvez un membre du Réseau Public Départemental d'Aide à Domicile proche de chez vous",
  }
}
