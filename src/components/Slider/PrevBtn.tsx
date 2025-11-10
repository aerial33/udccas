import { ChevronLeftIcon } from '@heroicons/react/24/solid'

import { ButtonHTMLAttributes, FC } from 'react'

import twFocusClass from '@/utilities/twFocusClass'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Previous button component for slider navigation
 *
 * Features:
 * - Dark mode support
 * - RTL support (icon rotates 180deg)
 * - Accessible focus states
 * - Customizable via className prop
 */
const PrevBtn: FC<Props> = ({ className = 'w-10 h-10 text-lg', ...args }) => {
  return (
    <button
      className={`PrevBtn ${className} inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 ${twFocusClass()}`}
      aria-label="Previous slide"
      {...args}
    >
      <ChevronLeftIcon className="h-5 w-5 rtl:rotate-180" />
    </button>
  )
}

export default PrevBtn
