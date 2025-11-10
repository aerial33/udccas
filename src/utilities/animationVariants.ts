/**
 * Framer Motion animation variants for slider transitions
 *
 * @param x - Horizontal offset for slide animation (default: 1000px)
 * @param opacity - Initial/final opacity (default: 0)
 * @returns Object with enter, center, and exit animation states
 *
 * Usage with AnimatePresence and custom direction:
 * - direction > 0: sliding forward (left to right)
 * - direction < 0: sliding backward (right to left)
 */
export const variants = (x = 1000, opacity = 0) => ({
  enter: (direction: number) => {
    return {
      x: direction > 0 ? x : -x,
      opacity,
    }
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? x : -x,
      opacity,
    }
  },
})