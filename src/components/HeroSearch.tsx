'use client'

import { ArrowRight, Search as SearchIcon } from 'lucide-react'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'

export const HeroSearch: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className="relative">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
        <Input
          type="search"
          placeholder="Rechercher un service proche de chez vous"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-flamingo-light focus-visible:ring-flamingo h-16 rounded-2xl pr-4 pl-12 text-xs shadow-lg focus-visible:ring-2 md:text-base"
        />
        <button
          type="submit"
          className="bg-flamingo-light hover:bg-flamingo absolute top-0 right-0 cursor-pointer rounded-2xl p-4"
        >
          <ArrowRight className="h-8 w-8 text-white" />
        </button>
      </div>
    </form>
  )
}
