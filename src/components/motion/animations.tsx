'use client'

import { motion } from 'framer-motion'

import { ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export const Collapse = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mx-auto w-full max-w-7xl rounded-2xl border p-4 shadow-sm">
      <Button className="mx-auto flex w-fit" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          ▼
        </motion.span>
      </Button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-4">{children}</div>
      </motion.div>
    </div>
  )
}

export const FadeUp = ({
  children,
  delay = 0,
  duration = 0.45,
  className,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) => {
  // let ref = useRef(null);
  // let isInView = useInView(ref);
  return (
    <motion.div
      // ref={ref}
      variants={{
        hidden: { opacity: 0, y: 48 },
        visible: { opacity: 1, y: 0 },
      }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      // animate={isInView ? "visible" : "hidden"}
      transition={{
        type: 'spring',
        stiffness: 80, // Anime: 80
        damping: 10, // Anime: 10
        mass: 1, // Anime: 1
        duration: duration, // 450ms → 0.45s
        delay: delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const FadeRight = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 },
      }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      transition={{
        type: 'spring',
        stiffness: 80, // Anime: 80
        damping: 10, // Anime: 10
        mass: 1, // Anime: 1
        duration: duration, // 450ms → 0.45s
        delay: delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const FadeLeft = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
      }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      transition={{
        type: 'spring',
        stiffness: 80, // Anime: 80
        damping: 10, // Anime: 10
        mass: 1, // Anime: 1
        duration: duration, // 450ms → 0.45s
        delay: delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const ScaleFromCenter = ({
  children,
  delay = 0,
  duration = 0.5,
  className,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1 },
      }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration, ease: 'easeOut', delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const ExpandFromCenter = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0, rotate: -10 },
        visible: { opacity: 1, scale: 1, rotate: 0 },
      }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const RevealFromCenter = ({
  children,
  delay = 0,
  duration = 0.5,
  className,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          scale: 0,
          clipPath: 'circle(0% at 50% 50%)',
        },
        visible: {
          opacity: 1,
          scale: 1,
          clipPath: 'circle(100% at 50% 50%)',
        },
      }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const FAQCollapse = ({
  isOpen,
  children,
  duration = 0.3,
}: {
  isOpen: boolean
  children: React.ReactNode
  duration?: number
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{
        height: {
          duration: duration,
          ease: [0.4, 0, 0.2, 1], // easeInOut cubic-bezier optimisé
        },
        opacity: {
          duration: duration * 0.8,
          ease: 'easeOut',
        },
      }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  )
}
