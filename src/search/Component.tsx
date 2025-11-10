'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDebounce } from '@/utilities/useDebounce'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Rechercher...
        </Label>
        <Input
          id="search"
          className="mt-4 rounded-full"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Rechercher..."
        />
        <button type="submit" className="sr-only">
          soumettre
        </button>
      </form>
    </div>
  )
}
