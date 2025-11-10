import {
  BriefcaseIcon,
  CalendarIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

import Link from 'next/link'

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import type { Emplois } from '@/payload-types'

import { FadeUp } from '../motion/animations'

export const BlogSection = ({ emploi }: { emploi: Emplois }) => {
  const getWorkTimeLabel = (workTime: string) => {
    const workTimeMap = {
      'full-time': 'Temps plein',
      'part-time': 'Temps partiel',
      flexible: 'Horaires flexibles',
    }
    return workTimeMap[workTime as keyof typeof workTimeMap] || workTime
  }

  const getTypeContratLabel = (typeContrat: string) => {
    const typeContratMap = {
      cdi: 'CDI',
      cdd: 'CDD',
    }
    return typeContratMap[typeContrat as keyof typeof typeContratMap] || typeContrat
  }

  const getStatusLabel = (status: string) => {
    const statusMap = {
      active: 'Active',
      filled: 'Pourvue',
      expired: 'Expirée',
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  const getStatusColor = (status: string) => {
    const colorMap = {
      active: 'bg-green-100 text-green-800',
      filled: 'bg-blue-100 text-blue-800',
      expired: 'bg-gray-100 text-gray-800',
    }
    return colorMap[status as keyof typeof colorMap] || 'bg-gray-100 text-gray-800'
  }

  return (
    <section>
      <FadeUp className="py4 container mx-auto flex flex-col items-center md:pt-8 md:pb-10 lg:flex-row lg:justify-between lg:pb-16 xl:px-0">
        {emploi.content && (
          <div className="self-start">
            <Badge className="border-muted-foreground mb-8 hidden md:block" variant="outline">
              <Breadcrumbs
                breadcrumbs={[
                  { name: 'Accueil', link: '/' },
                  { name: 'Emplois', link: '/emplois' },
                  { name: emploi.title },
                ]}
              />
            </Badge>
            <RichText
              className="prose prose-sm md:prose-lg richtext-content mx-auto max-w-4xl"
              data={emploi.content}
              enableGutter={false}
            />
          </div>
        )}

        <aside className="top-20 mb-8 w-full self-start pt-8 lg:sticky lg:ml-8 lg:max-w-[24rem] lg:shrink-0 2xl:w-full">
          <div className="flex flex-col rounded-3xl bg-zinc-100 py-8 shadow-lg md:rounded-[40px]">
            {/* Nom de l'organisme */}
            {emploi.organisme?.nom && (
              <div className="mb-6 flex flex-col items-center px-6">
                <h3 className="theme-dark:text-zinc-100 text-center text-xl leading-tight font-bold">
                  {emploi.organisme.nom}
                </h3>
              </div>
            )}

            {/* Type de contrat et temps de travail */}
            {(emploi.typeContrat || emploi.workTime) && (
              <div className="mb-6 px-6">
                <div className="mb-2 flex items-center gap-2">
                  <BriefcaseIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                  <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                    Type de contrat
                  </div>
                </div>
                <div className="theme-dark:text-zinc-400 ml-7 text-sm leading-relaxed text-zinc-600">
                  {emploi.typeContrat && getTypeContratLabel(emploi.typeContrat)}
                  {emploi.typeContrat && emploi.workTime && ' - '}
                  {emploi.workTime && getWorkTimeLabel(emploi.workTime)}
                </div>
              </div>
            )}

            {/* Lieu */}
            {emploi.organisme?.lieu && (
              <div className="mb-6 px-6">
                <div className="mb-2 flex items-center gap-2">
                  <MapPinIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                  <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                    Lieu
                  </div>
                </div>
                <div className="theme-dark:text-zinc-400 ml-7 text-sm leading-relaxed text-zinc-600">
                  {emploi.organisme.lieu}
                </div>
              </div>
            )}

            {/* Dates */}
            {(emploi.datePourvoir || emploi.publishedAt) && (
              <div className="mb-6 px-6">
                <div className="mb-2 flex items-center gap-2">
                  <CalendarIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                  <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                    Dates
                  </div>
                </div>
                <div className="theme-dark:text-zinc-400 ml-7 space-y-2 text-sm text-zinc-600">
                  {emploi.publishedAt && (
                    <div className="flex items-start gap-2">
                      <span className="font-medium">Publié le:</span>
                      <span>{new Date(emploi.publishedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                  {emploi.datePourvoir && (
                    <div className="flex items-start gap-2">
                      <span className="font-medium">Poste à pourvoir:</span>
                      <span>{new Date(emploi.datePourvoir).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Statut de l'offre */}
            {emploi.statusOffre && (
              <div className="mb-6 px-6">
                <div className="mb-2 flex items-center gap-2">
                  <CheckBadgeIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                  <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                    Statut
                  </div>
                </div>
                <div className="ml-7">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(emploi.statusOffre)}`}
                  >
                    {getStatusLabel(emploi.statusOffre)}
                  </span>
                </div>
              </div>
            )}

            {/* Divider */}
            {emploi.organisme?.description && (
              <div className="theme-dark:border-zinc-700 mb-6 border-t border-zinc-300" />
            )}

            {/* Informations supplémentaires */}
            {emploi.organisme?.description && (
              <div className="mb-6 px-6">
                <div className="theme-dark:text-zinc-400 rounded-lg border border-zinc-300 bg-white/50 p-3 text-sm leading-relaxed text-zinc-700">
                  <RichText
                    className="prose-sm prose"
                    data={emploi.organisme.description}
                    enableGutter={false}
                  />
                </div>
              </div>
            )}

            {/* Divider */}
            {(emploi.organisme?.contact?.email ||
              emploi.organisme?.contact?.telephone ||
              emploi.organisme?.contact?.nom) && (
              <div className="theme-dark:border-zinc-700 mb-6 border-t border-zinc-300" />
            )}

            {/* Contact */}
            {(emploi.organisme?.contact?.email ||
              emploi.organisme?.contact?.telephone ||
              emploi.organisme?.contact?.nom) && (
              <div className="mb-6 px-6">
                <div className="mb-3 flex items-center gap-2">
                  <PhoneIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                  <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                    Contact
                  </div>
                </div>
                <div className="theme-dark:text-zinc-400 ml-7 space-y-2 text-sm text-zinc-600">
                  {emploi.organisme.contact?.nom && (
                    <div className="font-medium">{emploi.organisme.contact.nom}</div>
                  )}
                  {emploi.organisme.contact?.telephone && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Tél:</span>
                      <a
                        href={`tel:${emploi.organisme.contact.telephone}`}
                        className="theme-dark:hover:text-zinc-200 hover:text-zinc-900"
                      >
                        {emploi.organisme.contact.telephone}
                      </a>
                    </div>
                  )}
                  {emploi.organisme.contact?.email && (
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="h-4 w-4 flex-shrink-0" />
                      <a
                        href={`mailto:${emploi.organisme.contact.email}`}
                        className="theme-dark:hover:text-zinc-200 truncate hover:text-zinc-900"
                      >
                        {emploi.organisme.contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Lien vers l'offre complète */}
            {emploi.organisme?.lien && (
              <div className="px-6">
                <div className="mb-2 flex items-center gap-2">
                  <GlobeAltIcon className="theme-dark:text-zinc-400 h-5 w-5 text-zinc-500" />
                  <div className="theme-dark:text-zinc-200 text-sm font-semibold text-zinc-800">
                    Plus d&apos;informations
                  </div>
                </div>
                <div className="theme-dark:text-zinc-400 ml-7 text-sm text-zinc-600">
                  <Link
                    href={emploi.organisme.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-dark:hover:text-zinc-200 break-all underline hover:text-zinc-900"
                  >
                    {"Consulter l'offre"}
                  </Link>
                </div>
              </div>
            )}

            {/* Bouton postuler */}
            {emploi.organisme?.contact?.email && (
              <div className="mt-6 px-6">
                <Link
                  href={`mailto:${emploi.organisme.contact.email}?subject=Candidature%20${emploi.title}%20-%20${emploi.organisme.nom || ''}`}
                  className="bg-primary hover:bg-primary/90 block w-full rounded-lg px-4 py-3 text-center text-sm font-medium text-white shadow-md transition-colors"
                >
                  Postuler à cette offre
                </Link>
              </div>
            )}
          </div>
        </aside>
      </FadeUp>
    </section>
  )
}

export default BlogSection
