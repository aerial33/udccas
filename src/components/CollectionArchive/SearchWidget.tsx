'use client'

import React from 'react'

export const SearchWidget: React.FC = () => {
  return (
    <div className="widget-search">
      <form className="rounded-3xl bg-white/80 text-gray-600 backdrop-blur-sm">
        <div className="form-floating relative !mb-0">
          <input
            id="search-form"
            type="text"
            className="focus:ring-primary-light focus:border-primary block w-full rounded-full border border-neutral-200 bg-white py-2 focus:ring-1 focus:outline-none sm:ps-4 sm:text-sm"
            placeholder="Recherche"
          />
          <label
            htmlFor="search-form"
            className="pointer-events-none absolute top-0 left-0 z-[2] inline-block h-full origin-[0_0] overflow-hidden border border-solid border-transparent px-4 py-[0.6rem] text-[.75rem] text-ellipsis whitespace-nowrap !text-[#959ca9]"
          ></label>
        </div>
      </form>
    </div>
  )
}
