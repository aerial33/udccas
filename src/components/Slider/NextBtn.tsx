import { ChevronRightIcon } from '@heroicons/react/24/solid'

import { ButtonHTMLAttributes, FC } from 'react'

import twFocusClass from '@/utilities/twFocusClass'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Next button component for slider navigation
 *
 * Features:
 * - Dark mode support
 * - RTL support (icon rotates 180deg)
 * - Accessible focus states
 * - Customizable via className prop
 */
const NextBtn: FC<Props> = ({ className = 'w-10 h-10 text-lg', ...args }) => {
  return (
    <button
      className={`NextBtn ${className} inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 ${twFocusClass()}`}
      aria-label="Next slide"
      {...args}
    >
      <ChevronRightIcon className="h-5 w-5 rtl:rotate-180" />
    </button>
  )
}

export default NextBtn
