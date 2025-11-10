import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

import { UdLogo } from '@/graphics/LogoRpdad/logo'
import type { Footer } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="bg-flamingo-white rounded-t-4xl py-4">
      <div className="container flex flex-col items-center justify-between gap-10 border-t border-gray-200 text-center lg:flex-row lg:text-left">
        <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
          <div>
            <UdLogo height={90} className="m-auto lg:m-0" />
            <p className="gradient-secondary text-lg font-semibold">
              Réseau Public Départemental <br /> d&apos;Aide à Domicile de la Gironde
            </p>
            <p className="text-muted-foreground mt-6 text-sm">
              Aide à la vie quotidienne pour les personnes âgées ou en situation de handicap.
            </p>
          </div>
          <ul className="text-muted-foreground flex items-center space-x-4">
            <li className="hover:text-primary font-medium">
              <a href="https://www.facebook.com/rpdadgironde" target="_blank">
                <Facebook className="size-5" />
              </a>
            </li>
            <li className="hover:text-primary font-medium">
              <a href="https://www.instagram.com/rpdad_33/" target="_blank">
                <Instagram className="size-5" />
              </a>
            </li>
            <li className="hover:text-primary font-medium">
              <a
                href="https://www.linkedin.com/company/rpdad33/posts/?feedView=all"
                target="_blank"
              >
                <Linkedin className="size-5" />
              </a>
            </li>

            <li className="hover:text-primary font-medium">
              <a href="https://www.youtube.com/@RPDAD33" target="_blank">
                <Youtube className="size-5" />
              </a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-4 gap-6 lg:gap-20">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-6 font-bold">{section.link.label}</h3>
              <ul className="text-muted-foreground space-y-4 text-sm">
                <li key={sectionIdx} className="hover:text-primary font-medium">
                  <a href={section.link.url || ''}>{section.link.label}</a>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="mb-6 font-bold">Adresse</h3>
          <p className="text-muted-foreground mb-6">
            4 voie Romaine, <br />
            Espace France Bâtiment B<br />
            33610 Canéjan
          </p>
          <p className="text-muted-foreground">{'05.40.12.90.11'}</p>
          <p className="text-muted-foreground">{'rpdad@udccas33.org'}</p>
        </div>
      </div>
      <div className="text-muted-foreground border-flamingo container mt-20 flex flex-col justify-between gap-4 border-t px-4 pt-8 text-center text-sm font-medium lg:flex-row lg:items-center lg:text-left">
        <p>© 2025 RPDAD. Tous droits réservés.</p>
        <ul className="flex justify-center gap-4 lg:justify-start">
          <li className="hover:text-primary">
            <a href="#"> Mentions légales</a>
          </li>
          <li className="hover:text-primary">
            <a href="#"> Politique de confidentialité</a>
          </li>
          <li className="hover:text-primary">
            <a href="#"> Cookies</a>
          </li>
        </ul>
      </div>

      {/* <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div> */}
    </footer>
  )
}
