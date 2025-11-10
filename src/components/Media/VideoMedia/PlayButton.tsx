'use client'

import { Play } from 'lucide-react'

import React from 'react'

import { cn } from '@/utilities/ui'

interface PlayButtonProps {
  onClick?: () => void
  className?: string
}

export const PlayButton: React.FC<PlayButtonProps> = ({ onClick, className }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <div
      role="button"
      aria-label="Lire la vidéo"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40',
        className,
      )}
    >
      <div className="rounded-full bg-white p-4 transition-transform group-hover:scale-110">
        <Play className="h-12 w-12 text-black" fill="currentColor" aria-hidden="true" />
      </div>
    </div>
  )
}
