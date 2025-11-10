import type { Metadata } from 'next'

import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    "Le Réseau Public Départemental d'Aide à Domicile  (RPDAD) de la Gironde accompagne les personnes âgées et personnes en situation de handicap qui choisissent de vivre à domicile.",
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'Rpdad Réseau départemental de la gironde ',
  title: 'Rpdad Réseau départemental de la gironde ',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
