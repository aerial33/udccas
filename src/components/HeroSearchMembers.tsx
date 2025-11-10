'use client'

import { ArrowRight, Building2, Loader2, MapPin } from 'lucide-react'

import React, { useCallback, useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

type Suggestion = {
  type: 'membre' | 'lieu'
  label: string
  value: string
  slug?: string
}

type SuggestionsResponse = {
  membres: Suggestion[]
  lieux: Suggestion[]
}

export const HeroSearchMembers: React.FC = () => {
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams?.get('q') || '')
  const [suggestions, setSuggestions] = useState<SuggestionsResponse>({ membres: [], lieux: [] })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Fonction pour récupérer les suggestions avec debounce
  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSuggestions({ membres: [], lieux: [] })
      setOpen(false)
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/membres/suggestions?q=${encodeURIComponent(query)}`)
      const data: SuggestionsResponse = await response.json()
      setSuggestions(data)
      setOpen(true)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions({ membres: [], lieux: [] })
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(value)
    }, 300)

    return () => clearTimeout(timer)
  }, [value, fetchSuggestions])

  // Réinitialiser la page quand le champ est vidé
  useEffect(() => {
    const currentQuery = searchParams?.get('q')
    // Si on est sur une page avec recherche mais que le champ est vide
    if (currentQuery && !value.trim()) {
      const timer = setTimeout(() => {
        router.push('/membres/recherche')
      }, 500) // Petit délai pour éviter de naviguer pendant la frappe

      return () => clearTimeout(timer)
    }
  }, [value, searchParams, router])

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim()) {
      router.push(`/membres/recherche?q=${encodeURIComponent(searchValue)}`)
      setOpen(false)
    } else {
      // Si le champ est vide, réinitialiser la page
      router.push('/membres/recherche')
      setOpen(false)
    }
  }

  const handleSelect = (suggestion: Suggestion) => {
    setValue(suggestion.value)
    handleSearch(suggestion.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(value)
  }

  const hasSuggestions = suggestions.membres.length > 0 || suggestions.lieux.length > 0

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <Command className="border-flamingo-light overflow-visible rounded-2xl border-2 shadow-lg">
        <div className="relative">
          {/* <SearchIcon className="text-muted-foreground absolute top-1/2 left-4 z-10 h-5 w-5 -translate-y-1/2" /> */}
          {loading && (
            <Loader2 className="text-flamingo absolute top-1/2 right-20 z-10 h-5 w-5 -translate-y-1/2 animate-spin" />
          )}
          <CommandInput
            value={value}
            onValueChange={setValue}
            placeholder="Rechercher un membre proche de chez vous"
            className="h-16 border-0 pr-20 pl-12 text-xs focus-visible:ring-0 md:text-base"
          />
          <button
            type="submit"
            className="bg-flamingo-light hover:bg-flamingo absolute top-0 right-0 z-10 cursor-pointer rounded-xl p-4 transition-colors"
          >
            <ArrowRight className="h-8 w-8 text-white" />
          </button>
        </div>

        {open && value.trim().length >= 2 && (
          <CommandList className="border-flamingo-dark absolute top-full right-0 left-0 z-50 mt-2 max-h-[300px] overflow-auto rounded-xl border bg-white shadow-lg">
            {!loading && !hasSuggestions && <CommandEmpty>Aucune suggestion trouvée</CommandEmpty>}

            {suggestions.membres.length > 0 && (
              <CommandGroup heading="Membres">
                {suggestions.membres.map((suggestion, index) => (
                  <CommandItem
                    key={`membre-${index}`}
                    value={suggestion.value}
                    onSelect={() => handleSelect(suggestion)}
                    className="cursor-pointer"
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    <span>{suggestion.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {suggestions.lieux.length > 0 && (
              <CommandGroup heading="Lieux">
                {suggestions.lieux.map((suggestion, index) => (
                  <CommandItem
                    key={`lieu-${index}`}
                    value={suggestion.value}
                    onSelect={() => handleSelect(suggestion)}
                    className="cursor-pointer"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{suggestion.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </form>
  )
}
