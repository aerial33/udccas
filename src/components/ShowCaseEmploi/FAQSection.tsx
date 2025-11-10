'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { useState } from 'react'

import { FAQCollapse } from '@/components/motion/animations'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

type FAQAnswer = string | { text?: string; items: string[] }[]

interface FAQItem {
  question: string
  answer: FAQAnswer
}

const faqData: FAQItem[] = [
  {
    question: "En quoi consiste le travail d'aide à domicile ?",
    answer: [
      {
        text: "Vous accompagnez des personnes âgées et/ou en situation de handicap afin qu'elles puissent continuer à vivre chez elles dans de bonnes conditions. Concrètement, vous pouvez :",
        items: [
          'les accompagner dans les gestes du quotidien (toilette, habillage, repas)',
          'réaliser des tâches ménagères (entretien du logement, linge, courses)',
          'leur apporter un soutien social (discussions, écoute, présence bienveillante)',
        ],
      },
      {
        text: 'Votre rôle est à la fois pratique, humain et rassurant pour les personnes que vous aidez.',
        items: [],
      },
    ],
  },
  {
    question: 'Peut-on se former en travaillant  ?',
    answer: [
      {
        text: 'Oui, tout à fait. Le RPDAD propose des formations professionnalisantes en cours d’emploi.',
        items: [],
      },
      {
        text: 'Certains CCAS et CIAS offrent également des formations en alternance ou via la VAE (Validation des Acquis de l’Expérience)',
        items: [],
      },
    ],
  },
  {
    question: 'Les horaires sont-ils fixes ?',
    answer: [
      {
        text: 'Les horaires peuvent varier, car ce métier implique une continuité de service. Vous pouvez être amené(e) à travailler le matin, en fin d’après-midi, voire certains week-ends, en fonction des besoins des personnes accompagnées et en alternance avec les autres agents du service.',
        items: [],
      },
    ],
  },
  {
    question: 'Est-ce un métier fatigant ?',
    answer:
      'Oui, il s’agit d’un métier physique et exigeant sur le plan relationnel. Mais il est également très humain, enrichissant et valorisant. Vous développez un lien fort avec les personnes que vous accompagnez.',
  },
  {
    question: 'En quoi consiste le travail de responsable de secteur?',
    answer: [
      {
        text: 'Concrètement, il ou elle :',
        items: [
          'planifie les tournées et établit les plannings',
          'assure la liaison entre les familles, les aides à domicile, la direction et les autres professionnels',
          'évalue les besoins des personnes accompagnées et propose un accompagnement adapté',
          'encadre et soutient l’équipe au quotidien',
        ],
      },
      {
        text: 'C’est un métier qui repose sur l’organisation, la coordination et le sens du contact humain. Il est essentiel au bon fonctionnement du service.',
        items: [],
      },
    ],
  },
  {
    question: 'Travaille-t-on seul(e) ?',
    answer: [
      {
        text: 'Vous intervenez seul(e) au domicile des personnes aidées, mais vous faites partie d’une équipe avec laquelle vous échangez régulièrement. Vous n’êtes donc jamais vraiment isolé(e).',
        items: [],
      },
    ],
  },
  {
    question: 'Se déplace-t-on beaucoup ?',
    answer: [
      {
        text: 'Oui, vous devez vous rendre d’un domicile à l’autre. Un moyen de transport est donc souvent nécessaire (voiture, vélo, scooter, etc.).',
        items: [],
      },
    ],
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 xl:flex xl:justify-between xl:gap-8 xl:px-0">
        <div className="mb-16 text-center xl:text-left">
          <Badge className="mb-4 border-gray-600" variant="outline">
            F.A.Q
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-700 md:text-4xl">
            Questions Fréquentes
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Trouvez les réponses aux questions les plus courantes sur nos offres d'emploi et notre
            organisation.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openItems.includes(index)
              return (
                <Card
                  key={index}
                  className="border-muted-foreground border-0 border-b bg-transparent shadow-sm transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="hover:bg-muted/20 group w-full p-6 text-left transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <h3
                          className={`pr-8 text-lg font-semibold transition-colors duration-200 ${
                            isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
                          }`}
                        >
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <ChevronDown
                            className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                              isOpen
                                ? 'text-primary'
                                : 'text-muted-foreground group-hover:text-primary'
                            }`}
                          />
                        </motion.div>
                      </div>
                    </button>
                    <FAQCollapse isOpen={isOpen} duration={0.3}>
                      <div className="px-6 pb-6">
                        <motion.div
                          initial={false}
                          animate={{ opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.2, delay: isOpen ? 0.15 : 0 }}
                          className="border-t pt-4"
                        >
                          {typeof faq.answer === 'string' ? (
                            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                          ) : (
                            <div className="text-muted-foreground space-y-3 leading-relaxed">
                              {faq.answer.map((section, idx) => (
                                <div key={idx}>
                                  {section.text && <p className="mb-2">{section.text}</p>}
                                  {section.items.length > 0 && (
                                    <ul className="ml-6 list-disc space-y-1.5">
                                      {section.items.map((item, itemIdx) => (
                                        <li key={itemIdx}>{item}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </FAQCollapse>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
