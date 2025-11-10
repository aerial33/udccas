import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/utilities/ui'

import BackgroundSection from '../BackgroundSection/BackgroundSection'
import { SectionHistory } from './SectionHistory'
import { Timeline, TimelineItem } from './Timeline'

const timelineData: TimelineItem[] = [
  {
    date: '2002',
    title: 'Professionnalisation des services',
    description:
      "Les services d'aide-ménagère deviennent des Services d'Aide et d'Accompagnement à Domicile (SAAD) pour prendre en compte la perte d'autonomie et les situations de handicap. Il s'agit d'accompagner au quotidien et de façon personnalisée chaque bénéficiaire dans son environnement.",
  },
  {
    date: '2008 - 2010',
    title: 'Phase de réflexion',
    description:
      "Un groupe de directeurs de CCAS porteur de SAAD publics et issu du comité de directeurs de l'UDCCAS a réfléchi à la mise en place d'un groupement pour mutualiser les forces et permettre aux services d'aide à domicile de continuer à exercer.",
  },
  {
    date: '2010',
    title: 'Création du réseau',
    description:
      "Naissance du Réseau Public Départemental d'Aide à Domicile (RPDAD). Dans un premier temps, le réseau a été porté par l'UDCCAS, constituant sa branche médico-sociale (établissement de l'UDCCAS).",
  },
  {
    date: '2011',
    title: 'Création du GCSMS',
    description:
      "Le département et la direction des finances publiques demandaient la création d'un GCSMS adossé à l'UDCCAS pour sécuriser juridiquement les flux financiers publics.",
  },
  {
    date: '2011 - 2024',
    title: 'Structuration progressive',
    description:
      'Depuis plus de 10 ans, la structuration progressive du réseau a répondu sans conteste aux objectifs fixés. Le réseau est reconnu pour sa compétence et satisfait globalement les membres du réseau.',
  },
  {
    date: '2025',
    title: "Le RPDAD aujourd'hui",
    description:
      'Le réseau compte 33 services membres. Il accompagne près de 5000 personnes âgées et personnes en situation de handicap avec 1200 agents et intervient sur 194 communes de Gironde.',
  },
]

export const HistoryAbout = ({ className }: { className?: string }) => {
  return (
    <>
      <section className={cn('relative mt-16 py-16', className)}>
        <BackgroundSection className="bg-primary-lightest" />

        {/* ----------------------------- */}
        <div>
          <div className="container mx-auto px-6">
            {/* /.row */}
            <div className="mx-[-15px] flex flex-wrap items-start">
              <div
                className="mb-10 w-full max-w-2xl flex-[0_0_auto] lg:!sticky lg:w-5/12 xl:!sticky xl:w-5/12"
                style={{ top: '8rem' }}
              >
                <SectionHistory
                  className="sticky top-20 w-full max-w-full px-6 lg:!sticky lg:w-full lg:px-0 xl:w-full xl:px-0"
                  title="L'Histoire du Réseau"
                  paragraphs={[
                    "Découvrez les étapes clés du développement du Réseau Public Départemental d'Aide à Domicile de la Gironde depuis sa création",
                    "Depuis sa création, le réseau a connu une évolution remarquable et maintient un engagement ferme pour l'excellence des services d'aide à domicile, répondant aux besoins spécifiques de tous les Girondins avec professionnalisme et bienveillance.",
                  ]}
                  buttonText="Notre réseau"
                  buttonHref="#"
                  buttonIcon={<ArrowUpRight />}
                />
              </div>
              {/* /column */}
              <div className="!ml-auto w-full max-w-full flex-[0_0_auto] !px-[15px] lg:w-6/12 xl:w-7/12">
                <Timeline items={timelineData} />
              </div>
              {/* /column */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
