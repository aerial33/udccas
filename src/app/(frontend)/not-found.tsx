'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search } from 'lucide-react'

import Link from 'next/link'

import { DotPattern } from '@/components/DotPattern'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Patterns décoratifs */}
      <DotPattern
        variant="sparse"
        dotColor="bg-primary-light"
        className="absolute top-10 left-10 opacity-40"
      />
      <DotPattern
        variant="dense"
        dotColor="bg-blue-light"
        className="absolute right-10 bottom-0 opacity-30"
      />

      <div className="relative z-10 container px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-2xl"
        >
          {/* Numéro 404 stylisé */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="mb-8"
          >
            <h1 className="gradient-primary mb-4 text-8xl font-bold md:text-9xl">404</h1>
            <div className="from-primary to-flamingo mx-auto h-1 w-24 rounded-full bg-gradient-to-r"></div>
          </motion.div>

          {/* Message principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-foreground mb-4 text-2xl font-bold md:text-3xl">
              "Oups ! Page introuvable"
            </h2>
            <p className="text-blue-darker mb-6 text-lg leading-relaxed">
              " La page que vous recherchez semble avoir pris un chemin différent."
              <br className="hidden md:block" />
              "Ne vous inquiétez pas, nous sommes là pour vous aider à retrouver votre route."
            </p>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="group gap-2">
              <Link href="/">
                <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
                "Retour à l'accueil"
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="group gap-2">
              <Link href="/search">
                <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                "Rechercher"
              </Link>
            </Button>
          </motion.div>

          {/* Liens utiles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-blue-darker text-sm"
          >
            <p className="mb-4">"Vous pouvez également :"</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/le-rpdad"
                className="hover:text-primary flex items-center gap-1 transition-colors duration-200"
              >
                <ArrowLeft className="h-3 w-3" />
                "Découvrir le RPDAD"
              </Link>
              <Link href="/posts" className="hover:text-primary transition-colors duration-200">
                "Nos actualités"
              </Link>
              <Link
                href="/services-membres"
                className="hover:text-primary transition-colors duration-200"
              >
                "Services membres"
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Élément décoratif animé */}
        <motion.div
          className="from-flamingo to-primary absolute top-1/4 right-1/4 h-20 w-20 rounded-full bg-gradient-to-r opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="from-picton-blue to-primary absolute bottom-1/4 left-1/4 h-16 w-16 rounded-full bg-gradient-to-r opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  )
}
