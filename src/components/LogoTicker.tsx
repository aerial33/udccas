'use client'

import { motion } from 'framer-motion'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/utilities/ui'

export const LogoTicker = ({ className }: { className?: string }) => {
  return (
    <>
      <div className={cn('mt-12', className)}>
        <p className="lg:text-lg">Nos Partenaires</p>

        <div className="relative overflow-x-hidden p-4">
          <div className="mb-4 flex items-center">
            <LogoList list={logos} duration={70} />
            <LogoList list={logos} duration={70} />
            <LogoList list={logos} duration={70} />
          </div>
        </div>
      </div>
    </>
  )
}

export const LogoList = ({
  list,
  duration = 70,
}: {
  list: { id: number; component: () => React.ReactElement }[]
  duration?: number
}) => {
  return (
    <motion.div
      initial={{ translateX: '0%' }}
      animate={{ translateX: '-100%' }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      className="flex gap-12 px-8"
    >
      {list.map(({ id, component: Logo }) => (
        <div key={id} className="flex w-42 items-center text-slate-300">
          <Logo />
        </div>
      ))}
    </motion.div>
  )
}

const departementLogo = () => {
  return (
    <Link href="https://www.gironde.fr/" target="_blank" rel="noopener noreferrer">
      <Image src="/img/departement-gironde.png" alt="departement" width={200} height={200} />
    </Link>
  )
}

// const arsLogo = () => {
//   return <Image src="/img/ars.jpg" alt="ars" width={100} height={100} />
// }

const carsatLogo = () => {
  return (
    <Link href="https://www.carsat-aquitaine.fr/" target="_blank" rel="noopener noreferrer">
      <Image src="/img/carsat.png" alt="carstat" width={200} height={200} />
    </Link>
  )
}

// const cnraclLogo = () => {
//   return <Image src="/img/cnracl.jpg" alt="cnracl" width={100} height={50} />
// }

// const direccteLogo = () => {
//   return <Image src="/img/direccte-aquitaine.png" alt="direccte" width={100} height={100} />
// }
// const mdphLogo = () => {
//   return <Image src="/img/mdph.png" alt="mdph" width={150} height={150} />
// }
const cnsaLogo = () => {
  return (
    <Link href="https://www.cnsa.fr/" target="_blank" rel="noopener noreferrer">
      <Image src="/img/cnsa.png" alt="cnsa" width={150} height={150} />
    </Link>
  )
}
const msaLogo = () => {
  return (
    <Link href="https://www.msa.fr" target="_blank" rel="noopener noreferrer">
      <Image src="/img/msa.png" alt="msa" width={150} height={150} />
    </Link>
  )
}
const unccasLogo = () => {
  return (
    <Link href="https://www.unccas.org/gironde-33" target="_blank" rel="noopener noreferrer">
      <Image src="/img/unccas.png" alt="unccas" width={150} height={150} />
    </Link>
  )
}
const udccas = () => {
  return (
    <Link href="https://www.unccas.org/gironde-33" target="_blank" rel="noopener noreferrer">
      <Image src="/img/udccas.png" alt="udccas" width={150} height={150} />
    </Link>
  )
}

const logos = [
  { id: 1, component: departementLogo },
  // { id: 2, component: arsLogo },
  { id: 3, component: carsatLogo },
  // { id: 4, component: cnraclLogo },
  // { id: 5, component: direccteLogo },
  // { id: 6, component: mdphLogo },
  { id: 7, component: cnsaLogo },
  { id: 8, component: msaLogo },
  { id: 9, component: unccasLogo },
  { id: 10, component: udccas },
]
