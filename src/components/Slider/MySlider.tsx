'use client'

import { AnimatePresence, MotionConfig, motion } from 'framer-motion'

import { ReactNode, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

import { variants } from '@/utilities/animationVariants'
import { getResponsiveItems } from '@/utilities/getResponsiveItems'
import { useWindowSize } from '@/utilities/hooks/useWindowSize'

import NextBtn from './NextBtn'
import PrevBtn from './PrevBtn'

export interface MySliderProps<T> {
  className?: string
  itemPerRow?: number
  data: T[]
  renderItem?: (item: T, indx: number) => ReactNode
  arrowBtnClass?: string
}

/**
 * MySlider - Responsive carousel component with animations
 *
 * Features:
 * - Responsive breakpoints (auto-adjusts items per view)
 * - Touch/swipe support for mobile
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Smooth animations via Framer Motion
 * - RTL support
 * - Dark mode support
 * - SSR-safe
 * - WCAG 2.1 compliant (accessibility)
 *
 * Keyboard shortcuts:
 * - Arrow Left/Right: Navigate between slides
 * - Home: Jump to first slide
 * - End: Jump to last slide
 *
 * @example
 * ```tsx
 * <MySlider
 *   data={products}
 *   itemPerRow={4}
 *   renderItem={(product) => <ProductCard product={product} />}
 * />
 * ```
 */
export default function MySlider<T>({
  className = '',
  itemPerRow = 5,
  data,
  renderItem = () => <div></div>,
  arrowBtnClass = 'top-1/2 -translate-y-1/2',
}: MySliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [numberOfItems, setNumberOfitem] = useState(0)
  const [isRTL, setIsRTL] = useState(false)

  const { width: windowWidth } = useWindowSize()

  // Calculate responsive items based on window width
  useEffect(() => {
    const items = getResponsiveItems(windowWidth, itemPerRow)
    setNumberOfitem(items)
  }, [itemPerRow, windowWidth])

  // Detect RTL direction (SSR-safe)
  useEffect(() => {
    setIsRTL(document.querySelector('html')?.getAttribute('dir') === 'rtl')
  }, [])

  function changeItemId(newVal: number) {
    if (newVal > currentIndex) {
      setDirection(1)
    } else {
      setDirection(-1)
    }
    setCurrentIndex(newVal)
  }

  // Swipe handlers for touch devices
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < data?.length - 1) {
        changeItemId(currentIndex + 1)
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1)
      }
    },
    trackMouse: true,
  })

  // Keyboard navigation handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Maximum index we can navigate to
    const maxIndex = Math.max(0, data.length - numberOfItems)

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault() // Prevent page scroll
        if (currentIndex > 0) {
          changeItemId(currentIndex - 1)
        }
        break

      case 'ArrowRight':
        e.preventDefault() // Prevent page scroll
        if (currentIndex < maxIndex) {
          changeItemId(currentIndex + 1)
        }
        break

      case 'Home':
        e.preventDefault()
        if (currentIndex !== 0) {
          changeItemId(0)
        }
        break

      case 'End':
        e.preventDefault()
        if (currentIndex !== maxIndex) {
          changeItemId(maxIndex)
        }
        break
    }
  }

  // Don't render until we have calculated number of items
  if (!numberOfItems) {
    return <div></div>
  }

  return (
    <div className={`nc-MySlider ${className}`}>
      <MotionConfig
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className={`relative flow-root rounded-xl focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:outline-none`}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={`Carousel avec ${data.length} élément${data.length > 1 ? 's' : ''}`}
          onKeyDown={handleKeyDown}
          {...handlers}
        >
          <div className={`flow-root overflow-hidden rounded-xl`}>
            <motion.ul
              initial={false}
              className="relative -mx-2 space-x-2 whitespace-nowrap xl:-mx-4"
            >
              <AnimatePresence initial={false} custom={direction}>
                {data.map((item, indx) => (
                  <motion.li
                    className={`relative inline-block px-2 whitespace-normal xl:px-4`}
                    custom={direction}
                    initial={{
                      x: !isRTL ? `${(currentIndex - 1) * -100}%` : `${(currentIndex - 1) * 100}%`,
                    }}
                    animate={{
                      x: !isRTL ? `${currentIndex * -100}%` : `${currentIndex * 100}%`,
                    }}
                    variants={variants(200, 1)}
                    key={indx}
                    style={{
                      width: `calc(1/${numberOfItems} * 100%)`,
                    }}
                  >
                    {renderItem(item, indx)}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {/* Previous button - only show if not at start */}
          {currentIndex ? (
            <PrevBtn
              onClick={() => changeItemId(currentIndex - 1)}
              className={`absolute -start-3 z-[1] h-9 w-9 text-lg xl:-start-6 xl:h-12 xl:w-12 ${arrowBtnClass}`}
            />
          ) : null}

          {/* Next button - only show if more items to display */}
          {data.length > currentIndex + numberOfItems ? (
            <NextBtn
              onClick={() => changeItemId(currentIndex + 1)}
              className={`absolute -end-3 z-[1] h-9 w-9 text-lg xl:-end-6 xl:h-12 xl:w-12 ${arrowBtnClass}`}
            />
          ) : null}
        </div>
      </MotionConfig>
    </div>
  )
}
