'use client'

import { Quote } from 'lucide-react'

import { MySlider } from '@/components/Slider'
import { Card, CardContent } from '@/components/ui/card'

import BackgroundSection from '../BackgroundSection/BackgroundSection'

// Type pour les témoignages (à migrer vers Payload CMS plus tard)
interface Testimonial {
  id: number
  quote: string
  author: string
  role?: string
  age?: number
  avatar?: string
}

// Données temporaires (seront remplacées par props venant de Payload CMS)
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Je souhaite apporter de la sérénité et du bien-être au quotidien. Venir chez eux c'est leur permettre le maintien à domicile et de les sortir de l'isolement, la solitude.",
    author: 'Espérance',
  },
  {
    id: 2,
    quote:
      "Je suis heureuse d'aider nos bénéficiaires pour les tâches qu'ils ne peuvent plus réaliser eux-mêmes. J'aime les accompagner et les voir sourire.",
    author: 'Véronique',
  },
  {
    id: 3,
    quote:
      "J'ai commencé à travailler en parallèle de mes études et j'ai trouvé du sens dans ce métier, j'ai donc continué à temps partiel même après avoir terminé mon parcours.",
    author: 'David',
  },
  {
    id: 4,
    quote:
      "Je voulais m'orienter vers un secteur plus humain et plus gratifiant. Ce que j'aime dans mon travail avec les bénéficiaires c'est le sourire du matin, les anecdotes que l'on partage, la complicité, la confiance qui s'installe.",
    author: 'Christine',
  },
]

// Interface pour les props futures (quand connecté à Payload)
interface TestimonialSectionProps {
  testimonials?: Testimonial[]
}

export function TestimonialSection({ testimonials = TESTIMONIALS }: TestimonialSectionProps) {
  return (
    <section className="relative py-20 lg:py-32">
      <BackgroundSection />
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-700 md:text-4xl lg:text-5xl">
            Nos témoignages
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Découvrez les expériences de nos professionnels et bénéficiaires
          </p>
        </div>

        {/* MySlider intégré */}
        <MySlider
          data={testimonials}
          itemPerRow={1}
          className="mx-auto max-w-7xl"
          arrowBtnClass="top-1/2 -translate-y-1/2"
          renderItem={(testimonial) => (
            <Card className="mx-auto max-w-3xl rounded-3xl border-0 bg-white/80 shadow-sm transition-shadow hover:shadow-xl">
              <CardContent className="p-8">
                <Quote className="text-primary-dark mb-4 h-8 w-8" />
                <blockquote className="mb-6 text-center text-lg leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                <div className="flex items-center justify-end gap-3">
                  {testimonial.avatar && (
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                      <span className="text-primary-dark font-semibold">{testimonial.avatar}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    {(testimonial.age || testimonial.role) && (
                      <p className="text-muted-foreground text-sm">
                        {testimonial.age && `${testimonial.age} ans`}
                        {testimonial.age && testimonial.role && ' • '}
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        />
      </div>
    </section>
  )
}
