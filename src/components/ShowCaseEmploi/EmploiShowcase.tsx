'use client'

import {
  ArrowRight,
  Building2,
  Calendar,
  Handshake,
  MapPin,
  Sparkles,
  UsersRound,
} from 'lucide-react'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

// import ReactPlayer from 'react-player'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { displayDate } from '@/utilities/formatDateTime'

import { FAQSection } from './FAQSection'
import { TestimonialSection } from './TestimonialSection'
import type { EmploiShowcaseProps } from './types'

export function EmploiShowcase({ emplois, totalDocs = 0 }: EmploiShowcaseProps) {
  const [isRendered, setIsRendered] = useState(false)
  const [hoveredEmploi, setHoveredEmploi] = useState<number | null>(null)

  useEffect(() => {
    setIsRendered(true)
  }, [])

  // Fonction pour extraire le texte du contenu Lexical
  const extractTextFromLexical = (content: any): string => {
    if (!content || !content.root || !content.root.children) {
      return ''
    }

    const extractTextFromNode = (node: any): string => {
      if (node.type === 'text') {
        return node.text || ''
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractTextFromNode).join(' ')
      }

      return ''
    }

    return content.root.children.map(extractTextFromNode).join(' ').trim()
  }

  // Fonction pour obtenir la description
  const getDescription = (emploi: any): string => {
    // Priorité 1: meta.description
    if (emploi.meta?.description) {
      return emploi.meta.description
    }

    // Priorité 2: extraire du contenu Lexical
    if (emploi.content) {
      const text = extractTextFromLexical(emploi.content)
      return text.slice(0, 150) + (text.length > 150 ? '...' : '')
    }

    // Priorité 3: texte par défaut
    return 'Découvrez cette opportunité professionnelle au sein de notre réseau.'
  }

  // const renderMainVideo = () => (
  //   <div>
  //     {isRendered ? (
  //       <ReactPlayer
  //         //@ts-ignore
  //         url="https://youtu.be/VgYf32lPqo8?si=PlyNjXZIAKJG18fU"
  //         className="absolute inset-0"
  //         playing={true}
  //         width="100%"
  //         height="100%"
  //         controls
  //         muted
  //       />
  //     ) : null}
  //   </div>
  // )

  return (
    <div className="">
      {/* HEADER */}
      <div className="mx-auto h-120 w-full px-2 pt-12 xl:max-w-screen-2xl">
        <div className="aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 relative z-0 h-full overflow-hidden rounded-3xl md:rounded-[40px]">
          <Image
            alt="archive"
            fill
            src="/img/rpdad-emploi.webp"
            className="h-full w-full rounded-3xl object-cover object-[center_30%] brightness-60 md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          <div className="bg-opacity-30 absolute inset-0 flex flex-col items-center justify-center text-white">
            <Badge className="mb-4 border-white text-white" variant="outline">
              {totalDocs} offres disponibles
            </Badge>
            <h1 className="inline-block align-middle text-5xl font-semibold md:text-7xl">
              Aide à Domicile
            </h1>
            <p className="mt-4 text-xl font-semibold text-neutral-50">
              Un métier qui change des vies. La vôtre aussi.
            </p>
            <span className="mt-4 block max-w-lg text-center text-neutral-50">
              Rejoignez une équipe engagée et donnez du sens à votre carrière dans l'aide à
              domicile.
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      {/* Section Offres d'emploi */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-left">
          <div className="mb-16 xl:mb-24">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-balance lg:text-5xl">
              {"Le Réseau Public Départemental d'Aide à Domicile de la Gironde"}
            </h2>
            <p className="text-muted-foreground max-w-2xl text-xl">
              {
                'C’est près de 1200 agents, les métiers sont variés : aide à domicile, auxiliaire de vie, responsable de SAD, responsable de secteur, agent administratif…, voici nos offres'
              }
            </p>
          </div>

          {/* LOOP ITEMS */}
          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10 mb-8 items-stretch">
            {emplois.map((emploi) => (
              <Card11 key={emploi.id} post={emploi} />
            ))}
          </div> */}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {emplois.map((emploi) => (
              <Card
                key={emploi.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border-none bg-white/80 backdrop-blur-sm transition-all duration-300"
                onMouseEnter={() => setHoveredEmploi(emploi.id)}
                onMouseLeave={() => setHoveredEmploi(null)}
              >
                <CardHeader className="flex-shrink-0 p-0 pb-4">
                  <div
                    className={`relative z-10 block aspect-video w-full flex-shrink-0 overflow-hidden rounded-t-3xl`}
                  >
                    {emploi.image && typeof emploi.image === 'object' && (
                      <Media
                        resource={emploi.image}
                        fill
                        imgClassName="object-cover object-[center_30%]"
                      />
                    )}
                  </div>
                  <span className="absolute top-3 left-4 z-10">
                    {emploi.typeContrat && (
                      <Badge variant="default" className="bg-primary-lighter text-primary text-xs">
                        {emploi.typeContrat.toUpperCase()}
                      </Badge>
                    )}
                  </span>
                  <CardTitle className="mt-4 line-clamp-2 text-center text-xl">
                    {emploi.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col pt-0">
                  <CardDescription className="mb-4 line-clamp-3 flex-1 text-left">
                    {getDescription(emploi)}
                  </CardDescription>

                  <div className="my-6 flex-shrink-0 space-y-2">
                    {emploi.organisme?.nom && (
                      <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span className="truncate">{emploi.organisme.nom}</span>
                        </div>
                        {emploi.publishedAt && (
                          <>
                            <span className="text-muted-foreground mx-[6px] font-medium">·</span>
                            <span className="text-muted-foreground flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              {displayDate(emploi.publishedAt)}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    {emploi.organisme?.lieu && (
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{emploi.organisme.lieu}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    asChild
                    className="mt-auto w-full rounded-2xl transition-all group-hover:shadow-md"
                  >
                    <Link href={`/emplois/${emploi.slug || '#'}`}>
                      Voir l'offre
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {emplois.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground text-lg">
                Aucune offre d'emploi disponible pour le moment.
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Revenez bientôt pour découvrir de nouvelles opportunités !
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section Mission */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="bg-flamingo/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Building2 className="text-flamingo h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Notre mission</h3>
              <p className="text-muted-foreground text-sm">
                Nous soutenons nos bénéficiaires au quotidien grâce à nos agents de la fonction
                publique.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-chateau/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <UsersRound className="text-chateau h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Service centré sur vous</h3>
              <p className="text-muted-foreground text-sm">
                Nous simplifions le parcours de soins en élaborant des solutions individuelles.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Sparkles className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Innovation et qualité</h3>
              <p className="text-muted-foreground text-sm">
                Nos projets innovants modernisent l'organisation et rehaussent la qualité de vie au
                travail.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300/10">
                <Handshake className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Partenariats locaux</h3>
              <p className="text-muted-foreground text-sm">
                En collaboration avec le CD33 et divers organismes pour un accompagnement de
                proximité.
              </p>
            </div>
          </div>
        </div>
      </section>
      <TestimonialSection />
      <FAQSection />
    </div>
  )
}
