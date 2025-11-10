'use client'

import { motion } from 'framer-motion'

type PatternVariant = 'default' | 'dense' | 'sparse' | 'large'

const PATTERN_VARIANTS: Record<PatternVariant, Partial<DotPatternProps>> = {
  default: {
    rows: 11,
    cols: 11,
    dotSize: 'md',
    gap: 'md',
  },
  dense: {
    rows: 15,
    cols: 15,
    dotSize: 'sm',
    gap: 'sm',
  },
  sparse: {
    rows: 8,
    cols: 8,
    dotSize: 'md',
    gap: 'lg',
  },
  large: {
    rows: 6,
    cols: 6,
    dotSize: 'lg',
    gap: 'lg',
  },
}

type DotPatternProps = {
  variant?: PatternVariant
  rows?: number
  cols?: number
  dotSize?: 'sm' | 'md' | 'lg'
  dotColor?: string
  className?: string
  gap?: 'sm' | 'md' | 'lg'
}

const DOT_SIZES = {
  sm: 'h-0.5 w-0.5',
  md: 'h-1 w-1',
  lg: 'h-1.5 w-1.5',
}

const GAP_SIZES = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
}

export function DotPattern({ variant = 'default', ...props }: DotPatternProps) {
  // Fusionner les props de la variante avec les props personnalisées
  const finalProps = {
    ...PATTERN_VARIANTS[variant],
    ...props,
  }

  const {
    rows = 11,
    cols = 11,
    dotSize = 'md',
    dotColor = 'bg-blue-base',
    className = '',
    gap = 'md',
  } = finalProps

  return (
    <motion.div
      className={`absolute flex flex-col ${GAP_SIZES[gap]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
    >
      {[...Array(rows)].map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className={`flex ${GAP_SIZES[gap]}`}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {[...Array(cols)].map((_, j) => (
            <motion.div
              key={`dot-${i}-${j}`}
              className={`${dotColor} ${DOT_SIZES[dotSize]} rounded-full`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: (i + j) * 0.1 }}
            />
          ))}
        </motion.div>
      ))}
    </motion.div>
  )
}
